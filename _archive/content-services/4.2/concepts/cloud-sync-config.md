---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
---

# Configuring Enterprise to Cloud Sync

You can activate Enterprise to Cloud Sync to enable the synchronization between Alfresco Cloud Network and your on-premise Alfresco server.

**Note:** This property is available in Alfresco 4.2.3 and later.

**Note:** Alfresco does not support simultaneously running identical Alfresco Enterprise instances on premise to sync against [my.alfresco.com](https://my.alfresco.com/share/). So, if you are backing up or restoring a replica of the Alfresco repository that has Hybrid Sync enabled against [my.alfresco.com](https://my.alfresco.com/share/), it will result in Hybrid Sync issues for the original and the replica on premise environments and potentially cause functional issues and data loss.

To prevent this issue, disable Enterprise to Cloud Sync in the replica on-premise server before start up by adding the following properties to the alfresco-global.properties file:

```
sync.mode=OFF
sync.pushJob.enabled=false
sync.pullJob.enabled=false
```

To prevent the cloned repositories from syncing to the cloud, you need to enable Enterprise to Cloud Sync only on the main production system by setting the following property in the alfresco-global.properties file:

```
system.serverMode=PRODUCTION
```

The default value for this property is `UNKNOWN`, but it can be changed to `TEST` or `BACKUP` for the test or backup systems, as required.

**Note:** If the `system.serverMode` is not set to `PRODUCTION` on your main production system, Cloud sync will not work.

If you currently have more than one Alfresco Enterprise on premise instance using Hybrid Sync against Cloud, Alfresco recommends you open an Alfresco Support ticket for assistance.

-   **[Enabling Enterprise to Cloud Sync](../tasks/cloud-sync-config-enable.md)**  
To enable synchronization from your on-premise Alfresco server, you need an Enterprise Alfresco subscription and an Alfresco license that contains the synchronization feature.
-   **[Disabling Enterprise to Cloud Sync](../tasks/cloud-sync-config-disable.md)**  
This topic describes how to disable the Enterprise to Cloud Sync feature.

**Parent topic:**[Setting up Enterprise to Cloud Sync](../concepts/cloud-sync-intro.md)

