---
title: Managing permissions
---

To ensure the security of your Records Management system you can easily manage user permissions to control which 
users and groups can see and work in different sections of the {% include tooltip.html word="fileplan" text="File Plan" %}.

In Alfresco Records Management there are 2 different methods for managing what users can and can't do:

* Roles and {% include tooltip.html word="capabilities" text="capabilities" %} are managed by the Alfresco administrator, and control the actions users have within the 
File Plan, such as the ability to create record categories or record folders.
* User permissions are managed at folder and category level, and control whether users can read and file or just read.

User permissions aren't granted by default. If a user hasn't been given permission to read a folder or category, 
then they won't see it in the File Plan. Only Records Management Administrators are granted access to all areas of 
the File Plan by default.

By managing your user permissions you can create restricted areas of the File Plan that are only available to 
selected users. For an area that all users should have access to, you need to make sure that all users have been 
given permission to see it.

## Setting user permissions

Setting user permissions on folders and {% include tooltip.html word="category" text="categories" %} lets you control who can see and work in different areas of the {% include tooltip.html word="fileplan" text="File Plan" %}.

> **Tip:** Remember that until you have given users permission for a folder or category they won't be able to see it or work with its contents.

1. Click **Manage Permissions** when you're in the folder or category you want to set permissions for in the File Plan.

    > **Tip:** You can also hover over a folder in the File Plan and click **More** then **Manage Permissions**, or a category in the File Plan and click **Manage Permissions**.

    The **Manage Permissions** page opens with the name of the selected folder or category displayed. Any users and groups that currently have permissions assigned are also displayed. You can change existing user permissions or **Remove** them entirely.

2. Click **Add User or Group**.

3. Enter the name of an individual user, a group, or a Records Management role and click **Search**.

    All users, groups, and roles matching the search are displayed.

4. Click **Add** next to the user, group, or role that you want to add permissions for.

    > **Tip:** You can add permissions for as many users, groups, and roles as you want.

5. Select either **Read and File** or **Read Only**.

    Read and File allows users to work with content, whereas users with Read Only permission can only view content.

6. When you're finished click **Save** to return to the File Plan.

    The permissions you've set are now applied to the folder or category you selected and any folders or categories it contains. You can change these as needed on a folder or category basis.


See also video explaining [setting user permissions]({% link governance-services/7.3/tutorial/governance-services/index.md %}#set-user-permissions).