---
author: Alfresco Documentation
source: 
audience: [, , ]
category: User Help
option: Records Management
---

# Creating disposition schedule steps

When you've set up a disposition schedule, you need to add disposition steps. The steps give the disposition schedule it's control over records and folders.

1.  Hover over a record category in the File Plan and click **View Details**.

    The category details page displays showing the disposition schedule summary.

2.  In the **Disposition Steps** section, click **Edit**.

    The Edit Disposition Schedule page displays.

3.  Click **Add Step** and select a disposition action.

    |Option|Description|
    |------|-----------|
    |Cutoff|This is the first step in a disposition schedule. Once a record is cutoff this triggers the records retention period. You can't add records to a folder that's been cutoff.|
    |Retain|This is an alternative first step that is a 'placeholder' step which delays the next disposition step until after a selected time period or event.|
    |Transfer|Records are transferred from one location to another. This can be applicable to both electronic and non-electronic records, and will be used, for example, when transferring records from an organization to an archive.|
    |Accession|An advanced form of transfer usually involving the specific legal and physical transfer of records between organizations.|
    |Destroy|Electronic records are removed from the Records Management system destroyed, and non-electronic records must be destroyed.|

    **Note:** You can add multiple steps to a disposition schedule, but the first step must be either a Cutoff or Retain action, and no steps can be added after the Destroy action.

4.  Select whether the action will be triggered after a period of time or when a specified event occurs:

    |Option|Description|
    |------|-----------|
    |After a period of|Select the time period after which the step action will take place.Created Date = The date when the record was first declared

Disposition Action = The date when the last disposition action took place

The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start of your system-configured financial year.|
    |When event occurs|Select the event after which the step action will take place. Most events must be completed manually in the record details page, or you can use rules to automatically complete these events.

The Obsolete, Superseded, and Related Record Transferred To Inactive Storage events are automatically completed when [relevant references are set up between records](rm-records-manage-reference.md).

|

    **Note:** You can select both options, or multiple events, and have the action triggered by **Whichever event is earlier** or **When all events have occurred**.

    The date selected here is displayed as the **Disposition as of date** in the details page for records or folders, depending on which the disposition applies to. If you select an event then this field will display *None*, and you should complete the event on the details page.

5.  Enter a **Step Description**.

6.  Click **Save**.

    **Tip:** You can click the ![Edit icon](../images/ico-configure.png) edit icon or ![Delete icon](../images/ico-delete.png) delete icon next to a step to edit or delete it.

7.  When you've entered all the required steps click **Done**.


You return to the category details page, which displays the disposition steps. Click **View Description** to the right of a step to display the description.

  

**Parent topic:**[Disposition schedules](../concepts/rm-dispschedule.md)

**Parent topic:**[QuickStart for Records Managers](../concepts/rm-gs-managers.md)

