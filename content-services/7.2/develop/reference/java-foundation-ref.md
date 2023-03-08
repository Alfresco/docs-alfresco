---
title: Java Foundation API reference
---

The Alfresco Java Foundation API provides the ability to build server-side extensions that runs in the same
process as Content Services. This API is used to build extensions for the [Platform (Repository)]({% link content-services/7.2/develop/software-architecture.md %}#platformarch). 

## Getting started {#gettingstarted}
When we want to use one of the public Java APIs from an implementation of one of the Platform/Repository 
[Extension Points]({% link content-services/7.2/develop/repo-ext-points/index.md %}), 
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
other implementations, such as for [Repository Actions]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}) 
and Java-backed [Web Scripts]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}). When we got the 
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
information about this see [Scheduled jobs]({% link content-services/7.2/develop/repo-ext-points/scheduled-jobs.md %}).

To turn on logging so you can get details of 'why' transactions are retried use the following log level:

* Summary: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=INFO`
* Details: `log4j.logger.org.alfresco.repo.transaction.RetryingTransactionHelper=DEBUG`

### Deployment
It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring 
context files. You would instead use an [Alfresco In-Process SDK]({% link content-services/7.2/develop/sdk.md %}) project.

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

While Actions are typically triggered by [Rules]({% link content-services/7.2/using/content/rules.md %}), you can 
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
repository action implementation can be found [here]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}):

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

* [Repository Actions platform extension point]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}).
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

* [Audit platform extension point]({% link content-services/7.2/develop/repo-ext-points/audit-log.md %}).
* [Auditing]({% link content-services/7.2/admin/audit.md %}) provides a detailed overview of auditing.
* [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y){:target="_blank"} DevCon presentation by Mehdi Belmekki.
* [Audit and Reporting with Alfresco and NoSQL by Zaizi](https://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture){:target="_blank"}

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

* [Authentication & Sync documentation]({% link content-services/7.2/admin/auth-sync.md %})

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

* [Authentication & Sync documentation]({% link content-services/7.2/admin/auth-sync.md %})

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

* [Tagging and Categorizing Content]({% link content-services/7.2/using/content/manage.md %}#tagcategorizecontent)
* [Category Manager documentation]({% link content-services/7.2/admin/share-admin-tools.md %}#cat-manager)

## CheckOutCheckInService
Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.

Check out locks the item and creates a working copy that can be edited. The locked item can be viewed by others, but not 
changed. When the item is checked in, the working copy replaces the original item and removes the lock. 

The following `CheckOutCheckInService` methods are provided: 

* Check out a node
* Check in a node
* Check if a node is a working copy
* Check if a node is locked (checked out)
* Cancel a check out for a given working copy
* Get a working copy
* Get the original checked out node

```java
CheckOutCheckInService checkOutCheckInService = serviceRegistry.getCheckOutCheckInService();

NodeRef checkedOutCopy = checkOutCheckInService.checkout(nodeRef);
```

## ContentService
The `ContentService` provides an API for setting, accessing, and transforming content. You may want to read the content 
associated with a node, or transform the content from one format to another, for example from `.ppt` to `.pdf`. Methods 
provided by the API includes functionality to: 

* Get obtainable transformers (to convert one mimetype to another)
* Get a suitable reader for a content type. The returned `ContentReader` will have a `getContent` method to actually read the content to a specified file.
* Get a suitable writer for a content type. The returned `ContentWriter` will have a `putContent` method to write the content to a specified file.
* Transform content from one mimetype to another.
* Get a transformer suitable for transforming images.
* Utility methods (for example to check size of content and free space in the content store).

Read plain text associated with a content `NodeRef`:

```java
ContentReader reader = serviceRegistry.getContentService().getReader(nodeRef, ContentModel.PROP_CONTENT);
```

Reading binary content of a `NodeRef`:

```java
ContentReader reader = serviceRegistry.getContentService().getReader(nodeRef, ContentModel.PROP_CONTENT);
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
```

Writing data to a node's content:

```java
ContentWriter writer = serviceRegistry.getContentService().getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.putContent(new ByteArrayInputStream(content));
```

Writing a file's data to a node's content:

```java
ContentWriter writer = serviceRegistry.getContentService().getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.setLocale(CONTENT_LOCALE);
File file = new File("c:/temp/images/BigCheese1.bmp");
writer.setMimetype("image/bmp");
writer.putContent(file);
```


Transforming a PPT to PDF (also works for other file formats):

```java
ContentReader pptReader = serviceRegistry.getContentService().getReader(pptNodeRef, ContentModel.PROP_CONTENT);
ContentWriter pdfWriter = serviceRegistry.getContentService().getWriter(pdfNodeRef, ContentModel.PROP_CONTENT, true);
ContentTransformer pptToPdfTransformer = serviceRegistry.getContentService().getTransformer(MimetypeMap.MIMETYPE_PPT, MimetypeMap.MIMETYPE_PDF);
pptToPdfTransformer.transform(pptReader, pdfWriter);
```

Example of creating a new node and setting provided text content:

```java
/**
* Creates a new content node setting the content provided.
*
* @param  parent   the parent node reference
* @param  name     the name of the newly created content object
* @param  text     the content text to be set on the newly created node
* @return NodeRef  node reference to the newly created content node
*/
private NodeRef createContentNode(NodeRef parent, String name, String text) {
    // Create a map to contain the values of the properties of the node
    Map<QName, Serializable> props = new HashMap<QName, Serializable>(1);
    props.put(ContentModel.PROP_NAME, name);
    
    // use the node service to create a new node
    NodeRef node = serviceRegistry.getNodeService().createNode(parent, ContentModel.ASSOC_CONTAINS, 
        QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, name), ContentModel.TYPE_CONTENT, props).getChildRef();
    
    // Use the content service to set the content onto the newly created node
    ContentWriter writer = serviceRegistry.getContentService().getWriter(node, ContentModel.PROP_CONTENT, true);
    writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
    writer.setEncoding("UTF-8");
    writer.putContent(text);
    
    // Return a node reference to the newly created node
    return node;
}
```

## CopyService
This service provides methods to copy nodes within and across folders. It also provides support to update the state 
of a node, with that of another node, within and across folders.

The service is very useful for managing the copy of nodes. When copying container nodes (folders) you also have the option 
to copy child nodes. Operations provided by the service include: 

* Copy a node, along with (optionally) its children.
* Copy and rename a node.
* Get the copies of a specified node (with paged results).
* Check if the name of a top-level node will be changed during copy, due to policies in place.
* Given the copied node, obtain the original node.

The following code is from the Alfresco source code implementation of the `copy` action that shows usage of the 
`CopyService` service:

```java
public class CopyActionExecuter extends ActionExecuterAbstractBase {
    public static final String ERR_OVERWRITE = "Unable to overwrite copy because more than one have been found.";
    
    public static final String NAME = "copy";
    public static final String PARAM_DESTINATION_FOLDER = "destination-folder";
    public static final String PARAM_DEEP_COPY = "deep-copy";
    public static final String PARAM_OVERWRITE_COPY = "overwrite-copy";
    
    private CopyService copyService;
    private NodeService nodeService;
    private CheckOutCheckInService checkOutCheckInService;

    public void setNodeService(NodeService nodeService) { this.nodeService = nodeService; }
    public void setCopyService(CopyService copyService) { this.copyService = copyService; }
    public void setCheckOutCheckInService(CheckOutCheckInService checkOutCheckInService) { this.checkOutCheckInService = checkOutCheckInService; }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
        paramList.add(new ParameterDefinitionImpl(PARAM_DESTINATION_FOLDER, DataTypeDefinition.NODE_REF, true, getParamDisplayLabel(PARAM_DESTINATION_FOLDER)));
        paramList.add(new ParameterDefinitionImpl(PARAM_DEEP_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_DEEP_COPY)));		
        paramList.add(new ParameterDefinitionImpl(PARAM_OVERWRITE_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_OVERWRITE_COPY)));
    }

    @Override
    public void executeImpl(Action ruleAction, NodeRef actionedUponNodeRef) {
        if (!nodeService.exists(actionedUponNodeRef)) {
            return;
        }

        NodeRef destinationParent = (NodeRef) ruleAction.getParameterValue(PARAM_DESTINATION_FOLDER);
        
        Set<QName> destinationAspects = nodeService.getAspects(destinationParent);
        if (destinationAspects.contains(ContentModel.ASPECT_PENDING_DELETE)) {
            return;
        }
        
        boolean deepCopy = false;
        Boolean deepCopyValue = (Boolean)ruleAction.getParameterValue(PARAM_DEEP_COPY);
        if (deepCopyValue != null) {
            deepCopy = deepCopyValue.booleanValue();
        }
        
        boolean overwrite = true;
        Boolean overwriteValue = (Boolean)ruleAction.getParameterValue(PARAM_OVERWRITE_COPY);
        if (overwriteValue != null) {
            overwrite = overwriteValue.booleanValue();
        }
    
        // Since we are overwriting we need to figure out whether the destination node exists
        NodeRef copyNodeRef = null;
        if (overwrite == true) {
            // Try and find copies of the actioned upon node reference.
            // Include the parent folder because that's where the copy will be if this action
            // had done the first copy.
            PagingResults<CopyInfo> copies = copyService.getCopies(actionedUponNodeRef, destinationParent,
            new PagingRequest(1000));
            
            for (CopyInfo copyInfo : copies.getPage()) {
                NodeRef copy = copyInfo.getNodeRef();

                // We know that it is in the destination parent, but avoid working copies
                if (checkOutCheckInService.isWorkingCopy(copy)) {
                    continue;
                }
                
                if (copyNodeRef == null) {
                    copyNodeRef = copy;
                } else {
                    throw new RuleServiceException(ERR_OVERWRITE);
                }
            }
        }
    
        if (copyNodeRef != null) {
        // Overwrite the state of the destination node ref with the actioned upon node state
            this.copyService.copy(actionedUponNodeRef, copyNodeRef);
        } else {
            ChildAssociationRef originalAssoc = nodeService.getPrimaryParent(actionedUponNodeRef);
            // Create a new copy of the node
            this.copyService.copyAndRename(actionedUponNodeRef, destinationParent, originalAssoc.getTypeQName(), 
                    originalAssoc.getQName(), deepCopy);
        }
    }
}
```

## DictionaryService
This service gives you access to the [Content Model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) 
Dictionary. This dictionary provides access to content model meta-data, such as Type and Aspect descriptions. Content 
model metadata is organized into models where each model is given a qualified name. This means that it is safe to develop 
independent models and bring them together into the same Repository without name clashes (as long their namespace is different).

The `DictionaryService` provides access to the entire content model meta-model. The content model meta-model contains 
information of Types, DataTypes, Properties, Aspects, Associations and Constraints. Operations supported include: 

* Getting DataTypes, Types, Associations, Properties, Constraints, Classes from a Content Model.
* Check if a class (i.e. type or aspect) is a sub-class.
* Get sub-types and sub-aspects.

Get all content model types and put in a map keyed on type name prefix string:

```java
Collection<QName> types = serviceRegistry.getDictionaryService().getAllTypes();
Map<String, String> result = new LinkedHashMap<String, String>(types.size());
for (QName type : types) {
    TypeDefinition typeDef = serviceRegistry.getDictionaryService().getType(type);
    if (typeDef != null && typeDef.getTitle(serviceRegistry.getDictionaryService()) != null) {
        result.put(type.toPrefixString(), typeDef.getTitle(dictionaryService));
    }
}
```
Get a content model type and check if it has an aspect:

```java
TypeDefinition typeDef = serviceRegistry.getDictionaryService().getType(typeQName);
if (typeDef != null) {
    boolean hasAspect = typeDef.getDefaultAspectNames().contains("cm:titled");
}
```

Check if a node is of a certain type or sub-type, in this case `cm:content`:

```java
QName nodeType = serviceRegistry.getNodeService().getType(nodeRef);
if (serviceRegistry.getDictionaryService().isSubClass(nodeType, ContentModel.TYPE_CONTENT)) {
    // This is a file...
}
```

## FileFolderService
Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple 
trees of files and folders in the content repository. The `FileFolderService` provides methods for dealing with files and 
folders. This class is an abstraction of the [NodeService](#nodeservice) class, which you should look at if you want more 
control when creating folder and file nodes.

With the `FileFolderService` class the following type of operations are available:

* Create a file or folder
* Copy a file or folder
* Move a file or folder
* Delete a file or folder
* Get Readers and Writers for a file
* List files and folders (with paged results)

The methods typically work with a `NodeRef` for the node that represents the target file or folder.

The following example uses the `FileFolderService` to create a folder and then a file in this new folder. The example 
code is executed inside a [Web Script]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}) so it 
will automatically be part of a transaction using the `RetryingTransactionHelper`, same thing if the code was executed 
from a [Repository Action]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}).

```java
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

We use the `ServiceRegistry` to get to the `FileFolderService`. The `ServiceRegistry` bean is injected into the Web Script 
controller bean as follows:

```xml
<bean id="webscript.alfresco.tutorials.filefolderservicetest.get"
		  class="org.alfresco.training.platformsample.FileFolderServiceTestWebScript"
		  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

>**Note** how we catch the `FileExistsException` to deal with the situations when the folder or file already exists. 
> This is a runtime exception so we are not forced to deal with it, but it's good practice to catch it and display a 
> nice message to the end user.

If we complete the Web Script with a descriptor and template as follows:

`/extension/templates/webscripts/alfresco/tutorials/filefolderservicetest.get.desc.xml`:

```xml
<webscript>
    <shortname>FileFolderService Test Sample Webscript</shortname>
    <description>Uses the FileFolderService to create a folder and a file</description>
    <url>/sample/filefolderservicetest</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
```

`/extension/templates/webscripts/alfresco/tutorials/filefolderservicetest.get.html.ftl`:

```text
Message: '${message}'
```

Then, the first time we execute the Web Script ([http://localhost:8080/alfresco/s/sample/filefolderservicetest](http://localhost:8080/alfresco/s/sample/filefolderservicetest){:target="_blank"}) 
we will get a response looking something like this:

```text
Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and a folder was created: FileInfo[name=Some Folder, isFolder=true, nodeRef=workspace://SpacesStore/91b0932a-5056-4607-a1bd-849ec655d16e], a text file was then created in this folder: FileInfo[name=some.txt, isFolder=false, nodeRef=workspace://SpacesStore/5b17ba0a-b0b5-4df1-bd37-91098cac7263]'
```

If we now run the Web Script again, when the folder and file exist, the following response is returned:

```text
Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and there was a problem creating a folder: 00270021 File or folder Some Folder already exists'
```

## JobLockService
This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, 
for example, an Activities feed job that generates an email to send to everyone every night, or a content cleaner job that 
cleans up orphaned content.

The `JobLockService` is used to provide a locking service at the job level, rather than the node level. It's for example 
used indirectly via the [AbstractScheduledLockedJob](https://github.com/Alfresco/alfresco-community-repo/tree/master/repository/src/main/java/org/alfresco/schedule/AbstractScheduledLockedJob.java){:target="_blank"} `QuarzJobBean`.

For an example of using the `JobLockService` see the [Content Store Cleaner code](https://github.com/Alfresco/alfresco-community-repo/tree/master/repository/src/main/java/org/alfresco/repo/content/cleanup/ContentStoreCleaner.java){:target="_blank"} on GitHub.

See also the [Scheduled Jobs extension point]({% link content-services/7.2/develop/repo-ext-points/scheduled-jobs.md %})

## LockService
A node-level locking service, used by the `CheckOutCheckIn` service. Does not create a working copy. If you need a 
node-level locking system, then the `LockService` can provide this. Functionality provided by the service includes: 

* Checking for a lock on a node
* Obtaining lock information
* Locking and unlocking a node
* Suspend and enable locks

Example checking if a node is locked:

```java
/**
* Return whether a Node is currently locked
* @param node             The Node wrapper to test against
* @param lockService      The LockService to use
* @return whether a Node is currently locked
*/
public static Boolean isNodeLocked(Node node,LockService lockService) {
  Boolean locked = Boolean.FALSE;
  
  if (node.hasAspect(ContentModel.ASPECT_LOCKABLE)) {
      LockStatus lockStatus = serviceRegistry.getLockService().getLockStatus(node.getNodeRef());
      if (lockStatus == LockStatus.LOCKED || lockStatus == LockStatus.LOCK_OWNER) {
          locked = Boolean.TRUE;
      }
  }

  return locked;
}
```

## MessageService
Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded 
from resource bundles deployed in the repository. The `MessageService` provides functionality around Internationalization (i18n). 
It provides facilities to:

* Get a message based on a key from a localized properties file
* Get and set the locale
* Register and unregister resource bundles

All user displayed strings that originate in the repository should be externalised into resource bundles to ensure that 
the repository is fully localisable. Examples of strings requiring extraction include:

* Descriptive display labels used by a client
* Error messages

Extracted strings should be gathered into resource bundles by functional area. This enables functional areas to remain 
distinct within the repository. The base bundle should be named by functional area and have the `.properties` extension. 
All base bundles should be in US English. If a message needs to be parameterised the Java `MessageFormatter` style should 
be used.

The keys used in the resource bundles should be scoped by functional area to avoid clashes (this is important since at 
runtime the contents of the various resource bundles is combined, any names clashes will result in message values being 
overwritten).

A resource bundle can be placed anywhere in the source tree, but in general repository resource bundles should be placed 
in the `alfresco.messages` package.

Example resource bundle contents:

```text
# User displayed string for the rule service functional area

ruleservice.error=There has been an error executing rule {0}.
ruleservice.confimation_all=All rules have been executed.
```

Before a resource bundle can be used by the repository it must be registered. Suitable methods are provided by the 
service to support this. And more commonly the `org.alfresco.i18n.ResourceBundleBootstrapComponent` class can be used as 
a Spring bean to register resource bundles.

The following example uses a [Web Script]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}) 
to test registered resource bundles as follows: 

```java
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

  protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {
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

This Web Script is called with two parameters, one specifies the resource string we want (i.e. `key`) and one specifies 
the language we want the resource string text in (i.e. `language`).

We then use the `ServiceRegistry` to get to the `MessageService`, and then the `getMessage` method is called to get the 
requested message in correct locale.

The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```xml
<bean id="webscript.alfresco.tutorials.messageservicetest.get"
    class="org.alfresco.training.platformsample.MessageServiceTestWebscript"
    parent="webscript">
    
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
</bean>
```

If we complete the Web Script with a descriptor and template as follows:

`/extension/templates/webscripts/alfresco/tutorials/messageservicetest.get.desc.xml`:

```xml
<webscript>
    <shortname>MessageService Test Sample Webscript</shortname>
    <description>Get a message for a specific key and language, uses the MessageService</description>
    <url>/sample/messageservicetest?key={key}&amp;language={language}</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
```

`/extension/templates/webscripts/alfresco/tutorials/messageservicetest.get.html.ftl`:

```text
${message}
```

And add two resource files as follows:

`platform-jar/src/main/resources/alfresco/module/platform-jar/messages/test-messages.properties`:

```text
alfresco.tutorial.hello=Hello
```

`platform-jar/src/main/resources/alfresco/module/platform-jar/messages/test-messages_sv.properties`:

```text
alfresco.tutorial.hello=Hej
```

These two resource files can be loaded by defining the following Spring bean:

```xml
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

[http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en){:target="_blank"}

The response in the browser will look something like this:

```text
Your 'MessageServiceTestWebscript' Web Script was called:

Locale: English

Translation of alfresco.tutorial.hello: Hello
```

If we call it with the other locale (sv) the response looks like this ([http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv){:target="_blank"}):

```text
Your 'MessageServiceTestWebscript' Web Script was called:

Locale: Swedish

Translation of alfresco.tutorial.hello: Hej
```

## MimetypeService
Provides support related to content mimetype. For example, provides methods to retrieve the extension for the 
specified mimetype. Content Services supports numerous mimetypes out-of-the-box. However, it is also possible to add 
your own custom mimetypes. The `MimetypeService` provides an API for managing mimetypes. For example, you can obtain a 
list of current mimetypes, mimetype extensions, and guess mimetypes using a specified file and content reader.

Using the mimetype service when writing content:

```java
ContentWriter contentWriter = serviceRegistry.getContentService().getWriter(node, ContentModel.PROP_CONTENT, true);
contentWriter.setMimetype(serviceRegistry.getMimetypeService().guessMimetype(filename));
contentWriter.putContent(field.getInputStream());
```

See also the [Mimetype platform extension point]({% link content-services/7.2/develop/repo-ext-points/mimetypes.md %})

## ModuleService
A service to control and provide information about the currently-installed [Alfresco Module Packages (AMPs)]({% link content-services/7.2/develop/extension-packaging.md %}).

A module is an extension to Content Services that is developed with a particular project structure and packaging. 
Modules can be registered and loaded as part of the boot process. In Share Admin Tools, you can 
[view the currently installed Modules]({% link content-services/7.2/install/zip/amp.md %}#viewing-module-packages). 
The `ModuleService` provides functionality to programmatically start up and shut down modules, and get module information.

Get all modules and shut down:

```java
List<ModuleDetails> modules = serviceRegistry.getModuleService().getAllModules();
loggerService.info(I18NUtil.getMessage(MSG_FOUND_MODULES, modules.size()));

for (ModuleDetails module : modules) {
    Map<String, ModuleComponent> components = getComponents(module.getId());
    for (ModuleComponent component : components.values()) {
        component.shutdown();
    }
}
```
## NamespaceService
Provides access to content model namespaces and their definition of namespace URIs and Prefixes. The `NamespaceService` 
has constants defined for the major namespaces used by internal Alfresco content models, including the prefixes for those.

Content Services namespaces start with `http://www.alfresco.org`. The top-level namespace sub-divisions are:

* model - identify a data model
* view - identify a view of content held in the repository
* ws - identify a Web Service definition
* test - identify a test definition

Each namespace typically ends with its version number.

Here is a list of some of the out-of-box content models that are good to know about:

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

It's common to use the `NamespaceService` to get to prefixes for content models, such as in this example:

```java
String companyHomePath = serviceRegistry.getNodeService().getPath(companyHome)
               .toPrefixString(serviceRegistry.getNamespaceService());
```

This code would result in `companyHomePath` being set to `/app:company_home`.

Another example usage is the following code that uses the `NamespaceService` when a `QName` is created:

```java
String name = "aName";
QName aQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, QName.createValidLocalName(name));
```

This code would result in `aQName` being set to `{http://www.alfresco.org/model/content/1.0}aName`.

## NodeService
Provides an API for managing nodes, such as folders and files. Nodes are the fundamental data structure in Content Services. 
All content that is stored is represented by a node data structure, which contains content metadata that is persisted in 
a database (such as PostgreSQL). The content referenced by the node is stored as a `*.bin` file in a content store 
(such as the file system, S3, encrypted or other content store). 

Every node in the system is referenced by a `NodeRef`, which is made up of the content store protocol, the content store name, 
and the Universal Unique Identifier (UUID) of the content, for example: `workspace://SpacesStore/ccb906ba-a768-4ccb-8b26-515119e1efdc`. 
Generally nodes are of two main types, a file node (`cm:content`), or a folder node (`cm:folder`). Folders can contain 
child nodes. Note that each content store will have a root node, and all other nodes in the store will be children of 
the root node.

The `NodeService` provides an extensive API for managing nodes. Functionality includes:

* Adding aspects, children, properties, associations
* Getting aspects, children, properties, associations
* Removing aspects, children, properties, associations
* Creating and deleting stores
* Creating and deleting nodes
* Checking for existence of a node
* Get available content stores
* Moving nodes

The `NodeService` makes extensive use of `NodeRef`s to reference the node of interest.

Note that for creating folders and files you should also have a look at [FileFolderService](#filefolderservice) as it is 
an abstraction of the `NodeService` service that makes it a bit easier to work with folders and files with the cost of 
being less flexible.

Creating a file node:

```java
NodeRef parentFolderNodeRef = serviceRegistry.getNodeLocatorService().getNode(CompanyHomeNodeLocator.NAME, null, null);

// Create file node metadata
QName associationType = ContentModel.ASSOC_CONTAINS;
QName associationQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI,
        QName.createValidLocalName(filename));
Map<QName, Serializable> nodeProperties = new HashMap<QName, Serializable>();
nodeProperties.put(ContentModel.PROP_NAME, filename);
ChildAssociationRef parentChildAssocRef = serviceRegistry.getNodeService().createNode(
        parentFolderNodeRef, associationType, associationQName, ContractType.QNAME, nodeProperties);
NodeRef newFileNodeRef = parentChildAssocRef.getChildRef();

// Set text content for file node
boolean updateContentPropertyAutomatically = true;
ContentWriter writer = serviceRegistry.getContentService().getWriter(
        newFileNodeRef, ContentModel.PROP_CONTENT, updateContentPropertyAutomatically);
writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
writer.setEncoding("UTF-8");
writer.putContent(someText);
```

Creating a folder node:

```java
private void createFolder(NodeRef rootRef) {
    String folderName = "SampleFolder";
    NodeRef parentFolderNodeRef = rootRef;

    // Create folder node 
    QName associationType = ContentModel.ASSOC_CONTAINS;
    QName associationQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI,
            QName.createValidLocalName(folderName));
    QName nodeType = ContentModel.TYPE_FOLDER;
    Map<QName, Serializable> nodeProperties = new HashMap<QName, Serializable>();
    nodeProperties.put(ContentModel.PROP_NAME, folderName);
    ChildAssociationRef parentChildAssocRef = serviceRegistry.getNodeService().createNode(
            parentFolderNodeRef, associationType, associationQName, nodeType, nodeProperties);
    NodeRef newFolderNodeRef = parentChildAssocRef.getChildRef();

}
```

Add an aspect to a node:

```java
NodeRef someNodeRef = ...
Map<QName, Serializable> aspectProperties = new HashMap<QName, Serializable>();
aspectProperties.put(ContentModel.PROP_TITLE, "A title");
aspectProperties.put(ContentModel.PROP_DESCRIPTION, "A description");
serviceRegistry.getNodeService().addAspect(someNodeRef, ContentModel.ASPECT_TITLED, aspectProperties);
```

Getting a `NodeRef` from the node path:

```java
StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
ResultSet rs = serviceRegistry.getSearchService().query(storeRef, SearchService.LANGUAGE_LUCENE, 
        "PATH:\"/app:company_home/app:user_homes/sys:boris/cm:mypics\"");
NodeRef companyHomeNodeRef = null;
try {
    if (rs.length() == 0) {
        throw new AlfrescoRuntimeException("Didn't find Company Home");
    }

    companyHomeNodeRef = rs.getNodeRef(0);
} finally {
    rs.close();
}
```

Getting a file name from a `NodeRef`:

```java
String fileName = (String) serviceRegistry.getNodeService().getProperty(nodeRef, ContentModel.PROP_NAME);
```

Reading a node property. The property may come from an aspect or not. You will probably want to cast to 
the appropriate type:

```java
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
Object value = serviceRegistry.getNodeService().getProperty(nodeRef, PROP_QNAME_MY_PROPERTY);
```

Updating a node property. The property may come from an aspect or not:

```java
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
serviceRegistry.getNodeService().setProperty(nodeRef, PROP_QNAME_MY_PROPERTY, value);
```

Getting the parent of a `NodeRef`:

```java
ChildAssociationRef childAssociationRef = serviceRegistry.getNodeService().getPrimaryParent(nodeRef);
NodeRef parentFolderNodeRef = childAssociationRef.getParentRef();
```

Adding an aspect to a node. Supposing the "MyAspect" aspect defines a "myProperty" property in the "custom.model" 
namespace:

```java
QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
Map<QName,Serializable> aspectValues = new HashMap<QName,Serializable>();
aspectValues.put(PROP_QNAME_MY_PROPERTY, value);
serviceRegistry.getNodeService().addAspect(nodeRef, CUSTOM_ASPECT_QNAME, aspectValues);
```

Checking whether a node has a given aspect:

```java
QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
boolean hasAspect = serviceRegistry.getNodeService().hasAspect(node, CUSTOM_ASPECT_QNAME);
```

Looping through children of a `NodeRef`:

```java
List<ChildAssociationRef> children = serviceRegistry.getNodeService().getChildAssocs(companyHome);
for (ChildAssociationRef childAssoc : children) {
    NodeRef childNodeRef = childAssoc.getChildRef();
    // Use childNodeRef here.
}
```

Creating a parent-child association between two existing `NodeRef`:

```java
QName PROP_QNAME_MY_CHILD_ASSOCIATION = QName.createQName("custom.model", "myChildAssociation");
serviceRegistry.getNodeService().addChild(parentNodeRef, childNodeRef, PROP_QNAME_MY_CHILD_ASSOCIATION, PROP_QNAME_MY_CHILD_ASSOCIATION);
```

Creating a peer-2-peer association between two existing `NodeRef`:

```java
QName PROP_QNAME_MY_ASSOCIATION = QName.createQName("custom.model", "myAssociation");
serviceRegistry.getNodeService().createAssociation(sourceNodeRef, targetNodeRef, PROP_QNAME_MY_ASSOCIATION);
```

Setting the content type of a node:

```java
QName PROP_QNAME_MY_TYPE = QName.createQName("custom.model", "myType");
serviceRegistry.getNodeService().setType(finalOriginal, MY_TYPE);
```

Getting the MIME type of a node:

```java
ContentData contentData = (ContentData) serviceRegistry.getNodeService().getProperty(nodeRef, ContentModel.PROP_CONTENT);
String originalMimeType = contentData.getMimetype();
```

Adding a category to a node:

```java
ArrayList<NodeRef> categories = new ArrayList<NodeRef>(1);
categories.add(categoryNode);
if (!serviceRegistry.getNodeService().hasAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE) {
    HashMap<QName, Serializable> props = new HashMap<QName, Serializable>();
    props.put(ContentModel.PROP_CATEGORIES, categories);
    serviceRegistry.getNodeService().addAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE, props);
} else {
    serviceRegistry.getNodeService().setProperty(targetNode, ContentModel.PROP_CATEGORIES, categories);
}
```

Getting the categories of a node:

```java
List<NodeRef> categories = (List<NodeRef>) serviceRegistry.getNodeService().getProperty(nodeRef, ContentModel.PROP_CATEGORIES);
```

Deleting a node for real (not recycle bin):

```java
serviceRegistry.getNodeService().addAspect(nodeRef, ContentModel.ASPECT_TEMPORARY, null);
serviceRegistry.getNodeService().deleteNode(nodeRef);
```

See also [Custom Content Store platform extension point]({% link content-services/7.2/develop/repo-ext-points/content-stores.md %})

### Setting content for node
Since Content Services 6.2 the `cm:content` property cannot be set using the `NodeService`. Any code that uses 
`NodeService` methods `setProperties`, `addProperties`, `createNode`, `addAspect`, or `setProperty` to set the content 
property need to be refactored or designed to use the `ContentWriter` service instead. The `ContentWriter` can be obtained 
by using the [ContentService](#contentservice).

There are ways to get around this security check: Add full class names as a comma separated list to a global property:

`contentPropertyRestrictions.whitelist=org.alfresco.Class1,org.alfresco.Class2`

Disable the `ContentPropertyRestrictionInterceptor` fully by setting a global property:

`contentPropertyRestrictions.enabled=false`

However, it's better to refactor the code by using the `ContentWriter`.

### Deleting nodes
Since Content Services 4.1.1 the `alf_node.node_deleted` database column has been replaced by a system type 
(`sys:deleted`) and an aspect (`sys:pendingDelete`). While the `sys:deleted` type will never be visible to client code, 
the `sys:pendingDelete` aspect will be. Any custom code that attempts to modify behaviour during node deletion may need 
to be adjusted.

Changes made in 4.1.1 introduced comprehensive behaviour policy callbacks (i.e. event handlers) for all associations 
during node deletion. The following [node policies]({% link content-services/7.2/develop/repo-ext-points/behavior-policies.md %}) 
are available for node deletion:

* `BeforeDeleteNodePolicy`
* `BeforeArchiveNodePolicy`
* `OnDeleteNodePolicy`
* `BeforeDeleteChildAssociationPolicy`
* `OnDeleteChildAssociationPolicy`
* `BeforeDeleteAssociationPolicy`
* `OnDeleteAssociationPolicy`

The association (peer and child) policies are now fired reliably for all associations within the node hierarchy being 
deleted. For examples of their usage, see: `org.alfresco.repo.model.ml.MultilingualDocumentAspect`.

Once `NodeService.deleteNode` is called:

* It is impossible to add or remove associations to or from any node in the hierarchy being deleted. This includes attempted changes from any source including changes attempted by custom code reacting to before- or on-delete callbacks.
* All nodes in the hierarchy will temporarily have the `sys:pendingDelete` aspect applied. Custom code can using `NodeService.hasAspect` to discover if a node is about to be deleted.
* It is impossible to add new nodes or link other nodes into any node in the hierarchy being deleted. Any attempt to do so will be treated as a concurrency violation since custom code should not be attempting this from callbacks during the node deletion.
* All associations, with the notable exception of the primary parent-child links, will be removed even if node archival is taking place. Node archival now only preserves the core parent-child associations and discards all other associations after making the relevant callbacks. Custom code must use the association deletion callbacks to remove nodes or aspects that might violate model integrity constraints in the archived hierarchy.

A good example of the changes is in the handling of the `cm:copiedFrom` aspect. Copied nodes have an aspect `cm:copiedfrom`, 
which has a mandatory association to the original source node. When either the source or copy is deleted the aspect has 
to be removed. See `org.alfresco.repo.copy.CopyServiceImpl.beforeDeleteOriginalAssociation` for how the association 
deletion is detected in order to ensure that the aspect is removed from the copied node.

## NodeLocatorService
The `NodeLocatorService` looks up node locators registered via Spring configuration by name. The service provides a way 
to lookup one node from another. This Spring configuration file defines a base bean that can be used to define new node 
locator implementations. Using this bean will automatically register the node locator with the repository and make it 
available.

The following table shows the node locators available out-of-the-box, the parameters they accept and their use.

|Name|Class|Parameters|Usage|
|----|-----|----------|-----|
|`companyhome`|`CompanyHomeNodeLocator`|None|Returns the `/Company Home` folder node|
|`userhome`|`UserHomeNodeLocator`|None|Returns the current user's home folder node|
|`sharedhome`|`SharedHomeNodeLocator`|None|Returns the Shared Home folder root node|
|`siteshome`|`SitesHomeNodeLocator`|None|Returns the Sites root node|
|`doclib`|`DocLibNodeLocator`|None|Returns the `documentLibrary` node for the site the source node belongs to|
|`self`|`SelfNodeLocator`|None|Returns the source node|
|`xpath`|`XPathNodeLocator`|query, `store_type` and `store_id`|Returns the node pointed to by the given XPath query. The XPath should be relative to the root of a store. If a source node is provided the Store is taken from the node, otherwise the `store_type` and `store_id` must be provided.|
|`ancestor`|`AncestorNodeLocator`|type and aspect|Returns an ancestor node of the source node. If no parameters are provided the immediate parent is returned. If a type parameter is present the first ancestor node of that type is returned. If an aspect parameter is present the first ancestor node with that aspect applied is returned. The type and aspect parameters can be combined thus finding an ancestor node of a certain type and with a specific aspect applied.|

The following shows how to use one of the out-of-the-box node locators to get a `NodeRef` for the `/Company Home` folder:

```java
NodeRef result = serviceRegistry.getNodeLocatorService().getNode(CompanyHomeNodeLocator.NAME, null, null);
```

### Custom Node Locator
In the following example we will see how to implement a custom node locator, it will allow a named folder to be found. 
To define the example node locator the following Spring configuration is used (in a custom context file):

```xml
<bean id="namedFolderNodeLocator" class="com.example.NamedFolderNodeLocator" parent="baseNodeLocator">
   <property name="NodeService" ref="NodeService" />
   <property name="FileFolderService" ref="FileFolderService" />
</bean>
```

A node locator must implement the `NodeLocator` interface, whose definition is shown below:

```java
public interface NodeLocator {
    NodeRef getNode(NodeRef source, Map<String, Serializable> params);
    public List<ParameterDefinition> getParameterDefinitions(); 
}
```

A `NodeLocator` in its simplest form takes a source node, some optional parameters and returns a node or null if a 
suitable node could not be found. If a node is not found the `NodeLocatorService` returns the `NodeRef` representing 
the `/Company Home` folder.

The source node is not mandatory, node locators can be used to return well known nodes, `/Company Home`, `/User Home` for 
example in which case a source node is not required.

If a `NodeLocator` has parameters they must be defined using the same definition classes (`ParameterDefinition`) used by 
the `ActionService`.

A base class `AbstractNodeLocator` is provided and it's recommended that your `NodeLocator` extends this base class. 
It provides the functionality to register the `NodeLocator` with the `NodeLocatorService` registry. This class also 
defines an abstract method your implementation must override.

```java
public abstract String getName();
```

This is the unique name for your `NodeLocator` and will be used by the `NodeLocatorService` in the lookup process. 
It is also used in the `startLocation` configuration.

Our example locator, `NamedFolderNodeLocator`, will be named `namedfolder` and will expect a single parameter called 
`name` which will indicate what folder to locate. The full source for this example is shown below:

```java
public class NamedFolderNodeLocator extends AbstractNodeLocator {
    public static final String LOCATOR_NAME = "namedfolder";
    public static final String NAME_PARAM = "name";

    private ServiceRegistry serviceRegistry;
    
    @Override
    public NodeRef getNode(NodeRef source, Map<String, Serializable> params) {
        NodeRef node = null;
      
        String folderName = (String)params.get(NAME_PARAM);
        if (source != null && folderName != null) {
           // Get the parent of the source node
           NodeRef parent = serviceRegistry.getNodeService().getPrimaryParent(source).getParentRef();
           // Look for a child with the provided name
           NodeRef folder = serviceRegistry.getNodeService()NodeService().getChildByName(
                   parent, ContentModel.ASSOC_CONTAINS, folderName);
           // Make sure it's a folder
           if (folder != null && serviceRegistry.getFileFolderService().getFileInfo(folder).isFolder()) {
               node = folder;
           }
        }
        
        return node;
    }
      
    public List<ParameterDefinition> getParameterDefinitions() {
        List<ParameterDefinition> paramDefs = new ArrayList<ParameterDefinition>(2);
        paramDefs.add(new ParameterDefinitionImpl(NAME_PARAM, DataTypeDefinition.TEXT, false, "Name"));
        return paramDefs;
    }
            
    public String getName() {
        return LOCATOR_NAME;
    }
}
```

The `"`source`"` parameter in `getNode()` represents the starting point, in a form association control this will be the 
node being edited, for a create form it will be the destination node. Our example finds the primary parent of the 
source node and looks for a child folder with the given name. This is a fairly simple example but it is easy to see how 
this could be extended to allow for a named folder to be located up or down a folder hierarchy.

**startLocation**

The main use of the `NodeLocatorService` is to determine where the forms association control should start when it is 
first displayed. In some scenarios the picker may need to start in the root of the document library of a Share site or 
start in the folder where the node being edited is located. See the next section for a list of `NodeLocators` provided 
out-of-the-box.

`NodeLocators` are configured using form control parameters. The name of the `NodeLocator` implementation is provided as 
the `startLocation` parameter and the parameters are provided by a `startLocationParameters` parameter. They should be 
provided in the form of query string parameters, for example `name=value&name=value`.

The configuration for our example node locator is shown below, it will look for a folder named "Example" in the same 
folder as the node being edited.

```xml
<field id="my:association">
   <control>
      <control-param name="startLocation">{namedfolder}</control-param>
      <control-param name="startLocationParams">name=Example</control-param>
   </control>
</field>
```

>**Note:** The curly braces are required around the node locator name.

## PermissionService
Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. 
Each user and group can be assigned a role.

The `PermissionService` is responsible for: 

* Providing well known permissions and authorities
* Providing an API to read, set, and delete permissions for a node
* Providing an API to query, enable, and disable permission inheritance for a node
* Determining if the current, authenticated user has a permission for a node

The `PermissionService` interface defines constants for well-known permissions and authorities. The default implementation 
coordinates implementations of two service provider interfaces: a `ModelDAO` and a `PermissionsDAO`. A permission is 
simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and 
configured in `<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml`. 
This file also contains the configuration for security enforcement.

The `ModelDAO` interface defines an API to access a permissions model. The default permission model is in XML and defines 
permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. 
There may be more than one permission model defined in XML; they are in practice merged into one permission model. 
A module can extend the permission model.

The available permissions are defined in the permission model. This is defined in 
`<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\model\permissionDefinitions.xml`. 
This configuration is loaded in a bean definition in `<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml`. 
This file also defines global permissions. The definition file is read once at application start-up. If you make changes 
to this file, you will have to restart the repository in order to apply the changes.

Set `Coordinator` role permissions for a username `john` on a node:

```java
serviceRegistry.getPermissionService().setPermission(nodeRef, "john", PermissionService.COORDINATOR, true);
```
See also [Permissions platform extension point]({% link content-services/7.2/develop/repo-ext-points/permissions.md %})

## PersonService
This service encapsulates the management of people and groups. People and groups may be managed entirely in the 
repository or entirely in some other implementation such as LDAP. Some properties may be in the repository and some in 
another store. Individual properties may or may not be mutable.

The `PersonService` supports various methods relating to users. The methods relating to the Person service include the 
ability to:

* Look up people from usernames
* Create user information
* Delete user information
* Modify user information

Create a user that can login/authenticate with password:

```java
if (serviceRegistry.getAuthenticationService().authenticationExists(userName) == false) {
    serviceRegistry.getAuthenticationService().createAuthentication(userName, password.toCharArray());

    Map user = new Map();
    user.put(ContentModel.PROP_USERNAME, userName);
    user.put(ContentModel.PROP_FIRSTNAME, "firstName");
    user.put(ContentModel.PROP_LASTNAME, "lastName");
    user.put(ContentModel.PROP_EMAIL, userName+"@example.com");
    user.put(ContentModel.PROP_JOBTITLE, "jobTitle");
    
    NodeRef person = serviceRegistry.getPersonService().createPerson(user);
}
```

## RenditionService
Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from 
their source node and as such can be updated automatically when their source node's content (or other properties) are 
changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), 
rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. 

Renditions can be performed synchronously or asynchronously and can be created at a specified location within the 
repository. They are by default created as primary children of their source node, but it is possible to have them 
created at other nodes specified explicitly or as templated paths.

### Rendering Engines
Rendering engines are responsible for performing the transformation on a source node to create a rendition. Different 
rendering engines will perform different types of transformation. They can be registered with the `RenditionService` 
using a unique name.

Rendering engine definitions provide a description of a given rendering engine. Each rendering engine definition exposes 
parameter definitions for all the parameters which can be provided to the associated rendering engine. Each parameter 
definition describes the parameter name, type and whether or not it is mandatory.

Rendition definitions encapsulate all the necessary information for rendering a given source node into a rendition. 
This includes the rendering engine, which is used to perform the rendition and all the parameter values specified. 
Rendition definitions have unique, qualified names and can be persisted within the repository.

Composite rendition definitions are a special type of rendition definition that allows the creation of renditions that 
require a sequence of two or more transformation steps. For example, a composite rendition definition could be used to 
first reformat a PDF document into a PNG image and then resize the image to a small thumbnail. Composite rendition 
definitions specify an ordered list of other rendition definitions to be sequentially executed, with the output of the 
previous transformation feeding in as the source node for the next definition. All composite rendition definitions 
specify the composite rendering engine for their transformations.

Available rendering engines include:

* Base rendering engine
* Reformat rendering engine
* Image rendering engine
* FreeMarker rendering engine
* XSLT rendering engine
* HTML rendering engine
* Composite rendering engine

### Sample code
Rendering engines are registered with the `RenditionService` through Spring dependency injection. 
The `rendition-services-context.xml` declares an abstract bean called `baseRenderingAction`, which is the parent bean 
for all rendering engines. `baseRenderingAction` itself is a child bean of the `ActionService`s `action-executer` bean.

In Content Services, there are a number of concrete rendering engine beans, for example, reformat within the same 
spring context file. To register a new rendering engine, add new spring bean definitions.

Creating a rendition definition:

```java
// Names must be provided for the rendition definition and the rendering engine to use.
QName  renditionName       = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
String renderingEngineName = ReformatRenderingEngine.NAME;

// Create the Rendition Definition object.
RenditionDefinition renditionDef = serviceRegistry.getRenditionService().createRenditionDefinition(renditionName, renderingEngineName);

// Set parameters on the rendition definition.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);
```

Storing a rendition definition:

```java
// Store the Rendition Definition using the QName
// of the Rendition Definition as a unique identifier.
serviceRegistry.getRenditionService().saveRenditionDefinition(renditionDef);
```

Retrieving a rendition definition can be done in the following ways:

```java
// 1. As a list of all stored Rendition Definitions
List<RenditionDefinition> definitions = serviceRegistry.getRenditionService().loadRenditionDefinitions();

// 2. As a list of stored Rendition Definitions filtered by Rendering Engine name.
String renderingEngineName = "myEngineName";
List<RenditionDefinition> definitions = serviceRegistry.getRenditionService().loadRenditionDefinitions();

// 3. As a single Rendition Definition, uniquely identified by its QName.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = serviceRegistry.getRenditionService().loadRenditionDefinition(renditionName);
```

Editing an existing rendition definition:

```java
// Retrieve the existing Rendition Definition
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = serviceRegistry.getRenditionService().loadRenditionDefinition(renditionName);

// Make changes.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);
renditionDef.setParameterValue(serviceRegistry.getRenditionService().PARAM_ORPHAN_EXISTING_RENDITION, true);

// Persist the changes.
serviceRegistry.getRenditionService().saveRenditionDefinition(renditionDef);
```

Performing a simple rendition:

```java
// A rendition definition is required to perform any rendition.
// The rendition definition can be loaded from the repository or created as shown above.
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = serviceRegistry.getRenditionService().render(sourceNode, renditionDef);
```

Performing a composite rendition:

```java
// First obtain a Composite Rendition Definition
// This can be loaded from the repository or created as shown here.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
CompositeRenditionDefinition compositeDefinition = 
        serviceRegistry.getRenditionService().createCompositeRenditionDefinition(renditionName);

// Now specify which other renditions are to be performed as part of the composite rendition.
RenditionDefinition reformatDefinition = serviceRegistry.getRenditionService().load(reformatRenditionName);
RenditionDefinition rescaleImageDefinition = serviceRegistry.getRenditionService().load(rescaleImageRenditionName);
compositeDefinition.addAction(reformatDefinition);
compositeDefinition.addAction(rescaleImageDefinition);

// Perform the composite rendition
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = serviceRegistry.getRenditionService().render(sourceNode, compositeDefinition);
```

Retrieving renditions for a node:

```java
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService

// 1. Get all renditions with the specified node as their source.
List<ChildAssociationRef> allRenditions = serviceRegistry.getRenditionService().getRenditions(sourceNode);

// 2. Get the rendition with the specified source node and the specified rendition definition name.
//    If there is no matching rendition, null is returned
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRenditionDef");
ChildAssociationRef rendition = serviceRegistry.getRenditionService().getRenditionByName(sourceNode, renditionName);

// 3. Get the renditions with the specified source node whose MIME types match a filter
//    This example returns renditions whose mimetype starts with "image".
List<ChildAssociationRef> imageRenditions = serviceRegistry.getRenditionService().getRenditions(sourceNode, "image");
```

Specifying a rendition definition as asynchronous or synchronous:

This behaviour is inherited from the `ActionService` - remember that `RenditionDefinition` extends `Action`. So we can 
create a rendition definition as shown above and set it to execute asynchronously:

```java
RenditionDefinition renditionDef = // created as shown above

renditionDef.setExecuteAsynchronously(true);
```

See also:

* [Content Transformers and Renditions extension point]({% link content-services/7.2/develop/repo-ext-points/content-transformers-renditions.md %})
* [Mimetypes extension point]({% link content-services/7.2/develop/repo-ext-points/mimetypes.md %})

## RetryingTransactionHelper
A helper that runs a unit of work inside a `UserTransaction`, transparently retrying the unit of work if the cause of 
failure is an optimistic locking or deadlock condition.

A description and application of the `RetryingTransactionHelper` can be found in the [getting started](#gettingstarted) 
section.

## SearchService
This encapsulates the execution of search against different indexing mechanisms. Solr provides indexing of metadata and 
the plain text of content. This can be queried using various query languages. The query languages supported include: 

* LANGUAGE_FTS_ALFRESCO
* LANGUAGE_CMIS_ALFRESCO
* LANGUAGE_CMIS_STRICT
* LANGUAGE_LUCENE
* LANGUAGE_SOLR_ALFRESCO
* LANGUAGE_SOLR_CMIS
* LANGUAGE_SOLR_FTS_ALFRESCO
* LANGUAGE_XPATH

Alfresco Full Text Search (FTS) is Alfresco's native query language. It supports searching by single term, phrase, 
exact term, term expansion, conjunctions, disjunctions, negation, optional, mandatory, excluded, fields, wildcards, 
ranges, fuzzy matching, proximity, boosts and grouping. For example:

`ASPECT:'cm:titled' AND cm:title:'*Sample*' AND TEXT:'code'`

A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities. The CMIS 
specification supports a subset of Alfresco FTS, which can be embedded in CMIS-SQL using the `contains()` predicate 
function. CMIS query example:

`SELECT * FROM cm:titledWHERE cm:titlelike '%Sample%' AND CONTAINS('code')`

Examples using the `SearchService` languages FTS and CMIS:

```java
ResultSet results = serviceRegistry.getSearchService().query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, 
        "ASPECT:'cm:titled' AND cm:title:'*Sample*' AND TEXT:'code'");

results = serviceRegistry.getSearchService().query(storeRef, SearchService.LANGUAGE_CMIS_ALFRESCO, 
        "SELECT * FROM cm:titledWHERE cm:titlelike '%Sample%' AND CONTAINS('code')");
```

Using `SearchService` to get a `NodeRef` for an XPath (as seen in NodeBrowser) using language LUCENE:

```java
/**
 * Get a NodeRef by its path.
 *  
 * @path as displayed by the NodeBrowser.
 * @return the NodeRef, or null if no NodeRef matches this path.
 */
private NodeRef getNode(String path) {
  ResultSet results = null;

  try {
      StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
      results = serviceRegistry.getSearchService().query(storeRef, SearchService.LANGUAGE_LUCENE, 
        "PATH:\"" + path + "\"");
      if (results.length() == 0) {
          logger.debug("Zero matches for path: " + path);
          return null;
      }
      
      NodeRef nodeRef = results.getNodeRef(0);
      logger.debug("NodeRef for \"" + path + "\" is " + nodeRef);
      
      return nodeRef;
  } catch(Exception e) {
      logger.debug("Exception while searching for path: " + path, e);
      return null; // The node does not exist
  } finally {
      if (results != null) {
        results.close();
      }
  }
}
```
Use this method as in the following example:

```java
NodeRef someNodeRef = getNode("/app:company_home/app:shared/cm:abc/cm:def/cm:My_x0020_Document.txt");
```

> Note that this can also be achieved with the `NodeLocatorService`:
> ```java
> Map<String,Serializable> params = new HashMap<>();
> params.put("query", "/app:company_home/app:shared/cm:abc/cm:def/cm:My_x0020_Document.txt");
> NodeRef nodeRef = serviceRegistry.getNodeLocatorService().getNode("xpath",null,params);
> ```

If the search result is getting big you can use paging. There are two ways to query with the `SearchService` 
(excluding the `selectNodes`/`selectProperties` calls). One way is to specify all your arguments directly to the `query` 
method as seen above. This has the advantage of being concise, but the disadvantage is that you don't get all the options.
Alternately, you can query with a `SearchParameters` object. This lets you do everything the simple query does, and more. 
Included in that more are `setLimit`, `setSkipCount` and `setMaxItems`, which will allow you to do your paging.

If your query used to be something like:

```java
serviceRegistry.getSearchService().query(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE, SearchService.LANGUAGE_LUCENE, myQuery);
```

You would instead do something like this:

```java
SearchParameters sp = new SearchParameters();
sp.addStore(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE);
sp.setLanguage(SearchService.LANGUAGE_LUCENE);
sp.setQuery(myQuery);
sp.setMaxItems(100);
sp.setSkipCount(100);

// Execute query.
ResultSet resultSet = serviceRegistry.getSearchService().query(sp);

for (NodeRef result : resultSet.getNodeRefs()) {
    // Do stuff
}

resultSet.close();
```

Set up search params with unlimited results and sorting on `cm:modified` property (might not always be a good idea 
with unlimited result, unless you know approximately how many nodes will be the limit):

```java
SearchParameters sp = new SearchParameters();
sp.addStore(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE);
sp.setLanguage(SearchService.LANGUAGE_LUCENE); // Can be lucene, FTS, CMIS, etc.
sp.setQuery(myQuery);
sp.setMaxItems(Integer.MAX_VALUE);
sp.setMaxPermissionChecks(Integer.MAX_VALUE);
sp.addSort("@" + ContentModel.PROP_MODIFIED, false);

// Execute query.
ResultSet resultSet = serviceRegistry.getSearchService().query(sp);

for (NodeRef result : resultSet.getNodeRefs()) {
    // Do stuff
}

resultSet.close();
```

See also [Alfresco FTS reference]({% link search-services/latest/using/index.md %}).

## SiteService
The `SiteService` provides an API for managing [Share Sites]({% link content-services/7.2/using/sites/index.md %}). 

Creating a site is not possible with the `siteService.createSite` method, it only creates a site at the repository 
level, it does not create a fully functional site. To create a fully functional site use the 
[ReST API]({% link content-services/7.2/develop/rest-api-guide/sites.md %}#createsite).

Adding a site manager (member):

```java
String siteShortName = "my-test";
serviceRegistry.getSiteService().setMembership(siteShortName, "admin", SiteRole.SiteManager.toString());
```

Creating a folder/container in the site:

```java
String siteShortName = "my-test";
NodeRef documentLibraryNodeRef =  serviceRegistry.getSiteService().createContainer(
        siteShortName, SiteService.DOCUMENT_LIBRARY, null, null);
```

Get the Document Library folder/container of a site:

```java
String siteShortName = "my-test";
NodeRef documentLibrary = serviceRegistry.getSiteService().getContainer(siteShortName, SiteService.DOCUMENT_LIBRARY);
```

Get information about a site:

```java
String siteShortName = "my-test";
SiteInfo siteInfo = serviceRegistry.getSiteService().getSite(siteShortName);
String title = siteInfo.getTitle();
String description = siteInfo.getDescription();
SiteVisibility visibility = siteInfo.getVisibility();
Date created = siteInfo.getCreatedDate();
```
Get site information for the Share Site that contains the given `NodeRef`:

```java
NodeRef someFolderInSiteNodeRef = "node ref.......";
SiteInfo siteInfo = serviceRegistry.getSiteService().getSite(someFolderInSiteNodeRef);
```

## TaggingService
It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, 
and adding tags, and other tag management methods.

Tags are simple text labels that are attached to a piece of content. Each piece of content can have multiple tags. Folders 
also have a `TagScope` object which encapsulates information about the tags used on content in that folder. The `TagScope` 
object contains an array that lists Tags in count order. There are methods to find out how many times a particular tag 
is used.

Get tags applied to node:

```java
List<String> tags = serviceRegistry.getTaggingService().getTags(nodeRef);
```

## TemplateService
Provides an API for executing template engine against a template file and data model. The service provides a configured 
list of available template engines. The template file can either be in the repository (passed as `NodeRef` string) or on 
the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. 
The data model is specified to the template engine. The [FreeMarker](https://freemarker.apache.org/){:target="_blank"} 
template engine is used by default.

```java
// build the email template model
final Map<String, Object> model = createEmailTemplateModel(nodeRef);

// process the template against the model
text = serviceRegistry.getTemplateService().processTemplate("freemarker", templateRef.toString(), model);
```

## VersionService
Provides an API for managing file versions (i.e. content of type, or subtype, `cm:content`). Note that folders are not 
versionable.

Alfresco has a strong versioning story, which gives you the ability to version any file content stored in the repository, 
no matter what the file type. Versions are full files and not diffs of the files. Alfresco gives you the ability to have 
both major and minor versions of content. Versions can be created/updated by checkout/checkin, by rule, through any 
interface or through script/APIs.

If a content file has the aspect `cm:versionable` applied to it, then multiple versions of the file can be managed. 
The `VersionService` provides an API to allow you to do this programmatically: 

* `createVersion` - this creates a new version of the file, which is placed at the end of the appropriate version history. If the file has no version history then one is created and this version is considered to be the initial version.
* `getVersionHistory` - this gets the version history that relates to the file.
* `deleteVersionHistory` - this deletes the version history for a versioned file.
* `getCurrentVersion` - gets the current version for a file.
* `revert` - reverts the state of a file to that of a previous version.
* `restore` - restores a previously deleted file from a version in its version history.

Alfresco provides the ability to apply [behavior policies]({% link content-services/7.2/develop/repo-ext-points/behavior-policies.md %}) 
to content and metadata within the repository. You can think of these as event listeners, that allow you to take custom 
actions based on what is happening within the repository.

In the following example we are listening to the `afterCreateVersion` event, and when triggered we check if we have 
reached the maximum number of versions that we want to store. If we have, then we delete the last one (by default Alfresco 
has no limit of how many versions it stores):

```java
public class MaxVersionPolicy implements VersionServicePolicies.AfterCreateVersionPolicy {
    private static Log logger = LogFactory.getLog(MaxVersionPolicy.class);

    private ServiceRegistry serviceRegistry;
    private PolicyComponent policyComponent;
    private Behaviour afterCreateVersion;

    /**
     * Max number of versions we will store of a file in the repo
     */
    private int maxVersions;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) { this.serviceRegistry = serviceRegistry; }
    public void setPolicyComponent(PolicyComponent policyComponent) { this.policyComponent = policyComponent; }
    public void setMaxVersions(int maxVersions) {  this.maxVersions = maxVersions; }

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

```xml
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

## WorkflowService
Provides an interface to work with built in [workflows and tasks]({% link content-services/7.2/using/tasks.md %}). 
The [Activiti](https://www.activiti.org/){:target="_blank"} workflow engine is built into Content Services. You can 
create and manage workflows directly from your Dashboard. 

With the `WorkflowService`, you can create and manage these workflows programmatically. 

The default workflows out-of-the-box are: 

* New Task
* Assign a new task to yourself or a colleague
* Review and approve (group review)
* Assign a review task to a group
* Review and Approve (one or more reviewers)
* Assign a review task to multiple reviewers
* Review and Approve (pooled review)
* Assign a review task to multiple reviewers, who can take ownership of the task
* Review and Approve (single reviewer)
* Assign a review task to a single reviewer

An extensive example of using the Workflow API is provided in the 
[Alfresco source code](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/repo/workflow/WorkflowInterpreter.java){:target="_blank"}. 

>**Note.** To build your own custom workflows you need to use [Alfresco Process Services]({% link process-services/latest/index.md %}) 
