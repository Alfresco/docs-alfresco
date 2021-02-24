---
author: Alfresco Documentation
source: 
---

# Uninstalling Desktop Sync

Before uninstalling Desktop Sync for Mac you should first remove your account then drag the application to the Trash. You can then perform a number of checks to verify that the content has been removed cleanly.

1.  Click ![](../images/ico-ds-alfresco.png) then ![Settings](../images/ds-ico-settings.png) to access **Settings**, and select Remove Account.

    This removes the content subscriptions, device registration, keychain, databases, etc.

2.  Click Quit to shutdown Desktop Sync.

3.  Drag the Desktop Sync application from the `Applications` folder to the Trash.

    This ensures that the application is removed cleanly.

4.  In Finder, click on the **Go** menu and select **Go to Folder...**.

    A text field appears.

5.  Paste the path `~/Library/Application Support` into the text field and click **Go**.

6.  Delete the `Alfresco` folder.

    This removes the sync logs, database files, and configuration files.

7.  Open `/<userHome>` and delete the `Alfresco` folder.

    This removes any remaining synced content, such as orphaned files, i.e. any content that was in conflict when you removed your account.

    **Note:** You don't need to uninstall the Desktop Sync client before installing a new version. Simply run the new installer to update the application.


**Parent topic:**[Installing Desktop Sync](../tasks/ds-install-mac.md)

