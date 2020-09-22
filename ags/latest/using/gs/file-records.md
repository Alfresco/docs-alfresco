---
title: Filing records
---

Filing records is the process of classifying records and putting them into the correct location in the {% include tooltip.html word="fileplan" text="File Plan" %}.

There are three ways that you can create records:

* Create a record by uploading files
* Create a non-electronic record that references a physical record such as a paper record or microfilm
* Select an item in another Alfresco site (non-Records Management) and declare it as a record

>**Note:** You can also import folders, {% include tooltip.html word="category" text="categories" %}, and even entire File Plans, and any records that they contain, see [Exporting and importing File Plan content]({% link ags/latest/using/gs/manage-fileplan.md %}#exporting-and-importing-file-plan-content).

Your Alfresco administrator can also set up your system so that emails to specified addresses are captured and stored 
as records.

A record is not considered to be complete until all the required metadata has been added to it. 
You select **Edit Metadata** to complete required metadata.

In {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites you can also select to **Add Record Metadata** and associate 
the file with a record type, so that when you edit metadata there is type-specific metadata to add.

Once that's done you can select to **Complete Record** and it will be subject to the retention rules that apply to 
the folder you've placed it in.

>**Note:** When you set up a record category or folder you can specify that it will be used to hold **Vital Records**. A vital record must be reviewed on a periodic basis, as defined on the record category or folder.

## Filing an electronic record

{% include ags/filing-record.md %}

## Filing a non-electronic record

Non-electronic records might be paper files that can be stored in a physical location. Filing a non-electronic record in the File Plan means the file can be traced and details of where it is physically stored can be recorded.

1. In the record folder where you want to file a record click **File**.

2. Click **Non-electronic**.

3. Enter details for the file you are making a record of.

    Only the Name and Title are required, but you should enter enough information so that the record will be recognized by other users.

4. Click **Save**.

    A new record is created and displays in the File Plan as an incomplete record. You need to make sure any required metadata is added before you can set records to complete.

## Filing an unfiled record

{% include ags/filing-unfiled-record.md %}

## Adding record metadata

{% include ags/add-record-metadata.md %}

## Editing record metadata

{% include ags/edit-record-metadata.md %}

## Requesting record information

If you need additional information to complete a record, you can request this from other users.

1. Hover over a record in the File Plan and click **More** then **Request Information**.

2. Click **Select** and select a user or group to request the information from.

3. Enter details of what you need in the Requested information box.

4. Click **Request Information**.

    A task will be assigned to the selected user and will show in their My Tasks dashlet. Once they mark the task as done the information they provide will be shown in a task assigned to the user who requested the information. Access the information through your My Tasks dashlet and click Task Done to close the information request.

## Completing a record

{% include ags/complete-record.md %}