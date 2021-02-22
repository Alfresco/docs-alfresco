---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Installing the Document Transformation Server

Use this information to install all the components required for the Document Transformation Server.

The following file is shipped for the Document Transformation Server:

alfresco-transformationserver-2.1.0.zip

The zip file contains the following files:

-   alfresco-5.0-documenttransformationserver-repo-2.1.0.amp
-   alfresco-5.0-documenttransformationserver-share-2.1.0.amp
-   alfresco-5.0-documenttransformationserver-server.msi
-   TransformationServer-amps-2.1.0-releaseNotes
-   TransformationServer-server-2.1.0-releaseNotes

Installing the Document Transformation Server consists of two parts:

1.  Installing the MSI installation package on the Standalone Document Transformation Server.
2.  Installing the relevant AMP files and updating the license on the Alfresco server.

**Note:** When upgrading the Document Transformation Server, the previous installation must be uninstalled first. If your old version of the Document Transformation Server is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Server directory. By default, the Document Transformation Server directory is C:\\Program Files \(x86\)\\Transformation Server\\\). If your old version of the Document Transformation Server is 1.3.1 or later, the new Document Transformation Server MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything. 



-   **[Installing the Standalone Document Transformation Server](../tasks/transerv-standalone-installing.md)**  
Use this information to install the Standalone Document Transformation Server.
-   **[Installing the Document Transformation Server on Alfresco](../tasks/transerv-installing-amps.md)**  
Use this information to install the Document Transformation Server AMP and to update the required license.

**Parent topic:**[Installing and configuring the Document Transformation Server](../concepts/transerv-intro.md)

