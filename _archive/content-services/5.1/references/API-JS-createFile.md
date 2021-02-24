---
author: Alfresco Documentation
---

# `createFile`

The `createFile` methods create a new file as a child of the current node. Once created the file should have content set using the `content` property.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) on the node first.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `createFile(name)`

`createFile(name)` this method creates a new file node of type `cm:content` with the specified name. The node is created as a child of the current node.

### Parameters

-   **name**

    The name of the file to create


### Returns

Returns the newly created node as the result of the function, or returns null if the creation failed. Alfresco puts the file MIME type of the content \(there is no MIME type with the `createNode` method\).

### Example

`var myfile = userhome.createFile("newfile.txt");`

## `createFile(name, type)`

`createFile(name)` this method creates a new file node of type `cm:content` with the specified name. The node is created as a child of the current node.

### Parameters

-   **name**

    The name of the file to create

-   **type**

    The type of file to create. If null will create `ContentModel.TYPE_CONTENT`.


### Returns

Returns the newly created node as the result of the function, or returns null if the creation failed. Alfresco puts the file MIME type of the content \(there is no MIME type with the `createNode` method\).

### Example

`var myfile = userhome.createFile("newfile.txt", "cm:content");`

