---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Syncing files and folders

You can sync any files or folders to the cloud if you have an Alfresco Cloud account to use the Enterprise to Cloud Sync feature.

You must have set up synchronization in your user profile.

1.  Hover over a file/folder in the library and click **More** then **Sync to Cloud**.

2.  In the Sync to The Cloud screen select the network, site, and folder destination for the synced content. Only networks that support the Enterprise to Cloud Sync feature can be selected.

    **Tip:** Click the new folder icon ![](../images/ico-add-folder.png) in the dialog box to add a folder as necessary.

3.  If you're syncing a folder, there's an additional **Include subfolders** option. Select this to also sync files contained in subfolders of the selected folder.

4.  Select **Lock 'on-premise' copy** to lock the Enterprise on-premise content being synchronized.

    The lock will remain in place until you unsync the content, meaning that only the cloud version can be edited. If you select to include subfolders in your sync, those folders \(along with their content\) will also be locked.

    **Note:** You can add content to a locked folder. Enterprise on-premise users will be able to view the content but not edit it.

5.  Combine the delete options as required:

    -   **Content can be deleted on cloud** selected - Content can be deleted on the cloud site, but the on premise version will be unaffected.
    -   **Content can be deleted on cloud** not selected - Content can only be removed from the cloud site by unsyncing on the on premise site.
    -   **Content can be deleted on cloud** and **Delete content on premise if it is deleted on cloud** both selected - Deleting content on a cloud site will also delete the original content on the on premise site.
6.  Click **Sync**.

    A cloud icon appears to the left of the content that was synced. Click this icon to open the Sync Info box. This displays information about the sync, including the status and the location of the content in the cloud.

    **Tip:** After you sync your content, it displays the ![](../images/ico-synced.png) synced icon. You can click this to show sync info details. Contents of a folder that have been synced display the ![](../images/ico-synced-indirect.png) indirectly synced icon.


**Parent topic:**[Syncing content to Alfresco Cloud](../concepts/cloud-sync-overview.md)

