---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Managing permissions in the Repository Document Library

Managing permissions for a content in the Repository Document Library is equivalent to inviting users to a space in Alfresco Explorer. You can add and set roles for both individual users and user groups. In setting permissions, you are assigning the roles that are defined in Explorer, which are different from the site members roles available in Share.

This task assumes you are in the Repository Document Library. To manage permissions for a folder, you must enable the **Show Folders** feature.

1.  Navigate the repository to locate the content whose permissions you want to define.

2.  In the item list, position the cursor over the folder or item of interest to display the available actions.

3.  Click **More** and then **Manage Permissions**.

    The Manage Permissions page for the selected folder appears. If permissions are inherited from the parent folder, the Inherited Permissions table appears at the top of the page.

4.  Manage the inherited permissions:

    -   The button ![](../images/im-inheritpermissions-on.png) indicates that permissions are currently inherited from the parent folder. Click this button to ignore the inherited permissions.
    -   The button ![](../images/im-inheritpermissions-off.png) indicates that permissions are not currently inherited from the parent folder. Click this button to inherit permissions.
5.  Manage the local permissions:

    1.  Click **Add User/Group**.

    2.  In the search box, type the full or partial name of the group or user you want to grant permissions to. You must enter a minimum of three \(3\) characters. The search is not case sensitive.

    3.  Click **Search**.

        The application displays a list of all users and groups matching the specified search criteria.

    4.  Click **Add** to the right of a user or group in this list.

        The selected user or group is added to the Locally Set Permissions table with the role SiteCollaborator.

    5.  Change the role as desired.

    6.  Repeat this process until all desired users and groups are added and have the appropriate permissions.

        **Note:** To revoke the permissions for a user or group, click **Delete** in the Actions column.

6.  Click **Save**.


**Parent topic:**[Repository](../concepts/repository-intro.md)

