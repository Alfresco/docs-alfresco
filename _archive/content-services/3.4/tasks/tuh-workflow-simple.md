---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Implementing a simple workflow

A smart space with a defined workflow content rule generates simple workflow. In a simple workflow, a space is used to represent a step and the workflow is defined as a content rule. The rule specifies the user actions and flow of the content between the spaces. To add complexity to simple workflow you must create rules for other spaces and pass content around from space to space.

For example, you could set up rules to create a simple workflow that manages content as follows:

-   Users with the appropriate abilities can approve the content items added to the Drafts space.
-   On approval, the content is moved to a space named Pending Approval.
-   Users with the appropriate abilities can approve the content in this space.
-   On approval, the content will be moved to the Published space. If, however, the content is rejected in this step, it will be moved back to Drafts.

The content can be a document, a graphics file, a Web page, streaming media, and so on.

When a rule is created for a space, it applies to all files that are added to the space after the creation of a rule. Files residing in the space before the rule was created are not affected by the rule. You can reapply the rules to ensure the new rules apply to the existing content.

1.  Navigate to the space for which you want to create a simple workflow.

    The space header displays the name and details of the selected space.

2.  In the **More Actions** menu, click **Manage Content Rules.**

3.  On the Content Rules page, click **Create Rule**.

4.  In Step One, Select Conditions, select a condition in the **Select Condition** list and click **Set Values and Add**.

    If you select **All Items**, click **Add to List**.

5.  Depending on your selection, the Set condition values pane may appear. On this pane, set the desired conditions and click **OK**.

6.  Add as many conditions as needed and then click **Next** to proceed.

7.  In Step Two, Select Actions, select **Add simple workflow to item**and click **Set Values and Add**.

8.  In the Set action values pane, specify the **Approve Flow** and, if desired, the **Reject Flow** for the workflow being defined.

    The values provided in the **Name** boxes will be the labels for the approval and rejection actions.

    Indicate whether the content being acted on is to be moved or copied, then select a target location.

9.  Click **OK**.

    The defined workflow is summarized in Step Two.

10. Define additional actions in the same manner, if desired, and click **Next** to proceed.

11. In Step Three, Enter Details, provide information about the rule you are creating and click **Next**. Select one of the following three options as the rule type:

    -   **Items are updated**: The action occurs when content is updated in the space.
    -   **Items are deleted or leave this folder**: The action occurs when content is moved or deleted from the space.
    -   **Items are created or enter this folder**: The action occurs when content is copied, created or added to the space.
12. In Step Four, Summary, ensure all information entered is correct and click **Finish**.

13. Click **Close** to return to the current space.


**Parent topic:**[Working with workflows](../concepts/cuh-workflow-intro.md)

**Related information**  


[Working with smart spaces and content rules](../concepts/cuh-smartspaces.md)

[Reapplying rules](tuh-rules-reapply.md)

