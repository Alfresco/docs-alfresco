---
title: Configure Digital Workspace
---

Alfresco Digital Workspace settings are in the following file `../digital-workspace/app.config.json`. You can use the file to tailor Alfresco Digital Workspace easily and without making any code changes. The file can be updated while Alfresco Digital Workspace is still running and users will see the changes once their pages are reloaded.

For more in-depth documentation about how to configure Digital Workspace, see [Application features](https://alfresco-content-app.netlify.com/#/features/){:target="_blank"}.

The following settings can be configured in `../digital-workspace/app.config.json`.

| Property/Sub-property | Description |
| --------  | ----------- |
| adf-start-process/name | The name of the process as it appears in Alfresco Process Services including the current days date and time. The default setting for this is %{processDefinition} - %{datetime}, which will produce, 'Capital Approval Process - Jun 17, 2020, 11:02:07 AM'.|
| adf-start-process/processDefinitionName | The name of the definition of the process you are using to create an instance, for example `Capital Approval Process definition`.|
| adf-versions-manager/allowComments | Toggle version comments on/off.|
| aosHost | Server address of the AOS endpoint, for example `https://repository.domain.com/alfresco/aos` **Note:** Server address has to be https.|
| application/name | Application name that will be shown in the header of the application and in the page/tab title, for example `Digital Workspace`|
| application/copyright | Copyright text shown on the login page, for example `© 2017 - 2020 Alfresco Software, Inc. All rights reserved`.|
| application/logo | Path to the logo shown in the application header for example, `assets/images/alfresco-logo-flower.svg`|
| authtype | Determines the type of authentication. To use Single Sign-on mode you must change this property to OAuth, for example `basic`. See [Single Sign-On (SSO)](https://www.alfresco.com/abn/adf/docs/core/components/login.component/#single-sign-on-sso).|
| bpmHost | Server address of Alfresco Process Services, for example `https://processservices.domain.com:port`|
| content-metadata/presets | Add custom aspects and properties to be shown in the information drawer. |
| content-metadata/custom | Add custom aspects and properties to be shown in the information drawer. |
| ecmHost | Server address of Alfresco Content Services, for example `https://repository.domain.com:port` |
| files/excluded | Restrict users from uploading certain types of files and folders by setting or extending the list of rules at the "files.excluded" path for example, ".DS_Store", "desktop.ini", "Thumbs.db", ".git" | |
| files/match-options, no case | Ensures that the exclusions are case insensitive, for example `true`. |
| files/allowDownload |Toggle downloads of versions on/off, `true` or `false`.|
| headerColor | Value for the header background color of the application, for example `#2196F3` |
| languagePicker | Enable manual language selection menu, `true` or `false`.|
| languages/key | Key for language picker menu options, for example  `en` |
| languages/label | Label to display in the language picker menu, for example, `English`|
| pagination/size | Set the default number of items to be displayed on a page, for example `25` |
| pagination/supportedPageSizes | Change the items available in the pagination control, for example `25`, `50`, `100`. |
| processService | Toggles the Alfresco Process Services plugin to be on/off, `"true"` or `"false"` **Note:** You must include the quotation marks. |
| search/include | Specify the node information returned by the API with the search results set. |
| search/sortng | Search result sorting options available, and which option is the default.|
| search/filterqueries | Specify what content should, and shouldn’t be returned in the results set.|
| search/facetFields | Allows the configuration of the search results filter options.|
| search/facetQueries | Allows the configuration of the search results filter options.|
| search/categories | Allows the configuration of the search results filter options.|
| search/aca:fields | Specify the metadata fields that will be included in search queries.|
| sidenav/preserveState | Remember the users choice of sidenav minimized or expanded, `true` or `false`.|
| sideNav/expandedSidenav | Side navigation expanded by default, `true` or `false`.|
| viewer.maxRetries | The preview mechanism used to view a file tries to open it and if its unsuccessful it waits 20 seconds and then tries again. The process involves converting the file (multiple file formats are supported depending on content type) and if it takes more than 20 seconds the system will say that the content isn't supported. This time out can be increased by adding a value for this property. If you enter 2 the wait time before time out will be 40 seconds|

## Permissions

Permissions for folders and files in the Digital Workspace can be assigned and viewed easily.
To view the permissions of a folder or file in the Digital Workspace, select the file or folder, right click it, and select **Permissions**. You are presented with the Permissions tab.

The type of permissions a user or group has for a file is determined by what role they have.

For more information on roles see [User roles and permissions]({% link content-services/latest/using/permissions.md %})

### Setting permissions

Setting permissions for folders and files allows you to manage what type of access a user has for a folder or file. From within the Permissions tab you can assign a user or a group to have a specific type of access based on what role you assign them.
> **Note:** You can also delete permissions from here by using the Bin icon next to the user or group that has permissions assigned to it.

1. From within the permissions tab use the Add icon to add a user or group.

2. Search for the user or group you want to assign access to your folder or file and then click **SELECT**.

3. Select the role you want to assign to the user or group and then click **ADD**.

    If you are assigning a role to a group you can select a different role for the administrator of that group than for the rest of the users in the group.

4. (Optional) Use the slider to allow the added users or groups to inherit the permissions from the parent folder.

## Search Configuration

The search filters that are available in the Digital Workspace can be refined and tailored to your specific needs by creating custom search forms. Each form can contain a set of filters that are relevant to a particular task or user group within your organization. You can select the most useful search form from the drop-down list on the search results page. For details on how to create and configure search forms for a more intuitive search experience see [Search Configuration Guide](https://github.com/Alfresco/alfresco-ng2-components/blob/develop/docs/user-guide/search-configuration-guide.md){:target="_blank"}.

![search]({% link digital-workspace/images/search-integration.png %})
