---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: addAuthority
---

# `addAuthority`

`addAuthority(parentGroup, authority)` adds an authority \(User or Group \) to the specified parent group.

## Parameters

-   **parentGroup**

    The node representing the group to add the user or group to.

-   **authority**

    A node representing the user or group to add.


## Example

The following example will add `joe.user` to the administrators group.

```

var group = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");

if(group){

    user = people.getPerson("joe.user");
    try{
        people.addAuthority(group, user);
    }
    catch (ex){
        model.message = "ABORT: Exception occurred: "+ex;
        return;
    }
}                                                                                                                                       
      
```

If a problem occurs, for example the user cannot be found, an exception message will be generated such as the following:

```

        ABORT: Exception occurred: JavaException: java.lang.IllegalArgumentException: Authority is a mandatory parameter
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

