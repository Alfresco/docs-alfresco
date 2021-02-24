---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, Services, JavaScript]
option: [isMember, Site object, JavaScript]
---

# `isMember`

isMember\(userName\) this method indicates whether a user is a member of the site.

## Parameters

-   **userName**

    A string representing the user's username.


## Returns

Boolean

This is true if the user is a member of the site, or false if otherwise.

## Example

The following code snippet uses `isMember` to test if “admin” is a member of the site “swsdp”:

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

