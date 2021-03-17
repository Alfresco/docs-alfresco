---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: back up repository
---

# Backing up and restoring the repository

Backing up a repository involves backing up the directory pointed to by the `dir.root` setting, the database that Alfresco Content Services is configured to use, and the Solr 4 indexes.

For backing up the Solr 4 indexes using the Alfresco Share Admin Console or the alfresco-global.properties file, or JConsole, see [Backing up Solr 4](../tasks/solr-backup.md).

To restore the backup successfully, the contentstore directory and database must be backed up as a set. When you restore an Alfresco backup, you must restore both the Alfresco database and the dir.root directory \(contentstore directory\) from the same backup set. Otherwise, the repository may be corrupted.

The dir.root directory is defined in the `alfresco-global.properties` file. By default, this directory is named alf\_data and is located within the directory where Alfresco Content Services is installed.

CAUTION:

In a clustered environment, when the cloned nodes are restarted with a cluster license, the nodes may try to join the existing production cluster and point to a cloned database instead of the production cluster database. This can lead to corrupted data.

**Cause**: It occurs because the cloned node contains the cluster id from production and tries to join that cluster.

**Solution**: To avoid the problem you should ensure any cloned nodes required for upgrade testing are network isolated from the production nodes.

-   **[Performing a cold backup](../tasks/backup-cold.md)**  
Follow these steps when performing a cold backup.
-   **[Performing a hot backup](../tasks/backup-hot.md)**  
Follow these steps when performing a hot backup.

**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

