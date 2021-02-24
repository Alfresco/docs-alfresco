---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, createFile]
---

# `createFile`

`createFile(name)`

This method creates a new file \(`cm:content`\) node with the specified name as a child of this node.

## Parameters

-   **name**

    The name of the file


## Returns

Returns the newly created node as the result of the function, or throws an exception if the creation failed. Alfresco puts the file MIME type of the content \(there is no MIME type with the `createNode` method\).

## Example

`var myfile = userhome.createFile("newfile.txt");`

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

