---
author: Alfresco Documentation
---

# Installing the Document Transformation Server

This section describes how to install all the components required for the Document Transformation Server.

The following artifact is shipped for the Document Transformation Server:

alfresco-transformationserver-2.0.0.zip

The Document Transformation Server zip file contains the following files:

-   alfresco-documenttransformationserver-repo-2.0.0.amp
-   alfresco-documenttransformationserver-share-2.0.0.amp
-   alfresco-documenttransformationserverserver.msi
-   TransformationServer-amps-2.0.0-releaseNotes.html
-   TransformationServer-server-2.0.0-releaseNotes.html

The two AMP files must be applied to the repository and Share, respectively. The Share AMP file also adds a page to the Share Admin Console, which gives information on the status of the Document Transformation Server.

Installing the Document Transformation Server consists of two parts:

1.  Installing the MSI installation package on the standalone Document Transformation Server.
2.  Installing the relevant AMP package and updating the license on the Alfresco server.

**Note:** When upgrading the Document Transformation Server, the previous installation must be uninstalled first. If your old version of the Transformation Server is earlier than 1.3.1, you need to use the Control Panel's **Uninstall a program** option to remove the old version, and then manually remove the Transformation Server directory. By default, the Transformation Server directory is C:\\Program Files \(x86\)\\Transformation Server\\\). If your old version of the Transformation Server is 1.3.1 or later, the new Transformation Server msi prompts you to uninstall the previous version. Once the uninstall is complete, you can run the msi again to install the new version. There is no need to manually remove anything. 



-   **[Installing the standalone Document Transformation Server](../tasks/transerv-standalone-installing.md)**  
This section describes how to install the standalone Document Transformation Server.
-   **[Installing the Document Transformation Server on Alfresco](../tasks/transerv-installing-amps.md)**  
This section describes how to install the Document Transformation Server AMP and to update the required license.

**Parent topic:**[Installing and configuring the Document Transformation Server](../concepts/transerv-intro.md)

