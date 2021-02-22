---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# AVM Node API

AVM specific node objects have an additional API.

-   **[node.rename](../references/API-JS-avm-node-rename.md)**  
 `node.rename(name)`

**Parent topic:**[AVM API](../references/API-JS-AVM.md)

## Properties

The API provides the following properties:

-   **`node.version`**

    Returns the version of the node

-   **`node.path`**

    Returns the fully qualified AVM path to the node

-   **`node.parentPath`**

    Returns the fully qualified AVM path to the parent of the node

-   **`node.isDirectory`**

    Returns true if this AVM node is a directory

-   **`node.isFile`**

    Returns true if this AVM node is a file

-   **`node.isLocked`**

    Returns true if the node is currently locked

-   **`node.isLockOwner`**

    Returns true if the node is locked and the current user is the lock owner

-   **`node.hasLockAccess`**

    Returns true this user can perform operations on the node when locked. This is true if the item is unlocked, or locked and the current user is the lock owner, or locked and the current user has the Content Manager role in the associated web project.


