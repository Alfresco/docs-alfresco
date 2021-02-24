---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: isAdmin
---

# `isAdmin`

`isAdmin(person)` determines if the specified user is an Administrator authority.

## Parameters

-   **person**

    A node representing the user to check.


## Returns

Returns true if the specified user is an Administrator authority.

## Example

```

    var userName = "abeecher";

    var user = people.getPerson(userName);

    if(user){
        model.isAdmin = people.isAdmin(user);
        model.userName = userName;
    }        
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

