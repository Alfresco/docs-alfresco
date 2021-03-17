---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: setMembership
---

# `setMembership`

`setMembership\(authorityName, role\)` sets the membership details for a user.

If the user is not already a member of the site, then they are added with the role given. If the user is already a member of the site, then their role is updated to the new role.

Only a site manager can modify memberships. There must be at least one site manager at all times.

## Parameters

-   **authorityName**

    A string representing the user's user name.

-   **role**

    A string representing the role for the user.


## Example

```

    var site = siteService.getSite("swsdp");

    if(site){

        var authorityName = "joe.user";
        var role = "SiteContributor"; // "SiteManager", "SiteCollaborator", "SiteContributor", "SiteConsumer"

        site.setMembership(authorityName, role);

        ...
   
    }

      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

