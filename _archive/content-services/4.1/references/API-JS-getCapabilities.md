---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getCapabilities
---

# `getCapabilities`

`getCapabilities(person)` returns a hash of the specified user's capabilities.

## Parameters

-   **person**

    A node representing the user whose capabilities are to be fetched.


## Returns

A <string, boolean\> hash containing the capabilities of the user. For example, `isMutable`, `isGuest`, `isAdmin` and their boolean states will be returned.

## Example

The following code snippet returns a hash containing the capabilities of the `admin` user:

```

    var person = people.getPerson("admin");

    if (person){
        model.caps = people.getCapabilities(person);
    }
      
```

The capabilities returned would be as follows:

```

isMutable: TRUE

isGuest: FALSE

isAdmin: TRUE  

```

**Parent topic:**[People API](../references/API-JS-People.md)

