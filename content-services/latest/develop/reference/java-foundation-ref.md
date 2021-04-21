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
This service gives you access to the [Content Model]({% link content-services/latest/develop/repo-ext-points/content-model.md %}) 
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
code is executed inside a [Web Script]({% link content-services/latest/develop/repo-ext-points/web-scripts.md %}) so it 
will automatically be part of a transaction using the `RetryingTransactionHelper`, same thing if the code was executed 
from a [Repository Action]({% link content-services/latest/develop/repo-ext-points/repo-actions.md %}).

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

See also the [Scheduled Jobs extension point]({% link content-services/latest/develop/repo-ext-points/scheduled-jobs.md %})

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

The following example uses a [Web Script]({% link content-services/latest/develop/repo-ext-points/web-scripts.md %}) 
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

