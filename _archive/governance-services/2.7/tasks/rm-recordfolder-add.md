---
author: Alfresco Documentation
source: 
audience: [, , ]
category: User Help
option: Records Management
---

# Adding a record folder

You can add record folders within a record category.

1.  Select a folder in the File Plan.

2.  Click **New Folder**.

    The New Record Folder dialog box displays.

3.  Enter details for the new category. Fields marked with an asterisk \(\*\) are required.

    |**Metadata field**|**Description**|
    |------------------|---------------|
    |**Name\***|The name for the record folder.|
    |**Title\***|The title for the record folder.|
    |**Description**|A description of the record folder.|
    |**Record Folder ID\***|A unique identifier for the record folder is generated automatically. You can change this now, but you can't edit it once the folder has been created.|
    |**Location**|If relevant specify the physical location of the records contained within this folder.|
    |**Supplemental Marking List**|If available, select any suitable properties from the list. Entries on this list are set up by your Alfresco administrator and are only available if you have been given the required permission.|
    |**Vital Record Indicator**|Defines whether records in this folder have a review process. The Vital Record Indicator is applied to all records within the folder. You can change this at record level.**Note:** If you don't select this option and the category the folder is in has a Vital Record Indicator set, then the category setting will be applied to the folder once it is created.

If you do select this option it will override any Vital Record Indicator set in the category.

Users with Records Manager permissions receive a notification email when vital records are due for review.

|
    |**Period**|The time period for the review cycle. Reviews are recurring based on the period you select. The Review Period is required when the **Vital Record Indicator** check box is selected.**Note:** The "Quarter" option splits the year into 4 sets of 3 months, beginning with Jan/Feb/March. "Financial Quarter" is the same but based on the start date of your system-configured financial year. See [Customizing the end of the financial year](rm-set-financial-year.md).

The review period is displayed on the details page for records in the folder.

|
    |**Expression**|Enter a number as the **Expression** to accompany the **Period** type. If you enter “Week” and “3”, this would mean a review cycle of 3 weeks.If you select a Period that doesn't require an Expression then this field isn't available.

|

4.  Click **Save**.

    The new folder is now shown in the File Plan.


The new record folder is marked as ![](../images/ico-rm-folder-open.png) Open, which means that records can be filed in it. The date of opening is the same as the creation date.

  

**Parent topic:**[Getting started for Records Managers](../concepts/rm-gs-managers.md)

**Parent topic:**[Building the File Plan](../concepts/rm-fileplanstruct-create.md)

