---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: searchRootGroups
---

# `searchRootGroups`

`searchRootGroups()` these methods search for root groups across all zones.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `searchRootGroups(displayNamePattern)`

`searchRootGroups(displayNamePattern)` searches for root groups based on the display name filter string.

### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.


### Returns

Returns an array of `ScriptGroup` objects that represents the root groups matching the query.

## `searchRootGroups(displayNamePattern, paging, sortBy)`

`searchRootGroups(displayNamePattern, paging, sortBy)` searches for root groups based on a display name pattern string.

### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns an array of `ScriptGroup` objects that represents the root groups matching the query.

### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchRootGroups("*", paging, "displayName");  
```

