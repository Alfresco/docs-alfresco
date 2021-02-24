---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Disposition schedules

Disposition schedules define how records are managed in the Records Management system until their eventual destruction or transfer to another location. The period between a record being completed and becoming part of the File Plan, and being destroyed/transferred is known as its retention period.

A disposition schedule is attached to a record category, and once a file has been completed as a record it's subject to the rules of the disposition schedule that's attached to the category it's in.

A disposition schedule contains one or more steps that define a particular action to be carried out. These actions can be carried out after a period of time, after certain events, or a combination of the two.

The steps that can make up a disposition schedule are:

|Option|Description|
|------|-----------|
|Cut off|This is the first step in a disposition schedule. Once a record is cut off this triggers the records retention period. You can't add records to a folder that's been cut off.|
|Retain|This is an alternative first step that is a 'placeholder' step which delays the next disposition step until after a selected time period or event.|
|Transfer|Records are transferred from one location to another. This can be applicable to both electronic and non-electronic records, and will be used, for example, when transferring records from an organization to an archive.|
|Accession|An advanced form of transfer usually involving the specific legal and physical transfer of records between organizations.|
|Destroy|Electronic records are removed from the Records Management system and destroyed, and non-electronic records must be destroyed.|

**Note:** You can add multiple steps to a disposition schedule, but the first step must be either a Cut off or Retain action, and no steps can be added after the Destroy action.

When a disposition schedule is created you specify whether its instructions are applied at folder or record level.

-   Folder level - you manage the folder through the disposition schedule and all the records it contains are processed as a single entity.
-   Record level - records in a folder are managed individually through the disposition schedule and can be at different stages of the disposition process to other records in the folder.

**Tip:** When a record folder is cut off, this cuts off all individual records in the folder, regardless of their current state.

Disposition steps can be manually completed once they are considered eligible \(the time period has passed and/or the events have been completed\), though the retain and cut off steps can be completed automatically by a system process that is run daily. All other disposition steps must be completed manually, or by setting up a rule to complete them automatically. If a disposition step is complete, then additional options are available for folders or records, dependant on whether the disposition schedule is set to folder or record level, see [Actioning disposition steps](../tasks/rm-dispsched-actions.md).

-   **[Example of a disposition schedule](../references/rm-disp-example.md)**  
Disposition schedules can be set up to account for all different kinds of operational processes.
-   **[Creating a disposition schedule](../tasks/rm-dispschedule-create.md)**  
A disposition schedule is created against and associated with a record category. First you create a summary of the schedule, then the steps in the schedule.
-   **[Creating disposition schedule steps](../tasks/rm-dispschedule-createsteps.md)**  
When you've set up a disposition schedule, you need to add disposition steps. The steps give the disposition schedule it's control over records and folders.
-   **[Editing a disposition schedule](../tasks/rm-dispschedule-edit.md)**  
Once a disposition schedule has been created you can go back and edit it at any point.

**Parent topic:**[Using Records Management](../concepts/rm-intro.md)

