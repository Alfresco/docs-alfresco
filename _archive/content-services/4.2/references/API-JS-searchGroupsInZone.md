---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: searchGroupsInZone
---

# `searchGroupsInZone`

`searchGroupsInZone()` these methods search for groups in the specified zone.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `searchGroupsInZone(shortNameFilter, zone)`

`searchGroupsInZone(shortNameFilter, zone)` this method searches for groups in the specified zone.

### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.


### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

## `searchGroupsInZone(shortNameFilter, zone, maxItems, skipCount)`

`searchGroupsInZone(shortNameFilter, zone, maxItems, skipCount)` this method searches for groups in the specified zone.

### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

## `searchGroupsInZone(shortNameFilter, zone, paging, sortBy)`

`searchGroupsInZone(shortNameFilter, zone, paging, sortBy)` this method searches for groups in the specified zone.

### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchGroupsInZone("*", "APP.SHARE", paging, "displayName");  
```

