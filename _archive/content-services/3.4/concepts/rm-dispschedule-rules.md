---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Disposition schedule rules

This section describes the restrictions on how you can use disposition schedules.

The following rules relate to the disposition schedules:

-   Disposition occurs at either the folder or record level because some disposition schedules do not naturally lend themselves to disposition at the folder level.
-   The records manager specifies whether the disposition actions will occur at the folder or record level for a particular disposition schedule. This is a property on the record category and is set during the creation of the record category.
-   All actions in a disposition schedule, \(cut off, destroy, and transfer\) occur at the folder level, if specified that way. For example, transfer packages up the whole folder.
-   When a folder is cut off, it is automatically closed, however folders can be closed without being cut off.
-   Even when a particular schedule is being managed at the record level, the record folder can still be cut off as a convenience method. This will cut off all the individual records, regardless of their eligibility in relation to the disposition schedule.
-   If disposition is being managed at a record level, other actions are not available at the folder level.
-   The system will gracefully deal with situations where a record is multi-filed in different record categories, which may have disposal schedules managed at different levels.

**Parent topic:**[Disposition schedules](../concepts/rm-dispschedule.md)

