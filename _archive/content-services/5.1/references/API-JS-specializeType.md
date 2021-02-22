---
author: Alfresco Documentation
---

# `specializeType`

`specializeType(type)` specializes the type of a node.

Resets the type of the node. Can be called in order specialise a node to a sub-type. This should be used with caution since calling it changes the type of the node and thus implies a different set of aspects, properties and associations. It is the responsibility of the caller to ensure that the node is in an approriate state after changing the type.

## Parameters

-   **type**

    The type name supplied must be a subtype of the current type as defined in the Data Dictionary


## Returns

Boolean. Returns true on success, false otherwise.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

