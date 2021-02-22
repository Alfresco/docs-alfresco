---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# AVM Node API

AVM specific node objects have an additional API.

-   **[rename](../references/API-JS-avm-node-rename.md)**  
 `rename(name)` renames the node. This is a special operation in AVM. It cannot be performed by simply changing the `cm:name` property value.
-   **[copy](../references/API-JS-avm-node-copy.md)**  
 `copy()` these methods copy the current node to a new destination.
-   **[move](../references/API-JS-avm-node-move.md)**  
 `move()` these methods move the current node to a new destination.

**Parent topic:**[AVM API](../references/API-JS-AVM.md)

## Properties

The API provides the following properties:

-   **`version`**

    Returns the version of the node

-   **`path`**

    Returns the fully qualified AVM path to the node

-   **`parentPath`**

    Returns the fully qualified AVM path to the parent of the node

-   **`isDirectory`**

    Returns true if this AVM node is a directory

-   **`isFile`**

    Returns true if this AVM node is a file

-   **`isLocked`**

    Returns true if the node is currently locked

-   **`isLockOwner`**

    Returns true if the node is locked and the current user is the lock owner

-   **`type`**

    Returns QName type of the node

-   **`name`**

    Returns name property of the node

-   **`hasLockAccess`**

    Returns true this user can perform operations on the node when locked. This is true if the item is unlocked, or locked and the current user is the lock owner, or locked and the current user has the Content Manager role in the associated web project.


