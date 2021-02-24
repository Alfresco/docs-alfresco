---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: cold backup
---

# Performing a cold backup

Follow these steps when performing a cold backup.

By default, the `dir.root` contains both the contentstore and indexes. For a cold backup, back up the database and the content, and perform a full reindex when a backup is restored. A full reindex can be a time consuming process, so these steps include the indexes in the backup, removing the need to perform a reindex.

1.  Stop Alfresco.

2.  Back up the database Alfresco is configured to use, using your database vendor's backup tools.

3.  In parallel, backup the `dir.root` directory \(only the contentstore and contentstore.deleted directories\).

    Backing up the contentstore.deleted directory is optional.

4.  Store both the database and `dir.root` backups together as a single unit.

    For example, store the backups in the same directory or compressed file.

5.  Start Alfresco.


**Parent topic:**[Backing up and restoring the repository](../concepts/backup-intro.md)

