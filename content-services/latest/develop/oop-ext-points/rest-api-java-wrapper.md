---
title: ReST API Java Wrapper Extension Point
---

One of the libraries provided by the [SDK for out-of-process extensions]({% link content-services/latest/develop/oop-sdk.md %})
is the Java ReST API wrapper library. It enables you to work with the [Alfresco ReST API]({% link content-services/latest/develop/rest-api-guide/index.md %}) 
from a Java client with standard Java classes. There is no need to parse JSON or create HTTP requests.

To set up a project with the Java ReST API library follow these [instructions]({% link content-services/latest/develop/oop-sdk.md %}#restapijavawrapperproject).

## === Managing Folders and Files ===
The following sections walk through how to use the Java ReST API wrapper services when managing folders and files.

## List contents of a folder
To list contents of a folder in the repository use the `listNodeChildren` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

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
        Integer skipCount = 0;            // The number of entities that exist in the collection before those included in this list.  If not supplied then the default value is 0.
        Integer maxItems = 100;           // The maximum number of items to return in the list.  If not supplied then the default value is 100.

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
        // Optionally filter the node list.
        // Here are some examples:
        // where=(isFolder=true)
        // where=(isFile=true)
        // where=(nodeType='my:specialNodeType')
        // where=(nodeType='my:specialNodeType INCLUDESUBTYPES')
        String where = null;
        // Also include `source` in addition to `entries` with folder information on the parent node –
        // either the specified parent nodeId, or as resolved by relativePath.
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

## Filter contents of a folder
TODO

## Get folder/file metadata
To get metadata for a node, such as a file or folder, in the repository use the `getNode` method of the 
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
which is one of the main APIs used when you want to manipulate folders and files. 

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
[`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
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
TODO

To upload a file to the repository use the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
which is one of the main APIs use when you want to manipulate folders and files. 

## Upload a file with custom type
TODO

## Upload a new version of file
TODO

## Get file version history
TODO

## Download a file
TODO

## Download multiple files
TODO

## List file renditions
TODO

## Get file rendition content
TODO

## Update metadata for a folder or file
TODO

## Add aspects to a folder or file
TODO

## Remove aspects from a folder or file
TODO

## Get and Set permissions for a folder or file
TODO

## Working with relationships between folders/files
TODO

## Manage comments for a folder or file
TODO

## Manage tags for a folder or file
TODO

## Copy folders and files
TODO

## Move folders and files
TODO

## Lock a file for editing
TODO

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
TODO

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
To find a folder or a file node in the repository based on a term use the [`QueriesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/QueriesApi.java){:target="_blank"}, 
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

## Finding sites by a term
TODO

## Finding people by a term
TODO

## Finding content by a search query {#searchingbyquery}
TODO






