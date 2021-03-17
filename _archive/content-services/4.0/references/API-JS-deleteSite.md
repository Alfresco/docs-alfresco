---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [deleteSite, Site object]
---

# `deleteSite`

`deleteSite\(\)` this method deletes a site.

## Example

```

    var site = siteService.getSite("site-to-delete");

    if(site){
        
        site.deleteSite();

        site = siteService.getSite("site-to-delete");

        if(!site){
            model.message = "Site not found!";
        }
        else{
            model.message = "Site found!";
        }
    }        
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

