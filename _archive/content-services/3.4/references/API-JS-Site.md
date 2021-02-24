---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Services, API/Script, JavaScript]
keyword: [JavaScript API, Site object]
---

# Site object

The `site` object provides various properties and methods.

-   **[save](../references/API-JS-Site-save.md)**  
`save\(\)`
-   **[deleteSite](../references/API-JS-deleteSite.md)**  
`deleteSite\(\)`
-   **[listMembers](../references/API-JS-Site-listMembers.md)**  
`listMembers(nameFilter, roleFilter, size, collapseGroups)`
-   **[isMember](../references/API-JS-isMember.md)**  
isMember\(userName\)
-   **[getMembersRole](../references/API-JS-getMembersRole.md)**  
`getMembersRole\(userName\)`
-   **[inviteNominated \(new user\)](../references/API-JS-inviteNominatednew.md)**  
`inviteNominated\(inviteeFirstName,inviteeLastName, inviteeEmail, inviteeRole, serverPath,acceptUrl,rejectUrl\)`
-   **[inviteNominated \(existing user\)](../references/API-JS-inviteNominatedexisting.md)**  
`inviteNominated\(inviteeUserName,inviteeRole, serverPath,acceptUrl,rejectUrl\)`
-   **[setMembership](../references/API-JS-setMembership.md)**  
`setMembership\(userName, role\)`
-   **[removeMembership](../references/API-JS-removeMembership.md)**  
``removeMembership(userName)``
-   **[getContainer](../references/API-JS-getContainer.md)**  
`getContainer(componentId)`
-   **[createContainer](../references/API-JS-createContainer.md)**  
The createContainer methods create new site containers.
-   **[hasContainer](../references/API-JS-hasContainer.md)**  
`hasContainer(componentId)`
-   **[setPermissions](../references/API-JS-setPermissions.md)**  
`setPermissions(node,premissions)`
-   **[resetAllPermissions](../references/API-JS-resetAllPermissions.md)**  
`resetAllPermissions(node)`
-   **[denyAllAccess](../references/API-JS-denyAllAccess.md)**  
`denyAllAccess(node)`
-   **[getCustomProperty](../references/API-JS-getCustomProperty.md)**  
`getCustomProperty(name)`
-   **[getCustomProperties](../references/API-JS-getCustomProperties.md)**  
`getCustomProperties()`
-   **[inviteModerated](../references/API-JS-inviteModerated.md)**  
`inviteModerated(inviteeComments,inviteeUserName,inviteeRole)`
-   **[getInvitation](../references/API-JS-getInvitation.md)**  
`getInvitation(invitationId)`
-   **[listInvitations](../references/API-JS-listInvitations.md)**  
`listInvitations()`
-   **[allowAllMembersCollaborate](../references/API-JS-allowAllMembersCollaborat.md)**  
`allowAllMembersCollaborate(node)`

**Parent topic:**[Site service](../references/API-JS-SiteService.md)

## Properties

The following properties are available for the `site` object:

-   **`shortName`**

    A read-only unique short name identifying the site


-   **`sitePreset`**

    A read-only name of the site preset used to create the site


-   **`visibility`**

    The visibility of the site \(`PUBLIC`, `MODERATED`, `PRIVATE`\)


-   **`siteGroup`**

    The site group name


-   **`sitePermissionGroups`**

    A map of role name mapped to associated group name


-   **`title`**

    The displayable title of the site


-   **`description`**

    The displayable description of the site


-   **`node`**

    The site node \(null if none\)


