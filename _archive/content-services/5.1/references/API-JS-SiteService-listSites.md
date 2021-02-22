---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [listSites, Site service]
---

# `listSites`

The `listSites` methods list the sites that are available in the repository.

List the available sites. This list can optionally be filtered by site name/title/description and/or site preset. This method uses a database query rather than using Solr.

**Note:** Starting with Alfresco 4.0, the filter parameter will only match sites whose cm:name or cm:title or cm:description *starts with* the specified string \(ignoring case\). The listing of sites whose cm:names \(or titles or descriptions\) *contain* the specified string is no longer supported. To retrieve sites whose cm:names \(or titles or descriptions\) contain a substring, findSites\(String, String, int\) should be used instead.

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

## `listSites(nameFilter, sitePresetFilter)`

`listSites(nameFilter, sitePresetFilter)` lists the sites that are available in the repository.

### Parameters

-   **nameFilter**

    String by which to filter the list of sites returned. Only sites whose `cm:name` or `cm:title` or `cm:description` **start with** the filter string will be returned.

-   **sitePresetFilter**

    The site preset filter \(sites whose preset EQUALS sitePresetFilter\).


### Returns

A list of the sites filtered, as appropriate. If no filters are specified then all the available sites are returned.

## `listSites(nameFilter, sitePresetFilter, size)`

`listSites(nameFilter, sitePresetFilter, size)` lists the sites that are available in the repository.

### Parameters

-   **nameFilter**

    String by which to filter the list of sites returned. Only sites whose `cm:name` or `cm:title` or `cm:description` **starts with** the filter string will be returned.

-   **sitePresetFilter**

    The site preset filter.

-   **size**

    The maximum number of sites to return. By default this is set to 0, which returns all results.


### Returns

A list of the sites filtered, as appropriate. If no filters are specified then all the available sites are returned.

### Example

The following code snippet would return all sites without any filtering or restriction on number of results returned:

```

 var sites = siteService.listSites(null, null, 0);
        
```

The following code snippet would return all dashboard sites whose name, title or description starts with the text “test” and restricts the number of sites returned to 5:

```

var sites = siteService.listSites("test", null, 5);          
        
```

