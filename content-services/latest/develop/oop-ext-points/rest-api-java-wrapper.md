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
|`where`|Optionally filter the node list.|Here are some examples:<br/>`where=(isFolder=true)`<br/>`where=(isFile=true)`<br/>`where=(nodeType='my:specialNodeType')`<br/>`where=(nodeType='my:specialNodeType INCLUDESUBTYPES')`|
|`includeSource`|Also include `source` in addition to `entries` with folder information on the parent node – either the specified parent nodeId, or as resolved by `relativePath`|TODO|
|`orderBy`| A string to control the order of the entities returned in a list. The default sort order for the returned list is for folders to be sorted before files, and by ascending name. You can override the default using `orderBy` to specify one or more fields to sort by. The default order is always ascending, but you can use an optional `ASC` or `DESC` modifier to specify an ascending or descending sort order. For example, specifying `orderBy=name DESC` returns a mixed folder/file list in descending name order. You can use any of the following fields to order the results: `isFolder`, `name`, `mimeType`, `nodeType`, `sizeInBytes`, `modifiedAt`, `createdAt`, `modifiedByUser`, `createdByUser`|TODO|
|`skipCount`|The number of entities that exist in the collection before those included in this list, useful when implementing paging scenarios. If not supplied then the default value is `0`.|TODO|
|`maxItems`|The maximum number of items to return in the list, useful when implementing paging scenarios. If not supplied then the default value is `100`.|TODO|
|`autoRename`|If `true`, then a name clash will cause an attempt to auto rename by finding a unique name using an integer suffix.|TODO|
|`versioningEnabled`|Should versioning of files be enabled at all? |TODO|
|`majorVersion`|If `true`, then it will be a major version, such as 1.0, 2.0 etc. If `false`, then the version change will be 1.1, 1.2, which is a minor version change.|TODO|
|`updateComment`|Add a version comment which will appear in version history. Setting this parameter also enables versioning of this node, if it is not already versioned.|`String updateComment = "A comment";`|
|`updatedName`|Optional new name of the node, sets `cm:name`. This should include the file extension. The name must not contain spaces or the following special characters: `* " < > \ / ? : |`. The character `.` must not be used at the end of the name.|TODO|

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

## Get folder/file metadata {#getnodemetadata}
To get metadata for a node, such as a file or folder, in the repository use the `getNode` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#getNode){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#getnodemetadata)

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
                                       
2021-04-29 08:09:19.367  INFO 18370 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 18370 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 08:09:19.371  INFO 18370 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 08:09:20.430  INFO 18370 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=3f6bb7ee-3f47-307b-93ed-ce624cea7e36
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

## Create a folder
To create a folder in the repository use the `createNode` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#createNode){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files.

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#createfolder)

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
of SDK 5 to provide a one method approach as this is [supported in the ReST API]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#uploadfile). 

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
implement and deploy this custom content model see [this documentation]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#uploadfilecustomtype).

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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#uploadnewversionfile)

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

2021-04-28 13:44:49.193  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 15466 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-28 13:44:49.196  INFO 15466 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-28 13:44:50.105  INFO 15466 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=6dfe0ea9-0f4a-3ec7-b2bd-c14ee9405daf
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#getfileversionhistory)

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

2021-04-29 08:04:42.887  INFO 18326 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 18326 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 08:04:42.895  INFO 18326 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 08:04:45.282  INFO 18326 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=3f6bb7ee-3f47-307b-93ed-ce624cea7e36
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#downloadfile)

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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#downloadmultiplefiles)

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

2021-04-29 12:58:51.139  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 19432 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 12:58:51.143  INFO 19432 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 12:58:51.933  INFO 19432 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=b2e7277d-da47-3e07-b7e9-1a8ee73ccd76
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#listfilerenditions)

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

2021-04-29 13:58:22.805  INFO 19701 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 19701 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 13:58:22.811  INFO 19701 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 13:58:23.857  INFO 19701 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=b3c2fca5-7b19-3805-88e4-d3c558223d1c
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#getrenditioncontent)

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

2021-04-29 16:05:22.776  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 20077 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 16:05:22.780  INFO 20077 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 16:05:23.767  INFO 20077 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=d486eb2c-2415-3101-aa77-949438081983
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#updatemetadatanode)

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

2021-04-29 16:27:39.686  INFO 20246 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 20246 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-29 16:27:39.690  INFO 20246 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-29 16:27:40.587  INFO 20246 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=29844b14-f031-3179-8d0e-b64257171844
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#addaspectnode)

## Remove aspects from a folder or file
To remove aspects from a node, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method. The way you do this is described in the [update metadata for a node](#updatenodemetadata) section. 

Removing an aspect from a node is similar to how you add a “marker” aspect. You first get the list of aspects currently
applied to the node. Then you remove the aspect from the list. And finally you use an update node call with the updated
aspect list.

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#removeaspectsnode)

## Get and Set permissions for a folder or file
To manage permissions for a node, use the [`NodesApi.updateNode`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/NodesApi.md#updateNode){:target="_blank"}
method. 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#setpermissionsnode)

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

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

2021-04-30 09:31:59.435  INFO 21515 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 21515 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-30 09:31:59.439  INFO 21515 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-30 09:32:00.402  INFO 21515 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=51c4f594-d970-3206-b766-5ee398458ccd
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#workingwithrelbetweennodes)

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

Assuming we have deployed the [FDK content model]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#alfrescofdkcontentmodel) 
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

2021-04-30 16:26:20.317  INFO 22647 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 22647 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-04-30 16:26:20.321  INFO 22647 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-04-30 16:26:21.081  INFO 22647 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=b9e2f3fd-e462-3455-a26b-5a4c02d3cee3
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#managecomments)

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

2021-05-03 18:54:45.538  INFO 26804 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 26804 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-05-03 18:54:45.542  INFO 26804 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-05-03 18:54:46.357  INFO 26804 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=ebdcba5c-32fa-3044-88ec-b593933d7201
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
[createTagForNode](TagsApi.md#createTagForNode)|Create a tag for a node| 
[deleteTagFromNode](TagsApi.md#deleteTagFromNode)|Delete a tag from a node| 
[getTag](TagsApi.md#getTag)|Get a tag| 
[listTags](TagsApi.md#listTags)|List tags| 
[listTagsForNode](TagsApi.md#listTagsForNode)|List tags for a node| 
[updateTag](TagsApi.md#updateTag)|Update a tag| 

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#managecomments)

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

2021-05-04 09:56:23.448  INFO 27655 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 27655 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-05-04 09:56:23.451  INFO 27655 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-05-04 09:56:24.178  INFO 27655 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=dee6f89b-5e5a-3852-b582-7032d13391d4
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#copynode)

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

2021-05-04 10:52:13.655  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 28353 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-05-04 10:52:13.661  INFO 28353 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-05-04 10:52:14.686  INFO 28353 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=d9599038-7eb9-3338-8b05-7e0067af2eb4
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#movenode)

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

2021-05-04 10:45:44.472  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 28288 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-05-04 10:45:44.476  INFO 28288 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-05-04 10:45:45.300  INFO 28288 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=d9599038-7eb9-3338-8b05-7e0067af2eb4
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

[More info about this ReST API endpoint]({% link content-services/latest/develop/rest-api-guide/folders-files.md %}#locknode)

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

2021-05-04 11:12:48.131  INFO 28630 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 16.0.1 on Admins-MBP with PID 28630 (/Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by admin in /Users/admin/IdeaProjects/sdk5/sdk5-rest-api-java-wrapper-sample)
2021-05-04 11:12:48.136  INFO 28630 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
2021-05-04 11:12:49.231  INFO 28630 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=8dc3abb2-57d1-3bd8-865d-d387331673ce
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
TODO

## Delete a folder or file
TODO

## List deleted folders and files (Trashcan)
TODO

## Restore deleted folders and files (Trashcan)
TODO

## === Managing Sites ===
The following sections walk through how to use the Java ReST API wrapper services when managing Alfresco Share sites.

## Create a site
To create an Alfresco Share site in the repository use the `createSite` method of the 
[`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/SitesApi.md#createSite){:target="_blank"}, 
which is the main API used to create and manage sites.

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

## Update a site
TODO

## Add content to a site
TODO

## Adding members to a site
TODO

## === Managing People and Groups ===
The following sections walk through how to use the Java ReST API wrapper services when managing Alfresco Share sites.

## List people (users)
TODO

## Create a person
TODO

## Get person metadata
TODO

## Update a person
TODO

## Request password reset for a person
TODO

## List groups a person is a member of
TODO

## List groups
TODO

## Create a group
TODO

## Get group metadata
TODO

## Update a group
TODO

## List all people and groups in a group
TODO

## Adding people and groups to a group
TODO

## Delete a person or group from a group
TODO

## Setting permissions for a group
TODO

## === Managing Audit Applications and Logs ===
The following sections walk through how to use the Java ReST API wrapper services when managing audit applications and 
their logs.

## Enable auditing and Alfresco Access audit application
TODO

## List audit applications
TODO

## Get audit application metadata
TODO

## Enable/Disable an audit application
TODO

## List audit entries (logs) for an audit application
TODO

## List audit entries (logs) for a node
TODO

## Get an audit entry (log)
TODO

## Delete audit entries (logs) for an audit application
TODO

## Delete an audit entry (log) for an audit application
TODO

## === Searching for content ===
The following sections walk through how to use the Java ReST API wrapper services when managing audit applications and 
their logs.

## Finding folders and files by a term
To find a folder or a file node in the repository based on a term use the `findNodes` method of the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/docs/QueriesApi.md#findNodes){:target="_blank"}, 
which is a search API you can use when doing simple search on a term. For more complex search, such as Alfresco Full Text Search (AFTS), 
use the [Search API](#searchingbyquery);

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

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
        String nodeType = null; // Restrict the returned results to only those of the given node type and its sub-types

        Integer skipCount = 0;
        Integer maxItems = 100;
        List<String> include = null;
        List<String> orderBy = null;
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

## Finding sites by a term
TODO

## Finding people by a term
TODO

## Finding content by a search query {#searchingbyquery}
To find content based on more complex search queries, such as using Alfresco Full Text Search (AFTS), use the 
[`SearchApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-rest-api/docs/SearchApi.md#search){:target="_blank"},;

For a description of the common parameters, such as `include`, see this [section](#common-parameters).

TODO: Find out how to use common parameters...

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
