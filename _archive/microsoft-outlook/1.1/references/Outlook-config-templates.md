---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Alfresco Outlook Integration configuration templates

Using configuration templates helps simplify the configuration and enterprise-wide deployment of Alfresco Outlook Integration.

**Parent topic:**[Importing the configuration template in Outlook](../tasks/Outlook-config-template-setup.md)

## Template format

The configuration template is an XML file with a defined format.

### XML configuration file format

|XML element path|Description|
|----------------|-----------|
|Settings|Root-element|
|`settings.server`|Alfresco server configuration: -   `url`: URL to Alfresco server
-   `user`: user name
-   `password`: user password
-   `ntlm`: set to true if NTLM log in, false if log in with user name and password
-   `minVersion`: oldest Alfresco server version supported

|
|`settings.general`|General settings: -   `isSitesRoot`: set to true for Search only sites, or false for Search repository
-   `sitesExploreMode`: contains the value for the setting Navigation to the sites:
    -   default: default settings in Alfresco are used
    -   private: displays only sites where the user is a member
    -   public: displays all public sites
    -   favourites: displays only the user's favourite sites
-   `mailNameDisplayPattern`: template for the display of email names. The following placeholders are supported:
    -   \#subject: email subject
    -   \#from: sender
    -   \#to: receiver
    -   \#sent: date sent
-   `helpEngUrl`: URL to English user manual
-   `helpGerUrl`: URL to German user manual

|
|`settings.logging`|Logging settings: -   `maxFileSize`: is the maximum size of a log file. If the size is exceed, older log files are removed.
-   `minLevel`: defines the level of detail for log files and supports the following values:
    -   debug: all messages are logged
    -   info: all messages except debug messages are logged
    -   warning: all messages except debug and information messages are logged
    -   error: only error messages are logged

|
|`settings.storage`|Standard archiving settings: -   `storeFiles`: set to true for Store attachments as separate documents in Alfresco, otherwise false
-   `metadata`: set to true if the metadata dialog should be displayed during archiving, or false if it should not displayed
-   `storeMsg`: set to true if the Outlook MSG file should also be saved, or false if it should not be saved
-   `storeLink`: set to true if the option Save Alfresco link should be activated, or false if it should not be activated

|
|`settings.search-properties`|Parent element for the search parameters of the folder search|
|`settings.explorer-search-properties`|Parent element for the search parameters of the search from Alfresco Explorer|
|`settings.[search-properties|explorer-search-properties].search-property`|Parent element for a search parameter|
|`settings.[search-properties|explorer-search-properties].search-property.name`|Model name of the Alfresco property used for the search \(for example, cm:description or cm:author\) **Note:** `cm:name` does not require any configuration. `cm:name` is a standard search parameter that is always displayed.

|
|`settings.[search-properties|explorer-search-properties].search-property.type`|Type for the validation of entries. The following types are supported: -   string
-   int
-   date
-   daterange

|

### Example

```

          
<?xml version=“1.0“ encoding=“utf-8“?> 
 <settings>
   <general isSitesRoot="true“
   sitesExploreMode="default"
   mailNameDisplayPattern="#subject (#from)" 
   helpEngUrl="http://URL/directory/Operating- manual_E-Mail-Manager_EN.pdf"
   helpGerUrl="http://URL/directory/Bedienungsanleitung_E-Mail-Manager_DE.pdf" />
   <server url=“http://localhost:8080“ alfrescoUrl=“alfresco“ shareUrl=“share“ 
   webApp=“0“ user=“test“ password=““ ntlm=“false“/>
   <logging maxFileSize="0" minLevel="info" />
   <storage storeFiles=“false“ metadata=“false“ storeMsg=“true“ storeLink=“false“></storage> 
   <explorer-search-properties>
   <search-property>
   <name>cm:name</name>
   <label-en>Name</label-en>
   <label-de>Name</label-de>
   <type>string</type>
   </search-property>
   </explorer-search-properties>
   <search-properties>
   <search-property>
   <name>cm:name</name>
   <label-en>Name</label-en>
   <label-de>Name</label-de> 
   <type>string</type> 
   </search-property> 
   </search-properties>
 </settings>
        
```

