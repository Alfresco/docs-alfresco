---
author: Alfresco Documentation
---

# People API

The People API provides access to Alfresco people and groups.

-   **[addAuthority](../references/API-JS-addAuthority.md)**  
`addAuthority(parentGroup, authority)` adds an authority \(User or Group \) to the specified parent group.
-   **[changePassword](../references/API-JS-changePassword.md)**  
`changePassword(oldpassword, newpassword)` changes the password for the current user only when the old password is supplied.
-   **[createGroup](../references/API-JS-createGroup.md)**  
The `createGroup` methods are used to create groups.
-   **[createPerson](../references/API-JS-createPerson.md)**  
`createPerson` creates a person \(`cm:person`\) object.
-   **[deleteGroup](../references/API-JS-deleteGroup.md)**  
`deleteGroup(group)` removes a group from the system.
-   **[deletePerson](../references/API-JS-deletePerson.md)**  
The `deletePerson(username)` method deletes a person with the given user name from the system.
-   **[disableAccount](../references/API-JS-disableAccount.md)**  
`disableAccount(userName)` disables an enabled account. It can be invoked with Administrator authority only.
-   **[enableAccount](../references/API-JS-enableAccount.md)**  
`enableAccount(userName)` enables a disabled account. It can be invoked with Administrator authority only.
-   **[getCapabilities](../references/API-JS-getCapabilities.md)**  
`getCapabilities(person)` returns a hash of the specified user's capabilities.
-   **[getContainerGroups](../references/API-JS-getContainerGroups.md)**  
`getContainerGroups(person)` gets the groups that contain the specified authority.
-   **[getExcludeTenantFilter](../references/API-JS-getExcludeTenantFilter.md)**  
`getExcludeTenantFilter(person)` returns a Boolean.
-   **[getGroup](../references/API-JS-people-getGroup.md)**  
`getGroup(groupId)` gets a group given its group ID.
-   **[getImmutableProperties](../references/API-JS-getImmutableProperties.md)**  
`getImmutableProperties(username)` returns a map of the person properties that are marked as immutable for the given user.
-   **[getMembers](../references/API-JS-getMembers.md)**  
`getMembers` returns an array of people nodes belonging to the specified group \(including all subgroups\).
-   **[getPeople](../references/API-JS-getPeople.md)**  
The `getPeople(...)` methods get the collection of people stored in the repository.
-   **[getPeoplePaging](../references/API-JS-getPeoplePaging.md)**  
`getPeoplePaging()` gets the collection of people stored in the repository.
-   **[getPeopleEvaluationMode](../references/API-JS-getPermissionEvaluationMode.md)**  
`ScriptNode getPeopleEvaluationMode(username)` returns the permission evaluation mode.
-   **[getPerson](../references/API-JS-getPerson.md)**  
`ScriptNode getPerson(username)` returns a single \(cm:person\) node associated with the specified user name, or null if the person does not exist.
-   **[getPersonFullName](../references/API-JS-getPersonFullName.md)**  
`ScriptNode getPersonFullName(username)` avoids complete `getProperties()` retrieval for a `cm:person` when the script only requires the full name of person.
-   **[isAccountEnabled](../references/API-JS-isAccountEnabled.md)**  
`isAccountEnabled(userName)` determines if the specified user's account is enabled.
-   **[isAdmin](../references/API-JS-isAdmin.md)**  
`isAdmin(person)` determines if the specified user has Administrator authority.
-   **[isGuest](../references/API-JS-isGuest.md)**  
`isGuest(person)` determines if the specified user has Guest authority.
-   **[removeAuthority](../references/API-JS-removeAuthority.md)**  
`removeAuthority(parentGroup, authority)` removes an authority from a group.
-   **[setPassword](../references/API-JS-setPassword.md)**  
`setPassword(userName, password)` sets the password for the given user. It is executable with Administrator authority only.
-   **[setQuota](../references/API-JS-setQuota.md)**  
`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.
-   **[setStoreUrl](../references/API-JS-setStoreUrl.md)**  
`setStoreUrl(storeRef)` sets the default store reference.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

