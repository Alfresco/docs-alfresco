---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: isAdmin
---

# `isGuest`

`isGuest(person)` determines if the specified user is a Guest authority.

## Parameters

-   **person**

    A node representing the user to check.


## Returns

Returns true if the specified user is logged in as a guest.

## Example

```

    var userName = "abeecher";

    var user = people.getPerson(userName);

    if(user){
        model.isAdmin = people.isGuest(user);
        model.userName = userName;
    }        
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

