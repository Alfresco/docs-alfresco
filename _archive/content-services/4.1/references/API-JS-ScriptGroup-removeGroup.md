---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: removeGroup
---

# `removeGroup`

`removeGroup(shortName)` this method removes a specified subgroup from this group. It does not delete the subgroup or its members.

## Parameters

-   **shortName**

    A string representing the short name of the sub group to remove from the containing group.


## Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    // now remove child group of this group
    
    var shortName = "MY_SUB_GROUP";
    group.removeGroup(shortName);        
      
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

