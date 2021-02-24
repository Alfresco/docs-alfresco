---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: back up repository
---

# Backing up and restoring the repository

Backing up an Alfresco repository involves backing up the directory pointed to by the `dir.root` setting, the database that Alfresco is configured to use, and the Solr/Lucene indexes.

For backing up the Solr indexes using the Share Admin Console or the alfresco-global.properties file, or JConsole, see [Backing up Solr](../tasks/solr-backup.md).

For backing up the Lucene indexes, see [Lucene index backup and restore](backup-lucene-intro.md).

The contentstore and database must be backed up as a single unit. When you restore an Alfresco backup, you must restore both the `dir.root` directory \(only the contentstore and contentstore.deleted directories\) and the Alfresco database from the same backup set. Otherwise, the repository may be corrupted.

The dir.root directory is defined in the `alfresco-global.properties` file. By default, this directory is named alf\_data and is located within the directory where Alfresco is installed.

-   **[Performing a cold backup](../tasks/backup-cold.md)**  
This section describes the procedure for performing a cold backup.
-   **[Performing a hot backup](../tasks/backup-hot.md)**  
This section describes the procedure for performing a hot backup.

**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

