---
title: Auditing and reporting
---

You can view audit logs for record {% include tooltip.html word="category" text="categories" %}, record folders, active content, and records, and whenever a record or 
folder is transferred, added to a {% include tooltip.html word="fileplan" text="File Plan" %}, {% include tooltip.html word="accession" text="accessioned" %}, or destroyed, you can file a report to keep a record of the process.

> **Note:** You can only view audit logs if your Alfresco administrator has given you the Access Audit permission.

Whenever a record is transferred, added to a hold, accessioned or destroyed, you have the option to file a report. 
The report contains details of the item, the retention authority, what the retention step was, when it was performed, 
who by, and any location changes. The report is filed as a record.

The audit log contains the entire history of an object since the point it was added to the File Plan, and can be useful 
for finding out about specific events that have occurred during an objects life cycle, and any users that have been involved.

Every entry in the audit log is timestamped and where metadata has been changed, the original values and changed values are recorded.

When viewing an audit log you can also select to export it or to file it as a record.

> **Note:** Users with access to the RM Admin Tools can run an audit of the entire Records Management system.

## Filing a report

Whenever a record or folder is transferred, added to a hold, accessioned, or destroyed, you can file a report to 
keep a record of the process.

When you file a report it's filed as a record which you can then complete and process as with any other record.

1. In the File Plan hover over a destroyed folder or record, or a folder or record awaiting transfer or accession completion, and click **File Report**.

    > **Note:** Records and folders waiting for transfer and accession completion are stored by default in the **Transfers** area in the explorer panel. Records on a hold are stored by default in the **Holds** area in the explorer panel.

2. Reports are filed by default to the **Unfiled Records** area of the File Plan. To select an alternate location deselect the **File report to 'Unfiled Records'** option and choose a different destination folder.

    > **Note:** As with all records you must select a folder, not a category, to file the report to.

3. Click **File Report**.

The report is filed as an incomplete record in your selected destination.

## Viewing an audit log

You can view audit logs for record categories, record folders, and records.

1. Hover over a record category, folder, or record in the File Plan and click **More** then **View Audit Log**.

    > **Note:** You can only view audit logs if your Alfresco administrator has given you the Access Audit permission.

    The audit log displays.

You can click **Export** to export the audit log, or **File as Record** to select a location in the File Plan and file the audit log as a record.
