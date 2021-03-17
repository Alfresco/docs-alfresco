---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getMembersRole
---

# `getMembersRole`

`getMembersRole\(authorityName\)` returns a user's role in this site.

## Parameters

-   **authorityName**

    A string representing the authority name.

-   ****

## Returns

Returns a string representing the user's role or null if not a member.

## Example

The following code snippet uses `getMembersRole` to determine the site role of the authority “admin”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "admin";

    if(site.isMember(authorityName)){

        model.authorityName = authorityName;
        model.role = site.getMembersRole(authorityName); 

    }
}
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

