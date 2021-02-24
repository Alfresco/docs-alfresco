---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: cold backup
---

# Performing a cold backup

By default, the `dir.root` contains both the content and indexes. For a cold backup, you can back up just the content and perform a full reindex when a backup is restored. A full reindex can be a time consuming process, so the steps include the indexes in the backup.

1.  Stop Alfresco.

2.  Back up the database Alfresco is configured to use, using your database vendor's backup tools.

3.  In parallel, back up the `dir.root` directory in its entirety.

4.  Store both the database and `dir.root` backups together as a single unit.

    For example, store the backups in the same directory or compressed file.

5.  Start Alfresco.


**Parent topic:**[Backing up and restoring the repository](../concepts/backup-intro.md)

