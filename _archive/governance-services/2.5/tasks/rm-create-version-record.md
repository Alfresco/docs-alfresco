---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Declaring a file version as a record

When files are updated in Alfresco, a new version number of the file is created. You can declare one or more of these versions as records, allowing you to keep on record changes that have been made throughout the life cycle of a file.

1.  In the Document Library of an Alfresco site find the file you want to declare a version of as a record.

    **Tip:** You can see a file's version history by clicking on the file, then in the file preview screen scrolling down to the Version History section. You can revert to previous versions by clicking the ![Revert version](../images/ico-revert-version.png) icon.

2.  Hover over the file and click **More** then **Declare Version as Record**.

    The file is added to the Unfiled Records folder, in the explorer panel of your Records Management site, and is identified there as a version record by the ![Version record](../images/ico-record-version.png) icon. The file is still available in its original site, with a full set of actions available.

    **Note:** You can't declare a version as a record if your permission level for the site is Consumer, or if the file is locked, or synced with an Alfresco in the Cloud site.


You can find these records in the Unfiled Records folder in the File Plan explorer panel. New records display in the File Plan as incomplete records. Any required metadata needs to be added before the records can be set to complete.

**Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.

If you delete or destroy a record that was declared from a version, then that version is marked as deleted and can't be accessed. Other versions of the file remain unaffected.

**Tip:** You can also set up folder rules in a non-Records Management site so the file versions can be automatically declared as records. For example, you could create a rule that when a file is tagged as "Confirmed", then a record will be created of that file version and added to the Records Management site. Version details will be available when looking at the record in the file preview screen on the Records Management site.

**Parent topic:**[Easy access records](../concepts/rm-easy-access.md)

