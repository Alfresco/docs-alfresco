---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getAllRootGroupsInZone
---

# `getAllRootGroupsInZone`

The `getAllRootGroupsInZone(zone)` methods return a list of groups in the specified zone.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `getAllRootGroupsInZone(zone)`

`getAllRootGroupsInZone(zone)` this method returns a list groups in the specified zone.

### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.


### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

### Example

```

          model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT"); // APP.DEFAULT, APP.SHARE, APP.RM
        
```

## `getAllRootGroupsInZone(zone, maxItems, skipCount)`

`getAllRootGroupsInZone(zone, maxItems, skipCount)` this method returns a list groups in the specified zone.

### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

### Example

```

          model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT", 5, 0); 
        
```

## `getAllRootGroupsInZone(zone, paging, sortBy)`

`getAllRootGroupsInZone(zone, paging, sortBy)` this method returns a list groups in the specified zone.

### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID\>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

### Example

```

    var paging = utils.createPaging(3, 0);    

    model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT", paging, "displayName");
        
```

