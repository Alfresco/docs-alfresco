---
author: Alfresco Documentation
source: 
audience: 
category: User Help
---

# Working with Desktop Sync

To save your work in Alfresco, just work on your files in the /<userHome\>/Alfresco folder, and everything in the folder will be automatically synced to Alfresco.

**Understanding Desktop Sync icons**

Desktop Sync always ensures that the files in your /<userHome\>/Alfresco folder are synced with Alfresco. It adds status icons to your files and folders so you know the application is working.

You'll see icons in a few different places:

-   Icons that appear over the Desktop Sync icon in your menu bar represent the overall status of your Alfresco folder.
-   Icons that appear next to individual files and folders represent the status of that file or folder.

Here's what each of these icons means.

**Menu bar icons**

|Icon name|Icon|Description|
|---------|----|-----------|
|Green tick|![](../images/ds-synced-mac.png)|A green tick shows all your files are synced and accessible from your desktop.|
|Red flag|![](../images/ds-conflict-mac.png)|A red flag indicates there are conflicts that need to be resolved by the user. Something isn't working properly and your file\(s\) are not being synced.|
|Blue arrows|![](../images/ds-syncing-mac.png)|A syncing icon indicates that file\(s\) are being synced or waiting to be synced.|
|Pause|![](../images/ds-pause-mac.png)|A pause icon indicates that Desktop Sync is paused due to invalid server credentials or there's nothing configured to sync.|
|Offline|![](../images/ds-offline-mac.png)|An offline icon indicates that Desktop Sync isn't connected to Alfresco and you are working offline. Check your Internet connection to resume syncing your files.|

**Content icons**

|Icon name|File / Folder icon|Description|
|---------|------------------|-----------|
|Green tick|![](../images/ds-ico-synced.png)|It's synced - A green tick on a file indicates that the file or folder is in sync with the server copy.|
|Black arrow|![](../images/ds-ico-checkedout.png)|It's checked out - A black arrow indicates that the file is checked out in Desktop Sync. This locks the file on the server so that no one else can make changes to it until the server file is checked in, or the check out is cancelled.|
|Blue arrows|![](../images/ds-ico-pending.png)|It's in use - The blue arrows indicate that Desktop Sync is waiting for the application to release the file or for free space to become available.|
|Red flag|![](../images/ds-ico-conflict.png)|It's in conflict - A red flag on a file or folder indicates that update/rename/delete has conflicted with a server-side change and we aren't able to automatically resolve it. You need to decide which version to keep.|

**Note:** You can hide the icons displayed in Finder by changing a setting on your Mac. To hide the Finder extension, open System Preferences \> Extensions. Locate the **Alfresco Desktop Sync** extension, then remove the tick in the check box next to **Finder**.

**Desktop Sync User Interface**

Click ![Settings](../images/ico-ds-alfresco.png) to open the Desktop Sync User Interface \(UI\). By default, this is docked \(or locked\) to the menu bar. Click and drag it away from the menu bar to move it. Here is a brief description of each tab in the UI.

|Tab name|Description|
|--------|-----------|
|Checked Out|Displays files that you have checked out from your synced folder in Desktop Sync.**Note:** Any files that you check out from other applications, such as Alfresco Share, will not be listed here.

|
|Pending|Displays any changes that are waiting to be synced to Alfresco.**Note:** Files that are currently in use by another application are listed here.

|
|Conflicts|Displays a list of files or folders that are in conflict. **Note:** If a folder is in conflict as well as any of its contents \(such as a file or sub-folder\), special rules apply for how this content is resolved. See [conflict matrix](ds-working-mac.md#conflict) for more details.

|

**Finder menu actions**

You can access Desktop Sync actions through the Finder context menu by right clicking on a file or folder.

|Action|Description|
|------|-----------|
|Sync Now|Use this option when you want to sync content immediately.|
|Check Out|When you check out a file, it's locked in Alfresco, so that other users can't overwrite it while you make changes offline.|
|Check In|Shown only when you have a file checked out. Select this option when you're ready to upload a new version to Alfresco.|
|Cancel Check Out|Shown only when you have a file checked out. You can cancel editing to unlock the file without saving changes.|
|Keep my Changes|Shown only when you need to resolve a conflict. Select this option to keep the changes made on your computer. This will sync your changes to Alfresco as a new version.|
|Discard my Changes|Shown only when you need to resolve a conflict. Select this option to discard the changes made on your computer. This will sync the latest version from Alfresco, overwriting your changes in your `Alfresco` sync folder.|

**Note:** If you disable the Finder extension it also removes access to the context menu shown when you right click on a file or folder. You can still access these options from the Desktop Sync UI or the Settings menu.

**What are conflicts?**

Whilst Desktop Sync ensures that content is kept up to date silently, under normal operation there may be circumstances where Desktop Sync can't resolve differences between a file stored on your desktop and the corresponding file in Alfresco. When the sync changes can't be updated automatically you are asked to resolve the conflict manually. This happens when a file has changed in both locations since its last sync, making it difficult to determine which changes to save.

For example, a conflict occurs when you update a file in your Alfresco sync folder and an update to the same file has happened on the server since the last sync. Desktop Sync will give you a choice of resolving the sync conflict by either choosing to keep your changes, or discarding your changes in favor of the latest copy from Alfresco. For more information, see [Sync conflict resolution matrix](ds-conflicts-mac.md).

-   **[Sync conflict resolution matrix](../concepts/ds-conflicts-mac.md)**  
Use this information to resolve and manage Desktop Sync conflicts.

**Parent topic:**[Using Desktop Sync](../concepts/desktopsync-using-mac.md)

