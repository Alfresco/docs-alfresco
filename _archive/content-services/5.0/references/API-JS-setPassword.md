---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: setPassword
---

# `setPassword`

`setPassword(userName, password)` sets the password for the given user. It is executable with Administrator authority only.

## Parameters

-   **userName**

    A string representing the user name of the user to set the password for.

-   **password**

    A string representing the password to assign for the user specified.


## Example

```
people.setPassword("joe.user", "newpwd");
```

**Parent topic:**[People API](../references/API-JS-People.md)

