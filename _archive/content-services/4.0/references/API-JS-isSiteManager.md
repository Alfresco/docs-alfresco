---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [isSiteManager, JavaScript, Site service]
---

# `isSiteManager`

`isSiteManager(shortName)` checks whether the currently authenticated user is a site manager or not, for the specified site.

## Parameters

-   **shortName**

    The short name of the site.


## Returns

Returns a boolean. True is returned if the currently authenticated user is a site manager, false otherwise.

## Example

```

result = siteService.isSiteManager("simple-site");
      
```

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

