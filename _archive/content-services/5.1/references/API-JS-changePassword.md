---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: changePassword
---

# `changePassword`

`changePassword(oldpassword, newpassword)` changes the password for the current user only when the old password is supplied.

## Parameters

-   **oldpassword**

    A string representing the currently logged in user's current password.

-   **newpassword**

    A string representing the currently logged in user's new password.


## Example

```

  people.changePassword("oldpwd", "newpwd");
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

