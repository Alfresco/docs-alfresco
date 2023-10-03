---
title: ReST API Java Wrapper Extension Point
---

One of the libraries provided by the [SDK for out-of-process extensions]({% link content-services/7.2/develop/oop-sdk.md %})
is the Java ReST API wrapper library. It enables you to work with the [Alfresco ReST API]({% link content-services/7.2/develop/rest-api-guide/index.md %})
from a Java client with standard Java classes. There is no need to parse JSON or create HTTP requests.

To set up a project with the Java ReST API library follow these [instructions]({% link content-services/7.2/develop/oop-sdk.md %}#restapijavawrapperproject).

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

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#listcontentsfolder)

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

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#filtercontentsfolder)

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

## Get folder/file metadata {#getnodemetadata}
To get metadata for a node, such as a file or folder, in the repository use the `getNode` method of the
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#getNode){:target="_blank"},
which is one of the main APIs used when you want to manipulate folders and files.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#getnodemetadata)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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
        List<String> include = null;
        List<String> fields = null;

        NodeEntry result = nodesApi.getNode(nodeId, include, relativeFolderPath, fields).getBody();
        LOGGER.info("Got node {}", result.getEntry());
        return result.getEntry();
    }
}
```

Executing this code would give the following result:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-node        
                                       
2021-04-29 08:09:22.215  INFO 18370 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.536 seconds (JVM running for 4.449)
2021-04-29 08:09:22.217  INFO 18370 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-node
2021-04-29 08:09:22.485  INFO 18370 --- [           main] o.a.tutorial.restapi.GetNodeMetadataCmd  : Got node class Node {
    id: e439190c-3fe0-48a1-8a9a-374fbc54b570
    name: Company Home
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-28T11:48:08.325Z
    modifiedByUser: class UserInfo {
        displayName: System
        id: System
    }
    createdAt: 2021-04-28T11:47:59.098Z
    createdByUser: class UserInfo {
        displayName: System
        id: System
    }
    parentId: null
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:titled, cm:auditable, app:uifacets]
    properties: {cm:title=Company Home, cm:description=The company root space, app:icon=space-icon-default}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-29 08:09:22.538  INFO 18370 --- [           main] o.a.tutorial.restapi.GetNodeMetadataCmd  : Got node class Node {
    id: 1219e0ff-941f-49df-9151-997b84a8359b
    name: Data Dictionary
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-28T11:48:17.700Z
    modifiedByUser: class UserInfo {
        displayName: System
        id: System
    }
    createdAt: 2021-04-28T11:47:59.199Z
    createdByUser: class UserInfo {
        displayName: System
        id: System
    }
    parentId: e439190c-3fe0-48a1-8a9a-374fbc54b570
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:titled, cm:auditable, app:uifacets]
    properties: {cm:title=Data Dictionary, cm:description=User managed definitions, app:icon=space-icon-default}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

See also [manage associations](#manageassociations) for information on how to list associations for a node.

## Create a folder {#createfolder}
To create a folder in the repository use the `createNode` method of the
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"},
which is one of the main APIs used when you want to manipulate folders and files.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#createfolder)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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
        
        String nodeId = rootPath; // The id of a node. You can also use one of these well-known aliases: -my-, -shared-, -root-
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(folderName);
        nodeBodyCreate.setNodeType(folderType);
        nodeBodyCreate.setAspectNames(folderAspects);
        nodeBodyCreate.setProperties(folderProps);
        nodeBodyCreate.setRelativePath(relativeFolderPath);

        List<String> include = null;
        List<String> fields = null;
        Boolean autoRename = true;
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

See also [manage associations](#manageassociations) for more examples of node creation.

## Upload a file {#uploadfile}
To upload a file to the repository use first the [`NodesApi.createNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"}
method, which will create the metadata for the file, and then the [`NodesApi.updateNodeContent`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNodeContent){:target="_blank"}
method that will set the content for the file.

At the moment it's necessary to make two calls to upload a file, but enhancements are being developed in a new version
of SDK 5 to provide a one method approach as this is [supported in the ReST API]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfile).

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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

    private List<String> include = null;
    private List<String> fields = null;
    private String contentType = "cm:content"; // Out-of-the-box content type for generic file content
    private Boolean autoRename = true;
    private Boolean majorVersion = true;
    private Boolean versioningEnabled = true;
    private String updateComment = null;
    private String updatedName = null;

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        // Create a text file under the /Company Home/Guest Home folder
        Node newTextFile = createTextFile("-root-", "somestuff.txt", "TextfileTitle",
                "TextfileDesc", "/Guest Home", "Some text for the file");

        // Upload a file from disk to the '/Company Home/Guest Home' folder, the file that is being uploaded, 'somepicture.png' 
        // in this case, is located in the same directory as we are running the app from
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

See also [manage associations](#manageassociations) for more examples of uploading and creating nodes.

## Upload a file with custom type {#uploadfilecustomtype}
Uploading a file with a custom type to the Repository means creating a node with a type other than `cm:content`. See
[upload a file](#uploadfile) for info on how to upload a file with the out-of-the-box content type `cm:content` set.
There's actually not much difference to how you upload a file with a custom type. Let's say we have a content model type
`acme:document` and an aspect `acme:securityClassified` and these are defined as follows:

```xml
<type name="acme:document">
   <title>Sample Document Type</title>
   <parent>cm:content</parent>
   <properties>
       <property name="acme:documentId">
           <title>Document Identification Number</title>
           <type>d:text</type>
       </property>
   </properties>
   <mandatory-aspects>
       <aspect>acme:securityClassified</aspect>
   </mandatory-aspects>
</type>

<aspect name="acme:securityClassified">
    <title>ACME Security Classified</title>
    <description>Content has been security classified</description>
    <properties>
        <property name="acme:securityClassification">
            <type>d:text</type>
            <index enabled="true">
                <atomic>true</atomic>
                <stored>false</stored>
                <tokenised>false</tokenised>
            </index>
            <constraints>
                <constraint ref="acme:securityClassificationOptions"/>
            </constraints>
        </property>
    </properties>
</aspect>
```
We got two custom properties `acme:documentId` and `acme:securityClassification`. For more information on how to
implement and deploy this custom content model see [this documentation]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfilecustomtype).

Now, to upload a file and set this custom type and aspect we use the same code as for [upload a file](#uploadfile) with
minor updates to the `contentType` variable and the `createFileMetadata` method:

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
public class CreateFileCustomTypeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateFileCustomTypeCmd.class);

    private String contentType = "acme:document"; // Set custom content type
    private Boolean autoRename = true;
    private Boolean majorVersion = true;
    private Boolean versioningEnabled = true;
    private String updateComment = null;
    private String updatedName = null;
    private List<String> include = null;
    private List<String> fields = null;

    @Autowired
    NodesApi nodesApi;

    public void execute() throws IOException {
        // Create a text file under the /Company Home/Guest Home folder
        Node newTextFile = createTextFile("-root-", "somestuff2.txt", "TextfileTitle2",
                "TextfileDesc2", "/Guest Home", "Some text for the file2");

        // Upload a file from disk to the /Company Home/Guest Home folder, file resides in app dir
        Node newFile = uploadFile("-root-", "somepicture2.png", "PicturefileTitle2",
                "PicturefileDesc2", "/Guest Home", "somepicture.png");
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
        fileAspects.add("acme:securityClassified");
        Map<String, String> fileProps = new HashMap<>();
        fileProps.put("cm:title", title);
        fileProps.put("cm:description", description);
        fileProps.put("acme:documentId", "DOC-001");                          // custom prop from type
        fileProps.put("acme:securityClassification", "Company Confidential"); // custom prop from aspect
        
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

See also [manage associations](#manageassociations) for more examples of uploading and creating nodes.

## Upload a new version of file
To upload a new version of a file to the repository use the [`NodesApi.updateNodeContent`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNodeContent){:target="_blank"}
method, which will set the new content for the file.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadnewversionfile)

For a description of the common parameters, such as `majorVersion`, see this [section](#common-parameters).

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
public class UploadNewFileVersionCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(UploadNewFileVersionCmd.class);
    
    private Boolean majorVersion = true;
    private String updateComment = null;
    private String updatedName = null;
    private List<String> include = null;
    private List<String> fields = null;

    @Autowired
    NodesApi nodesApi;

    public void execute(String textFileNodeId, String binFileNodeId) throws IOException {
        // Update text content for a file
        Node newTextFile = updateTextFileContent(textFileNodeId,"Some UPDATED text for the file");

        // Upload a file as new content
        Node newFile = uploadNewFileVersion(binFileNodeId, "updatedpicture.png");
    }

    /**
     * Upload a file from disk as a new version
     */
    private Node uploadNewFileVersion(String fileNodeId, String filePath) {
        // Get the file bytes
        File someFile = new File(filePath);
        byte[] fileData = null;
        try {
            fileData = FileUtils.readFileToByteArray(someFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Update the file node content
        Node updatedFileNode = nodesApi.updateNodeContent(fileNodeId,
                fileData, majorVersion, updateComment, updatedName, include, fields).getBody().getEntry();

        LOGGER.info("Uploaded new content for file: {}", updatedFileNode.toString());

        return updatedFileNode;
    }

    /**
     * Update text content for a file
     */
    private Node updateTextFileContent(String fileNodeId, String textContent) {
        // Update the file node content
        Node updatedFileNode = nodesApi.updateNodeContent(fileNodeId,
                textContent.getBytes(), majorVersion, updateComment, updatedName, include, fields).getBody().getEntry();

        LOGGER.info("Updated text content for file: {}", updatedFileNode.toString());

        return updatedFileNode;
    }
}
```

We would execute this command class something like this, passing in the command name, text file Node ID, and the
binary file node id:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar upload-new-version 0492460b-6269-4ca1-9668-0d934d2f3370 48413f7a-066d-4e38-b2e6-c84ede635493

2021-04-28 13:44:51.437  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.782 seconds (JVM running for 3.471)
2021-04-28 13:44:51.439  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: upload-new-version
2021-04-28 13:44:51.441  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-28 13:44:51.441  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 48413f7a-066d-4e38-b2e6-c84ede635493
2021-04-28 13:44:51.981  INFO 15466 --- [           main] o.a.t.restapi.UploadNewFileVersionCmd    : Updated text content for file: class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: somestuff2.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-28T12:44:51.578Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:author, cm:thumbnailModification]
    properties: {cm:title=TextfileTitle2, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619611506701], cm:description=TextfileDesc2}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-28 13:44:56.783  INFO 15466 --- [           main] o.a.t.restapi.UploadNewFileVersionCmd    : Uploaded new content for file: class Node {
    id: 48413f7a-066d-4e38-b2e6-c84ede635493
    name: somepicture2.png
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-28T12:44:52.055Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.621Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: image/png
        mimeTypeName: PNG Image
        sizeInBytes: 23174
        encoding: UTF-8
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:author, cm:thumbnailModification, exif:exif]
    properties: {cm:title=PicturefileTitle2, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, exif:pixelYDimension=256, acme:securityClassification=Company Confidential, exif:pixelXDimension=256, cm:lastThumbnailModification=[doclib:1619611506392, imgpreview:1619611515611], cm:description=PicturefileDesc2}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

Note how the `cm:versionLabel` has bumped up to `3.0`. Version 1.0 and 2.0 were created when the files were [created in two
steps](#uploadfilecustomtype).

## Get file version history
To get the version history for a file use the [`VersionsApi.listVersionHistory`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/VersionsApi.md#listVersionHistory){:target="_blank"}
method, which will retrieve a list of all the node versions.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#getfileversionhistory)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.VersionsApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListVersionHistoryCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListVersionHistoryCmd.class);

    @Autowired
    VersionsApi versionsApi;

    public void execute(String fileNodeId) throws IOException {
        VersionPagingList nodes = listVersionHistory(fileNodeId);
    }
    
    /**
     * List the version history for a file node.
     *
     * @param fileNodeId the id of the file node
     * @return a list of child node objects contained in the folder, or null if not found
     */
    private VersionPagingList listVersionHistory(String fileNodeId) {
        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> include = null;
        List<String> fields = null;

        LOGGER.info("Listing versions for file node ID {}", fileNodeId);
        VersionPagingList result = versionsApi.listVersionHistory(fileNodeId, include, fields, skipCount, maxItems).getBody().getList();
        for (VersionEntry versionEntry: result.getEntries()) {
            LOGGER.info("Node version " + versionEntry.getEntry().toString());
        }

        return result;
    }
}
```

We would execute this command class something like this, passing in the file Node ID:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-file-versions 0492460b-6269-4ca1-9668-0d934d2f3370                   

2021-04-29 08:04:48.145  INFO 18326 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 6.498 seconds (JVM running for 7.686)
2021-04-29 08:04:48.148  INFO 18326 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-file-versions
2021-04-29 08:04:48.152  INFO 18326 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 08:04:48.152  INFO 18326 --- [           main] o.a.t.restapi.ListVersionHistoryCmd      : Listing versions for file node ID 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 08:04:48.990  INFO 18326 --- [           main] o.a.t.restapi.ListVersionHistoryCmd      : Node version class Version {
    id: 3.0
    versionComment: null
    name: somestuff2.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    modifiedAt: 2021-04-28T12:44:51.578Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: null
    properties: null
}
2021-04-29 08:04:48.990  INFO 18326 --- [           main] o.a.t.restapi.ListVersionHistoryCmd      : Node version class Version {
    id: 2.0
    versionComment: null
    name: somestuff2.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    modifiedAt: 2021-04-28T12:02:33.526Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 23
        encoding: ISO-8859-1
    }
    aspectNames: null
    properties: null
}
2021-04-29 08:04:48.990  INFO 18326 --- [           main] o.a.t.restapi.ListVersionHistoryCmd      : Node version class Version {
    id: 1.0
    versionComment: null
    name: somestuff2.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    modifiedAt: 2021-04-28T12:02:33.143Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 0
        encoding: UTF-8
    }
    aspectNames: null
    properties: null
}
```

Note the `id` property that contains the file version number. The `versionComment` property would contain any comments
made when uploading a new version of the file. Folder nodes does not have content.

## Download a file {#downloadfile}
To download a file use the [`NodesApi.getNodeContent`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#getNodeContent){:target="_blank"}
method, which will download the content bytes for the file.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#downloadfile)

```java
import org.alfresco.core.handler.NodesApi;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.time.OffsetDateTime;

@Component
public class GetNodeContentCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetNodeContentCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String fileNodeId, String filePathOnDisk) throws IOException {
        Resource nodeContent = getNodeContent(fileNodeId);

        // Write file to disk
        File targetFile = new File(filePathOnDisk);
        FileUtils.copyInputStreamToFile(nodeContent.getInputStream(), targetFile);
    }

    /**
     * Get a file node content bytes (folders does not have content).
     *
     * @param nodeId   the id of the file node that we want to fetch content for.
     * @return Node content info object
     */
    private Resource getNodeContent(String nodeId) throws IOException {
        // Relevant when using API call from web browser, true is the default
        Boolean attachment = true;
        // Only download if modified since this time, optional
        OffsetDateTime ifModifiedSince = null;
        // The Range header indicates the part of a document that the server should return.
        // Single part request supported, for example: bytes=1-10., optional
        String range = null;

        Resource result = nodesApi.getNodeContent(nodeId, attachment, ifModifiedSince, range).getBody();
        LOGGER.info("Got node {} size: {}", result.getFilename(), result.contentLength());

        return result;
    }
}
```

## Download multiple files
To download multiple files use the [`DownloadsApi.createDownload`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/DownloadsApi.md#createDownload){:target="_blank"}
method to create a ZIP download on the server side, then check the status of the ZIP download with [`DownloadsApi.getDownload`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/DownloadsApi.md#getDownload){:target="_blank"}.
When the download is ready get it with [NodesApi.getNodeConent](#downloadfile)

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#downloadmultiplefiles)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.DownloadsApi;
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Download;
import org.alfresco.core.model.DownloadBodyCreate;
import org.alfresco.core.model.DownloadEntry;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;

@Component
public class GetMultipleNodeContentCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetMultipleNodeContentCmd.class);

    @Autowired
    DownloadsApi downloadsApi;

    @Autowired
    NodesApi nodesApi;

    public void execute(String[] fileNodeIds, String zipFilePathOnDisk) throws IOException, InterruptedException {
        DownloadEntry downloadEntry = createZipDownload(fileNodeIds);
        Resource zipNodeContent = getNodeContent(downloadEntry.getEntry().getId());

        // Write ZIP file to disk
        File targetFile = new File(zipFilePathOnDisk);
        FileUtils.copyInputStreamToFile(zipNodeContent.getInputStream(), targetFile);
    }

    /**
     * Create a ZIP download with multiple file nodes. This method waits until download is ready.
     *
     * @param nodeIds   the node ids for the files we want to download in one ZIP
     * @return download entry info object for the ZIP
     */
    private DownloadEntry createZipDownload(String[] nodeIds) throws InterruptedException {
        List<String> fields = null;

        // Set up POST data with node IDs we want to download
        DownloadBodyCreate downloads = new DownloadBodyCreate();
        for (String nodeId : nodeIds) {
            downloads.addNodeIdsItem(nodeId);
        }

        // First create the download on the server side
        DownloadEntry result = downloadsApi.createDownload(downloads, fields).getBody();

        LOGGER.info("Created ZIP download: {}", result.getEntry().toString());

        // Check the download status
        DownloadEntry download = downloadsApi.getDownload(result.getEntry().getId(), fields).getBody();
        while (!download.getEntry().getStatus().equals(Download.StatusEnum.DONE)) {
            LOGGER.info("Checking ZIP download status: {}", download.getEntry().getStatus());
            Thread.sleep(1000); // do nothing for 1000 milliseconds (1 second)
            download = downloadsApi.getDownload(result.getEntry().getId(), fields).getBody();
        }

        LOGGER.info("ZIP download is READY: {}", result.getEntry().getId());

        return download;
    }

    /**
     * Get a file node content bytes (folders does not have content).
     *
     * @param nodeId   the id of the file node that we want to fetch content for.
     * @return Node content info object
     */
    private Resource getNodeContent(String nodeId) throws IOException {
        // Relevant when using API call from web browser, true is the default
        Boolean attachment = true;
        // Only download if modified since this time, optional
        OffsetDateTime ifModifiedSince = null;
        // The Range header indicates the part of a document that the server should return.
        // Single part request supported, for example: bytes=1-10., optional
        String range = null;

        Resource result = nodesApi.getNodeContent(nodeId, attachment, ifModifiedSince, range).getBody();
        LOGGER.info("Got node {} size: {}", result.getFilename(), result.contentLength());

        return result;
    }
}
```
Executing the code gives a result looking something like this:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-multiple-file-content 0492460b-6269-4ca1-9668-0d934d2f3370 48413f7a-066d-4e38-b2e6-c84ede635493 mydownload.zip

2021-04-29 12:58:53.560  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.956 seconds (JVM running for 3.436)
2021-04-29 12:58:53.562  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-multiple-file-content
2021-04-29 12:58:53.564  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 12:58:53.564  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 48413f7a-066d-4e38-b2e6-c84ede635493
2021-04-29 12:58:53.564  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[3]: mydownload.zip
2021-04-29 12:58:54.150  INFO 19432 --- [           main] o.a.t.restapi.GetMultipleNodeContentCmd  : Created ZIP download: class Download {
    filesAdded: 0
    bytesAdded: 0
    id: b73c36e5-112b-48a0-baa6-fa225bd9d53d
    totalFiles: 0
    totalBytes: 0
    status: PENDING
}
2021-04-29 12:58:54.167  INFO 19432 --- [           main] o.a.t.restapi.GetMultipleNodeContentCmd  : Checking ZIP download status: PENDING
2021-04-29 12:58:55.194  INFO 19432 --- [           main] o.a.t.restapi.GetMultipleNodeContentCmd  : ZIP download is READY: b73c36e5-112b-48a0-baa6-fa225bd9d53d
2021-04-29 12:58:55.223  INFO 19432 --- [           main] o.a.t.restapi.GetMultipleNodeContentCmd  : Got node archive.zip size: 23111
```
In this example we pass in two file node identifiers that will be requested in the zip download. The zip download file
will be stored in current directory under the name `mydownload.zip`. Note that right after we have initialized the
creation of the zip download there are no files added to the zip (`filesAdded: 0`), we have to wait for the zip download
to be created on the server side. Then we can download with the usual [getNodeContent](#downloadfile) method.

## List file renditions
To list content renditions for a file use the [`RenditionsApi.listRenditions`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/RenditionsApi.md#listRenditions){:target="_blank"}
method.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#listfilerenditions)

For a description of the common parameters, such as `where`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.RenditionsApi;
import org.alfresco.core.model.RenditionEntry;
import org.alfresco.core.model.RenditionPagingList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListRenditionsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListRenditionsCmd.class);

    @Autowired
    RenditionsApi renditionsApi;

    public void execute(String fileNodeId) throws IOException {
        RenditionPagingList nodeRenditions = listRenditions(fileNodeId);
    }
    
    /**
     * List renditions for a file node.
     *
     * @param fileNodeId the id of the file node
     * @return a list of renditions, or null if not found
     */
    private RenditionPagingList listRenditions(String fileNodeId) {
        String where = null; // filter renditions

        LOGGER.info("Listing versions for file node ID {}", fileNodeId);
        RenditionPagingList result = renditionsApi.listRenditions(fileNodeId, where).getBody().getList();
        for (RenditionEntry renditionEntry: result.getEntries()) {
            LOGGER.info("Node rendition: " + renditionEntry.getEntry().toString());
        }

        return result;
    }
}
```

Executing this code looks like this, here we are listing renditions for a text file:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-renditions 0492460b-6269-4ca1-9668-0d934d2f3370                 

2021-04-29 13:58:25.387  INFO 19701 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.131 seconds (JVM running for 3.822)
2021-04-29 13:58:25.389  INFO 19701 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-renditions
2021-04-29 13:58:25.390  INFO 19701 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 13:58:25.391  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Listing versions for file node ID 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: avatar
    content: class ContentInfo {
        mimeType: image/png
        mimeTypeName: PNG Image
        sizeInBytes: null
        encoding: null
    }
    status: NOT_CREATED
}
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: avatar32
    content: class ContentInfo {
        mimeType: image/png
        mimeTypeName: PNG Image
        sizeInBytes: null
        encoding: null
    }
    status: NOT_CREATED
}
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: doclib
    content: class ContentInfo {
        mimeType: image/png
        mimeTypeName: PNG Image
        sizeInBytes: 222
        encoding: UTF-8
    }
    status: CREATED
}
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: imgpreview
    content: class ContentInfo {
        mimeType: image/jpeg
        mimeTypeName: JPEG Image
        sizeInBytes: null
        encoding: null
    }
    status: NOT_CREATED
}
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: medium
    content: class ContentInfo {
        mimeType: image/jpeg
        mimeTypeName: JPEG Image
        sizeInBytes: null
        encoding: null
    }
    status: NOT_CREATED
}
2021-04-29 13:58:25.703  INFO 19701 --- [           main] o.a.tutorial.restapi.ListRenditionsCmd   : Node rendition: class Rendition {
    id: pdf
    content: class ContentInfo {
        mimeType: application/pdf
        mimeTypeName: Adobe PDF Document
        sizeInBytes: 8472
        encoding: UTF-8
    }
    status: CREATED
}
```

We can see the renditions `id`, such as `pdf`. Some renditions are for things you see in the UI, such as
thumbnail and preview of document.

## Get file rendition content
To get the content for a file rendition the [`RenditionsApi.getRenditionContent`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/RenditionsApi.md#getRenditionContent){:target="_blank"}
method, which will download the content bytes for the file rendition.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#getrenditioncontent)

```java
import org.alfresco.core.handler.RenditionsApi;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.time.OffsetDateTime;

@Component
public class GetRenditionContentCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetRenditionContentCmd.class);

    @Autowired
    RenditionsApi renditionsApi;

    public void execute(String fileNodeId, String renditionId, String filePathOnDisk) throws IOException {
        Resource nodeContent = getRenditionContent(fileNodeId, renditionId);

        // Write rendition file to disk
        File targetFile = new File(filePathOnDisk);
        FileUtils.copyInputStreamToFile(nodeContent.getInputStream(), targetFile);
    }

    /**
     * Get rendition content info.
     *
     * @param nodeId        the id for the node that the rendition is for
     * @param renditionId   the id of the rendition that we want to fetch content for, such as doclib, pdf etc
     * @return Rendition content info object
     */
    private Resource getRenditionContent(String nodeId, String renditionId) throws IOException {
        // Relevant when using API call from web browser, true is the default
        Boolean attachment = true;
        // Only download if modified since this time, optional
        OffsetDateTime ifModifiedSince = null;
        // The Range header indicates the part of a rendition that the server should return.
        // Single part request supported, for example: bytes=1-10., optional
        String range = null;
        // If true and there is no rendition for this nodeId and renditionId, then the placeholder image for the
        // mimetype of this rendition is returned, rather than a 404 response
        Boolean placeholder = false;

        Resource result = renditionsApi.getRenditionContent(
                nodeId, renditionId, attachment, ifModifiedSince, range, placeholder).getBody();
        LOGGER.info("Got rendition {} size: {}", result.getFilename(), result.contentLength());

        return result;
    }
}
```
Executing this code and getting a `pdf` rendition for a text file looks like this:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-rendition-content 0492460b-6269-4ca1-9668-0d934d2f3370 pdf mytext.pdf 

2021-04-29 16:05:25.501  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.324 seconds (JVM running for 3.867)
2021-04-29 16:05:25.504  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-rendition-content
2021-04-29 16:05:25.506  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 16:05:25.506  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: pdf
2021-04-29 16:05:25.506  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[3]: mytext.pdf
2021-04-29 16:05:25.657  INFO 20077 --- [           main] o.a.t.restapi.GetRenditionContentCmd     : Got rendition pdf size: 8472
```

## Update metadata for a folder or file {#updatenodemetadata}
To update metadata for a node, such as a file or folder, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#updatemetadatanode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyUpdate;
import org.alfresco.core.model.NodeEntry;
import org.alfresco.core.model.PermissionsBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UpdateNodeMetadataCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(UpdateNodeMetadataCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId) throws IOException {
        Map<String, Object> properties = new HashMap<>();
        properties.put("cm:title", "UPDATED title");
        properties.put("cm:description", "UPDATED description");
        Node node = updateNode(nodeId, "newname.txt", properties, null, null);
    }

    /**
     * Update a node (such as file/folder).
     *
     * @param nodeId the id of the node that we want to update metadata for.
     * @param newName a new name for the node (sets cm:name)
     * @param properties the properties we want to update and their new values
     * @param aspectNames a list of aspect names to set the node, not that it needs to include all aspects as it will overwrite
     * @param permissionsBody permissions to set on the node
     * @return updated Node object
     */
    private Node updateNode(String nodeId,
                            String newName,
                            Map<String, Object> properties,
                            List<String> aspectNames,
                            PermissionsBody permissionsBody) {

        List<String> include = null;
        List<String> fields = null;

        NodeBodyUpdate nodeBodyUpdate = new NodeBodyUpdate();
        nodeBodyUpdate.setName(newName);
        nodeBodyUpdate.setProperties(properties);
        nodeBodyUpdate.setAspectNames(aspectNames);
        nodeBodyUpdate.setPermissions(permissionsBody);

        NodeEntry result = nodesApi.updateNode(nodeId, nodeBodyUpdate, include, fields).getBody();
        LOGGER.info("Updated node {}", result.getEntry());

        return result.getEntry();
    }
}
```

With the `updateNode` call we can update properties, aspects, and permissions for a node. Note that when updating
aspects you need to include the complete list of aspects that should be set on the node as this call overwrites. You can
fetch existing aspects with the [getNodeMetadata](#getnodemetadata) call. If you are adding an aspect that has properties,
then you can just add the properties and the aspect will be added automatically for you.

Executing this code result in this for a text file example:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar update-metadata 0492460b-6269-4ca1-9668-0d934d2f3370

2021-04-29 16:27:42.303  INFO 20246 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.185 seconds (JVM running for 3.683)
2021-04-29 16:27:42.306  INFO 20246 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: update-metadata
2021-04-29 16:27:42.308  INFO 20246 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-29 16:27:43.089  INFO 20246 --- [           main] o.a.t.restapi.UpdateNodeMetadataCmd      : Updated node class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-29T15:27:42.528Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:author, cm:thumbnailModification]
    properties: {cm:title=UPDATED title, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619613896873, pdf:1619701086215], cm:description=UPDATED description}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```
We can see the updated name and properties in the returned node object.

## Add aspects to a folder or file
To add aspects to a node, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method. The way you do this is described in the [update metadata for a node](#updatenodemetadata) section. Note that you
only need to add aspects to a node when they are so called "marker" aspects without properties.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#addaspectnode)

## Remove aspects from a folder or file
To remove aspects from a node, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method. The way you do this is described in the [update metadata for a node](#updatenodemetadata) section.

Removing an aspect from a node is similar to how you add a “marker” aspect. You first get the list of aspects currently
applied to the node. Then you remove the aspect from the list. And finally you use an update node call with the updated
aspect list.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#removeaspectsnode)

## Get and Set permissions for a folder or file {#setpermissionfornode}
To manage permissions for a node, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#setpermissionsnode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

In the following example we show how a node can be updated with new permissions for a group and a user.

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class SetNodePermissionsMetadataCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(SetNodePermissionsMetadataCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId) throws IOException {
        // First get current permissions
        PermissionsInfo currentPermissions = getNodePermissions(nodeId);

        // Update with permissions for a user and a group
        // Add current permissions first, it will overwrite so we need to add what's already set
        PermissionsBody permissionsBody = new PermissionsBody();
        permissionsBody.setIsInheritanceEnabled(true);
        permissionsBody.setLocallySet(currentPermissions.getLocallySet());
        PermissionElement engineeringGroupPermission = new PermissionElement();
        engineeringGroupPermission.setName("Collaborator");
        engineeringGroupPermission.setAuthorityId("GROUP_engineering");
        engineeringGroupPermission.setAccessStatus(PermissionElement.AccessStatusEnum.ALLOWED);
        permissionsBody.addLocallySetItem(engineeringGroupPermission);
        PermissionElement testUserPermission = new PermissionElement();
        testUserPermission.setName("Contributor");
        testUserPermission.setAuthorityId("tester");
        testUserPermission.setAccessStatus(PermissionElement.AccessStatusEnum.ALLOWED);
        permissionsBody.addLocallySetItem(testUserPermission);

        // Update permissions for node
        Node node = updateNodePermissions(nodeId, permissionsBody);
    }

    /**
     * Get node permissions.
     *
     * @param nodeId the id of the node that we want to get permissions for.
     * @return updated Node object
     */
    private PermissionsInfo getNodePermissions(String nodeId) {
        String relativePath = null;
        List<String> fields = null;
        List<String> include = new ArrayList<>();
        include.add("permissions");

        NodeEntry result = nodesApi.getNode(nodeId, include, relativePath, fields).getBody();
        LOGGER.info("Got node including permissions {}", result.getEntry());

        return result.getEntry().getPermissions();
    }

    /**
     * Update node permissions.
     *
     * @param nodeId the id of the node that we want to update permissions for.
     * @param permissionsBody permissions to set on the node
     * @return updated Node object
     */
    private Node updateNodePermissions(String nodeId,
                                       PermissionsBody permissionsBody) {

        List<String> include = new ArrayList<>();
        include.add("permissions");
        List<String> fields = null;

        NodeBodyUpdate nodeBodyUpdate = new NodeBodyUpdate();
        nodeBodyUpdate.setPermissions(permissionsBody);

        NodeEntry result = nodesApi.updateNode(nodeId, nodeBodyUpdate, include, fields).getBody();
        LOGGER.info("Updated node permissions {}", result.getEntry());

        return result.getEntry();
    }
}
```

Note that you have to first get the currently set permissions before you set the new ones. This is because the
update call will overwrite permissions already set. So we use the [getNodeMetadata](#getnodemetadata) call to get
already set node permissions.

Executing this code result in this for a text file example:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar update-permissions 0492460b-6269-4ca1-9668-0d934d2f3370

2021-04-30 09:32:02.206  INFO 21515 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.4 seconds (JVM running for 3.957)
2021-04-30 09:32:02.208  INFO 21515 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: update-permissions
2021-04-30 09:32:02.210  INFO 21515 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-04-30 09:32:02.509  INFO 21515 --- [           main] o.a.t.r.SetNodePermissionsMetadataCmd    : Got node including permissions class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-29T15:27:42.528Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:author, cm:thumbnailModification]
    properties: {cm:title=UPDATED title, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619613896873, pdf:1619701086215], cm:description=UPDATED description}
    allowableOperations: null
    path: null
    permissions: class PermissionsInfo {
        isInheritanceEnabled: true
        inherited: [class PermissionElement {
            authorityId: GROUP_EVERYONE
            name: Consumer
            accessStatus: ALLOWED
        }, class PermissionElement {
            authorityId: guest
            name: Consumer
            accessStatus: ALLOWED
        }]
        locallySet: null
        settable: [Contributor, Collaborator, Coordinator, Editor, Consumer]
    }
    definition: null
}
2021-04-30 09:32:02.708  INFO 21515 --- [           main] o.a.t.r.SetNodePermissionsMetadataCmd    : Updated node permissions class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-30T08:32:02.635Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:author, cm:thumbnailModification]
    properties: {cm:title=UPDATED title, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619613896873, pdf:1619701086215], cm:description=UPDATED description}
    allowableOperations: null
    path: null
    permissions: class PermissionsInfo {
        isInheritanceEnabled: true
        inherited: [class PermissionElement {
            authorityId: guest
            name: Consumer
            accessStatus: ALLOWED
        }, class PermissionElement {
            authorityId: GROUP_EVERYONE
            name: Consumer
            accessStatus: ALLOWED
        }]
        locallySet: [class PermissionElement {
            authorityId: GROUP_engineering
            name: Collaborator
            accessStatus: ALLOWED
        }, class PermissionElement {
            authorityId: tester
            name: Contributor
            accessStatus: ALLOWED
        }]
        settable: [Contributor, Collaborator, Coordinator, Editor, Consumer]
    }
    definition: null
}
```

We can see that before the permission update there were no locally set permissions for the node, only `inherited`. After
the update we see also the `locallySet` returned with the newly set permissions. Note that for the permission information
to be returned with each call we have to add `permissions` to the `include` parameter.

## Working with relationships between folders/files {#manageassociations}
To manage relationships (referred to as associations) between nodes use the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md){:target="_blank"}
and the following methods:

|Method|Description|
|------|-----------|
|[listNodeChildren](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listNodeChildren)|List primary parent-child associations, see [list folder content](#listfoldercontent) |
|[createSecondaryChildAssociation](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createSecondaryChildAssociation)|Create secondary parent-child association|
|[deleteSecondaryChildAssociation](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#deleteSecondaryChildAssociation)|Delete secondary parent-child association|
|[listSecondaryChildren](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listSecondaryChildren)|List secondary parent-child associations|
|[createAssociation](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createAssociation)|Create peer-2-peer association|
|[deleteAssociation](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#deleteAssociation)|Delete peer-2-peer association(s)|
|[listSourceAssociations](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listSourceAssociations)|List source peer-2-peer associations|
|[listTargetAssociations](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#listTargetAssociations)|List target peer-2-peer associations|

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#workingwithrelbetweennodes)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

Assuming we have deployed the [FDK content model]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#alfrescofdkcontentmodel)
with secondary parent-child and peer-2-peer association types, then the following code examples shows how to create those
types of associations (it also shows how to upload files, create folder, create node of different type):

>**Note**. this code assumes the following two files exists in current directory: `somepicture.png` and `sometext.txt`.

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.*;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Component
public class ManageAssociationsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ManageAssociationsCmd.class);

    @Autowired
    NodesApi nodesApi;

    private Boolean autoRename = true;
    private Boolean majorVersion = true;
    private Boolean versioningEnabled = true;
    private String updateComment = null;
    private String updatedName = null;
    private List<String> include = null;
    private List<String> fields = null;
    private List<String> orderBy = null;
    private Integer skipCount = 0;
    private Integer maxItems = 100;
    private String where = null;
    private Boolean includeSource = false;

    public void execute() throws IOException {
        // List all folders and files (primary parent-child associations) in /Company Home/Data Dictionary
        NodeChildAssociationPagingList primaryChildAssociations =
                listPrimaryChildAssociations("-root-", "/Data Dictionary");

        // Create gadget folder, gadget image, and gadget review
        Node gadgetFolderNode = createFolder("My Gadgets", "");
        Node gadgetPictureNode = uploadFile(gadgetFolderNode.getId(), "gadget-picture.png", "somepicture.png");
        Node gadgetReviewNode = uploadFile(gadgetFolderNode.getId(), "gadget-review.txt", "sometext.txt");

        // Create the Gadget company node
        Map<String, Object> properties = new HashMap<>();
        properties.put("fdk:email", "info@coolgadgets.com");
        properties.put("fdk:url","www.coolgadgets.com");
        properties.put("fdk:city","London");
        Node companyNode = createNode(gadgetFolderNode.getId(), "Cool Gadgets Inc","fdk:company", properties);

        // Create a gadget node with associations using the FDK content model
        List<ChildAssociationBody> secondaryParentChildAssociations = new ArrayList<>();
        ChildAssociationBody childAssoc = new ChildAssociationBody();
        childAssoc.assocType("fdk:images");
        childAssoc.setChildId(gadgetPictureNode.getId());
        secondaryParentChildAssociations.add(childAssoc);
        List<AssociationBody> peer2peerAssociations = new ArrayList<>();
        AssociationBody peer2peerAssoc = new AssociationBody();
        peer2peerAssoc.assocType("fdk:reviews");
        peer2peerAssoc.setTargetId(gadgetReviewNode.getId());
        peer2peerAssociations.add(peer2peerAssoc);
        AssociationBody peer2peerAssoc2 = new AssociationBody();
        peer2peerAssoc2.assocType("fdk:company");
        peer2peerAssoc2.setTargetId(companyNode.getId());
        peer2peerAssociations.add(peer2peerAssoc2);
        Node gadgetNode = createNodeWithAssociations(
                gadgetFolderNode.getId(),"My Gadget", "fdk:gadget",
                secondaryParentChildAssociations, peer2peerAssociations);

        // List secondary parent-child associations for a node
        NodeChildAssociationPagingList secondaryAssoc = listSecondaryChildAssociations(gadgetNode.getId());

        // List peer-2-peer associations for a node
        NodeAssociationPagingList targetAssoc = listPeer2PeerAssociations(gadgetNode.getId());
    }

    /**
     * List primary parent-child associations. Basically list folder contents.
     *
     * @param rootNodeId         the id of the folder node that is the root. If relativeFolderPath is null, then content in this folder will be listed. Besides node ID the aliases -my-, -root- and -shared- are also supported.
     * @param relativeFolderPath path relative rootNodeId, if this is not null, then the content of this folder will be listed
     * @return a list of child node objects contained in the folder, or null if not found
     */
    private NodeChildAssociationPagingList listPrimaryChildAssociations(String rootNodeId, String relativeFolderPath) {
        LOGGER.info("Listing primary child associations for folder {}{}", rootNodeId, relativeFolderPath);
        NodeChildAssociationPagingList result = nodesApi.listNodeChildren(rootNodeId, skipCount, maxItems, orderBy, where, include,
                relativeFolderPath, includeSource, fields).getBody().getList();
        for (NodeChildAssociationEntry childNodeAssoc: result.getEntries()) {
            LOGGER.info("Found primary child [name=" + childNodeAssoc.getEntry().getName() + "]");
        }

        return result;
    }

    /**
     * List secondary parent-child associations.
     *
     * @param nodeId         the node to list assoc for
     * @return a list of child node objects contained in the node, or null if not found
     */
    private NodeChildAssociationPagingList listSecondaryChildAssociations(String nodeId) {
        LOGGER.info("Listing secondary child associations for node {}", nodeId);
        NodeChildAssociationPagingList result = nodesApi.listSecondaryChildren(
                nodeId, where, include, skipCount, maxItems, includeSource, fields).getBody().getList();
        for (NodeChildAssociationEntry childNodeAssoc: result.getEntries()) {
            LOGGER.info("Found secondary child [name=" + childNodeAssoc.getEntry().getName() + "]");
        }

        return result;
    }

    /**
     * List peer-2-peer associations.
     *
     * @param nodeId         the node to list assoc for
     * @return a list of assoc objects associated with the node
     */
    private NodeAssociationPagingList listPeer2PeerAssociations(String nodeId) {
        LOGGER.info("Listing peer-2-peer associations for node {}", nodeId);
        NodeAssociationPagingList result = nodesApi.listTargetAssociations(
                nodeId, where, include, fields).getBody().getList();
        for (NodeAssociationEntry targetAssoc: result.getEntries()) {
            LOGGER.info("Found target [name=" + targetAssoc.getEntry().getName() + "]");
        }

        return result;
    }

    /**
     * Create a node with associations.
     *
     * @param parentNodeId the parent node id
     * @param nodeName     the name of the node
     * @param nodeType     the type of the node
     * @param secondaryParentChildAssociations a list of secondary parent-child associations that should be set up
     * @param peer2peerAssociations a list of peer-2-peer associations that should be set up
     * @return a node object for the newly created node, contains the ID,
     * such as e859588c-ae81-4c5e-a3b6-4c6109b6c905
     */
    private Node createNodeWithAssociations(
            String parentNodeId,
            String nodeName,
            String nodeType,
            List<ChildAssociationBody> secondaryParentChildAssociations,
            List<AssociationBody> peer2peerAssociations) {
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(nodeName);
        nodeBodyCreate.setNodeType(nodeType);
        nodeBodyCreate.setSecondaryChildren(secondaryParentChildAssociations);
        nodeBodyCreate.setTargets(peer2peerAssociations);
        Node node = nodesApi.createNode(parentNodeId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled,
                include, fields).getBody().getEntry();
        LOGGER.info("Created new node with associations: {}", node);

        return node;
    }

    /**
     * Make the remote call to create a folder in the repository, if it does not exist.
     *
     * @param folderName         the name of the folder
     * @param relativeFolderPath path relative to /Company Home
     * @return a node object for the newly created node, contains the ID,
     * such as e859588c-ae81-4c5e-a3b6-4c6109b6c905
     */
    private Node createFolder(String folderName,
                              String relativeFolderPath) {
        String nodeId = "-root-";
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(folderName);
        nodeBodyCreate.setNodeType("cm:folder");
        nodeBodyCreate.setRelativePath(relativeFolderPath);
        Node folderNode = nodesApi.createNode(nodeId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled,
                include, fields).getBody().getEntry();
        LOGGER.info("Created new folder: {}", folderNode);

        return folderNode;
    }

    /**
     * Create a node
     *
     * @param parentNodeId  the node id for parent folder
     * @param nodeName      the name of the node
     * @param nodeType      the type of the node
     * @return a node object for the newly created node, contains the ID,
     * such as e859588c-ae81-4c5e-a3b6-4c6109b6c905
     */
    private Node createNode(String parentNodeId,
                            String nodeName,
                            String nodeType,
                            Map<String, Object> properties) {
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(nodeName);
        nodeBodyCreate.setNodeType(nodeType);
        nodeBodyCreate.setProperties(properties);
        Node node = nodesApi.createNode(
                parentNodeId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled, include, fields).getBody().getEntry();
        LOGGER.info("Created new node: {}", node);

        return node;
    }

    /**
     * Upload a file from disk
     */
    private Node uploadFile(String folderId, String fileName, String filePath) {
        // Create the file node metadata
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(fileName);
        nodeBodyCreate.setNodeType("cm:content");
        Node fileNode = nodesApi.createNode(
                folderId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled, include, fields).getBody().getEntry();

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

}
```

Executing the above code will result in logs such as follows:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar manage-associations                                    

2021-04-30 16:26:22.678  INFO 22647 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.93 seconds (JVM running for 3.402)
2021-04-30 16:26:22.680  INFO 22647 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: manage-associations
2021-04-30 16:26:22.681  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Listing primary child associations for folder -root-/Data Dictionary
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Email Templates]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Imap Configs]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Messages]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Models]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Node Templates]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Presentation Templates]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Rendering Actions Space]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Replication Actions Space]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=RSS Templates]
2021-04-30 16:26:23.071  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Saved Searches]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Scheduled Actions]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Scripts]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Smart Folder Downloads]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Smart Folder Templates]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Solr Facets Space]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Space Templates]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Transfers]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Web Client Extension]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Web Scripts]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Web Scripts Extensions]
2021-04-30 16:26:23.072  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found primary child [name=Workflow Definitions]
2021-04-30 16:26:23.184  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Created new folder: class Node {
    id: e6bacba5-0dba-40af-afa0-ff25e10a18bb
    name: My Gadgets
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-30T15:26:23.129Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:26:23.129Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: e439190c-3fe0-48a1-8a9a-374fbc54b570
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:auditable]
    properties: null
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-30 16:26:23.482  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Created file with content: class Node {
    id: b9bf8f12-269f-46a3-97a8-16900644a7d6
    name: gadget-picture.png
    nodeType: cm:content
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-30T15:26:23.404Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:26:23.218Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: e6bacba5-0dba-40af-afa0-ff25e10a18bb
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: image/png
        mimeTypeName: PNG Image
        sizeInBytes: 14799
        encoding: UTF-8
    }
    aspectNames: [cm:versionable, cm:auditable]
    properties: {cm:versionLabel=2.0, cm:versionType=MAJOR}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-30 16:26:23.716  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Created file with content: class Node {
    id: bb35fdd6-f2f3-44e4-84c9-30e48efaf3d5
    name: gadget-review.txt
    nodeType: cm:content
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-30T15:26:23.644Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:26:23.507Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: e6bacba5-0dba-40af-afa0-ff25e10a18bb
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [cm:versionable, cm:auditable]
    properties: {cm:versionLabel=2.0, cm:versionType=MAJOR}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-30 16:26:23.918  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Created new node: class Node {
    id: 01c5e298-a6c2-4b5c-81e0-195172626e22
    name: Cool Gadgets Inc
    nodeType: fdk:company
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-30T15:26:23.772Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:26:23.772Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: e6bacba5-0dba-40af-afa0-ff25e10a18bb
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: application/octet-stream
        mimeTypeName: Binary File (Octet Stream)
        sizeInBytes: 0
        encoding: UTF-8
    }
    aspectNames: [cm:versionable, cm:auditable]
    properties: {fdk:email=info@coolgadgets.com, fdk:url=www.coolgadgets.com, cm:versionType=MAJOR, cm:versionLabel=1.0, fdk:city=London}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-30 16:26:24.133  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Created new node with associations: class Node {
    id: c5f329e8-7872-4e92-abe1-e7dd5f5f48ba
    name: My Gadget
    nodeType: fdk:gadget
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-30T15:26:23.950Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:26:23.950Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: e6bacba5-0dba-40af-afa0-ff25e10a18bb
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: application/octet-stream
        mimeTypeName: Binary File (Octet Stream)
        sizeInBytes: 0
        encoding: UTF-8
    }
    aspectNames: [cm:versionable, cm:auditable]
    properties: {cm:versionLabel=1.0, cm:versionType=MAJOR}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-30 16:26:24.134  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Listing secondary child associations for node c5f329e8-7872-4e92-abe1-e7dd5f5f48ba
2021-04-30 16:26:24.156  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found secondary child [name=gadget-picture.png]
2021-04-30 16:26:24.157  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Listing peer-2-peer associations for node c5f329e8-7872-4e92-abe1-e7dd5f5f48ba
2021-04-30 16:26:24.239  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found target [name=gadget-review.txt]
2021-04-30 16:26:24.239  INFO 22647 --- [           main] o.a.t.restapi.ManageAssociationsCmd      : Found target [name=Cool Gadgets Inc]
```

To create associations for existing nodes use the `createSecondaryChildAssociation` and `createAssociation` methods.

## Manage comments for a folder or file
To manage comments for a node, use the [`CommentsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/CommentsApi.md){:target="_blank"}
and the following methods:

|Method|Description|
|------|-----------|
|[createComment](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/CommentsApi.md#createComment)|Create a comment for a node| 
|[deleteComment](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/CommentsApi.md#deleteComment)|Delete a comment for a node| 
|[listComments](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/CommentsApi.md#listComments)|List comments for a node| 
|[updateComment](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/CommentsApi.md#updateComment)|Update a comment for a node| 

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#managecomments)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.CommentsApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ManageCommentsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ManageCommentsCmd.class);

    private Integer skipCount = 0;
    private Integer maxItems = 100;
    private List<String> fields = new ArrayList<>();

    // Fetch only the fields we are interested in
    public ManageCommentsCmd() {
        fields.add("content,createdAt");
    }

    @Autowired
    CommentsApi commentsApi;

    public void execute(String nodeId) throws IOException {
        Comment firstComment = createComment(nodeId, "First comment");
        Comment secondComment = createComment(nodeId, "Second comment");

        LOGGER.info("Listing comments: ");
        CommentPagingList comments = commentsApi.listComments(nodeId, skipCount, maxItems, fields).getBody().getList();
        for (CommentEntry commentEntry: comments.getEntries()) {
            LOGGER.info("    {}", commentEntry.getEntry());
        }
    }

    private Comment createComment(String nodeId, String text) {
        CommentBody commentBody = new CommentBody();
        commentBody.setContent(text);
        Comment comment = commentsApi.createComment(nodeId, commentBody, fields).getBody().getEntry();
        LOGGER.info("{}", comment);
        return comment;
    }
}
```

Note the use of the `fields` parameter to limit the number of fields returned with each call, which saves bandwidth.

Executing the code gives a log like follows:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar manage-comments 0492460b-6269-4ca1-9668-0d934d2f3370

2021-05-03 18:54:48.085  INFO 26804 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.075 seconds (JVM running for 3.55)
2021-05-03 18:54:48.087  INFO 26804 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: manage-comments
2021-05-03 18:54:48.088  INFO 26804 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-05-03 18:54:48.373  INFO 26804 --- [           main] o.a.tutorial.restapi.ManageCommentsCmd   : class Comment {
    id: null
    title: null
    content: First comment
    createdBy: null
    createdAt: 2021-05-03T17:54:48.224Z
    edited: null
    modifiedBy: null
    modifiedAt: null
    canEdit: null
    canDelete: null
}
2021-05-03 18:54:48.492  INFO 26804 --- [           main] o.a.tutorial.restapi.ManageCommentsCmd   : class Comment {
    id: null
    title: null
    content: Second comment
    createdBy: null
    createdAt: 2021-05-03T17:54:48.417Z
    edited: null
    modifiedBy: null
    modifiedAt: null
    canEdit: null
    canDelete: null
}
2021-05-03 18:54:48.492  INFO 26804 --- [           main] o.a.tutorial.restapi.ManageCommentsCmd   : Listing comments: 
2021-05-03 18:54:48.545  INFO 26804 --- [           main] o.a.tutorial.restapi.ManageCommentsCmd   :     class Comment {
    id: null
    title: null
    content: Second comment
    createdBy: null
    createdAt: 2021-05-03T17:54:48.417Z
    edited: null
    modifiedBy: null
    modifiedAt: null
    canEdit: null
    canDelete: null
}
2021-05-03 18:54:48.545  INFO 26804 --- [           main] o.a.tutorial.restapi.ManageCommentsCmd   :     class Comment {
    id: null
    title: null
    content: First comment
    createdBy: null
    createdAt: 2021-05-03T17:54:48.224Z
    edited: null
    modifiedBy: null
    modifiedAt: null
    canEdit: null
    canDelete: null
}
```

## Manage tags for a folder or file
To manage tags for a node, use the [`TagsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md){:target="_blank"}
and the following methods:

|Method|Description|
|------|-----------|
[createTagForNode](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#createTagForNode){:target="_blank"}|Create a tag for a node|
[deleteTagFromNode](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#deleteTagFromNode){:target="_blank"}|Delete a tag from a node|
[getTag](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#getTag){:target="_blank"}|Get a tag|
[listTags](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#listTags){:target="_blank"}|List tags|
[listTagsForNode](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#listTagsForNode){:target="_blank"}|List tags for a node|
[updateTag](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TagsApi.md#updateTag){:target="_blank"}|Update a tag|

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#managecomments)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.TagsApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ManageTagsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ManageTagsCmd.class);

    private Integer skipCount = 0;
    private Integer maxItems = 100;
    private List<String> fields = null;
    private List<String> include = new ArrayList<>();

    // Include an extra field with tag count
    public ManageTagsCmd() {
        include.add("count");
    }

    @Autowired
    TagsApi tagsApi;

    public void execute(String nodeId) throws IOException {
        Tag firstTag = createTag(nodeId, "tag-one");
        Tag secondTag = createTag(nodeId, "tag-two");

        LOGGER.info("Listing tags for the whole repository: ");
        TagPagingList repoTags = tagsApi.listTags(skipCount, maxItems, fields, include).getBody().getList();
        for (TagEntry repoTagEntry: repoTags.getEntries()) {
            LOGGER.info("    {} count: {}", repoTagEntry.getEntry().getTag(), repoTagEntry.getEntry().getCount());
        }

        LOGGER.info("Listing tags for node: {}", nodeId);
        TagPagingList nodeTags = tagsApi.listTagsForNode(nodeId, skipCount, maxItems, fields).getBody().getList();
        for (TagEntry nodeTagEntry: nodeTags.getEntries()) {
            LOGGER.info("    {}", nodeTagEntry.getEntry());
        }
    }

    private Tag createTag(String nodeId, String text) {
        TagBody tagBody = new TagBody();
        tagBody.setTag(text);
        Tag tag = tagsApi.createTagForNode(nodeId, tagBody, fields).getBody().getEntry();
        LOGGER.info("Created Tag {}", tag);
        return tag;
    }
}
```
Executing the code gives a log like follows:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar manage-tags 0492460b-6269-4ca1-9668-0d934d2f3370

2021-05-04 09:56:25.846  INFO 27655 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.884 seconds (JVM running for 3.333)
2021-05-04 09:56:25.848  INFO 27655 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: manage-tags
2021-05-04 09:56:25.849  INFO 27655 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-05-04 09:56:26.073  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       : Created Tag class Tag {
    id: a6da6c4d-cb6b-41b5-a010-7188459dd3cb
    tag: tag-one
    count: null
}
2021-05-04 09:56:26.175  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       : Created Tag class Tag {
    id: 9a9044c9-3787-44ca-bd92-c6797c9a82ae
    tag: tag-two
    count: null
}
2021-05-04 09:56:26.175  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       : Listing tags for the whole repository: 
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     activiti count: 3
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     aps count: 1
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     tag-one count: null
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     tag-two count: null
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     white-paper count: 2
2021-05-04 09:56:26.288  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       : Listing tags for node: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-05-04 09:56:26.310  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     class Tag {
    id: a6da6c4d-cb6b-41b5-a010-7188459dd3cb
    tag: tag-one
    count: null
}
2021-05-04 09:56:26.310  INFO 27655 --- [           main] o.a.tutorial.restapi.ManageTagsCmd       :     class Tag {
    id: 9a9044c9-3787-44ca-bd92-c6797c9a82ae
    tag: tag-two
    count: null
}
```

Note that the tag count are not available directly after you have created the tag. It has to be indexed first.

## Copy folders and files
To copy a node, such as a file or folder, use the `copyNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#copyNode){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#copynode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyCopy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class CopyNodeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CopyNodeCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId, String parentFolderNodeId) throws IOException {
        List<String> include = new ArrayList<>();
        List<String> fields = null;

        include.add("path"); // add extra path property in response so we can see location of node

        Node node = nodesApi.getNode(nodeId, include, null, fields).getBody().getEntry();
        LOGGER.info("Got node we want to copy ID: {} Parent: {} Location: {}",
                node.getId(), node.getParentId(), node.getPath().getName());

        NodeBodyCopy nodeBodyCopy = new NodeBodyCopy();
        nodeBodyCopy.setTargetParentId(parentFolderNodeId);
        Node copiedNode = nodesApi.copyNode(nodeId, nodeBodyCopy, include, fields).getBody().getEntry();
        LOGGER.info("Copied node ID: {} Parent: {} Location: {}",
                copiedNode.getId(), copiedNode.getParentId(), copiedNode.getPath().getName());
    }
}
```

Executing this code would give the following result, passing in node to copy and target folder node:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar copy-node 0492460b-6269-4ca1-9668-0d934d2f3370 7f041db0-fdb6-4185-b921-2fb9ed381480

2021-05-04 10:52:16.741  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.667 seconds (JVM running for 4.218)
2021-05-04 10:52:16.743  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: copy-node
2021-05-04 10:52:16.745  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-05-04 10:52:16.745  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 7f041db0-fdb6-4185-b921-2fb9ed381480
2021-05-04 10:52:16.974  INFO 28353 --- [           main] o.alfresco.tutorial.restapi.CopyNodeCmd  : Got node we want to copy ID: 0492460b-6269-4ca1-9668-0d934d2f3370 Parent: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445 Location: /Company Home/Guest Home
2021-05-04 10:52:17.366  INFO 28353 --- [           main] o.alfresco.tutorial.restapi.CopyNodeCmd  : Copied node ID: fe955da0-c4e5-42d3-972f-697424b546b1 Parent: 7f041db0-fdb6-4185-b921-2fb9ed381480 Location: /Company Home/Imap Attachments
```

Note the new node ID for the copy in the response.

Note that we set the `include` parameter to `path` so the location of the node is returned.
The following extra information is returned:

```bash
Location: class PathInfo {
    elements: [class PathElement {
        id: e439190c-3fe0-48a1-8a9a-374fbc54b570
        name: Company Home
        nodeType: cm:folder
        aspectNames: [cm:titled, cm:auditable, app:uifacets]
    }, class PathElement {
        id: 7f041db0-fdb6-4185-b921-2fb9ed381480
        name: Imap Attachments
        nodeType: cm:folder
        aspectNames: [cm:titled, cm:auditable, app:uifacets]
    }]
    name: /Company Home/Imap Attachments
    isComplete: true
}
```

## Move folders and files
To copy a node, such as a file or folder, use the `moveNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#moveNode){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#movenode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyMove;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class MoveNodeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(MoveNodeCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId, String parentFolderNodeId) throws IOException {
        List<String> include = new ArrayList<>();
        List<String> fields = null;

        include.add("path"); // add extra path property in response so we can see location of node

        Node node = nodesApi.getNode(nodeId, include, null, fields).getBody().getEntry();
        LOGGER.info("Got node before move ID: {} Parent: {} Location: {}",
                node.getId(), node.getParentId(), node.getPath().getName());

        NodeBodyMove nodeBodyMove = new NodeBodyMove();
        nodeBodyMove.setTargetParentId(parentFolderNodeId);
        Node movedNode = nodesApi.moveNode(nodeId, nodeBodyMove, include, fields).getBody().getEntry();
        LOGGER.info("Moved node ID: {} Parent: {} Location: {}",
                movedNode.getId(), movedNode.getParentId(), movedNode.getPath().getName());
    }
}

```

Executing this code would give the following result, passing in node to copy and target folder node:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar move-node d11d6970-c5c4-4edd-9971-593a23b9344f 7f041db0-fdb6-4185-b921-2fb9ed381480

2021-05-04 10:45:47.080  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.103 seconds (JVM running for 3.568)
2021-05-04 10:45:47.081  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: move-node
2021-05-04 10:45:47.082  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: d11d6970-c5c4-4edd-9971-593a23b9344f
2021-05-04 10:45:47.082  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 7f041db0-fdb6-4185-b921-2fb9ed381480
2021-05-04 10:45:47.276  INFO 28288 --- [           main] o.alfresco.tutorial.restapi.MoveNodeCmd  : Got node before move ID: d11d6970-c5c4-4edd-9971-593a23b9344f Parent: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445 Location: /Company Home/Guest Home
2021-05-04 10:45:47.458  INFO 28288 --- [           main] o.alfresco.tutorial.restapi.MoveNodeCmd  : Moved node ID: d11d6970-c5c4-4edd-9971-593a23b9344f Parent: 7f041db0-fdb6-4185-b921-2fb9ed381480 Location: /Company Home/Imap Attachments
```

Note that the node ID in the response is the same as passed in node ID, it is just the location of the node that
has changed when moving it.

Note that we set the `include` parameter to `path` so the location of the node is returned.
The following extra information is returned:

```bash
Location: class PathInfo {
    elements: [class PathElement {
        id: e439190c-3fe0-48a1-8a9a-374fbc54b570
        name: Company Home
        nodeType: cm:folder
        aspectNames: [cm:titled, cm:auditable, app:uifacets]
    }, class PathElement {
        id: 7f041db0-fdb6-4185-b921-2fb9ed381480
        name: Imap Attachments
        nodeType: cm:folder
        aspectNames: [cm:titled, cm:auditable, app:uifacets]
    }]
    name: /Company Home/Imap Attachments
    isComplete: true
}
```

## Lock a file for editing
To lock a file for editing, use the `lockNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#lockNode){:target="_blank"}.
Use the `unlockNode` method when you are finished editing the node.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#locknode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyLock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class LockNodeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(LockNodeCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId) throws IOException {
        List<String> include = null;
        List<String> fields = null;

        Node node = nodesApi.getNode(nodeId, include, null, fields).getBody().getEntry();
        LOGGER.info("Got node we want to lock ID: {} Is locked ?: {}", node.getId(), node.isIsLocked());

        if (!node.isIsLocked()) {
            // Lock the file with exclusive lock
            NodeBodyLock nodeBodyLock = new NodeBodyLock();
            Node lockedNode = nodesApi.lockNode(nodeId, nodeBodyLock, include, fields).getBody().getEntry();
            LOGGER.info("Locked node: {}", lockedNode);

            // Do the work on the file

            // Unlock the file
            Node unLockedNode = nodesApi.unlockNode(nodeId, include, fields).getBody().getEntry();
            LOGGER.info("Unlocked node: {}", unLockedNode);

        }
    }
}
```

Executing this code would give the following result, passing in node to lock:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar lock-node 0492460b-6269-4ca1-9668-0d934d2f3370                                 

2021-05-04 11:12:51.070  INFO 28630 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.722 seconds (JVM running for 4.523)
2021-05-04 11:12:51.072  INFO 28630 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: lock-node
2021-05-04 11:12:51.074  INFO 28630 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 0492460b-6269-4ca1-9668-0d934d2f3370
2021-05-04 11:12:51.285  INFO 28630 --- [           main] o.alfresco.tutorial.restapi.LockNodeCmd  : Got node we want to lock ID: 0492460b-6269-4ca1-9668-0d934d2f3370 Is locked ?: false
2021-05-04 11:12:51.671  INFO 28630 --- [           main] o.alfresco.tutorial.restapi.LockNodeCmd  : Locked node: class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-05-04T08:56:26.135Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, acme:securityClassified, cm:taggable, cm:thumbnailModification, fm:discussable, cm:titled, cm:lockable, cm:auditable, fm:commentsRollup, cm:author]
    properties: {cm:lockType=WRITE_LOCK, cm:title=UPDATED title, cm:lockOwner={id=admin, displayName=Administrator}, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, cm:lockLifetime=PERSISTENT, fm:commentCount=2, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619613896873, pdf:1619701086215], cm:description=UPDATED description, cm:taggable=[a6da6c4d-cb6b-41b5-a010-7188459dd3cb, 9a9044c9-3787-44ca-bd92-c6797c9a82ae]}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-05-04 11:12:51.743  INFO 28630 --- [           main] o.alfresco.tutorial.restapi.LockNodeCmd  : Unlocked node: class Node {
    id: 0492460b-6269-4ca1-9668-0d934d2f3370
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-05-04T08:56:26.135Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-28T12:02:33.143Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 8fa4e27d-35aa-411d-8bbe-831b6ed0c445
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, acme:securityClassified, cm:taggable, cm:thumbnailModification, fm:discussable, cm:titled, cm:auditable, fm:commentsRollup, cm:author]
    properties: {cm:title=UPDATED title, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=3.0, fm:commentCount=2, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1619613896873, pdf:1619701086215], cm:description=UPDATED description, cm:taggable=[a6da6c4d-cb6b-41b5-a010-7188459dd3cb, 9a9044c9-3787-44ca-bd92-c6797c9a82ae]}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

Note that the `lockNode` call response contains some extra parameters with lock information, such as
`cm:lockType=WRITE_LOCK` and `cm:lockOwner={id=admin, displayName=Administrator}`.

## Create a link to a file
To create a link to a file, use the `createNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"}
and create a node of the type `app:filelink`.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#linknode)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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
public class LinkFileCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(LinkFileCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String parentFolderNodeId, String linkToNodeId) throws IOException {
        Map<String, String> linkProps = new HashMap<>();
        linkProps.put("cm:destination", linkToNodeId); // Link points to this file node

        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName("Link to a text file");
        nodeBodyCreate.setNodeType("app:filelink"); // Out-of-the-box content model type for a file link
        nodeBodyCreate.setProperties(linkProps);

        Boolean autoRename = true;
        List<String> include = new ArrayList<>();
        List<String> fields = null;
        Boolean majorVersion = true;
        Boolean versioningEnabled = true;

        // Include the isLink property in the response so we can see if a node is a link
        include.add("isLink");

        Node fileLinkNode = nodesApi.createNode(parentFolderNodeId, nodeBodyCreate, autoRename, majorVersion,
                versioningEnabled, include, fields).getBody().getEntry();
        LOGGER.info("File link: {}", fileLinkNode);
    }
}
```

Executing this code would give the following result, passing in parent folder and node to link:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar link-file 7f041db0-fdb6-4185-b921-2fb9ed381480 48413f7a-066d-4e38-b2e6-c84ede635493

2021-05-04 13:27:43.981  INFO 29404 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 4.237 seconds (JVM running for 4.904)
2021-05-04 13:27:43.983  INFO 29404 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: link-file
2021-05-04 13:27:43.985  INFO 29404 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 7f041db0-fdb6-4185-b921-2fb9ed381480
2021-05-04 13:27:43.985  INFO 29404 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 48413f7a-066d-4e38-b2e6-c84ede635493
2021-05-04 13:27:44.329  INFO 29404 --- [           main] o.alfresco.tutorial.restapi.LinkFileCmd  : File link: class Node {
    id: c4ab808f-f42b-42a8-b308-d5d82df29830
    name: Link to a text file
    nodeType: app:filelink
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-05-04T12:27:44.166Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-05-04T12:27:44.166Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 7f041db0-fdb6-4185-b921-2fb9ed381480
    isLink: true
    isFavorite: null
    content: null
    aspectNames: [cm:auditable]
    properties: {cm:destination=48413f7a-066d-4e38-b2e6-c84ede635493}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

Note that the `include` parameter has been populated with the `isLink` value, which means the response will contain
a value for the `isLink` property.

## Delete a folder or file
To delete a folder or a file node, use the `deleteNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#deleteNode){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#deletenode)

```java
import org.alfresco.core.handler.NodesApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class DeleteNodeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(DeleteNodeCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String nodeId) throws IOException {
        // If true, then the node is deleted permanently, without moving to the trashcan.
        // Only the owner of the node or an admin can permanently delete the node.
        // default value = false
        Boolean permanent = false;

        ResponseEntity<Void> deletedNodeResponse = nodesApi.deleteNode(nodeId, permanent);
        LOGGER.info("Deleted node response: {}", deletedNodeResponse);
    }
}
```

Executing this code would give the following result, passing in the node to delete:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar delete-node fe955da0-c4e5-42d3-972f-697424b546b1                                   

2021-05-04 13:47:10.376  INFO 29542 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.639 seconds (JVM running for 4.406)
2021-05-04 13:47:10.377  INFO 29542 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: delete-node
2021-05-04 13:47:10.379  INFO 29542 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: fe955da0-c4e5-42d3-972f-697424b546b1
2021-05-04 13:47:10.787  INFO 29542 --- [           main] o.a.tutorial.restapi.DeleteNodeCmd       : Deleted node response: 
  <204 NO_CONTENT No Content,[cache-control:"no-cache", connection:"keep-alive", content-type:"application/json;charset=UTF-8", date:"Tue, 04 May 2021 12:47:10 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]>
```

## List deleted folders and files (Trashcan)
To list deleted nodes, use the `listDeletedNodes` method of the [`TrashcanApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TrashcanApi.md#listDeletedNodes){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#listdeletedfiles)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.TrashcanApi;
import org.alfresco.core.model.DeletedNodeEntry;
import org.alfresco.core.model.DeletedNodesPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ListDeletedNodesCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListDeletedNodesCmd.class);

    @Autowired
    TrashcanApi trashcanApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> include = new ArrayList<>();
        include.add("path");

        LOGGER.info("Listing soft deleted nodes in the trashcan:");
        DeletedNodesPaging deletedNodes = trashcanApi.listDeletedNodes(skipCount, maxItems, include).getBody();
        for (DeletedNodeEntry deletedNodeEntry: deletedNodes.getList().getEntries()) {
            LOGGER.info("    Deleted node: {}", deletedNodeEntry.getEntry());
        }
    }
}
```

Executing this code would list the soft deleted nodes that exist in the so called "Trashcan":

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-deleted-nodes                                       

2021-05-05 09:38:54.983  INFO 14986 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 4.404 seconds (JVM running for 4.861)
2021-05-05 09:38:54.985  INFO 14986 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-deleted-nodes
2021-05-05 09:38:54.986  INFO 14986 --- [           main] o.a.t.restapi.ListDeletedNodesCmd        : Listing soft deleted nodes in the trashcan:
2021-05-05 09:38:55.333  INFO 14986 --- [           main] o.a.t.restapi.ListDeletedNodesCmd        :     Deleted node: class DeletedNode {
    id: d32e1b4b-2ae0-48c2-9ee7-6323f8f4e96b
    name: My Gadgets
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-30T15:46:17.334Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-30T15:46:16.332Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: null
    isLink: null
    isFavorite: null
    content: null
    aspectNames: null
    properties: null
    allowableOperations: null
    path: class PathInfo {
        elements: [class PathElement {
            id: e439190c-3fe0-48a1-8a9a-374fbc54b570
            name: Company Home
            nodeType: cm:folder
            aspectNames: [cm:titled, cm:auditable, app:uifacets]
        }]
        name: /Company Home
        isComplete: true
    }
    permissions: null
    definition: null
    archivedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    archivedAt: 2021-05-05T08:36:11.141Z
}
2021-05-05 09:38:55.333  INFO 14986 --- [           main] o.a.t.restapi.ListDeletedNodesCmd        :     Deleted node: class DeletedNode {
    id: fe955da0-c4e5-42d3-972f-697424b546b1
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-05-04T09:52:17.053Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-05-04T09:52:17.053Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: null
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: null
    properties: null
    allowableOperations: null
    path: class PathInfo {
        elements: [class PathElement {
            id: e439190c-3fe0-48a1-8a9a-374fbc54b570
            name: Company Home
            nodeType: cm:folder
            aspectNames: [cm:titled, cm:auditable, app:uifacets]
        }, class PathElement {
            id: 7f041db0-fdb6-4185-b921-2fb9ed381480
            name: Imap Attachments
            nodeType: cm:folder
            aspectNames: [cm:titled, cm:auditable, app:uifacets]
        }]
        name: /Company Home/Imap Attachments
        isComplete: true
    }
    permissions: null
    definition: null
    archivedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    archivedAt: 2021-05-04T12:47:10.524Z
}
```

Note the extra properties at the end that tells you when the node was soft deleted and by who (i.e. `archivedAt` and
`archivedByUser`). Also, by setting the `include` parameter to `path` we get information about where the node was located
before it was deleted (i.e. `path.name`)

## Restore deleted folders and files (Trashcan)
To list deleted nodes, use the `restoreDeletedNode` method of the [`TrashcanApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/TrashcanApi.md#restoreDeletedNode){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#restorefile)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.TrashcanApi;
import org.alfresco.core.model.DeletedNodeBodyRestore;
import org.alfresco.core.model.NodeEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class RestoreDeletedNodeCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(RestoreDeletedNodeCmd.class);

    @Autowired
    TrashcanApi trashcanApi;

    public void execute(String nodeId, String restoreFolderId) throws IOException {
        List<String> fields = null;

        // POST body need to ne supplied with target folder ID
        DeletedNodeBodyRestore deletedNodeBodyRestore = new DeletedNodeBodyRestore();
        deletedNodeBodyRestore.setTargetParentId(restoreFolderId);
        deletedNodeBodyRestore.setAssocType("cm:contains");
        NodeEntry restoredNode = trashcanApi.restoreDeletedNode(nodeId, fields, deletedNodeBodyRestore).getBody();
        LOGGER.info("Restored node: {}", restoredNode.getEntry());
    }
}
```

Executing this code would restore a node with passed in ID. The location folder ID is also passed in:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar restore-deleted-node b717304b-1c07-400b-b8a8-3268ea79c49f 7f041db0-fdb6-4185-b921-2fb9ed381480

2021-05-05 09:46:19.805  INFO 15098 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.033 seconds (JVM running for 3.498)
2021-05-05 09:46:19.807  INFO 15098 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: restore-deleted-node
2021-05-05 09:46:19.808  INFO 15098 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: b717304b-1c07-400b-b8a8-3268ea79c49f
2021-05-05 09:46:19.808  INFO 15098 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 7f041db0-fdb6-4185-b921-2fb9ed381480
2021-05-05 09:46:20.436  INFO 15098 --- [           main] o.a.t.restapi.RestoreDeletedNodeCmd      : Restored node: class Node {
    id: b717304b-1c07-400b-b8a8-3268ea79c49f
    name: newname.txt
    nodeType: acme:document
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-05-04T09:19:49.903Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-05-04T09:19:49.903Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 7f041db0-fdb6-4185-b921-2fb9ed381480
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 30
        encoding: ISO-8859-1
    }
    aspectNames: [rn:renditioned, cm:versionable, cm:titled, cm:auditable, acme:securityClassified, cm:taggable, cm:author, cm:thumbnailModification]
    properties: {cm:title=UPDATED title, cm:versionType=MAJOR, acme:documentId=DOC-001, cm:versionLabel=1.0, acme:securityClassification=Company Confidential, cm:lastThumbnailModification=[doclib:1620120715749], cm:description=UPDATED description, cm:taggable=[a6da6c4d-cb6b-41b5-a010-7188459dd3cb, 9a9044c9-3787-44ca-bd92-c6797c9a82ae]}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

## === Managing Sites ===
The following sections walk through how to use the Java ReST API wrapper services when managing Alfresco Share sites.

## Create a site
To create an Alfresco Share site in the repository use the `createSite` method of the
[`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/SitesApi.md#createSite){:target="_blank"},
which is the main API used to create and manage sites.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/sites.md %}#createsite)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

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
## List site containers
For more information about how to list site containers, such as Document Library, for a site see
[add content to site](#addsitecontent).

## Add content to a site {#addsitecontent}
Adding content to a site uses the same API calls as are used to create folders and upload files elsewhere in the Repository.
See [create folder](#createfolder) and [upload file](#uploadfile) for more information.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/sites.md %}#addcontent)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

The tricky bit is to figure out how to add content to the so called "Document Library" of a site. We can figure out the
Node ID for the Document Library by using the `listSiteContainers` method of the [`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/SitesApi.md#listSiteContainers){:target="_blank"}:

```java
import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.handler.SitesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class AddSiteContentCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(AddSiteContentCmd.class);

    Integer skipCount = 0;
    Integer maxItems = 100;
    private List<String> fields = null;
    private List<String> include = null;
    private Boolean autoRename = true;
    private Boolean majorVersion = true;
    private Boolean versioningEnabled = true;

    @Autowired
    SitesApi sitesApi;

    @Autowired
    NodesApi nodesApi;

    public void execute(String siteId) throws IOException {
        // First get the Node ID for the Document Library
        String docLibNodeId = null;
        SiteContainerPaging siteContainerPaging = sitesApi.listSiteContainers(siteId, skipCount, maxItems, fields).getBody();
        LOGGER.info("Listing site containers [{}]: ", siteId);
        for (SiteContainerEntry siteContainerEntry: siteContainerPaging.getList().getEntries()) {
            SiteContainer siteContainer = siteContainerEntry.getEntry();
            LOGGER.info("  Site container: {}", siteContainer);
            if (siteContainer.getFolderId().equalsIgnoreCase("DocumentLibrary")) {
                docLibNodeId = siteContainer.getId();
            }
        }

        if (docLibNodeId != null) {
            // Create a folder in the document library
            createFolder(docLibNodeId, "White papers");
        } else {
            LOGGER.info("Document library not found in site {}", siteId);
        }
    }

    /**
     * Make the remote call to create a folder in the repository, if it does not exist.
     *
     * @param parentFolderId the node ID for the site container
     * @param folderName         the name of the folder
     * @return a node object for the newly created node, contains the ID,
     * such as e859588c-ae81-4c5e-a3b6-4c6109b6c905
     */
    private Node createFolder(String parentFolderId,
                              String folderName) {
        NodeBodyCreate nodeBodyCreate = new NodeBodyCreate();
        nodeBodyCreate.setName(folderName);
        nodeBodyCreate.setNodeType("cm:folder");
        Node folderNode = nodesApi.createNode(parentFolderId, nodeBodyCreate, autoRename, majorVersion, versioningEnabled,
                include, fields).getBody().getEntry();
        LOGGER.info("Created new folder in DocLib: {}", folderNode);

        return folderNode;
    }
}
```

Executing this code will create a folder in the passed in site's document library:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar add-site-content test

2021-05-05 10:43:34.208  INFO 16095 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.019 seconds (JVM running for 3.46)
2021-05-05 10:43:34.210  INFO 16095 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: add-site-content
2021-05-05 10:43:34.211  INFO 16095 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: test
2021-05-05 10:43:34.390  INFO 16095 --- [           main] o.a.tutorial.restapi.AddSiteContentCmd   : Listing site containers [test]: 
2021-05-05 10:43:34.391  INFO 16095 --- [           main] o.a.tutorial.restapi.AddSiteContentCmd   :   Site container: class SiteContainer {
    id: 605e085c-92ae-4a53-b902-99c7d215f475
    folderId: documentLibrary
}
2021-05-05 10:43:34.833  INFO 16095 --- [           main] o.a.tutorial.restapi.AddSiteContentCmd   : Created new folder in DocLib: class Node {
    id: 6e157336-068a-4384-bc29-e4e1ca09cc6c
    name: White papers
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-05-05T09:43:34.660Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-05-05T09:43:34.660Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 605e085c-92ae-4a53-b902-99c7d215f475
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:auditable]
    properties: null
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
```

## Adding members to a site
Adding members to a site uses the `createSiteMembership` method of the [`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/SitesApi.md#createSiteMembership){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/sites.md %}#addmemberstosite)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.SitesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

import static org.alfresco.core.model.SiteMembershipBodyCreate.RoleEnum.SITECOLLABORATOR;

@Component
public class AddSiteMembersCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(AddSiteMembersCmd.class);

    private List<String> fields = null;

    @Autowired
    SitesApi sitesApi;

    public void execute(String siteId, String personId) throws IOException {
        SiteMembershipBodyCreate siteMembershipBodyCreate = new SiteMembershipBodyCreate();
        siteMembershipBodyCreate.setId(personId);
        siteMembershipBodyCreate.setRole(SITECOLLABORATOR);
        SiteMemberEntry siteMemberEntry = sitesApi.createSiteMembership(siteId, siteMembershipBodyCreate, fields).getBody();
        LOGGER.info("Created site membership {}", siteMemberEntry);
    }
}
```

Executing this code will add a user with passed in ID with role *Site Collaborator* to site with passed in ID:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar add-site-member test test

2021-05-05 13:21:31.290  INFO 17933 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.923 seconds (JVM running for 3.377)
2021-05-05 13:21:31.291  INFO 17933 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: add-site-member
2021-05-05 13:21:31.292  INFO 17933 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: test
2021-05-05 13:21:31.293  INFO 17933 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: test
2021-05-05 13:21:31.697  INFO 17933 --- [           main] o.a.tutorial.restapi.AddSiteMembersCmd   : Created site membership class SiteMemberEntry {
    entry: class SiteMember {
        id: test
        person: class Person {
            id: test
            firstName: Test
            lastName: User
            displayName: Test User
            description: null
            avatarId: null
            email: test@example.com
            skypeId: null
            googleId: null
            instantMessageId: null
            jobTitle: null
            location: null
            company: class Company {
                organization: null
                address1: null
                address2: null
                address3: null
                postcode: null
                telephone: null
                fax: null
                email: null
            }
            mobile: null
            telephone: null
            statusUpdatedAt: null
            userStatus: null
            enabled: true
            emailNotificationsEnabled: true
            aspectNames: null
            properties: null
            capabilities: class Capabilities {
                isAdmin: false
                isGuest: false
                isMutable: true
            }
        }
        role: SiteCollaborator
        isMemberOfGroup: false
    }
}
```

## === Managing People and Groups ===
The following sections walk through how to use the Java ReST API wrapper services when managing users and groups. Note
that these are usually managed via a directory server (LDAP/Active Directory).

## List people (users)
Listing people uses the `listPeople` method of the [`PeopleApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#listPeople){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#listusers)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.PeopleApi;
import org.alfresco.core.model.PersonEntry;
import org.alfresco.core.model.PersonPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListPeopleCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListPeopleCmd.class);

    @Autowired
    PeopleApi peopleApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> orderBy = null;
        List<String> include = null;
        List<String> fields = null;

        LOGGER.info("Listing people in the repository");
        PersonPaging people = peopleApi.listPeople(skipCount, maxItems, orderBy, include, fields).getBody();
        for (PersonEntry personEntry: people.getList().getEntries()) {
            LOGGER.info("  {} ({})", personEntry.getEntry().getDisplayName(), personEntry.getEntry().getId());
        }
    }
}
```

Executing this code will list all users in the repository (note, if connected to LDAP this could be a lot of users...):

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-people

2021-05-05 13:42:15.547  INFO 18327 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.426 seconds (JVM running for 3.96)
2021-05-05 13:42:15.549  INFO 18327 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-people
2021-05-05 13:42:15.550  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       : Listing people in the repository
2021-05-05 13:42:15.879  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       :   Alice Beecher (abeecher)
2021-05-05 13:42:15.880  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       :   Administrator (admin)
2021-05-05 13:42:15.880  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       :   Guest (guest)
2021-05-05 13:42:15.880  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       :   Mike Jackson (mjackson)
2021-05-05 13:42:15.880  INFO 18327 --- [           main] o.a.tutorial.restapi.ListPeopleCmd       :   Test User (test)
```

## Create a person
Creating a person uses the `createPerson` method of the [`PeopleApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#createPerson){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#createperson)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.PeopleApi;
import org.alfresco.core.model.PersonBodyCreate;
import org.alfresco.core.model.PersonEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class CreatePersonCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreatePersonCmd.class);

    @Autowired
    PeopleApi peopleApi;

    public void execute(String username, String pwd, String firstname, String lastname, String email) throws IOException {
        List<String> fields = null;

        PersonBodyCreate personBodyCreate = new PersonBodyCreate();
        personBodyCreate.setId(username);
        personBodyCreate.setPassword(pwd);
        personBodyCreate.setFirstName(firstname);
        personBodyCreate.setLastName(lastname);
        personBodyCreate.setEmail(email);
        PersonEntry person = peopleApi.createPerson(personBodyCreate, fields).getBody();
        LOGGER.info("Created person  {}", person);
    }
}
```

Executing this code will add a user passed in username, pwd, first name, last name and email:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-person martin 1234 Martin Bergljung martin@example.com

2021-05-05 15:49:25.198  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.928 seconds (JVM running for 4.427)
2021-05-05 15:49:25.200  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-person
2021-05-05 15:49:25.201  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: martin
2021-05-05 15:49:25.201  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 1234
2021-05-05 15:49:25.201  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[3]: Martin
2021-05-05 15:49:25.201  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[4]: Bergljung
2021-05-05 15:49:25.201  INFO 22389 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[5]: martin@example.com
2021-05-05 15:49:25.830  INFO 22389 --- [           main] o.a.tutorial.restapi.CreatePersonCmd     : Created person  class PersonEntry {
    entry: class Person {
        id: martin
        firstName: Martin
        lastName: Bergljung
        displayName: Martin Bergljung
        description: null
        avatarId: null
        email: martin@example.com
        skypeId: null
        googleId: null
        instantMessageId: null
        jobTitle: null
        location: null
        company: class Company {
            organization: null
            address1: null
            address2: null
            address3: null
            postcode: null
            telephone: null
            fax: null
            email: null
        }
        mobile: null
        telephone: null
        statusUpdatedAt: null
        userStatus: null
        enabled: true
        emailNotificationsEnabled: true
        aspectNames: null
        properties: null
        capabilities: class Capabilities {
            isAdmin: false
            isGuest: false
            isMutable: true
        }
    }
}
```

## Get person metadata
Getting metadata for a person involves a number of API calls:

* [`PeopleApi.getPerson`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#getPerson){:target="_blank"}
* [`PeopleApi.getAvatarImage`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#getAvatarImage){:target="_blank"}
* [`PreferencesApi.listPreferences`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PreferencesApi.md#listPreferences){:target="_blank"}
* [`PreferencesApi.getPreference`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PreferencesApi.md#getPreference){:target="_blank"}

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#getpersonmetadata)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.PeopleApi;
import org.alfresco.core.handler.PreferencesApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class GetPersonMetadataCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetPersonMetadataCmd.class);

    @Autowired
    PeopleApi peopleApi;

    @Autowired
    PreferencesApi preferencesApi;

    public void execute(String personId) throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> fields = null;

        PersonEntry person = peopleApi.getPerson(personId, fields).getBody();
        LOGGER.info("Got person metadata {}", person);
        PreferencePaging preferencePaging = preferencesApi.listPreferences(personId, skipCount, maxItems, fields).getBody();
        LOGGER.info("Got person preferences:");
        for (PreferenceEntry preferenceEntry: preferencePaging.getList().getEntries()) {
            LOGGER.info("  preference: {}", preferenceEntry.getEntry());
        }
    }
}
```

Executing this code will list the metadata for the user including any preferences. In the following example we list metadata
for the out-of-the-box user `abeecher`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-person-metadata abeecher

2021-05-05 16:06:50.550  INFO 22610 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.396 seconds (JVM running for 3.893)
2021-05-05 16:06:50.552  INFO 22610 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-person-metadata
2021-05-05 16:06:50.553  INFO 22610 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: abeecher
2021-05-05 16:06:50.787  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       : Got person metadata class PersonEntry {
    entry: class Person {
        id: abeecher
        firstName: Alice
        lastName: Beecher
        displayName: Alice Beecher
        description: Alice is a demo user for the sample Alfresco Team site.
        avatarId: 198500fc-1e99-4f5f-8926-248cea433366
        email: abeecher@example.com
        skypeId: abeecher
        googleId: null
        instantMessageId: null
        jobTitle: Graphic Designer
        location: Tilbury, UK
        company: class Company {
            organization: Moresby, Garland and Wedge
            address1: 200 Butterwick Street
            address2: Tilbury
            address3: UK
            postcode: ALF1 SAM1
            telephone: null
            fax: null
            email: null
        }
        mobile: 0112211001100
        telephone: 0112211001100
        statusUpdatedAt: 2011-02-15T20:20:13.432Z
        userStatus: Helping to design the look and feel of the new web site
        enabled: false
        emailNotificationsEnabled: true
        aspectNames: null
        properties: null
        capabilities: class Capabilities {
            isAdmin: false
            isGuest: false
            isMutable: true
        }
    }
}
2021-05-05 16:06:50.849  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       : Got person preferences:
2021-05-05 16:06:50.849  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.documentList.showFolders
    value: true
}
2021-05-05 16:06:50.849  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.documentList.simpleView
    value: false
}
2021-05-05 16:06:50.849  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.documentList.sortField
    value: cm:name
}
2021-05-05 16:06:50.849  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.documents.favourites
    value: workspace://SpacesStore/7c7bca1d-b65d-4444-9378-805b459fb74d,workspace://SpacesStore/b2f21ddd-0b0e-449f-bea9-a0be73e7d67b,workspace://SpacesStore/2cf35860-6705-42c3-b123-c4d6b39997b4,workspace://SpacesStore/7d90c94c-fcf7-4f79-9273-bd1352bbb612,workspace://SpacesStore/05dedd34-9d9d-48d9-9af6-c81b555541c9
}
2021-05-05 16:06:50.850  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.sites.favourites.test
    value: true
}
2021-05-05 16:06:50.850  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.sites.recent._0
    value: swsdp
}
2021-05-05 16:06:50.850  INFO 22610 --- [           main] o.a.t.restapi.GetPersonMetadataCmd       :   preference: class Preference {
    id: org.alfresco.share.twisters.collapsed
    value: DocumentPermissions,DocumentWorkflows,DocumentLinks,DocumentActions
}
```

## Update a person
Updating metadata for a person involves these two API calls:

* [`PeopleApi.updatePerson`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#updatePerson){:target="_blank"}
* [`PeopleApi.updateAvatarImage`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#updateAvatarImage){:target="_blank"}

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#updateperson)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.PeopleApi;
import org.alfresco.core.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class UpdatePersonMetadataCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(UpdatePersonMetadataCmd.class);

    @Autowired
    PeopleApi peopleApi;

    public void execute(String personId) throws IOException {
        List<String> fields = null;

        PersonBodyUpdate personBodyUpdate = new PersonBodyUpdate();
        // Mandatory fields during an update
        personBodyUpdate.setFirstName("Martin");
        personBodyUpdate.setLastName("Bergljung");
        personBodyUpdate.setEmail("martin@example.com");
        personBodyUpdate.setEmailNotificationsEnabled(true);
        personBodyUpdate.setOldPassword("1234");
        personBodyUpdate.setPassword("1234");
        personBodyUpdate.setEnabled(true);

        // Other fields
        personBodyUpdate.setJobTitle("Techie");
        Company company = new Company();
        company.setAddress1("Alfresco way 1");
        company.setOrganization("Alfresco Org");
        company.setTelephone("12345678");
        personBodyUpdate.setCompany(company);

        PersonEntry person = peopleApi.updatePerson(personId, personBodyUpdate, fields).getBody();
        LOGGER.info("Updated person metadata {}", person);
    }
}
```

Executing this code will update the user `martin` with some new company information, there are a number of fields that
are mandatory that you need to set, so might be best to read them first and then set them:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar update-person-metadata martin

2021-05-06 09:16:41.833  INFO 24158 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.151 seconds (JVM running for 3.596)
2021-05-06 09:16:41.835  INFO 24158 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: update-person-metadata
2021-05-06 09:16:41.837  INFO 24158 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: martin
2021-05-06 09:16:42.111  INFO 24158 --- [           main] o.a.t.restapi.UpdatePersonMetadataCmd    : Updated person metadata class PersonEntry {
    entry: class Person {
        id: martin
        firstName: Martin
        lastName: Bergljung
        displayName: Martin Bergljung
        description: null
        avatarId: null
        email: martin@example.com
        skypeId: null
        googleId: null
        instantMessageId: null
        jobTitle: Techie
        location: null
        company: class Company {
            organization: Alfresco Org
            address1: Alfresco way 1
            address2: null
            address3: null
            postcode: null
            telephone: 12345678
            fax: null
            email: null
        }
        mobile: null
        telephone: null
        statusUpdatedAt: null
        userStatus: null
        enabled: true
        emailNotificationsEnabled: true
        aspectNames: null
        properties: null
        capabilities: class Capabilities {
            isAdmin: false
            isGuest: false
            isMutable: true
        }
    }
}
```

## Request password reset for a person
Requesting a password reset for a person (user) in the repository involves these two API calls:

* [`PeopleApi.requestPasswordReset`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#requestPasswordReset){:target="_blank"}
* [`PeopleApi.resetPassword`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/PeopleApi.md#resetPassword){:target="_blank"}

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#requestpwdreset)

```java
import org.alfresco.core.handler.PeopleApi;
import org.alfresco.core.model.ClientBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RequestPwdResetCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(RequestPwdResetCmd.class);

    @Autowired
    PeopleApi peopleApi;

    public void execute(String personId) throws IOException {
        ClientBody clientBody = new ClientBody();
        clientBody.setClient("share"); // Alfresco Share UI client

        HttpEntity<Void> result = peopleApi.requestPasswordReset(personId, clientBody);
        LOGGER.info("Password reset request sent for {} result {}", personId, result);
    }
}
```

Executing this code will request a password request for user `martin`, an email will be sent to the user assuming the
password request should be via the Alfresco Share UI:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar request-pwd-reset martin     

2021-05-06 09:30:38.440  INFO 24356 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.438 seconds (JVM running for 3.939)
2021-05-06 09:30:38.442  INFO 24356 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: request-pwd-reset
2021-05-06 09:30:38.443  INFO 24356 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: martin
2021-05-06 09:30:39.726  INFO 24356 --- [           main] o.a.tutorial.restapi.RequestPwdResetCmd  : Password reset request sent for martin result <202 ACCEPTED Accepted,[cache-control:"no-cache", connection:"keep-alive", content-length:"0", content-type:"application/json;charset=UTF-8", date:"Thu, 06 May 2021 08:30:39 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]>
```

## List groups a person is a member of
Listing groups that a person is a member of uses the `listGroupMembershipsForPerson` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#listGroupMembershipsForPerson){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#listpersongroupmembership)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupEntry;
import org.alfresco.core.model.GroupPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListPersonGroupMembershipsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListPersonGroupMembershipsCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String personId) throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        String where = null;
        List<String> orderBy = null;
        List<String> include = null;
        List<String> fields = null;

        LOGGER.info("Listing group memberships for person {}", personId);
        GroupPaging groups = groupsApi.listGroupMembershipsForPerson(
                personId, skipCount, maxItems, orderBy, include, where, fields).getBody();
        for (GroupEntry groupEntry: groups.getList().getEntries()) {
            LOGGER.info("  {}", groupEntry.getEntry().getDisplayName());
        }
    }
}
```

Executing this code will list the group memberships for passed in username. In this example we list group memberships for
two of the out-of-the-box users `abeecher` and `admin`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-person-group-memberships abeecher

2021-05-06 09:42:50.643  INFO 24597 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.63 seconds (JVM running for 4.106)
2021-05-06 09:42:50.645  INFO 24597 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-person-group-memberships
2021-05-06 09:42:50.647  INFO 24597 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: abeecher
2021-05-06 09:42:50.647  INFO 24597 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    : Listing group memberships for person abeecher
2021-05-06 09:42:50.821  INFO 24597 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   null
2021-05-06 09:42:50.821  INFO 24597 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_swsdp
2021-05-06 09:42:50.821  INFO 24597 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_swsdp_SiteCollaborator

% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-person-group-memberships admin   

2021-05-06 09:43:06.433  INFO 24599 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: admin
2021-05-06 09:43:06.433  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    : Listing group memberships for person admin
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   ALFRESCO_ADMINISTRATORS
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   ALFRESCO_MODEL_ADMINISTRATORS
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   ALFRESCO_SEARCH_ADMINISTRATORS
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   EMAIL_CONTRIBUTORS
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   null
2021-05-06 09:43:06.631  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   SITE_ADMINISTRATORS
2021-05-06 09:43:06.632  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_swsdp
2021-05-06 09:43:06.632  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_swsdp_SiteManager
2021-05-06 09:43:06.632  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_test
2021-05-06 09:43:06.632  INFO 24599 --- [           main] o.a.t.r.ListPersonGroupMembershipsCmd    :   site_test_SiteManager```
```

## List groups
Listing the groups available in the repository uses the `listGroups` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#listGroups){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#listgroups)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupEntry;
import org.alfresco.core.model.GroupPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListGroupsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListGroupsCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        String where = null;
        List<String> orderBy = null;
        List<String> include = null;
        List<String> fields = null;

        LOGGER.info("Listing group in the repo:");
        GroupPaging groups = groupsApi.listGroups(skipCount, maxItems, orderBy, include, where, fields).getBody();
        for (GroupEntry groupEntry: groups.getList().getEntries()) {
            LOGGER.info("  {}", groupEntry.getEntry().getDisplayName());
        }
    }
}
```

Executing this code will list the groups available in the repository, note that this can  be a lot of groups if there
are loads of Share sites and the system is connected to a directory server:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-groups                        

2021-05-06 09:50:39.416  INFO 24665 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.637 seconds (JVM running for 4.131)
2021-05-06 09:50:39.419  INFO 24665 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-groups
2021-05-06 09:50:39.420  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       : Listing group in the repo:
2021-05-06 09:50:39.807  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   Engineering
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   ALFRESCO_ADMINISTRATORS
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   ALFRESCO_MODEL_ADMINISTRATORS
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   ALFRESCO_SEARCH_ADMINISTRATORS
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   EMAIL_CONTRIBUTORS
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   SITE_ADMINISTRATORS
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_swsdp
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_swsdp_SiteCollaborator
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_swsdp_SiteConsumer
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_swsdp_SiteContributor
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_swsdp_SiteManager
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_test
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_test_SiteCollaborator
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_test_SiteConsumer
2021-05-06 09:50:39.808  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_test_SiteContributor
2021-05-06 09:50:39.809  INFO 24665 --- [           main] o.a.tutorial.restapi.ListGroupsCmd       :   site_test_SiteManager
```

## Create a group
Creating a group uses the `createGroup` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#createGroup){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#creategroup)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupBodyCreate;
import org.alfresco.core.model.GroupEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class CreateGroupCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateGroupCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId, String name) throws IOException {
        List<String> fields = null;
        List<String> include = null;

        GroupBodyCreate groupBodyCreate = new GroupBodyCreate();
        groupBodyCreate.setId(groupId);
        groupBodyCreate.setDisplayName(name);
        GroupEntry groupEntry = groupsApi.createGroup(groupBodyCreate, include, fields).getBody();
        LOGGER.info("Created group  {}", groupEntry.getEntry());
    }
}
```

Executing this code will create a group, in this case we are creating an HR group:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-group hr "Human Resources"

2021-05-06 10:25:51.906  INFO 25139 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.477 seconds (JVM running for 3.956)
2021-05-06 10:25:51.908  INFO 25139 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-group
2021-05-06 10:25:51.909  INFO 25139 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: hr
2021-05-06 10:25:51.909  INFO 25139 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: Human Resources
2021-05-06 10:25:52.165  INFO 25139 --- [           main] o.a.tutorial.restapi.CreateGroupCmd      : Created group  class Group {
    id: GROUP_hr
    displayName: Human Resources
    isRoot: true
    parentIds: null
    zones: null
}
```

## Get group metadata
Getting metadata for a group uses the `getGroup` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#getGroup){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#getgroup)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class GetGroupCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetGroupCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId) throws IOException {
        List<String> fields = null;
        List<String> include = null;

        GroupEntry groupEntry = groupsApi.getGroup(groupId, include, fields).getBody();
        LOGGER.info("Got group metadata  {}", groupEntry.getEntry());
    }
}
```

Executing this code will get metadata for a group, in this case we are getting metadata for a group with id `hr`,
note that you have to prefix group ids with `GROUP_`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-group GROUP_hr

2021-05-06 10:31:37.864  INFO 25363 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.763 seconds (JVM running for 4.242)
2021-05-06 10:31:37.866  INFO 25363 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-group
2021-05-06 10:31:37.868  INFO 25363 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 10:31:38.025  INFO 25363 --- [           main] o.alfresco.tutorial.restapi.GetGroupCmd  : Got group metadata  class Group {
    id: GROUP_hr
    displayName: Human Resources
    isRoot: true
    parentIds: null
    zones: null
}
```

## Update a group
Updating a group name uses the `updateGroup` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#updateGroup){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#updategroup)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupBodyUpdate;
import org.alfresco.core.model.GroupEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class UpdateGroupCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(UpdateGroupCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId, String newName) throws IOException {
        List<String> fields = null;
        List<String> include = null;

        GroupBodyUpdate groupBodyUpdate = new GroupBodyUpdate();
        groupBodyUpdate.setDisplayName(newName);

        GroupEntry group = groupsApi.updateGroup(groupId, groupBodyUpdate, include, fields).getBody();
        LOGGER.info("Updated group {}", group);
    }
}
```

Executing this code will update the name of the group with passed in id, in this case we are updating the name for a
group with id `hr`, note that you have to prefix group ids with `GROUP_`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar update-group GROUP_hr "Human Resources updated"

2021-05-06 12:42:41.475  INFO 26302 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.285 seconds (JVM running for 3.742)
2021-05-06 12:42:41.477  INFO 26302 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: update-group
2021-05-06 12:42:41.478  INFO 26302 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 12:42:41.478  INFO 26302 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: Human Resources updated
2021-05-06 12:42:41.673  INFO 26302 --- [           main] o.a.tutorial.restapi.UpdateGroupCmd      : Updated group class GroupEntry {
    entry: class Group {
        id: GROUP_hr
        displayName: Human Resources updated
        isRoot: true
        parentIds: null
        zones: null
    }
}
```

## List all people and groups in a group
Listing all the members of a group (i.e. people and groups) uses the `listGroupMemberships` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#listGroupMemberships){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#listmembersofgroup)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupMemberEntry;
import org.alfresco.core.model.GroupMemberPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListGroupMembersCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListGroupMembersCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId) throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        String where = null;
        List<String> orderBy = null;
        List<String> fields = null;

        LOGGER.info("Listing members of group {}:", groupId);
        GroupMemberPaging groupMembers = groupsApi.listGroupMemberships(
                groupId, skipCount, maxItems, orderBy, where, fields).getBody();
        for (GroupMemberEntry groupMemberEntry: groupMembers.getList().getEntries()) {
            LOGGER.info("  {} ({})", groupMemberEntry.getEntry().getDisplayName(), 
                    groupMemberEntry.getEntry().getMemberType());
        }
    }
}
```

Executing this code will list the members of passed in group id, note that you have to prefix group ids with `GROUP_`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-group-members GROUP_engineering

2021-05-06 12:55:43.231  INFO 26500 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.59 seconds (JVM running for 4.024)
2021-05-06 12:55:43.233  INFO 26500 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-group-members
2021-05-06 12:55:43.234  INFO 26500 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_engineering
2021-05-06 12:55:43.234  INFO 26500 --- [           main] o.a.t.restapi.ListGroupMembersCmd        : Listing members of group GROUP_engineering:
2021-05-06 12:55:43.404  INFO 26500 --- [           main] o.a.t.restapi.ListGroupMembersCmd        :   martin (PERSON)
2021-05-06 12:55:43.404  INFO 26500 --- [           main] o.a.t.restapi.ListGroupMembersCmd        :   System Architects (GROUP)
```

## Adding people and groups to a group
Adding members to a group uses the `createGroupMembership` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#createGroupMembership){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#addtogroup)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.GroupsApi;
import org.alfresco.core.model.GroupMemberEntry;
import org.alfresco.core.model.GroupMembershipBodyCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class CreateGroupMembershipCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateGroupMembershipCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId, String memberId, String type) throws IOException {
        List<String> fields = null;

        GroupMembershipBodyCreate groupMembershipBodyCreate = new GroupMembershipBodyCreate();
        groupMembershipBodyCreate.setId(memberId);
        groupMembershipBodyCreate.setMemberType(GroupMembershipBodyCreate.MemberTypeEnum.fromValue(type));

        GroupMemberEntry groupMember = groupsApi.createGroupMembership(groupId, groupMembershipBodyCreate, fields).getBody();
        LOGGER.info("Added member to group {} {}", groupId, groupMember.getEntry());
    }
}
```

Executing this code will add a person, or a group, to passed in group id, note that you have to prefix group ids with `GROUP_`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-group-membership GROUP_hr martin PERSON

2021-05-06 13:54:39.062  INFO 27295 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.83 seconds (JVM running for 4.364)
2021-05-06 13:54:39.064  INFO 27295 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-group-membership
2021-05-06 13:54:39.066  INFO 27295 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 13:54:39.066  INFO 27295 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: martin
2021-05-06 13:54:39.066  INFO 27295 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[3]: PERSON
2021-05-06 13:54:39.311  INFO 27295 --- [           main] o.a.t.restapi.CreateGroupMembershipCmd   : Added member to group GROUP_hr class GroupMember {
    id: martin
    displayName: martin
    memberType: PERSON
}
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-group-membership GROUP_hr GROUP_engineering GROUP

2021-05-06 13:55:23.094  INFO 27297 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.855 seconds (JVM running for 4.351)
2021-05-06 13:55:23.096  INFO 27297 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-group-membership
2021-05-06 13:55:23.097  INFO 27297 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 13:55:23.097  INFO 27297 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: GROUP_engineering
2021-05-06 13:55:23.097  INFO 27297 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[3]: GROUP
2021-05-06 13:55:23.327  INFO 27297 --- [           main] o.a.t.restapi.CreateGroupMembershipCmd   : Added member to group GROUP_hr class GroupMember {
    id: GROUP_engineering
    displayName: Engineering
    memberType: GROUP
}
```

## Delete a person or group from a group
Deleting members of a group uses the `deleteGroupMembership` method of the [`GroupsApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/GroupsApi.md#deleteGroupMembership){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#deletefromgroup)

```java
import org.alfresco.core.handler.GroupsApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class DeleteGroupMembershipCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(DeleteGroupMembershipCmd.class);

    @Autowired
    GroupsApi groupsApi;

    public void execute(String groupId, String groupMemberId) throws IOException {
        HttpEntity<Void> result = groupsApi.deleteGroupMembership(groupId, groupMemberId);
        LOGGER.info("Deleted group membership for group {} member {} result {}", groupId, groupMemberId, result);
    }
}
```

Executing this code will delete a person, or a group, from passed in group id, note that you have to prefix group ids
with `GROUP_`:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar delete-group-membership GROUP_hr martin           

2021-05-06 14:09:25.825  INFO 27471 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.959 seconds (JVM running for 4.516)
2021-05-06 14:09:25.828  INFO 27471 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: delete-group-membership
2021-05-06 14:09:25.829  INFO 27471 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 14:09:25.829  INFO 27471 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: martin
2021-05-06 14:09:26.112  INFO 27471 --- [           main] o.a.t.restapi.DeleteGroupMembershipCmd   : Deleted group membership for group GROUP_hr member martin result <204 NO_CONTENT No Content,[cache-control:"no-cache", connection:"keep-alive", content-type:"application/json;charset=UTF-8", date:"Thu, 06 May 2021 13:09:26 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]>

% java -jar target/rest-api-0.0.1-SNAPSHOT.jar delete-group-membership GROUP_hr GROUP_engineering

2021-05-06 14:09:51.048  INFO 27472 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.964 seconds (JVM running for 4.493)
2021-05-06 14:09:51.050  INFO 27472 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: delete-group-membership
2021-05-06 14:09:51.051  INFO 27472 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: GROUP_hr
2021-05-06 14:09:51.051  INFO 27472 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: GROUP_engineering
2021-05-06 14:09:51.152  INFO 27472 --- [           main] o.a.t.restapi.DeleteGroupMembershipCmd   : Deleted group membership for group GROUP_hr member GROUP_engineering result <204 NO_CONTENT No Content,[cache-control:"no-cache", connection:"keep-alive", content-type:"application/json;charset=UTF-8", date:"Thu, 06 May 2021 13:09:51 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]>
```

## Setting permissions for a group
Setting permissions for a group uses the `updateNode` method of the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}.
For more info see [set permissions for a node](#setpermissionfornode).

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/people-groups.md %}#setpermissionsgroup)

## === Managing Audit Applications and Logs ===
The following sections walk through how to use the Java ReST API wrapper services when managing audit applications and
their logs.

## Enable auditing and Alfresco Access audit application
[See this section]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#enableauditing)

## List audit applications
Listing all the audit applications uses the `listAuditApps` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#listAuditApps){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#listauditapps)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditAppEntry;
import org.alfresco.core.model.AuditAppPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ListAuditAppsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListAuditAppsCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> fields = null;

        LOGGER.info("Listing active audit applications in the repository:");
        AuditAppPaging auditApps = auditApi.listAuditApps(skipCount, maxItems, fields).getBody();
        for (AuditAppEntry auditAppEntry: auditApps.getList().getEntries()) {
            LOGGER.info("  {}", auditAppEntry);
        }
    }
}
```

Executing this code will list the audit applications that have been activated, if you have enabled auditing and activated
the `alfresco-access` audit application, then you will see the following listing of audit apps:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-audit-apps

2021-05-07 12:48:12.434  INFO 36995 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.525 seconds (JVM running for 4.089)
2021-05-07 12:48:12.436  INFO 36995 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-audit-apps
2021-05-07 12:48:12.437  INFO 36995 --- [           main] o.a.tutorial.restapi.ListAuditAppsCmd    : Listing active audit applications in the repository:
2021-05-07 12:48:12.912  INFO 36995 --- [           main] o.a.tutorial.restapi.ListAuditAppsCmd    :   class AuditAppEntry {
    entry: class AuditApp {
        id: tagging
        name: Alfresco Tagging Service
        isEnabled: true
        maxEntryId: null
        minEntryId: null
    }
}
2021-05-07 12:48:12.913  INFO 36995 --- [           main] o.a.tutorial.restapi.ListAuditAppsCmd    :   class AuditAppEntry {
    entry: class AuditApp {
        id: alfresco-access
        name: alfresco-access
        isEnabled: true
        maxEntryId: null
        minEntryId: null
    }
}
```

## Get audit application metadata
Getting the audit application metadata uses the `getAuditApp` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#getAuditApp){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#getauditappmetadata)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditApp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class GetAuditAppCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetAuditAppCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId) throws IOException {
        List<String> fields = null;
        List<String> include = null;

        AuditApp auditApp = auditApi.getAuditApp(auditAppId, fields, include).getBody();
        LOGGER.info("Got audit app metadata  {}", auditApp);
    }
}
```

## Enable/Disable an audit application
Enable and disable an audit application uses the `updateAuditApp` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#updateAuditApp){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#enabledisableapp)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditApp;
import org.alfresco.core.model.AuditBodyUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class EnableDisableAuditAppCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(EnableDisableAuditAppCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId) throws IOException {
        List<String> fields = null;

        AuditBodyUpdate auditBodyUpdate = new AuditBodyUpdate();
        auditBodyUpdate.setIsEnabled(true);

        AuditApp auditApp = auditApi.updateAuditApp(auditAppId, auditBodyUpdate, fields).getBody();
        LOGGER.info("Enabled audit app  {}", auditApp);
    }
}
```

## List audit entries (logs) for an audit application
Listing all the audit logs for an audit application uses the `listAuditEntriesForAuditApp` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#listAuditEntriesForAuditApp){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#listauditlogsforapp)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditEntryEntry;
import org.alfresco.core.model.AuditEntryPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ListAuditLogsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListAuditLogsCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId) throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        String where = null;
        List<String> fields = null;
        List<String> include = new ArrayList<>();
        List<String> orderBy = null;

        // Include the log values
        include.add("values");

        // Controls if the response provides the total numbers of items in the collection.
        // If not supplied then the default value is false.
        Boolean omitTotalItems = true;

        LOGGER.info("Listing logs for audit application {}:", auditAppId);
        AuditEntryPaging auditLogs = auditApi.listAuditEntriesForAuditApp(
                auditAppId, skipCount, omitTotalItems, orderBy, maxItems, where, include, fields).getBody();
        for (AuditEntryEntry auditAppEntry: auditLogs.getList().getEntries()) {
            String username = "N/A";
            if (auditAppEntry.getEntry().getCreatedByUser() != null) {
                username = auditAppEntry.getEntry().getCreatedByUser().getId();
            }
            String log = null;
            if (auditAppEntry.getEntry().getValues().toString().length() > 60) {
                log = auditAppEntry.getEntry().getValues().toString().substring(0, 60);
            } else {
                log = auditAppEntry.getEntry().getValues().toString();
            }
            LOGGER.info("  {} {} {}", auditAppEntry.getEntry().getCreatedAt(), username, log);
        }
    }
}
```

Note that you have to add `values` to the `include` parameter for the logs to include all the data. Also, the audit log
value have been truncated for readability.

Executing this code will list the audit logs for passed in audit app id. The audit log values have been trimmed:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-audit-logs alfresco-access

2021-05-07 14:46:29.977  INFO 40544 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.493 seconds (JVM running for 3.948)
2021-05-07 14:46:29.980  INFO 40544 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-audit-logs
2021-05-07 14:46:29.981  INFO 40544 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: alfresco-access
2021-05-07 14:46:29.981  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    : Listing logs for audit application alfresco-access:
2021-05-07 14:46:30.376  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T11:48:12.758Z admin {/alfresco-access/login/user=admin}
2021-05-07 14:46:30.376  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:30:46.256Z N/A {/alfresco-access/loginFailure/user=martin}
2021-05-07 14:46:30.377  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:30:58.768Z N/A {/alfresco-access/loginFailure/user=test}
2021-05-07 14:46:30.377  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:07.650Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.379  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:08.087Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.379  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:08.141Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.379  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:08.800Z admin {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.379  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:08.853Z admin {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.380  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:31:08.961Z admin {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.380  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:04.579Z admin {/alfresco-access/logout/user=admin}
2021-05-07 14:46:30.381  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:10.404Z test {/alfresco-access/login/user=test}
2021-05-07 14:46:30.381  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:11.261Z test {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.381  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:11.316Z test {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.381  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:11.371Z test {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.381  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:11.436Z test {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.382  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:12.075Z test {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.382  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:12.101Z test {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.382  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:12.124Z test {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-07 14:46:30.383  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:24.764Z test {/alfresco-access/logout/user=test}
2021-05-07 14:46:30.383  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:26.423Z admin {/alfresco-access/login/user=admin}
2021-05-07 14:46:30.384  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:37.917Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.384  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:47.013Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:51.284Z admin {/alfresco-access/transaction/sub-actions=addNodeAspect crea
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:51.363Z admin {/alfresco-access/transaction/sub-actions=readContent addNod
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:51.458Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:51.511Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:54.271Z admin {/alfresco-access/transaction/sub-actions=addNodeAspect crea
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:54.343Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:54.443Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:32:54.468Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:03.656Z admin {/alfresco-access/transaction/sub-actions=createNode updateN
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:03.784Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-07 14:46:30.385  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.218Z admin {/alfresco-access/transaction/sub-actions=addNodeAspect, /al
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.264Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.347Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.754Z admin {/alfresco-access/transaction/sub-actions=addNodeAspect crea
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.806Z admin {/alfresco-access/transaction/sub-actions=addNodeAspect upda
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.878Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-07 14:46:30.386  INFO 40544 --- [           main] o.a.tutorial.restapi.ListAuditLogsCmd    :   2021-05-07T13:33:04.899Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
```

## List audit entries (logs) for a node
Listing all the audit logs for a node uses the `listAuditEntriesForNode` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#listAuditEntriesForNode){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#listauditlogsnode)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditEntryEntry;
import org.alfresco.core.model.AuditEntryPaging;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ListNodeAuditLogsCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(ListNodeAuditLogsCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String nodeId) throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;
        String where = null;
        List<String> fields = null;
        List<String> include = new ArrayList<>();
        List<String> orderBy = null;

        // Include the log values
        include.add("values");

        LOGGER.info("Listing logs for node ID {}:", nodeId);
        AuditEntryPaging auditLogs = auditApi.listAuditEntriesForNode(
                nodeId, skipCount, orderBy, maxItems, where, include, fields).getBody();
        for (AuditEntryEntry auditAppEntry: auditLogs.getList().getEntries()) {
            String username = "N/A";
            if (auditAppEntry.getEntry().getCreatedByUser() != null) {
                username = auditAppEntry.getEntry().getCreatedByUser().getId();
            }
            String log = null;
            if (auditAppEntry.getEntry().getValues().toString().length() > 60) {
                log = auditAppEntry.getEntry().getValues().toString().substring(0, 60);
            } else {
                log = auditAppEntry.getEntry().getValues().toString();
            }
            LOGGER.info("  {} {} {} {}", auditAppEntry.getEntry().getId(), auditAppEntry.getEntry().getCreatedAt(),
                    username, log);
        }
    }
}
```

Note that you have to add `values` to the `include` parameter for the logs to include all the data. Also, the audit log
value have been truncated for readability.

Executing this code will list the audit logs for passed in audit app id and audit entry id:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar list-audit-logs-node 37eedde2-3c78-4d25-bade-5360e22579f4

2021-05-10 09:27:33.714  INFO 51172 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 4.069 seconds (JVM running for 4.724)
2021-05-10 09:27:33.716  INFO 51172 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: list-audit-logs-node
2021-05-10 09:27:33.717  INFO 51172 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 37eedde2-3c78-4d25-bade-5360e22579f4
2021-05-10 09:27:33.717  INFO 51172 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       : Listing logs for node ID 37eedde2-3c78-4d25-bade-5360e22579f4:
2021-05-10 09:41:55.396  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   76 2021-05-10T08:26:58.965Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-10 09:41:55.396  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   77 2021-05-10T08:27:06.541Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-10 09:41:55.396  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   78 2021-05-10T08:27:11.353Z admin {/alfresco-access/transaction/sub-actions=updateContent upda
2021-05-10 09:41:55.396  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   80 2021-05-10T08:27:12.270Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-10 09:41:55.397  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   81 2021-05-10T08:27:12.429Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
2021-05-10 09:41:55.397  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   83 2021-05-10T08:27:13.524Z admin {/alfresco-access/transaction/sub-actions=updateNodeProperti
2021-05-10 09:41:55.397  INFO 51505 --- [           main] o.a.t.restapi.ListNodeAuditLogsCmd       :   84 2021-05-10T08:27:13.609Z admin {/alfresco-access/transaction/sub-actions=readContent, /alfr
```

## Get an audit entry (log)
Getting an audit log uses the `getAuditEntry` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#getAuditEntry){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#getauditentry)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.alfresco.core.model.AuditEntryEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class GetAuditLogCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(GetAuditLogCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId, String auditLogId) throws IOException {
        List<String> fields = null;

        AuditEntryEntry auditLog = auditApi.getAuditEntry(auditAppId, auditLogId, fields).getBody();
        LOGGER.info("Got audit log metadata  {}", auditLog);
    }
}
```

Executing this code will list the audit logs for passed in audit app id. The audit log values have been trimmed:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar get-audit-log alfresco-access 80                     

2021-05-10 09:49:57.492  INFO 51645 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.49 seconds (JVM running for 3.992)
2021-05-10 09:49:57.494  INFO 51645 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: get-audit-log
2021-05-10 09:49:57.496  INFO 51645 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: alfresco-access
2021-05-10 09:49:57.496  INFO 51645 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 80
2021-05-10 09:49:57.676  INFO 51645 --- [           main] o.a.tutorial.restapi.GetAuditLogCmd      : Got audit log metadata  class AuditEntryEntry {
    entry: class AuditEntry {
        id: 80
        auditApplicationId: alfresco-access
        createdByUser: class UserInfo {
            displayName: Administrator
            id: admin
        }
        createdAt: 2021-05-10T08:27:12.270Z
        values: {
          /alfresco-access/transaction/sub-actions=updateNodeProperties, 
          /alfresco-access/transaction/properties/from={cm:lastThumbnailModification=[pdf:1620394371183, doclib:1620394374161], {http://www.alfresco.org/model/content/1.0}modified=2021-05-10T08:27:10.986+0000}, 
          /alfresco-access/transaction/properties/to={cm:lastThumbnailModification=[doclib:1620394374161, pdf:1620635231931], {http://www.alfresco.org/model/content/1.0}modified=2021-05-10T08:27:11.935+0000}, 
          /alfresco-access/transaction/path=/app:company_home/app:guest_home/cm:somefileudpated.txt, 
          /alfresco-access/transaction/action=updateNodeProperties, 
          /alfresco-access/transaction/type=cm:content, 
          /alfresco-access/transaction/user=admin}
    }
}
```

## Delete audit entries (logs) for an audit application
Deleting audit logs for an audit app uses the `deleteAuditEntriesForAuditApp` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#deleteAuditEntriesForAuditApp){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#deletemultipleauditentries)

For a description of the common parameters, such as `where`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.AuditApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class DeleteAuditLogsForAppCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(DeleteAuditLogsForAppCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId) throws IOException {
        // Delete all logs with ids between 1 and 79
        String where = "(id BETWEEN ('1', '79'))";

        HttpEntity<Void> response = auditApi.deleteAuditEntriesForAuditApp(auditAppId, where);
        LOGGER.info("Deleted audit logs for app {} where {} response {}", auditAppId, where, response);
    }
}
```

Note that you have to supply a `where` clause to be able to delete any audit logs.

Executing this code will delete audit logs for passed in audit app id and where clause:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar delete-audit-logs-for-app alfresco-access

2021-05-10 10:05:22.248  INFO 51942 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 4.116 seconds (JVM running for 4.615)
2021-05-10 10:05:22.250  INFO 51942 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: delete-audit-logs-for-app
2021-05-10 10:05:22.251  INFO 51942 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: alfresco-access
2021-05-10 10:05:22.357  INFO 51942 --- [           main] o.a.t.restapi.DeleteAuditLogsForAppCmd   : Deleted audit logs for app alfresco-access where (id BETWEEN ('1', '79')) response <204 NO_CONTENT No Content,[cache-control:"no-cache", connection:"keep-alive", content-type:"application/json;charset=UTF-8", date:"Mon, 10 May 2021 09:05:22 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]
```

## Delete an audit entry (log) for an audit application
Deleting a single audit entry for an audit app uses the `deleteAuditEntry` method of the [`AuditApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/AuditApi.md#deleteAuditEntry){:target="_blank"}.

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#deletesingleentry)

```java
import org.alfresco.core.handler.AuditApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class DeleteAuditLogCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(DeleteAuditLogCmd.class);

    @Autowired
    AuditApi auditApi;

    public void execute(String auditAppId, String auditLogId) throws IOException {
        HttpEntity<Void> response = auditApi.deleteAuditEntry(auditAppId, auditLogId);
        LOGGER.info("Deleted audit log: app {} log id {} response {}", auditAppId, auditLogId, response);
    }
}

```

Executing this code will delete an audit log with passed in id for audit app with passed in id:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar delete-audit-log alfresco-access 80                      

2021-05-10 10:14:54.941  INFO 52102 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.736 seconds (JVM running for 4.24)
2021-05-10 10:14:54.943  INFO 52102 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: delete-audit-log
2021-05-10 10:14:54.944  INFO 52102 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: alfresco-access
2021-05-10 10:14:54.944  INFO 52102 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: 80
2021-05-10 10:14:55.050  INFO 52102 --- [           main] o.a.tutorial.restapi.DeleteAuditLogCmd   : Deleted audit log: app alfresco-access log id 80 response <204 NO_CONTENT No Content,[cache-control:"no-cache", connection:"keep-alive", content-type:"application/json;charset=UTF-8", date:"Mon, 10 May 2021 09:14:55 GMT", expires:"Thu, 01 Jan 1970 00:00:00 GMT", pragma:"no-cache", server:"nginx/1.18.0", x-frame-options:"SAMEORIGIN"]>
```

## === Searching for content ===
The following sections walk through how to use the Java ReST API wrapper services when managing audit applications and
their logs.

## Finding folders and files by a term
To find a node, such as a folder or file, by a term use the `findNodes` method of the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/QueriesApi.md#findNodes){:target="_blank"},
which is a search API you can use when doing simple search on a term. For more complex search, such as Alfresco Full Text Search (AFTS),
use the [Search API](#searchingbyquery);

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/searching.md %}#findnodesbyterm)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.QueriesApi;
import org.alfresco.core.model.NodeEntry;
import org.alfresco.core.model.NodePagingList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class FindNodesCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(FindNodesCmd.class);

    @Autowired
    QueriesApi queriesApi;

    public void execute() throws IOException {
        String rootNodeId = "-root-"; // The id of the node to start the search from. Supports the aliases -my-, -root- and -shared-.
        Integer skipCount = 0;
        Integer maxItems = 100;

        // Restrict the returned results to only those of the given node type and its sub-types
        String nodeType = null;

        List<String> include = null;
        List<String> orderBy = null;
        List<String> fields = null;

        String term = "Dict*";
        LOGGER.info("Searching for nodes by term: {}", term);
        NodePagingList result = queriesApi.findNodes(
                term, rootNodeId, skipCount, maxItems, nodeType, include, orderBy, fields).getBody().getList();
        for (NodeEntry node: result.getEntries()) {
            LOGGER.info("Found node [name={}][id={}]", node.getEntry().getName(), node.getEntry().getId());
        }
    }
}
```

Executing this code gives the following type of result:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar find-nodes

2021-05-10 13:40:47.999  INFO 54955 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.429 seconds (JVM running for 3.909)
2021-05-10 13:40:48.001  INFO 54955 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: find-nodes
2021-05-10 13:40:48.003  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Searching for nodes by term: Dict*
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Dictionary][id=b1264564-9b33-4003-bff9-58f2591cea54]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Dictionary-stuff.txt][id=6f7689af-b31e-493a-ad3a-298abcf03664]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=InviteHelper.txt][id=4875faf1-6366-477a-a97b-b30d15f33808]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Data Dictionary][id=392f377c-4a0b-4ab1-8327-3034269030a5]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=readme.html][id=d38b8cb0-0973-4bfd-84c5-9db4959d4715]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Project Contract.pdf][id=1a0b110f-1e09-4ca2-b367-fe25e4964a4e]
2021-05-10 13:40:49.143  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Meeting Notes 2011-02-10.doc][id=a8290263-4178-48f5-a0b0-be155a424828]
2021-05-10 13:40:49.144  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Meeting Notes 2011-02-03.doc][id=150398b3-7f82-4cf6-af63-c450ef6c5eb8]
2021-05-10 13:40:49.144  INFO 54955 --- [           main] o.a.tutorial.restapi.FindNodesCmd        : Found node [name=Meeting Notes 2011-01-27.doc][id=f3bb5d08-9fd1-46da-a94a-97f20f1ef208]
```

## Finding sites by a term
To find sites by term use the `findSites` method of the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/QueriesApi.md#findSites){:target="_blank"},
which is a search API you can use when doing simple search on a term. For more complex search, such as Alfresco Full Text Search (AFTS),
use the [Search API](#searchingbyquery);

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/searching.md %}#findsitesbyterm)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.QueriesApi;
import org.alfresco.core.model.SiteEntry;
import org.alfresco.core.model.SitePagingList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class FindSitesCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(FindSitesCmd.class);

    @Autowired
    QueriesApi queriesApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;

        List<String> orderBy = null;
        List<String> fields = null;

        String term = "Soft*";
        LOGGER.info("Searching for sites by term: {}", term);
        SitePagingList result = queriesApi.findSites(term, skipCount, maxItems, orderBy, fields).getBody().getList();
        for (SiteEntry node: result.getEntries()) {
            LOGGER.info("Found site [id={}][name={}]", node.getEntry().getId(), node.getEntry().getTitle());
        }
    }
}
```

Executing this code gives the following type of result:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar find-sites

2021-05-10 13:52:04.833  INFO 55062 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 4.107 seconds (JVM running for 4.762)
2021-05-10 13:52:04.835  INFO 55062 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: find-sites
2021-05-10 13:52:04.845  INFO 55062 --- [           main] o.a.tutorial.restapi.FindSitesCmd        : Searching for sites by term: Soft*
2021-05-10 13:52:05.036  INFO 55062 --- [           main] o.a.tutorial.restapi.FindSitesCmd        : Found site [id=downloadable-software][name=Downloadable Software]
2021-05-10 13:52:05.036  INFO 55062 --- [           main] o.a.tutorial.restapi.FindSitesCmd        : Found site [id=software-design][name=Software Design]
```

## Finding people by a term
To find sites by term use the `findPeople` method of the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/QueriesApi.md#findPeople){:target="_blank"},
which is a search API you can use when doing simple search on a term. For more complex search, such as Alfresco Full Text Search (AFTS),
use the [Search API](#searchingbyquery);

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/searching.md %}#findpeoplebyterm)

For a description of the common parameters, such as `fields`, see this [section](#common-parameters).

```java
import org.alfresco.core.handler.QueriesApi;
import org.alfresco.core.model.PersonEntry;
import org.alfresco.core.model.PersonPagingList;
import org.alfresco.core.model.SiteEntry;
import org.alfresco.core.model.SitePagingList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class FindPeopleCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(FindPeopleCmd.class);

    @Autowired
    QueriesApi queriesApi;

    public void execute() throws IOException {
        Integer skipCount = 0;
        Integer maxItems = 100;

        List<String> orderBy = null;
        List<String> fields = null;

        String term = "*mi*";
        LOGGER.info("Searching for people by term: {}", term);
        PersonPagingList result = queriesApi.findPeople(term, skipCount, maxItems, fields, orderBy).getBody().getList();
        for (PersonEntry person: result.getEntries()) {
            LOGGER.info("Found person [id={}][name={}]", person.getEntry().getId(), person.getEntry().getDisplayName());
        }
    }
}
```

Executing this code gives the following type of result:

```bash
% java -jar target/rest-api-0.0.1-SNAPSHOT.jar find-people

2021-05-10 14:00:38.019  INFO 55327 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 3.568 seconds (JVM running for 4.045)
2021-05-10 14:00:38.021  INFO 55327 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: find-people
2021-05-10 14:00:38.022  INFO 55327 --- [           main] o.a.tutorial.restapi.FindPeopleCmd       : Searching for people by term: *mi*
2021-05-10 14:00:38.839  INFO 55327 --- [           main] o.a.tutorial.restapi.FindPeopleCmd       : Found person [id=admin][name=Administrator]
2021-05-10 14:00:38.839  INFO 55327 --- [           main] o.a.tutorial.restapi.FindPeopleCmd       : Found person [id=mjackson][name=Mike Jackson]
```

## Finding content by a search query {#searchingbyquery}
To find content based on more complex search queries, such as using Alfresco Full Text Search (AFTS), use the
[`SearchApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-rest-api/docs/SearchApi.md#search){:target="_blank"},;

[More info about this ReST API endpoint]({% link content-services/7.2/develop/rest-api-guide/searching.md %}#searchbyquery)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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
