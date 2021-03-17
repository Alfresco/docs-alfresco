---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: ScriptNode createFolder
---

# `getMembersRole`

`getMembersRole\(userName\)` indicates whether a user is a member of the site.

## Parameters

-   **userName**

    A string representing the user's username.

-   ****

## Returns

Returns true if the user is a member of the site, or returns false otherwise.

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

