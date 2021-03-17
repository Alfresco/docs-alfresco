---
author: Alfresco Documentation
source: 
audience: [, , , ]
category: User Help
option: Records Management
---

# Processing records

Disposition steps are generally completed manually, though retain and cut off steps can be completed automatically by a system process that is run daily. You can also set up a rule to complete steps automatically.

If a disposition step is complete \(the time period is finished or the required events have been completed\), then additional options are available for folders or records, dependant on whether the disposition schedule is set to folder or record level.

If you apply an action to a folder then it will also be applied to all records within the folder.

1.  Hover over a folder/record in the File Plan and click the action that is available to move to the next step in the disposition schedule.

    |Action|Select this to...|
    |------|-----------------|
    |Cut off|Cuts off the record/folder and triggers the retention period. Records can't be added to a folder that's been cut off.|
    |End Retention|Ends the retention period for the record/folder.|
    |Transfer|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained.By default transferred records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.

|
    |Accession|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained. This usually involves the specific legal and physical transfer of records between organizations.

By default accessioned records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.

|
    |Destroy|Removes the record/folder content from the Records Management system. If the **Maintain record metadata after destroy** option is selected in the disposition schedule, then a visual representation of the record, an audit trail, and metadata is retained in the File Plan.If the record was declared from a file in an Alfresco site then the file is also removed.

|

    **Note:** Each time you manually run an action, that option is replaced with the next action step in the disposition schedule, and a new option for undoing the step you've just done, for example, **Undo cut off**.

    Icons next to the record/folder indicate their current stage in the schedule.


  

**Parent topic:**[QuickStart for Records Management Users](../concepts/rm-gs-users.md)

**Parent topic:**[Managing record folders](../tasks/rm-recordfolder-manage.md)

**Parent topic:**[Managing records](../tasks/rm-records-manage.md)

