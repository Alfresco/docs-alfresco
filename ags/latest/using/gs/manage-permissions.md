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

{% include ags/set-permissions.md %}