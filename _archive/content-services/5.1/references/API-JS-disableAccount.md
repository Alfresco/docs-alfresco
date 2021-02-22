---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: disableAccount
---

# `disableAccount`

`disableAccount(userName)` disables an enabled account. It can be invoked with Administrator authority only.

**Note:** This procedure works for alfrescoNtlm users only.

## Parameters

-   **userName**

    A string representing the user name of the user whose account is to be disabled.


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

