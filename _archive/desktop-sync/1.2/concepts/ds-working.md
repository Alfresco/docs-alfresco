---
author: Alfresco Documentation
source: 
audience: 
---

# Working with Desktop Sync

To save your work in Alfresco, just work on your files in the C:\\Users\\<username\>\\Alfresco folder, and everything in the folder will be automatically synced to Alfresco.

**Understanding Desktop Sync icons**

Desktop Sync always ensures that the files in your C:\\Users\\<username\>\\Alfresco folder are synced with Alfresco. It adds status icons to your files and folders so you know the application is working.

You'll see icons in two different places: in the system tray and over individual files and folders.

**System tray icons**

Icons that appear over the Desktop Sync icon in your system tray represent the overall status of your Alfresco folder.

Here's what each of these icons means.

|Icon name|System tray icon|Description|
|---------|----------------|-----------|
|Green tick|![](../images/ds-greentick.png)|A green tick shows all your files are synced and accessible from your desktop.|
|Red cross|![](../images/ds-redcross.png)|A red cross indicates there are conflicts that need to be resolved by the user. Something isn't working properly and your file\(s\) are not being synced.|
|Pause|![](../images/ds-pause.png)|A pause icon indicates that Desktop Sync is paused due to invalid server credentials or there's nothing configured to sync.|
|Warning|![](../images/ds-hcfail-mac.png)|A warning icon indicates that Desktop Sync failed to get a successful server health check. Contact your IT team if you see this warning.|
|Offline|![](../images/ds-offline-mac.png)|An offline icon indicates that Desktop Sync isn't connected to Alfresco and you are working offline. Check your Internet connection to resume syncing your files.|

**Context menu icons**

Icons that appear over individual files and folders represent the status of that file or folder.

Here's what each of these icons means.

|Icon name|Context menu icon|Description|
|---------|-----------------|-----------|
|Green tick|![](../images/ds-ico-synced.png)|It's synced - A green tick on a file indicates that the file or folder is in sync with the server copy.|
|Refresh arrows|![](../images/ds-ico-pending.png)|It's in use - Blue arrows indicate that Desktop Sync is waiting for the application to release the file or for free space to become available, or a server file to be checked in.|
|Red flag|![](../images/ds-ico-conflict.png)|It's in conflict - A red cross on a file or folder indicates that update/rename/delete has conflicted with a server-side change and we were not able to automatically resolve it. You need to decide which version to keep.|
|Grey arrow|![](../images/ds-ico-checkedout-other.png)|It's checked out by another user. A grey arrow indicates that the file is checked out by another user in Alfresco. The file is locked, so you can't make changes until the file is checked in, or the check out is cancelled.|
|Blue arrow|![](../images/ds-ico-checkedout.png)|It's checked out by you. A blue arrow indicates that the file is checked out by you. The file is locked on the server, so others can't make changes until the file is checked in, or the check out is cancelled.|
|Grey pencil|![](../images/ds-ico-readonly.png)|It's read-only. A grey pencil indicates that you don't have permission to edit this file. This could be due to insufficient privileges on the server, or the file has been declared as a record.|

**Explorer menu actions**

You can access Desktop Sync actions through the Windows File Explorer context menu by right clicking on a file or folder.

|Action|Description|
|------|-----------|
|Sync Now|Use this option when you want to sync content immediately.|
|Check Out|When you check out a file, it's locked in Alfresco, so that other users can't overwrite it while you make changes offline. This also applies when [working with multiple files in Explorer](../references/ds-taskbar.md#multipleFilesFinder).|
|Check In|Shown only when you have one or more files checked out. Select this option when you're ready to upload a new version to Alfresco. See [working with multiple files in Explorer](../references/ds-taskbar.md#multipleFilesFinder) for more.|
|Cancel Check Out|Shown only when you have one or more files checked out. You can cancel editing to unlock the file\(s\) without saving changes. See [working with multiple files in Explorer](../references/ds-taskbar.md#multipleFilesFinder) for more.|
|Resolve|Shown only when you need to resolve a conflict. Selecting this option opens a screen where you can decide to keep your changes or the changes from the server.|
|Declare as Record|Shown only when Alfresco Governance Services is running. Select this option to declare the file as a record. See [Declaring records](http://docs.alfresco.com/ags/tasks/rm-create-record.html) for more. **Note:** Files previously rejected as a record can't be automatically declared again. See [Managing unfiled records](http://docs.alfresco.com/ags/concepts/rm-records-manage-unfiled.html) for information on resetting the status.

|

**What are conflicts?**

Whilst Desktop Sync ensures that content is kept up to date silently, under normal operation there may be circumstances where Desktop Sync can't resolve differences between a file stored on your desktop and the corresponding file in Alfresco. When the sync changes can't be updated automatically you are asked to resolve the conflict manually. This happens when a file has changed in both locations since its last sync, making it difficult to determine which changes to save.

For example, a conflict occurs when you update a file in your Alfresco sync folder and an update to the same file has happened on the server since the last sync. Desktop Sync will give you a choice of resolving the sync conflict by either choosing to keep your changes, or discarding your changes in favor of the latest copy from Alfresco.

For more information, see [Sync conflict resolution matrix](ds-conflicts.md).

-   **[Sync conflict resolution matrix](../concepts/ds-conflicts.md)**  
Use this information to resolve and manage Desktop Sync conflicts.
-   **[Permissions](../concepts/ds-permissions.md)**  
Alfresco Content Services permissions are replicated on the desktop for files and folders that have been synchronized, ensuring that users are not able to edit files offline as well as on the server.
-   **[Governance Services support](../concepts/ds-governance.md)**  
Desktop Sync is fully compatible with Alfresco Governance Services. This topic explains how Desktop Sync handles records and classified files.

**Parent topic:**[Using Desktop Sync for Windows](../concepts/desktopsync-using.md)

