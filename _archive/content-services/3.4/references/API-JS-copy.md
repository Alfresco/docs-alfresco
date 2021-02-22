---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, copy]
---

# `copy`

The `copy` methods are used to copy nodes to specified destination nodes.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `copy(destination)`

This method copies the node to the specified destination node.

### Parameters

-   **destination**

-   **deepCopy**

### Returns

Returns the newly copied `ScriptNode` instance on success, or null if the copy fails reason.

### Example

`var docCopy = document.copy(userhome);`

## `copy(destination, deepCopy)`

This method copies the node to the specified destination node. It copies all child nodes of the source if the `deepCopy` argument is true. Otherwise, it only copies the source node itself.

### Parameters

-   **destination**

-   **deepCopy**

### Returns

Returns the newly copied `ScriptNode` instance on success, or null if the copy fails reason.

### Example

`var docCopy = document.copy(userhome);`

