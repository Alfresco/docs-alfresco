---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Group object

A `group` object represents an Alfresco group.

-   **[createGroup](../references/API-JS-Group-createGroup.md)**  
`createGroup(shortName,displayName)`
-   **[removeGroup](../references/API-JS-Group-removeGroup.md)**  
`removeGroup(shortName)`
-   **[removeUser](../references/API-JS-Group-removeUser.md)**  
`removeUser(shortName)`
-   **[addAuthority](../references/API-JS-Group-addAuthority.md)**  
`addAuthority(fullAuthorityName)`
-   **[removeAuthority](../references/API-JS-Group-removeAuthority.md)**  
`removeAuthority(fullAuthorityName)`

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## Properties

The `group` object provides the following properties:

-   **`authorityType`**

    Gets the authority type


-   **`shortName`**

    Gets the short name of the group


-   **`fullName`**

    Gets the full name of the group


-   **`displayName`**

    Changes the display name for this group \(requires administrator permission\)


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


-   **`getUserCount`**

    Gets the number of users contained in this group


-   **`getGroupCount`**

    Gets the number of child groups contained in this group


-   **`isRootGroup`**

    Indicates whether the group is a root group


-   **`isAdminGroup`**

    Indicates whether the group is an admin group


-   ****

