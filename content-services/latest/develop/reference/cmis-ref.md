---
title: CMIS API reference
---

The Content Management Interoperability Services (CMIS) is an OASIS standard that is useful when you want to build 
clients and services that work with different types of ECM systems in a standard way.

## Getting Started
To get you started with CMIS, review the format of the URL you will use, and what responses to expect.

>**Note:** If you are accessing an on-premise instance, the term **repository** means the same thing in Content Services and CMIS.

### The domain model
CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must 
have at least one repository. A repository, in this case an instance of Content Services, is a data store which contains 
content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has 
a set of capabilities which describe what optional CMIS functionality the repository supports.

Using the CMIS service endpoint in an HTTP Get call will return the endpoint's CMIS service document which describes the 
CMIS functionality it supports.

Each CMIS object has an ID, type, and a set of properties for that type. There are four base types for a CMIS object:

* **Document**: An item of content. The document can have a content stream, which is the actual file associated with the document. A content stream exists only as part of its containing document object. A content stream has a mimetype associated with it. A document object can contain one or more renditions, which are alternate views of the content. Documents objects are the only objects that are versionable. Each version of a document has its own object ID. All the versions of a document make up a version series and share a version series ID. You can create, read, update and delete documents using CMIS methods.
* **Folder**: A container used to organize the document objects. A repository has one root folder. All other folder objects have one parent folder. A folder has a folder path representing its place in the repository's folder hierarchy.
* **Relationship**: A relationship between a source object and a target object. Creating, changing and deleting relationships does not change the source or target objects themselves.
* **Policy**: An optional repository-specific object that can be applied to controllable objects. The behavior of policies are not modeled by the CMIS specification. A policy object can be applied to multiple controllable objects and a controllable object can have multiple policies applied to it. A policy object can not be deleted if it is currently applied to one or more controllable objects.

### What does a request look like?
You call a method on the CMIS ReST API by issuing an authenticated HTTP request with a URL.

The four HTTP methods are used to support the traditional Create, Read, Update, and Delete (CRUD) operations of 
content management:

* **POST**: is used to create a new entities
* **GET**: is used to retrieve information
* **PUT**: is used to update a single entity
* **DELETE**: is used to delete a single entity

#### Request URL format
Each request is a URL with a specific format. The format is dependent on the type of target repository.

For an on-premise Content Services repository it looks as follows.

This is an example of a request URL for CMIS 1.1:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

This is an example of a request URL for CMIS 1.0:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.0/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

Each request URL is made up of the following elements:

1. The protocol, which can be `http` or `https`.
2. The hostname. This will be the host and port number of your alfresco instance. So if your Alfresco instance is running on the local machine on port 8080 this will be `localhost:8080`.
3. The fixed string `-default-`.
4. The API you want to call. In this case it is the public Alfresco CMIS API identified as `/public/cmis`.
5. `/versions/n`. This specifies the version of the CMIS API you are using. `1.1` or `1.0`.
6. The CMIS binding. Alfresco supports the `atom` binding for the CMIS 1.0 protocol, and both the `atom` and `browser` bindings for the CMIS 1.1 protocol.
7. The CMIS method itself. In this case the request is to get the content of a CMIS document with a specific id.

### CMIS configuration settings
It is possible to configure the way that CMIS requests are processed by adding property settings in the 
`alfresco-global.properties` file.

#### Change the default file limit
The default limit for the length of a file to upload is 4GB (4096MB).

To change this limit, for example to 5GB (5120MB), add the following property:

```text
opencmis.maxContentSizeMB=5120
```

To ignore the size check, use the following property setting:

```text
opencmis.maxContentSizeMB=-1
```

#### Change the memory threshold
The default threshold for memory is 4MB (4096KB). This sets the size threshold for content kept in memory. Documents 
bigger than this threshold will be cached in a temporary directory.

To change threshold, for example to 5MB (5120KB), add the following property:

```text
opencmis.memoryThresholdKB=5120
```

To ignore the memory threshold, use the following property setting:

```text
opencmis.memoryThresholdKB=-1
```

### Getting the service document
The capabilities available to your application from an instance of an on-premise Content Services are described in an 
AtomPub document returned when calling the base URL. The service document contains information on the repository, 
the CMIS methods that can be called on it, and the parameters for those methods.

#### Getting the service document for an on-premise repository
To retrieve the service document use the HTTP GET method with this URL:

```text
https://localhost:8080/alfresco/api/cmis/versions/1.1/atom/
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way.

#### Getting the service document for a specific network
To retrieve the service document for a specific network that the current authenticated user is a member of, use the 
HTTP GET method with a URL that specifies the network. For example this URL returns the service document for 
the `yourcompany.com` network.

```text
https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the 
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html){:target="_blank"} for more details.

### Getting information on a node
You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document 
describes the node. You can tailor the information returned by providing HTML parameters.

Here is an example of a URL to retrieve information on a specific node in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/id?id=5dba1525-44a6-45ed-a42e-4a155a3f0539
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the 
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html){:target="_blank"} for more details.

You can add the following **optional** HTTP parameters to the URL:

|Parameter|Default value|Description|
|---------|-------------|-----------|
|filter|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|includeAllowableActions|`false`|A boolean value. A value of `true` specifies that the repository must return the allowable actions for the node.|
|includeRelationships|`IncludeRelationships.NONE`|The relationships in which the node participates that must be returned in the response.|
|renditionFilter|`cmis:none`|A filter describing the set of renditions that must be returned in the response.|
|includePolicyIds|`false`|A boolean value. A value of `true` specifies the repository must return the policy ids for the node.|
|includeAcl|`false`|A boolean value. A value of `true` specifies the repository must return the Access Control List (ACL) for the node.|

### Getting the children of a node
You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document 
describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this 
method to navigate a folder tree in the repository.

Here is an example of a URL to retrieve the children of a specific node in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/children?id=5dba1525-44a6-45ed-a42e-4a1a1a3f0539
```

The response body is an AtomPub XML document which describes the child nodes in a standard way. See the 
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html){:target="_blank"} for more details.

You can add the following optional HTTP parameters to the URL:

|Parameter|Default value|Description|
|---------|-------------|-----------|
|filter|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|orderBy|Repository specific|A comma-separated list of query names that defines the order of the results set. Each query name in the list must be followed by the string `ASC` or `DESC` to specify the direction of the order, ascending or descending.|
|includeAllowableActions|`false`|A boolean value. A value of `true` specifies that the repository must return the allowable actions for each node.|
|includeRelationships|`IncludeRelationships.NONE`|The relationships in which each node participates that must be returned in the response.|
|renditionFilter|`cmis:none`|A filter describing the set of renditions that must be returned in the response.|
|includePathSegment|`false`|A boolean value. A value of `true` returns a path segment in the response for each child object that can be used to construct that object's path.|
|maxItems|Repository specific|The maximum number of items to return in the response.|
|skipCount|`0`|The number of objects to skip over before returning any results.|

### Getting the contents of a document
You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the 
parameters that you can use are detailed in the service document.

Here is an example of a URL to retrieve the contents of a specific document in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The response body is the content of the document. The format is specific to the type of content, so for example, 
getting the contents of a text document returns a text response body.

### Updating the contents of a document
You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the 
parameters that you can use are detailed in the service document.

Here is an example of a URL to update the contents of a specific document in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The request `Content-Type` must be of the same mime-type as the target document. In this example, we are updating a 
plain text document.

```text
Content-Type: text/plain; charset=utf-8
```

The request body is the new content of the document.

```text
Some updated text.
```

If the request is successful an `HTTP CREATED` response (status 201) is returned.

## Working with the CMIS API from Java
The [Apache Chemistry](https://chemistry.apache.org){:target="_blank"} project provides a Java API called OpenCMIS that 
wraps the CMIS ReST API. It contains a number of libraries that abstract the CMIS low-level protocol bindings. 
[OpenCMIS](https://chemistry.apache.org/java/opencmis.html){:target="_blank"} is the library used by Java developers. 
It provides an abstraction layer on top of all the CMIS protocol bindings, the AtomPub binding, the Web Service binding, 
and the Browser binding.

To use the OpenCMIS library, we need to first configure it in the Maven POM file's dependency section, open the `pom.xml` 
file in your Maven Java project, and add the following (check that you are using the latest version of the library):

```xml
<project ...
    <dependencies>
        ...
        <!-- Bring in the OpenCMIS library for talking to CMIS servers -->
        <dependency>
            <groupId>org.apache.chemistry.opencmis</groupId>
            <artifactId>chemistry-opencmis-client-impl</artifactId>
            <version>1.1.0</version>
        </dependency>
    </dependencies>
</project> 
```

Before we start working with the repository we must create a session and connect to it. In your CMIS client class, such 
as `CmisClient`, add the following Hash map that will contain active sessions:

```java
public class CmisClient {
    private static Map<String, Session> connections = new ConcurrentHashMap<String, Session>();
    public CmisClient() { }
}
```

The `Session` interface is from the `org.apache.chemistry.opencmis.client.api` package in the OpenCMIS library. 
It represents a session/connection for a specific user with the CMIS repository. A session holds the configuration 
settings and cache settings to use across multiple calls to the repository. The session is also the entry point to 
perform all operations on the repository, such as listing folders, creating documents and folders, finding out the 
capabilities of the repository, and searching.

To create a new connection with the repository, use the Session Factory interface and query it for all the available 
repositories, and then create a new session for one of them. We will create a new `getSession` method in the `CmisClient` 
class to do the job as follows:

```java
public Session getSession(String connectionName, String username, String pwd) {
	Session session = connections.get(connectionName);

	if (session == null) {
		System.out.println("Not connected, creating new connection to" +
				" Alfresco with the connection id (" + connectionName +	")");
			
		// No connection to Alfresco available, create a new one
		SessionFactory sessionFactory =	SessionFactoryImpl.newInstance();
		Map<String, String> parameters = new HashMap<String, String>();
		parameters.put(SessionParameter.USER, username);
		parameters.put(SessionParameter.PASSWORD, pwd);
		parameters.put(SessionParameter.ATOMPUB_URL, "http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom");
		parameters.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
		parameters.put(SessionParameter.COMPRESSION, "true");
		parameters.put(SessionParameter.CACHE_TTL_OBJECTS, "0");
			
		// If there is only one repository exposed (e.g. Alfresco),
		// these lines will help detect it and its ID
		List<Repository> repositories = sessionFactory.getRepositories(parameters);
		Repository alfrescoRepository = null;
		if (repositories != null && repositories.size() > 0) {
			System.out.println("Found (" + repositories.size() + ") Alfresco repositories");
			alfrescoRepository = repositories.get(0);
			System.out.println("Info about the first Alfresco repo [ID=" +
					alfrescoRepository.getId() + "][name=" +
					alfrescoRepository.getName() + "][CMIS ver supported=" +
					alfrescoRepository.getCmisVersionSupported() + "]");
		} else {
			throw new CmisConnectionException("Could not connect to the Alfresco Server, " +
							"no repository found!");
		}
			
		// Create a new session with the Alfresco repository
		session = alfrescoRepository.createSession();
			
		// Save connection for reuse
		connections.put(connectionName, session);
	} else {
		System.out.println("Already connected to Alfresco with the " +
				"connection id (" + connectionName + ")");
	}
		
	return session;
}
```

This method starts off by checking if the Hash map already has a connection available for the connection identifier 
passed in. We don't want to create a new connection for every call that we do to the repository. If there is no connection, 
we will use the `SessionFactoryImpl` class to create a new `SessionFactory` interface, which we can use to get a list of 
repositories for the CMIS server.

A CMIS server can provide more than one repository, so we need to tell the server about which one we want to talk to. 
This is usually done by passing in a repository ID. All OpenCMIS operations require a repository ID parameter. However, 
there is one operation named `getRepositories` that doesn't, so it is used to get a list of the available repositories. 
When the repository information is fetched from the server, we pass in a map of configuration parameters that tells 
OpenCMIS what username and password to use to connect to the CMIS server, what protocol binding to use underneath OpenCMIS, 
and so on.

We are connecting to Content Services, and it only provides one repository, so we can grab the first `Repository` object 
in the repositories list and use it to create a session/connection. The `Repository` object provides information about 
the repository, such as its ID, name, and the version of CMIS it supports. In case of Alfresco, the ID is `-default-`, 
and if running with the older AtomPub URL, it will be a universally unique identifier (UUID) that looks something like 
`f0ebcfb4-ca9f-4991-bda8-9465f4f11527`.

Now add the following code to the `main()` method in your project:

```java
public static void main(String[] args) {
    CmisClient cmisClient = new CmisClient();
    String connectionName = "martinAlf01";
    Session session = cmisClient.getSession(connectionName, "admin", "admin");
}
```

Now that we have a connection/session to the Alfresco server it's time to start calling different CMIS endoints from Java.

One of the first things we might want to do is to get a list of all the content in the top folder in the repository, 
referred to as **/Company Home** in Alfresco. The top folder is referred to as the root folder in CMIS. To get the root 
folder and then a listing of its content, add the following code in a new method named `listTopFolder`:

```java
public void listTopFolder(Session session) {
	Folder root = session.getRootFolder();
	ItemIterable<CmisObject> contentItems= root.getChildren();
	for (CmisObject contentItem : contentItems) {
		if (contentItem instanceof Document) {
			Document docMetadata = (Document)contentItem;
			ContentStream docContent = docMetadata.getContentStream();
				
			System.out.println(docMetadata.getName() + " [size=" +
					docContent.getLength()+"][Mimetype=" +
					docContent.getMimeType()+"][type=" +
					docMetadata.getType().getDisplayName()+"]");
		} else {
			System.out.println(contentItem.getName() + "[type="+contentItem.getType().getDisplayName()+"]");
		}
	}
}
```

Now we probably want to create content. Let's start by creating a folder, which is easy, just get a `Folder` object for 
the parent folder in which you want to create a new folder and then use the `createFolder` method on the parent folder 
object as in the following code:

```java
public Folder createFolder(Session session) {
	String folderName = "OpenCMISTest";
	Folder parentFolder = session.getRootFolder();
	
	// Make sure the user is allowed to create a folder
	// under the root folder
	if (parentFolder.getAllowableActions().getAllowableActions().
			contains(Action.CAN_CREATE_FOLDER) == false) {
		throw new CmisUnauthorizedException(
				"Current user does not have permission to create a " +
				"sub-folder in " + parentFolder.getPath());
	}
		
	// Check if folder already exist, if not create it
	Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
	if (newFolder == null) {
		Map<String, Object> newFolderProps = new HashMap<String, Object>();
		newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		newFolderProps.put(PropertyIds.NAME, folderName);
		newFolder = parentFolder.createFolder(newFolderProps);
		System.out.println("Created new folder: " + newFolder.getPath() +
				" [creator=" + newFolder.getCreatedBy() + "][created=" +
				date2String(newFolder.getCreationDate().getTime()) + "]");
	} else {
		System.out.println("Folder already exist: " + newFolder.getPath());
	}
	
       return newFolder;
}
```

Here we are creating the new folder under the root folder, which is represented by the **/** path, and is the same as 
**/Company Home** in Alfresco. Before we go ahead and create the folder, we first check if the current user is authorized 
to create a subfolder under the root folder. We can do this by getting the allowed actions on the root folder. 
If they contain the `canCreateFolder` action, we can go ahead and create the folder. If not, then we throw an unauthorized 
runtime exception that will stop execution. This is actually the same exception that will be thrown by the OpenCMIS library 
if we do not check anything before creating the folder with an unauthorized user.

When we know we are allowed to create a folder, we call a custom method named `getObject`, which we will define in a second. 
This method will return a `Folder` object if it can find it, or null if it can't. If the folder was not found, it will be 
created via the `createFolder` method.

The `createFolder` method takes a map of metadata that should be set for the new folder. The name and type of the folder 
are mandatory properties, so this is the minimum metadata we can use to create a folder.

The `createFolder` method returns a new CMIS object that represents the newly created folder, which we can use in future 
methods to create documents in it and to log some information about the new folder.

Before we can run the code, we need to implement the `getObject` method as follows:

```java
private CmisObject getObject(Session session, Folder parentFolder, String objectName) {
	CmisObject object = null;
	try {
		String path2Object = parentFolder.getPath();
		if (!path2Object.endsWith("/")) {
			path2Object += "/";
		}
		path2Object += objectName;
		object = session.getObjectByPath(path2Object);
	} catch (CmisObjectNotFoundException nfe0) {
		// Nothing to do, object does not exist
	}

	return object;
}
```

The `getObject` method is quite useful as it can be used to, in an easy way, get a CMIS object, such as a `Folder` or 
a `Document`.

There is also the `date2String` convenience method that we used to format the date, it's implemented as follows and used 
when printing date properties:

```java
private String date2String(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").format(date);
}
```

After creating some folders, we probably want to create or upload documents to them. Creating a document, or file if you 
like, is almost the same as creating a folder. However, a document object can also contain content bytes in the form of 
a so-called content stream that represents the physical bytes of the file.

So, to create a document object with content, we first create a content stream object and then use that object when 
creating the document object as follows:

```java
public Document createDocument(Session session, Folder parentFolder)
			throws IOException {
	String documentName = "OpenCMISTest.txt";

	// Make sure the user is allowed to create a document
	// in the passed in folder
	if (parentFolder.getAllowableActions().getAllowableActions().
			contains(Action.CAN_CREATE_DOCUMENT) == false) {
		throw new CmisUnauthorizedException("Current user does not "+
				"have permission to create a document in " +
				parentFolder.getPath());
	}

	// Check if document already exist, if not create it
	Document newDocument = (Document) getObject(session, parentFolder, documentName);
	if (newDocument == null) {
		// Setup document metadata
		Map<String, Object> newDocumentProps =
				new HashMap<String, Object>();
		newDocumentProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:document");
		newDocumentProps.put(PropertyIds.NAME, documentName);

		// Setup document content
		String mimetype = "text/plain; charset=UTF-8";
		String documentText = "This is a test document!";
		byte[] bytes = documentText.getBytes("UTF-8");
		ByteArrayInputStream input = new ByteArrayInputStream(bytes);
		ContentStream contentStream = session.getObjectFactory().createContentStream(
						documentName, bytes.length, mimetype, input);

		// Create versioned document object
		newDocument = parentFolder.createDocument(
				newDocumentProps, contentStream, VersioningState.MAJOR);
	
       	System.out.println("Created new document: " +
				getDocumentPath(newDocument) + " [version=" +
				newDocument.getVersionLabel() + "][creator=" +
				newDocument.getCreatedBy() + "][created=" +
				date2String(newDocument.getCreationDate().getTime())+"]");
	} else {
		System.out.println("Document already exist: " + getDocumentPath(newDocument));
	}
	
       return newDocument;
}
```

The new document should be created in the **OpenCMISTest** folder. To do this, we feed the folder reference into the 
`createDocument` method as follows:

```java
Folder folder = cmisClient.createFolder(session);
Document document = cmisClient.createDocument(session, folder);
```

The following code implements the custom `getDocumentPath` method used above. It's handy in a lot of situations to get 
the absolute repository path for a document::

```java
private String getDocumentPath(Document document) {
       String path2Doc = getParentFolderPath(document);
       if (!path2Doc.endsWith("/")) {
              path2Doc += "/";
       }
 
       path2Doc += document.getName();
         
       return path2Doc;
}
```

What this method does is call another custom method named `getParentFolderPath` to get the path for the parent folder 
of the document object passed in. When it has this path, it checks if it ends in **/**, if not, it adds **/** 
(if it is the root folder, it will end in slash as it is represented by `/`). To complete the full path for the document, 
it then adds the name of the document to the parent folder path and returns the result. The `getParentFolderPath` method 
is implemented as follows:

```java
private String getParentFolderPath(Document document) {
      Folder parentFolder = getDocumentParentFolder(document);
      return parentFolder == null ? "Un-filed" : parentFolder.getPath();
}
```

This code just calls another custom method named `getDocumentParentFolder` to get the parent `Folder` object for the 
passed in `Document` object. It then checks if it is `null`, which means that the document has not been filed/contained 
in any folder and is in a state called `unfiled`. If we have a parent folder object, we just return the absolute repository 
path for it.

The `getDocumentParentFolder` custom method is implemented as follows:

```java
private Folder getDocumentParentFolder(Document document) {
	// Get all the parent folders (could be more than one if multi-filed)
	List<Folder> parentFolders = document.getParents();
	// Grab the first parent folder
	if (parentFolders.size() > 0) {
		if (parentFolders.size() > 1) {
			System.out.println("The " + document.getName() +
					" has more than one parent folder, it is multi-filed");
		}

		return parentFolders.get(0);
	} else {
		System.out.println("Document " + document.getName() +
				" is un-filed and does not have a parent folder");

		return null;
	}
}
```

A document can have multiple folders as parents (that is, `multifiled`), so we start out by finding out what parents the 
document have by calling `getParents` on it. Then we grab the first parent in the list assuming that most document 
objects will only be filed/contained in one folder. If it is `multifiled`, we print out a message about that. If no 
parent folders could be found for the document, then it is `unfiled` and `null` is returned as the document does not 
have a parent folder.

This was a short introduction to working with OpenCMIS Java CMIS API. There are multiple books covering OpenCMIS and 
if you are going to work extensively with this API get one of those.

If you are wondering about how to work with Alfresco aspects using OpenCMIS see [next section](#workingwithaspects).

### Working with Alfresco aspects from OpenCMIS {#workingwithaspects}

#### Adding aspects to a document or folder
#### Removing aspects from a document or folder

### Using the CMIS Workbench with Alfresco