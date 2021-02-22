---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: JS API
option: Permission Security API
---

# Permission and Security API

The Permission and Security ScriptNode API features several methods and properties related to permissions in the repository.

**Note:** It is common to check for the appropriate user permissions on a node before accessing or modifying it.

-   **[hasPermission](../references/API-JS-hasPermission.md)**  

-   **[getPermissions](../references/API-JS-getPermission.md)**  

-   **[inheritsPermission](../references/API-JS-inheritPermission.md)**  

-   **[setInheritsPermissions](../references/API-JS-setInheritsPermissions.md)**  
`setInheritsPermissions(inherit)`
-   **[setPermission](../references/API-JS-setPermission.md)**  
The `setPermission` methods apply permissions to nodes.
-   **[removePermission](../references/API-JS-removePermission.md)**  
The `removePermission` methods remove permissions for users from a node.
-   **[setOwner](../references/API-JS-setOwner.md)**  
`setOwner(userId)`
-   **[getOwner](../references/API-JS-getOwner.md)**  
`getOwner()`
-   **[takeOwnership](../references/API-JS-takeOwnership.md)**  
`takeOwnership()`

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

## Properties

The Permission and Security ScriptNode API has the following property:

-   **`owner`**

    The owner property of the node \(as a UID\)


