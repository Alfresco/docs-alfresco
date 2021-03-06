---
author: Alfresco Documentation
---

# People API

The People API provides access to Alfresco people and groups.

 

-   **[createPerson](../references/API-JS-createPerson.md)**  
`createPerson` creates a person \(`cm:person`\) object.
-   **[deletePerson](../references/API-JS-deletePerson.md)**  
`deletePerson(username)` deletes a person with the given user name from the system.
-   **[createGroup](../references/API-JS-createGroup.md)**  
`createGroup` these methods are used to create groups.
-   **[deleteGroup](../references/API-JS-deleteGroup.md)**  
`deleteGroup(group)` this method removes a group from the system.
-   **[getMembers](../references/API-JS-getMembers.md)**  
`getMembers` returns an array of people nodes belonging to the specified group \(including all subgroups\).
-   **[addAuthority](../references/API-JS-addAuthority.md)**  
`addAuthority(parentGroup, authority)` adds an authority \(User or Group \) to the specified parent group.
-   **[removeAuthority](../references/API-JS-removeAuthority.md)**  
`removeAuthority(parentGroup, authority)` removes an authority from a group.
-   **[getContainerGroups](../references/API-JS-getContainerGroups.md)**  
`getContainerGroups(person)` gets the groups that contain the specified authority.
-   **[isAdmin](../references/API-JS-isAdmin.md)**  
`isAdmin(person)` determines if the specified user is an Administrator authority.
-   **[isGuest](../references/API-JS-isGuest.md)**  
`isGuest(person)` determines if the specified user is a Guest authority.
-   **[changePassword](../references/API-JS-changePassword.md)**  
`changePassword(oldpassword, newpassword)` changes the password for the current user only when the old password is supplied.
-   **[setPassword](../references/API-JS-setPassword.md)**  
`setPassword(userName, password)` sets the password for the given user. It is only executable by an Administrator authority.
-   **[enableAccount](../references/API-JS-enableAccount.md)**  
`enableAccount(userName)` enables a disabled account. It can be invoked only by an Administrator authority.
-   **[disableAccount](../references/API-JS-disableAccount.md)**  
`diableAccount(userName)` disables an enabled account. It can be invoked only by an Administrator authority.
-   **[isAccountEnabled](../references/API-JS-isAccountEnabled.md)**  
`isAccountEnabled(userName)` determines if the specified user's account is enabled.
-   **[setQuota](../references/API-JS-setQuota.md)**  
`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.
-   **[getPeople](../references/API-JS-getPeople.md)**  
`getPeople()` methods get the collection of people stored in the repository.
-   **[getPerson](../references/API-JS-getPerson.md)**  
`ScriptNode getPerson(username)` returns a single \(cm:person\) node associated with the specified user name, or null if the person does not exist.
-   **[getGroup](../references/API-JS-getGroup.md)**  
`getGroup(shortName)` this method gets a group given its short name.
-   **[getCapabilities](../references/API-JS-getCapabilities.md)**  
`getCapabilities(person)` returns a hash of the specified user's capabilities.
-   **[getImmutableProperties](../references/API-JS-getImmutableProperties.md)**  
`getImmutableProperties(person)` returns a map of the Person properties that are marked as immutable for the given user.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

