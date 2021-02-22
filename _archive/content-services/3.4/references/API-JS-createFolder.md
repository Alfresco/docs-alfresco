---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, createFolder]
---

# `createFolder`

`createFolder(name)`

This method creates a new folder \(`cm:folder`\) node with the specified name as a child of this node.

## Parameters

-   **name**

    The folder name


## Returns

Returns the new node as the result of the function or throws an exception if the creation fails.

## Example

`var myfolder = userhome.createFolder("New Folder");`

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

