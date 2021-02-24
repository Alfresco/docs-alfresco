---
author: Alfresco Documentation
---

# Installing the Alfresco Transformation Server

This section describes how to install all the components required for the Alfresco Transformation Server.

The following artifacts are shipped for the Alfresco Transformation Server:

-   alfresco-4.1-transformationserver-amps-2.1.3.zip
-   alfresco-4.1-transformationserver-server-1.4.0.zip

The Transformation Server AMP zip file \(alfresco-4.1-transformationserver-amps-2.1.3.zip\) contains the following artifacts:

-   alfresco-transformationserver-repo-2.1.3.amp
-   alfresco-transformationserver-share-2.1.3.amp
-   TransformationServer-amps-2.1.3-releaseNotes.html

The two AMP files must be applied to the repository and Share, respectively. The Share AMP file also adds a page to the Share Admin Console, which gives information on the status of the Transformation Server.

The Transformation Server zip file \(alfresco-4.1-transformationserver-server-1.4.0.zip\) contains the following artifacts:

-   alfresco-4.2-transformationserver-server-1.4.0.msi
-   TransformationServer-server-1.4.0-releaseNotes.html

Installing the Transformation Server consists of two parts:

1.  Installing the MSI installation package on the standalone Transformation Server.
2.  Installing the relevant AMP package and updating the license on the Alfresco server.

**Note:** When upgrading the Transformation Server, the previous installation must be uninstalled first. If your old version of the Transformation Server is earlier than 1.3.1, you need to use the Control Panel's **Uninstall a program** option to remove the old version, and then manually remove the Transformation Server directory. By default, the Transformation Server directory is C:\\Program Files \(x86\)\\Transformation Server\\\). If your old version of the Transformation Server is 1.3.1 or later, the new Transformation Server msi prompts you to uninstall the previous version. Once the uninstall is complete, you can run the msi again to install the new version. There is no need to manually remove anything. 



-   **[Installing the standalone Transformation Server](../tasks/transerv-standalone-installing.md)**  
This section describes how to install the standalone Transformation Server.
-   **[Installing the Transformation Server on Alfresco](../tasks/transerv-installing-amps.md)**  
This section describes how to install the Transformation Server AMP and to update the required license.

**Parent topic:**[Installing and configuring the Alfresco Transformation Server](../concepts/transerv-intro.md)

