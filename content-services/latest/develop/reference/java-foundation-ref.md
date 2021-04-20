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
The `AuditService` API provides facilities to query audit data. There are also methods to clear audit data, enable and 
disable auditing, and check auditing status.

```java
/**
 * Returns content changes.
 */
public ObjectList getContentChanges(Holder<String> changeLogToken, BigInteger maxItems) {
    final ObjectListImpl result = new ObjectListImpl();
    result.setObjects(new ArrayList<ObjectData>());

    EntryIdCallback changeLogCollectingCallback = new EntryIdCallback(true) {
        @Override
        public boolean handleAuditEntry(Long entryId, String user, long time, Map<String, Serializable> values) {
            result.getObjects().addAll(createChangeEvents(time, values));
            return super.handleAuditEntry(entryId, user, time, values);
        }
    };

    Long from = null;
    if ((changeLogToken != null) && (changeLogToken.getValue() != null)) {
        try {
            from = Long.parseLong(changeLogToken.getValue());
        } catch (NumberFormatException e) {
            throw new CmisInvalidArgumentException("Invalid change log token: " + changeLogToken);
        }
    }

    AuditQueryParameters params = new AuditQueryParameters();
    params.setApplicationName(CMIS_CHANGELOG_AUDIT_APPLICATION);
    params.setForward(true);
    params.setFromId(from);

    int maxResults = (maxItems == null ? 0 : maxItems.intValue());
    maxResults = (maxResults < 1 ? 0 : maxResults + 1);

    serviceRegistry.getAuditService().auditQuery(changeLogCollectingCallback, params, maxResults);

    String newChangeLogToken = null;
    if (maxResults > 0) {
        if (result.getObjects().size() >= maxResults) {
            StringBuilder clt = new StringBuilder();
            newChangeLogToken = (from == null ? clt.append(maxItems.intValue() + 1).toString() : clt.append(from.longValue() + maxItems.intValue()).toString());
            result.getObjects().remove(result.getObjects().size() - 1).getId();
            result.setHasMoreItems(true);
        } else {
            result.setHasMoreItems(false);
        }
    }

    if (changeLogToken != null) {
        changeLogToken.setValue(newChangeLogToken);
    }

    return result;
}
```

See also:

* [Audit platform extension point]({% link content-services/latest/develop/repo-ext-points/audit-log.md %}).
* [Auditing]({% link content-services/latest/admin/audit.md %}) provides a detailed overview of auditing.
* [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y){:target="_blank"} DevCon presentation by Mehdi Belmekki.
* [Audit and Reporting with Alfresco and NoSQL by Zaizi](http://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture){:target="_blank"}

## AuthenticationService
This service provides an API to allow authentication of users using various methods, such as username and password and 
authentication tickets. Authentication is required at various access points into the repository. For example web scripts, 
CMIS, FTP, WebDAV, and web clients represent access points where authentication needs to take place. 

Authentication can be via a ticket, a username and password pair, or some other mechanism. The `AuthenticationService` 
provides an API to:

* Authenticate using a username and password
* Authenticate using a ticket
* Create, update and delete authentication information
* Clear the current authentication
* Invalidate a ticket
* Get the username for who is currently authenticated
* Get a ticket for subsequent re-authentication
* Determine if the current user is "the system user"

Not all implementations will support creating, updating and deleting authentication information.

The authenticated username is used as the key to obtain other security information such as group membership, the details 
about the person, to record a user as the owner of an object. It is one of the identifiers against which permissions may 
be assigned.

The `AuthenticationService` does not provide any details about a user other than authentication. It stores authentication 
information on the calling thread. Application developers should ensure that this information is cleared.

The `AuthenticationService` brings together three components:

* The authentication component
* The authentication DAO
* The ticket component

The authentication component supports authentication only. The authentication DAO provides an API to create, delete and 
update authentication information. The ticket component is responsible for managing and storing tickets that may be 
obtained after authentication and used in place of authentication.

```java
// Get services
AuthenticationService authService = (AuthenticationService)serviceRegistry.getAuthenticationService();
PersonService personService = (PersonService)serviceRegistry.getPersonService();

// Get current user
NodeRef person = personService.getPerson(authService.getCurrentUserName());
```

See also:

* [Authentication & Sync documentation]({% link content-services/latest/admin/auth-sync.md %})

## AuthorityService
The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. 
These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will 
throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. 
If there are entities linked to these authorities this key should be used to find them, as userName is used to link user 
and person.

Authority is a general term to describe a group, user, or role. The AuthorityService provides an API to: 

* Add and delete authorities.
* Get authorities.
* Retrieve authority details such as short name.

```java
/**
 * Search the root groups, those without a parent group.
 * 
 * @param paging Paging object with max number to return, and items to skip
 * @param sortBy What to sort on (authorityName, shortName or displayName)
 * @return The root groups (empty if there are no root groups)
 */
public ScriptGroup[] searchRootGroupsInZone(
        String displayNamePattern, String zone, ScriptPagingDetails paging, String sortBy) {
    Set<String> authorities;
    
    try {
        authorities = serviceRegistry.getAuthorityService().findAuthorities(AuthorityType.GROUP,
                null, true, displayNamePattern, zone);
    } catch (UnknownAuthorityException e) {
        authorities = Collections.emptySet();
    }
    
    return makeScriptGroups(authorities, paging, sortBy, serviceRegistry, this.getScope());
}
```

Add an authority:

```java
String knightGroup = serviceRegistry.getAuthorityService().createAuthority(AuthorityType.GROUP, "KNIGHTS");
serviceRegistry.getAuthorityService().addAuthority(knightGroup, ADMIN_USER_NAME);
```

See also 

* [Authentication & Sync documentation]({% link content-services/latest/admin/auth-sync.md %})

## CategoryService
Provides an API for creating and managing categories of nodes. Categories provide a system for organizing content. 
Unlike tags, which have no hierarchical structure, and which can be created and applied by anyone, categories are created 
by the Administrator, and are hierarchical in nature. 

For example, You might have a Europe category, and then sub-categories such as France, Germany, Spain, and so on. 
The top Category in the hierarchical structure is known as the Root Category. The `CategoryService` API provides methods 
to perform actions such as the following:

* Create a Category
* Create a root Category
* Delete a Category
* Create a Classification (a grouping of Categories)
* Delete a Classification
* Get most popular Categories

```java
// To create a root category:
NodeRef newRootCat = serviceRegistry.getCategoryService().createRootCategory(spacesStore, 
        ContentModel.ASPECT_GEN_CLASSIFIABLE, "newRootCat");

// To create a category
NodeRef newCategory = serviceRegistry.getCategoryService().createCategory(newRootCat, "newCategory");
```

See also:

* [Tagging and Categorizing Content]({% link content-services/latest/using/content/manage.md %}#tagcategorizecontent)
* [Category Manager documentation]({% link content-services/latest/admin/share-admin-tools.md %}#cat-manager)

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

