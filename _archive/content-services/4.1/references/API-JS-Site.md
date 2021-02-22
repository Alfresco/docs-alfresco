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

-   **`sitePreset`**

    A read-only name of the site preset used to create the site

-   **`shortName`**

    A read-only unique short name identifying the site

-   **`title`**

    The displayable title of the site

-   **`description`**

    The displayable description of the site

-   **`isPublic`**

    Whether the site is public or not \(true or false\)

-   **`visibility`**

    The visibility of the site \(`PUBLIC_SITE`, `MODERATED_SITE`, `PRIVATE_SITE`\)

-   **`node`**

    The site node \(null if there are none\)

-   **`siteGroup`**

    The site group name

-   **`sitePermissionGroups`**

    A map of role name mapped to associated group name


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

-   **[save](../references/API-JS-Site-save.md)**  
`save\(\)` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.
-   **[deleteSite](../references/API-JS-deleteSite.md)**  
`deleteSite\(\)` this method deletes a site.
-   **[listMembers](../references/API-JS-Site-listMembers.md)**  
`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.
-   **[isMember](../references/API-JS-isMember.md)**  
isMember\(userName\) this method indicates whether a user is a member of the site.
-   **[getMembersRole](../references/API-JS-getMembersRole.md)**  
`getMembersRole\(authorityName\)` returns a user's role in this site.
-   **[inviteNominated \(new user\)](../references/API-JS-inviteNominatednew.md)**  
`inviteNominated\(inviteeFirstName,inviteeLastName, inviteeEmail, inviteeRole, serverPath, acceptUrl,rejectUrl\)` this method creates a new nominated invitation to this web site for a new user who may not already be an Alfresco user.
-   **[inviteNominated \(existing user\)](../references/API-JS-inviteNominatedexisting.md)**  
`inviteNominated\(inviteeUserName,inviteeRole,acceptUrl,rejectUrl\)` this method creates a new nominated invitation to this web site for an existing user.
-   **[setMembership](../references/API-JS-setMembership.md)**  
`setMembership\(userName, role\)` this method sets the membership details for a user.
-   **[removeMembership](../references/API-JS-removeMembership.md)**  
`removeMembership(userName)` removes the specified user from a web project.
-   **[getContainer](../references/API-JS-getContainer.md)**  
`getContainer(componentId)` this method gets \(or creates\) the container folder \(node\) folder for the specified component identifier with the container type `cm:folder`.
-   **[createContainer](../references/API-JS-createContainer.md)**  
The createContainer methods create new site containers.
-   **[hasContainer](../references/API-JS-hasContainer.md)**  
`hasContainer(componentId)` this method determines if the container folder for the specified component exists; if true the container folder exists.
-   **[setPermissions](../references/API-JS-setPermissions.md)**  
`setPermissions(node, permissions)` this method sets permissions for a node.
-   **[resetAllPermissions](../references/API-JS-resetAllPermissions.md)**  
`resetAllPermissions(node)` this method resets any permissions that have been set on the node, deleting all permissions and setting the node to inherit permissions.
-   **[getCustomProperty](../references/API-JS-getCustomProperty.md)**  
`getCustomProperty(name)` this method gets the value of a custom property \(null if the custom property has not been set or does not exist\).
-   **[getCustomProperties](../references/API-JS-getCustomProperties.md)**  
`getCustomProperties()` this method gets a map of the custom properties of the site.
-   **[inviteModerated](../references/API-JS-inviteModerated.md)**  
`inviteModerated(inviteeComments,inviteeUserName,inviteeRole)` this method creates a new moderated invitation to this web site.
-   **[getInvitation](../references/API-JS-getInvitation.md)**  
`getInvitation(invitationId)` this method gets an invitation to this web site.
-   **[listInvitations](../references/API-JS-listInvitations.md)**  
`listInvitations()` this method lists the outstanding invitations for this web site.
-   **[createAndSaveContainer](../references/API-JS-createAndSaveContainer.md)**  
`createAndSaveContainer(containerId, containerType, description)` indicates whether a user is a member of the site.

**Parent topic:**[Site service](../references/API-JS-SiteService.md)

