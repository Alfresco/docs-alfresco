---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getGroupNodeRef
---

# `getGroupNodeRef`

`getGroupNodeRef()` - returns the node reference of this group.

## Parameters

None

## Returns

Returns a script node object wrapping this group.

## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now get group node ref
model.groupNodeRef = group.getGroupNodeRef();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

