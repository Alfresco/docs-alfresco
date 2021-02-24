---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [findSites, JavaScript, Site service]
---

# `findSites`

`findSites(filter, sitePresetFilter, size)` searches for and returns a list of sites. The returned list can be optionally filtered by name and site preset. If no filters are specified then all the available sites are returned.

This method will find all sites available to the currently authenticated user based on the specified site filter, site preset filter and result set size. The filter parameter will match any sites whose cm:name, cm:title, cm:description *contain* the specified string \(ignoring case\). Note that this method uses [Alfresco Full Text Search](http://wiki.alfresco.com/wiki/Search) to retrieve results and depending on server Lucene, SOLR configuration may only offer eventually consistent results.

## Parameters

-   **filter**

    An inclusion filter string for returned sites. Any supplied filter will be wrapped in asterisks, for example as in '\*foo\*', and used to match sites whose `cm:name`, `cm:title`, or `cm:description` **contains** the filter string.

-   **sitePresetFilter**

    Site preset filter name to match against.

-   **size**

    The maximum number of results to return. The default, 0, returns all results.


## Returns

Returns a list of Site objects. The list can be empty, but not null.

## Example

The following code snippet will search for all sites that contain 'foo' in their name, title or description:

```

    var sites = siteService.findSites('foo', null, 0);
      
```

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

