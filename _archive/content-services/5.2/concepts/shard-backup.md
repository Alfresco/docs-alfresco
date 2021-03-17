---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Backing up Solr shards

To avoid any data loss, you can make backups of one or all the sharded Solr indexes.

Trigger a backup with an `HTTP` command which instructs the `/replication` handler to backup the Solr shards, for example:

```
curl http://solrshard20xbm.alfresco.com:9000/solr4/<CORE_NAME>/replication?command=backup
\&location=/mnt/solrContentStoreBackup\&numberToKeep=1
```

where:

`<CORE_NAME>` specifies the name of the core you are working with.

`location` specifies the path where the backup will be created. If the path is not absolute then the backup path will be relative to Solr's instance directory.

`numberToKeep` specifies the number of backups to keep.

**Backup status**

The backup operation can be monitored to see if it has completed by sending the `details` command to the `/replication` handler, for example:

```
http://solrshard20xbm.alfresco.com:9000/solr4/<CORE_NAME>/replication?command=details
```

**Parent topic:**[Solr sharding](../concepts/solr-shard-overview.md)

