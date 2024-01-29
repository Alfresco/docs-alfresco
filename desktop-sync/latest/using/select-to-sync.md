---
title: Select content to sync
---

Once you've set up Desktop Sync, all your Alfresco Content Services folders will be displayed from My Files, Shared Files, and your Sites.

{% capture windows %}

Once you've set up Desktop Sync, all your Alfresco Content Services folders are displayed from My Files, Shared Files, and My Sites.

Use the *Select sites and folders to sync* screen to select the content to sync between Alfresco Content Services and your desktop. The content is synced at `C:\Users\<username>\Alfresco`.

If you work with content that has deep folder structures, you may wish to deselect the **Include all files and sub-folders** checkbox. This allows you to only sync selected folders deep in your hierarchy, without syncing the intermediate folders, and prevent lengthy folder paths being created. By default, this feature is enabled, and if you want to sync only particular folders then the checkbox has to be deselected. In this case, only the files in the selected folders are synced using a folder structure starting from their respective root paths in Content Services (such as My Files, Shared Files, and your Sites).

Here’s an example that shows how the folder paths may be shortened:

* `My Files` > `<selected-sync-folder>`
* `Sites` > `<Site Name>` > `<selected-sync-folder>`
* `Shared Files` > `<selected-sync-folder>`

When the checkbox is selected (since it's enabled by default), the folders are synced using the hierarchy in Content Services. This replicates the behavior from previous releases of Desktop Sync.

> **Note:** The screen provides an estimate of how much disk space will be occupied, so only select the content you need. The more content you select, the more space will be taken on your local machine and the more time it will take to perform the initial sync.

1. Synchronize your content from **My Files** and **Shared Files**.

    ![Initial sync selection screen]({% link desktop-sync/images/setup-1.17.png %}){:height="555px" width="346px"}

    1. Select **My Files** to expand the folder list in your **My Files** area of Alfresco Content Services.

        You can navigate through the folder hierarchy and click the check box to select individual folders, or select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %}) **My Files** to sync everything. See [My Files]({% link content-services/latest/using/content/index.md %}#my-files) for more.

    2. Select **Shared Files** to sync all the files and folders under **Shared Files** in Alfresco.

        You can navigate through the folder hierarchy and click the check box to select individual folders, or select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %}) **Shared Files** to sync everything. See [Shared Files]({% link content-services/latest/using/content/index.md %}#shared-files) for more.

2. Select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %}) next to **Favorite Sites** to sync all your favorite sites.

    To select specific sites, click ![]({% link desktop-sync/images/ds-expand.png %}) to expand the list and select the relevant site.

    To sync a specific folder within a site, double-click the site name and select the folder.

3. Select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %}) next to **Favorite Folders** to sync all your favorite folders.

    To sync specific folders, click ![]({% link desktop-sync/images/ds-expand.png %}) to expand the list, double-click the site name and select the relevant folder.

    When you expand **Favorite Folders**, all the favorite folders for a site are grouped under that site.

4. Under **My Sites**, you'll see all the sites you're a member of.

    To sync specific folders, click ![]({% link desktop-sync/images/ds-expand.png %}) to expand the list, double-click the site name and select the relevant folder.

    > **Note:** Sites display their full name and folders display the hierarchy of the folder, for example, **My Site \| My Folder**.

5. Under **Company Home**, you'll see all the folders created by the Administrator under Company Home of Alfresco repository.

6. Click **Sync** to start initial syncing of the selected Alfresco files and folders to your desktop.

    > **Tip:** You can click **Cancel** to cancel the sync and close the Select sites and folders to sync screen.

    > **Note:** During the initial sync, don't disconnect your computer from the network or put your computer to sleep. Although the sync will resume if interrupted, it will likely need to check the content again and very large initial syncs may take a long time to complete.

7. In the **Alfresco sync folder location** dialog, choose where the sync folder is stored.

    The content is synced to `C:\Users\<username>\Alfresco` by default.

    1. To use the default location and start the sync, click **OK**.

    2. To change the sync location, select **Browse…**, choose a new location, click **Select Folder**, and then click **OK** to start the sync.

    > **Note:** If you wish to move the Alfresco sync folder location later, you'll have to remove your account and set up Desktop Sync again.

    > **Note:** The sync folder location must be set to a local folder as network folders aren't supported.

### About the initial sync {#init-sync-win}

The **Sync** progress screen shows the status of initial sync. The Alfresco icon ![]({% link desktop-sync/images/ds-spin.png %})in the system tray will spin during the sync process. On completion, a notification appears on the system tray.

![]({% link desktop-sync/images/initialsync-1.12.png %}){:height="160px" width="469px"}

In C`:\Users\<username>\Alfresco`, copies of all the content you've selected to sync are created. Desktop Sync automatically keeps both the local copy and the Alfresco versions in sync with each other whenever any changes are made.

![]({% link desktop-sync/images/sync.png %})

During initial sync:

* You can **Return to content selection** to change the content selected for synchronization. Note that after making changes, your sync will restart from the beginning.
* If you create a new file or update a file on your desktop, it will be synced only after the initial sync is over.
* It's recommended that you don't move the parent folders being synced.

### Working with content

To save your work in Alfresco, just work on your files in the `C:\Users\<username>\Alfresco` folder, and everything in the folder will be automatically synced to Alfresco.

{% endcapture %}

{% capture mac %}

Use the *Select sites and folders to sync* dialog to select the content to sync between Alfresco Content Services and your desktop. The content is synced to your `/<userHome>/Alfresco` folder, located in Finder under **Go > Home**.

If you work with content that has deep folder structures, you may wish to deselect the **Include all files and sub-folders** checkbox. This allows you to only sync selected folders deep in your hierarchy, without syncing the intermediate folders, and prevent lengthy folder paths being created. By default, this feature is enabled, and if you want to sync only particular folders then the checkbox has to be deselected. In this case, only the files in the selected folders are synced using a folder structure starting from their respective root paths in Content Services (such as My Files, Shared Files, and your Sites).

Here’s an example that shows how the folder paths may be shortened:

* `My Files` > `<selected-sync-folder>`
* `Sites` > `<Site Name>` > `<selected-sync-folder>`
* `Shared Files` > `<selected-sync-folder>`

When the checkbox is selected (since it's enabled by default), the folders are synced using the hierarchy in Content Services. This replicates the behavior from previous releases of Desktop Sync.

> **Note:** The screen provides an estimate of how much disk space will be occupied, so only select the content you need. The more content you select, the more space will be taken on your computer and the more time it'll take to perform the initial sync.

1. Synchronize your content from **My Files** and **Shared Files**.

    ![Initial sync selection screen]({% link desktop-sync/images/setup-mac-1.9.png %}){:height="382px" width="640px"}

    1. Select **My Files** to expand the folder list in your **My Files** area of Alfresco Content Services.

        You can navigate through the folder hierarchy and click the check box to select individual folders, or select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %})**My Files** to sync everything. See [My Files]({% link content-services/latest/using/content/index.md %}#my-files) for more.

    2. Select **Shared Files** to expand the folder list in your **Shared Files** area of Alfresco Content Services.

        You can navigate through the folder hierarchy and click the check box to select individual folders, or select ![]({% link desktop-sync/images/ico-ds-sync-fav.png %})**Shared Files** to sync everything. See [Shared Files]({% link content-services/latest/using/content/index.md %}#shared-files) for more.

2. Select **Sites** to expand the list of sites you are a member of in Alfresco Content Services, sites you have favorited, and sites with content that you have favorited.

    ![]({% link desktop-sync/images/sites-favorites-mac.png %}){:height="327px" width="640px"}

    * ![]({% link desktop-sync/images/site-fav-mac.png %}) indicates a favorite site or folder
    * ![]({% link desktop-sync/images/folder-fav-mac.png %}) indicates a site or folder that contains favorited content

    These are listed in alphabetical order, grouped by favorites, then sites with favorited content, and then other sites you're a member of.

    * Select **Sites** to expand the folder list in your **Sites** area of Alfresco Content Services.

       You can navigate through the folder hierarchy and click the check box to select individual folders.

    * Select **Company Home** to expand the folder list in your **Company Home** area of Alfresco Content Services (if set up by your IT team).

       You can navigate through the folder hierarchy and click the check box to select individual folders.

       > **Note:** It's not possible to select all your **Sites** or all of **Company Home** as it's likely to involve a large sync and may take a long time.

3. Click **Sync** to start initial syncing of the selected files and folders to your desktop.

    > **Tip:** You can click **Cancel** to cancel selecting content and close the Select sites and folders to sync dialog.

    > **Note:** During the initial sync, don't disconnect your computer from the network or put your computer to sleep. Although the sync will resume if interrupted, it's likely to need to check the content again, and very large initial syncs may take a long time to complete.

4. In the **Alfresco sync folder location** dialog, choose where the sync folder is stored.

    The content is synced to `<userHome>/Alfresco` by default.

    1. To use the default location and start the sync, click **OK**.

    2. To change the sync location, select **Browse…**, choose a new location, click **Select Folder**, and then click **OK** to start the sync.

    > **Note:** If you wish to move the Alfresco sync folder location later, you'll have to remove your account and set up Desktop Sync again.

    > **Note:** The sync folder location must be set to a local folder as network folders aren't supported.

### About the initial sync {#init-sync-mac}

The **Sync** progress dialog shows the status of the initial sync. The Alfresco icon in the menu bar changes to indicate that the sync is in progress ![]({% link desktop-sync/images/ds-syncing-mac.png %}){:height="23px" width="23px"}. Once the sync has completed successfully, the icon changes to ![]({% link desktop-sync/images/ds-synced-mac.png %}){:height="23px" width="23px"}.

![]({% link desktop-sync/images/initialsync-mac-1.17.png %}){:height="221px" width="469px"}

In `/<userHome>/Alfresco`, copies of all the content you've selected to sync are created. Desktop Sync automatically keeps both the local copy and the Alfresco Content Services versions in sync with each other whenever any changes are made.

![]({% link desktop-sync/images/sync-mac.png %}){:height="351px" width="747px"}

During initial sync:

* You can close the sync progress dialog using the red cross, and the initial sync will continue in the background which allows you to continue working elsewhere.
* You can **Return to content selection** to change the content selected for synchronization. Note that after making changes, your sync will restart from the beginning.
* If you create a new file or update a file on your desktop, it'll be synced after the initial sync is over.
* It's recommended that you don't move folders until the initial sync has completed.

### Working with content

To save your work in Alfresco, just work on your files in the `/<userHome>/Alfresco` folder, and everything in the folder will be automatically synced to Alfresco.

{% endcapture %}

{% include tabs.html tableid="sync" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
