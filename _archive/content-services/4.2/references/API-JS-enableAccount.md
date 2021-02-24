---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: enableAccount
---

# `enableAccount`

`enableAccount(userName)` enables a disabled account. It can be invoked only by an Administrator authority.

## Parameters

-   **userName**

    A string representing the user name of the user whose account is to be enabled.


## Example

The following code snippet toggles the user account status:

```

    if(people.isAccountEnabled("Joe")){
        people.disableAccount("Joe");        
    }
    else{
        people.enableAccount("Joe");
    }

      
```

**Parent topic:**[People API](../references/API-JS-People.md)

