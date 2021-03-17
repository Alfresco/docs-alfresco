---
author: Alfresco Documentation
---

# `createAssociation`

`createAssociation(target, assocType)` this method creates a new target association to the specified node with the given association type QName.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

## Parameters

-   **target**

    Destination node for the association

-   **assocType**

    Association type qname \(short form or fully qualified\)


## Returns

The new association.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

