---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Synchronizing content to Alfresco in the cloud

The Enterprise to Cloud Sync feature lets you work with your content without you needing access to the on-premise Enterprise system. After you synchronize to the cloud, the on-premise and cloud instances of your content are automatically synchronized with each other whenever either version is updated. This relationship continues until you unsync the content.

This task assumes you are in the library of the desired site. To synchronize a folder and its contents the **Show Folders** feature must be enabled.

You must have an Alfresco in the cloud account to use the Enterprise to Cloud Sync feature. Set up synchronization in your user profile.

1.  Locate the folder or content item you want to synchronize to Alfresco in the cloud. You can synchronize both folders and items.

2.  Position the cursor over the folder or item of interest in the item list to display the available actions.

    **Note:** When you synchronize a folder, you are also synchronizing all content items in the folder. You can choose whether or not to include the subfolders and their content.

3.  Click **More** and then **Sync to Cloud**.

    The Sync \[name\] to The Cloud dialog box appears. The first time you synchronize content to the cloud, you need to specify where it will be placed.

4.  Select the destination for the synchronized content: network, site, and folder. Only networks that support the Enterprise to Cloud Sync feature can be selected.

    **Tip:** Use the **New folder** feature on this dialog box to add to the library structure as necessary.

5.  When synchronizing a folder, select the **Include subfolders** check box to also sync the subfolders. The content within the selected folder and all subfolders will be synchronized.

6.  Select the **Lock 'on-premise' copy** check box to lock the Enterprise content being synchronized. The lock will remain in place until you unsync the content.

    The lock is recursive, so if you select to include subfolders in your sync, those folders \(along with their content\) will also be locked.

    **Note:** You can add content to a locked folder. Enterprise users will be able to view the content but not edit it.

7.  Click **Sync**.

    A cloud icon appears to the left of the content that was synchronized. Click this icon to open the Sync Info box. This displays information about the sync, including the status and the location of the content in the cloud.

    **Tip:** After you synchronize your content, check the Sync Info box every once in awhile to make sure the sync was successful. If you do receive an error, the Technical Details section provides useful information if you need to contact Technical Support.


-   **[Requesting synchronization](../tasks/sync-request.md)**  
Your synchronized content will be updated automatically as it changes. However, you may want to run a manual synchronization on a single content item to ensure changes are transferred to the cloud immediately.
-   **[Viewing synchronized content in the cloud](../tasks/sync-view.md)**  
After you synchronize content to the cloud, you can use the **View in Cloud** feature to open the cloud site the content is synced to. This can be especially useful if you locked the content on your Enterprise site.
-   **[Unsync your content from the cloud](../tasks/unsync-content.md)**  
When you no longer need your Enterprise content connected to the cloud, you can break the connection.

**Parent topic:**[Working with content in a library](../concepts/library-intro.md)

