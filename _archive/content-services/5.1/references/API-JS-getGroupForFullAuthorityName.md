---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getGroupForFullAuthorityName
---

# `getGroupForFullAuthorityName`

`getGroupForFullAuthorityName(fullName)` gets a group given its full authority name.

## Parameters

-   **fullName**

    A string representing the full authority name of the group to return. This string must start with “GROUP\_”.


## Returns

Returns a `ScriptGroup` object, or null if the group cannot be found.

## Example

```

    var fullName = "GROUP_MY_GROUP";

    model.scriptGroup = groups.getGroupForFullAuthorityName(fullName);
      
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

