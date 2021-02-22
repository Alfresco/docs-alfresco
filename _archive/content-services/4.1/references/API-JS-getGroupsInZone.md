---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getGroupsInZone
---

# `getGroupsInZone`

`getGroupsInZone(filter, zone, paging, sortBy)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.

## Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or \* all groups found will be returned. If the filter starts with \* or contains a ? character results returned could be inconsistent.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


## Returns

An array of `ScriptGroup` objects from the specified zone.

## Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);

    model.scriptGroups = groups.getGroupsInZone(filter, "APP.DEFAULT", paging, "displayName");
        
        
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

