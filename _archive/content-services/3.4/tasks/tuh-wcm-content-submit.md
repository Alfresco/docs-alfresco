---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Submitting content items

Once your content item is complete, you can promote the item from your user sandbox \(My Sandbox\) to the Staging Sandbox using the Submit action.

When no workflow is defined, the content is immediately promoted to the Staging Sandbox.

When workflow is defined for a content item, promoting the content first routes it through the workflow. In this case, the content must be approved by the appropriate reviewer\(s\) before being promoted to the Staging Sandbox.

**Note:** Once a content item enters the editorial review process, it is no longer editable in the **Modified Items** list, even though you may own the lock on that item. The content item is now available only for preview.

As part of submission, you have the option to set a launch date and time for the content set. Upon approval, the content set will be promoted to a separate staging area: the **Content Awaiting Launch** list in the Staging Sandbox. The content is held here until the launch date. See [Content Launch and Expiration](../concepts/cuh-wcm-intro.md) for further information.

The end result of the **Submit** action is a snapshot in the Staging Sandbox: an archive of the current version of the site.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In the **My Sandbox** pane, click ![Expand](../images/im-expand.png) to expand the **Modified Items** list, which displays content items that can be submitted to the Staging Sandbox.

    You can submit a single content item, a group of selected content items, or all content items.

3.  In the **Modified Items** list, select the content item\(s\) to submit, as follows:

    1.  To submit a single content item, click ![Submit](../images/im-submit.png) **\(Submit\)** for that content item.

    2.  To submit multiple content items, enable the check box for each item you want to submit and click **Submit Selected** at the top of the **Modified Items** list. Click the topmost check box to select all items in the list. Click an enabled check box to deselect it.

    3.  To submit all content items, select **Submit All** in the top right corner of your user sandbox.

4.  On the **Submit Items** page, enter a **Label** and **Description** for the submission. This information is displayed as the snapshot name and description in the Staging Sandbox.

5.  Select the **Auto Deploy** feature if you want to automatically deploy the content to the configured live server\(s\) once it has been approved within its workflow. The content will be deployed only to those servers that have the **Include In Auto Deploy** option enabled.

6.  In the Workflow section, click **Configure Workflow** to display the workflow that will be applied to the content item\(s\). The workflow defined at this point overrides the workflow set at both the web form and web project level. If necessary, edit the workflow as follows.

    1.  In the **Type of Review** list, select **Serial** or **Parallel**.

        Select **Serial** to allow only one reviewer to review the file at a time. Once the first review is complete, the file is passed to the next reviewer in the chain. Select **Parallel** to allow several reviewers to review the file simultaneously.

        In a parallel review, the content is read-only for the reviewers. You must select **Serial** to allow the reviewers to edit the content themselves.

    2.  In the search box, type the full or partial name of the user you want to add and click **Search**.

        Leave the search box empty and click **Search** to return a list of all users. Selecting to display all users may take some time if there are many users in the system.

    3.  In the results list, click to select the user to add and click **Add to List**.

        If the review is to be serial, you must add the users in the order in which you wish them to perform the review. If the review is to be parallel, the order does not matter. In this case, use SHIFT to select multiple, consecutive users from the list and use CTRL to select multiple, non-consecutive users.

    4.  Repeat this process to add all desired users to the list.

        Click ![Remove](../images/im-delete.png) **\(Remove\)** to remove a user from the list.

    5.  Click **OK** to save the configuration and return to the Submit Items page.

7.  Optionally, when the **Content Launch** section is displayed, use the date and time controls to set the date \(day, month, year\) and time \(hours, minutes\) at which all content listed in the **Modified Items** list will be launched to the Staging Sandbox. Until that time, the content will reside in the **Content Awaiting Launch** section.

    -   Click **None** to display the date and time controls, if they are not already displayed.
    -   Click **Today** to display the current date and time.
    -   Click **None** to clear any set launch date.
8.  In the **Content Expiration** section, use the date and time controls to set the date \(day, month, year\) and time \(hours, minutes\) at which all content listed in the **Modified Items** list will expire.

    -   Click **Set expiration date for all modified items** to display the controls, if they are not already displayed.
    -   Click **Today** and then **Apply To All** to set the expiration date for all content listed to the current day and time.
    -   Click **None** and then **Apply To All** to clear any set expiration dates in the **Modified Items** list.
9.  In the **Modified Items** section, confirm the content items you are promoting to staging. Although part of a content set, you can preview and change expiration dates for individual items.

    -   Click ![Preview File](../images/im-preview.png) **\(Preview File\)** to display the selected file in a separate browser window.
    -   Click ![Change Expiration Date](../images/im-expiredate.png) **\(Change Expiration Date\)** to display the Change Expiration Date page. Click **None** to display the date and time controls, if they are not already displayed. If an expiration date is already set, edit it as desired. Click **Today** to display the current day and time; click **None** to clear the expiration date. Click **OK** to save the changes.
10. On the Submit Items page, click **OK** to promote the content as specified.

    As the submit action runs in the background, the submitted items remain in the **Modified Items** list until the submission process is complete.


-   **[Resolving conflicts](../tasks/tuh-wcm-conflict-resolve.md)**  
When a conflict is detected, the submission will not complete and will appear as a conflict in the **Modified Items** list for you to correct.
-   **[Comparing snapshots](../tasks/tuh-wcm-snapshot-compare.md)**  
The **Recent Snapshots** list enables you to compare the content of one snapshot against another within the same web project and compute a list of files that are different between the two snapshots.

**Parent topic:**[Maintaining web project content](../concepts/cuh-wcm-content.md)

