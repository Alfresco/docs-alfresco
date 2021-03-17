---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, addNode]
---

# `addNode`

`addNode(node)` this method adds an existing node as a child of this node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

## Parameters

-   **node**

    The node to add as a child of the current node.


## Example

```

var dir = companyhome.createNode("SUB_FOLDER", "cm:folder");

var properties = new Array();
properties['cm:title'] = "Node title";
properties['cm:description'] = "Node description";

var node = companyhome.createNode("SUPER_FILE.TXT", "cm:content", properties);
node.content = "Node content";

// now add as child of sub folder

dir.addNode(node);    
model.node = node;
      
```

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

