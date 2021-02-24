---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Resolving conflicts

When a conflict is detected, the submission will not complete and will appear as a conflict in the **Modified Items** list for you to correct.

When a locked item is purposely unlocked, it is possible for two versions of the same file to exist in different user sandboxes. When both are submitted to staging, being routed first through the appropriate workflow if one is defined, the file to complete submission first updates the staging store. When the second file completes submission and attempts to update the staging store, a conflict is detected.

To resolve the conflict, you must revert the conflicted content item, reapply your changes, and resubmit the item.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In the **My Sandbox** pane, click ![Expand](../images/im-expand.png) to expand the **Modified Items** list.

    Items in conflict appear highlighted in the list.

3.  In the **Modified Items** list, click ![Revert](../images/im-revert.png) **\(Revert\)** to revert a single conflicted item.

    When you revert a single item, there is no prompt to confirm the action. The item is immediately reverted to its last submitted version and cleared from the **Modified Items** list. Optionally, click **Revert all Conflicts** to revert all conflicted items at once.

4.  In your sandbox, you can now locate the reverted item, edit it as necessary, and resubmit it to staging.


**Parent topic:**[Submitting content items](../tasks/tuh-wcm-content-submit.md)

**Related information**  


[Editing web content](tuh-wcm-content-edit-form.md)

[Editing content not generated from a web form](tuh-wcm-content-edit-nonform.md)

[Submitting content items](tuh-wcm-content-submit.md)

