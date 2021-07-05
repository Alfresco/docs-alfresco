---
title: CMIS API (OASIS ReST Standard)
---

Provides CMIS API information.

The Content Management Interoperability Services (CMIS) is an OASIS standard that is useful when you want to build clients and services that work with different types of ECM systems in a standard way.

-   **[Getting Started](#getting-started)**  
To get you started with CMIS, review the format of the URL you will use, and what responses to expect.
-   **[Working with the CMIS API from Java](#working-with-the-cmis-api-from-java)**  
The Apache Chemistry project provides a Java API called OpenCMIS that wraps the CMIS ReST API.

## Getting Started {#getting-started}

To get you started with CMIS, review the format of the URL you will use, and what responses to expect.

> **Note:** If you are accessing an on-premises instance, the term **repository** means the same thing in Alfresco Content Services and CMIS.

-   **[The domain model](#the-domain-model)**  
CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must have at least one repository. A repository, in this case an instance of Alfresco, is a data store which contains content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has a set of capabilities which describe what optional CMIS functionality the repository supports.
-   **[What does a request look like?](#what-does-a-request-look-like?)**  
You call a method on the CMIS AtomPub REST API by issuing an authenticated HTTP request with a URL.
-   **[CMIS configuration settings](#cmis-configuration-settings)**  
It is possible to configure the way that CMIS requests are processed by adding property settings in the `alfresco-global.properties` file.
-   **[Getting the service document](#getting-the-service-document)**  
The capabilities available to your application from an instance of on-premises Alfresco Content Services are described in a an AtomPub document returned when calling the base URL. The service document contains information on the repository, the CMIS methods that can be called on it, and the parameters for those methods.
-   **[Getting information on a node](#getting-information-on-a-node)**  
You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document describes the node. You can tailor the information returned by providing HTML parameters.
-   **[Getting the children of a node](#getting-the-children-of-a-node)**  
You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this method to navigate a folder tree in the repository.
-   **[Getting the contents of a document](#getting-the-contents-of-a-document)**  
You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.
-   **[Updating the contents of a document](#updating-the-contents-of-a-document)**  
You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

## The domain model {#the-domain-model}

CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must have at least one repository. A repository, in this case an instance of Alfresco, is a data store which contains content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has a set of capabilities which describe what optional CMIS functionality the repository supports.

Using the CMIS service endpoint in an HTTP Get call will return the endpoint's CMIS service document which describes the CMIS functionality it supports.

Each CMIS object has an ID, type, and a set of properties for that type. There are four base types for a CMIS object:

-   **Document**

    An item of content. The document can have a content stream, which is the actual file associated with the document. A content stream exists only as part of its containing document object. A content stream has a mimetype associated with it. A document object can contain one or more renditions, which are alternate views of the content. Documents objects are the only objects that are versionable. Each version of a document has its own object ID. All the versions of a document make up a version series and share a version series ID. You can create, read, update and delete documents using CMIS methods.

-   **Folder**

    A container used to organize the document objects. A repository has one root folder. All other folder objects have one parent folder. A folder has a folder path representing its place in the repository's folder hierarchy.

-   **Relationship**

    A relationship between a source object and a target object. Creating, changing and deleting relationships does not change the source or target objects themselves.

-   **Policy**

    An optional repository-specific object that can be applied to controllable objects. The behavior of policies are not modeled by the CMIS specification. A policy object can be applied to multiple controllable objects and a controllable object can have multiple policies applied to it. A policy object can not be deleted if it is currently applied to one or more controllable objects.


## What does a request look like? {#what-does-a-request-look-like}

You call a method on the CMIS AtomPub REST API by issuing an authenticated HTTP request with a URL.

The four HTTP methods are used to support the traditional Create, Read, Update, and Delete (CRUD) operations of content management:

-   **POST**

    is used to create a new entities

-   **GET**

    is used to retrieve information

-   **PUT**

    is used to update a single entity

-   **DELETE**

    is used to delete a single entity


-   **[Request URL format](#request-url-format)**  
Each request is a URL with a specific format. The format is dependent on the type of target repository.

## Request URL format {#request-url-format}

Each request is a URL with a specific format. The format is dependent on the type of target repository.

-   **[Request URL format for on-premise Alfresco Content Services](#request-url-format-for-on-premise-alfresco-content-services)**  
Each request to an Alfresco Content Services on-premises repository is a URL with a specific format.


## Request URL format for on-premises Alfresco Content Services {#request-url-format-for-on-premise-alfresco-content-services}

Each request to an Alfresco Content Services on-premises repository is a URL with a specific format.

This is an example of a request URL for CMIS 1.1:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

This is an example of a request URL for CMIS 1.0:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.0/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

Each request URL is made up of the following elements:

1.  The protocol, which can be `http` or `https`.
2.  The hostname. This will be the host and port number of your alfresco instance. So if your Alfresco instance is running on the local machine on port 8080 this will be `localhost:8080`.
3.  The fixed string `-default-`.
4.  The API you want to call. In this case it is the public Alfresco CMIS API identified as `/public/cmis`.
5.  `/versions/n`. This specifies the version of the CMIS API you are using. `1.1` or `1.0`.
6.  The CMIS binding. Alfresco supports the `atom` binding for the CMIS 1.0 protocol, and both the `atom` and `browser` bindings for the CMIS 1.1 protocol.
7.  The CMIS method itself. In this case the request is to get the content of a CMIS document with a specific id.

## CMIS configuration settings {#cmis-configuration-settings}

It is possible to configure the way that CMIS requests are processed by adding property settings in the `alfresco-global.properties` file.

**Change the default file limit**

The default limit for the length of a file to upload is 4GB (4096MB).

To change this limit, for example to 5GB (5120MB), add the following property in `alfresco-global.properties` file:

```
opencmis.maxContentSizeMB=5120
```

To ignore the size check, use the following property setting:

```
opencmis.maxContentSizeMB=-1
```

**Change the memory threshold**

The default threshold for memory is 4MB (4096KB). This sets the size threshold for content kept in memory. Documents bigger than this threshold will be cached in a temporary directory.

To change threshold, for example to 5MB (5120KB), add the following property in `alfresco-global.properties` file:

```
opencmis.memoryThresholdKB=5120
```

To ignore the memory threshold, use the following property setting:

```
opencmis.memoryThresholdKB=-1
```

## Getting the service document {#getting-the-service-document}

The capabilities available to your application from an instance of on-premises Alfresco Content Services are described in a an AtomPub document returned when calling the base URL. The service document contains information on the repository, the CMIS methods that can be called on it, and the parameters for those methods.

### Getting the service document for an on-premises repository

To retrieve the service document use the HTTP GET method with this URL:

```

   https://localhost:8080/alfresco/api/cmis/versions/1.1/atom/
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way.

### Getting the service document for a specific network

To retrieve the service document for a specific network that the current authenticated user is a member of, use the HTTP GET method with a URL that specifies the network. For example this URL returns the service document for the `yourcompany.com` network.

```
   https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html) for more details.

## Getting information on a node {#getting-information-on-a-node}

You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document describes the node. You can tailor the information returned by providing HTML parameters.

### URL format

Here is an example of a URL to retrieve information on a specific node in an Alfresco Content Services on-premises instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/id?id=5dba1525-44a6-45ed-a42e-4a155a3f0539
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html) for more details.

### Parameters

You can add the following optional HTTP parameters to the URL:

|Parameter|Optional?|Default value|Description|
|---------|---------|-------------|-----------|
|filter|Yes|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|includeAllowableActions|Yes|false|A boolean value. A value of `true` specifies that the repository must return the allowable actions for the node.|
|includeRelationships|Yes|IncludeRelationships.NONE|The relationships in which the node participates that must be returned in the response.|
|renditionFilter|Yes|cmis:none|A filter describing the set of renditions that must be returned in the response.|
|includePolicyIds|Yes|false|A boolean value. A value of `true` specifies the repository must return the policy ids for the node.|
|includeAcl|Yes|false|A boolean value. A value of `true` specifies the repository must return the Access Control List (ACL) for the node.|

## Getting the children of a node {#getting-the-children-of-a-node}

You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this method to navigate a folder tree in the repository.

### URL format

Here is an example of a URL to retrieve the children of a specific node in an Alfresco on-premises instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/children?id=5dba1525-44a6-45ed-a42e-4a1a1a3f0539
```

The response body is an AtomPub XML document which describes the child nodes in a standard way. See the [CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html) for more details.

### Parameters

You can add the following optional HTTP parameters to the URL:

|Parameter|Optional?|Default value|Description|
|---------|---------|-------------|-----------|
|filter|Yes|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|orderBy|Yes|Repository specific|A comma-separated list of query names that defines the order of the results set. Each query name in the list must be followed by the string `ASC` or `DESC` to specify the direction of the order, ascending or descending.|
|includeAllowableActions|Yes|false|A boolean value. A value of `true` specifies that the repository must return the allowable actions for each node.|
|includeRelationships|Yes|IncludeRelationships.NONE|The relationships in which each node participates that must be returned in the response.|
|renditionFilter|Yes|cmis:none|A filter describing the set of renditions that must be returned in the response.|
|includePathSegment|Yes|false|A boolean value. A value of `true` returns a path segment in the response for each child object that can be used to construct that object's path.|
|maxItems|Yes|Repository specific|The maximum number of items to return in the response.|
|skipCount|Yes|0|The number of objects to skip over before returning any results.|

## Getting the contents of a document {#getting-the-contents-of-a-document}

You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

### URL format

Here is an example of a URL to retrieve the contents of a specific document in an Alfresco Content Services on-premises instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The response body is the content of the document. The format is specific to the type of content, so for example, getting the contents of a text document returns a text response body.

## Updating the contents of a document {#updating-the-contents-of-a-document}

You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the parameters that you can use are detailed in the service document.

### URL format

Here is an example of a URL to update the contents of a specific document in an Alfresco Content Services on-premises instance:

```
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

### Request Header

The request Content-Type must be of the same mime-type as the target document. In this example, we are updating a plain text document.

```
Content-Type: text/plain; charset=utf-8
```

### Request body

The request body is the new content of the document.

```
Some updated text.
```

### Response

If the request is successful an HTTP CREATED response (status 201) is returned.

## Working with the CMIS API from Java {#working-with-the-cmis-api-from-java}

The Apache Chemistry project provides a Java API called OpenCMIS that wraps the CMIS ReST API.

The [Apache Chemistry](https://chemistry.apache.org) project contains a number of libraries that abstract the CMIS low-level protocol bindings. [OpenCMIS](https://chemistry.apache.org/java/opencmis.html) is the library used by Java developers. It provides an abstraction layer on top of all the CMIS protocol bindings, the AtomPub binding, the Web Service binding, and the Browser binding.

To use the OpenCMIS library, we need to first configure it in the Maven POM file's dependency section, open the pom.xml file in your Maven Java project, and add the following (check that you are using latest version of the library):

```
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

Before we start working with the repository we must create a session and connect to it. In your CMIS client class, such as `CmisClient`, add the following Hash map that will contain active sessions:

```
public class CmisClient {
    private static Map<String, Session> connections = new ConcurrentHashMap<String, Session>();
    public CmisClient() { }
}
```

The `Session` interface is from the `org.apache.chemistry.opencmis.client.api` package in the OpenCMIS library. It represents a session/connection for a specific user with the CMIS repository. A session holds the configuration settings and cache settings to use across multiple calls to the repository. The session is also the entry point to perform all operations on the repository, such as listing folders, creating documents and folders, finding out the capabilities of the repository, and searching.

To create a new connection with the repository, use the Session Factory interface and query it for all the available repositories, and then create a new session for one of them. We will create a new `getSession` method in the `CmisClient` class to do the job as follows:

```
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

This method starts off by checking if the Hash map already has a connection available for the connection identifier passed in. We don't want to create a new connection for every call that we do to the repository. If there is no connection, we will use the `SessionFactoryImpl` class to create a new `SessionFactory` interface, which we can use to get a list of repositories for the CMIS server.

A CMIS server can provide more than one repository, so we need to tell the server about which one we want to talk to. This is usually done by passing in a repository ID. All OpenCMIS operations require a repository ID parameter. However, there is one operation named `getRepositories` that doesn't, so it is used to get a list of the available repositories. When the repository information is fetched from the server, we pass in a map of configuration parameters that tells OpenCMIS what username and password to use to connect to the CMIS server, what protocol binding to use underneath OpenCMIS, and so on.

We are connecting to Alfresco and it only provides one repository, so we can grab the first `Repository` object in the repositories list and use it to create a session/ connection. The `Repository` object provides information about the repository, such as its ID, name, and the version of CMIS it supports. In case of Alfresco, the ID is `-default-`, and if running with the older AtomPub URL, it will be a universally unique identifier (UUID) that looks something like `f0ebcfb4-ca9f-4991-bda8-9465f4f11527`.

Now add the following code to the `main()` method in your project:

```
public static void main(String[] args) {
    CmisClient cmisClient = new CmisClient();
    String connectionName = "martinAlf01";
    Session session = cmisClient.getSession(connectionName, "admin", "admin");
}
```

Now that we have a connection/session to the Alfresco server it's time to start calling different CMIS endoints from Java.

One of the first things we might want to do is to get a list of all the content in the top folder in the repository, referred to as **/Company Home** in Alfresco. The top folder is referred to as the root folder in CMIS. To get the root folder and then a listing of its content, add the following code in a new method named `listTopFolder`:

```
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

Now we probably want to create content. Let's start by creating a folder, which is easy, just get a `Folder` object for the parent folder in which you want to create a new folder and then use the `createFolder` method on the parent folder object as in the following code:

```
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

Here we are creating the new folder under the root folder, which is represented by the **/** path, and is the same as **/Company Home** in Alfresco. Before we go ahead and create the folder, we first check if the current user is authorized to create a subfolder under the root folder. We can do this by getting the allowed actions on the root folder. If they contain the `canCreateFolder` action, we can go ahead and create the folder. If not, then we throw an unauthorized runtime exception that will stop execution. This is actually the same exception that will be thrown by the OpenCMIS library if we do not check anything before creating the folder with an unauthorized user.

When we know we are allowed to create a folder, we call a custom method named `getObject`, which we will define in a second. This method will return a `Folder` object if it can find it, or null if it can't. If the folder was not found, it will be created via the `createFolder` method.

The `createFolder` method takes a map of metadata that should be set for the new folder. The name and type of the folder are mandatory properties, so this is the minimum metadata we can use to create a folder.

The `createFolder` method returns a new CMIS object that represents the newly created folder, which we can use in future methods to create documents in it and to log some information about the new folder.

Before we can run the code, we need to implement the `getObject` method as follows:

```
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

The `getObject` method is quite useful as it can be used to, in an easy way, get a CMIS object, such as a `Folder` or a `Document`.

There is also the `date2String` conveniance method that we used to format the date, it's implemented as follows and used when printing date properties:

```
private String date2String(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").format(date);
}
```

After creating some folders, we probably want to create or upload documents to them. Creating a document, or file if you like, is almost the same as creating a folder. However, a document object can also contain content bytes in the form of a so-called content stream that represents the physical bytes of the file.

So, to create a document object with content, we first create a content stream object and then use that object when creating the document object as follows:

```
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

The new document should be created in the **OpenCMISTest** folder. To do this, we feed the folder reference into the `createDocument` method as follows:

```
Folder folder = cmisClient.createFolder(session);
Document document = cmisClient.createDocument(session, folder);
```

The following code implements the custom `getDocumentPath` method used above. It's handy in a lot of situtions to get the absolute repository path for a document::

```
private String getDocumentPath(Document document) {
       String path2Doc = getParentFolderPath(document);
       if (!path2Doc.endsWith("/")) {
              path2Doc += "/";
       }
 
       path2Doc += document.getName();
         
       return path2Doc;
}
```

What this method does is call another custom method named `getParentFolderPath` to get the path for the parent folder of the document object passed in. When it has this path, it checks if it ends in **/**, if not, it adds **/** (if it is the root folder, it will end in slash as it is represented by /). To complete the full path for the document, it then adds the name of the document to the parent folder path and returns the result. The `getParentFolderPath` method is implemented as follows:

```
private String getParentFolderPath(Document document) {
      Folder parentFolder = getDocumentParentFolder(document);
      return parentFolder == null ? "Un-filed" : parentFolder.getPath();
}
```

This code just calls another custom method named `getDocumentParentFolder` to get the parent `Folder` object for the passed in `Document` object. It then checks if it is `null`, which means that the document has not been filed/contained in any folder and is in a state called *unfiled*. If we have a parent folder object, we just return the absolute repository path for it.

The `getDocumentParentFolder` custom method is implemented as follows:

```
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

A document can have multiple folders as parents (that is, multifiled), so we start out by finding out what parents the document have by calling `getParents` on it. Then we grab the first parent in the list assuming that most document objects will only be filed/contained in one folder. If it is multifiled, we print out a message about that. If no parent folders could be found for the document, then it is unfiled and `null` is returned as the document does not have a parent folder.

This was a short introduction to working with OpenCMIS Java CMIS API. There are multiple books covering OpenCMIS and if you are going to work extensivly with this API get one of those.

If you are wondering about how to work with Alfresco aspects using OpenCMIS see [this](#working-with-alfresco-aspects-from-opencmis) page.

-   **[Working with Alfresco aspects from OpenCMIS](#working-with-alfresco-aspects-from-opencmis)**  
It's possible to work with Alfresco aspects directly via OpenCMIS using CMIS secondary types.
-   **[Adding aspects to a document or folder](#adding-aspects-to-a-document-or-folder)**  
Aspects can be applied when creating or updating a document or folder.
-   **[Removing aspects from a document or folder](#removing-aspects-from-a-document-or-folder)**  
To remove aspects from an existing object, such as a document or folder, you must first get all aspects and then remove the unwanted ones from the list before updating.
-   **[Using the CMIS Workbench with Alfresco](#using-the-cmis-workbench-with-alfresco)**  
The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for the OpenCMIS client API.

## Working with Alfresco aspects from OpenCMIS {#working-with-alfresco-aspects-from-opencmis}

It's possible to work with Alfresco aspects directly via OpenCMIS using CMIS secondary types.

Alfresco has two types of classes that can be used to classify content, types and aspects. A node in Alfresco (that is, a CMIS object) can have one and only one type set but zero or more aspects applied.

We can use so called CMIS secondary types to manage the aspects for an object in Alfresco, as Alfresco exposes any aspects that are set on an object as secondary types.

This will work if you are running Alfresco 4.2.e Community, Alfresco 4.2.0 Enterprise, or newer versions. With earlier versions, you have to use a special Alfresco OpenCMIS extension to manage aspects.

When we want to manage aspects via CMIS secondary types, we will just use standard OpenCMIS library functions. Secondary object types are managed in a specific multivalued property named `cmis:secondaryObjectTypeIds`.

See the following [page](#adding-aspects-to-a-document-or-folder) for how to add aspects to a CMIS object, such as a folder or document.

See the following [page](#removing-aspects-from-a-document-or-folder) for how to remove aspects from a CMIS object.

## Adding aspects to a document or folder {#adding-aspects-to-a-document-or-folder}

Aspects can be applied when creating or updating a document or folder.

To demonstrate how to add an aspect when we are creating an object, we will add one of the out-of-the-box Alfresco aspects called Titled (`cm:titled`) when we create a folder. This aspect, or the CMIS secondary type, requires two extra properties to be filled in, title and description:

```
public void createFolderWithTitledAspect(Session session) {
	String folderName = "OpenCMISTestTitled";
	Folder parentFolder = session.getRootFolder();
		
	// Check if folder already exist, if not create it
	Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
	if (newFolder == null) {
		List<Object> aspects = new ArrayList<Object>();
		aspects.add("P:cm:titled");

		Map<String, Object> newFolderProps = new HashMap<String, Object>();
		newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		newFolderProps.put(PropertyIds.NAME, folderName);
		newFolderProps.put("cmis:secondaryObjectTypeIds", aspects);
		newFolderProps.put("cm:title", "Folder Title");
		newFolderProps.put("cm:description", "Folder Description");

		newFolder = parentFolder.createFolder(newFolderProps);

		System.out.println("Created new folder with Titled aspect: " +
				newFolder.getPath() + " [creator=" + newFolder.getCreatedBy()
				+ "][created=" + date2String(newFolder.getCreationDate().getTime()) + "]");
	} else {
		System.out.println("Cannot create folder, it already exist: " +
				newFolder.getPath());
	}
}
```

For information on how to get a `Session` object, `getObject` method implementation, and `date2String` method, see [this](#working-with-the-cmis-api-from-java) page.

Here we first check whether the folder we intend to create already exists. If it doesn't, we go ahead and create a list of aspects that we want to set for the folder object. In this case, it is just the one aspect called `P:cm:titled` (P stands for policy; it's the way Alfresco traditionally exposes aspects, and you still have to use this prefix), but the `cmis:secondaryObjectTypeIds` property is a multivalued property, so we need to keep the aspect name in a list.

Then the standard properties map is created where one of the properties is the `cmis:secondaryObjectTypeIds` property, keeping the list of aspects. The folder is then created with this map of properties, and the aspect is set for us and exposed as a secondary type via CMIS.

If we already have an object and want to add an aspect to it, we can also use the `cmis:secondaryObjectTypeIds` property and update it via the `updateProperties` operation. We are going to use another of Alfresco's out-of-the-box aspects called Effectivity (`cm:effectivity`). It can be used to set a from date and a to date for an object, representing some form of time period when the object is effective. To do this for a document object, do as follows:

```
public void addAspectToExistingDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then add the aspect to it
	if (document != null) {
		// Check that document don't already got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (!aspects.contains(aspectName)) {
			aspects.add(aspectName);

			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			properties.put("cm:from", new Date());
			Calendar toDate = Calendar.getInstance();
			toDate.add(Calendar.MONTH, 2);
			properties.put("cm:to", toDate.getTime());

			Document updatedDocument = (Document) document.updateProperties(properties);
	
       		System.out.println("Added aspect " + aspectName + " to " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is already applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot add aspect to it!");
	}
}
```

The document object that we want to apply the aspect to is passed to the method. We start by getting currently set aspects, so we can see if the `cm:effectivity` aspect is already set. We also need to keep a list of aspects that are already set as we need to add them to the aspect list together with the new aspect. If we don't include the aspects that are already set, we will basically unset them when we update the properties.

For information on how to implenent the `getDocumentPath` method see [this](#working-with-the-cmis-api-from-java) page.

## Removing aspects from a document or folder {#removing-aspects-from-a-document-or-folder}

To remove aspects from an existing object, such as a document or folder, you must first get all aspects and then remove the unwanted ones from the list before updating.

If we have a document or folder and we want to remove an aspect from it, then we can use the `cmis:secondaryObjectTypeIds` property and update it via the `updateProperties` operation. Let's take an example where a document have the Alfresco out-of-the-box aspect called Effectivity (`cm:effectivity`) applied and we want to remove it. To do this for a document object, do as follows:

```
public void removeAspectFromDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then remove the aspect from it
	if (document != null) {
		// Check that document got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (aspects.contains(aspectName)) {
			aspects.remove(aspectName);
			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			Document updatedDocument = (Document) document.updateProperties(properties);
			
			System.out.println("Removed aspect " + aspectName + " from " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is not applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot remove aspect from it!");
	}
}
```

The document object that we want to remove the aspect from is passed into the method. We start by getting currently set aspects, so we can make sure that the `cm:effectivity` aspect is indeed set. We need to keep a list of all the aspects that are already set, and which we want to keep when updating. There is no method to remove just one aspect, we need to set all aspects that we want to keep when we update the properties.

Note that when you remove and aspect in this way, all the associated properties are removed as well automatically, in this case `cm:from` and `cm:to`.

For information on how to implenent the `getDocumentPath` method see [this](#working-with-the-cmis-api-from-java) page.

## Using the CMIS Workbench with Alfresco {#using-the-cmis-workbench-with-alfresco}

The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for the OpenCMIS client API.

1.  Download the CMIS workbench zip file from the [Apache Chemistry](http://www.apache.org/dyn/closer.cgi/chemistry/opencmis) website.

2.  Unpack the contents of the zip file to a new directory.

3.  Navigate to the directory and run the following command to install the workbench:

    -   Unix: `workbench.sh`
    -   Windows: `workbench.bat`
4.  During the installation:

    1.  In the URL field, enter the Alfresco CMIS URL:

        http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom

        > **Note:** This URL has changed since Alfresco One 4.2.1.

        For a Browser binding, use http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/browser.

    2.  Enter the user name and password.

    3.  Click **Load Repositories**.

    4.  Click **Login**.

5.  In the CMIS workbench, check that you can connect to the repository by running CMIS functions such as creating, updating, and deleting folders.

