---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Backing up the file system

This section describes the process for backing up the file system.

1.  Backup the following subdirectories of the Alfresco dir.root directory using whatever tools you are comfortable with \(`rsync`, `xcopy`\):

    -   contentstore
    -   contentstore.deleted
    -   audit.contentstore
    -   backup-lucene-indexes
    **Note:** Do not attempt to backup the lucene-indexes subdirectory while Alfresco is running. This will cause Lucene index corruption. Use backup-lucene-indexes instead.


**Parent topic:**[Performing a hot backup](../tasks/backup-hot.md)

