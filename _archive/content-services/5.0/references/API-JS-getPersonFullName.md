---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getPersonFullName
---

# `getPersonFullName`

`ScriptNode getPersonFullName(username)` avoids complete `getProperties()` retrieval for a `cm:person` when the script only requires the full name of person.

## Parameters

-   **username**

    A string representing the user name of the user for which to return the full name.


## Returns

Full name of the person or null if the user does not exist in the system.

## Example

The following code snippet returns the full name for the user with the username `abeecher`:

```

model.fullname = people.getPersonFullName("abeecher");  
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

