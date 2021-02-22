---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getPerson
---

# `getPerson`

`ScriptNode getPerson(username)` returns a single \(cm:person\) node associated with the specified user name, or null if the person does not exist.

## Parameters

-   **username**

    A string representing the user name for the user who is being fetched.


## Returns

A node representing the user requested, or null if the username cannot be found.

## Example

The following code snippet returns the node object for the user with the username `abeecher`:

```

  model.user = people.getPerson("abeecher");  
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

