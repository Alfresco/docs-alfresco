---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enterprise to Cloud Sync on replica on-premise instances

Alfresco does not support Enterprise to Cloud Sync running simultaneously from identical Alfresco Enterprise instances to Alfresco Cloud.

If you are backing up or restoring a replica of the Alfresco repository that has Enterprise to Cloud Sync enabled to [my.alfresco.com](https://my.alfresco.com/share/), it will result in sync issues for the original and the replica on-premise environments, and it will potentially cause functional issues and data loss.

To prevent this issue, before start up, disable Enterprise to Cloud Sync in the replica on-premise server by adding the following properties to the alfresco-global.properties file:

```
sync.mode=OFF
sync.pushJob.enabled=false
sync.pullJob.enabled=false
```

To prevent the cloned repositories from syncing to the cloud, enable Enterprise to Cloud Sync only on the main production system by setting the following property in the alfresco-global.properties file:

```
system.serverMode=PRODUCTION
```

The default value for this property is `UNKNOWN`.

**Important:** If the `system.serverMode` is not set to `PRODUCTION` on your main production system, Enterprise to Cloud Sync will not work.

If you currently have more than one Alfresco Enterprise on premise instance using Sync against Cloud, Alfresco recommends that you open an Alfresco Support ticket for assistance.

**Parent topic:**[Configuring Enterprise to Cloud Sync](../concepts/cloud-sync-config.md)

