---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Classifying a record

You can classify records and apply security marks so that they can only be viewed or accessed by users who have the required security clearance.

There are four security classification levels you can assign records to. Security groups provide additional classification options.

**Note:** You can also [classify files](rm-classify-file.md) in Alfresco sites.

If a user doesn't have the required security clearance, then they won't be able to see records that have been classified. For example, if a record has been classified as Top Secret, then:

-   User 1 \(Top Secret clearance\) - can see and work with the record, following the usual [Alfresco permission rules](http://docs.alfresco.com/5.2/references/permissions_share.html)
-   User 2 \(Confidential clearance\) - doesn't see the record

To classify records:

-   You must have permissions to edit the record. This means having a Read and File permission on the record.
-   You must have been given a security clearance higher than No Clearance \(unless the record is set as Unclassified\)

You also can't classify a record higher than your own security level. So if your classification clearance is Confidential, you can't classify a record as Top Secret.

1.  In the File Plan hover over a record and select **More**, then **Classify**.

    You can classify records using both **Security Classification** and **Security Groups**. You'll only see the classification options that you have security clearance for.

2.  Select a classification from:

    -   **Top Secret**
    -   **Secret**
    -   **Confidential**
    -   **Unclassified**
    **Tip:** If you select **Unclassified** then the record will be available to all users.

3.  Enter a classification agency, for example, government or other body \(optional\).

4.  Select one or more classification reasons from the list of available reasons.

5.  You can optionally set a **Downgrade Schedule** or a **Declassification Schedule**.

    **Downgrade Schedule**

    Set a schedule for when the record will be downgraded, for example, from Top Secret to Secret. You can enter a specific date for the downgrade to take place, an event that means a downgrade should be considered, and instructions on how to carry out the downgrade. All of these are optional, but once you've entered a downgrade date, event, or both, you're required to enter instructions.

    **Declassification Schedule**

    Set a schedule for when the record will be declassified. These means setting its classification level to Unclassified. You can enter a specific date for the declassification to take place, an event that means declassification should be considered, and exemptions for when declassification shouldn't take place. All of these are optional.

    **Note:** Downgrade and declassification schedules are not automated. Any reclassification needs to be done manually.

6.  Click security marks to apply them to the record, and again to remove them.

    See [How security controls work](../concepts/rm-sc-overview.md) for more details.

7.  Click **Classify**.

    The record now displays its classification level, and can only be seen by those with the required security clearance.

    **Tip:** Records set to Unclassified with no applied security marks can be seen by all users.

    The classification reason and classification-related properties can be seen in the **Properties** when you preview the record.


**Parent topic:**[Security controls](../concepts/rm-security.md)

