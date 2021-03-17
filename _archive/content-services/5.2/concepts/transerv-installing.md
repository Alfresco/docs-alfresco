---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing the Document Transformation Engine

Use this information to install all the components required for the Document Transformation Engine.

The following file is shipped for the Document Transformation Engine:

alfresco-documenttransformationserver-2.1.6.zip

The zip file contains the following files:

-   alfresco-documenttransformationserver-repo-2.1.6.amp
-   alfresco-documenttransformationserver-share-2.1.6.amp
-   DocumentTransformService.msi.msi

Installing the Document Transformation Engine consists of two parts:

1.  Installing the MSI installation package on the standalone Document Transformation Engine.
2.  Installing the relevant AMP files and updating the license on the Alfresco Content Services server.

    **Note:** When upgrading the Document Transformation Engine, the previous installation must be uninstalled first. If your old version of the Document Transformation Engine is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Engine directory. By default, the Document Transformation Engine directory is C:\\Program Files \(x86\)\\Transformation Engine\\\). If your old version of the Document Transformation Engine is 1.3.1 or later, the new Document Transformation Engine MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything.


**Keystore**

The package ships a keystore that is used by the Tomcat SSL connector. This keystore is shipped for demonstration purposes only and should not be used in production environments. You can edit the file, conf/server.xml, to integrate a custom keystore. Remember to change the attributes, `keystoreFile` and `keystorePass`.

**GhostScript and pdf2swf**

GhostScript and pdf2swf are no longer installed by the Document Transformation Engine MSI. Make sure you install both these tools manually. For more information, see [Installing GhostScript and pdf2swf](install-GhostScript.md). 



-   **[Installing the standalone Document Transformation Engine](../tasks/transerv-standalone-installing.md)**  
Use this information to install the standalone Document Transformation Engine.
-   **[Installing the Document Transformation Engine on Alfresco Content Services](../tasks/transerv-installing-amps.md)**  
Use this information to install the Document Transformation Engine AMP and to update the required license.
-   **[Installing the Document Transformation Engine SDK](../tasks/transerv-sdk-install.md)**  
Use this information to install the Document Transformation Engine SDK.
-   **[Installing GhostScript and pdf2swf](../concepts/install-GhostScript.md)**  
Use this information to install and setup GhostScript and pdf2swf manually.

**Parent topic:**[Installing and configuring the Document Transformation Engine](../concepts/transerv-intro.md)

