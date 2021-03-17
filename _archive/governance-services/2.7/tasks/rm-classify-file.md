---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Classifying files and folders

You can classify files and folders and apply security marks so that they can only be viewed or accessed by users who have the required security clearance.

There are four security classification levels you can assign. Security groups provide additional classification options.

**Note:** You can also [classify records](rm-classify-record.md) in the File Plan.

See [Classification rules and tips](../references/rm-classification-tips.md) for more on classifying content.

You can autoclassify by by adding instructions, manually apply classifications and security marks, or both.

1.  In the Document Library of an Alfresco site hover over a file or folder and select **More**, then **Classify**.

    You can classify using both **Security Classification** and **Security Groups**. You'll only see the classification options that you have security clearance for.

2.  **To autoclassify:**
3.  Click **Add Instructions**.

4.  Click on a guide to view its topics.

5.  Click ![Add instructions](../images/ico-instructions-action.png) next to the topic you want to apply instructions from then click **Select**.

    **Tip:** You can click **View** to check what classification level and security marks the topic instructions contain.

6.  Repeat for as many topics as you want to add.

7.  Click **Apply**.

    All the topics you've selected will have their instructions applied to the item you're classifying.

    **Tip:** If topics contain instructions that clash then the higher level of classification will apply. For example if you add two topics, one with a classification level of Top Secret, and one with Secret, then the Top Secret level will apply.

8.  **To add Other Classification Source References**

    **Note:** This step is not required to classify an item.

9.  Enter the name of the source document from which the classification of the item has been derived.

10. Enter the name of the organization that produced the document.

11. Enter the publication date of the document.

12. **To manually add classifications and security marks:**
13. If you want to classify a folder and its contents, select **Apply Classification to Folder Contents**.

    This option is only visible when classifying a folder. Only the top level folder and its immediate children are classified and only the metadata of the parent is carried over to the children. If a new child object is added at a later date it does not inherit the properties of its parent.

14. Select a classification from:

    -   **Top Secret**
    -   **Secret**
    -   **Confidential**
    -   **Unclassified**
    **Tip:** If you select **Unclassified** then the item will be available to all users.

15. Enter a classification agency, for example, government or other body \(optional\).

16. Select one or more classification reasons from the list of available reasons.

17. You can optionally set a **Downgrade Schedule** or a **Declassification Schedule**.

    **Downgrade Schedule**

    Set a schedule for when the item will be downgraded, for example, from Top Secret to Secret. You can enter a specific date for the downgrade to take place, an event that means a downgrade should be considered, and instructions on how to carry out the downgrade. All of these are optional, but once you've entered a downgrade date, event, or both, you're required to enter instructions.

    **Declassification Schedule**

    Set a schedule for when the file will be declassified. These means when its classification level will be set to Unclassified. You can enter a specific date for the declassification to take place, an event that means declassification should be considered, and exemptions for when declassification shouldn't take place. All of these are optional.

    **Note:** Downgrade and declassification schedules are not automated. Any reclassification needs to be done manually.

18. Click security marks to apply them to the item, and again to remove them.

    See [How security controls work](../concepts/rm-sc-overview.md) for more details.

19. Click **Classify**.

    The item now displays its classification level, and can only be seen by those with the required security clearance.

    **Tip:** Items set to Unclassified with no applied security marks can be seen by all users.

    The option to **Share** the file is no longer available for Top Secret, Secret, or Confidential items. When a file or folder is declared as a record it retains its classification level and any security marks.

    The classification reason and classification-related properties can be seen in the **Properties** when you preview the file.

    **Note:** When you classify a file it isn't added to the Records Management site File Plan. If you want to create a record from it you still need to [declare the file as a record](rm-create-record.md).

    If you delete a classified file then it's permanently deleted and isn't available in your Trashcan. If you delete a classified folder then all of its content is permanently deleted, even items that haven't been directly classified themselves.


**Parent topic:**[Easy access records](../concepts/rm-easy-access.md)

