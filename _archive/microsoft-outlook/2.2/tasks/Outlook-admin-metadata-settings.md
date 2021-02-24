---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring Outlook metadata and list view settings in Alfresco

You can configure metadata and list view settings for Alfresco Outlook Integration using Share Admin Tools. These settings define global controls across your enterprise and are applied immediately.

1.  Open Alfresco Share, and click **Admin Tools** on the toolbar.

2.  Click Email Metadata Settings and Edit.

    See [Outlook metadata settings](Outlook-config-metadata.md) for more detailed guidance on adding metadata.

3.  Check the box to Enable custom metadata support in the relevant custom metadata section.

    If you select this option, the **Configuration XML content** field becomes active.

4.  Paste the XML code that contains the configuration settings for the Alfresco Outlook Client into the **Configuration XML content** field, or load and edit the default configuration template by clicking **Load default configuration template**.

    You can use the default configuration template for testing purposes, and edit this if you prefer.

5.  In the list view section, **Allow overwriting** is enabled by default. Uncheck to set global list view settings for Outlook.

    This means that users are able to change their settings locally.

6.  Edit the XML settings in the third Configuration XML content field or use your own settings. The default configuration template is preloaded.

7.  Click Apply to save.

    If your XML is not valid, you will not be allowed to save your settings, and you will see an error message.

8.  You can download the list view settings locally by clicking Download configuration.


-   **[Outlook metadata settings](../tasks/Outlook-config-metadata.md)**  
Use this guidance to configure templates for adding metadata to folders, files, emails and attachments in Outlook.

**Parent topic:**[Configuring Outlook settings in Alfresco and Microsoft Outlook](../concepts/Outlook-config-intro_v2.md)

