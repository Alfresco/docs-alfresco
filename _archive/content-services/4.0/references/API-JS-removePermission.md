---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: removePermission
---

# `removePermission`

The `removePermission` methods remove permissions for users from a node.

**Parent topic:**[Security API](../references/API-JS-Security.md)

## `removePermission(permission)`

`removePermission(permission)`

This method removes a permission for ALL users from the node.

### Parameters

-   **permission**

    The permission to remove.


## `removePermission(permission,authority)`

`removePermission(permission, authority)`

This method removes a permission for the specified authority \(for example, a user name or group\) from the node.

### Parameters

-   **permission**

    The permission to remove.

-   **authority**

    The authority, typically a username or group, to remove the permission for.


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

