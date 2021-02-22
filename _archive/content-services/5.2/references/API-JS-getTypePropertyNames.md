---
author: Alfresco Documentation
---

# `getTypePropertyNames`

`getTypePropertyNames` returns all the property names defined for this node's type as an array.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

## `getTypePropertyNames`

`getTypePropertyNames(useShortQNames)` - Returns all the property names defined for this node's type as an array.

### Returns

Returns an array of property names for this node's type. Short qnames are returned.

### Example

```

var props = node.getTypePopertyNames();  
        
```

## `getTypePropertyNames (boolean)`

`getTypePropertyNames(useShortQNames)` - Return all the property names defined for this node's type as an array.

### Parameters

-   **useShortQNames**

    If true short-form qnames will be returned, else long-form.


### Returns

Returns an array of property names for this node's type.

### Example

```

var props = node.getTypePopertyNames(false);  // return long form qnames
      
```

