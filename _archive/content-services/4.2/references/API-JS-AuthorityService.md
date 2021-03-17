---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, Authority Service API]
---

# Authority service

Authority is a general term to describe a group, user, or role. The Authority service provides the following methods to retrieve groups. The authority service makes the `groups` root object available.

-   **[createRootGroup](../references/API-JS-createRootGroup.md)**  
`createRootGroup(shortName,displayName)` this method creates a new root group in the default application zone.
-   **[getAllRootGroups](../references/API-JS-getAllRootGroups.md)**  
`getAllRootGroups()` these methods return a list of groups found across all zones.
-   **[getAllRootGroupsInZone](../references/API-JS-getAllRootGroupsInZone.md)**  
`getAllRootGroupsInZone(zone)` these methods return a list of groups in the specified zone.
-   **[getGroup](../references/API-JS-getGroup.md)**  
`getGroup(shortName)` this method gets a group given its short name.
-   **[getGroupForFullAuthorityName](../references/API-JS-getGroupForFullAuthorityName.md)**  
`getGroupForFullAuthorityName(fullName)` this method gets a group given its full authority name.
-   **[getGroups](../references/API-JS-getGroups.md)**  
`getGroups()` these methods return groups across all zones.
-   **[getGroupsInZone](../references/API-JS-getGroupsInZone.md)**  
`getGroupsInZone(...)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.
-   **[getUser](../references/API-JS-getUser.md)**  
`getUser(username)` this method gets a user given the user's username.
-   **[searchGroups](../references/API-JS-searchGroups.md)**  
`searchGroups()` these methods search for groups.
-   **[searchGroupsInZone](../references/API-JS-searchGroupsInZone.md)**  
`searchGroupsInZone()` these methods search for groups in the specified zone.
-   **[searchRootGroups](../references/API-JS-searchRootGroups.md)**  
`searchRootGroups()` these methods search for root groups across all zones.
-   **[searchRootGroupsInZone](../references/API-JS-searchRootGroupsInZone.md)**  
`searchRootGroupsInZone()` these methods search for root groups in the specified zone.
-   **[searchUsers](../references/API-JS-searchUsers.md)**  
`searchUsers(nameFilter, paging, sortBy)` returns an array of `ScriptUsers` that match the specified parameters.
-   **[ScriptGroup object](../references/API-JS-ScriptGroup.md)**  
A `ScriptGroup` object represents an Alfresco group.
-   **[ScriptUser object](../references/API-JS-ScriptUser.md)**  
A `ScriptUser` object represents an Alfresco user.

**Parent topic:**[Services API](../references/API-JS-Services.md)

