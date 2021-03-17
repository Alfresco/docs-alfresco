---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Define roles

Records Management roles and capabilities control what functionality is available to users.

Alfresco has several default roles that users and groups can be assigned to:

-   Records Management Administrator
-   Records Management Power User
-   Records Management Records Manager
-   Records Management Security Officer
-   Records Management User

**Note:** There are also In-Place Readers and In-Place Writers roles but you can't assign users or groups to these in the Records Management Console.

These are displayed when you open the Define Roles tool. You can create as many more roles as you need.

Capabilities control what each role can do in the Records Management system, and with nearly 60 unique capabilities to choose from, they can vary hugely between roles.

**Tip:** The role of Records Management Administrator has all capabilities assigned to it, so take a look at this to see the full list of capabilities available.

You assign users and groups who will all require the same levels of functionality to a role \(a user can be assigned to multiple roles at the same time\). Assign users and groups to roles using the [Users and Groups tool](rm-usergroups-intro.md). You can manage roles to change the capabilities that they have.

Capabilities don't conflict and are not hierarchical. A user can be granted a single capability and that capability will not grant any further capabilities. Any user can have zero or more capabilities within the system. A user that has no capabilities is effectively barred from the Records Management system.

**Tip:** Remember that roles and capabilities are different to permissions, which are set against folders and categories directly in the File Plan.

-   **[Viewing the capabilities for a role](../tasks/rm-roles-view.md)**  
All existing roles are displayed when you open the Define Roles tool.
-   **[Adding new roles](../tasks/rm-roles-add.md)**  
There are five default Records Management roles, but you can add as many more as you need.
-   **[Editing a role](../tasks/rm-roles-edit.md)**  
You can edit a role whenever you need to make changes to its name or the capabilities it's been assigned.
-   **[Deleting a role](../tasks/rm-roles-delete.md)**  
You can delete a role whenever you need to.

**Parent topic:**[Administering Records Management](../concepts/rm-admin-intro.md)

