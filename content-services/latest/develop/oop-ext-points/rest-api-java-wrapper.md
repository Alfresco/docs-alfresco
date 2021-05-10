---
title: ReST API Java Wrapper Extension Point
---

One of the libraries provided by the [SDK for out-of-process extensions]({% link content-services/latest/develop/oop-sdk.md %})
is the Java ReST API wrapper library. It enables you to work with the [Alfresco ReST API]({% link content-services/latest/develop/rest-api-guide/index.md %}) 
from a Java client with standard Java classes. There is no need to parse JSON or create HTTP requests.

To set up a project with the Java ReST API library follow these [instructions]({% link content-services/latest/develop/oop-sdk.md %}#restapijavawrapperproject).

## Common parameters {#common-parameters}
There are some common parameters in the different API calls. They are documented here instead of repeating the docs for 
them under multiple sections:

|Parameter|Description|Usage|
|---------|-----------|-----|
|`include`|Use this parameter to return additional information about the node. The following optional fields can be requested: `allowableOperations`, `aspectNames`, `association`, `isLink`, `isFavorite`, `isLocked`, `path`, `properties`, `permissions`.|`List<String> include = new ArrayList<>(); include.add("permissions");`|
|`fields`| You can use this parameter to restrict the fields returned within a response if, for example, you want to save on overall bandwidth. The list applies to a returned individual entity or entries within a collection. If the API method also supports the `include` parameter, then the fields specified in `include` parameter are returned in addition to those specified in the `fields` parameter.|`List<String> fields = new ArrayList<>(); fields.add("content,createdAt");`<br/>Note that all fields have to be added as one item comma separated.|
|`where`|Optionally filter the node list.|Here are some examples:<br/>`(isFolder=true)`<br/>`(isFile=true)`<br/>`(nodeType='my:specialNodeType')`<br/>`(nodeType='my:specialNodeType INCLUDESUBTYPES')`<br/>`(id BETWEEN ('1', '79'))`|
|`includeSource`|Also include `source` in addition to `entries` with folder information on the parent node – either the specified parent nodeId, or as resolved by `relativePath`|`Boolean includeSource = false;`|
|`orderBy`| A string to control the order of the entities returned in a list. The default sort order for the returned list is for folders to be sorted before files, and by ascending name. You can override the default using `orderBy` to specify one or more fields to sort by. The default order is always ascending, but you can use an optional `ASC` or `DESC` modifier to specify an ascending or descending sort order. For example, specifying `orderBy=name DESC` returns a mixed folder/file list in descending name order. You can use any of the following fields to order the results: `isFolder`, `name`, `mimeType`, `nodeType`, `sizeInBytes`, `modifiedAt`, `createdAt`, `modifiedByUser`, `createdByUser`|`List<String> orderBy = new ArrayList<>(); orderBy.add("title");`|
|`skipCount`|The number of entities that exist in the collection before those included in this list, useful when implementing paging scenarios. If not supplied then the default value is `0`.|`Integer skipCount = 0;`|
|`maxItems`|The maximum number of items to return in the list, useful when implementing paging scenarios. If not supplied then the default value is `100`.|`Integer maxItems = 100;`|
|`autoRename`|If `true`, then a name clash will cause an attempt to auto rename by finding a unique name using an integer suffix.|`Boolean autoRename = true;`|
|`versioningEnabled`|Should versioning of files be enabled at all? |`Boolean versioningEnabled = true;`|
|`majorVersion`|If `true`, then it will be a major version, such as 1.0, 2.0 etc. If `false`, then the version change will be 1.1, 1.2, which is a minor version change.|`Boolean majorVersion = true;`|
|`updateComment`|Add a version comment which will appear in version history. Setting this parameter also enables versioning of this node, if it is not already versioned.|`String updateComment = "A comment";`|
|`updatedName`|Optional new name of the node, sets `cm:name`. This should include the file extension. The name must not contain spaces or the following special characters: `* " < > \ / ? : |`. The character `.` must not be used at the end of the name.|`String updatedName = null;` if not updating or set to new name.|

## === Managing Folders and Files ===
The following sections walk through how to use the Java ReST API wrapper services when managing folders and files.

## List contents of a folder {#listfoldercontent}
To list contents of a folder in the repository use the `listNodeChildren` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listNodeChildren){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#listcontentsfolder)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListFolderContent {
    static final Logger LOGGER = LoggerFactory.getLogger(ListFolderContent.class);

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        NodeChildAssociationPagingList nodes = listFolderContent("-root-", null);
        NodeChildAssociationPagingList nodes2 = listFolderContent("-root-", "/Data Dictionary");
    }
    
    /**
     * List contents (i.e. folders and files) of a folder.
     *
     * @param rootNodeId         the id of the folder node that is the root. If relativeFolderPath is null, then content in this folder will be listed. Besides node ID the aliases -my-, -root- and -shared- are also supported.
     * @param relativeFolderPath path relative rootNodeId, if this is not null, then the content of this folder will be listed
     * @return a list of child node objects contained in the folder, or null if not found
     */
    private NodeChildAssociationPagingList listFolderContent(String rootNodeId, String relativeFolderPath) {
        Integer skipCount = 0;         
        Integer maxItems = 100;
        List<String> include = null;
        List<String> fields = null;
        List<String> orderBy = null;
        String where = null;
        Boolean includeSource = false;

        LOGGER.info("Listing folder {}{}", rootNodeId, relativeFolderPath);
        NodeChildAssociationPagingList result = nodesApi.listNodeChildren(rootNodeId, skipCount, maxItems, orderBy, where, include,
                relativeFolderPath, includeSource, fields).getBody().getList();
        for (NodeChildAssociationEntry childNodeAssoc: result.getEntries()) {
            LOGGER.info("Found node [name=" + childNodeAssoc.getEntry().getName() + "]");
        }

        return result;
    }
}
```

See also [manage associations](#manageassociations) for information on how to list secondary child associations for a node. 

## Filter contents of a folder
To filter listed contents of a folder in the repository use the `listNodeChildren` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listNodeChildren){:target="_blank"} 
and set the `where` clause parameter. 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#filtercontentsfolder)

For a description of the common parameters, such as `where` and `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListFolderContent {
    static final Logger LOGGER = LoggerFactory.getLogger(ListFolderContent.class);

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        NodeChildAssociationPagingList nodes = listFolderContent("-root-", null);
        NodeChildAssociationPagingList nodes2 = listFolderContent("-root-", "/Data Dictionary");
    }
    
    /**
     * List sub-folders of a folder.
     *
     * @param rootNodeId         the id of the folder node that is the root. If relativeFolderPath is null, then content in this folder will be listed. Besides node ID the aliases -my-, -root- and -shared- are also supported.
     * @param relativeFolderPath path relative rootNodeId, if this is not null, then the content of this folder will be listed
     * @return a list of child folder node objects contained in the folder, or null if not found
     */
    private NodeChildAssociationPagingList listFolderContent(String rootNodeId, String relativeFolderPath) {
        Integer skipCount = 0;         
        Integer maxItems = 100;
        List<String> include = null;
        List<String> fields = null;
        List<String> orderBy = null;
        String where = "(isFolder=true)";
        Boolean includeSource = false;

        LOGGER.info("Listing folder {}{} with filter {}", rootNodeId, relativeFolderPath, where);
        NodeChildAssociationPagingList result = nodesApi.listNodeChildren(rootNodeId, skipCount, maxItems, orderBy, where, include,
                relativeFolderPath, includeSource, fields).getBody().getList();
        for (NodeChildAssociationEntry childNodeAssoc: result.getEntries()) {
            LOGGER.info("Found folder node [name=" + childNodeAssoc.getEntry().getName() + "]");
        }

        return result;
    }
}
```

## Get folder/file metadata
To get metadata for a node, such as a file or folder, in the repository use the `getNode` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#getNode){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#getnodemetadata)

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.NodeEntry;
import org.alfresco.core.model.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class GetNodeMetadataCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetNodeMetadataCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        Node node = getNode("-root-", null);
        Node node2 = getNode("-root-", "/Data Dictionary");
    }

    /**
     * Get a node (file/folder).
     *
     * @param nodeId             the id of the node that we want to fetch metadata for. If relativeFolderPath is specified, then metadata for this node will be returned. Besides node ID the aliases -my-, -root- and -shared- are also supported.
     * @param relativeFolderPath A path relative to the nodeId, if this is not null, then metadata is returned on the node resolved by this path
     * @return Node object if exist, or null if does not exist
     */
    private Node getNode(String nodeId,
                         String relativeFolderPath) {

        // Returns additional information about the node. The following optional fields can be requested:
        // * allowableOperations
        // * association
        // * isLink
        // * isLocked
        // * path
        // * permissions
        List<String> include = null;
        // A list of field names.
        // You can use this parameter to restrict the fields returned within a response if, for example,
        // you want to save on overall bandwidth. The list applies to a returned individual entity or
        // entries within a collection. If the API method also supports the **include** parameter,
        // then the fields specified in the **include** parameter are returned in addition to
        // those specified in the **fields** parameter.
        List<String> fields = null;

        NodeEntry result = nodesApi.getNode(nodeId, include, relativeFolderPath, fields).getBody();
        LOGGER.info("Got node {}", result.getEntry());
        return result.getEntry();
    }
}
```

## Create a folder
To create a folder in the repository use the `createNode` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

@Component
public class CreateFolder {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateFolder.class);

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        Node folderInCompanyHome = createFolder("Folder1", "Title1", "Desc1", "");
        Node folderInFolder1 = createFolder("Folder2", "Title2", "Desc2", "/Folder1");
    }

    /**
     * Make the remote call to create a folder in the repository, if it does not exist.
     *
     * @param folderName         the name of the folder
     * @param folderTitle        the title of the folder
     * @param folderDescription  the description of the folder
     * @param relativeFolderPath path relative to /Company Home
     * @return a node object for the newly created node, contains the ID,
     * such as e859588c-ae81-4c5e-a3b6-4c6109b6c905
     */
    private Node createFolder(String folderName,
                              String folderTitle,
                              String folderDescription,
                              String relativeFolderPath) throws IOException {
        Objects.requireNonNull(folderName);

        String rootPath = "-root-";       // /Company Home
        String folderType = "cm:folder";  // Standard out-of-the-box folder type

        List<String> folderAspects = new ArrayList<String>();
        folderAspects.add("cm:titled");
        Map<String, String> folderProps = new HashMap<>();
        folderProps.put("cm:title", folderTitle);
        folderProps.put("cm:description", folderDescription);

        // The identifier of a node. You can also use one of these well-known aliases: * -my- * -shared- * -root-
        String nodeId = rootPath;
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(folderName);
        nodeBodyCreate.setNodeType(folderType);
        nodeBodyCreate.setAspectNames(folderAspects);
        nodeBodyCreate.setProperties(folderProps);
        nodeBodyCreate.setRelativePath(relativeFolderPath);

        // If true, then  a name clash will cause an attempt to auto rename by
        // finding a unique name using an integer suffix.
        Boolean autoRename = true;
        // Returns additional information about the node.
        // The following optional fields can be requested:
        // * allowableOperations
        // * association
        // * isLink
        // * isLocked
        // * path
        // * permissions
        List<String> include = null;
        // A list of field names.
        // You can use this parameter to restrict the fields returned within a response if, for example,
        // you want to save on overall bandwidth. The list applies to a returned individual entity or entries
        // within a collection.  If the API method also supports the **include** parameter, then the fields specified in
        // the **include** parameter are returned in addition to those specified in the **fields** parameter.
        List<String> fields = null;
        // Should this be a major version?
        Boolean majorVersion = true;
        // Should versioning be enabled at all?
        Boolean versioningEnabled = true;

        Node folderNode = nodesApi.createNode(nodeId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled,
                include, fields).getBody().getEntry();
        LOGGER.info("Created new folder: {}", folderNode);

        return folderNode;
    }
}
```

## Upload a file
To upload a file to the repository use first the [`NodesApi.createNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"} 
method, which will create the metadata for the file, and then the [`NodesApi.updateNodeContent`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNodeContent){:target="_blank"} 
method that will set the content for the file. 

At the moment it's necessary to make two calls to upload a file, but enhancements are being developed in a new version 
of SDK 5 to provide a one method approach as this is [supported in the ReST API]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#uploadfile). 

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyCreate;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CreateFile {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateFile.class);

    // Set generic file content
    private String contentType = "cm:content";
    // If true, then  a name clash will cause an attempt to auto rename by
    // finding a unique name using an integer suffix.
    private Boolean autoRename = true;
    // If true, then created node will be version 1.0 MAJOR. If false, then created node will be version 0.1 MINOR.
    private Boolean majorVersion = true;
    // Should versioning be enabled at all?
    private Boolean versioningEnabled = true;
    // Returns additional information about the node.
    // The following optional fields can be requested:
    // * allowableOperations
    // * aspectNames
    // * isLink
    // * isLocked
    // * path
    // * properties
    private List<String> include = null;
    // A list of field names.
    // You can use this parameter to restrict the fields returned within a response if, for example,
    // you want to save on overall bandwidth. The list applies to a returned individual entity or entries
    // within a collection. If the API method also supports the **include** parameter, then the fields specified in
    // the **include** parameter are returned in addition to those specified in the **fields** parameter.
    private List<String> fields = null;
    // Add a version comment which will appear in version history. Setting this parameter also enables versioning of
    // this node, if it is not already versioned.
    private String updateComment = null;
    // Optional new name. This should include the file extension. The name must not contain spaces or the following
    // special characters: * " < > \ / ? : and |. The character `.` must not be used at the end of the name.
    private String updatedName = null;

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        // Create a text file under the /Company Home/Guest Home folder
        Node newTextFile = createTextFile("-root-", "somestuff.txt", "TextfileTitle",
                "TextfileDesc", "/Guest Home", "Some text for the file");

        // Upload a file from disk to the /Company Home/Guest Home folder, from the same directory we are running the app
        Node newFile = uploadFile("-root-", "somepicture.png", "PicturefileTitle",
                "PicturefileDesc", "/Guest Home", "somepicture.png");
    }

    /**
     * Upload a file from disk
     */
    private Node uploadFile(String parentFolderId, String fileName, String title, String description,
                            String relativeFolderPath, String filePath) {
        Node fileNode = createFileMetadata(parentFolderId, fileName, title, description, relativeFolderPath);

        // Get the file bytes
        File someFile = new File(filePath);
        byte[] fileData = null;
        try {
            fileData = FileUtils.readFileToByteArray(someFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Add the file node content
        Node updatedFileNode = nodesApi.updateNodeContent(fileNode.getId(),
                fileData, majorVersion, updateComment, updatedName, include, fields).getBody().getEntry();

        LOGGER.info("Created file with content: {}", updatedFileNode.toString());

        return updatedFileNode;
    }

    /**
     * Create a text file
     */
    private Node createTextFile(String parentFolderId, String fileName, String title, String description,
                                String relativeFolderPath, String textContent) {
        Node fileNode = createFileMetadata(parentFolderId, fileName, title, description, relativeFolderPath);

        // Add the file node content
        Node updatedFileNode = nodesApi.updateNodeContent(fileNode.getId(),
                textContent.getBytes(), majorVersion, updateComment, updatedName, include, fields).getBody().getEntry();

        LOGGER.info("Created file with content: {}", updatedFileNode.toString());

        return updatedFileNode;
    }

    /**
     * Create metadata for a file node
     *
     * @param parentFolderId the parent folder node ID where the file should be stored
     * @param fileName the name for the new file
     * @param title the title property value for the new file
     * @param description the description property value for the new file
     * @param relativeFolderPath path relative to /Company Home
     * @return a Node object with file metadata and the Node ID
     */
    private Node createFileMetadata(String parentFolderId, String fileName, String title, String description,
                                    String relativeFolderPath) {
        List<String> fileAspects = new ArrayList<String>();
        fileAspects.add("cm:titled");
        Map<String, String> fileProps = new HashMap<>();
        fileProps.put("cm:title", title);
        fileProps.put("cm:description", description);
        
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(fileName);
        nodeBodyCreate.setNodeType(contentType);
        nodeBodyCreate.setAspectNames(fileAspects);
        nodeBodyCreate.setProperties(fileProps);
        nodeBodyCreate.setRelativePath(relativeFolderPath);

        // Create the file node metadata
        Node fileNode = nodesApi.createNode(parentFolderId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled,
                include, fields).getBody().getEntry();

        return fileNode;
    }
}
```

## === Managing Sites ===
The following sections walk through how to use the Java ReST API wrapper services when managing Alfresco Share sites.

## Create a site
To create an Alfresco Share site in the repository use the `createSite` method of the 
[`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/SitesApi.md#createSite){:target="_blank"}, 
which is the main API used to create and manage sites.

```java
import org.alfresco.core.handler.SitesApi;
import org.alfresco.core.model.Site;
import org.alfresco.core.model.SiteBodyCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class CreateSite {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateSite.class);

    // A list of field names.
    // You can use this parameter to restrict the fields returned within a response if, for example,
    // you want to save on overall bandwidth. The list applies to a returned individual entity or entries
    // within a collection. If the API method also supports the **include** parameter, then the fields specified in
    // the **include** parameter are returned in addition to those specified in the **fields** parameter.
    private List<String> fields = null;

    // Flag to indicate whether the Share-specific (surf) configuration files for the site should not be created
    // Default = false
    Boolean skipConfiguration = null;
    // Flag to indicate whether the site should not be added to the user's site favorites
    // Default = false
    Boolean skipAddToFavorites = null;

    @Autowired
    SitesApi sitesApi;

    public void execute(String siteId) throws IOException {
        SiteBodyCreate siteBodyCreate = new SiteBodyCreate();
        siteBodyCreate.setId(siteId);
        siteBodyCreate.setTitle("title-" + siteId);
        siteBodyCreate.setDescription("description-" + siteId);
        siteBodyCreate.setVisibility(SiteBodyCreate.VisibilityEnum.PUBLIC);

        Site site = sitesApi.createSite(siteBodyCreate, skipConfiguration, skipAddToFavorites, fields).getBody().getEntry();

        LOGGER.info("Created site: {}", site);
    }
}
```

## === Searching for content ===
The following sections walk through how to use the Java ReST API wrapper services when managing audit applications and 
their logs.

## Finding folders and files by a term
To find a folder or a file node in the repository based on a term use the `findNodes` method of the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/QueriesApi.md#findNodes){:target="_blank"}, 
which is a search API you can use when doing simple search on a term. For more complex search, such as Alfresco Full Text Search (AFTS), 
use the [Search API](#searchingbyquery);

```java
import org.alfresco.core.handler.QueriesApi;
import org.alfresco.core.model.NodeEntry;
import org.alfresco.core.model.NodePagingList;
import org.alfresco.core.model.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class FindNode {
    static final Logger LOGGER = LoggerFactory.getLogger(FindNode.class);

    @Autowired
    QueriesApi queriesApi;

    public void execute() throws IOException {
        Node node = findNode("Dictionary", "-root-");
    }
    
    /**
     * Find a node based on name.
     * Search term must be at least 3 characters.
     *
     * @param term         the term to search for, part of the name of the node (i.e. folder or file) that we are looking for, min 3 characters
     * @param parentNodeId the parent node under which we expect to find the node
     * @return a node object for the found node, or null if not found
     */
    private Node findNode(String term,
                          String parentNodeId) {
        String rootNodeId = parentNodeId; // The id of the node to start the search from.  Supports the aliases -my-, -root- and -shared-.
        Integer skipCount = 0;            // The number of entities that exist in the collection before those included in this list.  If not supplied then the default value is 0.
        Integer maxItems = 100;           // The maximum number of items to return in the list.  If not supplied then the default value is 100.
        String nodeType = null;           // Restrict the returned results to only those of the given node type and its sub-types

        // Returns additional information about the node.
        // The following optional fields can be requested:
        // * allowableOperations
        // * aspectNames
        // * isLink
        // * isLocked
        // * path
        // * properties
        List<String> include = null;
        // A string to control the order of the entities returned in a list.
        // You can use the **orderBy** parameter to sort the list by one or more fields.
        // Each field has a default sort order, which is normally ascending order.
        // Read the API method implementation notes above to check if any fields used in this
        // method have a descending default search order.
        // To sort the entities in a specific order, you can use the **ASC** and **DESC** keywords for any field.
        List<String> orderBy = null;
        // A list of field names.
        // You can use this parameter to restrict the fields returned within a response if, for example,
        // you want to save on overall bandwidth. The list applies to a returned individual entity or entries
        // within a collection. If the API method also supports the **include** parameter, then the fields specified in
        // the **include** parameter are returned in addition to those specified in the **fields** parameter.
        List<String> fields = null;

        NodeEntry nodeEntry = null;
        NodePagingList result = queriesApi.findNodes(
                term, rootNodeId, skipCount, maxItems, nodeType, include, orderBy, fields).getBody().getList();
        if (result.getEntries().isEmpty() == false) {
            nodeEntry = result.getEntries().get(0);
            LOGGER.info("Found node [name=" + nodeEntry.getEntry().getName() + "]" + nodeEntry);
            return nodeEntry.getEntry();
        }

        return null;
    }
}
```

## Finding content by a search query {#searchingbyquery}
dTo find content based on more complex search queries, such as using Alfresco Full Text Search (AFTS), use the 
[`SearchApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-rest-api/docs/SearchApi.md#search){:target="_blank"},;

```java
import org.alfresco.search.handler.SearchApi;
import org.alfresco.search.model.RequestQuery;
import org.alfresco.search.model.ResultSetPaging;
import org.alfresco.search.model.ResultSetRowEntry;
import org.alfresco.search.model.SearchRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class SearchCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(SearchCmd.class);

    @Autowired
    SearchApi searchApi;

    /**
     * Search in a site
     *
     * @param siteId the site id
     * @param term the term to search for in the site
     */
    public void execute(String siteId, String term) throws IOException {
        List<ResultSetRowEntry> result = search("(SITE:\"" + siteId + "\" AND TEXT:\"" + term + "\" )");

        LOGGER.info("Search result: {}", result);
    }

    /**
     * Search the repository for content using an Alfresco Full Text Search (AFTS) query
     *
     * @param aftsQuery the query statement
     * @return a list of search results
     */
    List<ResultSetRowEntry> search(String aftsQuery) {
        ResponseEntity<ResultSetPaging> result = searchApi.search(new SearchRequest()
                .query(new RequestQuery()
                        .language(RequestQuery.LanguageEnum.AFTS)
                        .query(aftsQuery)));

        return result.getBody().getList().getEntries();
    }
}
```
