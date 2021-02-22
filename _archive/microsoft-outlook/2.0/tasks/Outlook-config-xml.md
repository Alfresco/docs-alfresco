---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring the AlfrescoClientSettings file

You can configure the AlfrescoClientSettings XML file for advanced settings.

The AlfrescoClientSettings-2.0.0.xml file contains advanced configuration properties. Use this file to set up attributes and metadata settings.

1.  Locate and open AlfrescoClientSettings-2.0.0.xml in the C:\\Users\\<username\> directory, where <username\> is your Windows user name.

    The `<outlook>` section contains elements that you can configure to customize Alfresco Outlook Client, and also additional `<storage>`, `<connection>`, `<logging>`, `<restrictions>`, and `<tabs>` sections:

    Here is a sample configuration file:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <settings>
      <outlook format="1.0" dragPrio="0" showExplorer="true"defaultBrowser="true" visibleSites="private" visibleNodes="default" hoverPreview="false" isSitesRoot="true" mailNameDisplayPattern="#subject (#from)" rootId="" culture="en" customAppTitle=""sendLinkUrl="details" folderSort="modified_desc" dateSortView="datetime">
         <storage archiveOption="0" storeFiles="true" storeLink="false" storeMsg="false" compress="true" />
         <!-- webApp: alfresco = 1, share = 2 -->
         <connection shareUrl="share" alfrescoUrl="alfresco"authentication="basic" webApp="2" shareAlterUrl=""checkCertificate="true" checkVersion="true" />
         <feature metadataCustomModel="false" highlightTexts="false" collapsible="true" tokenAlterMode="false" saml="false" />
         <!-- maxFileSize: in kilobytes. Default value is "0". -->
         <!-- minLevel: supported values - debug, info, warning, error. Default value is "info". -->
         <logging maxFileSize="0" minLevel="info" logWebData="false" />
         <restrictions>
           <actions>
              <action type="new-folder" enabled="true" />
              <action type="new-document" enabled="true" />
              <action type="edit" enabled="true" />
              <action type="rename-document" enabled="true" />
              <action type="rename-folder" enabled="true" />
              <action type="delete" enabled="true" />
              <action type="send-content" enabled="true" />
              <action type="send-link" enabled="true" />
              <action type="set-favorite" enabled="true" />
              <action type="workflow" enabled="true" />
              <action type="details-msg" enabled="true" />
              <action type="details" enabled="true" />
              <action type="download-pdf" enabled="true" />
              <action type="download" enabled="true" />
              <action type="search" enabled="true" />
              <action type="import-msg" enabled="true" />
              <action type="browse" enabled="true" />
           </actions>
           <tabs>
               <tab type="workflow" enabled="true" />
           </tabs>
         </restrictions>
         <search-properties>
            <search-property>
               <name>cm:name</name>
               <label-en>Name</label-en>
               <label-de>Name</label-de>
               <label-es>Nombre</label-es>
               <label-it>Nome</label-it>
               <label-fr>Nom</label-fr>
               <label-ja>??</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>??</label-zh-cn>
               <label-pt-br>Nome</label-pt-br>
               <label-nl>Naam</label-nl>
               <label-nb-no>Navn</label-nb-no>
               <type>string</type>
           </search-property>
           <search-property>
               <name>cm:creator</name>
               <label-en>Creator</label-en>
               <label-de>Ersteller</label-de>
               <label-es>Creador</label-es>
               <label-it>Creatore</label-it>
               <label-fr>Crateur</label-fr>
               <label-ja>???</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>???</label-zh-cn>
               <label-pt-br>Criador</label-pt-br>
               <label-nl>Auteur</label-nl>
               <label-nb-no>Opprettet av</label-nb-no>
               <type>string</type>
           </search-property>
           <search-property>
               <name>cm:created</name>
               <label-en>Created</label-en>
               <label-de>Erstellt am</label-de>
               <label-es>Creado</label-es>
               <label-it>Creato</label-it>
               <label-fr>Etabli</label-fr>
               <label-ja>???</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>???</label-zh-cn>
               <label-pt-br>Criado</label-pt-br>
               <label-nl>Aangemaakt</label-nl>
               <label-nb-no>Opprettet den</label-nb-no>
               <type>daterange</type>
           </search-property>
         </search-properties>
       <explorer-search-properties>
           <search-property>
               <name>cm:name</name>
               <label-en>Name</label-en>
               <label-de>Name</label-de>
               <label-es>Nombre</label-es>
               <label-it>Nome</label-it>
               <label-fr>Nom</label-fr>
               <label-ja>??</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>??</label-zh-cn>
               <label-pt-br>Nome</label-pt-br>
               <label-nl>Naam</label-nl>
               <label-nb-no>Navn</label-nb-no>
               <type>string</type>
          </search-property>
          <search-property>
               <name>cm:content</name>
               <label-en>Content</label-en>
               <label-de>Inhalt</label-de>
               <label-es>Contenido</label-es>
               <label-it>Contenuto</label-it>
               <label-fr>Teneur</label-fr>
               <label-ja>?????</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>??</label-zh-cn>
               <label-pt-br>Conteudo</label-pt-br>
               <label-nl>Inhoud</label-nl>
               <label-nb-no>Innhold</label-nb-no>
               <type>string</type>
         </search-property>
         <search-property>
               <name>wpsmail-v2:subject</name>
               <label-en>Subject</label-en>
               <label-de>Betreff</label-de>
               <label-es>Asunto</label-es>
               <label-it>Oggetto</label-it>
               <label-fr>Objet</label-fr>
               <label-ja>??</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>??</label-zh-cn>
               <label-pt-br>Assunto</label-pt-br>
               <label-nl>Onderwerp</label-nl>
               <label-nb-no>Emne</label-nb-no>
               <type>string</type>
         </search-property>
         <search-property>
               <name>wpsmail-v2:date-sent</name>
               <label-en>Sent</label-en>
               <label-de>Gesendet am</label-de>
               <label-es>Enviado</label-es>
               <label-it>Inviato</label-it>
               <label-fr>Envoye</label-fr>
               <label-ja>????</label-ja>
               <label-ru></label-ru>
               <label-zh-cn>???</label-zh-cn>
               <label-pt-br>Enviado</label-pt-br>
               <label-nl>Verstuurd</label-nl>
               <label-nb-no>Sendt</label-nb-no>
               <type>daterange</type>
         </search-property>
       </explorer-search-properties>
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
    |`customAppTitle`|Renames Alfresco Outlook Client|Enter your chosen title as a text string.|
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

3.  Configure the attributes that you need for the `<storage>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`archiveOption`|Controls email archive settings|`0`: default archive settings are used. This is the default setting.

 `1`: metadata input window opens before the email is uploaded

 `2`: archiving options are shown before the email is uploaded

|
    |`storeFiles`|Controls the Extract email attachment archive option|`True`: email attachments are extracted on upload to Alfresco. This is the default setting.

 `False`: email attachments are not extracted on upload to Alfresco.

|
    |`storeLink`|Controls the Archive as link email option|`True`: email is replaced with a link to email stored in Alfresco

 `False`: email is not replaced with a link to the email stored in Alfresco. This is the default setting.

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

5.  Configure the attributes that you need for the `<feature>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`metadataCustomModel`|Controls the Custom metadata model|`true`: custom metadata is enabled.

 `false`: custom metadata is not enabled. This is the default setting.

|
    |`autoPaging`|Controls auto paging|`true`: auto paging is enabled.

 `false`: auto paging is not enabled. This is the default setting.

|
    |`collapsible`|Allows Alfresco sidebar to be expanded or collapsed|`true`: panel is collapsible. This is the default setting.

 `false`: panel is not collapsible.

|
    |`saml`|Controls SAML authentication|`true`: SAML authentication can be used to connect to Alfresco

 `false`: SAML authentication cannot be used to connect to Alfresco. This is the default setting.

|

6.  Configure the attributes that you need for the `<logging>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`maxFileSize`|Sets the limit for the log file size, in KB|Numeric field. `0`: log size is unlimited.

|
    |`minLevel`|Sets logging level|`debug`: activates debug logging

 `info`: activates info logging. This is the default setting.

 `warning`: activiates warning logging

 `error`: activates error logging

|
    |`logWebData`|Activates logging of web data|`true`: web data is logged

 `false`: web data is not logged

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

8.  Configure the attributes that you need for the `<tabs>` element:

    |Attribute|Description|Value|
    |---------|-----------|-----|
    |`<tab type="workflow" enabled="true" />`|Controls visibility of Workflow tab in Alfresco sidebar|`true`: Workflow tab visible. This is the default setting.

 `false`: Workflow tab not visible

|

9.  Save your changes and restart Microsoft Outlook.

    The template changes are applied.


**Parent topic:**[Installing and configuring Alfresco Outlook Integration](../concepts/Outlook-install-intro.md)

