---
title: Configure Digital Workspace
---
Alfresco Digital Workspace settings are in the following file ../digital-workspace/app.config.json. You can use the file to tailor Alfresco Digital Workspace easily and without making any code changes. The file can be updated while Alfresco Digital Workspace is still running and users will see the changes once their pages are reloaded.

For more in-depth documentation about how to configure Digital Workspace, see [Application features](https://alfresco-content-app.netlify.com/#/features/).

The following settings can be configured in ../digital-workspace/app.config.json.

| Property | Sub-property | Example value | Description |
| -------- | ------------ | ------------- | ----------- |
| `adf-start-process` | `name` |The default setting for this is `%{processDefinition} - %{datetime}`, which will produce, 'Capital Approval Process - Jun 17, 2020, 11:02:07 AM'.|The name of the process as it appears in Alfresco Process Services including the current days date and time. |
| |`processDefinitionName`|Capital Approval Process definition.|The name of the definition of the process you are using to create an instance.|
|`adf-versions-manager`|`allowComments`|`true`|Toggle version comments on/off.|
|`aosHost`| |"https://repository.domain.com/alfresco/aos"**Note:** Server address has to be https.|Server address of the AOS endpoint.|



|`application`|`name`|"Digital Workspace"|Application name that will be shown in the header of the application and in the page/tab title.|


| |`copyright`|"© 2017 - 2020 Alfresco Software, Inc. All rights reserved."|Copyright text shown on the login page.|
| |`logo`|"assets/images/alfresco-logo-flower.svg"|Path to the logo shown in the application header.|
|`authtype`| |`Basic`|Determines the type of authentication. To use Single Sign-on mode you must change this property to OAuth. See [Single Sign-On (SSO)](https://www.alfresco.com/abn/adf/docs/core/components/login.component/#single-sign-on-sso).|
|`bpmHost`| |"https://processservices.domain.com:port"|Server address of Alfresco Process Services.|
|`content-metadata`|`presets`| |Add custom aspects and properties to be shown in the information drawer.|
| |`custom`| |Add custom aspects and properties to be shown in the information drawer.|
|`ecmHost`| |"https://repository.domain.com:port"|Server address of Alfresco Content Services.|
|`files`|`excluded`|".DS\_Store", "desktop.ini", "Thumbs.db", ".git"|Restrict users from uploading certain types of files and folders by setting or extending the list of rules at the "files.excluded" path.|
| |`Match-options, no case`|`true`|Ensures that the exclusions are case insensitive.|
| |`allowDownload`|`true`|Toggle downloads of versions on/off.|
|`headerColor`| |\#2196F3|Value for the header background color of the application.|
|`languagePicker`| |`false`|Enable manual language selection menu.|
|`languages`|`key`|"en"|Key for language picker menu options.|
| |`label`|"English"|Label to display in the language picker menu.|
|`pagination`|`size`|25|Set the default number of items to be displayed on a page.|
| |`supportedPageSizes`|25, 50, 100|Change the items available in the pagination control.|
|`processService`| |`"true"` > **Note:** You must include the quotation marks.|Toggles the Alfresco Process Services plugin to be on/off.|
|`search`|`include`| |Specify the node information returned by the API with the search results set.|
| |`sorting`| |Search result sorting options available, and which option is the default.|
| |`filterQueries`| |Specify what content should, and shouldn’t be returned in the results set.|
| |`facetFields`| |Allows the configuration of the search results filter options.|
| |`facetQueries`| |Allows the configuration of the search results filter options.|
| |`categories`| |Allows the configuration of the search results filter options.|
| |`aca:fields`| |Specify the metadata fields that will be included in search queries.|
|`sideNav`|`preserveState`|`true`|Remember the users choice of sidenav minimized or expanded.|
| |`expandedSidenav`|`true`|Side navigation expanded by default.|
|`viewer.maxRetries`| |2|The preview mechanism used to view a file tries to open it and if its unsuccessful it waits 20 seconds and then tries again. The process involves converting the file (multiple file formats are supported depending on content type) and if it takes more than 20 seconds the system will say that the content isn't supported. This time out can be increased by adding a value for this property. If you enter 2 the wait time before time out will be 40 seconds.|



| Property/Sub-property | Description | Example value |
| --------  | ----------- | ---- | --------- |
| `adf-start-process/name` | The name of the process as it appears in Alfresco Process Services including the current days date and time. | The default setting for this is `%{processDefinition} - %{datetime}`, which will produce, 'Capital Approval Process - Jun 17, 2020, 11:02:07 AM'. | 
| `adf-start-process/processDefinitionName` | The name of the definition of the process you are using to create an instance. | Capital Approval Process definition. |
| `adf-versions-manager/allowComments` | Toggle version comments on/off. | `true` |
| `aosHost` | Server address of the AOS endpoint. | "https://repository.domain.com/alfresco/aos"**Note:** Server address has to be https. |
| `application/name` | Application name that will be shown in the header of the application and in the page/tab title. | "Digital Workspace" |
| `application/copyright` | Copyright text shown on the login page. | "© 2017 - 2020 Alfresco Software, Inc. All rights reserved. | 
| `application/logo` | Path to the logo shown in the application header. | "assets/images/alfresco-logo-flower.svg" |
| `authtype` | Determines the type of authentication. To use Single Sign-on mode you must change this property to OAuth. See [Single Sign-On (SSO)](https://www.alfresco.com/abn/adf/docs/core/components/login.component/#single-sign-on-sso). | `basic` |
| `bpmHost` | Server address of Alfresco Process Services. | "https://processservices.domain.com:port" | 
| `content-metadata/presets` | |Add custom aspects and properties to be shown in the information drawer. |  |
| `custom` | *Optional.* The label for the `Sign Here` box in the document | String | 
| `ecmHost` | Server address of Alfresco Content Services. | "https://repository.domain.com:port" |
`| files/excluded` | ".DS\_Store", "desktop.ini", "Thumbs.db", ".git"|Restrict users from uploading certain types of files and folders by setting or extending the list of rules at the "files.excluded" path. | | 
| `files/match-options, no case` | Ensures that the exclusions are case insensitive. | `true` |
| `files/allowDownload` | Toggle downloads of versions on/off. | `true` | 
| `headerColor` | Value for the header background color of the application. | #2196F3 |
| `languagePicker` | Enable manual language selection menu. | `false` | 
| `languages/key` | Key for language picker menu options. | "en" |
| `languages/label` | Label to display in the language picker menu. | "English" | 
| `pagination/size` | Set the default number of items to be displayed on a page. | 25 |
| `pagination/supportedPageSizes` | Change the items available in the pagination control. | 25, 50, 100 | 
| `processService` | Toggles the Alfresco Process Services plugin to be on/off. | `"true"` > **Note:** You must include the quotation marks. |
| `search/include` | Specify the node information returned by the API with the search results set. | | 
| `search/sortng` | Search result sorting options available, and which option is the default. | |
| `search/filterqueries` | Specify what content should, and shouldn’t be returned in the results set. | | 
| `search/facetFields` | |Allows the configuration of the search results filter options. |  |
| `search/facetQueries` | |Allows the configuration of the search results filter options. | | 
| `search/categories` | |Allows the configuration of the search results filter options. | |
| `search/aca:fields` | Specify the metadata fields that will be included in search queries. | | 
| `sidenav/preserveState` | Remember the users choice of sidenav minimized or expanded. | `true` |
| `sideNav/expandedSidenav` | Side navigation expanded by default. | `true` | 
| `viewer.maxRetries` | The preview mechanism used to view a file tries to open it and if its unsuccessful it waits 20 seconds and then tries again. The process involves converting the file (multiple file formats are supported depending on content type) and if it takes more than 20 seconds the system will say that the content isn't supported. This time out can be increased by adding a value for this property. If you enter 2 the wait time before time out will be 40 seconds. | 2 |