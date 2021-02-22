---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getGroupNode
---

# `getGroupNode`

`getGroupNode()` returns a script node object wrapping this group.

## Parameters

None

## Returns

Returns a script node object wrapping this group.

## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group node
model.groupNode = group.getGroupNode();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

