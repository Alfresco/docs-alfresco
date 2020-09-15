---
title: Processing records
---

Retention steps are generally completed manually, though retain and cut off steps can be completed automatically 
by a system process that is run daily. You can also set up a rule to complete steps automatically.

If a retention step is complete (the time period is finished or the required events have been completed), 
then additional options are available for folders or records, dependant on whether the retention schedule 
is set to folder or record level.

If you apply an action to a folder then it will also be applied to all records within the folder.

1. Hover over a folder/record in the File Plan and click the action that is available to move to the next step in the retention schedule.

    |Action|Select this to...|
    |------|-----------------|
    |Cut off|Cuts off the record/folder and triggers the retention period. Records can't be added to a folder that's been cut off.|
    |End Retention|Ends the retention period for the record/folder.|
    |Transfer|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained.By default transferred records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.|
    |Accession|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained.<br><br>This usually involves the specific legal and physical transfer of records between organizations.<br><br>By default accessioned records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.|
    |Destroy|Removes the record/folder content from the Records Management system. If the **Maintain record metadata after destroy** option is selected in the retention schedule, then a visual representation of the record, an audit trail, and metadata is retained in the File Plan.<br><br>If the record was declared from a file in an Alfresco site then the file is also removed.|

    >**Note:** Each time you manually run an action, that option is replaced with the next action step in the retention schedule, and a new option for undoing the step you've just done, for example, **Undo Cut Off**.

    Icons next to the record/folder indicate their current stage in the schedule.

See also video explaining [processing records]({% link ags/latest/using/gs/video-tutorials.md %}#process-a-record).