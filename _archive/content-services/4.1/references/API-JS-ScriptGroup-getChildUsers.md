---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getChildUsers
---

# `getChildUsers`

`getChildUsers(paging, sortBy)` this method gets the child users of this group.

## Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `userName`.


## Returns

Returns an array of `ScriptUser` objects.

## Example

```

    var shortName = "MY_SUB_GROUP";
    var group = groups.getGroup(shortName);

    // now find child users
    var paging = utils.createPaging(-1, 0);
    var sortBy = "userName";
    model.childUsers = group.getChildUsers(paging, sortBy);
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

