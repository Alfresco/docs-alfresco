---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Performing a hot backup

Follow these steps when performing a hot backup.

The high-level procedure and order for a hot backup is:

1.  Backup the Solr 4 indexes first
2.  Then backup the database
3.  Finally backup the contentstore

Solr 4 indexes have to be backed up first and before the database because if new rows are added in the database after the Solr 4 backup is done, a Solr 4 reindex \(AUTO\) can regenerate the missing Solr 4 indexes from the database transaction data.

Database backup should be done before backing up the contentstore because if your database points to a missing file, then you will not be able to retrieve content for that node. Also, if you have a file without the database data, this just means that the user has added the file too late to be included in a backup and the file will be orphaned.

It is critical to perform hot backups in the following order of steps:

1.  Ensure that you have a solr4Backup directory under dir.root.

2.  Backup the database Alfresco is configured to use, using your database vendor's backup tools.

3.  As soon as the database backup completes, backup the specific subdirectories in dir.root.

4.  Store both the database and dir.root backups together as a single unit.

    For example, store the backups in the same directory or in a single compressed file. Do not store the database and `dir.root` backups independently, as that makes it difficult to reconstruct a valid backup set, if restoration becomes necessary.

    **Note:** By default, the Solr 4 indexes are backed up according to the cron job specified by the `solr.backup.alfresco.cronExpression` and `solr.backup.archive.cronExpression` properties, which can be set in alfresco-global.properties. By default, the cron job is run at 2 am for alfrescoCore and 4 am for archiveCore. You must ensure that the indexes are not backup up while these jobs are running.


Alfresco includes a background job responsible for backing up the Solr 4 indexes that \(by default\) is configured to run at 3am each night. The hot backup process must not run concurrently with this background job, so you should either ensure that the hot backup completes by 3am, or wait until the index backup job has completed before initiating a hot backup.

For more information on backing up Solr 4 indexes, see [Solr 4 backup and restore](../concepts/solr-backup-recovery.md).

-   **[Backing up the database](../concepts/backup-hot-database.md)**  
In an Alfresco system, the ability to support hot backup is dependent on the hot backup capabilities of the database product Alfresco is configured to use.
-   **[Backing up the file system](../concepts/backup-hot-filesystem.md)**  
Follow these guidelines when backing up the file system.

**Parent topic:**[Backing up and restoring the repository](../concepts/backup-intro.md)

