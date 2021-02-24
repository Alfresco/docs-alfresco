---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Alfresco Server]
keyword: back up restore
---

# Backing up and restoring

This section describes the process for backing up the Alfresco content repository. It assumes that the various binaries \(operating system, database, JDK, application server, and so on.\) and configuration files \(operating system, database, JDK, application server, Alfresco, and so on\) are being backed up independently.

Your backup strategy must be tested end-to-end, including restoration of backups that were taken previously. Ensure that you have adequately tested your backup scripts prior to deploying Alfresco to production.

-   **[Backing up and restoring the repository](../concepts/backup-intro.md)**  
Backing up an Alfresco repository involves backing up the following:
-   **[Backing up and restoring Lucene indexes](../concepts/backup-lucene-intro.md)**  
This section describes how to back up and restore the Lucene indexes.
-   **[Performing a full hot reindex on a cluster](../tasks/hot-reindex.md)**  
This section describes the process of performing a full hot reindex on an Alfresco cluster.
-   **[Restoring the repository](../tasks/repository-restore.md)**  
This task describes how to restore the Alfresco repository.

**Parent topic:**[Administering](../concepts/ch-administering.md)

