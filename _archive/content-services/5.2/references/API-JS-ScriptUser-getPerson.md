---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getPerson
---

# `getPerson`

`getPerson()` returns a script node wrapping the person.

## Parameters

None

## Returns

Returns a script node wrapping the person.

## Example

```

var username = "joe.user";

var scriptUser = groups.getUser(username);

var person = scriptUser.getPerson();
      
```

**Parent topic:**[ScriptUser object](../references/API-JS-ScriptUser.md)

