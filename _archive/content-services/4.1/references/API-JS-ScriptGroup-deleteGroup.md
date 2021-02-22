---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: deleteGroup
---

# `deleteGroup`

`deleteGroup()` this method deletes this group.

## Parameters

None

## Returns

void

## Example

```

    var shortName = "MY_TEST_GROUP";
    var group = groups.getGroup(shortName);

    // now delete this group
    
    group.deleteGroup();
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

