---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, ScriptGroup object API]
---

# ScriptGroup object

A `ScriptGroup` object represents an Alfresco group.

## Properties

-   **`authorityType`**

    Get or set the authority type

-   **`allGroups`**

    Gets all descendant subgroups

-   **`allUsers`**

    Gets the users contained within this group and its subgroups

-   **`childUsers`**

    Gets child users of this group

-   **`displayName`**

    Get or set the display name for this group \(requires administrator permission\)

-   **`fullName`**

    Get or set the full name of the group

-   **`shortName`**

    Get or set the short name of the group


-   **[addAuthority](../references/API-JS-ScriptGroup-addAuthority.md)**  
`addAuthority(fullAuthorityName)` this method adds an existing authority as a child of this group.
-   **[createGroup](../references/API-JS-ScriptGroup-createGroup.md)**  
`createGroup(shortName, displayName)` this method creates a new group as a child of this group.
-   **[deleteGroup](../references/API-JS-ScriptGroup-deleteGroup.md)**  
`deleteGroup()` this method deletes this group.
-   **[getAllGroups](../references/API-JS-ScriptGroup-getAllGroups.md)**  
`getAllGroups()` returns all descendent groups of this group.
-   **[getAllParentGroups](../references/API-JS-ScriptGroup-getAllParentGroups.md)**  
`getAllParentGroups()` these methods return all parent groups of this group.
-   **[getAllUsers](../references/API-JS-ScriptGroup-getAllUsers.md)**  
`getAllUsers()` returns all users contained in this group.
-   **[getChildAuthorities](../references/API-JS-ScriptGroup-getChildAuthorities.md)**  
`getChildAuthorities(...)` these methods return the child authorities \(users and groups\) of this group.
-   **[getChildGroups](../references/API-JS-ScriptGroup-getChildGroups.md)**  
`getChildGroups()` these methods return child groups of this group.
-   **[getChildUsers](../references/API-JS-ScriptGroup-getChildUsers.md)**  
`getChildUsers(...)` these methods get the child users of this group.
-   **[getGroupCount](../references/API-JS-ScriptGroup-getGroupCount.md)**  
`getGroupCount()` - returns the number of child groups contained within this group.
-   **[getGroupNode](../references/API-JS-ScriptGroup-getGroupNode.md)**  
`getGroupNode()` - returns a script node object wrapping this group.
-   **[getGroupNodeRef](../references/API-JS-ScriptGroup-getGroupNodeRef.md)**  
`getGroupNodeRef()` - returns the node reference of this group.
-   **[getParentGroups](../references/API-JS-ScriptGroup-getParentGroups.md)**  
`getParentGroups()` these methods return the immediate parent groups of this group.
-   **[getUserCount](../references/API-JS-ScriptGroup-getUserCount.md)**  
`getUserCount()` - returns the number of users within this group.
-   **[getZones](../references/API-JS-ScriptGroup-getZones.md)**  
`getZones()` - returns a set of zone names for this group. Zones provide a higher level way of organizing groups.
-   **[removeAuthority](../references/API-JS-ScriptGroup-removeAuthority.md)**  
`removeAuthority(fullAuthorityName)` this method removes a child authority from this group.
-   **[removeGroup](../references/API-JS-ScriptGroup-removeGroup.md)**  
`removeGroup(shortName)` this method removes a specified subgroup from this group. It does not delete the subgroup or its members.
-   **[removeUser](../references/API-JS-ScriptGroup-removeUser.md)**  
`removeUser(shortName)`

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

