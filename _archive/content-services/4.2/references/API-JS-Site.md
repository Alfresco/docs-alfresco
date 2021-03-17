---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Services, API/Script, JavaScript]
keyword: [JavaScript API, Site object]
---

# Site object

The `site` object provides the following properties and methods.

## Properties

-   **`description`**

    The displayable description of the site

-   **`isPublic`**

    Whether the site is public or not \(true or false\)

-   **`node`**

    The site node \(null if there are none\)

-   **`shortName`**

    A read-only unique short name identifying the site

-   **`siteGroup`**

    The site group name

-   **`sitePermissionGroups`**

    A map of role name mapped to associated group name

-   **`sitePreset`**

    A read-only name of the site preset used to create the site

-   **`title`**

    The displayable title of the site

-   **`visibility`**

    The visibility of the site \(`PUBLIC_SITE`, `MODERATED_SITE`, `PRIVATE_SITE`\)


## Example

```

    var site = siteService.getSite("simple-site");

    if(site){
        
        model.sitePreset = site.sitePreset;
        model.shortName = site.shortName;
        model.title = site.title;
        model.description = site.description;
        model.isPublic = site.isPublic;
        model.visibility = site.visibility;
        model.node = site.node;
        model.siteGroup = site.siteGroup;
        model.sitePermissionGroups = site.sitePermissionGroups;
        model.customProperties = site.customProperties;
    }        
        
```

-   **[acquireContainer](../references/API-JS-Site-acquireContainer.md)**  
`acquireContainer(...)` gets and if missing creates a new site container. The container is created in a new read/write transaction.
-   **[createAndSaveContainer](../references/API-JS-Site-createAndSaveContainer.md)**  
`createAndSaveContainer(containerId, containerType, description)` indicates whether a user is a member of the site.
-   **[createContainer](../references/API-JS-Site-createContainer.md)**  
The createContainer methods create new site containers.
-   **[deleteSite](../references/API-JS-Site-deleteSite.md)**  
`deleteSite\(\)` this method deletes a site.
-   **[getContainer](../references/API-JS-Site-getContainer.md)**  
`getContainer(componentId)` this method gets \(or creates\) the container folder \(node\) folder for the specified component identifier with the container type `cm:folder`.
-   **[getCustomProperties](../references/API-JS-Site-getCustomProperties.md)**  
`getCustomProperties()` this method gets a map of the custom properties of the site.
-   **[getCustomProperty](../references/API-JS-Site-getCustomProperty.md)**  
`getCustomProperty(name)` this method gets the value of a custom property \(null if the custom property has not been set or does not exist\).
-   **[getInvitation](../references/API-JS-Site-getInvitation.md)**  
`getInvitation(invitationId)` this method gets an invitation to this web site.
-   **[getMembersRole](../references/API-JS-Site-getMembersRole.md)**  
`getMembersRole\(authorityName\)` returns a user's role in this site.
-   **[getMembersRoleInfo](../references/API-JS-Site-getMembersRoleInfo.md)**  
`getMembersRoleInfo\(authorityName\)` returns extended information about a user's role in this site.
-   **[hasContainer](../references/API-JS-Site-hasContainer.md)**  
`hasContainer(componentId)` this method determines if the container folder for the specified component exists; if true the container folder exists.
-   **[inviteModerated](../references/API-JS-Site-inviteModerated.md)**  
`inviteModerated(inviteeComments, inviteeUserName, inviteeRole)` this method creates a new moderated invitation to this web site.
-   **[inviteNominated \(new user\)](../references/API-JS-Site-inviteNominatednew.md)**  
`inviteNominated\(inviteeFirstName, inviteeLastName, inviteeEmail, inviteeRole, acceptUrl, rejectUrl\)` this method creates a new nominated invitation to this web site for a new user who may not already be an Alfresco user.
-   **[inviteNominated \(existing user\)](../references/API-JS-Site-inviteNominatedexisting.md)**  
`inviteNominated\(inviteeUserName, inviteeRole, acceptUrl, rejectUrl\)` this method creates a new nominated invitation to this web site for an existing user.
-   **[isMember](../references/API-JS-Site-isMember.md)**  
isMember\(authorityName\) this method indicates whether a user is a member of the site.
-   **[isMemberOfGroup](../references/API-JS-Site-isMemberOfGroup.md)**  
isMemberOfGroup\(authorityName\) this method indicates whether a user belongs to a group that has access rights to the site.
-   **[listInvitations](../references/API-JS-Site-listInvitations.md)**  
`listInvitations()` this method lists the outstanding invitations for this web site.
-   **[listMembers](../references/API-JS-Site-listMembers.md)**  
`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.
-   **[removeMembership](../references/API-JS-Site-removeMembership.md)**  
`removeMembership(authorityName)` removes the specified user from a web project.
-   **[resetAllPermissions](../references/API-JS-Site-resetAllPermissions.md)**  
`resetAllPermissions(node)` this method resets any permissions that have been set on the node, deleting all permissions and setting the node to inherit permissions.
-   **[save](../references/API-JS-Site-save.md)**  
`save\(\)` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.
-   **[setMembership](../references/API-JS-Site-setMembership.md)**  
`setMembership\(authorityName, role\)` this method sets the membership details for a user.
-   **[setPermissions](../references/API-JS-Site-setPermissions.md)**  
`setPermissions(node, permissions)` this method sets permissions for a node.

**Parent topic:**[Site service](../references/API-JS-SiteService.md)

