---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, addAspect]
---

# `addAspect`

These methods are used to add new aspects to nodes.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `addAspect(aspect)`

This method adds a new aspect and properties to the node allowing mandatory aspect properties to be supplied when the new aspect is applied.

### Parameters

-   **aspect**

    The aspect to add


### Returns

Boolean

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

Boolean

### Example

`var props = new Array(1); props["cm:template"] = myTemplateNode.nodeRef; document.addAspect("cm:templatable", props);`

