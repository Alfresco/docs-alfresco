---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, Services, JavaScript]
option: [isMemberOfGroup, Site object, JavaScript]
---

# `isMemberOfGroup`

isMemberOfGroup\(authorityName\) this method indicates whether a user belongs to a group that has access rights to the site.

## Parameters

-   **authorityName**

    A string representing the user's authority name.


## Returns

Boolean

This is true if the user is a member of a group that has access to this site, or false if otherwise.

## Example

The following code snippet uses `isMemberOfGroup` to test if “joe.user” is a member of a group that has access to the site “swsdp”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "joe.user";

    if(site.isMemberOfGroup(authorityName)){
      ...
    }
}
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

