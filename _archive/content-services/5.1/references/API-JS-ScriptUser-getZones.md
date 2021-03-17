---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getZones
---

# `getZones`

`getZones()` returns all the zones of this user.

## Parameters

None

## Returns

Returns a set of strings representing all the zones of this user.

## Example

```

var username = "joe.user";

var scriptUser = groups.getUser(username);

var zones = scriptUser.getZones();
      
```

**Parent topic:**[ScriptUser object](../references/API-JS-ScriptUser.md)

