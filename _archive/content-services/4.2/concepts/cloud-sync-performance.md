---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Enterprise to Cloud Sync performance

Enterprise to Cloud Sync does not have any specific limits. However, some usage patterns might affect perceived performance and also impact usability due to potentially conflicting actions.

For example, selecting one or more large binary documents within a sync set or selecting a folder containing many items sub-folders could result in degraded performance.

Because sync changes are processed in batches for each sync set, and there is no limit on the number of members of a sync set, sync failures could arise due to the time taken to process such a set. In general, nothing prevents other users \(or even the same user\) making additional changes during that time and these changes will get added to the pending queue in the sync audit log. This may cause subsequent \(expected\) sync failures, for example, the parent folder no longer exists if it has been deleted or moved out of a sync set.

**Parent topic:**[Supported Use Cases for Enterprise to Cloud Sync](../concepts/cloud-sync-supported-use-cases.md)

