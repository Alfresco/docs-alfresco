# Configuring Alfresco Digital Workspace

Alfresco Digital Workspace settings are in the following file ../digital-workspace/app.config.json. You can use the file to tailor Alfresco Digital Workspace easily and without making any code changes. The file can be updated while Alfresco Digital Workspace is still running and users will see the changes once their pages are reloaded.

For more in-depth documentation about how to configure Alfresco Digital Workspace, see [Application features](https://alfresco-content-app.netlify.com/#/features/).

The following settings can be configured in ../digital-workspace/app.config.json.

|Property|Sub-property|Example value|Description|
|--------|------------|-------------|-----------|
|ecmHost| |“https://repository.domain.com:port”|Server address of Alfresco Content Services.|
|baseShareUrl| |“https://appname.domain.com:port/\#/preview/s”|Server address of where shared files will be accessible from \(only required if different to the application address\).|
|authtype| |Basic|Determines the type of authentication. To use Single Sign-on mode you must change this property to OAuth. See [Single Sign-On \(SSO\)](https://www.alfresco.com/abn/adf/docs/core/components/login.component/#single-sign-on-sso).|
|aosHost| |"https://repository.domain.com/alfresco/aos"|Server address of the AOS endpoint. **Note:** Server address has to be https.

|
|application|name|“Digital Workspace”|Application name that will be shown in the header of the application and in the page/tab title.|
| |logo|“assets/images/alfresco-logo-flower.svg”|Path to the logo shown in the application header.|
| |copyright|“© 2017 - 2019 Alfresco Software, Inc. All rights reserved.”|Copyright text shown on the login page.|
|headerColor| |\#2196F3|Value for the header background color of the application.|
|languagePicker| |false|Enable manual language selection menu.|
|pagination|size|25|Set the default number of items to be displayed on a page.|
| |supportedPageSizes|25, 50, 100|Change the items available in the pagination control.|
|files|excluded|".DS\_Store", "desktop.ini", "Thumbs.db", ".git"|Restrict users from uploading certain types of files and folders by setting or extending the list of rules at the "files.excluded" path.|
| |Match-options, no case|true|Ensures that the exclusions are case insensitive.|
|adf-versions-manager|allowComments|true|Toggle version comments on/off.|
| |allowDownload|true|Toggle downloads of versions on/off.|
|sideNav|preserveState|true|Remember the users choice of sidenav minimised or expanded.|
| |expandedSidenav|true|Side navigation expanded by default.|
|languages|key|“en”|Key for language picker menu options.|
| |label|“English”|Label to display in the language picker menu.|
|content-metadata|presets| |Add custom aspects and properties to be shown in the information drawer.|
| |custom| |Add custom aspects and properties to be shown in the information drawer.|
|search|include| |Specify the node information returned by the API with the search results set.|
| |sorting| |Search result sorting options available, and which option is the default.|
| |filterQueries| |Specify what content should, and shouldn’t be returned in the results set.|
| |facetFields| |Allows the configuration of the search results filter options.|
| |facetQueries| |Allows the configuration of the search results filter options.|
| |categories| |Allows the configuration of the search results filter options.|
| |aca:fields| |Specify the metadata fields that will be included in search queries.|

**Parent topic:**[Alfresco Digital Workspace 1.1](../concepts/welcome-adw.md)

