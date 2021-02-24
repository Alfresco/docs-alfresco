---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getPermissions
---

# `getPermissions`

`getPermissions()`

This method returns a string of the permissions attached to a node.

## Returns

String

Returns a string in the following format:

\[ALLOWED\|DENIED\];\[USERNAME\|GROUPNAME\];PERMISSION

## Example

The following can easily be tokenized on the semicolon \(;\) character:

`ALLOWED;kevinr;Consumer`

**Parent topic:**[Permission and Security API](../references/API-JS-PermissionSecurity.md)

