---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: back up restore Lucene index
---

# Backing up and restoring Lucene indexes

This section describes how to back up and restore the Lucene indexes.

Lucene is a text search engine library written entirely in Java. It is used within Alfresco for full-text search.

-   **[Changing the scheduled Lucene back up time](../tasks/luceneindex-backup.md)**  
This section describes how to set the time that the scheduled backup of the Lucene indexes occurs.
-   **[Specifying the Lucene backup directory](../tasks/lucenedir-backup.md)**  
This section describes how to specify the Lucene backup directory.
-   **[Restoring the Lucene indexes](../tasks/restore-lucene-indexes.md)**  
In addition to full restorations, you can also use the backup sets created through either the cold or hot backup procedures to restore just the Lucene indexes. This is useful where the repository itself does not need to be restored but for some reason the Lucene indexes are stale and rebuilding them from scratch is undesirable.

**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

