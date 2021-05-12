---
title: Java API
---

Provides Java API information.

The Alfresco Repository Java API is used to build embedded extensions.

-   **[Repository Java API](#repository-java-api)**  
The Repository Java API provides the ability to build server-side extensions in Alfresco Content Services.
-   **[Public Java API services](#public-java-api-services)**  
The Public Java API provides access to Alfresco Content Services through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.


## Repository Java API {#repository-java-api}

The Repository Java API provides the ability to build server-side extensions in Alfresco Content Services.

|Information|How to access the Java API and how to manage transactions|
|-----------|---------------------------------------------------------|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture), [API Intro]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide)|
|Description|The Public Java APIs, such as `NodeService` and `ContentService`, provides the ability to develop server-side extensions for Alfresco Content Services. There are a number of extension points that make use of the Public Java API, here are some of the most used ones: -   [Actions]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %})
-   [Scheduled jobs]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions)
-   [Workflow]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)
-   [Behaviors / policies]({% link content-services/5.2/develop/repo-ext-points/behavior-policies.md %}#behaviors/policies)
-   [Web scripts]({% link content-services/5.2/develop/api-reference.md %}#web-scripts)

When we want to use one of the public Java APIs from an implementation of one of these Extension Points, it follows a best practice. First acquire a reference to the `ServiceRegistry`. The service registry is basically a database of services, their instances and their locations. Clients of a service, such as the `NodeService`, then query the service registry to find the available instance of that service. When making calls to the `NodeService` we use the `RetryingTransactionHelper` for transaction management and redundancy. The following code snippet illustrates how to first inject the `ServiceRegistry` into a Spring bean:

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

If we are using these services in a cluster, then we need to remember that they are not cluster *aware*. So if we for example are using these services in a scheduled job, which will be kicked off on each node in the cluster, then we would have to use the `JobLockService` to lock the cluster so another node does not start executing the same job. For more information about this see [Scheduled jobs]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions).

To turn on logging so you can get details of 'why' transactions are retried use the following log level:

-   Summary: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=INFO`
-   Details: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=DEBUG`

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).

|-   aio/platform-jar/src/main/java/{domain specific directory path} - Java code
-   aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml - Spring Bean definitions

|
|More Information|-   [Public Java API Services Reference](#public-java-api-services)

|
|Sample Code|-   [Sample code demonstrating access to Public Java API](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/public-api-access-repo)

|

## Public Java API services {#public-java-api-services}

The Public Java API provides access to Alfresco Content Services through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.

The following table summarizes the main services available to the developer. These services are available via the [service registry](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/ServiceRegistry.html).

> **Important:** There is a wealth of additional information to be found in the [Public Java API access and transaction management documentation](#repository-java-api). This documentation also shows you how to obtain the service registry.

|Service|Description|Support Status|
|-------|-----------|--------------|
|[ActionService]({% link content-services/5.2/develop/api-reference.md %}#actionservice)|An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ActivityService]({% link content-services/5.2/develop/api-reference.md %}#activityservice)|A service to manage activity feeds.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AttributeService]({% link content-services/5.2/develop/api-reference.md %}#attributeservice)|This provides services for reading, writing, and querying global attributes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuditService]({% link content-services/5.2/develop/api-reference.md %}#auditservice)|This provides services for querying audit data and enabling and disabling auditing.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuthenticationService]({% link content-services/5.2/develop/api-reference.md %}#authenticationservice)|This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuthorityService]({% link content-services/5.2/develop/api-reference.md %}#authorityservice)|This service provides an API to encapsulate authorities granted to users.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CategoryService]({% link content-services/5.2/develop/api-reference.md %}#categoryservice)|Provides a system for creating and managing categories of nodes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CheckOutCheckInService]({% link content-services/5.2/develop/api-reference.md %}#checkoutcheckinservice)|Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ContentService]({% link content-services/5.2/develop/api-reference.md %}#contentservice)|A service for accessing and transforming content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CopyService]({% link content-services/5.2/develop/api-reference.md %}#copyservice)|This service provides methods to copy nodes within and across workspaces and to update the state of a node, with that of another node, within and across workspaces.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[DictionaryService]({% link content-services/5.2/develop/api-reference.md %}#dictionaryservice)|This service represents the repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content meta-data is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same repository without name clashes (as long their namespace is different).|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[FileFolderService]({% link content-services/5.2/develop/api-reference.md %}#filefolderservice)|Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[JobLockService]({% link content-services/5.2/develop/api-reference.md %}#joblockservice)|This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[LockService]({% link content-services/5.2/develop/api-reference.md %}#lockservice)|A low-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[MessageService]({% link content-services/5.2/develop/api-reference.md %}#messageservice)|Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the Repository.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[MimetypeService]({% link content-services/5.2/develop/api-reference.md %}#mimetypeservice)|Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ModuleService]({% link content-services/5.2/develop/api-reference.md %}#moduleservice)|A service to control and provide information about the currently-installed modules.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NamespaceService]({% link content-services/5.2/develop/api-reference.md %}#namespaceservice)|Provides access to and definition of namespace URIs and prefixes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NodeService]({% link content-services/5.2/develop/api-reference.md %}#nodeservice)|Provides an API for managing nodes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NodeLocatorService]({% link content-services/5.2/develop/api-reference.md %}#nodelocatorservice)|The NodeLocatorService looks up node locators registered via Spring configuration by name.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[PermissionService]({% link content-services/5.2/develop/api-reference.md %}#permissionservice)|Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[PersonService]({% link content-services/5.2/develop/api-reference.md %}#personservice)|This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[RenditionService]({% link content-services/5.2/develop/api-reference.md %}#renditionservice)|Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[RetryingTransactionHelper]({% link content-services/5.2/develop/api-reference.md %}#retryingtransactionhelper)|A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[SearchService]({% link content-services/5.2/develop/java-api-guide.md %}#searchservice)|This encapsulates the execution of search against different indexing mechanisms.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[SiteService]({% link content-services/5.2/develop/api-reference.md %}#siteservice)|Provides an extensive API for managing sites in Alfresco Share.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TaggingService]({% link content-services/5.2/develop/api-reference.md %}#taggingservice)|It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TemplateService]({% link content-services/5.2/develop/api-reference.md %}#templateservice)|Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TenantService]({% link content-services/5.2/develop/api-reference.md %}#tenantservice)|Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[VersionService]({% link content-services/5.2/develop/api-reference.md %}#versionservice)|Provides an API for managing the versions of a piece of content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[WorkflowService]({% link content-services/5.2/develop/api-reference.md %}#workflowservice)|Provides a client-facing API for interacting with workflows and tasks.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|

-   **[ActionService](#actionservice)**  
An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.
-   **[ActivityService](#activityservice)**  
The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.
-   **[AttributeService](#attributeservice)**  
This provides services for reading, writing, and querying global attributes.
-   **[AuditService](#auditservice)**  
The API by which applications can query the audit logs and enable or disable auditing.
-   **[AuthenticationService](#authenticationservice)**  
This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.
-   **[AuthorityService](#authorityservice)**  
The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.
-   **[CategoryService](#categoryservice)**  
Provides an API for creating and managing categories of nodes.
-   **[CheckOutCheckInService](#checkoutcheckinservice)**  
Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.
-   **[ContentService](#contentservice)**  
A service for accessing and transforming content.
-   **[CopyService](#copyservice)**  
This service provides methods to copy nodes within and across workspaces. It also provides support to update the state of a node, with that of another node, within and across workspaces.
-   **[DictionaryService](#dictionaryservice)**  
This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content metadata is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes (as long their namespace is different).
-   **[FileFolderService](#filefolderservice)**  
Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.
-   **[JobLockService](#joblockservice)**  
This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.
-   **[LockService](#lockservice)**  
A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.
-   **[MessageService](#messageservice)**  
Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.
-   **[MimetypeService](#messageservice)**  
Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.
-   **[ModuleService](#moduleservice)**  
A service to control and provide information about the currently-installed modules.
-   **[NamespaceService](#namespaceservice)**  
Provides access to and definition of namespace URIs and Prefixes.
-   **[NodeService](#nodeservice)**  
Provides an API for managing nodes.
-   **[NodeLocatorService](#nodelocatorservice)**  
The NodeLocatorService looks up node locators registered via Spring configuration by name.
-   **[PermissionService](#permissionservice)**  
Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.
-   **[PersonService](#personservice)**  
This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.
-   **[RenditionService](#renditionservice)**  
Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.
-   **[RetryingTransactionHelper](#retryingtransactionhelper)**  
A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.
-   **[SearchService](#searchservice)**  
This encapsulates the execution of search against different indexing mechanisms.
-   **[SiteService](#siteservice)**  
Provides an extensive API for managing sites in Alfresco Share.
-   **[TaggingService](#taggingservice)**  
It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.
-   **[TemplateService](#templateservice)**  
Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.
-   **[TenantService](#tenantservice)**  
Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.
-   **[VersionService](#versionservice)**  
Provides an API for managing the versions of a piece of content.
-   **[WorkflowService](#workflowservice)**  
Provides a client-facing API for interacting with workflows and tasks.

### ActionService {#actionservice}

An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.

|Information|ActionService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|An Action is a unit of work that can be carried out on a node. Actions are commonly used in conjunction with Rules, but that is not mandatory. When you create Rules for a folder, you can specify certain Actions to occur to nodes added to the folder. For example, when a Word document is added to a folder, you may want a PDF to be automatically generated, or a notification email to sent. There are a number of built-in Actions available by default: -   Execute Script
-   Copy
-   Move
-   Checkin
-   Checkout
-   Link to category
-   Add Aspect
-   Remove Aspect
-   Add simple workflow
-   Send email
-   Transform and copy content
-   Transform and copy image
-   Extract common metadata fields
-   Import
-   Specialise type
-   Increment counter
-   Set property value

 You can also create custom Actions to do whatever you want to content added to the folder.

 While Actions are typically triggered by Rules, you can also invoke them directly by selecting them from a menu item. The Action Service also allows you to call them directly from code. Any piece of code that can access the ActionService can invoke the Action, for example:

 -   JavaScript
-   Workflow
-   Web script
-   Java

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/action/ActionService.html)|
|Java example|```
public void sendEmailWithDoc(String to, String subject, String bodyText, NodeRef docNodeRef) {
    boolean executeAsync = true;
    Map<String, Serializable> aParams = new HashMap<String, Serializable>();
    aParams.put("to", to);
    aParams.put("subject", subject);
    aParams.put("body_text", bodyText);

    Action a = serviceRegistry.getActionService().createAction("send-as-email", aParams);
    if (a != null) {
       serviceRegistry.getActionService().executeAction(a, docNodeRef, true, executeAsync);
    } else {
       throw new RuntimeException("Could not create send-as-email action");
    }
}
```|
|More Information|-   [Actions platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}).
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|
|Tutorials|[Jeff Potts Custom Action tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html)|

### ActivityService {#activityservice}

The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.

|Information|ActivityService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|What is an activity?

 -   Activity represents an action that has taken place within a client interface (app/tool)
-   Activity is typically initiated by the app/tool/component/service on behalf of a user (it is not necessarily initiated by the underlying repository)
-   Activity is of a given/named type specified by the app/tool (for example document added)
-   Activity is performed at a particular point in time (post date)
-   Activity may have associated data dependent on type of activity
-   Activity may be performed within a given site/network context
-   Activity may be performed within a given app/tool context
-   Activity may be sensitive, that is, associated with data that is permission controlled, therefore, the activity itself may be permission controlled (can or can't be read)
-   Activity may be rendered into one or more UI views (activity summary)

 Activities may be raised by one or more Alfresco Content Services applications. The posted activity must have a uniquely named activity type.

 Examples of activity types include:

 -   Added, updated, and deleted documents
-   Triggered on versioning
-   Includes changes to metadata (explicitly denoted in feed)
-   Does not include updates to tags
-   Uploaded and expanded ZIP
-   Added and deleted folders
-   Added and removed members (person joined/left site)
-   User role changes (change of user role for a site)
-   New comments (on any artifact in a site, including documents, blog entries, and so on.)
-   Workflow-generated activities (requires explicit posting via customizing workflow definition)
-   Added, updated, and deleted events (calendar entries)
-   Published, updated, and deleted wiki pages
-   Published, updated, and deleted blog entries
-   Blog entry published to external blog engine

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/index.html?org/alfresco/service/cmr/activities/ActivityService.html)|
|Tutorials|See the following [blog post](http://alfresco.blog.redpill-linpro.com/2015/11/26/posting-custom-events-to-the-activity-feed/).|

### AttributeService {#attributeservice}

This provides services for reading, writing, and querying global attributes.

|Information|AttributeService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `AttributeService` is used to get and set global, arbitrary attributes. Attributes typically have a key and a value, where the key consists of three segments (known as a key set) and a value. Attributes are stored in the database so they persist over server restarts. An example of use is for persisting system-wide JMX configuration properties in Alfresco Content Services. The `AttributeService` class provides a Java interface for creating and managing attributes, including methods such as:

-   `Serializable getAttribute(Serializable ... keys)` - get an attribute using a list of unique keys
-   `getAttributes(AttributeQueryCallback callback, Serializable ... keys)` - Getting a collection of attributes
-   `Serializable getAttribute(Serializable ... keys)` - Getting a single attribute
-   `setAttribute(Serializable value, Serializable ... keys)` - Set attribute or create attribute if doesn't exist
-   `removeAttribute(Serializable ... keys)` - Removing an attribute
-   `removeAttributes(Serializable ... keys)` - Removing a collection of attributes

Collections of Attributes can be processed on retrieval by implementing a callback handler object. The callback handler object's `handleAttribute` method is invoked for each attribute retrieved.

**Note**. The `AttributeService` is not what you would use to get the attributes (more correctly, "properties") of a node. Use the [NodeService]({% link content-services/5.2/develop/api-reference.md %}#nodeservice) class for that.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/attributes/AttributeService.html)|
|Java example|The following example shows how you could map a unique document identifier to an Alfresco node reference independtly of nodes: ```
public class DocId2NodeRefMapper {
    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public static final String ROOT_ATTR_PATH = "docId2NodeRefMappings";
    public static final String DOC_ID_ATTR_NAME = "documentId";

    public void mapDocId2NodeRef(String doc_id, NodeRef nodeRef) {
 
        // Check if mapping to node ref is already set up
        if (this.serviceRegistry.getAttributeService().exists(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id)) {
 
            // Check to see if this node has already been registered
            if (!this.serviceRegistry.getAttributeService().getAttribute(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id).equals(nodeRef)) {
                throw new RuntimeException("Duplicate entry id:" + doc_id);
            }
        }

        // Register node reference under document identifier
        this.serviceRegistry.getAttributeService().setAttribute(nodeRef, ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id);
    }
}
```

Notice how when you set the attribute value the value is the first parameter of the `setAttribute` method.

| |
|More Information|-   [Tech Talk Live video](https://www.youtube.com/watch?v=obQ_89MFtRs)
-   [AttributeService Primer video](https://vimeo.com/67580571)
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### AuditService {#auditservice}

The API by which applications can query the audit logs and enable or disable auditing.

|Information|AuditService|
|-----------|------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The AuditService API provides faciities to query audit data. There are also methods to clear audit data, enable and disable auditing, and check auditing status.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/audit/AuditService.html)|
|Java example|```

                  
    /**
     * Returns content changes.
     */
    public ObjectList getContentChanges(Holder<String> changeLogToken, BigInteger maxItems)
    {
        final ObjectListImpl result = new ObjectListImpl();
        result.setObjects(new ArrayList<ObjectData>());

        EntryIdCallback changeLogCollectingCallback = new EntryIdCallback(true)
        {
            @Override
            public boolean handleAuditEntry(Long entryId, String user, long time, Map<String, Serializable> values)
            {
                result.getObjects().addAll(createChangeEvents(time, values));
                return super.handleAuditEntry(entryId, user, time, values);
            }
        };

        Long from = null;
        if ((changeLogToken != null) && (changeLogToken.getValue() != null))
        {
            try
            {
                from = Long.parseLong(changeLogToken.getValue());
            }
            catch (NumberFormatException e)
            {
                throw new CmisInvalidArgumentException("Invalid change log token: " + changeLogToken);
            }
        }

        AuditQueryParameters params = new AuditQueryParameters();
        params.setApplicationName(CMIS_CHANGELOG_AUDIT_APPLICATION);
        params.setForward(true);
        params.setFromId(from);

        int maxResults = (maxItems == null ? 0 : maxItems.intValue());
        maxResults = (maxResults < 1 ? 0 : maxResults + 1);

        auditService.auditQuery(changeLogCollectingCallback, params, maxResults);

        String newChangeLogToken = null;
        if (maxResults > 0)
        {
            if (result.getObjects().size() >= maxResults)
            {
            	StringBuilder clt = new StringBuilder();
                newChangeLogToken = (from == null ? clt.append(maxItems.intValue() + 1).toString() : clt.append(from.longValue() + maxItems.intValue()).toString());
                result.getObjects().remove(result.getObjects().size() - 1).getId();
                result.setHasMoreItems(true);
            }
            else
            {
                result.setHasMoreItems(false);
            }
        }

        if (changeLogToken != null)
        {
            changeLogToken.setValue(newChangeLogToken);
        }

        return result;
    }
                  
                  
               
```

|
|More Information|-   [Audit platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/audit-log.md %}#audit-log).
-   [Auditing]({% link content-services/5.2/admin/audit.md %}#auditing) provides a detailed overview of auditing.

|
|Tutorials|-   [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y) DevCon presentation by Mehdi Belmekki.
-   [Audit and Reporting with Alfresco and NoSQL by Zaizi](http://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture)
-   [Audit tutorials]({% link content-services/5.2/admin/audit.md %}#auditing-tutorials)

|

### AuthenticationService {#authenticationservice}

This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.

|Information|AuthenticationService|
|-----------|---------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Authentication is required at various access points into the repository. For example web scripts, CMIS, CIFS, FTP, WebDAV, and web clients represent access points where authentication needs to take place. Authentication can be via a ticket, a username and password pair, or some other mechanism. The authentication service provides an API to:

-   Authenticate using a user name and password
-   Authenticate using a ticket
-   Create, update and delete authentication information
-   Clear the current authentication
-   Invalidate a ticket
-   Get the username for who is currently authenticated
-   Get a ticket for subsequent re-authentication
-   Determine if the current user is "the system user"

Not all implementations will support creating, updating and deleting authentication information.

The authenticated username is used as the key to obtain other security information such as group membership, the details about the person, to record a user as the owner of an object. It is one of the identifiers against which permissions may be assigned.

The authentication service does not provide any details about a user other than authentication.

The authentication service stores authentication information on the calling thread. Application developers should ensure that this information is cleared.

 The authentication service brings together three components:

 -   The authentication component
-   The authentication DAO
-   The ticket component

 The authentication component supports authentication only. The authentication DAO provides an API to create, delete and update authentication information. The ticket component is resposible for managing and storing tickets that may be obtained after authentication and used in place of authentication.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/AuthenticationService.html)|
|Java example|```

                  

// Get service registry
ServiceRegistry serviceRegistry = (ServiceRegistry) beanFactory.getBean(ServiceRegistry.SERVICE_REGISTRY);

// Get services
AuthenticationService authService = (AuthenticationService)serviceRegistry.getAuthenticationService();
PersonService personService = (PersonService)serviceRegistry.getPersonService();

// Get current user
NodeRef person = personService.getPerson(authService.getCurrentUserName());


               
```

|
|More Information|-   [Authentication service documentation]({% link content-services/5.2/admin/security.md %}#authentication-service)
-   [AuthorityService JavaScript API documentation]({% link content-services/5.2/develop/api-reference.md %}#authority-service)
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### AuthorityService {#authorityservice}

The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.

|Information|AuthorityService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Authority is a general term to describe a group, user, or role. The AuthorityService provides an API to: -   Add and delete authorities.
-   Get authorities.
-   Retrieve authority details such as short name.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/AuthorityService.html)|
|Java example|```


    /**
     * Search the root groups, those without a parent group.
     * 
     * @param paging Paging object with max number to return, and items to skip
     * @param sortBy What to sort on (authorityName, shortName or displayName)
     * @return The root groups (empty if there are no root groups)
     */
    public ScriptGroup[] searchRootGroupsInZone(String displayNamePattern, String zone, ScriptPagingDetails paging, String sortBy)
    {
        Set<String> authorities;
        try 
        {
            authorities = authorityService.findAuthorities(AuthorityType.GROUP,
                    null, true, displayNamePattern, zone);
        }
        catch (UnknownAuthorityException e)
        {
            authorities = Collections.emptySet();
        }
        return makeScriptGroups(authorities, paging, sortBy, serviceRegistry, this.getScope());
    }
                 
               
```

|
|More Information|-   [Authentication service documentation]({% link content-services/5.2/admin/security.md %}#authentication-service)
-   [AuthorityService JavaScript API documentation]({% link content-services/5.2/develop/api-reference.md %}#authority-service)
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### CategoryService {#categoryservice}

Provides an API for creating and managing categories of nodes.

|Information|CategoryService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Categories provide a system for organizing content. Unlike tags, which have no hierarchical structure, and which can be created and applied by anyone, categories are created by the Administrator, and are hierarchical in nature. For example, You might have a Europe category, and then sub-categories such as France, Germany, Spain, and so on. The top Category in the hierarchical structure is known as the Root Category. The CategoryService API provides methods to perform actions such as the following:

 -   Create a Category
-   Create a root Category
-   Delete a Category
-   Create a Classification (a grouping of Categories)
-   Delete a Classification
-   Get most popular Categories

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/CategoryService.html)|
|Java example|```

                  
// To create a root category:
NodeRef newRootCat = categoryService.createRootCategory(
      spacesStore, 
      ContentModel.ASPECT_GEN_CLASSIFIABLE, 
      "newRootCat");

// To create a category
NodeRef newCategory = categoryService.createCategory(newRootCat, "newCategory");

               
```

|
|More Information|-   [Tagging and Categorizing Content]({% link content-services/5.2/using/content/manage.md %}#tagging-and-categorizing-content)
-   [Category Manager documentation]({% link content-services/5.2/admin/share-admin-tools.md %}#category-manager)
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### CheckOutCheckInService {#checkoutcheckinservice}

Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.

|Information|CheckOutCheckInService|
|-----------|----------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Check out locks the item and creates a working copy that can be edited. The locked item can be viewed by others, but not changed. When the item is checked in, the working copy replaces the original item and removes the lock. Methods are provided to: -   Check out a node
-   Check in a node
-   Check if a node is a working copy
-   Check if a node is locked (checked out)
-   Cancel a check out for a given working copy
-   Get a working copy
-   Get the original checked out node

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/coci/CheckOutCheckInService.html)|
|Java example|```

                  
CheckOutCheckInService checkOutCheckInService = serviceRegistry.getCheckOutCheckInService();

NodeRef checkedOutCopy = checkOutCheckInService.checkout(nodeRef);


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### ContentService {#contentService}

A service for accessing and transforming content.

|Information|ContentService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The ContentService provides an API for accessing and transforming content. You may want to read the content associated with a node, or transform the content from one format to another, for example from .ppt to .pdf. Methods provided by the API includes functionality to: -   Get obtainable transformers (to convert one mimetype to another)
-   Get a suitable reader for a content type. The returned ContentReader will have a getContent method to actually read the content to a specified file.
-   Get a suitable writer for a content type. The returned ContentWriter will have a putContent method to write the content to a specified file.
-   Transform content from one mimetype to another.
-   Get a transformer suitable for transforming images.
-   Utility methods (for example to check size of content and free space in the content store).

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/ContentService.html)|
|Java example|```

                  
// Read data associated with a content NodeRef (plain text)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);

// Reading the data content of a NodeRef (binary)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);
InputStream originalInputStream = reader.getContentInputStream();
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
final int BUF_SIZE = 1 << 8; //1KiB buffer
byte[] buffer = new byte[BUF_SIZE];
int bytesRead = -1;
while((bytesRead = originalInputStream.read(buffer)) > -1) {
 outputStream.write(buffer, 0, bytesRead);
}
originalInputStream.close();
byte[] binaryData = outputStream.toByteArray();

// Writing data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.putContent(new ByteArrayInputStream(content));

// Writing a file's data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.setLocale(CONTENT_LOCALE);
File file = new File("c:/temp/images/BigCheese1.bmp");
writer.setMimetype("image/bmp");
writer.putContent(file);

// Transforming a PPT to PDF (also works for other file formats)

ContentReader pptReader = contentService.getReader(pptNodeRef, ContentModel.PROP_CONTENT);
ContentWriter pdfWriter = contentService.getWriter(pdfNodeRef, ContentModel.PROP_CONTENT, true);
ContentTransformer pptToPdfTransformer =
    contentService.getTransformer(MimetypeMap.MIMETYPE_PPT, MimetypeMap.MIMETYPE_PDF);
pptToPdfTransformer.transform(pptReader, pdfWriter);

/**
 * Creates a new content node setting the content provided.
 *
 * @param  parent   the parent node reference
 * @param  name     the name of the newly created content object
 * @param  text     the content text to be set on the newly created node
 * @return NodeRef  node reference to the newly created content node
 */
 
private NodeRef createContentNode(NodeRef parent, String name, String text)
{

    // Create a map to contain the values of the properties of the node
        
    Map<QName, Serializable> props = new HashMap<QName, Serializable>(1);
    props.put(ContentModel.PROP_NAME, name);  

    // use the node service to create a new node
    NodeRef node = this.nodeService.createNode(
                        parent, 
                        ContentModel.ASSOC_CONTAINS, 
                        QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, name),
                        ContentModel.TYPE_CONTENT, 
                        props).getChildRef();
                        
    // Use the content service to set the content onto the newly created node
    ContentWriter writer = this.contentService.getWriter(node, ContentModel.PROP_CONTENT, true);
    writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
    writer.setEncoding("UTF-8");
    writer.putContent(text);
    
    // Return a node reference to the newly created node
    return node;
} 


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### CopyService {#copyservice}

This service provides methods to copy nodes within and across workspaces. It also provides support to update the state of a node, with that of another node, within and across workspaces.

|Information|CopyService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|It is very useful to able to copy nodes. When copying container nodes (folders) you also have the option to copy child nodes. Operations provided by the service include: -   Copy a node, along with (optionally) its children.
-   Copy and rename a node.
-   Get the copies of a specified node (with paged results).
-   Check if the name of a top-level node will be changed during copy, due to policies in place.
-   Given the copied node, obtain the original node.

 Copies can be performed across workspaces.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/CopyService.html)|
|Java example|```

                  
/*
 * Copyright (C) 2005-2014 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * 
 */
package org.alfresco.repo.action.executer;

import java.util.List;
import java.util.Set;

import org.alfresco.model.ContentModel;
import org.alfresco.query.PagingRequest;
import org.alfresco.query.PagingResults;
import org.alfresco.repo.action.ParameterDefinitionImpl;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.coci.CheckOutCheckInService;
import org.alfresco.service.cmr.dictionary.DataTypeDefinition;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.CopyService;
import org.alfresco.service.cmr.repository.CopyService.CopyInfo;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.rule.RuleServiceException;
import org.alfresco.service.namespace.QName;

/**
 * Copy action executor.
 * <p>
 * Copies the actioned upon node to a specified location.
 * 
 * @author Roy Wetherall
 */
public class CopyActionExecuter extends ActionExecuterAbstractBase
{
    public static final String ERR_OVERWRITE = "Unable to overwrite copy because more than one have been found.";
    
    public static final String NAME = "copy";
    public static final String PARAM_DESTINATION_FOLDER = "destination-folder";
    public static final String PARAM_DEEP_COPY = "deep-copy";
    public static final String PARAM_OVERWRITE_COPY = "overwrite-copy";
    
    private CopyService copyService;
	
	/**
	 * The node service
	 */
    private NodeService nodeService;
	private CheckOutCheckInService checkOutCheckInService;
    
    /**
     * Sets the node service
     */
    public void setNodeService(NodeService nodeService) 
    {
        this.nodeService = nodeService;
    }
    
    /**
     * Sets the copy service
     */
    public void setCopyService(CopyService copyService) 
    {
        this.copyService = copyService;
    }
    

	/**
	 * Service to determine check-in or check-out status
	 */
	public void setCheckOutCheckInService(CheckOutCheckInService checkOutCheckInService)
    {
        this.checkOutCheckInService = checkOutCheckInService;
    }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) 
    {
        paramList.add(new ParameterDefinitionImpl(PARAM_DESTINATION_FOLDER, DataTypeDefinition.NODE_REF, true, getParamDisplayLabel(PARAM_DESTINATION_FOLDER)));
        paramList.add(new ParameterDefinitionImpl(PARAM_DEEP_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_DEEP_COPY)));		
        paramList.add(new ParameterDefinitionImpl(PARAM_OVERWRITE_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_OVERWRITE_COPY)));
    }

	@Override
    public void executeImpl(Action ruleAction, NodeRef actionedUponNodeRef)
    {
        if (!nodeService.exists(actionedUponNodeRef))
        {
            return;
        }
        NodeRef destinationParent = (NodeRef) ruleAction.getParameterValue(PARAM_DESTINATION_FOLDER);

        // Check the destination not to be in a pending delete list
        // MNT-11695
        Set<QName> destinationAspects = nodeService.getAspects(destinationParent);
        if (destinationAspects.contains(ContentModel.ASPECT_PENDING_DELETE))
        {
            return;
        }

        // Get the deep copy value
        boolean deepCopy = false;
        Boolean deepCopyValue = (Boolean)ruleAction.getParameterValue(PARAM_DEEP_COPY);
        if (deepCopyValue != null)
        {
            deepCopy = deepCopyValue.booleanValue();
        }
	        
        // Get the overwirte value
        boolean overwrite = true;
        Boolean overwriteValue = (Boolean)ruleAction.getParameterValue(PARAM_OVERWRITE_COPY);
        if (overwriteValue != null)
        {
            overwrite = overwriteValue.booleanValue();
        }
        
        // Since we are overwriting we need to figure out whether the destination node exists
        NodeRef copyNodeRef = null;
        if (overwrite == true)
        {
            // Try and find copies of the actioned upon node reference.
            // Include the parent folder because that's where the copy will be if this action
            // had done the first copy.
            PagingResults<CopyInfo> copies = copyService.getCopies(
                    actionedUponNodeRef,
                    destinationParent,
                    new PagingRequest(1000));
            for (CopyInfo copyInfo : copies.getPage())
            {
                NodeRef copy = copyInfo.getNodeRef();
                // We know that it is in the destination parent, but avoid working copies
                if (checkOutCheckInService.isWorkingCopy(copy))
                {
                    continue;
                }
                if (copyNodeRef == null)
                {
                    copyNodeRef = copy;
                }
                else
                {
                    throw new RuleServiceException(ERR_OVERWRITE);
                }
            }
        }
        
        if (copyNodeRef != null)
        {
            // Overwrite the state of the destination node ref with the actioned upon node state
            this.copyService.copy(actionedUponNodeRef, copyNodeRef);
        }
        else
        {
            ChildAssociationRef originalAssoc = nodeService.getPrimaryParent(actionedUponNodeRef);
            // Create a new copy of the node
            this.copyService.copyAndRename(
	                actionedUponNodeRef, 
	                destinationParent,
                    originalAssoc.getTypeQName(),
                    originalAssoc.getQName(),
	                deepCopy);
        }
    }
}


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### DictionaryService {#dictionaryservice}

This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content metadata is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes (as long their namespace is different).

|Information|DictionaryService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The DictionaryService provides access to the entire content meta-model. The content meta-model contains information of Types, DataTypes, Properties, Aspects, Associations and Constraints. Operations supported include: -   Get DataTypes, Types, Associations, Properties, Constraints, Classes from a Content Model.
-   Check if a class is a sub-class.
-   Get SubTypes and SubAspects.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/dictionary/DictionaryService.html)|
|Java example|```

                  
/**
     * Determines whether one class is a sub type of an other.  Returns true if it is, false otherwise.
     * 
     * @param clazz         the class to test
     * @param subTypeOf     test whether the class is a sub-type of this class
     * @return boolean      true if it is a sub-class, false otherwise
     */
    public boolean isSubTypeOf(final String clazz, final String subTypeOf)
    {
    	Boolean result = this.session.doSessionWork(new SessionWork<Boolean>()
    	{
			public Boolean doWork() 
			{
		        // Convert to full names if required
		        String fullClazz = DataDictionary.this.session.getNamespaceMap().getFullName(clazz);
		        String fullSubTypeOf = DataDictionary.this.session.getNamespaceMap().getFullName(subTypeOf);
		        
		        // Create the QNames for the passes classes
		        QName className = QName.createQName(fullClazz);
		        QName ofClassName = QName.createQName(fullSubTypeOf);
		        
		        // Return the result
		        return new Boolean(DataDictionary.this.dictionaryService.isSubClass(className, ofClassName));
			}
    	});
    	
    	return result.booleanValue();
    }                  

               
```

|
|More Information|-   [Content Model Extension Point]({% link content-services/5.2/develop/repo-ext-points/content-model.md %})
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### FileFolderService {#fileFolderService}

Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.

|Information|FileFolderService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `FileFolderService` provides methods for dealing with Files and Folders. This class is an abstraction of the [NodeService]({% link content-services/5.2/develop/api-reference.md %}#nodeservice) class, which you should look at if you want more control when creating folder and file nodes.

With the `FileFolderService` class the following type of operations are available:

-   Create a file or folder
-   Copy a file or folder
-   Move a file or folder
-   Delete a file or folder
-   Get Readers and Writers for a file
-   List files and folders (with paged results)

The methods typically work with a `NodeRef` for the node that represents the target file or folder.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/model/FileFolderService.html)|
|Java example|The following example uses the `FileFolderService` to create a folder and then a file in this new folder.

The example code is executed inside a [Web Script]({% link content-services/5.2/develop/api-reference.md %}#web-scripts) so it will automatically be part of a transaction using the `RetryingTransactionHelper`, same thing if the code was executed from a [Repo Action]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}).

```
import org.alfresco.model.ContentModel;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.nodelocator.CompanyHomeNodeLocator;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.model.FileExistsException;
import org.alfresco.service.cmr.model.FileInfo;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * A Web Script that uses the FileFolderService to create a folder and a file.
 *
 * @author martin.bergljung@alfresco.com
 */
public class FileFolderServiceTestWebScript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(FileFolderServiceTestWebScript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'FileFolderServiceTestWebScript' Web Script was called ";

        FileInfo newFolderInfo = null;
        try {
            newFolderInfo = createFolder("Some Folder");
            message += "and a folder was created: " + newFolderInfo;
        } catch (FileExistsException fee) {
            message += "and there was a problem creating a folder: " + fee.getMessage();
        }

        if (newFolderInfo != null) {
            FileInfo newFileInfo = null;
            try {
                newFileInfo = createFile(newFolderInfo,"some.txt", "Some text content...");
                message += ", a text file was then created in this folder: " + newFileInfo;
            } catch (FileExistsException fee) {
                message += ", there was a problem creating a file in the new folder: " + fee.getMessage();
            }
        }

        logger.info(message);

        model.put("message", message);

        return model;
    }

    /**
     * Create a folder under the /Company Home folder.
     *
     * @param folderName the name of the folder
     * @return a FileInfo object with data about the new folder, such as NodeRef
     */
    private FileInfo createFolder(String folderName) throws FileExistsException {

        // Get a NodeRef for /Company Home folder
        NodeRef parentFolderNodeRef = serviceRegistry.getNodeLocatorService().getNode(
                CompanyHomeNodeLocator.NAME, null, null);

        // Create the folder under /Company Home
        FileInfo folderInfo = serviceRegistry.getFileFolderService().create(
                parentFolderNodeRef, folderName, ContentModel.TYPE_FOLDER);

        return folderInfo;
    }

    /**
     * Create a file under the passed in folder.
     *
     * @param folderInfo the folder that the file should be created in
     * @param filename the name of the file
     * @param fileTxt the content of the file
     * @return a FileInfo object with data about the new file, such as NodeRef
     */
    private FileInfo createFile(FileInfo folderInfo, String filename, String fileTxt) throws FileExistsException {

        // Create the file under passed in folder, the file will be empty to start with
        FileInfo fileInfo = serviceRegistry.getFileFolderService().create(
                folderInfo.getNodeRef(), filename, ContentModel.TYPE_CONTENT);

        // Get the NodeRef for the new file from the FileInfo object
        NodeRef newFileNodeRef = fileInfo.getNodeRef();

        // Add some content to the file
        ContentWriter writer = serviceRegistry.getFileFolderService().getWriter(newFileNodeRef);
        writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
        writer.setEncoding("UTF-8");
        writer.putContent(fileTxt);

        return fileInfo;
    }
}
```

We use the `ServiceRegistry` to get to the `FileFolderService`. The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.filefolderservicetest.get"
		  class="org.alfresco.training.platformsample.FileFolderServiceTestWebScript"
		  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

**Note** how we catch the `FileExistsException` to deal with the situations when the folder or file already exists. This is a runtime exception so we are not forced to deal with it, but it's good practice to catch it and display a nice message to the end user.

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.desc.xml:**

```
<webscript>
    <shortname>FileFolderService Test Sample Webscript</shortname>
    <description>Uses the FileFolderService to create a folder and a file</description>
    <url>/sample/filefolderservicetest</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
  
```

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.html.ftl:**```
Message: '${message}'
```

Then, the first time we execute the Web Script ([http://localhost:8080/alfresco/s/sample/filefolderservicetest](http://localhost:8080/alfresco/s/sample/filefolderservicetest)) we will get a response looking something like this:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and a folder was created: FileInfo[name=Some Folder, isFolder=true, nodeRef=workspace://SpacesStore/91b0932a-5056-4607-a1bd-849ec655d16e], a text file was then created in this folder: FileInfo[name=some.txt, isFolder=false, nodeRef=workspace://SpacesStore/5b17ba0a-b0b5-4df1-bd37-91098cac7263]'*

If we now run the Web Script again, when the folder and file exist, the following response is returned:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and there was a problem creating a folder: 00270021 File or folder Some Folder already exists'*

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### JobLockService {#joblockservice}

This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.

|Information|JobLockService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `JobLockService` is used to provide a locking service at the job level, rather than the node level. It's for example used indirectly via the [AbstractScheduledLockedJob](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/schedule/AbstractScheduledLockedJob.java) `QuarzJobBean`.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/lock/JobLockService.html)|
|Java example|For an example of using the `JobLockService` see the [Content Store Cleaner code](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/repo/content/cleanup/ContentStoreCleaner.java) on GitHub.|
|More Information|-   [Scheduled Jobs extension point documentation]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions)
-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### LockService {#lockservice}

A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.

|Information|LockService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|If you need a node-level locking system, then the LockService can provide this. Functionality provided by the service includes: -   Checking for a lock on a node
-   Obtaining lock information
-   Locking and unlocking a node
-   Suspend and enable locks

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documention](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/lock/LockService.html)|
|Java example|```


/** 
 * Return whether a Node is currently locked
 * @param node             The Node wrapper to test against
 * @param lockService      The LockService to use
 * @return whether a Node is currently locked
 */
public static Boolean isNodeLocked(Node node,LockService lockService){
  Boolean locked=Boolean.FALSE;
  if (node.hasAspect(ContentModel.ASPECT_LOCKABLE)) {
    LockStatus lockStatus=lockService.getLockStatus(node.getNodeRef());
    if (lockStatus == LockStatus.LOCKED || lockStatus == LockStatus.LOCK_OWNER) {
      locked=Boolean.TRUE;
    }
  }
  return locked;
}

               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### MessageService {#messageservice}

Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.

|Information|MessageService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `MessageService` provides functionality around Internationalization (i18n). It provides facilities to:

-   Get a message based on a key from a localized properties file
-   Get and set the locale
-   Register and unregister resource bundles

All user displayed strings that originate in the repository should be externalised into resource bundles to ensure that the repository is fully localisable. Examples of strings requiring extraction include:

-   Descriptive display labels used by a client
-   Error messages

Extracted strings should be gathered into resource bundles by functional area. This enables functional areas to remain distinct within the repository.

The base bundle should be named by functional area and have the .properties extension. All base bundles should be in US English.

If a message needs to be parameterised the Java `MessageFormatter` style should be used.

The keys used in the resource bundles should be scoped by functional area to avoid clashes (this is important since at runtime the contents of the various resource bundles is combined, any names clashes will result in message values being overwritten).

A resource bundle can be placed anywhere in the source tree, but in general repository resource bundles should be placed in the `alfresco.messages` package.

Example resource bundle contents:

```
## User displayed string for the rule service functional area {#user-displayed-string-for-the-rule-service-functional-area}

ruleservice.error=There has been an error executing rule {0}.
ruleservice.confimation_all=All rules have been executed.
```

Before a resource bundle can be used by the repository it must be registered. Suitable methods are provided by the service to support this. And more commonly the `org.alfresco.i18n.ResourceBundleBootstrapComponent` class can be used as a Spring bean to register resource bundles.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Localization files: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/i18n/MessageService.html)|
|Java example|The following example uses a Web Script to test registered resource bundles as follows: ```
import org.alfresco.service.ServiceRegistry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * A Web Script that can be used to test the MessageService class.
 *
 * @author martin.bergljung@alfresco.com
 */
public class MessageServiceTestWebscript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(MessageServiceTestWebscript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        String key = req.getParameter("key");
        String language = req.getParameter("language");
        Locale locale = Locale.forLanguageTag(language);

        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'MessageServiceTestWebscript' Web Script was called: <br/>";

        message += "Locale: " + locale.getDisplayName() + "<br/>";
        message += "Translation of " + key + ": " + this.serviceRegistry.getMessageService().getMessage(key, locale);

        logger.info(message);

        model.put("message", message);

        return model;
    }
}
```

This Web Script is called with two parameters, one specifies the resource string we want (i.e. `key`) and one specifies the language we want the resource string text in (i.e. `language`).

We then use the `ServiceRegistry` to get to the `MessageService`, and then the `getMessage` method is called to get the requested message in correct locale.

The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.messageservicetest.get"
	  class="org.alfresco.training.platformsample.MessageServiceTestWebscript"
	  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.desc.xml:**

```
<webscript>
    <shortname>MessageService Test Sample Webscript</shortname>
    <description>Get a message for a specific key and language, uses the MessageService</description>
    <url>/sample/messageservicetest?key={key}&amp;language={language}</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
```

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.html.ftl:**```
${message} 
```

And add two resource files as follows:

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages.properties:**

```
alfresco.tutorial.hello=Hello
```

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages_sv.properties:**```
alfresco.tutorial.hello=Hej
```

These two resource files can be loaded by defining the following Spring bean:

```
<bean id="org.alfresco.tutorial.test.i18nResourceBundles"
          class="org.alfresco.i18n.ResourceBundleBootstrapComponent">
    <property name="resourceBundles">
        <list>
            <value>alfresco.module.${project.artifactId}.messages.test-messages</value>
        </list>
    </property>
</bean>
```

Then we can call the Web Script with the following URL:

[http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en)

The response in the browser will look something like this:

*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: English*

*Translation of alfresco.tutorial.hello: Hello*

If we call it with the other locale (sv) the response looks like this ([http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv)):*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: Swedish*

*Translation of alfresco.tutorial.hello: Hej*

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### MimetypeService {#mimetypeService}

Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.

|Information|MimetypeService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Alfresco Content Services supports numerous mimetypes out-of-the-box. However, it is also possible to add your own custom mimetypes. The MimetypeService provides an API for managing mimetypes. For example, you can obtain a list of current mimetypes, mimetype extensions, and guess mimetypes using a specified file and content reader.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/MimetypeService.html)|
|Java example|```

                  
// Using mimetype service when writing content

ContentWriter contentWriter = contentService.getWriter(node, ContentModel.PROP_CONTENT, true);

contentWriter.setMimetype(mimetypeService.guessMimetype(filename));

contentWriter.putContent(field.getInputStream());                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Mimetype platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})

|

### ModuleService {#moduleservice}

A service to control and provide information about the currently-installed modules.

|Information|ModuleService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|A module is an extension to Alfresco Content Services that is developed with a particular project structure and packaging. Modules can be registered and loaded as part of the boot process. In Share Admin Tools, you can [view the currently installed Modules]({% link content-services/5.2/develop/extension-packaging.md %}#extension-packaging-modules). The ModuleService provides functionality to programmatically start up and shut down modules, and get module information.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/module/ModuleService.html)|
|Java example|```

                  
// Get all Modules

List<ModuleDetails> modules = moduleService.getAllModules();
loggerService.info(I18NUtil.getMessage(MSG_FOUND_MODULES, modules.size()));

for (ModuleDetails module : modules)
{
  Map<String, ModuleComponent> components = getComponents(module.getId());
  for (ModuleComponent component : components.values())
  {
      component.shutdown();
  }
}
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### NamespaceService {#namespaceservice}

Provides access to and definition of namespace URIs and Prefixes.

|Information|NamespaceService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `NamespaceService` has constants defined for the major namespaces used by internal Alfresco content models, including the prefixes for those.

 Alfresco Content Services namespaces start with http://www.alfresco.org. The top-level namespace sub-divisions are:

-   model - identify a data model
-   view - identify a view of content held in the repository
-   ws - identify a Web Service definition
-   test - identify a test definition

Each namespace typically ends with its version number.

**Registry**

Note: This list will expand / change between now and the next release.

|Namespace|Common Prefix|Description|
|---------|-------------|-----------|
|http://www.alfresco.org|alf|General Namespace|
|http://www.alfresco.org/model/dictionary/1.0|d|Data Dictionary model|
|http://www.alfresco.org/model/system/1.0|sys|Repository system model|
|http://www.alfresco.org/model/content/1.0|cm|Content Domain model|
|http://www.alfresco.org/model/application/1.0|app|Application model|
|http://www.alfresco.org/model/bpm/1.0|bpm|Business Process Model|
|http://www.alfresco.org/model/site/1.0|st|Site Model|
|http://www.alfresco.org/model/forum/1.0|fm|Forum Model|
|http://www.alfresco.org/model/user/1.0|usr|User model (in repository.jar)|
|http://www.alfresco.org/view/repository/1.0|view|Import / Export View|
|http://www.alfresco.org/model/action/1.0|act|Action service model|
|http://www.alfresco.org/model/rule/1.0|rule|Rule service model|
|http://www.alfresco.org/ws/service/authentication/1.0|auth|Authentication Web Service|
|http://www.alfresco.org/ws/service/repository/1.0|rep|Repository Web Service|
|http://www.alfresco.org/ws/service/content/1.0|content|Content Web Service|
|http://www.alfresco.org/ws/service/authoring/1.0|author|Authoring Web Service|
|http://www.alfresco.org/ws/service/classification/1.0|cls|Classification Web Service|
|http://www.alfresco.org/ws/cml/1.0|cml|Content Manipulation Language|
|http://www.alfresco.org/ws/model/content/1.0|cm|Web Service Content Domain Model|
|http://www.alfresco.org/model/workflow/1.0|wf|Workflow Model (link is to the simple workflow model, not generally extended)|

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/namespace/NamespaceService.html)|
|Java example|It's common to use the `NamespaceService` to get to prefixes for content models, such as in this example:

 ```
String companyHomePath = serviceRegistry.getNodeService().getPath(companyHome)
               .toPrefixString(serviceRegistry.getNamespaceService());
```

 This code would result in `companyHomePath` being set to `/app:company_home`.

 Another example usage is the following code that uses the `NamespaceService` when a `QName` is created:

 ```
String name = "aName";
QName aQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, QName.createValidLocalName(name));
```

 This code would result in `aQName` being set to `{http://www.alfresco.org/model/content/1.0}aName`.

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### NodeService {#nodeservice}

Provides an API for managing nodes.

|Information|NodeService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Nodes are the fundamental data structure in Alfresco Content Services. All content that is stored is represented by a node data structure, which contains content metadata and is persisted in a database (such as PostgreSQL). The content referenced by the node is stored as a *.bin file in a content store (such as the file system, S3, encrypted or other content store). Every node in the system is referenced by a NodeRef, which is made up of the content store protocol, the content store name, and the Universal Unique Identifier (UUID) of the content, for example: `workspace://SpacesStore/ccb906ba-a768-4ccb-8b26-515119e1efdc`. Generally nodes are of two main types, a content node (`cm:content`), or a folder node (`cm:folder`). Folders can contain child nodes. Note that each content store will have a root node, and all other nodes in the store will be children of the root node.

 The NodeService provides an extensive API for managing nodes. Functionality includes:

-   Adding aspects, children, properties, associations
-   Getting aspects, children, properties, associations
-   Removing aspects, children, properties, associations
-   Creating and deleting stores
-   Creating and deleting nodes
-   Checking for existence of a node
-   Get available content stores
-   Moving nodes

 The NodeService makes extensive use of NodeRefs to reference the node of interest.

 Since Alfresco 4.1.1 the `alf_node.node_deleted` column has been replaced by a system type (`sys:deleted`) and an aspect (`sys:pendingDelete`). While the `sys:deleted` type will never be visible to client code, the `sys:pendingDelete` aspect will be. Any custom code that attempts to modify behaviour during node deletion may need to be adjusted.

 **Node deletion**

 Changes made in 4.1.1 introduced comprehensive policy callbacks for all associations during node deletion. The following node policies are available for node deletion:

 -   BeforeDeleteNodePolicy
-   BeforeArchiveNodePolicy
-   OnDeleteNodePolicy
-   BeforeDeleteChildAssociationPolicy
-   OnDeleteChildAssociationPolicy
-   BeforeDeleteAssociationPolicy
-   OnDeleteAssociationPolicy

 The association (peer and child) policies are now fired reliably for all associations within the node hierarchy being deleted. For examples of their usage, see: `org.alfresco.repo.model.ml.MultilingualDocumentAspect`.

 Once NodeService.deleteNode is called:

 -   It is impossible to add or remove associations to or from any node in the hierarchy being deleted. This includes attempted changes from any source including changes attempted by custom code reacting to before- or on-delete callbacks.
-   All nodes in the hierarchy will temporarily have the sys:pendingDelete aspect applied. Custom code can using NodeService.hasAspect to discover if a node is about to be deleted.
-   It is impossible to add new nodes or link other nodes into any node in the hierarchy being deleted. Any attempt to do so will be treated as a concurrency violation since custom code should not be attempting this from callbacks during the node deletion.
-   All associations, with the notable exception of the primary parent-child links, will be removed even if node archival is taking place. Node archival now only preserves the core parent-child associations and discards all other associations after making the relevant callbacks. Custom code must use the association deletion callbacks to remove nodes or aspects that might violate model integrity constraints in the archived hierarchy.

 A good example of the changes is in the handling of the `cm:copiedFrom` aspect. Copied nodes have an aspect `cm:copiedfrom`, which has a mandatory association to the original source node. When either the source or copy is deleted the aspect has to be removed. See `org.alfresco.repo.copy.CopyServiceImpl.beforeDeleteOriginalAssociation` for how the association deletion is detected in order to ensure that the aspect is removed from the copied node.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/NodeService.html)|
|Java example|```

                  

// Getting a NodeRef from its path

StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
ResultSet rs = searchService.query(storeRef, SearchService.LANGUAGE_LUCENE, "PATH:\"/app:company_home/app:user_homes/sys:boris/cm:mypics\"");
NodeRef companyHomeNodeRef = null;
try
{
  if (rs.length() == 0)
  {
      throw new AlfrescoRuntimeException("Didn't find Company Home");
  }
  companyHomeNodeRef = rs.getNodeRef(0);
}
finally
{
  rs.close();
}

// Getting a file name from a NodeRef

String fileName = (String) nodeService.getProperty(nodeRef, ContentModel.PROP_NAME);

// Reading a property of a node
// The property may come from an aspect or not. You will probably want to cast to the appropriate type.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
value = nodeService.getProperty(nodeRef, PROP_QNAME_MY_PROPERTY);

// Updating a property of a node
// The property may come from an aspect or not.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
nodeService.setProperty(nodeRef, PROP_QNAME_MY_PROPERTY, value);

// Getting the parent of a NodeRef

ChildAssociationRef childAssociationRef = nodeService.getPrimaryParent(nodeRef);
NodeRef parent = childAssociationRef.getParentRef();

// Adding an aspect to a node
// Supposing the "MyAspect" aspect defines a "myProperty" property in the "custom.model" namespace.

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
Map<QName,Serializable> aspectValues = new HashMap<QName,Serializable>();
aspectValues.put(PROP_QNAME_MY_PROPERTY, value);
nodeService.addAspect(nodeRef, CUSTOM_ASPECT_QNAME, aspectValues);

// Checking whether a node has a given aspect

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
boolean hasAspect = nodeService.hasAspect(node, CUSTOM_ASPECT_QNAME);

// Looping through children of a NodeRef

List<ChildAssociationRef> children = nodeService.getChildAssocs(companyHome);
for (ChildAssociationRef childAssoc : children) {
  NodeRef childNodeRef = childAssoc.getChildRef();
  // Use childNodeRef here.
}

// Creating a child association between two existing NodeRef

QName PROP_QNAME_MY_CHILD_ASSOCIATION = QName.createQName("custom.model", "myChildAssociation");
nodeService.addChild(parentNodeRef, childNodeRef, PROP_QNAME_MY_CHILD_ASSOCIATION, PROP_QNAME_MY_CHILD_ASSOCIATION);

// Creating an association between two NodeRef

QName PROP_QNAME_MY_ASSOCIATION = QName.createQName("custom.model", "myAssociation");
nodeService.createAssociation(sourceNodeRef, targetNodeRef, PROP_QNAME_MY_ASSOCIATION);

// Setting the type of a node

QName PROP_QNAME_MY_TYPE = QName.createQName("custom.model", "myType");
nodeService.setType(finalOriginal, MY_TYPE);

// Getting the MIME type of a node

ContentData contentData = (ContentData) nodeService.getProperty(nodeRef, ContentModel.PROP_CONTENT);
String originalMimeType = contentData.getMimetype();

// Adding a category to a node

ArrayList<NodeRef> categories = new ArrayList<NodeRef>(1);
categories.add(categoryNode);
if(!nodeService.hasAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE)
{
  HashMap<QName, Serializable> props = new HashMap<QName, Serializable>();
  props.put(ContentModel.PROP_CATEGORIES, categories);
  nodeService.addAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE, props);
}
else
{
  nodeService.setProperty(targetNode, ContentModel.PROP_CATEGORIES, categories);
}

// Getting the categories of a node

List<NodeRef> categories = (List<NodeRef>) nodeService.getProperty(nodeRef, ContentModel.PROP_CATEGORIES);

// Deleting a node for real (not recycle bin)

nodeService.addAspect(nodeRef, ContentModel.ASPECT_TEMPORARY, null);
nodeService.deleteNode(nodeRef);
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Custom Content Store platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/content-stores.md %}#content-stores)

|

### NodeLocatorService {#nodelocatorservice}

The NodeLocatorService looks up node locators registered via Spring configuration by name.

|Information|NodeLocatorService|
|-----------|------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|**Introduction**

 The 4.0 release saw the introduction of the `NodeLocatorService`.

 The service provides a way to lookup one node from another, its main use is from the Forms association control, allowing custom "startLocation" strategies to be plugged in.

 **Configuration**

 The `NodeLocatorService` looks up node locators by name, the out-of-the-box node locators are defined in a file named node-locator-context.xml.

 This Spring configuration file defines a base bean that can be used to define new node locator implementations. Using this bean will automatically register the node locator with the repository and make it available.

 This page will use an example node locator to describe the service, it will allow a named folder to be found. To define the example node locator the following Spring configuration would be used (in a custom context file):

 ```

               
<bean id="namedFolderNodeLocator" class="com.example.NamedFolderNodeLocator" parent="baseNodeLocator">
   <property name="NodeService" ref="NodeService" />
   <property name="FileFolderService" ref="FileFolderService" />
</bean>
               
               
```

 **Java API**

 The `NodeLocatorService` looks up node locators registered via Spring configuration by name. A node locator must implement the NodeLocator interface, whose definition is shown below:

 ```

                  
public interface NodeLocator
{
    NodeRef getNode(NodeRef source, Map<String, Serializable> params);
    public List<ParameterDefinition> getParameterDefinitions(); 
}
                     
                     
```

 A NodeLocator in its simplest form takes a source node, some optional parameters and returns a node or null if a suitable node could not be found. If a node is not found the NodeLocatorService returns the NodeRef representing "Company Home".

 The source node is not mandatory, node locators can be used to return well known nodes, "Company Home", "User Home" for example in which case a source node is not required.

 If a NodeLocator has parameters they must be defined using the same definition classes (ParameterDefinition) used by the ActionService.

 A base class `AbstractNodeLocator` is provided and it is recommended that your NodeLocator extends this base class. It provides the functionality to register the NodeLocator with the NodeLocatorService registry. This class also defines an abstract method your implementation must override.

 ```

public abstract String getName();
                     
```

 This is the unique name for your NodeLocator and will be used by the NodeLocatorService in the lookup process. It is also used in the startLocation configuration.

 **Example**

 Our example locator, NamedFolderNodeLocator, will be named "namedfolder" and will expect a single parameter called "name" which will indicate what folder to locate. The full source for this example is shown below:

 ```

                        
public class NamedFolderNodeLocator extends AbstractNodeLocator
{
    public static final String LOCATOR_NAME = "namedfolder";
    public static final String NAME_PARAM = "name";

    private NodeService nodeService;
    private FileFolderService fileFolderService;

    public void setNodeService(NodeService nodeService)
    {
        this.nodeService = nodeService;
    }

    public void setFileFolderService(FileFolderService fileFolderService)
    {
        this.fileFolderService = fileFolderService;
    }

    @Override
    public NodeRef getNode(NodeRef source, Map<String, Serializable> params)
    {
        NodeRef node = null;
      
        String folderName = (String)params.get(NAME_PARAM);
        if (source != null && folderName != null)
        {
           // get the parent of the source node
           NodeRef parent = nodeService.getPrimaryParent(source).getParentRef();
           // look for a child with the provided name
           NodeRef folder = nodeService.getChildByName(parent, ContentModel.ASSOC_CONTAINS, folderName);
           // make sure it's a folder
           if (folder != null && fileFolderService.getFileInfo(folder).isFolder())
           {
               node = folder;
           }
        }
        return node;
    }
      
    public List<ParameterDefinition> getParameterDefinitions()
    {
        List<ParameterDefinition> paramDefs = new ArrayList<ParameterDefinition>(2);
        paramDefs.add(new ParameterDefinitionImpl(NAME_PARAM, DataTypeDefinition.TEXT, false, "Name"));
        return paramDefs;
    }
            
    public String getName()
    {
        return LOCATOR_NAME;
    }
}

                     
```

 The "source" parameter in `getNode()` represents the starting point, in a form association control this will be the node being edited, for a create form it will be the destination node. Our example finds the primary parent of the source node and looks for a child folder with the given name. This is a fairly simple example but it is easy to see how this could be extended to allow for a named folder to be located up or down a folder hierarchy.

 **REST API**

 A REST API is provided for the NodeLocatorService, it is used by the form association control to determine the startLocation of the control but of course can be used by any client if required.

 The webscript descriptor is shown below:

 ```


<webscript> 
   <shortname>Node Locator</shortname>
   <description>Locates a Node in the repository using the specified Node Location strategy.</description>
   <url>/api/{store_type}/{store_id}/{node_id}/nodelocator/{node_locator_name}</url>
   <url>/api/nodelocator/{node_locator_name}</url>
   <format default="json"/>
   <authentication>user</authentication>
   <transaction allow="readonly">required</transaction>
</webscript>
```

 Two URLs are supported, one that allows a source node to be provided and one that does not, this is useful for "well known" nodes, "Company Home", "Sites Home" for example. Parameters are passed as query string parameters, a request for our example node locator may look like the following:

 ```
http://localhost:8080/alfresco/api/workspace/SpacesStore/28740556-129a-4ae8-b6c8-952fff728d63/nodelocator/namedfolder?name=Example
```

 A typical response is shown below:

 ```

{
  "data":
  {
    "nodeRef": "workspace://SpacesStore/d2a8bc42-4874-4d45-9a23-33cdd02be777"
  }
}
```

 **startLocation**

 The main use of the NodeLocatorService is to determine where the forms association control should start when it is first displayed. In some scenarios the picker may need to start in the root of the document library of a Share site or start in the folder where the node being edit is located. See the next section for a list of NodeLocators provided out-of-the-box.

 NodeLocators are configured using form control parameters. The name of the NodeLocator implementation is provided as the 'startLocation' parameter and the parameters are provided by a 'startLocationParameters' parameter. They should be provided in the form of query string parameters, for example `name=value&name=value`.

 The configuration for our example node locator is shown below, it will look for a folder named "Example" in the same folder as the node being edited.

 ```


<field id="my:association">
   <control>
      <control-param name="startLocation">{namedfolder}</control-param>
      <control-param name="startLocationParams">name=Example</control-param>
   </control>
</field>

```

 > **Note:** The curly braces are required around the node locator name.

 **Available Node Locators**

 The following table shows the node locators available out-of-the-box, the parameters they accept and their use.

 |Name|Class|Parameters|Usage|
|----|-----|----------|-----|
|companyhome|CompanyHomeNodeLocator|None|Returns the Company Home node|
|userhome|UserHomeNodeLocator|None|Returns the current user's home folder node|
|sharedhome|SharedHomeNodeLocator|None|Returns the Shared Home root node|
|siteshome|SitesHomeNodeLocator|None|Returns the Sites root node|
|doclib|DocLibNodeLocator|None|Returns the documentLibrary node for the site the source node belongs to|
|self|SelfNodeLocator|None|Returns the source node|
|xpath|XPathNodeLocator|query, store_type and store_id|Returns the node pointed to by the given XPath query. The XPath should be relative to the root of a store. If a source node is provided the Store is taken from the node, otherwise the store_type and store_id must be provided.|
|ancestor|AncestorNodeLocator|type and aspect|Returns an ancestor node of the source node. If no parameters are provided the immediate parent is returned. If a type parameter is present the first ancestor node of that type is returned. If an aspect parameter is present the first ancestor node with that aspect applied is returned. The type and aspect parameters can be combined thus finding an ancestor node of a certain type and with a specific aspect applied.|

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/nodelocator/NodeLocatorService.html)|
|Java example|See Description for example.|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### PermissionService {#permissionservice}

Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.

|Information|PermissionService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The permission service is responsible for: -   Providing well known permissions and authorities
-   Providing an API to read, set, and delete permissions for a node
-   Providing an API to query, enable, and disable permission inheritance for a node
-   Determining if the current, authenticated user has a permission for a node

 The PermissionService interface defines constants for well-known permissions and authorities.

 The default implementation coordinates implementations of two service provider interfaces: a ModelDAO and a PermissionsDAO. A permission is simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and configured in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml. This file also contains the configuration for security enforcement.

 The ModelDAO interface defines an API to access a permissions model. The default permission model is in XML and defines permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. There may be more than one permission model defined in XML; they are in practice merged into one permission model. A module can extend the permission model.

 The available permissions are defined in the permission model. This is defined in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\model\permissionDefinitions.xml. This configuration is loaded in a bean definition in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml. This file also defines global permissions. The definition file is read once at application start-up. If you make changes to this file, you will have to restart the repository in order to apply the changes.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/PermissionService.html)|
|Java example|```

                  
// Set permissions for a user on a node
permissionService.setPermission(nodeRef, "NameOfUser...", PermissionService.COORDINATOR, true);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Permissions platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/permissions.md %})

|

### PersonService {#personservice}

This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.

|Information|PersonService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The Person service supports various methods relating to users. The methods relating to the Person service include the ability to:

-   Look up people from user names
-   Create user information
-   Delete user information
-   Modify user information

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/PersonService.html)|
|Java example|```

                  
// Create user with authentication
if (authenticationService.authenticationExists(userName) == false)
{
   authenticationService.createAuthentication(userName, password.toCharArray());

   Map user = new Map();
   user.put(ContentModel.PROP_USERNAME, userName);
   user.put(ContentModel.PROP_FIRSTNAME, "firstName");
   user.put(ContentModel.PROP_LASTNAME, "lastName");
   user.put(ContentModel.PROP_EMAIL, userName+"@example.com");
   user.put(ContentModel.PROP_JOBTITLE, "jobTitle");

   NodeRef person = personService.createPerson(user);

   // ...
}  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### RenditionService {#renditionservice}

Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

|Information|RenditionService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The DM Rendition Service provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include: -   Reformatted content (essentially a transformation from one MIME-type to another)
-   Rescaled images (including thumbnails) the output of a Freemarker or XSLT template

 Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

 -   **Rendering Engines**

Are responsible for performing the transformation on a source node to create a rendition. Different Rendering Engines will perform different types of transformation. They can be registered with the Rendition Service using a unique name.

-   **Rendering Engine Definitions**

Provide a description of a given Rendering Engine. Each Rendering Engine Definition exposes parameter definitions for all the parameters which can be provided to the associated Rendering Engine. Each parameter definition describes the parameter name, type and whether or not it is mandatory.

-   **Rendition Definitions**

Encapsulate all the necessary information for rendering a given source node into a rendition. This includes the Rendering Engine which is used to perform the rendition and all the parameter values specified. Rendition Definitions have unique, qualified names and can be persisted within the repository.

-   **Composite Rendition Definitions**

are a special type of Rendition Definition which allow the creation of renditions which require a sequence of two or more transformation steps. For example, a Composite Rendition Definition could be used to first reformat a PDF document into a PNG image and then resize the image to a small thumbnail. Composite Rendition Definitions specify an ordered list of other Rendition Definitions to be sequentially executed, with the output of the previous transformation feeding in as the source node for the next definition. All Composite Rendition Definitions specify the Composite Rendering Engine for their transformations.


 Available rendering engines include:

 -   Base rendering engine
-   Reformat rendering engine
-   Image rendering engine
-   FreeMarker rendering engine
-   XSLT rendering engine
-   HTML rendering engine
-   Composite rendering engine

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/rendition/RenditionService.html)|
|Java example|**Registering a new Rendering Engine**

 Rendering Engines are registered with the Rendition Service through Spring dependency injection. rendition-services-context.xml declares an abstract bean called baseRenderingAction which is the parent bean for all rendering engines. baseRenderingAction itself is a child bean of the ActionService's action-executer bean.

 In Alfresco Content Services, there are a number of concrete rendering engine beans, for example, reformat within the same spring context file. To register a new rendering engine, add new spring bean definitions.

 **Retrieving registered Rendering Engine Definitions**

 ```

                
// Rendering Engine Definitions can be retrieved
// 1. as a list of all registered engine definitions

List<RenderingEngineDefinition> engineDefs = renditionService.getRenderingEngineDefinitions();

// 2. by name
// This name must be the same as the spring bean name used for the rendering engine.

String renderingEngineName = "myEngineName";
RenderingEngineDefinition engineDef = renditionService.getRenderingEngineDefinition(renderingEngineName);
             
```

 **Creating a Rendition Definition**

 ```


// Names must be provided for the rendition definition and the rendering engine to use.
QName  renditionName       = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
String renderingEngineName = ReformatRenderingEngine.NAME;

// Create the Rendition Definition object.
RenditionDefinition renditionDef = renditionService.createRenditionDefinition(renditionName, renderingEngineName);

// Set parameters on the rendition definition.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);


```

 **Storing a Rendition Definition**

 ```


// Store the Rendition Definition using the QName
// of the Rendition Definition as a unique identifier.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Retrieving a Rendition Definition**

 ```


// Rendition Definitions can be retrieved:
// 1. As a list of all stored Rendition Definitions
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 2. As a list of stored Rendition Definitions filtered by Rendering Engine name.
String renderingEngineName = "myEngineName";
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 3. As a single Rendition Definition, uniquely identified by its QName.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);


```

 **Editing an existing Rendition Definition**

 ```


// Retrieve the existing Rendition Definition
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);

// Make changes.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);
renditionDef.setParameterValue(RenditionService.PARAM_ORPHAN_EXISTING_RENDITION, true);

// Persist the changes.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Performing a simple rendition**

 ```


// A rendition definition is required to perform any rendition.
// The rendition definition can be loaded from the repository or created as shown above.
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, renditionDef);


```

 **Performing a composite rendition**

 ```


// First obtain a Composite Rendition Definition
// This can be loaded from the repository or created as shown here.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
CompositeRenditionDefinition compositeDefinition  = 
renditionService.createCompositeRenditionDefinition(renditionName);

// Now specify which other renditions are to be performed as part of the composite rendition.
RenditionDefinition reformatDefinition = renditionService.load(reformatRenditionName);
RenditionDefinition rescaleImageDefinition = renditionService.load(rescaleImageRenditionName);

compositeDefinition.addAction(reformatDefinition);
compositeDefinition.addAction(rescaleImageDefinition);

// Perform the composite rendition
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, compositeDefinition);


```

 **Retrieving renditions for a node**

 ```


NodeRef sourceNode = // obtained in the usual way e.g. from nodeService

// 1. Get all renditions with the specified node as their source.
List<ChildAssociationRef> allRenditions = renditionService.getRenditions(sourceNode);

// 2. Get the rendition with the specified source node and the specified rendition definition name.
//    If there is no matching rendition, null is returned
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRenditionDef");
ChildAssociationRef rendition = renditionService.getRenditionByName(sourceNode, renditionName);

// 3. Get the renditions with the specified source node whose MIME types match a filter
//    This example returns renditions whose mimetype starts with "image".
List<ChildAssociationRef> imageRenditions = renditionService.getRenditions(sourceNode, "image");



```

 **Specifying a RenditionDefinition as asynchronous or synchronous**

 This behaviour is inherited from the ActionService - remember that RenditionDefinition extends Action. So we can create a Rendition Definition as shown above and set it to execute asynchronously:

 ```


RenditionDefinition renditionDef = // created as shown above

renditionDef.setExecuteAsynchronously(true);


```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Mimetypes platform extension documentation]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})

|

### RetryingTransactionHelper {#retryingtransactionhelper}

A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.

|Information|RetryingTransactionHelper|
|-----------|-------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|A description and application of the RetryingTransactionHelper can be found [Repository Java API](#repository-java-api).|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/transaction/RetryingTransactionHelper.html)|
|Java example|See [Repository Java API](#repository-java-api).|
|More Information|See [Repository Java API](#repository-java-api).|

### SearchService {#searchService}

This encapsulates the execution of search against different indexing mechanisms.

|Information|SearchService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages. The query languages supported include: -   LANGUAGE_CMIS_ALFRESCO
-   LANGUAGE_CMIS_STRICT
-   LANGUAGE_FTS_ALFRESCO
-   LANGUAGE_LUCENE
-   LANGUAGE_SOLR_ALFRESCO
-   LANGUAGE_SOLR_CMIS
-   LANGUAGE_SOLR_FTS_ALFRESCO
-   LANGUAGE_XPATH

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/SearchService.html)|
|Java example|```

                  
// Simple example
ResultSet results = searchService.query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, "quick");
                  
// Find all the nodes under the root node by QName namespace:one
// The prefix must be resolved to a URI
ResultSet results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PATH:\"/namespace:one\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five/namespace:twelve\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:five/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/./.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//./*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//././*/././.\"", null, null);

// Examples using the default namespace
results = searcher.query(storeRef, "lucene", "PATH:\"//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//five/nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.//.\"", null, null);

// Type based queries.
// escapeQName uses QueryParser static method to escape the string.

QName qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"01\"", null, null);

qname = QName.createQName(NamespaceService.ALFRESCO_URI, "long-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"2\"", null, null);
    
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "float-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"3.4\"", null, null);
      
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "double-ista")) + ":\"5.6\"", null, null);
   
Date date = new Date();
String sDate = CachingDateFormat.getDateFormat().format(date);
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "date-ista")) + ":\"" + sDate + "\"", null, null);
    
results = searcher.query(storeRef, "lucene",
               "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "datetime-ista")) + ":\"" + sDate + "\"", null, null);

results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "boolean-ista")) + ":\"true\"", null,
               null);

results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "qname-ista")) + ":\"{wibble}wobble\"",
               null, null);
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "guid-ista")) + ":\"My-GUID\"", null,
               null);
  
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "category-ista")) + ":\"CategoryId\"",
               null, null);
 
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "noderef-ista")) + ":\"" + n1 + "\"",
               null, null);
          
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "path-ista")) + ":\""
               + nodeService.getPath(n3) + "\"", null, null);
      

// Queries based on type.

results = searcher.query(storeRef, "lucene", "TYPE:\"" + testType.toString() + "\"", null, null);
    
results = searcher.query(storeRef, "lucene", "TYPE:\"" + testSuperType.toString() + "\"", null, null);

results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testAspect.toString() + "\"", null, null);
      
results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testSuperAspect.toString() + "\"", null, null);
   

// Full text search examples

results = searcher.query(storeRef, "lucene", "TEXT:\"fox\"", null, null);
       
QName queryQName = QName.createQName("alf:test1", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       

// Canned queries and query parameters

queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       
queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
QueryParameter qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "woof");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
      
queryQName = QName.createQName("alf:test3", namespacePrefixResolver);
qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "/one/five//*");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
    
// TODO: should not have a null property type definition
QueryParameterDefImpl paramDef = new QueryParameterDefImpl(QName.createQName("alf:lemur", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "fox");
results = searcher.query(storeRef, "lucene", "TEXT:\"${alf:lemur}\"", null, new QueryParameterDefinition[] { paramDef });
       
paramDef = new QueryParameterDefImpl(QName.createQName("alf:intvalue", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "1");
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"${alf:intvalue}\"", null, new QueryParameterDefinition[] { paramDef });

// Other

results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PARENT:\"" + rootNodeRef.toString() + "\"", null, null);
       
results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "+PARENT:\"" + rootNodeRef.toString() + "\" +QNAME:\"one\"", null, null);
                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### SiteService {#siteservice}

Provides an extensive API for managing sites in Alfresco Share.

|Information|SiteService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The SiteService provides an extension API for creating, deleting and managing Share Sites. Both JavaScript and Java APIs are available, and access to Sites is also possible via the REST API.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/site/SiteService.html)|
|Java example|```

                  
// Using siteService to obtain info about site                  
SiteInfo siteInfo = siteService.getSite(nodeRef);
String siteShortName = siteInfo.getShortName();
String siteGroup = siteService.getSiteGroup(siteShortName);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|


### TaggingService {#taggingservice}

It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.

|Information|TaggingService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Tags are simple text labels that are attached to a piece of content. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The [JavaScript TagScope]({% link content-services/5.2/develop/api-reference.md %}#tagscope-object) object provides a simple illustration of what a TagScope represents. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particualr tag is used.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/tagging/TaggingService.html)|
|Java example|```

               
// Get tags applied to node 

List<String> tags = taggingService.getTags(nodeRef);               
               
            
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### TemplateService {#templateservice}

Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.

|Information|TemplateService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description| |
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/TemplateService.html)|
|Java example|```

                  
// build the email template model
final Map<String, Object> model = createEmailTemplateModel(nodeRef);

// process the template against the model
text = templateService.processTemplate("freemarker", templateRef.toString(), model);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Template Reference Guide]({% link content-services/5.2/develop/api-reference.md %}#freemarker-api)

|


### TenantService {#tenantservice}

Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.

|Information|TenantService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Multi-tenancy is supported by the Alfresco repository. Read more about it [here]({% link content-services/5.2/admin/multi-tenancy.md %}#setting-up-multi-tenancy). The `TenantService` is used by Alfresco repository code to rewrite `NodeRef`s, `StoreRef`s etc so they include a tenant domain when running in a multi tenant environment, which makes it possible to handle multiple tenants in parallel.When you use the `TenantService` in a single tenant environment the methods are either NOOP, return what you pass in, or return empty domain for domain related methods.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/tenant/TenantService.html)|
|Java example|The following code shows an example of how a `NodeRef` and a `StoreRef` can be rewritten to be multi-tenant aware:

 ```
NodeRef nodeRef = "some node reference that needs to be rewritten for a specific tenant domain";
NodeRef tenantNodeRef = serviceRegistry.getTenantService().getName(nodeRef);

String store = "some repository store that needs to be rewritten for a specific tenant domain";
StoreRef storeRef = serviceRegistry.getTenantService().getName(new StoreRef(store));
```

 In a single tenant environment these `getName` operations would have no effect.

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### VersionService {#versionservice}

Provides an API for managing the versions of a piece of content.

|Information|VersionService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Alfresco has a strong versioning story, which gives you the ability to version any content stored in the repository, no matter what the file type (**note**. folders are not versionable). Versions are full files and not diffs of the files. Alfresco gives you the ability to have both major and minor versions of content. Versions can be created/updated by checkout/checkin, by rule, through any interface or through script/APIs.

If a content file has the aspect `versionable` applied to it, then multiple versions of the file can be managed. The `VersionService` provides an API to allow you to do this programmatically: -   `createVersion` - this creates a new version of the file, which is placed at the end of the appropriate version history. If the file has no version history then one is created and this version is considered to be the initial version.
-   `getVersionHistory` - this gets the version history that relates to the file.
-   `deleteVersionHistory` - this deletes the version history for a versioned file.
-   `getCurrentVersion` - gets the current version for a file.
-   `revert` - reverts the state of a file to that of a previous version.
-   `restore` - restores a previously deleted file from a version in its version history.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java files: aio/platform-jar/src/main/java/{package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/version/VersionService.html)|
|Java example|Alfresco provides the ability to apply behaviors / policies to content/metadata within the repository. You can think of these as event listeners, that allow you to take custom actions based on what is happening within the repository. In this example we are listening to the `afterCreateVersion` event and then we check if we have reached the maximum number of versions that we want to store, if we have, then we delete the last one (by default Alfresco has no limit of how many versions it stores):

 ```
import org.alfresco.repo.policy.Behaviour;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.repo.version.VersionServicePolicies;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.version.Version;
import org.alfresco.service.cmr.version.VersionHistory;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MaxVersionPolicy implements VersionServicePolicies.AfterCreateVersionPolicy {
    private static Log logger = LogFactory.getLog(MaxVersionPolicy.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    private PolicyComponent policyComponent;
    private Behaviour afterCreateVersion;

    /**
     * Max number of versions we will store of a file in the repo
     */
    private int maxVersions;

    public void setPolicyComponent(PolicyComponent policyComponent) {
        this.policyComponent = policyComponent;
    }

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void setMaxVersions(int maxVersions) {
        this.maxVersions = maxVersions;
    }

    /**
     * Spring bean init() method
     */
    public void init() {
        this.afterCreateVersion = new JavaBehaviour(this, "afterCreateVersion",
                Behaviour.NotificationFrequency.TRANSACTION_COMMIT);

        this.policyComponent.bindClassBehaviour(QName.createQName(
                NamespaceService.ALFRESCO_URI, "afterCreateVersion"),
                MaxVersionPolicy.class, this.afterCreateVersion);
    }

    @Override
    public void afterCreateVersion(NodeRef versionableNode, Version version) {
        VersionHistory versionHistory = serviceRegistry.getVersionService().getVersionHistory(versionableNode);

        if (versionHistory != null) {
            logger.debug("Current number of versions: " + versionHistory.getAllVersions().size());
            logger.debug("least recent/root version: " + versionHistory.getRootVersion().getVersionLabel());

            // If the current number of versions in the VersionHistory is greater
            // than the maxVersions limit, remove the root/least recent version
            if (versionHistory.getAllVersions().size() > maxVersions) {
                logger.debug("Removing Version: " + versionHistory.getRootVersion().getVersionLabel());
                serviceRegistry.getVersionService().deleteVersion(versionableNode, versionHistory.getRootVersion());
            }
        } else {
            logger.debug("versionHistory does not exist");
        }
    }
}
```

 The Spring bean for the `MaxVersionPolicy` class looks like this:

 ```
<bean id="org.alfresco.training.maxVersion" 
        class="org.alfresco.training.platformsample.MaxVersionPolicy"
        init-method="init">
    <property name="policyComponent">
        <ref bean="policyComponent" />
    </property>
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
    <!-- The max number of versions per versioned file -->
    <property name="maxVersions">
        <value>10</value>
    </property>
</bean>
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).

|

### WorkflowService {#workflowservice}

Provides a client-facing API for interacting with workflows and tasks.

|Information|WorkflowService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The Activiti workflow engine is built into Alfresco Content Services. You can [create and manage workflows]({% link content-services/5.2/admin/workflows.md %}) directly from your Dashboard. Of course, with the WorkflowService, you can create and manage these workflows programmatically. The default workflows out-of-the-box are: -   New Task
-   Assign a new task to yourself or a colleague
-   Review and approve (group review)
-   Assign a review task to a group
-   Review and Approve (one or more reviewers)
-   Assign a review task to multiple reviewers
-   Review and Approve (pooled review)
-   Assign a review task to multiple reviewers, who can take ownership of the task
-   Review and Approve (single reviewer)
-   Assign a review task to a single reviewer

 It is also possible to create custom workflows.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/workflow/WorkflowService.html)|
|Java example|An extensive example of using the Workflow API is provided in the code ./projects/repository/source/java/org/alfresco/repo/workflow/WorkflowInterpreter.java.|
|More Information|-   [Java API - Access and Transaction Management documentation](#repository-java-api).
-   [Workflow platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)
-   [Creating and managing workflows]({% link content-services/5.2/admin/workflows.md %})|
|Tutorials|-   [Creating Custom Advanced Workflows in Alfresco by Jeff Potts](https://ecmarchitect.com/alfresco-developer-series-tutorials/workflow/tutorial/tutorial.html)|
