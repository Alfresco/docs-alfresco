---
title: Java Foundation API reference
---

The Alfresco Java Foundation API provides the ability to build server-side extensions that runs in the same
process as Content Services. This API is used to build extensions for the [Platform (Repository)]({% link content-services/latest/develop/software-architecture.md %}#platformarch). 

## Getting started
When we want to use one of the public Java APIs from an implementation of one of the Platform/Repository 
[Extension Points]({% link content-services/latest/develop/repo-ext-points/index.md %}), 
it follows a best practice. First acquire a reference to the `ServiceRegistry`. The service registry is 
basically a database of services, their instances and their locations. 

Clients of a service, such as the `NodeService`, then query the service registry to find the available instance of 
that service. When making calls to the `NodeService` we use the `RetryingTransactionHelper` for transaction management 
and redundancy.

The following code snippet illustrates how to first inject the `ServiceRegistry` into a Spring bean:

```xml
<bean id="acmeContentService" class="org.alfresco.tutorial.publicapiaccess.service.AcmeContentServiceImpl">
      <property name="serviceRegistry">
          <ref bean="ServiceRegistry" />
      </property>
</bean>
```

In this case the `ServiceRegistry` is injected into a custom Service implementation, but the principle is the same for 
other implementations, such as for [Repository Actions]({% link content-services/latest/develop/repo-ext-points/repo-actions.md %}) 
and Java-backed [Web Scripts]({% link content-services/latest/develop/repo-ext-points/web-scripts.md %}). When we got the 
service registry available in our implementation we can start using the Public Java API services such as in the following
example:

```java
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
}
```

As we can see in the above code, the service registry is used to access the `TransactionService`, `NodeService`, 
`NodeLocatorService`, and `ContentService`. All the calls to these services are done within `RetryingTransactionHelper`, 
which will automatically join any ongoing transaction or start a new read-write transaction. If something should go wrong 
during these calls then they will be retried until they succeed or we reach 20 retries, which is configurable.

Permissions are also automatically checked during these calls, so you can for example not use the `NodeService` to create 
a node in a folder that you don't have write access to. Note that the `RetryingTransactionCallback` class is parameterized 
so you can pass in any type that represent the response from the operations done in the `execute` method. For example, 
if the operations in the `execute` method should result in either `true` or `false` then initialize the callback as in the 
following example:

```java
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

If we want to be sure that a new transaction is started when we do our calls in the `execute` method, which is useful for 
situations when we just want our updates to be rolled-back if something goes wrong, then we can use another method signature 
for the `doInTransaction` method as follows:

```java
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

If we are using these services in a cluster, then we need to remember that they are not cluster *aware*. So if we for 
example are using these services in a scheduled job, which will be kicked off on each node in the cluster, then we would 
have to use the `JobLockService` to lock the cluster so another node does not start executing the same job. For more 
information about this see [Scheduled jobs]({% link content-services/latest/develop/repo-ext-points/scheduled-jobs.md %}).

To turn on logging so you can get details of 'why' transactions are retried use the following log level:

* Summary: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=INFO`
* Details: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=DEBUG`

### Deployment
It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring 
context files. You would instead use an [Alfresco In-Process SDK]({% link content-services/latest/develop/sdk.md %}) project.

Put the Java source code in the `aio/platform-jar/src/main/java/{domain specific directory path}` path. And the 
Spring bean configuration in `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml`
file.

## ActionService
An Action is a unit of work that can be carried out on a node. Actions are commonly used in conjunction with Rules, but 
that is not mandatory. When you create Rules for a folder, you can specify certain Actions to occur to nodes added to 
the folder. For example, when a Word document is added to a folder, you may want a PDF to be automatically generated, 
or a notification email to be sent. There are a number of built-in Actions available by default (there IDs in parentheses): 

* Execute Script (`script`) 
* Copy (`copy`)
* Move (`move`)
* Checkin (`check-in`)
* Checkout (`check-out`)
* Link to category (`link-category`)
* Add Aspect (`add-features`)
* Remove Aspect (`remove-features`)
* Add simple workflow (`simple-workflow`)
* Start workflow (`start-workflow`)
* Cancel workflow (`cancel-workflow`)
* Send email (`mail`)
* Transform and copy content (`transform`)
* Transform and copy image (`transform-image`)
* Extract common metadata fields (`extract-metadata`)
* Import (`import`)
* Export (`export`)
* Specialise type (`specialise-type`)
* Create version (`create-version`)
* Increment counter (`counter`)
* Set property value (`set-property-value`)
* Create thumbnail (`create-thumbnail`)
* Execute all rules on node (`execute-all-rules`)

You can also create custom Actions to do whatever you want when content is added to a folder.

While Actions are typically triggered by [Rules]({% link content-services/latest/using/content/rules.md %}), you can 
also invoke them directly by selecting them from a menu item. The `ActionService` also allows you to call them directly 
from code. Any piece of code that can access the `ActionService` can invoke the Action, for example:

* JavaScript
* Workflow
* Web script
* Java

The following example shows how to invoke the Add Aspect out-of-the-box action with the `ActionService`:

```java
boolean executeAsync = true;
Map<String, Serializable> params = new HashMap<String, Serializable>();
params.put(AddFeaturesActionExecuter.PARAM_ASPECT_NAME, "cm:titled");
Action addAspectAction = serviceRegistry.getActionService().createAction("add-features", params);

if (a != null) {
    serviceRegistry.getActionService().executeAction(addAspectAction, docNodeRef, true, executeAsync);
} else {
    throw new RuntimeException("Could not create add aspect action");
}
```

Another example of how to execute a script:

```java
boolean executeAsync = true;

// JavaScript file node reference
NodeRef scriptRef = ...

Action action = serviceRegistry.getActionService().createAction("script");
action.setParameterValue(ScriptActionExecuter.PARAM_SCRIPTREF, scriptRef);
if (action != null) {   
    serviceRegistry.getActionService().executeAction(action, docNodeRef, true, executeAsync);
} else {
    throw new RuntimeException("Could not create execute script action");
}
```

In this example we invoke a custom action with the Spring bean id `send-as-email` (more information about this 
repository action implementation can be found [here]({% link content-services/latest/develop/repo-ext-points/repo-actions.md %}):

```java
import org.alfresco.service.cmr.action.Action;

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
```

See also:

* [Repository Actions platform extension point]({% link content-services/latest/develop/repo-ext-points/repo-actions.md %}).
* [Jeff Potts Custom Action tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html){:target="_blank"}

## ActivityService
The `ActivityService` is responsible for generating activity feeds for each member of a Share site. The activities 
generated include such events as a document was added, a document was previewed, the wiki was updated.

What is an activity?

* Activity represents an action that has taken place within a client interface (app/tool)
* Activity is typically initiated by the app/tool/component/service on behalf of a user (it is not necessarily initiated by the underlying repository)
* Activity is of a given/named type specified by the app/tool (for example document added)
* Activity is performed at a particular point in time (post date)
* Activity may have associated data dependent on type of activity
* Activity may be performed within a given site/network context
* Activity may be performed within a given app/tool context
* Activity may be sensitive, that is, associated with data that is permission controlled, therefore, the activity itself may be permission controlled (can or can't be read)
* Activity may be rendered into one or more UI views (activity summary)

Activities may be raised by one or more Content Services applications. The posted activity must have a uniquely named 
activity type.

Examples of activity types include:

* Added, updated, and deleted documents
* Triggered on versioning
* Includes changes to metadata (explicitly denoted in feed)
* Does not include updates to tags
* Uploaded and expanded ZIP
* Added and deleted folders
* Added and removed members (person joined/left site)
* User role changes (change of user role for a site)
* New comments (on any artifact in a site, including documents, blog entries, and so on.)
* Workflow-generated activities (requires explicit posting via customizing workflow definition)
* Added, updated, and deleted events (calendar entries)
* Published, updated, and deleted wiki pages
* Published, updated, and deleted blog entries
* Blog entry published to external blog engine

Sample code showing posting an activity:

```java
private void postActivityUpdated(NodeRef nodeRef) {
    SiteInfo siteInfo = serviceRegistry.getSiteService().getSite(nodeRef);
    String jsonActivityData = "";

    try {
        JSONWriter jsonWriter = new JSONStringer().object();
        jsonWriter.key("title").value((Object)serviceRegistry.getNodeService().getProperty(
                nodeRef, ContentModel.PROP_NAME).toString());
        jsonWriter.key("nodeRef").value((Object)nodeRef.toString());
        StringBuilder sb = new StringBuilder("document-details?nodeRef=");
        sb.append(URLEncoder.encode(nodeRef.toString(), "UTF-8"));
        jsonWriter.key("page").value((Object)sb.toString());
        jsonActivityData = jsonWriter.endObject().toString();
    }
    catch (Exception e) {
        throw new RuntimeException(e);
    }

    FileInfo fileInfo = serviceRegistry.getFileFolderService().getFileInfo(nodeRef);
    serviceRegistry.getActivityService().postActivity("org.alfresco.documentlibrary.file-updated", 
        siteInfo == null ? null : siteInfo.getShortName(), siteInfo == null ? null : "documentLibrary", 
        jsonActivityData, null, fileInfo);
}
```

See also:

* [blog post](http://alfresco.blog.redpill-linpro.com/2015/11/26/posting-custom-events-to-the-activity-feed/){:target="_blank"}

## AttributeService
This provides services for reading, writing, and querying global attributes. The `AttributeService` is used to get and 
set global, arbitrary attributes. Attributes typically have a key and a value, where the key consists of three segments 
(known as a key set) and a value. Attributes are stored in the database so they persist over server restarts. 

An example of use is for persisting system-wide JMX configuration properties in Alfresco Content Services. The 
`AttributeService` class provides a Java interface for creating and managing attributes, including methods such as:

* `Serializable getAttribute(Serializable ... keys)` - get an attribute using a list of unique keys
* `getAttributes(AttributeQueryCallback callback, Serializable ... keys)` - Getting a collection of attributes
* `Serializable getAttribute(Serializable ... keys)` - Getting a single attribute
* `setAttribute(Serializable value, Serializable ... keys)` - Set attribute or create attribute if doesn't exist
* `removeAttribute(Serializable ... keys)` - Removing an attribute
* `removeAttributes(Serializable ... keys)` - Removing a collection of attributes

Collections of Attributes can be processed on retrieval by implementing a callback handler object. The callback handler 
object's `handleAttribute` method is invoked for each attribute retrieved.

>**Note**. The `AttributeService` is not what you would use to get the attributes (more correctly, "properties") of a 
> node. Use the [NodeService](#nodeservice) class for that.

The following example shows how you could map a unique document identifier to an Alfresco node reference independently 
of nodes: 

```java
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

See also:

* [Tech Talk Live video](https://www.youtube.com/watch?v=obQ_89MFtRs){:target="_blank"}
* [AttributeService Primer video](https://vimeo.com/67580571){:target="_blank"}

## AuditService

## AuthenticationService

## AuthorityService

## CategoryService

## CheckOutCheckInService

## ContentService

## CopyService

## DictionaryService

## FileFolderService

## JobLockService

## LockService

## MessageService

## MimetypeService

## ModuleService

## NamespaceService

## NodeService

## NodeLocatorService

## PermissionService

## PersonService

## RenditionService

## RetryingTransactionHelper

## SearchService

## SiteService

## TaggingService

## TemplateService

## TenantService

## VersionService

## WorkflowService

