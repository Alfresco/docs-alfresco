---
author: Alfresco Documentation
---

# Deploying a content model - dynamic approach

When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the content repository itself under Company Home/Data Dictionary/Models.

Alfresco Explorer provides full access to the Alfresco content repository Data Dictionary folder. Upon creating or uploading a content model XML file, the model, by default, will not be active.

1.  To activate a model and auto-register it with the content repository:

    1.  Select the **View Details** option for the XML file.

    2.  Select the **Modify** icon on the Properties pane.

    3.  On the Modify Content Properties page, enable **Model Active**.

        **Note:** If you are uploading the model file you will need to select a file type of `Content`, otherwise the **Model Active** checkbox will not appear.

2.  To update a content model, edit its XML and save via Alfresco Explorer.

    If the model is active, the content repository will automatically register the changes with the content repository on save. If the content model XML file is checked out, the working copy will be ignored until it is checked in.

3.  To deactivate a model:

    1.  Select the **View Details** option for the content model XML file.

    2.  Select the **Modify** icon on the Properties pane.

    3.  On the Modify Content Properties page, disable **Model Active**.

4.  To remove a content model completely, delete the content model XML file.

    **Important:** There are restrictions on what changes you can make to a content model XML file and when you can delete a content model XML file. Only incremental additions are allowed; i.e., changes that do not require modifications to existing data in the content repository, or do not modify existing definitions and their properties. You can delete the content model only if it is not used by any data in the content repository.


**Parent topic:**[Deploying a content model](../concepts/content-model-deploy.md)

