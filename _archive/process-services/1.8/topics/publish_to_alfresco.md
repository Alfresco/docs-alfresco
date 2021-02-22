# Publish to Alfresco

This step enables you to write a document or all documents uploaded in your process to an Alfresco Content Services repository. This can be an Alfresco Content Services on-premise repository, or Alfresco in the Cloud.

**Note:**

A user with administration privileges will need to add accounts for the Alfresco Content Services repositories that you can publish to. An administrator can add repositories on the Tenant page of the [Identity Management](identity_management.md) app. The list of repositories you can publish to is then shown on your Personal Info page. If you click on a repository, an account to access the repository is added for you.

The Publish to Alfresco step dialog contains three tabs that let you fully define the task.

Name and Description are simple text fields that help you and others to identify the task in your task list.

-   **Publish all content loaded in process**

    This is the default. All files that have been uploaded in an upload field in a form before this step are published to the specified location in the repository

-   **Publish content uploaded in field**

    If you select this option a second field Form field displays a list of form fields from all the forms in your process. You can select one from the list.

-   **Destination**

    This is the folder in an Alfresco repository to which the selected content will be published. Click Select Folder to display a dialog that lets you choose a folder from the available Alfresco repositories defined in your Alfresco Process Services app. Once you have selected a folder, the repository details and folder path are displayed in this field.

-   **Subfolder**

    If you check create or reuse subfolder, a second field **Based on field** displays a list of fields from all the forms in your process. You can select one from the list. A folder with a name based on the content of the selected field will be created or reused within the specified destination folder to publish the content selected. If you do not select this option, all the items of content will be published directly to the specified destination folder.


**Parent topic:**[Content-related steps](../topics/content_related_steps.md)

