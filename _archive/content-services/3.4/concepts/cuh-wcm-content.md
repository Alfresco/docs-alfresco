---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Maintaining web project content

Within a web project, you have your own space, called a *sandbox*, where you can work with your website or web application content.

In WCM, you do not need to check out content in order to work with it. When you create, import, modify, or delete a content item, Alfresco automatically locks the item to prevent editing clashes.

The lock icon displaying a padlock with a key \(![Locked by You](../images/im-lockedbyuser.png)\) indicates that you, the currently logged in user, own that lock and are permitted to perform actions on it, including edit, submit, or undo \(revert\) changes to that item. The lock icon displaying only a padlock \(![Locked by Other](../images/im-lockedbyother.png)\) indicates that the content item is currently non-editable as it is owned by another user. In this case, the **Edit** and **Delete** buttons are removed from the **Actions** list. A convenient tooltip displays the user who currently owns the lock. When another user owns a lock, a limited set of actions are available to you.

**Important:** When a locked content item needs to be made available to another user and the owner is unavailable to release the lock, a Content Manager or Administrator can unlock \(![Unlock](../images/im-unlock.png)\) the item in the user sandbox. Use this feature carefully as it does present an opportunity for conflicting edits on that item.

A content item under editorial review – and until approved or rejected – is available only for preview. Content items promoted to editorial review remain in the **Modified Items** list of the user sandbox but are locked. In this case, those items can be edited only in the context of the review or edit task itself. This prevents any user making modifications to the content underneath the reviewer.

-   **[Editing web content](../tasks/tuh-wcm-content-edit-form.md)**  
The Edit Web Content Wizard enables you to edit the content created by a web form within the same form that was used to create the content. When you save the edits, the web form renditions, if applicable, are automatically regenerated and saved.
-   **[Editing content not generated from a web form](../tasks/tuh-wcm-content-edit-nonform.md)**  
Content items not generated from a web form—content that was uploaded or imported, or HTML and plain text documents created within the project—must be edited locally on your computer.
-   **[Updating web content](../tasks/tuh-wcm-content-update.md)**  
The Update function enables you to update a file in the web project with content from your computer. The name of the content item being updated remains the same but the content is replaced.
-   **[Rolling back changes](../tasks/tuh-wcm-content-revert.md)**  
The Revert action enables you to roll back a content item to the last submitted version of the file. All changes made since the file was last submitted will be lost. If a content item has never been submitted, there is no version to revert to, so the item will be deleted.
-   **[Previewing web content](../tasks/tuh-wcm-content-preview.md)**  
The preview feature enables you check the layout and content of your web project files, and test the links, before submitting the content. You can preview both folders and individual files; you can also preview the entire website or web application.
-   **[Submitting content items](../tasks/tuh-wcm-content-submit.md)**  
Once your content item is complete, you can promote the item from your user sandbox \(My Sandbox\) to the Staging Sandbox using the Submit action.
-   **[Managing content awaiting launch](../concepts/cuh-wcm-content-tolaunch.md)**  
The **Content Awaiting Launch** list in the Staging Sandbox is a separate staging environment. Submitted and approved content is held here until a specified launch date and time, at which point it will be promoted to the Staging Sandbox as a snapshot.

**Parent topic:**[Working with Web Project Content](../concepts/cuh-wcm-webcontent.md)

