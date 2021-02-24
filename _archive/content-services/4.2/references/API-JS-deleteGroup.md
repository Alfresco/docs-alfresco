---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: deleteGroup
---

# ``deleteGroup``

`deleteGroup(group)` this method removes a group from the system.

## Parameters

-   **group**

    The group to delete


## Example

```

var node = people.getGroup("GROUP_TECH_WRITERS");

if(node){
    people.deleteGroup(node);
}        
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

