---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: isAccountEnabled
---

# `isAccountEnabled`

`isAccountEnabled(userName)` determines if the specified user's account is enabled.

## Parameters

-   **userName**

    A string representing the user name of the user whose account is to be checked.


## Returns

Returns true if the specified user account is enabled, false if the account is currently disabled.

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

