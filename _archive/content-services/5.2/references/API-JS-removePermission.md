---
author: Alfresco Documentation
---

# `removePermission`

The `removePermission` methods remove permissions for users from a node.

**Parent topic:**[Security/Permissions API](../references/API-JS-Security.md)

## `removePermission(permission)`

`removePermission(permission)` removes a permission for all users from the node.

### Parameters

-   **permission**

    The permission to remove.


## `removePermission(permission, authority)`

`removePermission(permission, authority)` removes a permission for the specified authority \(for example, a user name or group\) from the node.

### Parameters

-   **permission**

    The permission to remove.

-   **authority**

    The authority, typically a user name or group, to remove the permission for.


### Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setPermission("Read", "fred.bloggs");
node.setPermission("Delete", "Admin");
node.setPermission("Write", "GROUP_EVERYONE");
node.setPermission("Delete", "GROUP_ALFRESCO_ADMINISTRATORS");

//...

node.removePermission("Read", "fred.bloggs");

model.permissions = node.getPermissions();

```

The resulting permissions would be:

```

ALLOWED;Admin;Delete

ALLOWED;GROUP_EVERYONE;Write

ALLOWED;GROUP_ALFRESCO_ADMINISTRATORS;Delete  

```

