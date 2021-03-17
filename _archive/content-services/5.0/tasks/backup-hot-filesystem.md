---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Backing up the file system

This section describes the process for backing up the file system.

Backup the following subdirectories of the Alfresco dir.root directory using whatever tools you are comfortable with \(`rsync`, `xcopy`\):

-   contentstore
-   contentstore.deleted \(optional\)
-   solr4Backup

**Note:** Do not attempt to backup the solr4/index subdirectory while Alfresco is running. This will cause Solr 4 index corruption. Use solr4Backup instead.

**Parent topic:**[Performing a hot backup](../tasks/backup-hot.md)

