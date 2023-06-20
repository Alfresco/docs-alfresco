---
title: Managing the File Plan
---

The record {% include tooltip.html word="category" text="categories" %}, record folders, and records in the File Plan structure each have an appropriate set of actions. You can access the actions by hovering over an item in the File Plan or by clicking on an item name. Use these actions to manage the File Plan.

> **Note:** The standard Alfresco **Copy to**, **Move to** and renaming options are available for record categories, record folders, and records. See [Keeping your library organized]({% link content-services/latest/using/content/manage.md %}#organizing-content) for further details.

## Managing record categories

There are various options available to help you manage record categories. These are available to users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %}.

In the File Plan hover over a record category to display the available actions:

|Action|Select this to...|
|------|-----------------|
|View Details|View the record category details page, where you can see the metadata and a full list of actions.|
|Edit Metadata|Edit the record category metadata.|
|Manage Permissions|Set the user and group access for the category.|
|Copy to|Create a copy of the category in another location in the File Plan.|
|Move to|Move the category to another location in the File Plan.|
|Delete|Delete the category from the File Plan.|
|View Audit Log|View the auditing information for the category. The Audit Log displays the activity information and has options to export and file as a record.|
|Manage rules|Create and edit rules so that category content is managed automatically.|

### Viewing record category details

The record category details page gives you access to the actions available to be performed on the category, the custom metadata, the {% include tooltip.html word="retentionschedule" text="retention schedule" %}, and the category URL.

1. Hover over a record category in the File Plan and click **View Details**.

    The details page displays. On this page, you can see the metadata, the retention schedule, and the available actions in the Actions list.

    If no retention schedule has been set for the record category, you create it here. If a retention schedule exists, you can edit it.

    Where a retention schedule exists, click **View Description** in the Retention Steps section to display the description for a particular step.

2. Click the location link above the record category name to return to the File Plan.

### Editing a record category

You can edit a record category if you need to make any changes to its metadata.

1. Hover over a record category in the File Plan and click **Edit Metadata**.

    The Edit Metadata page displays.

2. Edit the metadata details as necessary.

3. Click **Save**.

### Deleting a record category

When you don't need a record category any more you can delete it.

1. Hover over a record category in the File Plan and click **Delete**.

    A confirmation dialog box displays.

2. Click **Delete**.

    The record category is removed from the Records Management system.

    > **Important:** This will also delete the folders and records within the record category.

## Managing record folders

There are various options available to help you manage record folders. These are available to users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %}.

In the File Plan hover over a record folder to display the available actions. The standard actions available are shown. Additional options are available dependant on the stage a folder is at in the retention schedule. See the relevant topics for further details.

|Action|Select this to...|
|------|-----------------|
|View Details|View the record folder details page, where you can see the metadata and a full list of actions.|
|Edit Metadata|Edit the record folder metadata.|
|Close Folder|Close the folder. A {% include tooltip.html word="recordfolderclosed" text="closed" %} record folder cannot accept records for filing. When you close the folder, this action toggles to the **Re-open Folder** action.|
|Edit Retention Date|If a folder is subject to a folder level {% include tooltip.html word="retentionschedule" text="retention schedule" %}, you can review the retention date for the next step in the retention schedule that applies to the folder.|
|Review All|Mark all vital records in a folder as having been reviewed.|
|Add to Hold|Hold the folder. You can view on {% include tooltip.html word="fileplan" text="File Plan" %} folders in the **Holds** area on the explorer panel. When you hold the folder, this action toggles to the **Remove from Hold** action.|
|Copy to|Create a copy of the folder in another location in the File Plan.|
|Move to|Move the folder to another location in the File Plan.|
|Manage Permissions|Set the user and group access for the folder.|
|Delete|Delete the folder from the File Plan.|
|View Audit Log|View the auditing information for the folder. The Audit Log displays the activity information in a new window and has options to export or file this information as a record.|
|Manage rules|Create and edit rules so that folder content is managed automatically.|

> **Note:** When the folder is closed or on hold, a limited set of actions is available.

### Viewing record folders

The record folder details page gives you access to the actions available to be performed on the folder, the custom metadata, and the folder URL.

1. Hover over a record folder in the File Plan and click **View Details**.

    The details page displays. On this page, you can see the metadata and the available actions in the Actions list.

2. Click the location link above the record folder name to return to the File Plan.

### Editing a record folder

You can edit a record folder if you need to make any changes to its metadata.

1. Hover over a record folder in the File Plan and click **Edit Metadata**.

    The Edit Metadata page displays.

2. Edit the metadata details as necessary.

3. Click **Save**.

### Completing folder events

If a retention schedule has event-based steps, then you need to complete those events before the schedule can move on to the next step. Some steps are automatically completed but most of them you need to complete manually.

1. Click the title of a folder in the File Plan.

    The record details page is displayed. All incomplete events for the current schedule step are displayed.

2. Click **Complete Event**.

3. In the complete Event box select a date and time for the completion of the event..

4. Click **OK**.

When all incomplete events are complete the folder can move onto the next step in the schedule.

### Editing a folder retention date

If a folder is subject to a folder level retention schedule, you can review the retention date for the next step in the retention schedule that applies to the folder. This is done at folder level only and does not affect the retention schedule.

1. Hover over a folder in the File Plan and click **More** then **Edit Retention Date**.

    The Edit Retention Date dialog box displays. The current retention date is highlighted.

2. Select a new retention date and click **Update**.

    A message displays confirming that the retention date is updated. This overrules any review dates set in the retention schedule.

### Processing records in a folder

See [processing records](#processing-records) under managing records section.

### Adding record folders to a hold

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can add record folders to a hold.

A hold allows objects on hold for a particular reason to be tracked as a set. Holds prevent changes to on hold objects, which have their retention schedules suspended until the hold is removed.

> **Note:** When you add a folder to a hold, all records within the folder are also added to the hold. The records can't be removed from the hold individually, they can only be removed from the hold by removing the entire folder.

1. Hover over a record folder in the File Plan and click **More** then **Add to Hold**.

    The Add to Hold screen displays.

    > **Note:** This option isn't available if no holds have been set up in the Holds area or you don't have permission to put records on the existing holds.

2. Select one or more holds and click **OK**.

    A message displays confirming that the folder is on hold, and the folder now displays the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon.

    > **Note:** Records and folders remain on hold until they have been removed from all holds they're added to.


The folder remains in its' place in the File Plan. It is also shown in the **Holds** area of the explorer panel.

> **Note:** To remove a record folder from a hold hover over it in the File Plan or the Holds area and select **Remove from Hold**.

### Closing a record folder

Users with the appropriate capability (Folder Control) can close folders. {% include tooltip.html word="recordfolderclosed" text="Closed" %} folders cannot accept any further records.

1. Hover over a record folder in the File Plan and click **Close Folder**.

    A message displays confirming that the folder is closed.

    > **Note:** The action for this folder changes to **Re-open Folder**, which allows the folder to be reopened.

### Deleting a record folder

When you don't need a record folder any more you can delete it.

1. Hover over a record folder in the File Plan and click **Delete**.

    A confirmation dialog box displays.

2. Click **Delete**.

    The record folder is removed from the Records Management system.

    > **Note:** This will also delete the records within the record folder.

## Managing records

There are various options available to help you manage record. These are available to users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %}.

In the File Plan hover over a record to display the available actions. The standard actions available are shown. 
Additional options are available dependant on the stage a record is at in the {% include tooltip.html word="retentionschedule" text="retention schedule" %}. 
See the relevant topics for further details.

|Action|Select this to...|
|------|-----------------|
|Download|Download the file to your computer.|
|Edit Metadata|Edit the metadata for the record.|
|Complete Record|Declare the file as a record. All required metadata fields must be complete. When you declare the file as a record, this action toggles to the **Reopen Record** action.|
|Reviewed|Marks a vital record as reviewed.|
|Reopen Record|Revert the item back to an incomplete record.|
|Add Record Metadata|Associate an undeclared record with one or more record types. This option is only available in {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites.|
|Add to Hold|Hold the record. You can view on hold records in the **Holds** area on the explorer panel. When you hold the record, this action toggles to the **Remove from Hold** action.|
|Copy to|Create a copy of the record in another location in the File Plan.|
|Move to|Move the record to another location in the File Plan.|
|File to|File an unfiled record to the File Plan.|
|Link to|File a record in multiple locations in the File Plan and create a link. This gives the appearance of duplicating the record in another location, though actually there is just one record stored in multiple folders. Changes made to the record in one location will be reflected in the other locations.|
|Unlink Record|Available for records that have been linked from another record, you can unlink the record. This will remove it from the folder it was linked to.|
|Delete|Delete the record from the File Plan.|
|View Audit Log|View the auditing information for this record. The Audit Log displays the activity information in a new window and has options to export or file this information as a record.|
|Reject|Reject an unfiled record. If you select to reject a record then you need to enter a reason for the rejection. This reason be viewed when looking at the file the record was created from in it's originating site.|
|Request Information|Request further information about a record from other users. This is only available for incomplete records.|
|Manage Permissions|Use the **Manage Permissions** option to control user permissions for records.|
|Add Relationship|Add a relationship between records such as a cross-reference or obsoleted by.|

When a record has been completed not all of these actions will be available.

When the record is on hold (identified by the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon), a limited set of actions is available.

Vital records display the ![Vital record]({% link governance-services/images/ico-rm-vitalrecord.png %}){:height="18px" width="18px"} icon.

### Viewing records

The record details page gives you access to the actions available to be performed on a record, the custom metadata, references to and from other records, and the record URL.

1. Click the title of a record in the File Plan.

    The record details page displays. On this page, you can see the record details and the available actions in the Actions list.

2. Click the location link above the record name to return to the File Plan.

### Linking records

You can link records to a folder other than the one they're filed in to file them in multiple locations in the File Plan.

This gives the effect of "duplicating" the record in another location, though there is still only one record, but it's now contained in more than one folder. Changes made to the record in one location will be reflected in all the other locations, and this includes deleting the record.

> **Important:** It's recommended that you don't link a record to a location where it will be subject to a retention schedule with different steps or a different sequence of steps.

> **Note:** The link option is only available to users who have the Link Records capability assigned to them by the Records Management Administrator.

1. Hover over a record in the File Plan and click **More** then **Link to**.

2. Select a folder in the File Plan to link a record to.

3. Click **Link**.

    A link is created in the destination folder. All copies of the record display the ![Linked]({% link governance-services/images/ico-rm-linkedrecord.png %}){:height="18px" width="18px"} icon.

    > **Note:** Linked records won't move to the next retention step until the period for the current step has been completed in all retention schedules it falls under. So in effect they follow the retention schedule that has the longest period for a step.


You can click **More** then **Unlink Record** against the record in the destination folder. This will remove the linked record from the destination folder.

> **Note:** The unlink option is only available to users who have the Unlink Records capability assigned to them by the Records Management Administrator.

### Creating relationships between records

You can add relationships to records to create a connection between them. This can be useful, for example, to track records that have been superseded or obsoleted.

1. Hover over a record in the File Plan and click **More** then **Add Relationship**.

2. Select a relationship type in the New Relationship screen.

    > **Note:** Most relationships don't alter or affect a record in any way, they are just used to create an association between records.

    However, if you select Obsoleted by/Obsoletes or Superseded by/Supersedes, then any outstanding retention schedule obsoleted or superseded events will be automatically completed.

3. Click **Select Record** and then select a record to create a relationship with by clicking ![Add]({% link governance-services/images/ico-add.png %}){:height="18px" width="18px"}.

4. Click **OK**.

    The selected record is shown in the New Relationship screen.

5. Click **Create**.

    You can repeat these steps to add relationships to multiple other records. You can see details of any relationships when you click on a record to preview it, and relationships can be added and deleted here if you have the correct permissions.

    When records are created from versions of the same file, a relationship between the records is automatically created.

### Reviewing vital records

If you've set up a review period for vital records in the record category or folder, you can review this for individual records.

Users with Records Manager permissions receive a notification email when vital records are due for review.

1. When a record is due for review hover over it in the File Plan.

    > **Tip:** You can search for vital records using the **Records Search** on the **More** menu. Records that are due for review will display a warning symbol in the search results.

2. Click **Reviewed**.

    A message displays saying that the record has been successfully reviewed. The review date is displayed in the record audit log.

### Managing unfiled records

All records filed from a non-Records Management site are added to the {% include tooltip.html word="unfiledrecords" text="Unfiled Records" %} area by default.

> **Tip:** Access the Unfiled Records area using the explorer panel to the left of the File Plan.

Unfiled records can have been {% include tooltip.html word="declareasrecord" text="declared" %} as records from a non-Records Management site, from within the Unfiled Records area, or could be reports generated from within the File Plan. [Filing an unfiled record]({% link governance-services/7.3/using/file-records.md %}#filing-an-unfiled-record) describes how records in the Unfiled Records area are processed.

You don't have to use this area as a flat structure, you can configure it to your own requirements.

You can create a full folder hierarchy within the Unfiled Records area and use [rules]({% link governance-services/7.3/using/automate-fileplan.md %}) to automate the processing of unfiled records.

You can use the **Manage Permissions** option to control which users can file and reject unfiled records.

There are also many of the usual options available, including the options to copy and move records and folders within the Unfiled Records area. If you select to **Reject** a record then you need to enter a reason for the rejection. This reason can be viewed when looking at the file the record was created from in its originating site.

### Completing record events

If a {% include tooltip.html word="retentionschedule" text="retention schedule" %} has event-based steps, then you need to complete those events before the schedule can move on to the next step. Some steps are automatically completed but most of them you need to complete manually.

1. Click the title of a record in the File Plan.

    The record details page is displayed. All incomplete events for the current schedule step are displayed.

2. Click **Complete Event**.

3. In the complete Event box select a date and time for the completion of the event.

4. Click **OK**.

When all incomplete events are complete the record can move onto the next step in the schedule.

### Editing a review date

If you've set up a review period for vital records in the record category or folder, you can edit the review date for individual records.

1. Hover over a record in the File Plan and click **More** then **Edit Review Date**.

    The Edit Review Date dialog box displays. The current review date is highlighted.

2. Select a new review date and click **Update**.

    A message displays confirming that the review date is updated. This overrules any review dates set at folder or category level.

### Editing a record retention date

If a record is subject to a record level retention schedule, you can review the retention date for the next step in the retention schedule that applies to the record. This is done at record level only and does not affect the retention schedule.

1. Hover over a record in the File Plan and click **More** then **Edit Retention Date**.

    The Edit Retention Date dialog box displays. The current retention date is highlighted.

2. Select a new retention date and click **Update**.

    A message displays confirming that the retention date is updated. This overrules any review dates set in the retention schedule, even if you update the retention schedule.

### Processing records

Retention steps are generally completed manually, though retain and cut off steps can be completed automatically 
by a system process that is run daily. You can also set up a rule to complete steps automatically.

If a retention step is complete (the time period is finished or the required {% include tooltip.html word="events" text="events" %} have been completed), 
then additional options are available for folders or records, dependant on whether the {% include tooltip.html word="retentionschedule" text="retention schedule" %} 
is set to folder or record level.

If you apply an action to a folder then it will also be applied to all records within the folder.

1. Hover over a folder/record in the {% include tooltip.html word="fileplan" text="File Plan" %} and click the action that is available to move to the next step in the retention schedule.

    |Action|Select this to...|
    |------|-----------------|
    |Cut off|Cuts off the record/folder and triggers the retention period. Records can't be added to a folder that's been cut off.|
    |End Retention|Ends the retention period for the record/folder.|
    |Transfer|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained.By default {% include tooltip.html word="transfer" text="transferred" %} records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.|
    |Accession|Transfers the record/folder to the previously specified location. An audit trail and metadata is retained.<br><br>This usually involves the specific legal and physical transfer of records between organizations.<br><br>By default {% include tooltip.html word="accession" text="accessioned" %} records/folders are temporarily held in the Transfers area of the File Plan until you hover over them and click **Complete Transfer**.|
    |Destroy|Removes the record/folder content from the Records Management system. If the **Maintain record metadata after destroy** option is selected in the retention schedule, then a visual representation of the record, an audit trail, and metadata is retained in the File Plan.<br><br>If the record was declared from a file in an Alfresco site then the file is also removed.|

    > **Note:** Each time you manually run an action, that option is replaced with the next action step in the retention schedule, and a new option for undoing the step you've just done, for example, **Undo Cut Off**.

    Icons next to the record/folder indicate their current stage in the schedule.

See also video explaining [processing records]({% link governance-services/7.3/tutorial/governance-services/index.md %}#process-records).

### Adding records and record folders from the File Plan to a hold

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can add records, and record folders to a hold to freeze them. Holds prevent changes to on hold items, which have their retention schedules suspended until the hold is removed.

> **Note:** Smart folders can't be added to a hold. Adding system files to a hold is also not supported and could create errors, this includes data dictionary files.

A hold allows objects on hold for a particular reason to be tracked as a set.

> **Note:** When you add a record folder to a hold, all records within the folder are also added to the hold. The records can't be removed from the hold individually, they can only be removed from the hold by removing the entire folder.

> **Tip:** This functionality isn't available if at least one hold hasn’t been set up or you don't have permission to put records on the existing holds.

1. Hover over a record or record folder in the File Plan and click **More** and then **Add to Hold**.

    To add more than one item to a hold at the same time, select each one and click the **Select Items** drop down list and then select **Add to Hold**.

    The Add to Hold screen displays.

2. Select one or more holds and click **OK**.

    A message displays confirming that the record or record folder is on hold, and it displays the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon.

    > **Note:** Records and folders remain on hold until they have been removed from all the holds they're added to.


The record remains in its place in the File Plan. It is also shown in the **Holds** area of the explorer panel.

> **Note:** To remove a record from a hold hover over it in the File Plan or the Holds area and select **Remove from Hold**. See [Removing items from hold]({% link governance-services/7.3/using/search-records.md %}#removing-items-from-hold).

### Adding content from the Document Library to a hold

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can add content to a hold to freeze them. Holds prevent changes to on hold items.

> **Note:** Adding system files to a hold is not supported and could create errors, this includes data dictionary files.

A hold allows items on hold for a particular reason to be tracked as a set.

> **Tip:** This functionality isn't available if at least one hold hasn’t been set up or you don't have permission to put content on the existing holds.

1. Hover over your content in the Document Library and click **More** and then **Add to Hold**.

    To add more than one item to a hold at the same time, select each one and click the **Selected Items** drop down list and then select **Add to Hold**.

    The Add to Hold screen displays.

2. Select one or more holds and click **OK**.

    A message displays confirming the content is on hold, and the content now displays the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon.

    > **Note:** Content remains on hold until it has been removed from all the holds they're added to.


The content remains in its place in the Document Library. It is also shown in the **Holds** area of the File Plan explorer panel.

> **Note:** To remove content from a hold hover over it in the File Plan, Document Library or the Holds area and select **Remove from Hold**. From the Holds area in the File Plan and from the List view in the File Plan you can remove more than one item at a time. You do this by selecting your items and clicking the **Selected Items** drop down list and then **Remove from Hold**. See [Removing items from hold]({% link governance-services/7.3/using/search-records.md %}#removing-items-from-hold).

### Reverting a record to be an incomplete record

If you need to stop a record from being subject to retention schedules, you can reopen it so that it reverts to being an incomplete record.

1. Hover over a record in the File Plan and click **More** then **Reopen**.

    The record is now marked as an incomplete record in the file plan and is not subject to the rules of the retention schedule. You can set it to complete again whenever needed.

### Deleting records

When you don't need a record any more you can delete it.

1. Hover over a record in the File Plan and click **Delete**.

    A confirmation dialog box displays.

2. Click **Delete**.

    The record is removed from the Records Management system. If the record was declared from a file in an Alfresco site then the file is also removed.

## Managing records holds

You can add content, records, and record folders to a hold to freeze them. For records, and record folders this would also suspend their retention schedules.

You can create as many different holds as you want, which are represented as folders in the Holds area.

> **Tip:** Access the Holds area using the explorer panel to the left of the File Plan.

In the Holds area there's a **New Hold** option which you use to set up your different hold types. Once you have a list of different holds you can put content, records, and, record folders on as many of the different holds as required.

You can also add records to a hold directly from your search results, see [Adding search results to a hold - Records Search]({% link governance-services/7.3/using/search-records.md %}#addsearchresults2holdRecordsSearch) and [Adding search results to a hold - Share search]({% link governance-services/7.3/using/search-records.md %}#addsearchresults2holdShareSearch).

When you add a record folder to a hold, all records within the folder are also added to the hold. They'll stay on hold until removed from the hold or the hold is deleted.

In the Holds area you can see your holds. When you go into a hold you can see the items it contains. The items aren't removed from the File Plan. They retain their place in the File Plan or Collaboration site with limited actions available, and are identified as being on hold by the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon.

> **Note:** Only users with permissions to view a hold will see the ![Frozen]({% link governance-services/images/ico-rm-frozen.png %}){:height="18px" width="18px"} icon next to records in the File Plan that are on that hold. Users without permission to view the hold will see the record but have no indication that it is on a hold. This provides confidentially on record holds.

You can use the **Manage Permissions** option to control which users can view, create, edit, and delete holds. Users who don't have read permission for a specific hold will not receive any indication that records it contains are in that hold.

> **Tip:** You can hover over a hold and click **Generate Hold Report** to create a report on the hold. The report is filed as an incomplete record in your selected destination.
  
Users with the appropriate capabilities can create multiple holds that are then used when records are put on hold. See next section.

### Creating holds

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can create multiple holds that are then used when records are put on hold.

> **Tip:** You can only put records on hold if holds have been created to add them to.

1. Click on the Holds area of the File Plan in the explorer panel, and click **New Hold**.

2. Enter a Name, Description and Reason for the hold.

    > **Note:** The reason will be used to when deciding which hold a record should be put on.

3. Click **Save**.

    A new hold is now available for putting records on. You put records on hold by hovering over them in the File Plan and selecting the **Add to Hold** option.

You can edit and delete holds by hovering over them in the File Plan and selecting the appropriate option, as well as managing their permissions and viewing an audit log.

## Exporting and importing File Plan content

You can quickly and easily import and export Records Management content, from individual record folders through to an entire File Plan.

This can be useful if you want to quickly build your File Plan, or parts of it, based on a File Plan that already exists on an Alfresco system.

You can move entire blocks of content – record categories, record folders, records, metadata, and retention schedules – within a File Plan or to another File Plan.

Files are imported and exported using the Alfresco Content Package (ACP) format. You can also choose to import and export the content as a zip file. Exported files contain all structural information including record categories, folders, and retention schedules, so they make for seamless building of a File Plan in another Alfresco system.

### Exporting content

Exporting a records category or folder bundles the contents and structure into an Alfresco Content Package (ACP). You can also choose to export the content as a zip file.

1. In the File Plan click the check boxes for the record category and/or folders you want to export.

2. Click **Selected Items** then **Export**.

3. Select the file format for the export and click **OK**.

    > **Note:** A zip file retains the file structure, making it bigger than an ACP. In an ACP the file structure is stored in an xml file.

    Depending on your browser, you are either prompted to specify a destination or the file is automatically downloaded to a default location.

### Exporting a File Plan

Exporting a File Plan bundles the contents and structure of the entire plan into an Alfresco Content Package (ACP). You can also choose to export the plan as a zip file.

1. Anywhere in the File Plan click **Export All**.

2. Select the file format for the export and click **OK**.

    > **Note:** A zip file retains the file structure, making it bigger than an ACP. In an ACP the file structure is stored in an xml file.

    Depending on your browser, you are either prompted to specify a destination or the file is automatically downloaded to a default location.

### Importing content

Importing an Alfresco Content Package (ACP) or zip file into a Records Management system expands the package to its original structure. Existing content will not be overwritten.

1. Go to the level in the File Plan structure where you want to import the ACP/zip file.

2. Click **Import**.

3. Click **Select Import File** and find the file that you want to upload.

    > **Important:** You should only import an ACP/zip file that was exported from another Records Management File Plan.

    The Records Management content is extracted from the uploaded file with it's original structure maintained.
