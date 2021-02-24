---
author: Alfresco Documentation
---

# Java Clients

A Java Client talks to Alfresco remotely with Java code using a library such as OpenCMIS.

|Information|Java Clients|
|-----------|------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Integration Architecture](../concepts/dev-platform-integration-arch.md)|
|Description|If a remote client is implemented in Java then it makes sense to also call the Alfresco Repository from Java code via some library. The CMIS REST API is available as a Java client called [OpenCMIS](http://chemistry.apache.org/java/developing/index.html). With this library it is easy to work with folders and files in the Alfresco Repository. The communication is remote over HTTP, but this is hidden behind the library, which takes care of building the REST calls. The OpenCMIS library will also marshal and unmarshal the XML sent back and forth between the client and the repository.When there is a need to access Alfresco specific content, not available via the CMIS standard, such as sites and tags, then we will have to resort to the [Alfresco Proprietary REST API](../pra/1/topics/pra-welcome-aara.md), which is not yet backed by a Java library. It might then be useful to wrap the Proprietary REST API in Java code if it is to be used a lot in a bigger project.

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

**Parent topic:**[Platform integration points](../concepts/dev-platform-integration-points.md)

