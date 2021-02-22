---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Classifying a file

You can classify files and apply security marks so that they can only be viewed or accessed by users who have the required security clearance.

There are four default classification levels you can assign files to. Security groups provide additional classification options.

**Note:** You can also [classify records](rm-classify-record.md) in the File Plan.

If a user doesn't have the required security clearance, then they won't be able to see files that have been classified. For example, if a file has been classified as Top Secret, then:

-   User 1 \(Top Secret clearance\) - can see and work with the file, following the usual [Alfresco permission rules](http://docs.alfresco.com/5.2/references/permissions_share.html)
-   User 2 \(Confidential clearance\) - doesn't see the file

To classify files:

-   You must have permissions to edit the file. Usually this means having a site role of Contributor or higher to classify your own content and Collaborator or higher to classify other's content.
-   You must have been given a security clearance higher than No Clearance \(unless the file is set as Unclassified\)

You also can't classify a file higher than your own security level. So if your classification clearance is Confidential, you can't classify a file as Top Secret.

1.  In the Document Library of an Alfresco site hover over a file and select **More**, then **Classify**.

    You can classify files using both **Security Classification** and **Security Groups**. You'll only see the classification options that you have security clearance for.

2.  Select a classification from:

    -   **Top Secret**
    -   **Secret**
    -   **Confidential**
    -   **Unclassified**
    **Tip:** If you select **Unclassified** then the file will be available to all users.

3.  Enter a classification agency, for example, government or other body \(optional\).

4.  Select one or more classification reasons from the list of available reasons.

5.  You can optionally set a **Downgrade Schedule** or a **Declassification Schedule**.

    **Downgrade Schedule**

    Set a schedule for when the file will be downgraded, for example, from Top Secret to Secret. You can enter a specific date for the downgrade to take place, an event that means a downgrade should be considered, and instructions on how to carry out the downgrade. All of these are optional, but once you've entered a downgrade date, event, or both, you're required to enter instructions.

    **Declassification Schedule**

    Set a schedule for when the file will be declassified. These means setting its classification level to Unclassified. You can enter a specific date for the declassification to take place, an event that means declassification should be considered, and exemptions for when declassification shouldn't take place. All of these are optional.

    **Note:** Downgrade and declassification schedules are not automated. Any reclassification needs to be done manually.

6.  Click security marks to apply them to the file, and again to remove them.

    See [How security controls work](../concepts/rm-sc-overview.md) for more details.

7.  Click **Classify**.

    The file now displays its classification level, and can only be seen by those with the required security clearance.

    **Tip:** Files set to Unclassified with no applied security marks can be seen by all users.

    The option to **Share** the file is no longer available for Top Secret, Secret, or Confidential files. When the file is declared as a record it retains its classification level and any security marks.

    The classification reason and classification-related properties can be seen in the **Properties** when you preview the file.

    **Note:** When you classify a file it isn't added to the Records Management site File Plan. If you want to create a record from it you still need to [declare the file as a record](rm-create-record.md).

    If you delete a classified file then it's permanently deleted and isn't available in your Trashcan.


**Parent topic:**[Easy access records](../concepts/rm-easy-access.md)

