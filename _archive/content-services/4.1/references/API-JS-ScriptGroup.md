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

-   **`shortName`**

    Get or set the short name of the group

-   **`fullName`**

    Get or set the full name of the group

-   **`displayName`**

    Get or set the display name for this group \(requires administrator permission\)

-   **`allUsers`**

    Gets the users contained within this group and its subgroups

-   **`allGroups`**

    Gets all descendant subgroups

-   **`childUsers`**

    Gets child users of this group

-   **`childGroups`**

    Gets child groups of this group

-   **`parentGroups`**

    Gets the immediate parents of this group

-   **`allParentGroups`**

    Gets all the parents of this group

-   **`childAuthorities`**

    Gets all the children of this group regardless of type

-   **`userCount`**

    Gets the number of users contained in this group

-   **`groupCount`**

    Gets the number of child groups contained in this group

-   **`groupNodeRef`**

    Gets the NodeRef for this group

-   **`groupNode`**

    Gets the node for this group


-   **[createGroup](../references/API-JS-ScriptGroup-createGroup.md)**  
`createGroup(shortName, displayName)` this method creates a new group as a child of this group.
-   **[deleteGroup](../references/API-JS-ScriptGroup-deleteGroup.md)**  
`deleteGroup()` this method deletes this group.
-   **[removeGroup](../references/API-JS-ScriptGroup-removeGroup.md)**  
`removeGroup(shortName)` this method removes a specified subgroup from this group. It does not delete the subgroup or its members.
-   **[removeUser](../references/API-JS-ScriptGroup-removeUser.md)**  
`removeUser(shortName)`
-   **[addAuthority](../references/API-JS-ScriptGroup-addAuthority.md)**  
`addAuthority(fullAuthorityName)` this method adds an existing authority as a child of this group.
-   **[removeAuthority](../references/API-JS-ScriptGroup-removeAuthority.md)**  
`removeAuthority(fullAuthorityName)` this method removes a child authority from this group.
-   **[getChildUsers](../references/API-JS-ScriptGroup-getChildUsers.md)**  
`getChildUsers(paging, sortBy)` this method gets the child users of this group.
-   **[getChildGroups](../references/API-JS-ScriptGroup-getChildGroups.md)**  
`getChildGroups()` these methods return child groups of this group.
-   **[getChildAuthorities](../references/API-JS-ScriptGroup-getChildAuthorities.md)**  
`getChildAuthorities(paging, sortBy)` this method returns the child authorities \(users and groups\) of this group.
-   **[getParentGroups](../references/API-JS-ScriptGroup-getParentGroups.md)**  
`getParentGroups()` these methods return the immediate parent groups of this group.
-   **[getAllParentGroups](../references/API-JS-ScriptGroup-getAllParentGroups.md)**  
`getAllParentGroups()` these methods return all parent groups of this group.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

