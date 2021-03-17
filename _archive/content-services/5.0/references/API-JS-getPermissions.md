---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getPermissions
---

# `getPermissions`

`getPermissions()` returns an array of permissions attached to a node.

## Returns

An array of permissions applied to this node, including inherited permissions.

Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION`. An example is `ALLOWED;GROUP_EVERYONE;Consumer`. The string can then be tokenized on the ';' character.

## Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
model.permissions = node.getPermissions();      

```

**Parent topic:**[Security/Permissions API](../references/API-JS-Security.md)

