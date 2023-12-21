---
title: The File Plan
---

The File Plan is a container for records, folders, {% include tooltip.html word="category" text="categories" %} and retention schedules. It's effectively a virtual filing cabinet 
for storing records, and is the basic structure of Records Management. This structure lets you classify and group records with similar 
characteristics.

The top level of the File Plan is created when you create a Records Management site. This is like an empty 
virtual filing cabinet - you then add drawers (categories), folders, and records to it.

![File Plan]({% link governance-services/images/file-plan.png %}){:height="400px" width="150px"}

Remember that it's far more versatile than a physical filing cabinet, but the following rules are enforced when working 
with the File Plan structure:

* The top level of the File Plan can only contain record categories.
* A category can contain other categories and folders.
* A folder can contain only records.

The structure of the File Plan will generally reflect different parts of your organization and can be made up of the following elements:

* **Record category**

    The record category contains the retention and retention schedules for its folders and records. In other words it controls how records are managed, and how they're disposed of when they're not needed any more.

* **Record folder**

    A record folder is created in a record category, and inherits the attributes of the record category. The record folder is considered to be under the control of the record category. Once the record folder is created, security restrictions apply. A record folder can be open or {% include tooltip.html word="recordfolderclosed" text="closed" %}, and a closed record folder cannot accept records for filing.

* **Record**

    A record is a document in the File Plan. It's filed in a record folder, and is under the control of a record category.

* **Vital record**

    A vital record is a record that is considered to be essential to the operation of an organization. A vital record must be reviewed periodically, according to its review period. The review period is attached to the record category or folder.


You can create a File Plan structure from scratch or [load the Records Management test data](#loading-test-data) to use as a starting point. This gives you a sample File Plan that you can rework to meet your needs.

You can also automate the File Plan by [applying rules to categories and folders]({% link governance-services/7.4/using/automate-fileplan.md %}). This means that records can be moved automatically through the record lifecycle, without you having to do any of the work.

## Opening the File Plan 

You can use the File Plan to manage, view, and work with records.

1. Click **File Plan** in the Records Management site.

    The records list takes up most of the File Plan main page. You can filter the records list and navigate the File Plan using the explorer panel down the left side of the page.

2. Use the **Options** menu to select how you want to view the library content, and the sorting options to sort records.


> **Note:** It's recommended that you use the File Plan for Records Management actions rather than going through the repository.

## Browsing the File Plan

The File Plan consists of an explorer panel and a content list.

The explorer panel has the following sections:

* **Navigation**

    A tree view of the records management hierarchy. The ![]({% link governance-services/images/Subfolders.png %}){:height="18px" width="18px"} icon indicates a category contains subfolders. Click the icon to view its contents.

* **File Plan**

    A list of transition types that records can be in. You can click these to view all matching records.

* **Saved Searches**

    A list of the saved searches. You can click these to view all matching records.


The location path above the content list shows your current position in the File Plan hierarchy. Each location path item is a link so you can easily return to any part of the current navigation path. Click ![Navigate Up]({% link governance-services/images/navigate-up-icon.png %}){:height="18px" width="18px"} to display the contents of the folder one level higher.

Use the sort menu to change the criteria used to sort the File Plan contents. You can toggle between ascending and descending sort order.


## Building the File Plan

The File Plan is built up by adding levels made up of {% include tooltip.html word="category" text="categories" %} and folders.

Only a few users have the capability to add folders and categories, and this is tightly controlled to make sure that your system remains compliant. Capabilities are assigned to user roles in the RM Admin Tools. You might be assigned the capability to create folders but not categories, or just have the capability to add records.

> **Note:** Capabilities given to a role are not the same as permissions. Capabilities define what you can do in the Records Management site, whereas permissions are specific to sections of the File Plan. Permissions are applied at category and folder level using the **Manage Permissions** option, and you use these to decide which users can see specific sections of the File Plan, and if they can read and file in that section. See [Managing permissions]({% link governance-services/7.4/using/manage-permissions.md %}) for further details.

When you create a container (category or folder) the system records the date of creation and the user who created it. This information is recorded in the object's metadata. Metadata can be thought of as a set of properties, and are where all key information about an item, folder, or category is stored. Record categories carry the most metadata as they hold the retention instructions for the whole category.

The following rules are enforced when working with the File Plan structure:

* The top level of the File Plan can only contain record categories.
* A category can contain other categories and folders.
* A folder can contain only records.

### Loading test data

You can load Records Management test data which creates a sample File Plan that you can use to get started.

> **Note:** The test data is intended to give you an idea how a File Plan is structured. You don't need to load it if you don't want to.

1. Click ![]({% link governance-services/images/settings-icon.png %}){:height="18px" width="18px"} then **Customize Dashboard**.

    The Customize Dashboard page displays the current layout and configuration of your dashboard.

2. Click **Add Dashlets** and drag and drop the RM Data Set Import dashlet onto the columns below:

3. Click **OK** to save the dashboard configuration.

    The Import Data Set dashlet is added to the site dashboard.

4. Select **DOD 5015 Example Data** from the Data Set menu on the new dashlet and click **Import**.

    A sample File Plan and associated data is imported to your Returns Management site. You can explore and edit the File Plan as you would with a plan you created from scratch.

### Adding a record category

You can create a record {% include tooltip.html word="category" text="category" %} at the top level in the {% include tooltip.html word="fileplan" text="File Plan" %} or within another record category.

1. In the File Plan go to the location for the new record category.

2. Click **New Category**.

    The **New Record Category** dialog box displays.

3. Enter details for the new category. 

    |Metadata field|Description|
    |--------------|-----------|
    |Name|*Required.* The name for the record category.|
    |Title|*Required.* The title for the record category.|
    |Description|A description of the record category.|
    |Record Category ID|*Required.* A unique identifier for the record category is generated automatically. You can change this now, but you can't edit it once the category has been created.|
    |Vital Record Indicator|Defines whether records in this category have a review process. The Vital Record Indicator is applied to all record folders within that category. You can change this at folder level. <br><br>Users with Records Manager permissions receive a notification email when vital records are due for review.|
    |Period|The time period for the review cycle. Reviews are recurring based on the period you select. The review period is required when the **Vital Record Indicator** option is selected. The review period is displayed on the details page for folders and records in the category. <br><br> **Note:** The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start date of your system-configured financial year.|
    |Expression|Enter a number as the **Expression** to accompany the **Period** type. If you enter “Week” and “3”, this would mean a review cycle of 3 weeks. <br><br>If you select a Period that doesn't require an Expression then this field isn't available.|

4. Click **Save**.

    The new category displays in the File Plan.

See also video explaining [adding a record category]({% link governance-services/7.4/tutorial/governance-services/index.md %}#create-a-record-category).

### Adding a record folder

You can add record folders within a record {% include tooltip.html word="category" text="category" %}.

1. Select a folder in the {% include tooltip.html word="fileplan" text="File Plan" %}.

2. Click **New Folder**.

    The **New Record Folder** dialog box displays.

3. Enter details for the new category. 

    |Metadata field|Description|
    |------------------|---------------|
    |Name|*Required*. The name for the record folder.|
    |Title|*Required*. The title for the record folder.|
    |Description|A description of the record folder.|
    |Record Folder ID|*Required*. A unique identifier for the record folder is generated automatically. You can change this now, but you can't edit it once the folder has been created.|
    |Location|If relevant specify the physical location of the records contained within this folder.|
    |Supplemental Marking List|If available, select any suitable properties from the list. Entries on this list are set up by your Alfresco administrator and are only available if you have been given the required permission.|
    |Vital Record Indicator|Defines whether records in this folder have a review process. The Vital Record Indicator is applied to all records within the folder. You can change this at record level.<br><br> **Note:** If you don't select this option and the category the folder is in has a Vital Record Indicator set, then the category setting will be applied to the folder once it is created.<br><br>If you do select this option it will override any Vital Record Indicator set in the category.<br><br>Users with Records Manager permissions receive a notification email when vital records are due for review.|
    |Period|The time period for the review cycle. Reviews are recurring based on the period you select. The Review Period is required when the **Vital Record Indicator** check box is selected.<br><br> **Note:** The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start date of your system-configured financial year. See [Customizing the end of the financial year]({% link governance-services/7.4/config/index.md %}#customize-end-of-year).<br><br>The review period is displayed on the details page for records in the folder.|
    |Expression|Enter a number as the **Expression** to accompany the **Period** type. If you enter “Week” and “3”, this would mean a review cycle of 3 weeks.<br><br>If you select a Period that doesn't require an Expression then this field isn't available.|

4. Click **Save**.

    The new folder is now shown in the File Plan.

The new record folder is marked as ![]({% link governance-services/images/ico-rm-folder-open.png %}){:height="18px" width="18px"} Open, which means that records can be filed in it. The date of opening is the same as the creation date.

See also video explaining [adding a record folder]({% link governance-services/7.4/tutorial/governance-services/index.md %}#create-a-record-folder).  