---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring the AlfrescoClientSettings file

Use the Alfresco Client Settings XML file for advanced settings.

The AlfrescoClientSettings-2.1.0.xml file contains advanced configuration properties. Use this file to set up attributes and metadata settings.

1.  Locate and open AlfrescoClientSettings-2.1.0.xml in the C:\\Users\\<username\> directory, where <username\> is your Windows user name.

    The `<outlook>` section contains elements that you can configure to customize Alfresco Outlook Client, and also additional `<storage>`, `<connection>`, `<logging>`, `<restrictions>`, and `<tabs>` sections:

    Here is a sample configuration file:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <settings>
      <outlook format="1.0" dragPrio="document" showExplorer="true" showExplorerNew="false" defaultBrowser="true" visibleSites="public" visibleNodes="default" showEmailTooltip="false" hoverPreview="true" isSitesRoot="true" showMySites="false" folderSort="name_asc" dateSortView="subject" sendLinkUrl="details" panelViewMode="tree" searchMode="standard" mailNameDisplayPattern="" culture="en" customAppTitle="" customRibbonTitle="" customMenuTitle="">
        <connection url="http://127.0.0.1:8080/" shareUrl="share" alfrescoUrl="alfresco" login="admin" password="7DkTRpO8sfo=" checkCertificate="true" checkVersion="true" authentication="basic" webApp="2" shareAlterUrl="" settingsCheckInterval="480" />
        <logging minLevel="info" />
        <storage archiveOption="0" storeFiles="true" storeLink="true" storeMsg="false" compress="true" />
        <feature autoPaging="false" highlightTexts="false" collapsible="true" tokenAlterMode="false" messageIcon="false" saml="false" />
        <explorer-search-properties />
        <search-properties />
        <runtime explorerDock="default" explorerHeight="1278" explorerWidth="410" centralChangeDate="0001-01-01T00:00:00" centralChangeLocked="false" centralSitesRoot="false" suppressSitesScopeMessage="false" lastAlf50="true" lastPath="">
          <listView lastSortOrder="ascending">
            <columns />
          </listView>
        </runtime>
        <archiveHistory>
          <server url="http://127.0.0.1:8080/alfresco">
            <folder remotePath="/Company Home/Sites/Outlook test site" remoteId="f01c7ed9-898f-4ba3-adb9-245ee700bd85" />
          </server>
        </archiveHistory>
      </outlook>
    </settings>
    ```

2.  Configure the attributes that you need for the base `<outlook>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`dragPrio`|Sets behavior for files that are dragged and dropped into a new email from the Explore tab in the Alfresco sidebar|`document`: attaches to a new email as a file. This is the default setting.

 `link`: a link to a file is created in the email body

 `pdf`: file is converted to PDF format and is attached to a new email

 `pdflink`: a link to the converted PDF file is created in the email body

|
    |`showExplorer`|Shows or hides the Explore tab in the Alfresco sidebar|`True`: tab is shown. This is the default setting.

 `False`: tab is not shown.

|
    |`showExplorerNew`|Controls the appearance of the Alfresco sidebar in emails that are open in a current window.|`True`: sidebar is shown. This is the default setting.

 `False`: sidebar is not shown.

|
    |`defaultBrowser`|Sets the external browser to use to open links to Alfresco|`True`: system default browser is used. This is the default setting.

 `False`: Internet Explorer is used.

|
    |`visibleSites`|Sets the sites that are shown in the Explore tab in the Alfresco sidebar|`public`: all sites are visible. This is the default setting.

 `private`: only sites that the current user is a member of are visible

 `favorites`: only sites set by the user as a favorite are visible

|
    |`visibleNodes`|Controls content visible in the Explore tab in the Alfresco sidebar|`default`: all files and folders are visible. This is the default setting.

 `favdocument`: only files marked by the user as a favorite are visible

 `favfolder`: only folders marked by the user as a favorite are visible

 `favonly`: only files and folders marked by the user as a favorite are visible

|
    |`hoverPreview`|Controls the behavior of the Preview window in the Search tab of the Alfresco sidebar|`true`: preview window is shown when hovering over the found item. This is the default setting.

 `false`: preview window is not shown when hovering over the found item.

|
    |`isSitesRoot`|Sets a root folder to show in the Explore tab of the Alfresco sidebar|`true`: root is the Sites folder. This is the default setting.

 `false`: root is the Company Home folder.

|
    |`mailNameDisplayPattern=" #subject (#from)"`|Modifies the email appearance in the Explore tab of the Alfresco sidebar|Use these variables to modify the email fields displayed: `#subject`, `#from`, `#to`, `#sent`

|
    |`culture`|Sets the language used in Alfresco Outlook Client|Possible settings:`en`: English

`de`: German

`es`: Spanish

`it`: Italian

`fr`: French

`ja`: Japanelse

`ru`: Russian

`zh-cn`: Chinese \(Simplified\)

`pt-br`: Brazilian Portuguese

`nl`: Dutch

`nb-no`: Norwegian \(Bokmal\)

|
    |`customAppTitle`|Renames Alfresco Outlook Client sidebar|Enter your chosen title as a text string.|
    |`customRibbonTitle`|Renames the Alfresco Client tab|Enter your chosen title as a text string.|
    |`customMenuTitle`|Renames the Alfresco Client option when right clicking a file|Enter your chosen title as a text string.**Note:** If you set this option, the same value is applied to `customRibbonTitle` if `customRibbonTitle` is blank.

|
    |`sendLinkUrl`|Controls the behavior of links to files in Alfresco|`details`: link to the Document Details page is created. This is the default setting.

 `download`: link to the Document Download page is created

|
    |`folderSort`|Sets the sorting options for folders in the Explore tab of the Alfresco sidebar|`name_asc`: folders are sorted in alphabetical order. This is the default setting.

 `name_desc`: folders are sorted in reverse alphabetical order

 `modified_asc`: folders are sorted by date modified ascending

 `modified_desc`: folders are sorted by date modified descending

|
    |`dateSortView`|Sets the date sort display options in the Explore tab of the Alfresco sidebar|`subject`: files are sorted by subject or name. This is the default setting.

 `date`: files are sorted by date and subject

 `datetime`: files are sorted by date and time, and subject

|
    |`showEmailTooltip`|Controls whether a tool tip is shown when hovering over an email|`true`: tool tip is shown when hovering over the email. This is the default setting.

 `false`: tool tip is not shown when hovering over the email.

|
    |`panelViewMode`|Controls the appearance of the Outlook sidebar|`list`: sidebar is shown as a list. This is the default setting.

 `tree`: sidebar is shown as a tree structure.

|
    |`searchMode`|Controls the search behavior|`standard`: standard search is used. This is the default setting.

 `advanced`: Advanced search is used.

|
    |`showMySites`|Controls the appearance of My Sites site selector|`true`: My Sites site selector is shown. This is the default setting.

 `false`: My Sites site selector is not shown.

|

3.  Configure the attributes that you need for the `<storage>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`archiveOption`|Controls email archive settings|`0` or `1`: default archive settings are used. This is the default setting.

 `2`: archiving options are shown before the email is uploaded.

|
    |`storeFiles`|Controls the Extract email attachment archive option|`true`: email attachments are extracted on upload to Alfresco. This is the default setting.

 `false`: email attachments are not extracted on upload to Alfresco.

|
    |`storeLink`|Controls the Archive as link email option|`true`: email is replaced with a link to email stored in Alfresco

 `false`: email is not replaced with a link to the email stored in Alfresco. This is the default setting.

|
    |`storeMsg`|Controls the Store original Outlook .MSG file archive option|`true`: original Outlook . MSG file is stored on upload to Alfresco

 `false`: original Outlook . MSG file is not stored on upload to Alfresco. This is the default setting.

|
    |`compress`|Controls the Compress message while uploading setting|`true`: message is compressed while uploading to Alfresco. This is the default setting.

 `false`: message is not compressed while uploading to Alfresco

|

4.  Configure the attributes that you need for the `<connection>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`url`|URL to Alfresco server|This is the path to your Alfresco server.

|
    |`login`|User name for Alfresco server|This is your Alfresco user name.

|
    |`password`|Password for Alfresco server \(encrypted\)|This is your Alfresco password.

|
    |`shareUrl`|Path to Alfresco Share|`share`: this is the default setting. Specify a text string for an alternative path.

|
    |`alfrescoUrl`|Path to Alfresco repository|`alfresco`: this is the default setting. Specify a text string for an alternative path.

|
    |`authentication`|Authentication type for connection to Alfresco|`basic`: basic authentication is used to connect to Alfresco

 `windows`: Kerberos authentication is used to connect to Alfresco

 `saml`: SAML authentication is used to connect to Alfresco

 **Note:** Contact Alfresco support before using these settings.

|
    |`webApp`|Which Alfresco WAR file to use in the /webapps folder|`1`: alfresco.war

 `2`: share.war. This is the default setting.

|
    |`shareAlterUrl=""`|Sets alternative URL for Alfresco Share|Specify your alternative URL.

|
    |`checkCertificate`|Specifies whether to check for a server certificate|`true`: certificate is checked and if it is not correct then the connection fails. This is the default setting.

 `false`: certificate is not checked

|
    |`checkVersion`|Specifies whether to check the Alfresco server version|`true`: version is checked and if it is not correct then the connection fails. This is the default setting.

 `false`: version is not checked

|
    |`settingsCheckInterval`|Specifies the interval, in seconds, between checks to determine if the central settings have changed|`480`: 480 seconds is the default setting.

|

5.  Configure the attributes that you need for the `<feature>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`autoPaging`|Controls auto paging \(for the tree view\).|`true`: auto paging is enabled. A refreshed list of files and folders is automatically loaded when scrolling to the bottom of the tree.

 `false`: auto paging is not enabled. This is the default setting. A More button is displayed to allow loading of content.

|
    |`collapsible`|Allows Alfresco sidebar to be expanded or collapsed|`true`: panel is collapsible. This is the default setting.

 `false`: panel is not collapsible.

|
    |`saml`|Controls SAML authentication|`true`: SAML authentication can be used to connect to Alfresco

 `false`: SAML authentication cannot be used to connect to Alfresco. This is the default setting.

|
    |`messageIcon`|Controls the appearance of the Alfresco icon for archived mail|`true`: Alfresco icon appears on archived emails. This is the default setting.

 `false`: Alfresco icon appears on archived emails.

**Note:** There is no visual icon to indicate that the email is archived.

|

6.  Configure the attributes that you need for the `<logging>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`minLevel`|Sets logging level|`debug`: activates debug logging

 `info`: activates info logging. This is the default setting.

 `warning`: activiates warning logging

 `error`: activates error logging

|

7.  Configure the attributes that you need for the `<restrictions>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`<action type="new-folder" enabled="true" />`|Sets action: create a new folder|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="new-document" enabled="true" />`|Sets action: create a new file|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="edit" enabled="true" />`|Sets action: edit online|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="rename-document" enabled="true" />`|Sets action: rename a file|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="rename-folder" enabled="true" />`|Sets action: rename a folder|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="delete" enabled="true" />`|Sets action: delete|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="send-content" enabled="true" />`|Sets action: email as an attachment|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="send-link" enabled="true" />`|Sets action: email as link|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="set-favorite" enabled="true" />`|Sets action: add to favorites|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="workflow" enabled="true" />`|Sets action: start workflow|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="details-msg" enabled="true" />`|Sets action: Alfresco Details|`true`: action is enabled. This is the default setting.

 `false`: action is not enabled

|
    |`<action type="details" enabled="true" />`|Sets action: details|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="download-pdf" enabled="true" />`|Sets action: download as a PDF|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="download" enabled="true" />`|Sets action: download|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="search" enabled="true" />`|Sets action: search|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="import-msg" enabled="true" />`|Sets action: import message|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="browse" enabled="true" />`|Sets action: open|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="search-full-text" enabled="true" />`|Sets action: Search text and metadata in Search menu|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="search-metadata" enabled="true" />`|Sets action: Search metadata in Search menu|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="search-sites" enabled="true" />`|Sets action: Search sites in Search menu|`true`: action is enabled

 `false`: action is not enabled

|
    |`<action type="set-metadata" enabled="true" />`|Sets action: edit metadata|`true`: action is enabled

 `false`: action is not enabled

|

8.  Configure the attributes that you need for the `<tabs>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`<tab type="workflow" enabled="true" />`|Controls visibility of Workflow tab in Alfresco sidebar|`true`: Workflow tab visible. This is the default setting.

 `false`: Workflow tab not visible

|

9.  Configure the attributes that you need for the `<metadata>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`extended`|Controls automatic competion of metadata.|Use the `<extended>` element to specify text that you would like auto-completed for metadata. You can define one or more properties in the `<autofill>` element. Use the format shown in the example:

    ```
<metadata> 
  <extended> 
    <autofill>  
     <property name="wpsmail-qaext: source" value="Outlook" /> 
     <property name="wpsmail-qaext: source-type" value="123" />
    </autofill> 
  </extended> 
</metadata>
    ```

|

10. Save your changes and restart Microsoft Outlook.

    The template changes are applied.


**Parent topic:**[Installing and configuring Alfresco Outlook Integration](../concepts/Outlook-install-intro.md)

