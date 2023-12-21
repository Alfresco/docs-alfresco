---
title: Back up and restore
---

This information describes the process for backing up the content repository only. It assumes that components other than the data residing in Content Services (operating system, database, JRE, application server, binaries and configuration, etc.) are being backed up independently.

Your backup strategy must be tested end-to-end, including restoration of backups. Ensure that you've adequately tested your backup scripts prior to deploying Content Services to production.

## Back up and restore repository

Backing up a repository involves backing up the directory pointed to by the `dir.root` setting, the database that Content Services is configured to use, and the Solr indexes.

For backing up the Solr indexes using the Alfresco Share Admin Console or the `alfresco-global.properties` file, or JConsole, see [Backing up Search Services]({% link search-services/latest/admin/index.md %}).

To restore the backup successfully, the `contentstore` directory and database must be backed up as a set. When you restore an Alfresco backup, you must restore both the Alfresco database and the `dir.root` directory (`contentstore` directory) from the same backup set. Otherwise, the repository may be corrupted.

The `dir.root` directory is defined in the `alfresco-global.properties` file. By default, this directory is named `alf_data` and is located within the directory where Content Services is installed.

> **CAUTION:**
>
> In a clustered environment, when the cloned nodes are restarted with a cluster license, the nodes may try to join the existing production cluster and point to a cloned database instead of the production cluster database. This can lead to corrupted data.
>
> **Cause**: It occurs because the cloned node contains the cluster id from production and tries to join that cluster.
>
> **Solution**: To avoid the problem you should ensure any cloned nodes required for upgrade testing are network isolated from the production nodes.

### Perform cold backup

Follow these steps when performing a cold backup.

By default, the `dir.root` contains both the `contentstore` and indexes. For a cold backup, back up the database and the content, and perform a full reindex when a backup is restored. A full reindex can be a time consuming process, so these steps include the indexes in the backup, removing the need to perform a reindex.

1. Stop Content Services.

2. Back up the database Content Services is configured to use, using your database vendor's backup tools.

3. In parallel, backup the `dir.root` directory (only the `contentstore` and `contentstore.deleted` directories).

    Backing up the `contentstore.deleted` directory is optional.

4. Store both the database and `dir.root` backups together as a single unit.

    For example, store the backups in the same directory or compressed file.

5. Start Content Services.

### Perform hot backup

Follow these steps when performing a hot backup.

The high-level procedure and order for a hot backup is:

1. Backup the Solr 6 indexes first.
2. Then backup the database.
3. Finally backup the `contentstore`.

Solr 6 indexes have to be backed up first and before the database because if new rows are added in the database after the Solr 6 backup is done, a Solr 6 reindex (AUTO) can regenerate the missing Solr 6 indexes from the database transaction data.

Database backup should be done before backing up the `contentstore` because if your database points to a missing file, then you'll not be able to retrieve content for that node. Also, if you have a file without the database data, this just means that the user has added the file too late to be included in a backup and the file will be orphaned.

It is critical to perform hot backups in the following order:

1. Ensure that you have a `solr6Backup` directory under `dir.root`.

2. Backup the database Content Services is configured to use, using your database vendor's backup tools.

3. As soon as the database backup completes, backup the specific subdirectories in `dir.root`.

4. Store both the database and `dir.root` backups together as a single unit.

    For example, store the backups in the same directory or in a single compressed file. Do not store the database and `dir.root` backups independently, as that makes it difficult to reconstruct a valid backup set, if restoration becomes necessary.

    > **Note:** By default, the Solr 6 indexes are backed up according to the cron job specified by the `solr.backup.alfresco.cronExpression` and `solr.backup.archive.cronExpression` properties, which can be set in `alfresco-global.properties`. By default, the cron job is run at 2 am for `alfrescoCore` and 4 am for `archiveCore`. You must ensure that the indexes are not backup up while these jobs are running.

Content Services includes a background job responsible for backing up the Solr 6 indexes that (by default) is configured to run at 3am each night. The hot backup process must not run concurrently with this background job, so you should either ensure that the hot backup completes by 3am, or wait until the index backup job has completed before initiating a hot backup.

For more information on backing up Solr 6 indexes, see [Backing up Search Services]({% link search-services/latest/admin/index.md %}).

#### Back up database

In a Content Services system, the ability to support hot backup is dependent on the hot backup capabilities of the database product it's configured to use.

Database hot backup requires a tool that can snapshot a consistent version of the Content Services database (that is, it must capture a transactionally-consistent copy of all the tables in the database). In addition, to avoid serious performance problems in the running the system while the backup is in progress, this snapshot operation should either operate without locking in the database or it should complete quickly (within seconds).

Backup capabilities vary widely between relational database products, and you should ensure that any backup procedures
that are instituted are validated by a qualified, experienced database administrator before being put into a production environment.

#### Back up file system

Follow these steps when backing up the file system.

Backup the following subdirectories of the Content Services `dir.root` directory using whatever tools you're comfortable with (`rsync`, `xcopy`):

* `contentstore`
* `contentstore.deleted` (optional)
* `solr6Backup`

> **Note:** Do not attempt to backup the solr6/index subdirectory while Content Services is running. This will cause Solr index corruption. Use `solr6Backup` instead.
