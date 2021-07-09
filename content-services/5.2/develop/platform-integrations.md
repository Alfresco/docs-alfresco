---
title: Platform integrations
---

Platform integrations are external additions to the Alfresco Content Services platform. These are generally clients that leverage the platform.

Integrations include mobile clients, remote services, and client applications. They tend to use the REST APIs, Public Java API, or the mobile SDKs.

-   **[Getting started](#getting-started)**  
A platform integration is any remote service, application, or client that talks to the repository remotely over HTTP.
-   **[Platform integration architecture](#platform-integration-architecture)**  
The platform integration architecture contains key integration points.
-   **[Platform integration points](#platform-integration-points)**  
The Alfresco Content Services platform features a number of integration points that can be used to integrate web clients, desktop clients, enterprise services, and applications.


## Getting started

A platform integration is any remote service, application, or client that talks to the repository remotely over HTTP.

In most cases you would build your extensions on top of the platform application or the Alfresco Share user interface. However, there are use cases that do not fit the embedded extension approach very well, and where the remote integration approach makes more sense:

-   **Enterprise Application Integration (EAI)**: providing existing enterprise applications with content management functionality - for example, a CRM system that needs to store and retrieve documents in a central repository
-   **Mashup**: a web application that uses content from many different sources and that also needs to display some file and folder information
-   **Custom UIs**: this is the use case when the Alfresco Share user interface deviates too much from what the solution requires, so it makes more sense to build a new content management client form scratch
-   **Mobile clients**: such as iOS and Android applications that manage content


## Platform integration architecture

The platform integration architecture contains key integration points.

The following diagram illustrates the platform integration architecture and [integration points](#platform-integration-points):

![]({% link content-services/images/dev-platform-integration-architecture.png %})

The API that is mostly used for platform integrations is of course the [REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis). Sometimes the invocation of the REST API is hidden, such as when working with a Java client using the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java library. Other times we might build on the [Aikau](https://github.com/Alfresco/Aikau) development framework, which provides content management widgets and services so we don't have to start from scratch. But even Aikau calls the REST API under the hood.

## Platform integration points

The Alfresco Content Services platform features a number of integration points that can be used to integrate web clients, desktop clients, enterprise services, and applications.

The following table lists platform integration points and links to relevant documentation.

|Integration point|Description|
|-----------------|-----------|
|[REST Clients](#rest-clients)|Most of the remote integrations will use the [REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis). By using the REST API the client code can be written in any language that can make HTTP calls and that can process XML or JSON.|
|[Java Clients](#java-clients)|If the remote client is written in Java, then it might make sense to wrap the REST API in a Java library for convenience and easier usage. The Apache Chemistry [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java library can be used for most operations, except to manage Alfresco specific content such as sites, tags, and ratings.|
|[Aikau Clients](#aikau-clients)|If you are looking at the out-of-the-box Alfresco Share, and there are too many changes needed to turn it into the web client that you want, then you can build a new content management UI with the [Aikau](https://github.com/Alfresco/Aikau) framework and content widgets.|

-   **[REST Clients](#rest-clients)**  
A REST Client talks to Alfresco Content Services over HTTP and sends and receives information as JSON or XML.
-   **[Java Clients](#java-clients)**  
A Java Client talks to Alfresco Content Services remotely with Java code using a library such as OpenCMIS.
-   **[Aikau Clients](#aikau-clients)**  
An Aikau Client uses ready made content widgets to display content from the repository.



### REST Clients

A REST Client talks to Alfresco Content Services over HTTP and sends and receives information as JSON or XML.

|Information|REST Clients|
|-----------|------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Integration Architecture](#platform-integration-architecture)|
|Description|A REST client is any enterprise application, web client, desktop client, service etc. that wants to access repository content remotely over HTTP. The client can be written in any language that can make HTTP calls and process XML or JSON. So it is a very flexible integration point for bringing content management functionality into all existing applications in an enterprise. The main content management functionality for working with folders and files are provided by the [CMIS REST API]({% link content-services/5.2/develop/api-reference.md %}#cmis-rest-api). When working with Alfresco Content Services-specific content such as tags, sites, and ratings the [REST API]({% link content-services/5.2/develop/api-reference.md %}#alfresco-rest-api) has to be used.

**Note**. If you are working in a remote client that is implemented in Java it make sense to use a Java lib that wraps the CMIS REST API. One such library is the Apache Chemistry [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java library.

|
|More Information|-   [Test Server and Resources](https://www.alfresco.com/cmis)

|
|Sample Code|CMIS REST: See [CMIS Getting started section]({% link content-services/5.2/develop/reference/cmis-ref.md %})Proprietary REST: See [Proprietary REST API Getting Started section]({% link content-services/5.2/develop/api-reference.md %}#alfresco-rest-api)

|



### Java Clients

A Java Client talks to Alfresco Content Services remotely with Java code using a library such as OpenCMIS.

|Information|Java Clients|
|-----------|------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Integration Architecture](#platform-integration-architecture)|
|Description|If a remote client is implemented in Java then it makes sense to also call the repository from Java code via some library. The CMIS REST API is available as a Java client called [OpenCMIS](http://chemistry.apache.org/java/developing/index.html). With this library it is easy to work with folders and files in the repository. The communication is remote over HTTP, but this is hidden behind the library, which takes care of building the REST calls. The OpenCMIS library will also marshal and unmarshal the XML sent back and forth between the client and the repository.When there is a need to access Alfresco Content Services-specific content, not available via the CMIS standard, such as sites and tags, then we will have to resort to the [Proprietary REST API]({% link content-services/5.2/develop/api-reference.md %}#alfresco-rest-api), which is not yet backed by a Java library. It might then be useful to wrap the Proprietary REST API in Java code if it is to be used a lot in a bigger project.

|
|More Information| |
|Sample Code|OpenCMIS Sample code:

 ```

    private static Map<String, Session> connections = new ConcurrentHashMap<String, Session>();

    /**
     * Get an Open CMIS session to use when talking to the Alfresco repo.
     * Will check if there is already a connection to the Alfresco repo
     * and re-use that session.
     *
     * @param connectionName the name of the new connection to be created
     * @param username       the Alfresco username to connect with
     * @param pwd            the Alfresco password to connect with
     * @return an Open CMIS Session object
     */
    public Session getSession(String connectionName, String username, String pwd) {
        Session session = connections.get(connectionName);
        if (session == null) {
            logger.info("Not connected, creating new connection to Alfresco with the connection id ("
                    + connectionName + ")");

            // No connection to Alfresco available, create a new one
            SessionFactory sessionFactory = SessionFactoryImpl.newInstance();
            Map<String, String> parameters = new HashMap<String, String>();
            parameters.put(SessionParameter.USER, username);
            parameters.put(SessionParameter.PASSWORD, pwd);
            parameters.put(SessionParameter.ATOMPUB_URL,
                    "http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom");
            parameters.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
            parameters.put(SessionParameter.COMPRESSION, "true");
            parameters.put(SessionParameter.CACHE_TTL_OBJECTS, "0"); // Caching is turned off

            // If there is only one repository exposed (e.g. Alfresco), these
            // lines will help detect it and its ID
            List<Repository> repositories = sessionFactory.getRepositories(parameters);
            Repository alfrescoRepository = null;
            if (repositories != null && repositories.size() > 0) {
                logger.info("Found (" + repositories.size() + ") Alfresco repositories");
                alfrescoRepository = repositories.get(0);
                logger.info("Info about the first Alfresco repo [ID=" + alfrescoRepository.getId() +
                        "][name=" + alfrescoRepository.getName() +
                        "][CMIS ver supported=" + alfrescoRepository.getCmisVersionSupported() + "]");
            } else {
                throw new CmisConnectionException(
                        "Could not connect to the Alfresco Server, no repository found!");
            }

            // Create a new session with the Alfresco repository
            session = alfrescoRepository.createSession();

            // Save connection for reuse
            connections.put(connectionName, session);
        } else {
            logger.info("Already connected to Alfresco with the connection id (" + connectionName + ")");
        }

        return session;
    }
    
    public void listRepoCapabilities(RepositoryInfo repositoryInfo) {
        RepositoryCapabilities repoCapabilities = repositoryInfo.getCapabilities();

        logger.info("aclCapability = " + repoCapabilities.getAclCapability().name());
        logger.info("changesCapability = " + repoCapabilities.getChangesCapability().name());
        logger.info("contentStreamUpdatable = " + repoCapabilities.getContentStreamUpdatesCapability().name());
        logger.info("joinCapability = " + repoCapabilities.getJoinCapability().name());
        logger.info("queryCapability = " + repoCapabilities.getQueryCapability().name());
        logger.info("renditionCapability = " + repoCapabilities.getRenditionsCapability().name());
        logger.info("allVersionsSearchable? = " + repoCapabilities.isAllVersionsSearchableSupported());
        logger.info("getDescendantSupported? = " + repoCapabilities.isGetDescendantsSupported());
        logger.info("getFolderTreeSupported? = " + repoCapabilities.isGetFolderTreeSupported());
        logger.info("multiFilingSupported? = " + repoCapabilities.isMultifilingSupported());
        logger.info("privateWorkingCopySearchable? = " + repoCapabilities.isPwcSearchableSupported());
        logger.info("pwcUpdateable? = " + repoCapabilities.isPwcUpdatableSupported());
        logger.info("unfilingSupported? = " + repoCapabilities.isUnfilingSupported());
        logger.info("versionSpecificFilingSupported? = " + repoCapabilities.isVersionSpecificFilingSupported());
    }

    public void listTopFolder(Session session) {
        Folder root = session.getRootFolder();
        ItemIterable<CmisObject> contentItems = root.getChildren();
        for (CmisObject contentItem : contentItems) {
            if (contentItem instanceof Document) {
                Document docMetadata = (Document) contentItem;
                ContentStream docContent = docMetadata.getContentStream();
                logger.info(docMetadata.getName() + " [size=" + docContent.getLength() + "][Mimetype=" +
                        docContent.getMimeType() + "][type=" + docMetadata.getType().getDisplayName() + "]");
            } else {
                logger.info(contentItem.getName() + " [type=" + contentItem.getType().getDisplayName() + "]");
            }
        }
    }

    public Folder createFolder(Session session, String folderName) {
        Folder parentFolder = session.getRootFolder();

        // Make sure the user is allowed to create a folder under the root folder
        if (parentFolder.getAllowableActions().getAllowableActions().contains(Action.CAN_CREATE_FOLDER) == false) {
            throw new CmisUnauthorizedException("Current user does not have permission to create a sub-folder in " +
                    parentFolder.getPath());
        }

        // Check if folder already exist, if not create it
        Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
        if (newFolder == null) {
            Map<String, Object> newFolderProps = new HashMap<String, Object>();
            newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
            newFolderProps.put(PropertyIds.NAME, folderName);
            newFolder = parentFolder.createFolder(newFolderProps);

            logger.info("Created new folder: " + newFolder.getPath() +
                    " [creator=" + newFolder.getCreatedBy() + "][created=" +
                    date2String(newFolder.getCreationDate().getTime()) + "]");
        } else {
            logger.info("Folder already exist: " + newFolder.getPath());
        }

        return newFolder;
    }

    public Document createDocument(Session session, Folder parentFolder, String documentName) throws IOException {
        // Make sure the user is allowed to create a document in the passed in folder
        if (parentFolder.getAllowableActions().getAllowableActions().contains(Action.CAN_CREATE_DOCUMENT) == false) {
            throw new CmisUnauthorizedException("Current user does not have permission to create a document in " +
                    parentFolder.getPath());
        }

        // Check if document already exist, if not create it
        Document newDocument = (Document) getObject(session, parentFolder, documentName);
        if (newDocument == null) {
            // Setup document metadata
            Map<String, Object> newDocumentProps = new HashMap<String, Object>();
            String typeId = "cmis:document";
            newDocumentProps.put(PropertyIds.OBJECT_TYPE_ID, typeId);
            newDocumentProps.put(PropertyIds.NAME, documentName);

            // Setup document content
            String mimetype = "text/plain; charset=UTF-8";
            String documentText = "This is a test document!";
            byte[] bytes = documentText.getBytes("UTF-8");
            ByteArrayInputStream input = new ByteArrayInputStream(bytes);
            ContentStream contentStream = session.getObjectFactory().createContentStream(
                    documentName, bytes.length, mimetype, input);

            // Check if we need versioning
            VersioningState versioningState = VersioningState.NONE;
            DocumentType docType = (DocumentType) session.getTypeDefinition(typeId);
            if (Boolean.TRUE.equals(docType.isVersionable())) {
                logger.info("Document type " + typeId + " is versionable, setting MAJOR version state.");
                versioningState = VersioningState.MAJOR;
            }

            // Create versioned document object
            newDocument = parentFolder.createDocument(newDocumentProps, contentStream, versioningState);

            logger.info("Created new document: " + getDocumentPath(newDocument) +
                    " [version=" + newDocument.getVersionLabel() + "][creator=" + newDocument.getCreatedBy() +
                    "][created=" + date2String(newDocument.getCreationDate().getTime()) + "]");
        } else {
            logger.info("Document already exist: " + getDocumentPath(newDocument));
        }

        return newDocument;
    }

    public Document createDocumentFromFileWithCustomType(Session session, Folder parentFolder, String documentName, File file) {
        // Check if document already exist, if not create it
        Document newDocument = (Document) getObject(session, parentFolder, documentName);
        if (newDocument == null) {
            // Setup document metadata
            Map<String, Object> newDocumentProps = new HashMap<String, Object>();
            newDocumentProps.put(PropertyIds.OBJECT_TYPE_ID, "D:myc:itDoc");
            newDocumentProps.put(PropertyIds.NAME, documentName);

            InputStream is = null;
            try {
                // Setup document content
                is = new FileInputStream(file);
                String mimetype = "application/pdf";
                ContentStream contentStream = session.getObjectFactory().createContentStream(
                        documentName, file.length(), mimetype, is);

                // Create versioned document object
                newDocument = parentFolder.createDocument(newDocumentProps, contentStream, VersioningState.MAJOR);
                logger.info("Created new document: " + getDocumentPath(newDocument) +
                    " [version=" + newDocument.getVersionLabel() + "][creator=" + newDocument.getCreatedBy() +
                    "][created=" + date2String(newDocument.getCreationDate().getTime()) + "]");

                // Close the stream to handle any IO Exception
                is.close();
            } catch (IOException ioe) {
                ioe.printStackTrace();
            } finally {
                IOUtils.closeQuietly(is);
            }
        } else {
            logger.info("Document already exist: " + getDocumentPath(newDocument));
        }

        return newDocument;
    }

    public void addAspectToExistingDocument(Document document) {
        String aspectName = "P:cm:effectivity";
        // Make sure we got a document, and then add the aspect to it
        if (document != null) {
            // Check that document don't already got the aspect applied
            List<Object> aspects = document.getProperty(SECONDARY_OBJECT_TYPE_IDS_PROP_NAME).getValues();
            if (!aspects.contains(aspectName)) {
                aspects.add(aspectName);
                Map<String, Object> properties = new HashMap<String, Object>();
                properties.put(SECONDARY_OBJECT_TYPE_IDS_PROP_NAME, aspects);
                properties.put("cm:from", new Date());
                Calendar toDate = Calendar.getInstance();
                toDate.add(Calendar.MONTH, 2);
                properties.put("cm:to", toDate.getTime());
                Document updatedDocument = (Document) document.updateProperties(properties);
                logger.info("Added aspect " + aspectName + " to " + getDocumentPath(updatedDocument));
            } else {
                logger.info("Aspect " + aspectName + " is already applied to " + getDocumentPath(document));
            }
        } else {
            logger.error("Document is null, cannot add aspect to it!");
        }
    }

    public void searchMetadataAndFTS(Session session) {
        // Check if the repo supports Metadata search and Full Text Search (FTS)
        RepositoryInfo repoInfo = session.getRepositoryInfo();
        if (repoInfo.getCapabilities().getQueryCapability().equals(CapabilityQuery.METADATAONLY)) {
            logger.warn("Repository does not support FTS [repoName=" + repoInfo.getProductName() +
                    "][repoVersion=" + repoInfo.getProductVersion() + "]");
        } else {
            String query = "SELECT * FROM cmis:document WHERE cmis:name LIKE 'OpenCMIS%'";
            ItemIterable<QueryResult> searchResult = session.query(query, false);
            logSearchResult(query, searchResult);

            query = "SELECT * FROM cmis:document WHERE cmis:name LIKE 'OpenCMIS%' AND CONTAINS('testing')";
            searchResult = session.query(query, false);
            logSearchResult(query, searchResult);
        }
    }

    private void logSearchResult(String query, ItemIterable<QueryResult> searchResult) {
        logger.info("Results from query " + query);
        int i = 1;
        for (QueryResult resultRow : searchResult) {
            logger.info("--------------------------------------------\n" + i + " , "
                    + resultRow.getPropertyByQueryName("cmis:objectId").getFirstValue() + " , "
                    + resultRow.getPropertyByQueryName("cmis:objectTypeId").getFirstValue() + " , "
                    + resultRow.getPropertyByQueryName("cmis:name").getFirstValue());
            i++;
        }
    }
    
    /**
     * Get a CMIS Object by name from a specified folder.
     *
     * @param parentFolder  the parent folder where the object might exist
     * @param objectName the name of the object that we are looking for
     * @return the Cmis Object if it existed, otherwise null
     */
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
    
    /**
     * Get the absolute path to the passed in Document object.
     * Called the primary folder path in the Alfresco world as most documents only have one parent folder.
     *
     * @param document the Document object to get the path for
     * @return the path to the passed in Document object, or "Un-filed/{object name}" if it does not have a parent folder
     */
    private String getDocumentPath(Document document) {
        String path2Doc = getParentFolderPath(document);
        if (!path2Doc.endsWith("/")) {
            path2Doc += "/";
        }
        path2Doc += document.getName();
        return path2Doc;
    }

    /**
     * Get the parent folder path for passed in Document object
     *
     * @param document the document object to get the path for
     * @return the parent folder path, or "Un-filed" if the document is un-filed and does not have a parent folder
     */
    private String getParentFolderPath(Document document) {
        Folder parentFolder = getDocumentParentFolder(document);
        return parentFolder == null ? "Un-filed" : parentFolder.getPath();
    }
    
    /**
     * Get the parent folder for the passed in Document object.
     * Called the primary parent folder in the Alfresco world as most documents only have one parent folder.
     *
     * @param document the Document object to get the parent folder for
     * @return the parent Folder object, or null if it does not have a parent folder and is un-filed
     */
    private Folder getDocumentParentFolder(Document document) {
        // Get all the parent folders (could be more than one if multi-filed)
        List<Folder> parentFolders = document.getParents();

        // Grab the first parent folder
        if (parentFolders.size() > 0) {
            if (parentFolders.size() > 1) {
                logger.info("The " + document.getName() + " has more than one parent folder, it is multi-filed");
            }

            return parentFolders.get(0);
        } else {
            logger.info("Document " + document.getName() + " is un-filed and does not have a parent folder");
            return null;
        }
    }
    
    /**
     * Returns date as a string
     *
     * @param date date object
     * @return date as a string formatted with "yyyy-MM-dd HH:mm:ss z"
     */
    private String date2String(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").format(date);
    }        
    
               
```

|
|Tutorials| |
|Alfresco Developer Blogs| |



### Aikau Clients

An Aikau Client uses ready made content widgets to display content from the repository.

|Information|Aikau Clients|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Integration Architecture](#platform-integration-architecture)|
|Description|Alfresco Share is often customized heavily in bigger projects. Sometimes it might actually make sense to start from scratch with a brand new web client. However, there is usually a lot of functionality in Share that we actually want in our web client. There is also a way to re-use what has been built for Share in a new custom web client.By using the Aikau development framework, and its getting started project, we can quickly get going with building a new web client for Alfresco Content Services and at the same time re-use any functionality in the Share UI that we need.

The Aikau widget library will give you access to ready made components that can be used in the new web client, here is a list of some of the components that we will be able to use:

-   AJAX calls
-   Buttons
-   Charts
-   Dialogs
-   Document Library (CRUD, Views, Lists, Filters, Actions)
-   Drag & Drop
-   Editors
-   Event management
-   Forms including many controls
-   Layouts
-   Menus
-   Navigation
-   Pickers
-   Preview
-   Renderers
-   Search
-   Toolbars
-   Upload

For a complete list of all the available Aikau widgets and service see the Aikau [docs](http://dev.alfresco.com/resource/docs/aikau-jsdoc).|
|Deployment - SDK Project|-   [Aikau getting started project](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters/Tutorial1.md) - this page have instructions for how to generate the Aikau web client project

|
|More Information|-   [Aikau project page](https://github.com/Alfresco/Aikau)
-   [Aikau Widget and Service library](http://dev.alfresco.com/resource/docs/aikau-jsdoc)

|
|Tutorials|-   [Aikau tutorials](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters/Tutorial1.md)

|



