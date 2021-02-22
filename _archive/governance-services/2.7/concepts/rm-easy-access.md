---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Easy access records

In many cases you might want to create records from files that already exist in Alfresco, rather than creating a record from scratch.

With Alfresco Records Management you can declare files in non-Records Management site as records. When you create an "easy access record", a record of the file is added to the Records Management site. The file is still visible in its original site, identified by the ![Easy access record](../images/ico-rm-inplace.png) icon, but is locked and with a limited set of actions available.

This means that most users never need to think about records, file plans, or retention schedules. They just declare the file as a record, and the rest is handled by the Records Administrator and any rules that they've set up.

When a record is created from a file it's added to the Unfiled Records area of the Records Management site. A Records Manager then has numerous options for [Filing an unfiled record](../tasks/rm-file-unfiled.md) and [Managing unfiled records](rm-records-manage-unfiled.md)

There are three options available for declaring files as records:

-   **Declare as Record**

    A file declared as a record is added to the Unfiled Records area, in the explorer panel of the Records Management site.

    It's still visible in its original site as an easy access record, identified by the ![Easy access record](../images/ico-rm-inplace.png) icon, but is locked and with a limited set of actions available.

-   **Declare Version as Record**

    The version of a file declared as a record is added to the Unfiled Records area, in the explorer panel of the Records Management site, and is identified there as a version record by the ![Version record](../images/ico-record-version.png) icon.

    It's still available in its original site, with a full set of actions available.

-   **Auto-Declare Options**

    Each time a new major or minor version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of the Records Management site. It's identified there as a version record by the ![Version record](../images/ico-record-version.png) icon.

    It's still available in its original site, with a full set of actions available, identified by the ![Major revisions](../images/ico-rm-major-revisions.png) major versions icon or the ![All revisions](../images/ico-rm-all-revisions.png) all versions icon.

    **Note:** Your Alfresco Administrator can choose to only make these options available to certain users only. If they've done this then you'll need to be a member of the RECORD\_CONTRIBUTORS group for these options to be available.

    And as with standard Alfresco functionality you need to have the required permissions before you can do anything with files.


You can see version details of records created from versions in the file preview screen on the Records Management site. When records are created from versions of the same file, a relationship between the records is automatically created.

You can also [classify a file](../tasks/rm-classify-file.md) and declare it as a record at a later date, and it will keep any classifications applied.

-   **[Classifying files and folders](../tasks/rm-classify-file.md)**  
You can classify files and folders and apply security marks so that they can only be viewed or accessed by users who have the required security clearance.
-   **[Declaring a file as a record](../tasks/rm-create-record.md)**  
You can create records from files in non-Records Management sites and add them straight into the File Plan.
-   **[Declaring a file version as a record](../tasks/rm-create-version-record.md)**  
When files are updated in Alfresco, a new version number of the file is created. You can declare one or more of these versions as records, allowing you to keep on record changes that have been made throughout the life cycle of a file.
-   **[Setting auto-declare options](../tasks/rm-autodeclare-options.md)**  
You can set up auto-declare option for files so that major and minor version numbers will automatically be declared as records.
-   **[Moving easy access records](../tasks/rm-easy-access-move.md)**  
Although easy access records have most of their options removed, you can still move them to a different place in their originating site.
-   **[Hiding easy access records](../tasks/rm-easy-access-hide.md)**  
Once a file has been declared as a record, you have the option to hide it from its originating site.
-   **[Rejected records](../references/rm-rejected-records.md)**  
After you've created a record from a file, the Records Manager has the option to reject the record from the Records Management site.

**Parent topic:**[Using Records Management](../concepts/rm-intro.md)

