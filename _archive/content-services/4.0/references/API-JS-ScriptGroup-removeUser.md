---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: removeUser
---

# `removeUser`

`removeUser(shortName)`

This method removes a specified child user from this group. It does not delete the user.

## Parameters

-   **shortName**

    The short name of the user to remove


## Example

```

    var shortName = "MY_SUB_GROUP";
    var group = groups.getGroup(shortName);

    // now remove child user from this group
    
    var shortName = "james.joey";
    group.removeUser(shortName);        
        
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

