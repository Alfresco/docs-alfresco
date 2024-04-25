---
title: Application menu in taskbar
---

The following sections describe the Desktop Sync application menu on Windows and Mac.

{% capture windows %}

You can access Desktop Sync from the Windows system tray where the application icon appears:

![]({% link desktop-sync/images/ds-system-tray.png %}){:height="32px" width="192px"}

Hover your cursor over the Desktop Sync icon to display sync status information, such as date and time of last sync, sync issues (conflicts), and any pending updates.

![]({% link desktop-sync/images/ds-system-msg.png %}){:height="76px" width="184px"}

Right-click on the Desktop Sync icon ![]({% link desktop-sync/images/ds-icon.png %}) to see the application popup menu:

![]({% link desktop-sync/images/ds-system-menu-1.14.png %}){:height="178px" width="184px"}

### Application menu items

The following section goes through each one of the Desktop Sync menu items.

#### Open

Displays information about checked out files, any pending syncs, and conflicts.

![]({% link desktop-sync/images/conflict.png %}){:height="374px" width="756px"}

* Select **Files Checked Out** to view information about any files you've checked out from Desktop Sync, for example, file name, file location, and details when the file was downloaded.
* Select **Pending Syncs** to view information about any pending syncs, for example, file name, status of the pending sync, modifier, file location, and details when the file was last accessed.
* Select **Conflicts** to view conflict-related information and resolve the conflict. The information displayed includes file name, the conflict or issue, modifier, location of the conflict, and details when the file was last modified.
* Select the file in conflict and click **Resolve**.

To resolve a conflict, choose which version to keep, Alfresco or your changes and click **Keep**:

![]({% link desktop-sync/images/conflict-resolution.png %}){:height="246px" width="350px"}

* **Alfresco Version**: Replaces the local file with the Alfresco copy.
* **My Version**: Copies updates made to content locally to Alfresco.

##### Working with multiple Checked Out files

If several files are **Checked Out**, you have the following options:

* Select files individually using the check boxes to the left hand side, or use the select all files check box at the top.
* When you select more than one check box, you can pick bulk actions at the top of the tab, **Check In** and **Cancel Check Out**. If you choose **Check In**, you can select if the new version is a major or minor change, and optionally input a comment. Select **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.

#### Go to Alfresco Folder

Opens the `Alfresco` sync folder for Desktop Sync.

#### Search

Opens the **Search** dialog so you can search your local synced files and folders.

You can only search the content that's already synced in the `Alfresco` folder. This avoids having to use the search feature in Mac Finder/Windows Explorer which takes longer and sometimes provides irrelevant results.

* Start your search by typing in the search field. You'll see results presented even if you've only provided partial search text. In the search results, you'll see files and folders are easily identifiable by their respective icons.
* You can view the search results listed by *Name*, *Location*, *Modified Date*, and *Size*. You can also search by file name and file extension, for example, by entering `png` or `.png`.
* To locate a file from the **Search** dialog, double-click the file/folder icon to show the content in Windows Explorer.

#### Recent Files

Click **Recent Files** to open the Recent Files dialog and view your recently used files in the `Alfresco` sync folder.

* The recently used files are listed by *Name*, *Location*, *Modified Date*, and *Size*, where the most recently updated file is at the top.
* To locate a file from the **Recent Files** dialog, double-click the required file to show the content in Windows Explorer.

#### Sync Now

By default local content is synced to Alfresco immediately and Alfresco content is synced locally every five minutes. Click this if you want content synced immediately.

#### Pause Sync

Pauses Sync if you don't wish to synchronize files from the server, for example when you have a low bandwidth connection.

#### Manage Your Account

You can manage which folders and sites get synced on your desktop and other account details using **Manage Your Account**. The available options are:

* **Manage Folders**: Opens Choose folders and sites to sync screen. See [Select content to sync]({% link desktop-sync/1.16/using/select-to-sync.md %}#sync/windows).

    If you deselect a previously synced folder and click **Sync**, then the synced content from your desktop is removed. In case you have any unsynced or conflicted files, they will be orphaned in `C:\Users\<username>\Alfresco\`orphaned.

* **Consistency Check**: Performs a consistency check on Desktop Sync. This is typically used in collaboration with your IT team when you need support.

* **Account Information**: View the account information for Desktop Sync:

    * **User Name** for the currently logged in user.
    * **Storage Used** by the `Alfresco` sync folder on your hard drive.

* **Enter Your New Password**: If you have recently changed your Alfresco password, use this option to update the same password in Desktop Sync.

    The **Have you recently changed your password in Alfresco?** window appears. Specify the updated password to resume syncing and click **Update**.

* **Remove Local Content**: Removes all the synced content from Desktop Sync without the need to remove the user account. This provides support for a customer policy where content is only kept on a device when users are actively working on that content and using Desktop Sync.

    To start using Desktop Sync again, you'll need to set up your synced files via the **Manage Your Account > Manage Folders** menu option. See [Select content to sync]({% link desktop-sync/1.16/using/select-to-sync.md %}#sync/windows).

* **Remove Account**: Removes the synced user from Desktop Sync and deletes all the synced content from the desktop. You can still access your files in Alfresco. On removing your account you are taken back to the Desktop Sync login screen. See [Setting up Desktop Sync]({% link desktop-sync/1.16/install/index.md %}#setting-up-desktop-sync-on-windows).

#### About

Tells you which version of Desktop Sync you're using.

#### Help

View online help.

#### Quit

Closes Desktop Sync.

You will no longer be able to sync during this time. Syncing will resume when you restart Desktop Sync. Any content updated while Desktop Sync was closed will be synced when the application is restarted.

It's recommended that you always have Desktop Sync up and running so that your local content and Alfresco are in sync.

### Windows Explorer context menu

The folder and file context menu can be accessed via the Windows Explorer.

#### Accessing and using the context menu

To view the Desktop Sync context menu, follow the steps below:

1. Navigate to your synced content (folder or file) in the File Explorer.
2. Right-click the content to access the Explorer menu actions.
3. Click **Sync Now** to sync your content immediately.
4. Click **Check Out** to lock it in Alfresco, so that other users can't overwrite it while you make changes. Once you check out a file, you'll see two more options:
    * **Check In**: Uploads a new version of your content to Alfresco.
    * **Cancel Check Out**: Cancels editing to unlock the file without saving any changes.
5. In the event of a conflict, you'll see one more option:
    * **Resolve**: Selecting this option opens a screen where you can decide to keep your changes or the changes from the server.
6. Click **Share** to enable file sharing when you right-click a synced file. Once set up in your configuration file, this option allows you to share a direct link to a file, so that anyone that has the link can view the file.
    * See [Configuring Desktop Sync]({% link desktop-sync/1.16/config/index.md %}) for configuration details.
    * See [Sharing files]({% link desktop-sync/1.16/using/sharing.md %}#sharing-files-on-windows) for more.
7. Click **Version History** to view and manage version history when you right-click synced content.
    * See [Version History]({% link desktop-sync/1.16/using/versions.md %}) for more.
8. Click **Properties** to enable viewing, editing, and updating of properties when you right-click synced content.
    * See [Properties]({% link desktop-sync/1.16/using/metadata.md %}#manage-the-properties-for-content-on-windows) for more.
9. Click **Update Desktop Sync** to download the new installer file to your local Downloads folder. See [Updating Desktop Sync]({% link desktop-sync/1.16/upgrade/index.md %}) for more.

#### Working with multiple files in Windows Explorer

You can also work with multiple files by using the Explorer right click menu actions:

* **Sync Now**, **Check Out**, and **Properties**.
* **Check In** and **Cancel Check Out** are displayed if any file is already checked out.
* When you click **Check In**, select if the new version is a major or minor change, and optionally input a comment. Click **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.
* If you have selected a mixture of items, for example where you have files checked out and not checked out, then all the relevant options are shown. When an action is selected, it's only applied to the files that are in a relevant state.
* If any of the files you selected are in conflict, you'll have to resolve these individually, as the conflict resolution options are not displayed.

{% endcapture %}

{% capture mac %}

You can access Desktop Sync from the Mac OS X menu bar where the application icon appears:

![]({% link desktop-sync/images/ds-icon-tray.png %})

* **Application icon**

    Click the Desktop Sync ![Desktop Sync]({% link desktop-sync/images/ico-ds-alfresco.png %}){:height="23px" width="23px"} icon to see more options.

* **Search**

    Click the Search ![Search]({% link desktop-sync/images/ds-ico-search.png %}){:height="23px" width="23px"} icon to open the **Search** dialog and search your local synced files and folders.

    You can only search the content that's already synced in the `Alfresco` folder. This avoids having to use the search feature in Mac Finder/Windows Explorer which takes longer and sometimes provides irrelevant results.

  * Start your search by typing in the search field. You'll see results presented even if you've only provided partial search text. In the search results, you'll see files and folders are easily identifiable by their respective icons.
  * You can view the search results listed by *Name*, *Modified Date*, and *Size*. You can also search by file name and file extension, for example, by entering `png` or `.png`.
  * To locate a file from the **Search** dialog, click the icon on the right side of the required row to show the content in Mac Finder.

* **Sync folder**

    Click the folder ![Sync Folder]({% link desktop-sync/images/ds-open-sync-folder.png %}){:height="23px" width="23px"} icon to open the `Alfresco` sync folder on your computer.

* **Settings**

    Click the ![Settings]({% link desktop-sync/images/ds-ico-settings.png %}){:height="23px" width="23px"} icon to open the Desktop Sync settings menu. See [Settings](#settings) for more details.

### Settings

You can access Desktop Sync settings by clicking the application icon in the menu bar then selecting **Settings**.

Click ![]({% link desktop-sync/images/ico-ds-alfresco.png %}){:height="23px" width="23px"} then ![Settings]({% link desktop-sync/images/ds-ico-settings.png %}){:height="23px" width="23px"} to access the **Settings** options.

#### Pause / Resume Sync

Select Pause Sync when you prefer to work offline, for example due to slow network speeds, or if you're working on a particularly large file. Once you've selected **Pause Sync**, the menu option changes to **Resume Sync**.

Select Resume Sync to resume syncing with Alfresco Content Services.

#### Consistency Check

Performs a consistency check on Desktop Sync. This is typically used in collaboration with your IT team when you need support.

#### Recent Files {#recent-files-mac}

Click **Recent Files** to open the Recent Files dialog and view your recently used files in the `Alfresco` sync folder.

* The recently used files are listed by *Name*, *Modified Date*, and *Size*, where the most recently updated file is at the top.
* To locate a file from the **Recent Files** dialog, click the<!-- icon on the right side of the--> required row to show the content in Mac Finder.

#### Manage Sync Folder

Selecting **Manage Sync Folder** opens the Select sites and folders to sync dialog. This allows you to select more content to sync, or deselect content to stop syncing. See [Select content to sync]({% link desktop-sync/1.16/using/select-to-sync.md %}#sync/mac) for more.

If you deselect a previously synced folder and click **Sync**, then the synced content from your desktop is removed. In case you have any unsynced or conflicted files, they will be orphaned in `/<userHome>/Alfresco/orphaned`.

#### Manage Your Account {#manage-your-account-mac}

* **Account Information**

    View the account information for Desktop Sync:

    * **User Name** for the currently logged in user.
    * **Storage Used** by the `Alfresco` sync folder on your hard drive.

* **Remove Local Content**

    Removes all the synced content from Desktop Sync without the need to remove the user account. This provides support for a customer policy where content is only kept on a device when users are actively working on that content and using Desktop Sync.

    To start using Desktop Sync again, you'll need to set up your synced files via the **Manage Sync Folder** menu option. See [Select content to sync]({% link desktop-sync/1.16/using/select-to-sync.md %}#sync/mac).

* **Remove Account**

    Removes the synced user from Desktop Sync and deletes all the synced content from the desktop. Use this option as the first stage of uninstalling Desktop Sync.

    You can still access your files in Alfresco. Any content that can't be removed from your desktop is orphaned. On removing your account you are taken back to the Desktop Sync login dialog. Close the login dialog to quit the application. See [Setting up Desktop Sync]({% link desktop-sync/1.16/install/index.md %}#faq/mac).

#### Help

View online help.

#### About

View the version number of Desktop Sync you're using.

#### Quit

Closes Desktop Sync.

You won't be able to sync content during this time. Syncing will resume when you restart Desktop Sync. Any content updated while Desktop Sync was closed will be synced when the application is restarted.

It's recommended that you always have Desktop Sync up and running so that your local content and Alfresco are in sync.

### Check Outs, Conflicts and Pending Syncs {#checkouts-conflicts-pendingsyncs}

Displays information about checked out files, any pending syncs, and conflicts.

![]({% link desktop-sync/images/ds-tabbed-ui.png %}){:height="358px" width="260px"}

* Select **Checked Out** to view information about any files you've checked out from Desktop Sync, for example, file name, file location, and details when the file was downloaded.
* Select **Pending** to view information about any pending syncs, for example, file name, status of the pending sync, modifier, file location, and details when the file was last accessed.
* Select **Conflicts** to view conflict-related information and resolve the conflict. The information displayed includes file name, the conflict or issue, modifier, location of the conflict, and details when the file was last modified.

    To resolve a conflict, select the conflict and either click:

    * **Discard my Changes**: Replaces the local file with the Alfresco copy.
    * **Keep my Changes**: Copies updates made to content locally over to Alfresco.

> **Note:** There may be times when you can't resolve a conflict for a file because the parent folder also has a conflict. In this case, your only choice is to resolve the conflict on the folder by either selecting **Keep my Changes** or **Discard my Changes**. Your choice is then applied to all files within that folder.

### Working with multiple Checked Out files {#working-with-multiple-checkedout-files-mac}

If several files are **Checked Out**, you have the following options:

* Select files individually using the check boxes to the left hand side, or use the select all files check box at the top.
* When you select more than one check box, you can pick bulk actions at the top of the tab, **Check In** and **Cancel Check Out**. If you choose **Check In**, you can select if the new version is a major or minor change, and optionally input a comment. Select **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.

### Update password

Desktop Sync doesn't allow you to change your password directly. However, if your [password changes]({% link content-services/latest/using/dashboard.md %}#changing-your-password) in Alfresco Share, you will see a notification in Desktop Sync asking you to update your password. Click **Update Password** to continue.

### Mac Finder context menu

The folder and file context menu can be accessed via the Mac Finder.

#### Accessing and using the context menu

To view the Finder menu actions, follow the steps below:

1. Navigate to your synced content in Finder.
2. Right-click on a file or folder to access the Finder menu actions.
3. Click **Sync Now** to sync your content immediately.
4. Click **Check Out** to lock it in Alfresco, so that other users can't overwrite it while you make changes offline. Once you check out a file, you'll see two more options:
    * **Check In**: Uploads a new version of your content to Alfresco.
    * **Cancel Check Out**: Cancels editing to unlock the file without saving any changes.
5. In the event of a conflict, you'll see two more options:
    * **Discard my Changes**: Replaces the local file with the Alfresco copy.
    * **Keep my Changes**: Copies updates made to content locally over to Alfresco.
6. Click **Share** to enable file sharing when you right-click a synced file. Once set up in your configuration file, this option allows you to share a direct link to a file, so that anyone that has the link can view the file.
    * See [Configuring Desktop Sync]({% link desktop-sync/1.16/config/index.md %}) for configuration details.
    * See [Sharing files]({% link desktop-sync/1.16/using/sharing.md %}#faq/mac) for more.
7. Click **Version History** to view and manage version history when you right-click synced content.
    * See [Version History]({% link desktop-sync/1.16/using/versions.md %}) for more.
8. Click **Properties** to enable viewing, editing, and updating of properties when you right-click synced content.
    * See [Properties]({% link desktop-sync/1.16/using/metadata.md %}#faq/mac) for more.
9. Click **Update Desktop Sync** to download the new installer file to your local Downloads folder. See [Updating Desktop Sync]({% link desktop-sync/1.16/upgrade/index.md %}) for more.

#### Working with multiple files in Finder

You can also work with multiple files by using the Finder right click menu actions:

* **Sync Now**, **Check Out**, and **Properties**.
* **Check In** and **Cancel Check Out** are displayed if any file is already checked out.
* When you click **Check In**, select if the new version is a major or minor change, and optionally input a comment. Click **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.
* If you have selected a mixture of items, for example where you have files checked out and not checked out, then all the relevant options are shown. When an action is selected, it's only applied to the files that are in a relevant state.
* If any of the files you selected are in conflict, you'll have to resolve these individually, as the conflict resolution options are not displayed.

{% endcapture %}

{% include tabs.html tableid="menu" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
