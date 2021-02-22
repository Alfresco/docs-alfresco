---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Importing the configuration template in Outlook

Set the configuration template to import when the configuration dialog is called for the first time.

If you want to automatically import a configuration template when the configuration dialog is called up the first time, you need to store a configuration template with the name `default-configuration-template.xml` in the installation directory of the Alfresco Outlook Client.

1.  Select Configure from the Alfresco Client tab in Microsoft Outlook to open the configuration screen.

    The Configure Alfresco Outlook Client screen is displayed with tabs for Connection, Email Archiving, Extended, Configuration, and License.

2.  Click the Configuration tab.

3.  In the Template: field type or browse to the preferred configuration template.

4.  Click **Overwrite existing configuration** or **Extend existing configuration**.

    You are specifying whether the old configuration should be replaced or added to \(extended\). If you choose to extend the existing configuration, you will be prompted each time that there is a duplicate configuration setting to confirm that you want the setting to be overwritten.

5.  Click **Import**.

    Click **Apply central settings** if you want to apply settings that have been defined in the Alfresco Share Admin Tools \> Email Client \> Email Integration Settings \> Auto configure all clients section. For more information, see [Configuring email integration settings in Alfresco Share](Outlook-admin-integration.md).


The configuration template is imported.

-   **[Alfresco Outlook Integration configuration templates](../references/Outlook-config-templates.md)**  
Using configuration templates helps simplify the configuration and enterprise-wide deployment of Alfresco Outlook Integration.

**Parent topic:**[Configuring Alfresco Outlook Integration in Alfresco Share and in Microsoft Outlook](../concepts/Outlook-config-intro.md)

