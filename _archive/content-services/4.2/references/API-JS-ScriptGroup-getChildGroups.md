---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getChildGroups
---

# `getChildGroups`

`getChildGroups()` these methods return child groups of this group.

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

## `getChildGroups()`

`getChildGroups()` this method returns child groups of this group.

### Parameters

None

### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child groups
model.childGroups = group.getChildGroups();        
        
```

## `getChildGroups(maxItems, skipCount)`

`getChildGroups(maxItems, skipCount)` this method returns child groups of this group.

### Parameters

-   **maxItems**

    An integer representing the maximum number of results to return. If set to -1 all results will be returned.

-   **skipCount**

    An integer representing the number of results to skip.


### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child users
var maxItems = -1; // return all results
var skipCount = 0; // skip 0 results
model.childGroups = group.getChildGroups(maxItems, skipCount);        
        
```

## `getChildGroups(paging, sortBy)`

`getChildGroups(paging, sortBy)` this method returns the child groups of this group.

### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

An array of `ScriptGroup` objects.

### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child users
var paging = utils.createPaging(-1, 0);
var sortBy = "displayName";
model.childGroups = group.getChildGroups(paging, sortBy);
        
```

