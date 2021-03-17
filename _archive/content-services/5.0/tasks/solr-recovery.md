---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Restoring Solr 4 indexes

This section describes the process for restoring the Solr 4 indexes.

During the recovery process, Solr 4 queries Alfresco to update the indexes restored from a backup. To restore the Solr 4 indexes, use the following steps:

1.  Stop the Solr 4 server.

2.  Copy a backup index to the data directory \($\{data.dir.root\}/$\{data.dir.store\}\) for each core.

    Remember to use a backup created from the same Alfresco instance.

3.  Restart the Solr 4 server.

    Solr 4 will start to track the indexes based on the state of the restored index.


**Parent topic:**[Solr 4 backup and restore](../concepts/solr-backup-recovery.md)

