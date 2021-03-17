---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Developer]
option: knowledge base
---

# Adding Alfresco Share customizations

The tasks in this section involve customizations to Alfresco Share.

-   **[Adding an archive action to the document library](../tasks/kb-code-archiveaction.md)**  
Add a new archive action to the document library page in Alfresco Share so that when users click the archive action, an HTTP POST is performed to the Alfresco repository server and the web script on that side puts your content into an Archived state.
-   **[Enabling a custom workflow](../tasks/kb-code-workflow-visible.md)**  
This configures Alfresco Share so that a previously defined workflow process appears for end users to select and launch the workflow.
-   **[Configuring the Alfresco Share form](../tasks/kb-code-objects.md)**  
Alfresco Share comes with the ability to render metadata forms for viewing and editing content objects. You just need to provide the form definitions and associate them to your `kb:article` aspect within the Alfresco Share configuration file.
-   **[Adding the Alfresco Share form template](../tasks/kb-code-template.md)**  
This copies in a template for a previously created form.
-   **[Adding a custom message bundle](../tasks/kb-code-bundle.md)**  
A custom message bundle defines text values for the default locale.
-   **[Overriding the message bundle bootstrap component](../tasks/kb-code-bootstrap.md)**  
To include a custom message bundle along with the Alfresco Share message bundles to support I18N with a new site preset, override the Spring bean responsible for doing so.
-   **[Adding files to the Tomcat ROOT web application](../tasks/kb-code-share-tomcat.md)**  
The customizations in this section have dependencies the browser must resolve. One option is to modify the share.war file, but a better option is to place them in an alternate web application; in this case, the ROOT web application under Tomcat.

**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

