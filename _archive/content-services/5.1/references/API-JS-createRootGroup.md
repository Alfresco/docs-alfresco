---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: createRootGroup
---

# `createRootGroup`

`createRootGroup(shortName,displayName)` creates a new root group in the default application zone.

## Parameters

-   **shortName**

    A string representing the short name to assign the new group.

-   **displayName**

    A string representing the display name to assign the new group.


## Returns

Returns authority or null if it cannot be found.

## Example

```

    var shortName = "MY_GROUP";
    var displayName = "MyGroup";

    model.scriptGroup = groups.createRootGroup(shortName, displayName);        
      
```

The preceding code snippet would create a new group with the following details:

```

fullName: GROUP_MY_GROUP

displayName: MyGroup

shortName: MY_GROUP        
      
```

**Parent topic:**[Authority service](../references/API-JS-AuthorityService.md)

