---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: back up repository
---

# Backing up and restoring the repository

Backing up an Alfresco repository involves backing up the following:

-   The directory pointed to by the `dir.root` setting
-   The database Alfresco is configured to use

To restore the backup successfully, the directory and database must be backed up as a single unit. When you restore an Alfresco backup, you must restore both the `dir.root` directory and the Alfresco database from the same backup set. Otherwise, the repository will be corrupted.

The dir.root directory is defined in the `alfresco-global.properties` file. By default, this directory is named alf\_data and is located within the directory where Alfresco is installed.

-   **[Performing a cold backup](../tasks/backup-cold.md)**  
By default, the `dir.root` contains both the content and indexes. For a cold backup, you can back up just the content and perform a full reindex when a backup is restored. A full reindex can be a time consuming process, so the steps include the indexes in the backup.
-   **[Performing a hot backup](../tasks/backup-hot.md)**  
This section describes the procedure for performing at hot backup.

**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

