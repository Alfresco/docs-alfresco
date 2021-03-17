---
author: Alfresco Documentation
publisher: Alfresco Software, Inc.
audience: 
category: Installation
keyword: [installing, ]
---

# Language support

The Alfresco Share interface is supported for use with a number of languages that have been through an Engineering QA and linguistic testing cycle.

Alfresco is supported with the following languages:

-   English
-   German
-   French
-   Spanish
-   Italian
-   Japanese
-   Dutch
-   Russian
-   Norwegian
-   Simplified Chinese

You can select the language when you install Alfresco using the setup wizards. Before you install a localized version, ensure that your browser is set up to view the relevant locale. This ensures that the special characters display correctly in your installed instance.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, for the French version, site-welcome.properties is called sitewelcome\_ fr.properties.

Although the Share interface is localized, the following components have not been localized, therefore, any strings originating from these components in Share and Explorer will be displayed in English.

-   SharePoint
-   Web Quick Start
-   OpenOffice

The following files are not localized and the error messages remain in English to ease searching for fixes to issues.

-   content-service.properties
-   dictionary-messages.properties
-   jbpm-engine-messages.properties
-   module-messages.properties
-   patch-service.properties
-   repoadmin-interpreter-help.properties
-   schema-update.properties
-   system-messages.properties \(partially translated\)
-   tenant-interpreter-help.properties
-   version-service.properties
-   webclient-config-admin-interpreter-help.properties
-   workflow-interpreter-help.properties
-   control.properties \(in remote-api directory\)



**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

