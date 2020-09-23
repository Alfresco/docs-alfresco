---
title: Retension schedule
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

>**Note:** You can add multiple steps to a retention schedule, but the first step must be either a Cut off or Retain action, and no steps can be added after the Destroy action.

When a retention schedule is created you specify whether its instructions are applied at folder or record level.

* Folder level - you manage the folder through the retention schedule and all the records it contains are processed as a single entity.
* Record level - records in a folder are managed individually through the retention schedule and can be at different stages of the retention process to other records in the folder.

>**Tip:** When a record folder is cut off, this cuts off all individual records in the folder, regardless of their current state.

Retention steps can be manually completed once they are considered eligible (the time period has passed and/or the events 
have been completed), though the retain and cut off steps can be completed automatically by a system process that is run daily. 
All other retention steps must be completed manually, or by setting up a rule to complete them automatically. 
If a retention step is complete, then additional options are available for folders or records, dependant on whether the 
retention schedule is set to folder or record level, see [Actioning retention steps]({% link governance-services/latest/starting/users/process-records.md %}).

## Example of a retention schedule

Retention schedules can be set up to account for all different kinds of operational processes.

Here is an example of the steps in a fairly straightforward retention schedule.

Records that are associated with this schedule will be cut off after one month in the File Plan. They will then be retained in the File Plan for two years or until they're no longer needed, whichever comes first. At that point they will then be destroyed.

![Retention Schedule example]({% link governance-services/images/schedule-example.png %})

## Creating a retention schedule

{% include governance-services/create-schedule.md %}

## Creating retention schedule steps

{% include governance-services/create-schedule-steps.md %}

## Editing a retention schedule

Once a retention schedule has been created you can go back and edit it at any point.

1. Hover over a record category in the File Plan and click **View Details**.

    The category details page displays and if the category already has a retention schedule then you'll see the schedule summary and steps.

2. In the General section click **Edit** to edit the basic details, or click **Edit** in the Retention Steps section to edit, add, or delete steps.

3. When you've finished click **Done**.
