---
author: Alfresco Documentation
---

# Configuring Enterprise to Cloud Sync

You can activate Enterprise to Cloud Sync to enable the synchronization between Alfresco Cloud Network and your on-premise Alfresco server.

**Note:** This property is available in Alfresco 4.1.9 and later.

**Note:** Alfresco does not support simultaneously running identical Alfresco Enterprise instances on premise to sync against [my.alfresco.com](https://my.alfresco.com/share/). So, if you are backing up or restoring a replica of Alfresco repository that has Hybrid Sync enabled against [my.alfresco.com](https://my.alfresco.com/share/), it will result into Hybrid Sync issues for the original and the replica on premise environments and potentially cause functional issues and data loss.

In order to prevent this Hybrid Sync issue, you need to disable Hybrid Sync in the replica on premise server before startup. This can be achieved by adding the following parameters in your alfresco-global.properties file:

```
syncService.mode=OFF
sync.pushJob.enabled=false
sync.pullJob.enabled=false
```

To prevent cloned repositories from syncing to Cloud, you need to enable hybrid sync on the main production system by setting the following property in the alfresco-global.properties file:

```
system.serverMode=PRODUCTION
```

The default value for this property is `UNKNOWN`, but it can be changed to `TEST` or `BACKUP` for the test or backup systems, as required.

**Note:** If the `system.serverMode` is not set to `PRODUCTION` on your main production system, Cloud sync will not work.

If you currently have more than one Alfresco Enterprise on premise instance using Hybrid Sync against Cloud, Alfresco recommends you open an Alfresco Support ticket for assistance.

-   **[Enabling Synchronization](../tasks/cloud-sync-config-enable.md)**  
This topic provides instructions on enabling the Enterprise to Cloud Sync feature within Alfresco Share.
-   **[Disabling Synchronization](../tasks/cloud-sync-config-disable.md)**  
This topic provides instructions on how to disable synchronization between the Alfresco Cloud Network and your on-premise Alfresco server.

**Parent topic:**[Administering Enterprise to Cloud Sync](../concepts/cloud-sync-intro.md)

