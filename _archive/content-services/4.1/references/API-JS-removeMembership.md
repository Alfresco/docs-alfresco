---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: removeMembership
---

# `removeMembership`

`removeMembership(userName)` removes the specified user from a web project.

## Parameters

-   **userName**

    A string representing the username of the user to remove from membership of the site.


## Example

```

    var site = siteService.getSite("swsdp");

    if(site){

        var authorityName = "joe.user";

        site.removeMembership(authorityName);

        ...   
    }
      
```

**Parent topic:**[WebProjects Object API](../references/API-JS-WebProject-Object.md)

**Parent topic:**[Site object](../references/API-JS-Site.md)

