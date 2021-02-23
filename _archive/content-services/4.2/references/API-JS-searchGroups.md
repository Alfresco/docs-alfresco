---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: searchGroups
---

# `searchGroups`

`searchGroups()` these methods search for groups.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `searchGroups(shortNameFilter)`

`searchGroups(shortNameFilter)` searches for groups based on short name filter string.

### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.


### Returns

Returns an array of ScriptGroup objects that represents the groups matching the query.

## `searchGroups(shortNameFilter, paging, sortBy)`

`searchGroups(shortNameFilter, paging, sortBy)` searches for groups based on a short name filter string.

### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns an array of ScriptGroup objects that represents the groups matching the query.

### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchGroups("*", paging, "displayName");  
```

