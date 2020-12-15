---
title: Easy access records
---

In many cases you might want to create records from files that already exist in Alfresco, rather than creating a record from scratch.

With Alfresco Records Management you can declare files in non-Records Management site as records. When you create an "easy access record", a record of the file is added to the Records Management site. The file is still visible in its original site, identified by the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon, but is locked and with a limited set of actions available.

This means that most users never need to think about records, {% include tooltip.html word="fileplan" text="file plans" %}, or {% include tooltip.html word="retentionschedule" text="retention schedule" %}s. They just declare the file as a record, and the rest is handled by the Records Administrator and any rules that they've set up.

When a record is created from a file it's added to the {% include tooltip.html word="unfiledrecords" text="Unfiled Records" %} area of the Records Management site. A Records Manager then has numerous options for [Filing an unfiled record]({% link governance-services/community/using/file-records.md %}#filing-an-unfiled-record) and [Managing unfiled records]({% link governance-services/community/using/manage-fileplan.md %}#managing-unfiled-records)

There are three options available for declaring files as records:

* **Declare as Record**

    A file declared as a record is added to the Unfiled Records area, in the explorer panel of the Records Management site.

    It's still visible in its original site as an easy access record, identified by the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon, but is locked and with a limited set of actions available.

* **Declare Version as Record**

    The version of a file declared as a record is added to the Unfiled Records area, in the explorer panel of the Records Management site, and is identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon.

    It's still available in its original site, with a full set of actions available.

* **Auto-Declare Options**

    Each time a new major or minor version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of the Records Management site. It's identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon.

    It's still available in its original site, with a full set of actions available, identified by the ![Major revisions]({% link governance-services/images/ico-rm-major-revisions.png %}){:height="18px" width="18px"} major versions icon or the ![All revisions]({% link governance-services/images/ico-rm-all-revisions.png %}){:height="18px" width="18px"} all versions icon.

    >**Note:** Your Alfresco Administrator can choose to only make these options available to certain users only. If they've done this then you'll need to be a member of the RECORD_CONTRIBUTORS group for these options to be available.

    And as with standard Alfresco functionality you need to have the required permissions before you can do anything with files.

You can see version details of records created from versions in the file preview screen on the Records Management site. When records are created from versions of the same file, a relationship between the records is automatically created.

You can also classify a file and declare it as a record at a later date, and it will keep any classifications applied. See next section.

## Declaring a file as a record

You can create records from files in non-Records Management sites and add them straight into the {% include tooltip.html word="fileplan" text="File Plan" %}.

1. In the **Document Library** of an Alfresco site find the file you want to declare as a record.

2. Hover over the file and click **More** then **Declare as Record**.

    The file is added to the **Unfiled Records** area, in the explorer panel of your Records Management site. It's still visible in its original site, identified by the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon, but is locked and with a limited set of actions available.

    >**Note:** You can't declare a record if your permission level for the site is Consumer, or if the file is locked.

    A file that has been declared as a record can be deleted. The records remain in the File Plan.

This record can now be filed in the File Plan. You can find it in the **Unfiled Records** area in the File Plan explorer panel. New records display in the File Plan as incomplete records. You need to make sure any required metadata is added before you can set records to {% include tooltip.html word="recordcompleted" text="complete" %}.

>**Note:** You can also set up folder rules in a non-Records Management site so the files can be automatically declared as records. For example, you could create a rule that when a file is tagged as "Confirmed", then a record will be created of that file and added to the Records Management site.

See also video explaining [declaring a file as a record]({% link governance-services/community/tutorial/governance-services/index.md %}#declare-an-easy-access-record).  

## Declaring a file version as a record

When files are updated in Alfresco, a new version number of the file is created. You can declare one or more of these versions as records, allowing you to keep on record changes that have been made throughout the life cycle of a file.

1. In the Document Library of an Alfresco site find the file you want to declare a version of as a record.

    >**Tip:** You can see a file's version history by clicking on the file, then in the file preview screen scrolling down to the Version History section. You can revert to previous versions by clicking the ![Revert version]({% link governance-services/images/ico-revert-version.png %}){:height="18px" width="18px"} icon.

2. Hover over the file and click **More** then **Declare Version as Record**.

    The file is added to the Unfiled Records folder, in the explorer panel of your Records Management site, and is identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon. The file is still available in its original site, with a full set of actions available.

    >**Note:** You can't declare a version as a record if your permission level for the site is Consumer, or if the file is locked, or synced with an Alfresco in the Cloud site.

You can find these records in the {% include tooltip.html word="unfiledrecords" text="Unfiled Records" %} folder in the File Plan explorer panel. New records display in the File Plan as incomplete records. Any required metadata needs to be added before the records can be set to complete.

>**Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.

If you delete or destroy a record that was declared from a version, then that version is marked as deleted and can't be accessed. Other versions of the file remain unaffected.

>**Tip:** You can also set up folder rules in a non-Records Management site so the file versions can be automatically declared as records. For example, you could create a rule that when a file is tagged as "Confirmed", then a record will be created of that file version and added to the Records Management site. Version details will be available when looking at the record in the file preview screen on the Records Management site.

## Setting auto-declare options

You can set up auto-declare option for files so that major and minor version numbers will automatically be declared as records.

Auto-declare options are set on a file by file basis, though you can set up a folder rule and apply auto-declare settings to multiple files.

1. In the Document Library of an Alfresco site find the file you want to set auto-declare options for.

2. Hover over the file and click **More** then **Auto-Declare Options**.

    The Set Auto-Declare Options screen opens with the default setting of **Never**.

3. Select to automatically declare versions as records:

    * **For major versions only**

        Each time a new major version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of your Records Management site. It's identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon. In its originating site it'll display the ![Major revisions]({% link governance-services/images/ico-rm-major-revisions.png %}){:height="18px" width="18px"} icon, and the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon next to each recorded version in the Version History section of the file preview screen.

    * **For all major and minor versions**

        Each time a new major or minor version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of your Records Management site. It's identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon. In its originating site it'll display the ![All revisions]({% link governance-services/images/ico-rm-all-revisions.png %}){:height="18px" width="18px"} icon, and the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon next to each recorded version in the Version History section of the file preview screen.

4. Click **OK** to save these settings.

    You can change the settings whenever you need to, but any records already created will be unaltered.

From this point forwards, each time a new version of the file is saved, a record is automatically created from the version and can be filed in the File Plan. You can find them in the Unfiled Records area in the File Plan explorer panel. New records display in the File Plan as incomplete records. Any required metadata needs to be added before the records can be set to complete. Version details will be available when looking at the record in the file preview screen on the Records Management site.

>**Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.

## Moving easy access records

Although easy access records have most of their options removed, you can still move them to a different place in their originating site.

This can be useful if you want to keep files that have been declared as records in a dedicated part of a site.

1. In the Document Library of an Alfresco site find a file that's been declared as a record.

2. Hover over the file and select **Move Record**.

3. Choose the folder where you want to place the content.

    Files that have been declared as records can be moved to anywhere in their current site, but cannot be moved to a different site.

4. Click **Move**.

    The file is moved to it's new location in the site. The record of the file in the Records Management site is unaffected.

## Hiding easy access records

Once a file has been declared as a record, you have the option to hide it from its originating site.

This can help to avoid any confusion with site members trying to work with files that have been declared as records.

Once hidden, the record created from the file is available as usual in the Records Management site, but in its originating site it's no longer available in the document library.

1. In the Document Library of an Alfresco site find a file that's been declared as a record.

2. Hover over the file and select **Hide Record**.

3. Click **OK** to confirm that you want to hide the record.

    The record's now hidden from the Document Library. Once a record has been hidden it can't be unhidden. If a record is rejected from the Records Management site then it will become visible again with a warning that it's been rejected.

## Rejected records

After you've created a record from a file, the Records Manager has the option to reject the record from the Records Management site.

If they reject the record then the original file will display a warning that it's a **Rejected Record**. At this point the options to declare the file as a record aren't available. You can:

* Click ![Rejected record reason]({% link governance-services/images/ico-rm-rejectreason.png %}){:height="18px" width="18px"} to view the reason why the record was rejected.
* Click ![Remove rejected warning]({% link governance-services/images/ico-delete.png %}){:height="18px" width="18px"} to remove the rejection warning. The options to declare the file as a record are now available again.
