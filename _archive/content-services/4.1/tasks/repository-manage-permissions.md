---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Managing permissions in the Repository library

Manage the permissions in the Repository library to control users' access to the content.

This task assumes you are in the Repository library. To manage permissions for a folder you must enable the **Show Folders** feature.

Managing permissions for content in the Repository library is equivalent to inviting users to a space in Alfresco Explorer. You can add and set roles for both individual users and user groups. When you set these permissions you are assigning the roles that are defined in Explorer, which are different from the site members roles.

1.  Navigate the repository to locate the content whose permissions you want to define. This can be a particular content item or a folder.

2.  In the item list position the cursor over the folder or item of interest to display the available actions.

3.  Click **More** and then **Manage Permissions**.

    The Manage Permissions page appears. If permissions are inherited from the parent folder, the Inherited Permissions table appears at the top of the page.

4.  Manage the inherited permissions:

    -   The button ![](../images/im-inheritpermissions-on.png) indicates that permissions are currently inherited from the parent folder. Click this button to ignore the inherited permissions.
    -   The button ![](../images/im-inheritpermissions-off.png) indicates that permissions are not currently inherited from the parent folder. Click this button to inherit permissions.
5.  Manage the local permissions:

    1.  Click **Add User/Group**.

    2.  In the search box type the full or partial name of the group or user you want to grant permissions to. The search requires a minimum of three \(3\) characters. It is not case sensitive.

    3.  Click **Search** or press ENTER.

        The search returns a list of all users and groups matching your search criteria.

    4.  Click **Add** to the right of the user or group you want to grant permission to.

        The selected user or group is added to the Locally Set Permissions table with the role Contributor.

    5.  Change the role as desired.

    6.  Repeat this process until all desired users and groups are added and have the appropriate permissions.

        **Note:** To revoke the permissions for a user or group, click **Delete** in the Actions column.

6.  Click **Save**.


**Parent topic:**[Repository](../concepts/repository-intro.md)

