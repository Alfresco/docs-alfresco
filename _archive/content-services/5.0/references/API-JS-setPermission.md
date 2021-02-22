---
author: Alfresco Documentation
---

# `setPermission`

The `setPermission` methods apply permissions to nodes.

**Parent topic:**[Security/Permissions API](../references/API-JS-Security.md)

## `setPermission(permission)`

`setPermission(permission)`

This method applies a permission to the node.

### Parameters

-   **permission**

    The permission to apply to the node.


## `setPermission(permission, authority)`

`setPermission(permission, authority)`

This method applies a permission for the specified authority \(for example, a user name or group\) to the node.

Note that the method does not check for the presence of the specified authority, so the method will not fail if a non-existent user is specified. The existence of a user or group should be checked for in preceding code for additional robustness.

### Parameters

-   **permission**

    The permission to apply to the node.

-   **authority**

    The authority \(user, group\) for which the permission will be applied.


### Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setPermission("Read", "fred.bloggs");
node.setPermission("Delete", "Admin");
node.setPermission("Write", "GROUP_EVERYONE");
node.setPermission("Delete", "GROUP_ALFRESCO_ADMINISTRATORS");
node.setPermission("Delete", "Peter.Pickles"); // user doesn't exist!

model.permissions = node.getPermissions();


```

This would result in the following permissions being set:

```

ALLOWED;fred.bloggs;Read

ALLOWED;Peter.Pickles;Delete

ALLOWED;Admin;Delete

ALLOWED;GROUP_EVERYONE;Write

ALLOWED;GROUP_ALFRESCO_ADMINISTRATORS;Delete  

```

