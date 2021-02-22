---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: JS API
option: [Permission Security API, Security API]
---

# Security API

The Security ScriptNode API features several methods and properties related to permissions of nodes in the repository.

The Security API provides a wide range of methods for setting and getting permissions on nodes. It is good practice to check for the appropriate user permissions on a node before accessing or modifying it.

## Properties

-   **`permissions`**

    Array of permissions applied to this node, including inherited permissions.


-   **`directPermissions`**

    Array of permissions applied to this node, excluding inherited permissions.


-   **`fullPermissions`**

    Array of all permissions applied to this node, including inherited permissions.


-   **`settablePermissions`**

    Array of settable permissions for this node.


-   **[hasPermission](../references/API-JS-hasPermission.md)**  
`hasPermission(permission)` checks if a user has the specified permission on a node.
-   **[getPermissions](../references/API-JS-getPermissions.md)**  
`getPermissions()` returns an array of permissions attached to a node.
-   **[inheritsPermissions](../references/API-JS-inheritsPermissions.md)**  
`inheritsPermissions()` indicates whether the node inherits permissions.
-   **[setInheritsPermissions](../references/API-JS-setInheritsPermissions.md)**  
`setInheritsPermissions(inherit)`
-   **[setPermission](../references/API-JS-setPermission.md)**  
The `setPermission` methods apply permissions to nodes.
-   **[removePermission](../references/API-JS-removePermission.md)**  
The `removePermission` methods remove permissions for users from a node.

**Parent topic:**[ScriptNode Object API](../references/API-JS-ScriptNode.md)

