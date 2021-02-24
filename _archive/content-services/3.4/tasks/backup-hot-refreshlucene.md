---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Refreshing the backup Lucene indexes \(optional\)

This is an optional step before initiating a hot backup.

1.  Trigger a Lucene index backup using JMX, and it can be done several ways, including using:

    The backup can be done in several ways, including:

    -   VisualVM
    -   JConsole \(MBeans tab -gt Alfresco/Schedule/DEFAULT/MonitoredCronTrigger/indexBackupTrigger/Operations - **executeNow** button\)
    -   Command line
    **Note:** During the creation of the backup Lucene indexes, the system is placed in read-only mode, which could last several minutes depending on the size of the Lucene indexes.

2.  After completing this operation, the backup-lucene-indexes directory contains an up-to-date cold copy of the Lucene indexes, ready to be backed up.


**Parent topic:**[Performing a hot backup](../tasks/backup-hot.md)

