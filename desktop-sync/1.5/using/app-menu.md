---
title: Application Menu in Taskbar
---

{% capture windows %}

## Application Menu in Windows Taskbar 

You can access Desktop Sync from the Windows system tray.

### Accessing the application menu

The Desktop Sync icon appears in the Windows taskbar's system tray and looks like this:

![]({% link desktop-sync/images/ds-system-tray.png %}){:height="32px" width="192px"}

Hover your cursor over the Desktop Sync icon to display sync status information, such as date and time of last sync, 
sync issues (conflicts), and any pending updates.

![]({% link desktop-sync/images/ds-system-msg.png %}){:height="76px" width="184px"}

Right-click on the Desktop Sync icon ![]({% link desktop-sync/images/ds-icon.png %}) to see the application popup menu:

![]({% link desktop-sync/images/ds-system-menu.png %}){:height="143px" width="164px"}

### Application menu items

The following section goes through each one of the Desktop Sync menu items.

#### Open menu item

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

#### Go to Alfresco Folder menu item

Opens the `Alfresco` sync folder for Desktop Sync.

#### Sync Now menu item

By default local content is synced to Alfresco immediately and Alfresco content is synced locally every five minutes. Click this if you want content synced immediately.

#### Pause Sync menu item

Pauses Sync if you don't wish to synchronize files from the server, for example when you have a low bandwidth connection.

#### Manage Your Account menu item

You can manage which folders and sites get synced on your desktop and other account details 
using **Manage Your Account**. The available options are:

* **Manage Folders...**: Opens Choose folders and sites to sync screen. See [select content to sync]({% link desktop-sync/1.5/using/select-to-sync.md %}#selecting-content-to-sync-on-windows).

    If you deselect a previously synced folder and click **Sync**, then the synced content from your desktop is removed. In case you have any unsynced or conflicted files, they will be orphaned in `C:\Users\<username>\Alfresco\`orphaned.

* **Remove Account...**: Removes the synced user from Desktop Sync and deletes all the synced content from the desktop. You can still access your files in Alfresco. On removing your account you are taken back to the Desktop Sync login screen. See [Setting up Desktop Sync]({% link desktop-sync/1.5/install/index.md %}#setting-up-desktop-sync-on-windows).
* **Enter Your New Password...**: If you have recently changed your Alfresco password, use this option to update the same password in Desktop Sync.

    The **Have you recently changed your password in Alfresco?** window appears. Specify the updated password to resume syncing and click **Update**.

* **Consistency Check**: Performs a consistency check on Desktop Sync. This is typically used in collaboration with your IT team when you need support.

#### About menu item

Tells you which version of Desktop Sync you're using.

#### Help menu item

View online help.

#### Quit menu item

Closes Desktop Sync.

You will no longer be able to sync during this time. Syncing will resume when you restart Desktop Sync. 
Any content updated while Desktop Sync was closed will be synced when the application is restarted.

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
    * See [Configuring Desktop Sync]({% link desktop-sync/1.5/config/index.md %}) for configuration details.
    * See [Sharing files]({% link desktop-sync/1.5/using/sharing.md %}#sharing-files-on-windows) for more.
7. Click **Properties** to enable viewing, editing, and updating of properties when you right-click synced content.
    * See [Properties]({% link desktop-sync/1.5/using/metadata.md %}#manage-the-properties-for-content-on-windows) for more.
8. Click **Update Desktop Sync** to download the new installer file to your local Downloads folder. See [Updating Desktop Sync]({% link desktop-sync/1.5/upgrade/index.md %}) for more.

#### Working with multiple files in Windows Explorer

You can also work with multiple files by using the Explorer right click menu actions:

* **Sync Now**, **Check Out**, and **Properties**.
* **Check In** and **Cancel Check Out** are displayed if any file is already checked out.
* When you click **Check In**, select if the new version is a major or minor change, and optionally input a comment. Click **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.
* If you have selected a mixture of items, for example where you have files checked out and not checked out, then all the relevant options are shown. When an action is selected, it's only applied to the files that are in a relevant state.
* If any of the files you selected are in conflict, you'll have to resolve these individually, as the conflict resolution options are not displayed.

{% endcapture %}
   
{% capture mac %} 

## Application Menu in Mac Taskbar

You can access Desktop Sync from the Mac OS X menu bar.

### Accessing the application menu

The Desktop Sync icon appears in the Mac menu bar and looks like this:

![]({% link desktop-sync/images/ds-icon-tray.png %})

* **Application icon**

    Click the Desktop Sync ![Desktop Sync]({% link desktop-sync/images/ico-ds-alfresco.png %}){:height="23px" width="23px"} icon to see more options.

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

#### Manage Sync Folder

Selecting **Manage Sync Folder** opens the Select sites and folders to sync dialog. This allows you to select more content to sync, or deselect content to stop syncing. See [Selecting content to sync]({% link desktop-sync/1.5/using/select-to-sync.md %}#faq/mac) for more.

If you deselect a previously synced folder and click **Sync**, then the synced content from your desktop is removed. In case you have any unsynced or conflicted files, they will be orphaned in '/<userHome>/Alfresco/orphaned'.

#### Remove Account

Removes the synced user from Desktop Sync and deletes all the synced content from the desktop. Use this option as the first stage of uninstalling Desktop Sync.

You can still access your files in Alfresco. Any content that can't be removed from your desktop is orphaned. On removing your account you are taken back to the Desktop Sync login dialog. Close the login dialog to quit the application. See [Setting up Desktop Sync]({% link desktop-sync/1.5/install/index.md %}#faq/mac).

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

>**Note:** There may be times when you can't resolve a conflict for a file because the parent folder also has a conflict. In this case, your only choice is to resolve the conflict on the folder by either selecting **Keep my Changes** or **Discard my Changes**. Your choice is then applied to all files within that folder.

### Working with multiple Checked Out files {#working-with-multiple-checkedout-files-mac}

If several files are **Checked Out**, you have the following options:

* Select files individually using the check boxes to the left hand side, or use the select all files check box at the top.
* When you select more than one check box, you can pick bulk actions at the top of the tab, **Check In** and **Cancel Check Out**. If you choose **Check In**, you can select if the new version is a major or minor change, and optionally input a comment. Select **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.

### Update password

Desktop Sync doesn't allow you to change your password directly. However, if your [password changes]({% link content-services/latest/using/dashboard.md %}changing-your-password) in Alfresco Share, you will see a notification in Desktop Sync asking you to update your password. Click **Update Password** to continue.

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
    * See [Configuring Desktop Sync]({% link desktop-sync/1.5/config/index.md %}) for configuration details.
    * See [Sharing files]({% link desktop-sync/1.5/using/sharing.md %}#faq/mac) for more.
7. Click **Properties** to enable viewing, editing, and updating of properties when you right-click synced content.
    * See [Properties]({% link desktop-sync/1.5/using/metadata.md %}#faq/mac) for more.
8. Click **Update Desktop Sync** to download the new installer file to your local Downloads folder. See [Updating Desktop Sync]({% link desktop-sync/1.5/upgrade/index.md %}) for more.

#### Working with multiple files in Finder

You can also work with multiple files by using the Finder right click menu actions:

* **Sync Now**, **Check Out**, and **Properties**.
* **Check In** and **Cancel Check Out** are displayed if any file is already checked out.
* When you click **Check In**, select if the new version is a major or minor change, and optionally input a comment. Click **Check In** again to save your changes. This applies the same version change and comment (if added) to all the selected files.
* If you have selected a mixture of items, for example where you have files checked out and not checked out, then all the relevant options are shown. When an action is selected, it's only applied to the files that are in a relevant state.
* If any of the files you selected are in conflict, you'll have to resolve these individually, as the conflict resolution options are not displayed.

{% endcapture %}

{% include tabs.html tableid="faq" opt1="Windows" content1=windows opt2="Mac" content2=mac %}