---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Alfresco Server]
keyword: back up restore
---

# Backing up and restoring

This section describes the process for backing up the Alfresco content repository only. It assumes that components other than the data residing in Alfresco \(operating system, database, JDK, application server, Alfresco binaries, and configuration, etc.\) are being backed up independently.

Your backup strategy must be tested end-to-end, including restoration of backups. Ensure that you have adequately tested your backup scripts prior to deploying Alfresco to production.

**Note:** Alfresco does not support simultaneously running identical Alfresco Enterprise instances on premise to sync against [my.alfresco.com](https://my.alfresco.com/share/). So, if you are backing up or restoring a replica of the Alfresco repository that has Hybrid Sync enabled against [my.alfresco.com](https://my.alfresco.com/share/), it will result in sync issues for the original and the replica on premise environments and potentially cause functional issues and data loss.

In order to prevent this sync issue, you need to disable Enterprise to Cloud Sync in the replica on premise server before startup by adding the following parameters in your alfresco-global.properties file:

```
sync.mode=OFF
sync.pushJob.enabled=false
sync.pullJob.enabled=false
```

If you currently have more than one Alfresco Enterprise on premise instance using Hybrid Sync against Cloud, Alfresco recommends you open an Alfresco Support ticket for assistance.

-   **[Backing up and restoring the repository](../concepts/backup-intro.md)**  
Backing up an Alfresco repository involves backing up the directory pointed to by the `dir.root` setting, the database that Alfresco is configured to use, and the Solr/Lucene indexes.
-   **[Performing a full hot reindex on a cluster](../tasks/hot-reindex.md)**  
Use this information to perform a full hot reindex on an Alfresco cluster.

**Parent topic:**[Administering](../concepts/ch-administering.md)

