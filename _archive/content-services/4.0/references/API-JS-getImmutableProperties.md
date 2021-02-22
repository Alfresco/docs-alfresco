---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getImmutableProperties
---

# `getImmutableProperties`

`getImmutableProperties(person)` returns a map of the Person properties that are marked as immutable for the given user.

This enables a script to interrogate which properties are dealt with by an external system such as LDAP and should not be mutable in any client UI.

## Parameters

-   **person**

    A node representing the user whose immutable properties are to be fetched.


## Returns

A hash containing the immutable properties of the user.

## Example

```

    var person = people.getPerson("abeecher");

    if (person){
        model.immutableProperties = people.getImmutableProperties(person);
    }
      
```

**Parent topic:**[People API](../references/API-JS-People.md)

