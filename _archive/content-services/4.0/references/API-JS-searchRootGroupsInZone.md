---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: searchRootGroupsInZone
---

# `searchRootGroupsInZone`

`searchRootGroupsInZone()` these methods search for root groups in the specified zone.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `searchRootGroupsInZone(displayNamePattern, zone)`

`searchRootGroupsInZone(displayNamePattern, zone)` this method searches for root groups in the specified zone.

### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.


### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

## `searchRootGroupsInZone(displayNamePattern, zone, maxItems, skipCount)`

`searchRootGroupsInZone(displayNamePattern, zone, maxItems, skipCount)` this method searches for root groups in the specified zone.

### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


### Returns

Returns a `ScriptGroup` array representing the root groups matching the query.

## `searchRootGroupsInZone(displayNamePattern, zone, paging, sortBy)`

`searchRootGroupsInZone(displayNamePattern, zone, paging, sortBy)` this method searches for root groups in the specified zone.

### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “\*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns a `ScriptGroup` array representing the root groups matching the query.

### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchRootGroupsInZone("*", "APP.SHARE", paging, "displayName");  
```

