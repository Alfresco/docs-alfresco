---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: restore Lucene index
---

# Restoring the Lucene indexes

In addition to full restorations, you can also use the backup sets created through either the cold or hot backup procedures to restore just the Lucene indexes. This is useful where the repository itself does not need to be restored but for some reason the Lucene indexes are stale and rebuilding them from scratch is undesirable.

1.  Stop the Alfresco server.

2.  Move the existing `dir.root/lucene-indexes` directory to another location.

3.  Perform the following, depending on whether you are doing a hot or cold backup:

    -   For cold backups, restore `dir.root/lucene-indexes` from the most recent backup step.
    -   For hot backups, restore `dir.root/backup-lucene-indexes` from the most recent backup step and rename it to `dir.root/lucene-indexes`.
4.  Restart the Alfresco server.

    Upon restarting, Alfresco will detect that the indexes are stale, and incrementally reindex just the content that has changed since the last backup. As the size of your content set grows, the time savings from performing incremental reindexing rather than full reindexing will become greater and greater. Incremental reindexing is typically measured in minutes, whereas full reindexing can take hours for large content sets.

    **Important:** For incremental reindexing to occur properly, set the `index.recovery.mode` property to `AUTO` to ensure that the restored Lucene indexes are incrementally built with any newer transactions in the database and contentstore. Setting this property to `FULL` forces a full reindex, even if incremental reindexing is possible, negating any benefits from this procedure. If a full rebuild is required, it is quicker to delete the existing index.

    **Note:** When running Alfresco with Solr as the default search subsystem, you need to change the `index.recovery.mode` property to `AUTO` before switching to Lucene subsystem for creating Lucene indexes.


**Parent topic:**[Lucene index backup and restore](../concepts/backup-lucene-intro.md)

