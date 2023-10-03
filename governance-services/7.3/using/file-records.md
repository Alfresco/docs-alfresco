---
title: Filing records
---

Filing records is the process of classifying records and putting them into the correct location in the {% include tooltip.html word="fileplan" text="File Plan" %}.

There are three ways that you can create records:

* Create a record by uploading files
* Create a non-electronic record that references a physical record such as a paper record or microfilm
* Select an item in another Alfresco site (non-Records Management) and declare it as a record

> **Note:** You can also import folders, {% include tooltip.html word="category" text="categories" %}, and even entire File Plans, and any records that they contain, see [Exporting and importing File Plan content]({% link governance-services/7.3/using/manage-fileplan.md %}#exporting-and-importing-file-plan-content).

Your Alfresco administrator can also set up your system so that emails to specified addresses are captured and stored 
as records.

A record is not considered to be complete until all the required metadata has been added to it. 
You select **Edit Metadata** to complete required metadata.

In {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites you can also select to **Add Record Metadata** and associate 
the file with a record type, so that when you edit metadata there is type-specific metadata to add.

Once that's done you can select to **Complete Record** and it will be subject to the retention rules that apply to 
the folder you've placed it in.

> **Note:** When you set up a record category or folder you can specify that it will be used to hold **Vital Records**. A vital record must be reviewed on a periodic basis, as defined on the record category or folder.

## Filing an electronic record

Electronic records are files that are uploaded to a records folder. Non-{% include tooltip.html word="electronicrecord" text="electronic records" %} might be paper files that 
can be stored in a physical location.

1. In the record folder where you want to file a record click **File**.

2. Click **Electronic**.

3. Click **Select Records to File** and find the file that you want to upload.

    > **Tip:** You can also select multiple items in the standard multi-select way.

    The files are uploaded as record and display in the {% include tooltip.html word="fileplan" text="File Plan" %} as incomplete records. You need to make sure any 
    required metadata is added before you can set records to {% include tooltip.html word="recordcompleted" text="complete" %}.

See also video explaining [filing an electronic record]({% link governance-services/7.3/tutorial/governance-services/index.md %}#file-a-record).

## Filing a non-electronic record

Non-electronic records might be paper files that can be stored in a physical location. Filing a non-electronic record in the File Plan means the file can be traced and details of where it is physically stored can be recorded.

1. In the record folder where you want to file a record click **File**.

2. Click **Non-electronic**.

3. Enter details for the file you are making a record of.

    Only the Name and Title are required, but you should enter enough information so that the record will be recognized by other users.

4. Click **Save**.

    A new record is created and displays in the File Plan as an incomplete record. You need to make sure any required metadata is added before you can set records to complete.

## Filing an unfiled record

When you've declared a record from a non-Records Management site it's added to the **Unfiled Records** area. 
You now need to add it to a records folder.

1. Click the **Unfiled Records** area on the explorer panel on the left of the page.

    All {% include tooltip.html word="unfiledrecords" text="unfiled records" %} are displayed.

    > **Note:** You can add additional folders to the **Unfiled Records** area to create a folder hierarchy to help manage unfiled records. You can also declare items as records directly from within the **Unfiled Records** area structure.

2. Hover over an unfiled record and click **More** then **File to...**.

3. Select a records folder to file the record in then click **File**.

    > **Note:** There are multiple other actions available including **Reject** so you can reject the record from the {% include tooltip.html word="fileplan" text="File Plan" %}, and **Move to** so you can move the record to another location in the **Unfiled Records** hierarchy.

The record's added to the File Plan, and if you haven't already you can now go and edit metadata.

See also video explaining [filing an unfiled record]({% link governance-services/7.3/tutorial/governance-services/index.md %}#file-an-unfiled-record).

## Adding record metadata

All records in the {% include tooltip.html word="fileplan" text="File Plan" %} have metadata, which you can think of as records properties.

If you associate the record with a specific type by selecting the **Add Record Metadata** option then additional metadata 
options are required for the record. You need to complete all the required metadata before you can set a record to {% include tooltip.html word="recordcompleted" text="complete" %}.

The **Add Record Metadata** option is only available in {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites.

> **Note:** Adding record metadata isn't mandatory, but can be useful to allow additional metadata to be added against a file.

1. Hover over an incomplete record in the File Plan and click **More** then **Add Record Metadata**.

    > **Tip:** For non-{% include tooltip.html word="electronicrecord" text="electronic records" %} the **Add Record Metadata** is available as soon as you hover over them, you don't need to click **More**.

    The available record types are displayed.

2. Select the appropriate record type.

    |Record type|Description|
    |-----------|-----------|
    |Web Record|A web page.|
    |Scanned Record|A file that is scanned into the Records Management system.|
    |PDF Record|A PDF file.|
    |Digital Photograph Record|A photographic image file.|

    > **Tip:** You can select multiple items in the standard multi-select way.

3. Click **OK**.

    Some record metadata is mandatory. Before you can complete a record, you must edit the metadata to complete the mandatory fields.

Icons next to the record show the record types that it's been associated with. Hover over an icon to display the record type.

See also video explaining [adding record metadata]({% link governance-services/7.3/tutorial/governance-services/index.md %}#add-a-record-type).

## Editing record metadata

You can edit record metadata to add information to a record.

Before you can {% include tooltip.html word="recordcompleted" text="complete" %} a record, you must enter any required details about the record in the metadata. You can't edit record metadata after you have set the record to complete.

1. Hover over a record in the {% include tooltip.html word="fileplan" text="File Plan" %} and click **Edit Metadata**.

    The **Edit Metadata** page displays. The metadata fields you see on this page depend on the file type, and whether or not record types have been associated with the file. The metadata is divided into sections, with additional sections dependant on if a record type has been associated with the item.

2. Enter the record metadata. 

    If your Records Management system is {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant then every file includes the DOD5015 Record section, which is a default set of basic metadata fields. The default record metadata fields are:

    |Property/metadata|Description|
    |-----------------|-----------|
    |Publication date|*Required*. The date that the record is published. Select the date from the calendar selection box.|
    |Originator|*Required*. The person or department in the originating organization.|
    |Originating Organization|*Required*. The organization that created the record.|
    |Media Type|The general media type such as audio, video, or document.|
    |Format|The format in which the record is stored, such as electronic or physical file.|
    |Date received|The date that the record was received from the originator.|
    |Addressee|The email address of the originating organization to be used for correspondence.|
    |Other Addressee|The secondary recipients of the message (CC).|
    |Location|The physical location of the record, generally only applicable to non-{% include tooltip.html word="electronicrecord" text="electronic records" %}.|
    |Supplemental Marking List|Any additional properties applicable to the record. This list is defined by the Alfresco administrator in the **List of Values** in the RM Admin Tools.<br><br>This is available in both standard and DoD 5015.2-STD compliant File Plans.|

    You can't save this page until you complete any required fields.

3. Click **Save**.

See also video explaining [editing record metadata]({% link governance-services/7.3/tutorial/governance-services/index.md %}#edit-record-metadata).

## Requesting record information

If you need additional information to complete a record, you can request this from other users.

1. Hover over a record in the File Plan and click **More** then **Request Information**.

2. Click **Select** and select a user or group to request the information from.

3. Enter details of what you need in the Requested information box.

4. Click **Request Information**.

    A task will be assigned to the selected user and will show in their My Tasks dashlet. Once they mark the task as done the information they provide will be shown in a task assigned to the user who requested the information. Access the information through your My Tasks dashlet and click Task Done to close the information request.

## Completing a record

Content added to the {% include tooltip.html word="fileplan" text="File Plan" %} must be set to complete before it is recognized as a record.

1. Hover over an incomplete record in the File Plan and click **Complete Record**.

    > **Tip:** Incomplete records are marked.

    If a record has mandatory metadata that hasn't been completed then a message lets you know that required metadata is missing.

Once a record is {% include tooltip.html word="recordcompleted" text="completed" %}, it comes under the control of the record {% include tooltip.html word="category" text="category" %} it is filed under, and security restrictions apply.

> **Note:** A record can be filed in multiple categories, see [Linking records]({% link governance-services/7.3/using/manage-fileplan.md %}#linking-records) for more details.

See also video explaining [completing a record]({% link governance-services/7.3/tutorial/governance-services/index.md %}#complete-a-record).