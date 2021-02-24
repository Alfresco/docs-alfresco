---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: GoogleDocs
---

# Enabling Google Docs integration

The Google Docs integration enables documents from Google Docs to be imported into the Alfresco repository, and therefore benefit from Alfresco features, such as checkin and checkout. Google Docs is disabled by default.

1.  Stop the Alfresco server.

2.  Edit the googledocs.properties file.

3.  Set the following properties:

    ```
    # Enables google editable functionality 
    googledocs.googleeditable.enabled=true     
                
    # System google docs authentication credentials   
    googledocs.username=*sample@gmail.com*   
    googledocs.password=*password*      
    ```

    1.  Set the `googledocs.googleeditable.enabled` property to true.

    2.  Add valid Google Docs authentication credentials to the `googledocs.username` and `googledocs.password` properties.

    3.  Check that the `googledocs.url` and `googledocs.downloadurl` URLs use HTTPS as the communication protocol.

4.  Save the googledocs.properties file.

5.  Open the <web-extension\>\\share-config-custom.xml file.

6.  Locate the following section:

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

7.  Change the `enabled` option to `true`.

8.  Save the <web-extension\>\\share-config-custom.xml file.

9.  Restart the Alfresco server.


The Google Docs integration is now available. To check that you can access the Google Docs integration, log on to Alfresco Share, and then check a site's Document Library. Within the **Create Content** link, the following additional actions display:

-   **Google Docs Document**
-   **Google Docs Spreadsheet**
-   **Google Docs Presentation**

**Parent topic:**[Customizing Alfresco Share configuration items](../tasks/share-customize.md)

