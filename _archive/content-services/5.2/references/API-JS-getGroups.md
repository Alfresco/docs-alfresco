---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getGroups
---

# `getGroups`

The `getGroups()` methods return groups across all zones.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `getGroups(filter, paging)`

`getGroups(filter, paging)` this method returns groups across all zones.

### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or \* all groups found will be returned. If the filter starts with \* or contains a ? character results returned could be inconsistent.

-   **paging**

    A `ScriptPagingDetails` object.


### Returns

An array of `ScriptGroup` objects.

### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);

    model.scriptGroups = groups.getGroups(filter, paging);
        
        
```

## `getGroups(filter, paging, sortBy)`

`getGroups(filter, paging, sortBy)` this method returns groups across all zones.

### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or \* all groups found will be returned. If the filter starts with \* or contains a ? character results returned could be inconsistent.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

An array of `ScriptGroup` objects.

### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);


    model.scriptGroups = groups.getGroups(filter, paging, "displayName");          
        
```

The preceding code snippet would return results such as:

```

fullName: GROUP_Starlight_Title

displayName: Another group

shortName: Starlight_Title

fullName: GROUP_Admins

displayName: Starlight Admins

shortName: Admins

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

fullName: GROUP_STARLIGHT

displayName: Starlight Group

shortName: STARLIGHT          
```

