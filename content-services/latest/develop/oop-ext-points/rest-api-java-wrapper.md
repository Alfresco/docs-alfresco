---
title: ReST API Java Wrapper Extension Point
---

One of the libraries provided by the [SDK for out-of-process extensions]({% link content-services/latest/develop/oop-sdk.md %})
is the Java ReST API wrapper library. It enables you to work with the [Alfresco ReST API]({% link content-services/latest/develop/rest-api-guide/index.md %}) 
from a Java client with standard Java classes. There is no need to parse JSON or create HTTP requests.

To set up a project with the Java ReST API library follow these [instructions]({% link content-services/latest/develop/oop-sdk.md %}#restapijavawrapperproject).

## Creating a folder
To create a folder in the repository use the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
which is one of the main APIs use when you want to manipulate folders and files. 

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

## Uploading a file
To upload a file to the repository use the [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"}, 
which is one of the main APIs use when you want to manipulate folders and files. 



## Creating a site

