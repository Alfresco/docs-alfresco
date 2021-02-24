---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Creating disposition schedules

The disposition schedule must be defined at a record category level. The procedure for creating a disposition schedule is a two part process. The first part is to create a summary of the schedule; the second part is to create the steps in the schedule.

1.  In the File Plan, navigate to a category.

    The disposition instructions display on the category summary.

2.  Click **View Details**.

    The record category details page displays. The disposition schedule summary shows the **General** information and the **Disposition Steps**.

3.  In the **General** section, click **Edit**.

4.  Type the summary information for the disposition schedule.

    |General information|Description|
    |-------------------|-----------|
    |Disposition Authority|The legislation which states how the record should be retained and disposed.|
    |Disposition Instructions|A plain text version of the disposition schedule. The system does not using this information actively; however this text is displayed in the record category summary in the File Plan and it is important from a legal perspective.|
    |Applied to|The folder is cut off or transferred as a unit and the operation applies to all the records within the folder. With this setting, you cannot manage records as individual units. If you cut off the folder, all records will be cut off. If you select **Record**, the disposition schedule is set to work on the records and all operations occur at the record level.

The default is **Folder**.

|

5.  In the **Disposition Steps** section, click **Edit**.

    The Edit Disposition Schedule page displays, showing the disposition steps.

6.  Click **Add Step** to add a disposition step.

    A menu displays with available actions.

7.  Select **Cutoff**.

    The Cutoff action is the first step in a disposition schedule.

8.  Enter the details of the step in the following fields.

    An asterisk next to the name indicates that the filed is mandatory and you must enter text or a value in the field.

    1.  In the **After a period of** field, select the checkbox and enter a value.

    2.  Select the period.

        -   End of Quarter
        -   Year
        -   Quarter
        -   Day
        -   End of Month
        -   None
        -   Immediately
        -   End of Financial Month
        -   End of Year
        -   End of Financial Year
        -   Week
        -   XML Duration
        -   End of Financial Quarter
        -   Quarter
        -   Month
    3.  In the **When event occurs** field, select the checkbox to use an event as the trigger for the step.

    4.  Select the event type from the list:

        -   Abolished
        -   All allowances granted are terminated
        -   Case closed
        -   Case complete
        -   No longer needed
        -   Obsolete
        -   Redesignated
        -   Related record transferred to inactive storage
        -   Separation
        -   Study complete
        -   Superseded
        -   Training complete
        -   WGI action complete
        -   Define the order of the events
        -   When all events have occurred
        -   Which ever event is earlier
    5.  In the **Step Description** field, enter a description of the step.

9.  Click **Save** to save the step.

10. Click **Add Steps** to add further steps to the disposition schedule.

    The last step must be a **Destroy** action.

11. Click **Done** when you have finished adding steps.


The steps appear in the Disposition Schedule on the category details page.

**Parent topic:**[Disposition schedules](../concepts/rm-dispschedule.md)

