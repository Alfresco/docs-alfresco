---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: removeMembership
---

# `removeMembership`

`removeMembership(authorityName)` removes the specified user from a web project.

## Parameters

-   **authroityName**

    A string representing the username of the user to remove from membership of the site.


## Returns

void

## Example

```

    var site = siteService.getSite("swsdp");

    if(site){

        var authorityName = "joe.user";

        site.removeMembership(authorityName);

        ...   
    }
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

