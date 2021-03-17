---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: removeAuthority
---

# `removeAuthority`

`removeAuthority(parentGroup, authority)` removes an authority from a group.

## Parameters

-   **parentGroup**

    The node representing the group to remove the user or group from.

-   **authority**

    A node representing the user or group to remove.


## Example

The following code will remove the user `abeecher` from the test group.

```

var group = people.getGroup("GROUP_TEST");

if(group){

    user = people.getPerson("abeecher");
    try{
        people.removeAuthority(group, user);
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

