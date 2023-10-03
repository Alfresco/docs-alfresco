---
title: Retention schedule
---

Retention schedules define how records are managed in the Records Management system until their eventual destruction 
or transfer to another location. The period between a record being completed and becoming part of the {% include tooltip.html word="fileplan" text="File Plan" %}, 
and being destroyed/transferred is known as its retention period.

A retention schedule is attached to a record {% include tooltip.html word="category" text="category" %}, and once a file has been completed as a record it's subject to 
the rules of the retention schedule that's attached to the category it's in.

A retention schedule contains one or more steps that define a particular action to be carried out. 
These actions can be carried out after a period of time, after certain events, or a combination of the two.

The steps that can make up a retention schedule are:

|Option|Description|
|------|-----------|
|Cut off|This is the first step in a retention schedule. Once a record is cut off this triggers the records retention period. You can't add records to a folder that's been cut off.|
|Retain|This is an alternative first step that is a 'placeholder' step which delays the next retention step until after a selected time period or event.|
|Transfer|Records are transferred from one location to another. This can be applicable to both electronic and non-electronic records, and will be used, for example, when transferring records from an organization to an archive.|
|Accession|An advanced form of transfer usually involving the specific legal and physical transfer of records between organizations.|
|Destroy|Electronic records are removed from the Records Management system and destroyed, and non-electronic records must be destroyed.|

> **Note:** You can add multiple steps to a retention schedule, but the first step must be either a Cut off or Retain action, and no steps can be added after the Destroy action.

When a retention schedule is created you specify whether its instructions are applied at folder or record level.

* Folder level - you manage the folder through the retention schedule and all the records it contains are processed as a single entity.
* Record level - records in a folder are managed individually through the retention schedule and can be at different stages of the retention process to other records in the folder.

> **Tip:** When a record folder is cut off, this cuts off all individual records in the folder, regardless of their current state.

Retention steps can be manually completed once they are considered eligible (the time period has passed and/or the events 
have been completed), though the retain and cut off steps can be completed automatically by a system process that is run daily. 
All other retention steps must be completed manually, or by setting up a rule to complete them automatically. 
If a retention step is complete, then additional options are available for folders or records, dependant on whether the 
retention schedule is set to folder or record level, see [Actioning retention steps]({% link governance-services/7.3/using/manage-fileplan.md %}#processing-records).

## Example of a retention schedule

Retention schedules can be set up to account for all different kinds of operational processes.

Here is an example of the steps in a fairly straightforward retention schedule.

Records that are associated with this schedule will be cut off after one month in the File Plan. They will then be retained in the File Plan for two years or until they're no longer needed, whichever comes first. At that point they will then be destroyed.

![Retention Schedule example]({% link governance-services/images/schedule-example.png %})

## Creating a retention schedule

A retention schedule is created against and associated with a record {% include tooltip.html word="category" text="category" %}. First you create a summary of the schedule, then the steps in the schedule.

1. Hover over a record category in the {% include tooltip.html word="fileplan" text="File Plan" %} and click **View Details**.

    The **Category Details** page displays and if the category already has a retention schedule then you'll see the schedule summary and steps.

2. Click **Create Retention Schedule**.

3. In the **General** section, click **Edit**.

4. Complete all fields:

    |Field|Description|
    |-----|-----------|
    |Retention Authority|The authority that states how the record should be retained and disposed, for example *Sarbanes-Oxley Act (SOX)* or *Corporate procedures*.|
    |Retention Instructions|A summary of the retention schedule.This information is not actively used but this text is displayed in the record category summary in the File Plan, and is important from a legal perspective.|
    |Applied to|**Record Folder**: the retention schedule is applied to folders and all operations occur at the folder level. With this setting, you cannot manage records as individual units. If you {% include tooltip.html word="cutoff" text="cut off" %} the folder, all records will be cut off. <br><br> **Record**: the retention schedule is applied to records and all operations occur at the record level.|

    > **Note:** If you add folders to a category before setting up the retention schedule, then you can only select **Record Folder**.

5. Click **Save**.

    The category details page now displays a summary of the new or updated retention schedule.

Next you need to add steps to the retention schedule.

See also video explaining [creating a retention schedule]({% link governance-services/7.3/tutorial/governance-services/index.md %}#create-a-retention-schedule).

## Creating retention schedule steps

When you've set up a retention schedule, you need to add retention steps. The steps give the retention schedule 
it's control over records and folders.

1. Hover over a record {% include tooltip.html word="category" text="category" %} in the {% include tooltip.html word="fileplan" text="File Plan" %} and click **View Details**.

    The **Category Details** page displays showing the retention schedule summary.

2. In the **Retention Steps** section, click **Edit**.

    The **Edit Retention Schedule** page displays.

3. Click **Add Step** and select a retention action.

    |Option|Description|
    |------|-----------|
    |Cut off|This is the first step in a retention schedule. Once a record is cut off this triggers the records retention period. You can't add records to a folder that's been cut off.|
    |Retain|This is an alternative first step that is a 'placeholder' step which delays the next retention step until after a selected time period or event.|
    |Transfer|Records are transferred from one location to another. This can be applicable to both electronic and non-{% include tooltip.html word="electronicrecord" text="electronic records" %}, and will be used, for example, when transferring records from an organization to an archive.|
    |Accession|An advanced form of {% include tooltip.html word="transfer" text="transfer" %} usually involving the specific legal and physical transfer of records between organizations.|
    |Destroy|Electronic records are removed from the Records Management system and destroyed, and non-electronic records must be destroyed.|

    > **Note:** You can add multiple steps to a retention schedule, but the first step must be either a Cut off or Retain action, and no steps can be added after the Destroy action.

4. Select whether the action will be triggered after a period of time or when a specified {% include tooltip.html word="events" text="event" %} occurs:

    |Option|Description|
    |------|-----------|
    |After a period of|Select the time period after which the step action will take place.<br><br> **Note:** If you select XML Duration from the Period Type drop down list you can specify a time interval using XML syntax.<br><br>The syntax should take the form of:<br><br>P = Period (required)<br><br>nY = Number of years<br><br>nM = Number of months<br><br>nD = Number of days<br><br>T = Start time of a time section (required if specifying hours, minutes, or seconds)<br><br>nH = Number of hours<br><br>nM = Number of minutes<br><br>nS = Number of seconds<br><br>For example, 'P2M10D' represents two months and ten days.<br><br>Created Date = The date when the file or record is first added to Alfresco.<br><br>Retention Action = The date when the last retention action took place. Don't select this for the first step in the schedule.<br><br>The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start of your system-configured financial year. See [Customizing the end of the financial year]({% link governance-services/7.3/config/index.md %}#customize-end-of-year).|
    |When event happens|Select the event after which the step action will take place.<br><br>Most events must be completed manually in the record details page, or you can use rules to automatically complete these events.<br><br>The Obsolete, Superseded, and Related Record Transferred To Inactive Storage events are automatically completed when [relevant relationships are set up between records]({% link governance-services/7.3/using/manage-fileplan.md %}#creating-relationships-between-records).|

    > **Note:** You can select both options, or multiple events, and have the action triggered by **Whichever event is earlier** or **When all events have happened**.

    The date selected here is displayed as the **Retention as of date** in the details page for records or folders, depending on which the retention applies to. If you select an event then this field will display *None*, and you should complete the event on the details page.

5. If you added a Destroy step then there is an additional **Keep record metadata after record destruction** option. If you select this option then destroyed records are still represented in the File Plan rather than being completely deleted. An audit trail and metadata remain but the records can't be accessed.

    > **Note:** The metadata is maintained indefinitely unless it is manually deleted from the File Plan by someone with the ALFRESCO\_ADMINISTRATOR role, or another role that has been given permissions to delete the metadata.

6. Enter a **Step Description**.

7. Click **Save**.

    > **Tip:** You can click the ![Edit icon]({% link governance-services/images/ico-configure.png %}){:height="18px" width="18px"} edit icon or ![Delete icon]({% link governance-services/images/ico-delete.png %}){:height="18px" width="18px"} delete icon next to a step to edit or delete it.

8. When you've entered all the required steps click **Done**.


You return to the category details page, which displays the retention steps. Click **View Description** to the right of a step to display the description.

See also video explaining [creating retention schedule steps]({% link governance-services/7.3/tutorial/governance-services/index.md %}#create-retention-schedule-steps).

## Editing a retention schedule

Once a retention schedule has been created you can go back and edit it at any point.

1. Hover over a record category in the File Plan and click **View Details**.

    The category details page displays and if the category already has a retention schedule then you'll see the schedule summary and steps.

2. In the General section click **Edit** to edit the basic details, or click **Edit** in the Retention Steps section to edit, add, or delete steps.

3. When you've finished click **Done**.
