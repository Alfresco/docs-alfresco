---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Performing a hot backup

This section describes the procedure for performing at hot backup.

The high-level procedure for a hot backup is:

1.  Back up Lucene.
2.  Back up SQL.
3.  Back up files.

Lucene indexes have to be backed up first and before SQL because if new rows are added in SQL after the lucene backup is done, a lucene reindex \(AUTO\) can regenerate the missing Lucene indexes from the SQL transaction data.

SQL has to be done before backing up the files because if you have a SQL node pointing to a missing file, then that node will be orphan. Also, if you have a file without SQL node data, this just means that the user has added the file too late to be included in a backup.

It is critical to perform hot backups in the following order of steps:

1.  Ensure that you have a backup-lucene-indexes directory under dir.root.

2.  Backup the database Alfresco is configured to use, using your database vendor's backup tools

3.  As soon as the database backup completes, backup specific subdirectories in the file system Alfresco dir.root

4.  Store both the database and Alfresco dir.root backups together as a single unit.

    For example, store the backups in the same directory or in a single compressed file. Do not store the database and `dir.root` backups independently, as that makes it difficult to reconstruct a valid backup set, if restoration becomes necessary.

5.  Store both the database and `dir.root` backups together as a single unit.

    **Note:** Ensure that the cron generated in the backup-lucene-indexes does not run while you do the SQL backup. The backup-lucene-indexes generation should be finished when you start the SQL backup.


Alfresco includes a background job responsible for backing up the Lucene indexes that \(by default\) is configured to run at 3am each night. The hot backup process must not run concurrently with this background job, so you should either ensure that the hot backup completes by 3am, or wait until the index backup job has completed before initiating a hot backup.

-   **[Refreshing the backup Lucene indexes \(optional\)](../tasks/backup-hot-refreshlucene.md)**  
This is an optional step before initiating a hot backup.
-   **[Backing up the database](../tasks/backup-hot-database.md)**  
In an Alfresco system, the ability to support hot backup is dependent on the hot backup capabilities of the database product Alfresco is configured to use.
-   **[Backing up the file system](../tasks/backup-hot-filesystem.md)**  
This section describes the process for backing up the file system.

**Parent topic:**[Backing up and restoring the repository](../concepts/backup-intro.md)

