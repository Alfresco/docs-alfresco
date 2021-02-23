---
author: Alfresco Documentation
---

# `getSites`

`getSites(filter, sitePresetFilter, size)` returns a list of sites. Retrieves all the sites available in the repository. The returned list can optionally be filtered by name and site preset. If no filters are specified then all the available sites are returned.

If filters start with a “\*” character, a Lucene/Solr based search will be performed, rather than a database query. This may discover a wider range of results, such as those sites that **contain** the search term, as opposed to those that **start with** the search term.

Within the implementation of this method, if the query does not contain a wildcard, then `listSites()` is invoked, else `findSites()` is used instead.

**Note:** When using Lucene/Solr searches, rather than direct database queries, newly created sites may not be found until the underlying search indexes are updated.

## Parameters

-   **filter**

    An inclusion filter string for returned sites. Only sites whose `cm:name`, `cm:title`, or `cm:description` start with the filter string will be returned.

-   **sitePresetFilter**

    Site preset filter string.

-   **size**

    The maximum number of results to return. The default, 0, returns all results.


## Returns

Returns a list of Site objects. The list can be empty, but not null.

## Example

The following code snippet will return all sites:

```

var sites = siteService.getSites(null, null, 0);
      
```

**Parent topic:**[Site service object](../references/API-JS-SiteserviceObject.md)

