---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Synchronizing an item or folder

You can sync any items or folders to the cloud if you have an Alfresco in the cloud account to use the Enterprise to Cloud Sync feature.

You must have set up synchronization in your user profile.

1.  Hover over an item/folder in the library and click **More** then **Sync to Cloud**.

    The Sync to The Cloud dialog box appears. The first time you synchronize content to the cloud, you need to specify where it will be placed.

2.  Select the network, site, and folder destination for the synchronized content. Only networks that support the Enterprise to Cloud Sync feature can be selected.

    **Tip:** Click the new folder icon ![](../images/ico-add-folder.png) in the dialog box to add a folder as necessary.

3.  If you're synchronizing a folder, there's an additional **Include subfolders** option. Select this to also synchronize content contained in subfolders of the selected folder.

4.  Select **Lock 'on-premise' copy** to lock the on-premise content being synchronized.

    The lock will remain in place until you unsync the content, meaning that only the cloud version can be edited. If you select to include subfolders in your sync, those folders \(along with their content\) will also be locked.

    **Note:** You can add content to a locked folder. Enterprise users will be able to view the content but not edit it.

5.  Click **Sync**.

    A cloud icon appears to the left of the content that was synchronized. Click this icon to open the Sync Info box. This displays information about the sync, including the status and the location of the content in the cloud.

    **Tip:** After you synchronize your content, it displays the ![](../images/ico-synced.png) synced icon. You can click this to show sync info details. Contents of a folder that have been synced display the ![](../images/ico-synced-indirect.png) indirectly synced icon.


**Parent topic:**[Synchronizing content to Alfresco in the cloud](../concepts/cloud-sync-overview.md)

