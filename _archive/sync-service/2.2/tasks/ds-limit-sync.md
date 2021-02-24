---
author: Alfresco Documentation
---

# Limiting folder synchronization

If you're an IT administrator, you can prevent folders being synchronized from the repository to Desktop Sync clients. This allows you to have granular control over the content that your Desktop Sync users can access on their desktops.

The main stages for this configuration are: create a custom model with an associated aspect, create a folder rule in Alfresco Share to automatically apply the aspect to new content, add the aspect to existing content, and then update the configuration in Alfresco Content Services.

1.  Create a custom model from the **Model Manager** in Alfresco Share **Admin Tools**.

    Follow the steps in [Creating a new model](https://docs.alfresco.com/5.2/tasks/admintools-custom-model-create.html).

    Note that you don't need to create a property for the custom model.

2.  Click the model name to start creating an associated aspect.

    Follow the steps for [Creating new aspects](https://docs.alfresco.com/5.2/tasks/admintools-custom-type-create.html).

    Add a **Display Label** for the aspect so you can identify it in Alfresco Share later.

3.  Activate the custom model.

    1.  Click **<< Show Models** to return to the list of models.

    2.  Click **Actions** and then select **Activate**.

    The status is now **Active**. Active models can be used by your end users, and any custom aspects defined within the model can be applied to folders and files.

4.  Access a site in the repository and view the folder within that site that you don't want to be synced.

    For example, you may choose not to sync the **documentLibrary** folder.

5.  Create a folder rule that applies the aspect to newly created and updated content.

    Follow the steps in [Creating a rule](https://docs.alfresco.com/5.2/tasks/library-folder-rules-define-create.html).

    Make sure you select the **Rule applies to subfolders** check box, so that the new aspect is automatically applied to new content added to the current folder and subfolders.

    See [Applying rules to folders](https://docs.alfresco.com/5.2/concepts/library-folder-rules.html) for more details.

6.  Update the following property in `alfresco-global.properties` to include your custom model and aspect:

    ```
    dsync.filter.aspects=cm:workingcopy, ${dsync.filter.aspects.smartFolder}, <your_model>:<your_aspect>
    ```

    where:

    -   `<your_model>` specifies the model name created in step [1](#1)
    -   `<your_aspect>` specifies the aspect name created in step [2](#2)
7.  Restart Alfresco Content Services.


**Note:** Apply the new aspect to all existing content in the folder, and subfolders. Adding an aspect manually to existing folders doesn't cascade the extra functionality down the hierarchy. See [Applying aspects](https://docs.alfresco.com/5.2/tasks/library-item-manage-aspects.html) for more details.

**Important:** Applying this property after users have synchronized folders and files won't automatically remove their existing synced content.

**Parent topic:**[Administering Sync Service](../concepts/desktop-sync.md)

