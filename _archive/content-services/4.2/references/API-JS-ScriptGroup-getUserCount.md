---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getUserCount
---

# `getUserCount`

`getUserCount()` - returns the number of users within this group.

## Parameters

None

## Returns

Returns an integer representing the number of users contained within this group.

## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group count
model.userCount = group.getUserCount();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

