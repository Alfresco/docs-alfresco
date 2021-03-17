---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: GoogleDocs
---

# Enabling Google Docs integration

The Google Docs integration enables documents from Google Docs to be imported into the Alfresco repository, and therefore benefit from Alfresco features, such as checkin and checkout. Google Docs is disabled by default.

1.  Open the <web-extension\>\\share-config-custom.xml file.

2.  Locate the following section:

    ```
    <!--
             Google Docs integration
          -->
          <google-docs>
             <!--
                Enable/disable the Google Docs UI integration (Extra types on Create Content menu, Google Docs actions).
                If enabled, remember to also make sure the gd:googleEditable aspect is made visible in the <aspects> section above.
             -->
             <enabled>false</enabled>
    ```

3.  Change the `enabled` option to `true`.

4.  Save the file.

5.  Restart the Alfresco server.


The Google Docs integration is now available. To check that you can access the Google Docs integration, log on to Alfresco Share, and then check a site's Document Library. Within the **Create Content** link, the following additional actions display:

-   **Google Docs Document**
-   **Google Docs Spreadsheet**
-   **Google Docs Presentation**

**Parent topic:**[Customizing Alfresco Share configuration items](../tasks/share-customize.md)

