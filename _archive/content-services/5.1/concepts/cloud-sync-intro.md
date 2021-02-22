---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Setting up Enterprise to Cloud Sync

Enterprise to Cloud Sync gives Alfresco on-premise users the ability to synchronize their content to Alfresco in the Cloud. This feature supports scenarios where users wish to collaborate on documents with external parties that do not have access to systems behind the firewall. In these circumstances, the on-premise Alfresco instance becomes the system of record, and the cloud instance is the system of engagement for external collaboration.

Once content has been setup to synchronize, the cloud and on-premise instances of the documents are automatically synchronized with each other whenever either version is updated.

It is worth noting the following recommendations for using Enterprise to Cloud Sync:

-   Use Enterprise to Cloud Sync only on content that you wish to share with other users
-   Ensure that you do not set up synchronization on content that is sensitive
-   Remember that other users of the network might have access to your synced content

To set up Enterprise to Cloud Sync, you need an Alfresco in the Cloud account.

**Note:** Enterprise to Cloud Sync is not supported with a multi-tenant on-premise Alfresco instance.

Any upgraded installations that use sync must run the metadata query patch for best performance. For more information, see [Configuring an optional patch for upgrade](intrans-metadata-conf-patch.md).

-   **[Enterprise to Cloud Sync overview](../concepts/cloud-sync-arc-overview.md)**  
Enterprise to Cloud Sync allows you to select content that is automatically synchronized between on-premise Alfresco and a network on Alfresco in the Cloud.
-   **[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)**  
Use this information to enable and disable Enterprise to Cloud Sync.
-   **[Troubleshooting Enterprise to Cloud Sync](../concepts/cloud-sync-troubleshooting.md)**  
Use these error messages and solutions when troubleshooting unexpected behavior with Enterprise to Cloud Sync.

**Parent topic:**[Administering](../concepts/ch-administering.md)

