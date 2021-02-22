---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Syncing content to Alfresco Cloud

The Cloud Sync feature lets you work with your content without you needing access to your Enterprise on-premise system.

After you sync content to the cloud, the on-premise and cloud instances of your content are automatically synced with each other whenever either version is updated. This relationship continues until you unsync the content.

When you update a synced file in the cloud, changes to the actual content of the file are synced back to the on-premise version, as are important properties such as the file name and title. Comments made in Alfresco, version changes, and more minor properties are not synced back to the on-premise version.

When a folder is synced, any files it contains \(and subfolders if they have been selected to be synced\) are indirectly synced. If indirectly synced files or folders are moved out of their directly synced parent folder, then the sync is broken.

You must have an Alfresco Cloud account to use the Enterprise to Cloud Sync feature, and you need to set up sync in your user profile.

To sync content you need to be in the site you want to sync content from; content sync isn't available from the Alfresco Repository.

  

-   **[Setting up Cloud Sync](../tasks/sync-setup.md)**  
If you have an Alfresco Cloud account you can set up Cloud Sync in your user profile.
-   **[Syncing files and folders](../tasks/sync-content.md)**  
You can sync any files or folders to the cloud if you have an Alfresco Cloud account to use the Enterprise to Cloud Sync feature.
-   **[Requesting sync](../tasks/sync-request.md)**  
Synced content is updated automatically as it changes. You can also run a manual sync on a single file or folder to ensure changes are transferred to the cloud immediately.
-   **[Viewing synced content in the cloud](../tasks/sync-view.md)**  
After you sync content to the cloud, you can use the **View in Cloud** option to view the content in the cloud site. This can be especially useful if you locked the content on your Enterprise on-premise site.
-   **[Unsync content from the cloud](../tasks/unsync-content.md)**  
When you no longer need your Enterprise on-premise content connected to the cloud, you can remove the sync.

**Parent topic:**[Alfresco content](../concepts/library-intro.md)

