---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
---

# Setting up Enterprise to Cloud Sync

The Enterprise to Cloud Sync feature is available in Alfresco. This section describes how to configure Enterprise to Cloud Sync and includes solutions for troubleshooting issues.

Enterprise to Cloud Sync allows Alfresco on-premise users to synchronize content to Alfresco in the cloud. This feature supports scenarios where users wish to collaborate on documents with external parties that do not have access to systems behind the firewall. In these circumstances, the on-premise Alfresco instance becomes the system of record, and the cloud instance is the system of engagement for external collaboration.

Once content has been setup to synchronize, the cloud and on-premise instances of the documents are automatically synchronized with each other whenever either version is updated.

To set up Enterprise to Cloud Sync, you need an Alfresco in the cloud account.

**Note:** Enterprise to Cloud Sync is not supported with a multi-tenant on-premise Alfresco instance.

Any upgraded installations that use sync must run the metadata query patch for best performance. For more information, see [Configuring an optional patch for upgrade](intrans-metadata-conf-patch.md).

-   **[Enterprise to Cloud Sync overview](../concepts/cloud-sync-arc-overview.md)**  
The Enterprise to Cloud Sync feature allows Alfresco Enterprise users to synchronize content between their local on-premise Alfresco and a network on the cloud.
-   **[Enterprise to Cloud Sync features](../concepts/cloud_sync_features.md)**  
Enterprise to Cloud Sync automatically synchronizes content between on-premise Alfresco and Alfresco in the cloud.
-   **[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)**  
 You can activate Enterprise to Cloud Sync to enable the synchronization between Alfresco Cloud Network and your on-premise Alfresco server.
-   **[Troubleshooting Enterprise to Cloud Sync](../concepts/cloud_sync_troubleshooting.md)**  
This section lists the best practices for setting up Enterprise to Cloud Sync and solutions for troubleshooting unexpected behavior.

**Parent topic:**[Administering](../concepts/ch-administering.md)

