---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: createGroup
---

# `createGroup`

`createGroup` these methods are used to create groups.

**Parent topic:**[People API](../references/API-JS-People.md)

## `createGroup(groupName)`

`createGroup(groupName)` this method creates a new top-level where groupName is the unique group name to create.

### Parameters

-   **group**

    The unique group name to create


### Example

```

    var groupName = "TECH_WRITERS";
    var newGroup = people.getGroup("GROUP_"+groupName);
    if(!newGroup){
        newGroup = people.createGroup(groupName);
    }          
        
```

## `createGroup(parentGroup,groupName)`

`createGroup(parentGroup, groupName)` this method creates a new group as a child of the specified parent group node. This can be null for a top-level group.

### Parameters

-   **parentGroup**

    The parent group

-   **groupName**

    The group name


### Example

```

    var parentGroupName = "TECH_WRITERS";
    var parentGroup = people.getGroup("GROUP_"+parentGroupName);
    var subGroup = "TECH_WRITER_ELITE"; // do not prefix with GROUP_
    
    if(parentGroup){
        newGroup = people.createGroup(parentGroup, subGroup);
        model.newGroup = newGroup;
    }
        
```

