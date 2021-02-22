---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listSites, Site service]
---

# `listSites`

`listSites(nameFilter, sitePresetFilter, size)`

This method lists the sites that are available in the repository.

## Parameters

-   **nameFilter**

    The name of the filter

-   **sitePresetFilter**

    The site preset filter

-   **size**

    The maximum number of sites to return. By default this is set to 0, which returns all results.


## Returns

A list of the sites filtered, as appropriate. If no filters are specified then all the available sites are returned.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

