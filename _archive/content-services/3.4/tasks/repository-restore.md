---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: repository restore
---

# Restoring the repository

This task describes how to restore the Alfresco repository.

1.  Stop the Alfresco server.

2.  Copy the existing `dir.root` to a temporary location.

3.  Restore the `dir.root` that you previously backed up.

    If you are restoring from a hot backup, rename <dir.root\>/backup-lucene-indexes to <dir.root\>/lucene-indexes.

4.  Restore the database from the database backups.

5.  Start the Alfresco server.


**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

