---
author: Alfresco Documentation
---

# Modifying and creating API

Most of the available ScriptNode API return read-only values, however the Scripting API also supports writable objects and access to Alfresco repository services.

The `ScriptNode` object lets you modify and add properties, add aspects, create new files, folder, and custom type nodes, and update and set the text content stream for a node. You can also delete nodes, transform content, execute templates, and modify the associations for a node.

**Remember:** JavaScript objects are different to native repository Java objects. Property values in the repository must be the correct object type as defined in the Data Dictionary and exposed by the content model. This means that a string property value expects a Java string, and a multi-valued property expects a list. The Alfresco JavaScript API converts most object types between JavaScript and Java for you such as Array \(for a multi-value property\), numbers, dates, Boolean, and strings. The conversion code handles all common type conversions and recursive lists of those types.

|Type|Description|
|----|-----------|
|`properties`|Property array \(can be modified for updating or adding new properties\)Example:

`// change the name of this document document.properties.name = "Backup of " + document.properties.name; // add a new property string document.properties["cm:locale"] = mylocalenode; // save the property modifications document.save();`The `node.save()`API call is required to persist the property modifications. All other modifications made using the API, such as content or adding aspects, take immediate effect.

|
|`content`|A property to modify the text content of a node Example: `mynode.content = mynode.content + "append some text";`

|
|`name`|A helper property \(a shortcut for `properties.name`\) to get/set the name|

-   **[createFolder](../references/API-JS-createFolder.md)**  
The `createFolder` methods create a new folder as a child of the current node.
-   **[createFile](../references/API-JS-createFile.md)**  
The `createFile` methods create a new file as a child of the current node. Once created the file should have content set using the `content` property.
-   **[createNode](../references/API-JS-createNode.md)**  
The `createNode` methods are used to create new nodes.
-   **[addNode](../references/API-JS-addNode.md)**  
The `addNode(node)` method adds an existing node as a child of this node.
-   **[removeNode](../references/API-JS-removeNode.md)**  
`removeNode(node)` removes all parent-child relationships between two nodes.
-   **[createAssociation](../references/API-JS-createAssoc.md)**  
`createAssociation(target, assocType)` creates a new target association to the specified node with the given association type QName.
-   **[removeAssociation](../references/API-JS-removeAssoc.md)**  
 `removeAssociation(target, assocType)` removes the association to the specified node with the given association type QName.
-   **[remove](../references/API-JS-remove.md)**  
`remove()` this method deletes the node.
-   **[copy](../references/API-JS-copy.md)**  
The `copy`
-   **[move](../references/API-JS-move.md)**  
`move` moves the node to the specified destination.
-   **[addAspect](../references/API-JS-addAspect.md)**  
The `addAspect` methods are used to add new aspects to nodes.
-   **[removeAspect](../references/API-JS-removeAspect.md)**  
`removeAspect(aspect)` removes the specified aspect from the node.
-   **[specializeType](../references/API-JS-specializeType.md)**  
`specializeType(type)` specializes the type of a node.
-   **[revert](../references/API-JS-node-revert.md)**  
`revert` reverts node to the specified version.
-   **[save](../references/API-JS-node-save.md)**  
 `save()` persists the modified properties of this node.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

