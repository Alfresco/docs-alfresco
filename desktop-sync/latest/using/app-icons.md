---
title: Application icons and menu
---

The following sections describe the Desktop Sync icons and menu actions on Windows and Mac.

{% capture windows %}

### Desktop Sync icons

Desktop Sync always ensures that the files in your `C:\Users\<username>\Alfresco` folder are synced with Alfresco. It adds status icons to your files and folders so you know the application is working.

You'll see icons in two different places: in the system tray and over individual files and folders.

#### System tray icons

Icons that appear over the Desktop Sync icon in your system tray represent the overall status of your `Alfresco` folder. Here's what each of these icons means.

|Icon name|System tray icon|Description|
|---------|----------------|-----------|
|Green tick|![]({% link desktop-sync/images/ds-greentick.png %}){:height="35px" width="35px"}|A green tick shows all your files are synced and accessible from your desktop.|
|Red cross|![]({% link desktop-sync/images/ds-redcross.png %}){:height="35px" width="35px"}|A red cross indicates there are conflicts that need to be resolved by the user. Something isn't working properly and your file(s) are not being synced.|
|Pause|![]({% link desktop-sync/images/ds-pause.png %}){:height="35px" width="35px"}|A pause icon indicates that Desktop Sync is paused due to invalid server credentials or there's nothing configured to sync.|
|Warning|![]({% link desktop-sync/images/ds-hcfail-mac.png %}){:height="35px" width="35px"}|A warning icon indicates that either:{::nomarkdown}<ul><li>Desktop Sync failed to get a successful server health check. Contact your IT team if you see this warning when you're having problems working with your files.</li><li>An update is available for Desktop Sync (i.e. the installed version is older than the one provided by your IT team).</li></ul>{:/}|
|Offline|![]({% link desktop-sync/images/ds-offline-mac.png %}){:height="35px" width="35px"}|An offline icon indicates that Desktop Sync isn't connected to Alfresco and you are working offline. Check your Internet connection to resume syncing your files.|

#### Context menu icons

Icons that appear over individual files and folders represent the status of that file or folder. Here's what each of these icons means.

|Icon name|Context menu icon|Description|
|---------|-----------------|-----------|
|Green tick|![]({% link desktop-sync/images/ds-ico-synced.png %}){:height="35px" width="35px"}|It's synced - A green tick on a file indicates that the file or folder is in sync with the server copy.|
|Refresh arrows|![]({% link desktop-sync/images/ds-ico-pending.png %}){:height="35px" width="35px"}|It's in use - Blue arrows indicate that Desktop Sync is waiting for the application to release the file or for free space to become available, or a server file to be checked in.|
|Red flag|![]({% link desktop-sync/images/ds-ico-conflict.png %}){:height="35px" width="35px"}|It's in conflict - A red cross on a file or folder indicates that update/rename/delete has conflicted with a server-side change and we were not able to automatically resolve it. You need to decide which version to keep.|
|Grey arrow|![]({% link desktop-sync/images/ds-ico-checkedout-other.png %}){:height="35px" width="35px"}|It's checked out by another user. A grey arrow indicates that the file is checked out by another user in Alfresco. The file is locked, so you can't make changes until the file is checked in, or the check out is cancelled.|
|Blue arrow|![]({% link desktop-sync/images/ds-ico-checkedout.png %}){:height="35px" width="35px"}|It's checked out by you. A blue arrow indicates that the file is checked out by you. The file is locked on the server, so others can't make changes until the file is checked in, or the check out is cancelled.|
|Grey pencil|![]({% link desktop-sync/images/ds-ico-readonly.png %}){:height="35px" width="35px"}|It's read-only. A grey pencil indicates that you don't have permission to edit this file. This could be due to insufficient privileges on the server, or the file has been declared as a record.|

### Explorer menu actions

You can access Desktop Sync actions through the Windows File Explorer context menu by right clicking on a file or folder.

|Action|Description|
|------|-----------|
|Sync Now|Use this option when you want to sync content immediately.|
|Check Out|When you check out a file, it's locked in Alfresco, so that other users can't overwrite it while you make changes offline. This also applies when [working with multiple files in Explorer]({% link desktop-sync/latest/using/app-menu.md %}#working-with-multiple-files-in-windows-explorer).|
|Check In|Shown only when you have one or more files checked out. Select this option when you're ready to upload a new version to Alfresco. See [working with multiple files in Explorer]({% link desktop-sync/latest/using/app-menu.md %}#working-with-multiple-files-in-windows-explorer) for more.|
|Cancel Check Out|Shown only when you have one or more files checked out. You can cancel editing to unlock the file(s) without saving changes. See [working with multiple files in Explorer]({% link desktop-sync/latest/using/app-menu.md %}#working-with-multiple-files-in-windows-explorer) for more.|
|Resolve|Shown only when you need to resolve a conflict. Selecting this option opens a screen where you can decide to keep your changes or the changes from the server.|
|Declare as Record|Shown only when Alfresco Governance Services is running. Select this option to declare the file as a record. See [Declaring records]({% link governance-services/latest/using/easy-access-records.md %}#file-as-record) for more. **Note:** Files previously rejected as a record can't be automatically declared again. See [Managing unfiled records]({% link governance-services/latest/using/manage-fileplan.md %}#managing-unfiled-records) for information on resetting the status.|
|Share|Shown only when you right-click a file (i.e. not a folder). Select this option to share a link to a file. See [Sharing files]({% link desktop-sync/latest/using/sharing.md %}#sharing-on-windows) for more.|
|Version History|Select this option to view and manage the version history of a file. See [Version history]({% link desktop-sync/latest/using/versions.md %}) for more.|
|Properties|Select this option to view, edit, and update properties directly in Desktop Sync. See [Properties]({% link desktop-sync/latest/using/metadata.md %}#manage-the-properties-for-content-on-windows) for more.|
|Update Desktop Sync|Shown only when a newer version of Desktop Sync is provided by your IT team. Select this option to update Desktop Sync. See [Updating Desktop Sync]({% link desktop-sync/latest/upgrade/index.md %}) for more.|

{% endcapture %}

{% capture mac %}

### Desktop Sync icons

Desktop Sync always ensures that the files in your `/<userHome>/Alfresco` folder are synced with Alfresco. It adds status icons to your files and folders so you know the application is working.

You'll see icons in two different places: in the menu bar and next to individual files and folders.

#### Menu bar icons

Icons that appear over the Desktop Sync icon in your menu bar represent the overall status of your Alfresco folder.

Here's what each of these icons means.

|Icon name|Icon|Description|
|---------|----|-----------|
|Green tick|![]({% link desktop-sync/images/ds-synced-mac.png %}){:height="35px" width="35px"}|A green tick shows all your files are synced and accessible from your desktop.|
|Red flag|![]({% link desktop-sync/images/ds-conflict-mac.png %}){:height="35px" width="35px"}|A red flag indicates there are conflicts that need to be resolved by the user. Something isn't working properly and your file(s) are not being synced.|
|Blue arrows|![]({% link desktop-sync/images/ds-syncing-mac.png %}){:height="35px" width="35px"}|A syncing icon indicates that file(s) are being synced or waiting to be synced.|
|Pause|![]({% link desktop-sync/images/ds-pause-mac.png %}){:height="35px" width="35px"}|A pause icon indicates that Desktop Sync is paused due to invalid server credentials or there's nothing configured to sync.|
|Warning|![]({% link desktop-sync/images/ds-hcfail-mac.png %}){:height="35px" width="35px"}|A warning icon indicates that either:{::nomarkdown}<ul><li>Desktop Sync failed to get a successful server health check. Contact your IT team if you see this warning when you're having problems working with your files.</li><li>An update is available for Desktop Sync (i.e. the installed version is older than the one provided by your IT team)</li></ul>{:/}.|
|Offline|![]({% link desktop-sync/images/ds-offline-mac.png %}){:height="35px" width="35px"}|An offline icon indicates that Desktop Sync isn't connected to Alfresco and you are working offline. Check your Internet connection to resume syncing your files.|

#### Content icons

Icons that appear next to individual files and folders represent the status of that file or folder.

Here's what each of these icons means.

|Icon name|File / Folder icon|Description|
|---------|------------------|-----------|
|Green tick|![]({% link desktop-sync/images/ds-ico-synced.png %}){:height="35px" width="35px"}|It's synced - A green tick on a file indicates that the file or folder is in sync with the server copy.|
|Refresh arrows|![]({% link desktop-sync/images/ds-ico-pending.png %}){:height="35px" width="35px"}|It's in use. The blue arrows indicate that Desktop Sync is waiting for the application to release the file or for free space to become available.|
|Red flag|![]({% link desktop-sync/images/ds-ico-conflict.png %}){:height="35px" width="35px"}|It's in conflict. A red flag on a file or folder indicates that update/rename/delete has conflicted with a server-side change and we aren't able to automatically resolve it. You need to decide which version to keep.|
|Grey arrow|![]({% link desktop-sync/images/ds-ico-checkedout-other.png %}){:height="35px" width="35px"}|It's checked out by another user. A grey arrow indicates that the file is checked out by another user in Alfresco. The file is locked, so you can't make changes until the file is checked in, or the check out is cancelled.|
|Blue arrow|![]({% link desktop-sync/images/ds-ico-checkedout.png %}){:height="35px" width="35px"}|It's checked out by you. A blue arrow indicates that the file is checked out by you. The file is locked on the server, so others can't make changes until the file is checked in, or the check out is cancelled.|
|Grey pencil|![]({% link desktop-sync/images/ds-ico-readonly.png %}){:height="35px" width="35px"}|It's read-only. A grey pencil indicates that you don't have permission to edit this file. This could be due to insufficient privileges on the server, or the file has been declared as a record.|

> **Note:** You can hide the icons displayed in Finder by changing a setting on your Mac. To hide the Finder extension, open **System Preferences > Extensions**. Locate the **Alfresco Desktop Sync** extension, then remove the tick in the check box next to **Finder**.

#### Desktop Sync user interface

Click ![Settings]({% link desktop-sync/images/ico-ds-alfresco.png %}) to open the Desktop Sync User Interface (UI). By default, this is docked (or locked) to the menu bar. Click and drag it away from the menu bar to move it. Here is a brief description of each tab in the UI.

|Tab name|Description|
|--------|-----------|
|Checked out|Displays files that you have checked out from your synced folder in Desktop Sync. You can click the icon or file name to open it, or double-click to reveal the file in Finder. See [working with multiple checked out files]({% link desktop-sync/latest/using/app-menu.md %}#faq/mac) for more.|
|Pending|Displays any changes that are waiting to be synced to Alfresco. **Note:** Files that are currently in use by another application are listed here.|
|Conflicts|Displays a list of files or folders that are in conflict. **Note:** If a folder is in conflict as well as any of its contents (such as a file or sub-folder), special rules apply for how this content is resolved. See [sync conflict resolution guide]({% link desktop-sync/latest/using/sync-conflict-guide.md %}#faq/mac) for more details.|

#### Finder menu actions

You can access Desktop Sync actions through the Finder context menu by right clicking on a file or folder.

|Action|Description|
|------|-----------|
|Sync Now|Use this option when you want to sync content immediately.|
|Check Out|When you check out a file, it's locked in Alfresco, so that other users can't overwrite it while you make changes offline. This also applies when [working with multiple files in Finder]({% link desktop-sync/latest/using/app-menu.md %}#faq/mac).|
|Check In|Shown only when you have one or more files checked out. Select this option when you're ready to upload a new version to Alfresco. See [working with multiple files in Finder]({% link desktop-sync/latest/using/app-menu.md %}#faq/mac) for more.|
|Cancel Check Out|Shown only when you have one or more files checked out. You can cancel editing to unlock the file(s) without saving changes. See [working with multiple files in Finder]({% link desktop-sync/latest/using/app-menu.md %}#faq/mac) for more.|
|Keep my Changes|Shown only when you need to resolve a conflict. Select this option to keep the changes made on your computer. This will sync your changes to Alfresco as a new version.|
|Discard my Changes|Shown only when you need to resolve a conflict. Select this option to discard the changes made on your computer. This will sync the latest version from Alfresco, overwriting your changes in your `Alfresco` sync folder.|
|Declare as Record|Shown only when Alfresco Governance Services is running. Select this option to declare the file as a record. See [Declaring records]({% link governance-services/latest/using/easy-access-records.md %}#file-as-record) for more. **Note:** Files previously rejected as a record can't be automatically declared again. See [Managing unfiled records]({% link governance-services/latest/using/manage-fileplan.md %}#managing-unfiled-records) for information on resetting the status.|
|Share|Shown only when you right-click a file (i.e. not a folder). Select this option to share a link to a file. See [Sharing files]({% link desktop-sync/latest/using/sharing.md %}#faq/mac) for more.|
|Version History|Select this option to view and manage the version history of a file. See [Version history]({% link desktop-sync/latest/using/versions.md %}) for more.|
|Properties|Select this option to view, edit, and update properties directly in Desktop Sync. See [Properties]({% link desktop-sync/latest/using/metadata.md %}#faq/mac) for more.|
|Update Desktop Sync|Shown only when a newer version of Desktop Sync is provided by your IT team. Select this option to update Desktop Sync. See [Updating Desktop Sync]({% link desktop-sync/latest/upgrade/index.md %}) for more.|

> **Note:** From time to time Finder extensions are disabled by another application. To enable them, go to **System Preferences > Extensions** and select **Alfresco Desktop Sync**.

{% endcapture %}

{% include tabs.html tableid="icons" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
