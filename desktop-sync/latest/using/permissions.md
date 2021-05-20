---
title: Manage content permissions
---

Alfresco Content Services permissions are replicated on the desktop for files and folders that have been synchronized, ensuring that users are not able to edit files offline as well as on the server.

A role, as set in Alfresco, will determine what you can do to the files and folders. Each role in Alfresco has a default set of permissions. See [User roles and permissions]({% link content-services/latest/using/permissions.md %}) for more information about roles.

The roles are replicated on the desktop as follows:

|Role|Role Definition|Permissions|
|----|---------------|-----------|
|Manager|Full rights to all content|Managers will be able to create, edit, and delete files and folders that are synchronized where the Manager role is set - (*) **see note below**.|
|Collaborator|Full rights to content that they own; can edit but not delete content created by other users|Collaborators will be able to create new files/folders, edit, move, rename, and delete their own files/folders, edit other users content, but won't be able to rename/move/delete files/folders created by someone else - (*) **see note below**. They will be able to check-out/declare as record any file.|
|Contributor|Full rights to content that they own, but cannot edit or delete content created by other users|Contributors will be able to create new files/folders, edit, move, rename, and delete their own files/folders, but not files/folders created by someone else. Contributors won't be able to check-out/declare as record files created by other users. They will be able to check-out/declare records for their own files.|
|Consumer|View-only rights; cannot create content|Files and folders with the Consumer role will be set to read-only on the desktop.|

>**Important:** (*) Mac OS X and Windows don't have the same permissions granularity that Alfresco Content Services provides, so users will experience limitations on their desktops.
>The most notable differences are:
>
>* Specific permissions applied to a file that override the inherited permission from the folder. For example, a Consumer that's given Manager permissions on a file won't be able to rename, move, or delete the file.
>* Collaborators are only able to edit content that other users have created. Other actions, like rename or move are not permitted.

>**Note:** Role changes on content will synchronize from the server to the desktop.

>**Note:** Attempts to override locally set permissions are immediately reset, even when not connected to the server.
