---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Dynamic authorities and roles, security]
---

# Dynamic authorities and roles

Alfresco uses some custom roles. To implement a custom role, you create a dynamic authority for that role and assign global permissions to it. The Alfresco internal roles have not been assigned any object-specific rights. The internal roles are:

-   ROLE\_ADMINISTRATOR is assigned to the default administrators for the configured authentication mechanisms or members of the administration groups defined on the AuthorityServiceImpl bean. This role has all rights.
-   ROLE\_OWNER is assigned to the owner of a node. If there is no explicit owner, this role is assigned to the creator. This role has all rights on the owned node.
-   ROLE\_LOCK\_OWNER is assigned to the owner of the lock on a locked node. This supports a lock owner’s right to check in, cancel a check out, or unlock the node.

The Alfresco Explorer and Alfresco Share currently support the assignment of permissions only to the owner role. You can use such things as the Java API and scripting to make other assignments.

**Note:** Hierarchical and zoned roles may be added to Alfresco in the future to avoid the hidden group implementation for true roles.

**Parent topic:**[Authorities](../concepts/secur-authorities.md)

