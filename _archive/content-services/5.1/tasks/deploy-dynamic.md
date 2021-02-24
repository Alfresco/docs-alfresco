---
author: Alfresco Documentation
---

# Deploying a content model: dynamic approach

When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the content repository itself under Data Dictionary/Models.

Alfresco Share provides full access to the content repository Data Dictionary folder. Upon creating or uploading a content model XML file, the model, by default, will not be active.

1.  To activate the model:
2.  Load the model file into the folder Data Dictionary/Models.

3.  Click on **Edit Properties** for the model file.

4.  Select the **Model Active** checkbox.

5.  Click the **Save** button to save your changes.

    The model is now active.

6.  To deactivate a model:
7.  Click on **Edit Properties** for the model file.

8.  Clear the **Model Active** checkbox.

9.  Click the **Save** button to save your changes.

    The model is now inactive.

10. To delete a content model:
11. Delete the content model XML file.

    **Important:** There are restrictions on what changes you can make to a content model XML file and when you can delete a content model XML file. Only incremental additions are allowed; i.e., changes that do not require modifications to existing data in the content repository, or do not modify existing definitions and their properties. You can delete the content model only if it is not used by any data in the content repository.


**Parent topic:**[Deploying a content model](../concepts/content-model-deploy.md)

