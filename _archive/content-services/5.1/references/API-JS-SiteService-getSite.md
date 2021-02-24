---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [getSite, JavaScript, Site service]
---

# `getSite`

`getSite(shortName)` gets a site for a provided short name.

## Parameters

-   **shortName**

    The short name of the site


## Returns

Return a site object, or returns null if the site does not exist.

## Example

```

var site = siteService.getSite("simple-site");

if(site){
    
    model.sitePreset = site.sitePreset;
    model.shortName = site.shortName;
    model.title = site.title;
    model.description = site.description;
}        
      
```

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

