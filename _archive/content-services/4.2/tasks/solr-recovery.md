---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Restoring Solr Indexes

This section describes the process for restoring the Solr indexes.

During the recovery process, Solr queries Alfresco to update the indexes restored from a backup. To restore Solr indexes, use the following steps:

1.  Stop the Solr server.

2.  Copy a backup index to the data directory \($\{data.dir.root\}/$\{data.dir.store\}\) for each core.

    Remember to use a backup created from the same Alfresco instance.

3.  Restart the Solr server. Solr will start to track the indexes based on the state of the restored index.


**Parent topic:**[Solr index backup and restore](../concepts/solr-backup-recovery.md)

