---
author: Alfresco Documentation
---

# Java API

The Alfresco Repository Java API provides the ability to build server-side extensions in Alfresco ECM.

|Information|How to access the Java API and how to manage transactions|
|-----------|---------------------------------------------------------|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md), [API Intro](../concepts/dev-api-intro.md)|
|Description|The Public Java APIs, such as `NodeService` and `ContentService`, provides the ability to develop server-side extensions for Alfresco ECM. There are a number of Extension Points that make use of the Public Java API, here are some of the most used ones: -   [Actions](dev-extension-points-actions.md)
-   [Scheduled jobs](dev-extension-points-scheduled-jobs.md)
-   [Workflow](dev-extension-points-workflow.md)
-   [Behaviors / policies](dev-extension-points-behaviors.md)
-   [Web scripts](dev-extension-points-webscripts.md)

When we want to use one of the public Java APIs from an implementation of one of these Extension Points, it follows a best practice way. The first thing we need to do is acquire a reference to Alfresco `ServiceRegistry`. The service registry is basically a database of services, their instances and their locations. Clients of a service, such as the `NodeService`, then query the service registry to find the available instance of that service. When making calls to the `NodeService` we use the `RetryingTransactionHelper` for transaction management and redundancy. The following code snippet illustrates how to first inject the `ServiceRegistry` into a Spring bean:

```
<bean id="acmeContentService" class="org.alfresco.tutorial.publicapiaccess.service.AcmeContentServiceImpl">
      <property name="serviceRegistry">
          <ref bean="ServiceRegistry" />
      </property>
</bean>
```

In this case the `ServiceRegistry` is injected into a custom Service implementation, but the principle is the same for other implementations, such as for Repository Actions and Java-backed Web Scripts. When we got the service registry available in our implementation we can start using the Public Java API services such as in the following example:

```
public class AcmeContentServiceImpl implements AcmeContentService {
    private static Logger logger = LoggerFactory.getLogger(AcmeContentServiceImpl.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    /**
     * Create a contract file under the /Company Home folder.
     * This will be done in a read-write transaction, retry until successful or 20 trials.
     * Joins an ongoing transaction if one exists.
     */
    public NodeRef createContractFile(String filename, String contractTxt, AcmeContract contract) {
        NodeRef nodeRefForContract = serviceRegistry.getRetryingTransactionHelper().doInTransaction(
                new RetryingTransactionHelper.RetryingTransactionCallback<NodeRef>() {
                    public NodeRef execute() throws Throwable {
                        NodeRef parentFolderNodeRef =
                                serviceRegistry.getNodeLocatorService().getNode(CompanyHomeNodeLocator.NAME, null, null);

                        // Create Node metadata
                        QName associationType = ContentModel.ASSOC_CONTAINS;
                        QName associationQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI,
                                QName.createValidLocalName(filename));
                        Map<QName, Serializable> nodeProperties = new HashMap<QName, Serializable>();
                        nodeProperties.put(ContentModel.PROP_NAME, filename);
                        nodeProperties.put(DocumentType.Prop.DOCUMENT_ID, contract.getDocumentId());
                        nodeProperties.put(SecurityClassifiedAspect.Prop.SECURITY_CLASSIFICATION,
                                contract.getSecurityClassificationLevel());
                        nodeProperties.put(ContractType.Prop.CONTRACT_NAME, contract.getContractName());
                        nodeProperties.put(ContractType.Prop.CONTRACT_ID, contract.getContractId());
                        ChildAssociationRef parentChildAssocRef = serviceRegistry.getNodeService().createNode(
                                parentFolderNodeRef, associationType, associationQName, ContractType.QNAME, nodeProperties);

                        NodeRef newFileNodeRef = parentChildAssocRef.getChildRef();

                        // Set content for node
                        boolean updateContentPropertyAutomatically = true;
                        ContentWriter writer = serviceRegistry.getContentService().getWriter(
                                newFileNodeRef, ContentModel.PROP_CONTENT, updateContentPropertyAutomatically);
                        writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
                        writer.setEncoding("UTF-8");
                        writer.putContent(contractTxt);

                        return newFileNodeRef;
                    }
                });

        return nodeRefForContract;
    }

```

As we can see in the above code, the service registry is used to access the `TransactionService`, `NodeService`, `NodeLocatorService`, and `ContentService`. All the calls to these services are done within `RetryingTransactionHelper`, which will automatically join any ongoing transaction or start a new read-write transaction. If something should go wrong during these calls then they will be retried until they succeed or we reach 20 retries, which is configurable.

Permissions are also automatically checked during these calls, so you can for example not use the `NodeService` to create a node in a folder that you don't have write access to. Note that the `RetryingTransactionCallback` class is parametrized so you can pass in any type that represent the response from the operations done in the `execute` method. For example, if the operations in the `execute` method should result in either `true` or `false` then initialize the callback as in the following example:

```
  /**
     * Apply the acme:webPublished aspect to the content item with passed in node reference.
     * This will be done in a read-write transaction, retry until successful or 20 trials.
     * Joins an ongoing transaction if one exists.
     *
     * @param nodeRef the Alfresco Repo node reference to apply the aspect to
     */
    public void applyWebPublishedAspect(NodeRef nodeRef) {
       Boolean result = serviceRegistry.getRetryingTransactionHelper().doInTransaction(
             new RetryingTransactionHelper.RetryingTransactionCallback<Boolean>() {
                 public Boolean execute() throws Throwable {
                     Map<QName, Serializable> aspectProperties = new HashMap<QName, Serializable>();
                     aspectProperties.put(WebPublishedAspect.Prop.PUBLISHED_DATE, new Date());
                     serviceRegistry.getNodeService().addAspect(nodeRef, WebPublishedAspect.QNAME, aspectProperties);

                     return true;
                 }
             });
    }
```

If we want to be sure that a new transaction is started when we do our calls in the `execute` method, which is useful for situations when we just want our updates to be rolled-back if something goes wrong, then we can use another method signature for the `doInTransaction` method as follows:

```
RetryingTransactionHelper txHelper = serviceRegistry.getRetryingTransactionHelper();
boolean readOnly = false;
boolean requiresNew = true;
txHelper.doInTransaction(new RetryingTransactionHelper.RetryingTransactionCallback<Void>()
  {
      public Void execute() throws Throwable {
         // Do something in a new transaction...
         
         return null;
      }
   }, readOnly, requiresNew);
```

If we are using these services in a cluster, then we need to remember that they are not cluster *aware*. So if we for example are using these services in a scheduled job, which will be kicked off on each node in the cluster, then we would have to use the `JobLockService` to lock the cluster so another node does not start executing the same job. For more information about this see [Scheduled jobs](dev-extension-points-scheduled-jobs.md).

To turn on logging so you can get details of 'why' transactions are retried use the following log level:

-   Summary: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=INFO`
-   Details: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=DEBUG`

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into an Alfresco Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-amp-archetype.md)

|When using the Public Java API you will most likely use a Repository AMP extension project or a Simple JAR module \(5.1\). The Spring context files that you should use are usually found in the repo-amp/src/main/amp/config/alfresco/module/repo-amp/context directory.

|
|More Information|-   [Public Java API Services Reference](../concepts/dev-services.md)

|
|Sample Code|-   [Sample code demonstrating access to Alfresco Public Java API](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/public-api-access-repo)

|
|Tutorials| |
|Alfresco Developer Blogs| |

-   **[Public Java API services](../concepts/dev-services.md)**  
The Public Java API provides access to Alfresco through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.

**Parent topic:**[By Language](../concepts/dev-api-by-language.md)

