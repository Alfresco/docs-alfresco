---
author: Alfresco Documentation
---

# `getImmutableProperties`

`getImmutableProperties(username)` returns a map of the person properties that are marked as immutable for the given user.

This enables a script to interrogate which properties are dealt with by an external system such as LDAP and should not be mutable in any client UI.

## Parameters

-   **username**

    A string representing the username of the user whose immutable properties are to be fetched.


## Returns

A `ScriptableHashMap` containing the immutable properties of the specified user.

## Example

```

var person = people.getPerson("abeecher");

if (person){
    model.immutableProperties = people.getImmutableProperties(person);
}
```

**Parent topic:**[People API](../references/API-JS-People.md)

