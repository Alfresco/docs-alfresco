---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr 4 backup and restore

This section describes the process for backing up and restoring the Solr 4 server.

Your backup strategy must be tested end-to-end, including restoration of backups that were taken previously. Ensure that you have adequately tested your backup scripts prior to deploying Alfresco to production.

-   **[Backing up Solr 4](../tasks/solr-backup.md)**  
There are a number of ways to back up the Solr 4 indexes. You can set the Solr 4 indexes backup properties by editing the alfresco-global.properties file.
-   **[Refreshing the backup Solr 4 indexes \(optional\)](../tasks/backup-hot-refreshsolr4.md)**  
This is an optional step before initiating a hot backup.
-   **[Restoring Solr 4 indexes](../tasks/solr-recovery.md)**  
This section describes the process for restoring the Solr 4 indexes.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

