---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, createFolder]
---

# `createFolder`

createFolder\(\) these methods create a new folder as a child of the current node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## createFolder\(name\)

`createFolder(name)` this method creates a new folder \(`cm:folder`\) node with the specified name as a child of this node.

### Parameters

-   **name**

    The folder name


### Returns

Returns the new node as the result of the function or returns null if the creation fails.

### Example

`var myfolder = userhome.createFolder("New Folder");`

## createFolder\(name, type\)

`createFolder(name, type)` this method creates a new folder \(`cm:folder`\) node with the specified name and type as a child of this node.

### Parameters

-   **name**

    The folder name

-   **type**

    The type of the folder to create. If null it defaults to type `ContentModel.TYPE_FOLDER`. Examples of folder types include `cm:systemfolder`, `cm:folder`, `st:site`, and `fm:forum`.


### Returns

Returns the new node as the result of the function or returns null if the creation fails.

### Example

`var myfolder = userhome.createFolder("New Folder", "st:site");`

