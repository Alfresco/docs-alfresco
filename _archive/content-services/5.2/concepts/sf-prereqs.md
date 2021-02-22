---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Prerequisites for using Smart Folders

There are a number of prerequisites for using Smart Folders.

**Alfresco requirements**

-   Smart Folders are provided as part of the standard installation with Alfresco Content Services.
-   Change the Smart Folders property setting in the <tomcat\>/shared/classes/alfresco-global.properties file to `true`:

    ```
    smart.folders.enabled=true
    ```

    **Note:** By default, the `smart.folders.enabled=false` property setting is at the end of the alfresco-global.properties file. Set this property to `true` to enable Smart Folders, rather than adding a new `smart.folders.enabled=true` property setting to the file, which will cause the Smart Folder example not to work.

-   To define a query for a Smart Folder, Alfresco Full Text Search \(AFTS\) must be used.
-   Ensure that your system administrator has configured Alfresco Content Services to use either Solr 4 or Alfresco Search Services with `Solr 6` as a search service. The Alfresco Full Text Search should also be configured to either `Always use Database` or `Use Database if possible`.

Ensure that your business analyst has considered the business case for enabling Smart Folders. See [Planning and implementing Smart Folders](sf-config-workflow.md) for more information.

**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

