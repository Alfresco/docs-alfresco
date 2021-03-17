---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Defining the disposition schedule

The disposition schedule must be defined on a record category. The creation of a disposition schedule is a two part process: first create a summary of the schedule, then create the steps in the schedule. You follow the same steps to both create and edit the disposition schedule.

1.  In the File Plan, navigate to a record category.

    The item list doesn't indicate whether or not a record category has a disposition schedule. You need to view the record category details page.

2.  Click **View Details**.

    The record category details page displays. You will see a message indicating there is no disposition schedule, or you will see the disposition schedule summary and steps.

3.  If no disposition schedule exists, click **Create Disposition Schedule**.

4.  In the **General** section, click **Edit**.

5.  Type the summary information for the disposition schedule. All fields are required.

    |Field|Description|
    |-----|-----------|
    |Disposition Authority\*|The legislation that states how the record should be retained and disposed|
    |Disposition Instructions\*|A plain text version of the disposition scheduleThe system does not use this information actively; however, this text is displayed in the record category summary in the File Plan and it is important from a legal perspective.

|
    |Applied to\*|The level the disposition schedule works on: Folder \(default\) or Record

When you select **Folder**, the folder is cut off or transferred as a unit and the operation applies to all the records within the folder. With this setting, you cannot manage records as individual units. If you cut off the folder, all records will be cut off. When you select **Record**, the disposition schedule is set to work on the records and all operations occur at the record level.

|

6.  Click **Save**.

    You return to the details page, which displays a summary of the new or updated disposition schedule.

7.  In the **Disposition Steps** section, click **Edit**.

    The Edit Disposition Schedule page displays.

8.  Define a new or existing disposition schedule by adding, editing, and deleting steps.

    **Note:** The first step in the disposition schedule must be either a Cutoff or Retain action. The last step must be a Destroy action.

    -   To add a step, click **Add Step** and select a disposition action from the menu. Complete the step details to specify when the disposition step should be carried out. Click **Save**.
    -   To edit a step, click the **Edit** icon to the right of the step you want to change. Make the necessary changes and click **Save**.
    -   To delete a step, click the **Delete** icon to the right of the step you want to remove from the schedule. Click **Yes** at the prompt to confirm the deletion.
9.  Click **Done** when the disposition schedule meets your needs.


You return to the details page, which displays the disposition steps. Click **View Description** to the right of a step to display the description.

**Parent topic:**[Disposition schedules](../concepts/rm-dispschedule.md)

