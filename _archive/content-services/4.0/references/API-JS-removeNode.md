---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, removeNode]
---

# `removeNode`

`removeNode(node)` this method removes all parent-child relationships between two nodes.

The child node will be cascade deleted if one of the associations was the primary association, that is, the one with which the child node was created.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

## Parameters

-   **node**

    The node to be removed.


## Example

```

var dir = companyhome.childByNamePath("SUB_FOLDER");
var node = companyhome.childByNamePath("SUPER_FILE.TXT");

// delete child from parent

dir.removeNode(node);
       
```

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

