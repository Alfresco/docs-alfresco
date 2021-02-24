---
author: Alfresco Documentation
publisher: Alfresco Software, Inc.
audience: 
---

# Language support

The Alfresco interface is supported for use with a number of languages that have been through an Engineering quality assurance \(QA\) and linguistic testing cycle.

Alfresco is supported with the following languages:

-   US English \(en\)
-   German \(de\)
-   Spanish \(es\)
-   French \(fr\)
-   Italian \(it\)
-   Japanese \(ja\)
-   Dutch \(nl\)
-   Simplified Chinese \(zh\_CN\)
-   Russian \(ru\)
-   Norwegian Bokmål \(nb\)
-   Brazilian Portuguese \(pt\_BR\)

If you select a language when you install Alfresco using the setup wizards, your selected language will be used for the installation instructions. To use a localized version of Alfresco, ensure that you configure the correct language in your browser settings.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, for the French version, site-welcome.properties is called sitewelcome\_ fr.properties.

Although the Alfresco interface is localized, the following components have not been localized, therefore, any strings originating from these components will be displayed in English.

-   SharePoint
-   Web Quick Start
-   LibreOffice

The following files are not localized and the error messages remain in English to ease searching for fixes to issues.

-   content-service.properties
-   dictionary-messages.properties
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

**What to do next:**

[Go to Installing Alfresco flowchart](install-singleinstance.md)

[Go to Upgrading Alfresco flowchart](upgrade-singleinstance.md)

[Validating the architecture](../tasks/configuration-checklist-arch.md)

**Parent topic:**[Prerequisites for installing Alfresco](../concepts/prereq-install-overview.md)

