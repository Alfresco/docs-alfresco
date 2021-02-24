---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Synchronizing content to Alfresco in the cloud

The Cloud Sync feature lets you work with your content without you needing access to the on-premise system.

After you synchronize content to the cloud, the on-premise and cloud instances of your content are automatically synchronized with each other whenever either version is updated. This relationship continues until you unsync the content.

When you update a synced item in the cloud, changes to the actual content of the item are synced back to the on-premise version, as are important properties such as the item name and title. Comments made in Alfresco, version changes, and more minor properties are not synced back to the on-premise version.

When a folder is synced, any items it contains \(and subfolders if they have been selected to be synced\) are indirectly synced. If indirectly synced items or folders are moved out of their directly synced parent folder, then the sync is broken.

You must have an Alfresco in the cloud account to use the Enterprise to Cloud Sync feature. Set up synchronization in your user profile.

To sync content you need to be in the site you want to sync content from; content sync isn't available from the Alfresco Repository.

-   **[Setting up Cloud Sync](../tasks/sync-setup.md)**  
If you have an Alfresco in the cloud account you can set up Cloud Sync in your user profile.
-   **[Synchronizing an item or folder](../tasks/sync-content.md)**  
You can sync any items or folders to the cloud if you have an Alfresco in the cloud account to use the Enterprise to Cloud Sync feature.
-   **[Requesting synchronization](../tasks/sync-request.md)**  
Synchronized content is updated automatically as it changes. You can also run a manual synchronization on a single content item to ensure changes are transferred to the cloud immediately.
-   **[Viewing synchronized content in the cloud](../tasks/sync-view.md)**  
After you synchronize content to the cloud, you can use the **View in Cloud** option to view the content in the cloud site. This can be especially useful if you locked the content on your Enterprise site.
-   **[Unsync your content from the cloud](../tasks/unsync-content.md)**  
When you no longer need your Enterprise content connected to the cloud, you can remove the sync.

**Parent topic:**[Using Alfresco One](../topics/sh-uh-welcome.md)

