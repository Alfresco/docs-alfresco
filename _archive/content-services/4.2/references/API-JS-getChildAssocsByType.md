---
author: Alfresco Documentation
---

# `getChildAssocsByType`

`getChildAssocsByType(String type)` - returns an array of the associations from the referenced node that match a specific object type.

## Parameters

-   **type**

    A string representing the specific object type.


## Returns

Returns the aspects applied to this node as an array of short prefix qname strings.

## Example

```
var assoc = node.getChildAssocsByType("cm:folder")[0];
```

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

