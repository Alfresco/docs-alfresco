---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Rolling back changes

The Revert action enables you to roll back a content item to the last submitted version of the file. All changes made since the file was last submitted will be lost. If a content item has never been submitted, there is no version to revert to, so the item will be deleted.

You can perform this action on a single item, a selection of items, or all items in the **Modified Items** list in your sandbox.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In the **My Sandbox** pane, click ![Expand](../images/im-expand.png) to expand the **Modified Items** list.

3.  In the **Modified Items** list, select the content item\(s\) to revert, as follows:

    -   To revert a single content item, click ![](../images/im-revert.png) **\(Revert\)** for that content item.
    -   To revert multiple content items, enable the check box for each item you want to revert and click **Undo Selected** at the top of the **Modified Items** list. Click the topmost check box to select all items in the list. Click an enabled check box to deselect it.
    -   To revert all content items, select **Undo All** in the top right corner of your user sandbox.
    When you revert a single item, there is no prompt to confirm the action. The item is immediately reverted to its last submitted version and cleared from the **Modified Items** list.

    When you select multiple items \(**Undo Selected**, **Undo All**\), a message prompts you to confirm the action.

4.  Click **OK** if prompted to confirm the action.

    The selected files are reverted to their last submitted version. If a selected file had never been submitted to staging, it is deleted from the sandbox. All reverted files are cleared from the **Modified Items** list.


**Parent topic:**[Maintaining web project content](../concepts/cuh-wcm-content.md)

