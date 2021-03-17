---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, addAspect]
---

# `addAspect`

`addAspect` these methods are used to add new aspects to nodes.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `addAspect(aspect)`

This method adds a new aspect and properties to the node allowing mandatory aspect properties to be supplied when the new aspect is applied.

### Parameters

-   **aspect**

    The aspect to add


### Returns

True if the aspect was added successfully, false otherwise.

### Example

`document.addAspect("cm:translatable");`

## `addAspect(aspect, properties)`

This method adds a new aspect and properties to the node allowing mandatory aspect properties to be supplied when the new aspect is applied.

### Parameters

-   **aspect**

    The aspect to add

-   **properties**

    An associative array of QName keyed properties


### Returns

True if the aspect was added successfully, false otherwise.

### Example

```

var props = new Array(); 
props["cm:template"] = myTemplateNode.nodeRef; 
document.addAspect("cm:templatable", props);
```

