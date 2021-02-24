---
author: Alfresco Documentation
---

# People API

The People API provides basic user and group query and inspection capabilities.

|Property|Description|
|--------|-----------|
|authenticationService|Sets the authentication service.|
|authorityDAO|Sets the authority DAO|
|authorityService|Sets the authority service|
|personService|Sets the person service|
|serviceRegistry|Sets the service registry|
|storeUrl|Sets the store URL|

-   **[getCapabilities](../references/API-FreeMarker-People-getCapabilities.md)**  
`getCapabilities(person)` returns a map of capabilities for a given person.
-   **[getContainerGroups](../references/API-FreeMarker-People-getContainerGroups.md)**  
`getContainerGroups(person)` returns the groups that contain the specified authorities.
-   **[getGroup](../references/API-FreeMarker-People-getGroup.md)**  
`getGroup(groupName)` returns the group corresponding to the specified group name.
-   **[getMembers](../references/API-FreeMarker-People-getMembers.md)**  
`getMembers` these methods return the members of a group.
-   **[getPerson](../references/API-FreeMarker-People-getPerson.md)**  
`getPerson(username)` returns a person object given the person's user name.
-   **[isAccountEnabled](../references/API-FreeMarker-People-isAccountEnabled.md)**  
`isAccountEnabled(person)` returns the status of the specified user.
-   **[isAdmin](../references/API-FreeMarker-People-isAdmin.md)**  
`isAdmin(person)` returns the administrator status of the specified user.
-   **[isGuest](../references/API-FreeMarker-People-isGuest.md)**  
`isGuest(person)` returns the guest status for the specified user.

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

