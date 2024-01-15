---
title: Easy access records
---

In many cases you might want to create records from files that already exist in Alfresco, rather than 
creating a record from scratch.

With Alfresco Records Management you can declare files in non-Records Management site as records. When you create an 
"easy access record", a record of the file is added to the Records Management site. The file is still visible in its 
original site, identified by the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon, 
but is locked and with a limited set of actions available.

This means that most users never need to think about records, {% include tooltip.html word="fileplan" text="file plans" %}, 
or {% include tooltip.html word="retentionschedule" text="retention schedule" %}s. They just declare the 
file as a record, and the rest is handled by the Records Administrator and any rules that they've set up.

When a record is created from a file it's added to the {% include tooltip.html word="unfiledrecords" text="Unfiled Records" %} 
area of the Records Management site. 
A Records Manager then has numerous options for [Filing an unfiled record]({% link governance-services/7.4/using/file-records.md %}#filing-an-unfiled-record) and 
[Managing unfiled records]({% link governance-services/7.4/using/manage-fileplan.md %}#managing-unfiled-records)

There are three options available for declaring files as records:

* **File as Record**

    Use File as Record to declare records from files in non-Governance Services sites and then select a destination folder where they will be filed as a record.

    > **Note:** You don't have to select a destination folder and if you don't the created record can be found in the unfiled records area.

* **File Version as Record**

    Use File Version as Record to create a record from a version of a file and then to select a destination folder where the version will be filed as a record.

    > **Note:** You don't have to select a destination folder and if you don't the created record can be found in the unfiled records area.

* **Auto-Declare Options**

    Each time a new major or minor version of the file is created, the version is declared as a record and added to the Unfiled Records area, in the explorer panel of the Records Management site. It's identified there as a version record by the ![Version record]({% link governance-services/images/ico-record-version.png %}){:height="18px" width="18px"} icon.

    It's still available in its original site, with a full set of actions available, identified by the ![Major revisions]({% link governance-services/images/ico-rm-major-revisions.png %}){:height="18px" width="18px"} major versions icon or the ![All revisions]({% link governance-services/images/ico-rm-all-revisions.png %}){:height="18px" width="18px"} all versions icon.

    > **Note:** Your Alfresco Administrator can choose to only make these options available to certain users only. If they've done this then you'll need to be a member of the RECORD_CONTRIBUTORS group for these options to be available.

    And as with standard Alfresco functionality you need to have the required permissions before you can do anything with files.


You can see version details of records created from versions in the file preview screen on the Records Management site. 
When records are created from versions of the same file, a relationship between the records is automatically created.

You can also classify a file and declare it as a record at a later date, and it will keep 
any classifications applied. See next section.

## Classifying files and folders

You can classify files and folders and apply {% include tooltip.html word="securitymark" text="security mark" %}s so that they can only be viewed or accessed by users who 
have the required {% include tooltip.html word="securityclassification" text="security classification" %}.

There are four security classification levels you can assign. {% include tooltip.html word="securitygroups" text="Security groups" %} provide additional classification options.

> **Note:** You can also [classify records]({% link governance-services/7.4/using/smc.md %}#classifyrecordsfolderscategories) in the File Plan.

See [Classification rules and tips]({% link governance-services/7.4/using/smc.md %}#classification-rules-and-tips) for more on classifying content.

You can autoclassify by by adding instructions, manually apply classifications and security marks, or both.

1. In the Document Library of an Alfresco site hover over a file or folder and select **More**, then **Classify**.

   You can classify using both **Security Classification** and **Security Groups**. You'll only see the classification options that you have security clearance for.

2. **To autoclassify:**

3. Click **Add Instructions**.

4. Click on a guide to view its topics.

5. Click ![Add instructions]({% link governance-services/images/ico-instructions-action.png %}){:height="18px" width="18px"} next to the topic you want to apply instructions from then click **Select**.

   > **Tip:** You can click **View** to check what classification level and security marks the topic instructions contain.

6. Repeat for as many topics as you want to add.

7. Click **Apply**.

    All the topics you've selected will have their instructions applied to the item you're classifying.

    > **Tip:** If topics contain instructions that clash then the higher level of classification will apply. For example if you add two topics, one with a classification level of Top Secret, and one with Secret, then the Top Secret level will apply.

8. **To add Other Classification Source References**

   > **Note:** This step is not required to classify an item.

9. Enter the name of the source document from which the classification of the item has been derived.

10. Enter the name of the organization that produced the document.

11. Enter the {% include tooltip.html word="fileplan" text="File Plan" %} of the document.

12. **To manually add classifications and security marks:**

13. If you want to classify a folder and its contents, select **Apply Classification to Folder Contents**.

    This option is only visible when classifying a folder. Only the top level folder and its immediate children are classified and only the metadata of the parent is carried over to the children. If a new child object is added at a later date it does not inherit the properties of its parent.

14. Select a classification from:

    * **Top Secret**
    * **Secret**
    * **Confidential**
    * **Unclassified**
    
    > **Tip:** If you select **Unclassified** then the item will be available to all users.

15. Enter a classification agency, for example, government or other body (optional).

16. Select one or more classification reasons from the list of available reasons.

17. You can optionally set a **Downgrade Schedule** or a **Declassification Schedule**.

    **Downgrade Schedule**

    Set a schedule for when the item will be downgraded, for example, from Top Secret to Secret. You can enter a specific date for the downgrade to take place, an event that means a downgrade should be considered, and instructions on how to carry out the downgrade. All of these are optional, but once you've entered a downgrade date, event, or both, you're required to enter instructions.

    **Declassification Schedule**

    Set a schedule for when the file will be declassified. These means when its classification level will be set to Unclassified. You can enter a specific date for the declassification to take place, an event that means declassification should be considered, and exemptions for when declassification shouldn't take place. All of these are optional.

    > **Note:** Downgrade and declassification schedules are not automated. Any reclassification needs to be done manually.

18. Click security marks to apply them to the item, and again to remove them.

    You cannot use security marks you do not posses when classifying content, unless you also use a security mark you do posses from the same group. If you have a security mark from a security group 'any' then you can view and assign all other marks from that group. When using marks (either when Classifying Content or creating Instructions) that you don't posses, you must include a mark from the same group to avoid losing access to the content. An error will appear if you attempt to create an instruction using only a mark you don't have, or have not included a mark from the same group.

    See [How security controls work]({% link governance-services/7.4/using/smc.md %}#how-security-controls-work) for more details.

19. Click **Classify**.

    The item now displays its classification level, and can only be seen by those with the required {% include tooltip.html word="securityclassification" text="security classification" %}.

    > **Tip:** Items set to Unclassified with no applied security marks can be seen by all users.

    The option to **Share** the file is no longer available for Top Secret, Secret, or Confidential items. When a file or folder is declared as a record it retains its classification level and any security marks.

    The classification reason and classification-related properties can be seen in the **Properties** when you preview the file.

    > **Note:** When you classify a file it isn't added to the Records Management site File Plan. If you want to create a record from it you still need to [declare the file as a record](#declaring-a-file-as-a-record)

    If you delete a classified file then it's permanently deleted and isn't available in your Trashcan. If you delete a classified folder then all of its content is permanently deleted, even items that haven't been directly classified themselves.

## File as Record

You can create records from files in non-Governance Services sites and select the destination folder where they will be filed as a record.

1. In the Document Library of an Alfresco site find the file you want to declare as a record and file to a specific location.

2. Hover over the file and click **More** then **File as Record**.

3. Select where you want to file the record.

4. Click **Declare and File**.

   The file is added to the chosen destination folder in your Governance Services site. It's still visible in the original site, identified by the ![Easy access record]({% link governance-services/images/ico-rm-inplace.png %}){:height="18px" width="18px"} icon, but is locked and has a limited set of actions.
    
   > **Note:** If the file is locked, you won't see the **File as Record** action. A file that has been filed as a record can be deleted but the record remains in the File Plan.

## File version as a record

When files are updated in Alfresco, a new version number of the file is created. You can declare one or more of these 
versions as records, allowing you to keep a record of the changes that have been made throughout the life cycle of a file.

1.  In the Document Library of an Alfresco site find the file you want to file a version of as a record.

    > **Tip:** You can see a file's version history by clicking on the file, then in the file preview screen scrolling down to the Version History section. You can revert to previous versions by clicking the ![Revert version]({% link governance-services/images/ico-revert-version.png %}){:height="18px" width="18px"} icon.

2.  Hover over the file and click **More** then **File Version as Record**. Select a location where you would like to file the record.

    You don't have to select a destination folder and if you don't the created record can be found in the unfiled records area.

    > **Note:** If the file is locked or synced with an Alfresco in the Cloud site you won't see the **File version as Record** action. A file that has been filed as a record can be deleted but the record remains in the File Plan.

You can find these records in the {% include tooltip.html word="unfiledrecords" text="Unfiled Records" %} folder in the File Plan explorer panel. New records display in the 
File Plan as incomplete records. Any required metadata needs to be added before the records can be set to complete.

> **Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.

If you delete or destroy a record that was declared from a version, then that version is marked as deleted and can't be accessed. Other versions of the file remain unaffected.

> **Tip:** You can also set up folder rules in a non-Records Management site so the file versions can be automatically declared as records. For example, you could create a rule that when a file is tagged as "Confirmed", then a record will be created of that file version and added to the Records Management site. Version details will be available when looking at the record in the file preview screen on the Records Management site.

## Setting auto-declare options

You can set up auto-declare option for files so that major and minor version numbers will automatically be declared as records.

Auto-declare options are set on a file by file basis, though you can set up a folder rule and apply auto-declare settings 
to multiple files.

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

> **Note:** A file that has had versions declared as records can be deleted. The records remain in the File Plan.

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
