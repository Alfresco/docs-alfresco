---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: setQuota
---

# `setQuota`

`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.

## Parameters

-   **person**

    A node representing the user to set the quota for.

-   **Quota**

    A string representing the quota in bytes to allocate to the specified user. A value of -1 means no quota is set.


## Example

The following code sets the quota to 10MB for the user `abeecher`:

```

    var userName = "abeecher";
    var user = people.getPerson(userName);
    if (user){
        people.setQuota(user, "10240000"); // 10 MB
    }
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

