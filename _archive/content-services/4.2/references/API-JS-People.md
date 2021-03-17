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
`createGroup` these methods are used to create groups.
-   **[createPerson](../references/API-JS-createPerson.md)**  
`createPerson` creates a person \(`cm:person`\) object.
-   **[deleteGroup](../references/API-JS-deleteGroup.md)**  
`deleteGroup(group)` this method removes a group from the system.
-   **[deletePerson](../references/API-JS-deletePerson.md)**  
`deletePerson(username)` deletes a person with the given user name from the system.
-   **[disableAccount](../references/API-JS-disableAccount.md)**  
`diableAccount(userName)` disables an enabled account. It can be invoked only by an Administrator authority.
-   **[enableAccount](../references/API-JS-enableAccount.md)**  
`enableAccount(userName)` enables a disabled account. It can be invoked only by an Administrator authority.
-   **[getCapabilities](../references/API-JS-getCapabilities.md)**  
`getCapabilities(person)` returns a hash of the specified user's capabilities.
-   **[getContainerGroups](../references/API-JS-getContainerGroups.md)**  
`getContainerGroups(person)` gets the groups that contain the specified authority.
-   **[getExcludeTenantFilter](../references/API-JS-getExcludeTenantFilter.md)**  
`getExcludeTenantFilter(person)` returns a boolean.
-   **[getGroup](../references/API-JS-people-getGroup.md)**  
`getGroup(groupId)` gets a group given its group ID.
-   **[getImmutableProperties](../references/API-JS-getImmutableProperties.md)**  
`getImmutableProperties(person)` returns a map of the Person properties that are marked as immutable for the given user.
-   **[getMembers](../references/API-JS-getMembers.md)**  
`getMembers` returns an array of people nodes belonging to the specified group \(including all subgroups\).
-   **[getPeople](../references/API-JS-getPeople.md)**  
`getPeople()` methods get the collection of people stored in the repository.
-   **[getPeoplePaging](../references/API-JS-getPeoplePaging.md)**  
`getPeoplePaging()` method gets the collection of people stored in the repository.
-   **[getPeopleEvaluationMode](../references/API-JS-getPermissionEvaluationMode.md)**  
`ScriptNode getPeopleEvaluationMode(username)` returns permission evaluation mode.
-   **[getPerson](../references/API-JS-getPerson.md)**  
`ScriptNode getPerson(username)` returns a single \(cm:person\) node associated with the specified user name, or null if the person does not exist.
-   **[getPersonFullName](../references/API-JS-getPersonFullName.md)**  
`ScriptNode getPersonFullName(username)` - Faster helper when the script just wants to build the Full name for a person. Avoids complete `getProperties()` retrieval for a `cm:person`.
-   **[isAccountEnabled](../references/API-JS-isAccountEnabled.md)**  
`isAccountEnabled(userName)` determines if the specified user's account is enabled.
-   **[isAdmin](../references/API-JS-isAdmin.md)**  
`isAdmin(person)` - determines if the specified user is an Administrator authority.
-   **[isGuest](../references/API-JS-isGuest.md)**  
`isGuest(person)` determines if the specified user is a Guest authority.
-   **[removeAuthority](../references/API-JS-removeAuthority.md)**  
`removeAuthority(parentGroup, authority)` removes an authority from a group.
-   **[setPassword](../references/API-JS-setPassword.md)**  
`setPassword(userName, password)` sets the password for the given user. It is only executable by an Administrator authority.
-   **[setQuota](../references/API-JS-setQuota.md)**  
`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.
-   **[setStoreUrl](../references/API-JS-setStoreUrl.md)**  
`setStoreUrl(storeRef)` - set the default store reference.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

