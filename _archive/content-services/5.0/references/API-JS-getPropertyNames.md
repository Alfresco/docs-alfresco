---
author: Alfresco Documentation
---

# `getPropertyNames`

`getPropertyNames(useShortQNames)` returns all the property names defined for this node as an array.

## Parameters

-   **useShortQNames**

    If true short-form qnames will be returned, else long-form.


## Returns

Returns an array of property names for this node type and optionally parent properties.

## Example

```

var props = node.getPropertyNames(true);
      
```

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

