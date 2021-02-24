---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getMembers
---

# `getMembers`

`getMembers` returns an array of people nodes belonging to the specified group \(including all subgroups\).

**Parent topic:**[People API](../references/API-JS-People.md)

## `getMembers`

`getMembers(group)` gets specified group members.

### Parameters

-   **group**

    A node representing the group whose members will be fetched.


### Returns

Returns an array of people nodes belonging to the specified group \(including all subgroups\).

### Example

The following code would fetch all members of the administrators group and any subgroups.

```

    var node = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");
    
    if(node){
        model.members = people.getMembers(node);         
    }
    
      
```

## `getMembers`

`getMembers(group, recurse)` gets specified group members. Will not recurse into subgroups if `recurse` is set to `false`.

### Parameters

-   **group**

    A node representing the group whose members will be fetched.

-   **recurse**

    Set to true to recurse into subgroups. Set to false to turn off recursion.


### Returns

Returns an array of people nodes belonging to the specified group or people of subgroups if `recurse` was set to true.

### Example

The following code would fetch all members of the administrators group, but not the members of any subgroups.

```

    var node = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");
    
    if(node){
        model.members = people.getMembers(node, false);         
    }    
      
```

