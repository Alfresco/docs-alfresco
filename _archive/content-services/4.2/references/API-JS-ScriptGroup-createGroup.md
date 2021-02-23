---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: createGroup
---

# `createGroup`

`createGroup(shortName, displayName)` this method creates a new group as a child of this group.

## Parameters

-   **shortName**

    A string representing the short name for the new group.

-   **displayName**

    A string representing the display name for the new group.


## Returns

Returns the new child group.

## Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now create child group of this group

var shortName = "MY_SUB_GROUP";
var displayName = "MySubGroup";
model.childGroup = group.createGroup(shortName, displayName);
        
```

**Parent topic:**[ScriptGroup object](../references/API-JS-ScriptGroup.md)

