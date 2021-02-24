---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getZones
---

# `getZones`

`getZones()` returns a set of zone names for this group. Zones provide a higher level way of organizing groups.

## Parameters

None

## Returns

Returns a set of strings representing the zones of this group.

## Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now return zones
model.zones = group.getZones();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

