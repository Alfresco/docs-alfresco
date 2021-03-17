---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, Authority Service API]
---

# Authority service

Authority is a general term to describe a group, user, or role. The authority service provides the following methods to retrieve groups. The authority service makes the `groups` root object available.

-   **[createRootGroup](../references/API-JS-createRootGroup.md)**  
`createRootGroup(shortName,displayName)` creates a new root group in the default application zone.
-   **[getAllRootGroups](../references/API-JS-getAllRootGroups.md)**  
The `getAllRootGroups()` methods return a list of groups found across all zones.
-   **[getAllRootGroupsInZone](../references/API-JS-getAllRootGroupsInZone.md)**  
The `getAllRootGroupsInZone(zone)` methods return a list of groups in the specified zone.
-   **[getGroup](../references/API-JS-getGroup.md)**  
`getGroup(shortName)` gets a group given its short name.
-   **[getGroupForFullAuthorityName](../references/API-JS-getGroupForFullAuthorityName.md)**  
`getGroupForFullAuthorityName(fullName)` gets a group given its full authority name.
-   **[getGroups](../references/API-JS-getGroups.md)**  
The `getGroups()` methods return groups across all zones.
-   **[getGroupsInZone](../references/API-JS-getGroupsInZone.md)**  
`getGroupsInZone(...)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.
-   **[getUser](../references/API-JS-getUser.md)**  
`getUser(username)` gets a user given the user's user name.
-   **[searchGroups](../references/API-JS-searchGroups.md)**  
The `searchGroups()` methods search for groups.
-   **[searchGroupsInZone](../references/API-JS-searchGroupsInZone.md)**  
The `searchGroupsInZone()` methods search for groups in the specified zone.
-   **[searchRootGroups](../references/API-JS-searchRootGroups.md)**  
The `searchRootGroups()` methods search for root groups across all zones.
-   **[searchRootGroupsInZone](../references/API-JS-searchRootGroupsInZone.md)**  
The `searchRootGroupsInZone()` methods search for root groups in the specified zone.
-   **[searchUsers](../references/API-JS-searchUsers.md)**  
`searchUsers(nameFilter, paging, sortBy)` returns an array of `ScriptUsers` that match the specified parameters.
-   **[ScriptGroup object](../references/API-JS-ScriptGroup.md)**  
A `ScriptGroup` object represents an Alfresco group.
-   **[ScriptUser object](../references/API-JS-ScriptUser.md)**  
A `ScriptUser` object represents an Alfresco user.

**Parent topic:**[Services API](../references/API-JS-Services.md)

