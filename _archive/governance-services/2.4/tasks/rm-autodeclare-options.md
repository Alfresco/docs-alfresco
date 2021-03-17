---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Setting auto-declare options

You can set up auto-declare option for files so that major and minor version numbers will automatically be declared as records.

Auto-declare options are set on a file by file basis, though you can set up a folder rule and apply auto-declare settings to multiple files.

1.  In the Document Library of an Alfresco site find the file you want to set auto-declare options for.

2.  Hover over the file and click **More** then **Auto-Declare Options**.

    The Set Auto-Declare Options screen opens with the default setting of **Never**.

3.  Select to automatically declare versions as records:

    -   **For major versions only**

        Each time a new major version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of your Records Management site. It's identified there as a version record by the ![Version record](../images/ico-record-version.png) icon. In its originating site it'll display the ![Major revisions](../images/ico-rm-major-revisions.png) icon, and the ![In-place record](../images/ico-rm-inplace.png) icon next to each recorded version in the Version History section of the file preview screen.

    -   **For all major and minor versions**

        Each time a new major or minor version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of your Records Management site. It's identified there as a version record by the ![Version record](../images/ico-record-version.png) icon. In its originating site it'll display the ![All revisions](../images/ico-rm-all-revisions.png) icon, and the ![In-place record](../images/ico-rm-inplace.png) icon next to each recorded version in the Version History section of the file preview screen.

4.  Click **OK** to save these settings.

    You can change the settings whenever you need to, but any records already created will be unaltered.


From this point forwards, each time a new version of the file is saved, a record is automatically created from the version and can be filed in the File Plan. You can find them in the Unfiled Records area in the File Plan explorer panel. New records display in the File Plan as incomplete records. Any required metadata needs to be added before the records can be set to complete. Version details will be available when looking at the record in the file preview screen on the Records Management site.

**Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.



**Parent topic:**[Filing in-place records](../concepts/rm-in-place.md)

