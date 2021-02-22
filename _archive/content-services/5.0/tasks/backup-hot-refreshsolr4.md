---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Refreshing the backup Solr 4 indexes \(optional\)

This is an optional step before initiating a hot backup.

1.  Trigger a Solr 4 index backup using a JMX client.

    JConsole \(MBeans tab -gt Alfresco/Schedule/DEFAULT/MonitoredCronTrigger/indexBackupTrigger/Operations - **executeNow** button\)

2.  After completing this operation, the solr4Backup directory contains an up-to-date cold copy of the Solr 4 indexes, ready to be backed up.


**Parent topic:**[Solr 4 backup and restore](../concepts/solr-backup-recovery.md)

