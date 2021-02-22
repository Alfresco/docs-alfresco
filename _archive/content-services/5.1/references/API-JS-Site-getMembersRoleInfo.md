---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getMembersRoleInfo
---

# `getMembersRoleInfo`

`getMembersRoleInfo\(authorityName\)` returns extended information about a user's role in this site.

## Parameters

-   **authorityName**

    A string representing the authority name.

-   ****

## Returns

Returns a SiteMemberInfo object describing the user's role, or null if the user is not a member.

## Example

The following code snippet uses `getMembersRoleInfo` to determine the site role of the authority “admin”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "admin";

    if(site.isMember(authorityName)){

        model.authorityName = authorityName;
        model.roleInfo = site.getMembersRoleInfo(authorityName); 

    }
}
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

