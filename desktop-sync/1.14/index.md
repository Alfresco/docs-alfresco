---
title: Alfresco Desktop Sync
---

With Desktop Sync, desktop users can securely and automatically sync content between their desktop and Alfresco Content Services.

This release of Desktop Sync is a compatibility release to support Alfresco Sync Service 3.7 and later, and allows you to quickly find content that's synced to your local sync folder. See the **Search** menu option in [Windows]({% link desktop-sync/1.14/using/app-menu.md %}#menu/windows/search) and [Mac]({% link desktop-sync/1.14/using/app-menu.md %}#menu/mac) for more details.

You can easily connect to Alfresco Content Services and select folders and sites to view and work with on the desktop, even when working offline.

Once the folders and sites are selected, they are automatically downloaded and visible using Microsoft File Explorer (for Windows) or Finder (for Mac).

Changes are automatically synced from Alfresco Content Services to the desktop, so the latest content is always available. This allows you to work in places where you don't have internet access, secure in the knowledge that your changes will show up in Alfresco Content Services once you're back online.

> **Note:** Desktop Sync replicates content on local desktops for users with the appropriate access. If replication outside the repository isn't allowed by your content policy, you shouldn't deploy Desktop Sync. This version of Desktop Sync doesn't support Smart Folders.

For information about installing and configuring the Desktop Sync service server-side AMP, see [Installing Sync Service]({% link sync-service/latest/install/index.md %}).
