---
title: Backing up Solr shards
---
To avoid any data loss, you can make backups of one or all the sharded Solr indexes.

Trigger a backup with an `HTTP` command which instructs the `/replication` handler to backup the Solr shards, for example:

```http
curl http://solrshard20xbm.alfresco.com:9000/solr/<CORE_NAME>/replication?command=backup
\&location=/mnt/solrBackup\&numberToKeep=1
```

where:

`<CORE_NAME>` specifies the name of the core you are working with.

`location` specifies the path where the backup will be created. If the path is not absolute then the backup path will be relative to Solr's instance directory.

`numberToKeep` specifies the number of backups to keep.

### Backup status

The backup operation can be monitored to see if it has completed by sending the `details` command to the `/replication` handler, for example:

```http
http://solrshard20xbm.alfresco.com:9000/alfresco-search-backups/<CORE_NAME>/replication?command=details
```
