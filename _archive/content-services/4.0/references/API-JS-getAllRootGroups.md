---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getAllRootGroups
---

# `getAllRootGroups`

`getAllRootGroups()` these methods return a list of groups found across all zones.

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

## `getAllRootGroups()`

`getAllRootGroups()` this method returns a list groups found across all zones.

### Returns

Returns an array of ScriptGroup objects, representing the groups found across all zones.

### Example

```

          model.scriptGroups = groups.getAllRootGroups();
        
```

## `getAllRootGroups(maxItems, skipCount)`

`getAllRootGroups(maxItems, skipCount)` this method returns a list groups found across all zones.

### Parameters

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


### Returns

Returns an array of ScriptGroup objects, representing the groups found across all zones.

### Example

```

          model.scriptGroups = groups.getAllRootGroups(5, 0); 
        
```

## `getAllRootGroups(paging)`

`getAllRootGroups(paging)` this method returns a list groups found across all zones.

### Parameters

-   **paging**

    A `ScriptPagingDetails` object.


### Returns

Returns an array of ScriptGroup objects, representing the groups found found across all zones.

### Example

```

    var paging = utils.createPaging(3, 0);    

    model.scriptGroups = groups.getAllRootGroups(paging);
        
```

