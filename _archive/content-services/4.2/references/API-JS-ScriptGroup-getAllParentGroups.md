---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getAllParentGroups
---

# `getAllParentGroups`

`getAllParentGroups()` these methods return all parent groups of this group.

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

## `getAllParentGroups()`

`getAllParentGroups()` this method returns all parent groups of this group.

### Parameters

None

### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find all parent groups
model.parentGroups = group.getAllParentGroups();
        
```

## `getAllParentGroups(maxItems, skipCount)`

`getAllParentGroups(maxItems, skipCount)` this method returns all parent groups of this group.

### Parameters

-   **maxItems**

    An integer representing the maximum number of results to return. If set to -1 all results will be returned.

-   **skipCount**

    An integer representing the number of results to skip.


### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find all parent groups
var maxItems = -1;
var skipCount = 0;
model.parentGroups = group.getAllParentGroups(maxItems, skipCount);
        
```

## `getAllParentGroups(paging, sortBy)`

`getAllParentGroups(paging, sortBy)` this method returns all parent groups of this group.

### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find immediate parent groups
var paging = utils.createPaging(-1, 0);
var sortBy = "displayName";
model.parentGroups = group.getAllParentGroups(paging, sortBy);
        
```

