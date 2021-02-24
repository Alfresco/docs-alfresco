---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getGroupCount
---

# `getGroupCount`

`getGroupCount()` - returns the number of child groups contained within this group.

## Parameters

None

## Returns

Returns an integer representing the number of child groups contained within this group.

## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group count
model.groupCount = group.getGroupCount();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

