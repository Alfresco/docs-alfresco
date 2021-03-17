---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# Working with the CMIS API from Java

The Apache Chemistry project provides a Java API called OpenCMIS that wraps the CMIS ReST API.

The [Apache Chemistry](https://chemistry.apache.org) project contains a number of libraries that abstract the CMIS low-level protocol bindings. [OpenCMIS](https://chemistry.apache.org/java/opencmis.html) is the library used by Java developers. It provides an abstraction layer on top of all the CMIS protocol bindings, the AtomPub binding, the Web Service binding, and the Browser binding.

To use the OpenCMIS library, we need to first configure it in the Maven POM file's dependency section, open the pom.xml file in your Maven Java project, and add the following \(check that you are using latest version of the library\):

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

We are connecting to Alfresco and it only provides one repository, so we can grab the first `Repository` object in the repositories list and use it to create a session/ connection. The `Repository` object provides information about the repository, such as its ID, name, and the version of CMIS it supports. In case of Alfresco, the ID is `-default-`, and if running with the older AtomPub URL, it will be a universally unique identifier \(UUID\) that looks something like `f0ebcfb4-ca9f-4991-bda8-9465f4f11527`.

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

What this method does is call another custom method named `getParentFolderPath` to get the path for the parent folder of the document object passed in. When it has this path, it checks if it ends in **/**, if not, it adds **/** \(if it is the root folder, it will end in slash as it is represented by /\). To complete the full path for the document, it then adds the name of the document to the parent folder path and returns the result. The `getParentFolderPath` method is implemented as follows:

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

A document can have multiple folders as parents \(that is, multifiled\), so we start out by finding out what parents the document have by calling `getParents` on it. Then we grab the first parent in the list assuming that most document objects will only be filed/contained in one folder. If it is multifiled, we print out a message about that. If no parent folders could be found for the document, then it is unfiled and `null` is returned as the document does not have a parent folder.

This was a short introduction to working with OpenCMIS Java CMIS API. There are multiple books covering OpenCMIS and if you are going to work extensivly with this API get one of those.

If you are wondering about how to work with Alfresco aspects using OpenCMIS see [this](opencmis-ext-using.md) page.

-   **[Working with Alfresco aspects from OpenCMIS](../concepts/opencmis-ext-using.md)**  
It's possible to work with Alfresco aspects directly via OpenCMIS using CMIS secondary types.
-   **[Adding aspects to a document or folder](../concepts/opencmis-ext-creating-aspects.md)**  
Aspects can be applied when creating or updating a document or folder.
-   **[Removing aspects from a document or folder](../concepts/opencmis-ext-adding.md)**  
To remove aspects from an existing object, such as a document or folder, you must first get all aspects and then remove the unwanted ones from the list before updating.
-   **[Using the CMIS Workbench with Alfresco](../pra/1/tasks/opencmis-ext-workbench.md)**  
The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for the OpenCMIS client API.

**Parent topic:**[CMIS API \(OASIS ReST Standard\)](../concepts/dev-api-by-language-cmis.md)

