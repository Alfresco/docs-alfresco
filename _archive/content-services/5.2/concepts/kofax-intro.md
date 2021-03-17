---
author: Alfresco Documentation
---

# Installing and configuring the Alfresco Kofax Integration

Use this information to install, configure, and use the Kofax Integration.

Integrating Kofax Capture and Alfresco Content Services provides complete content management support including the capture, management, and publishing of content. Kofax Capture captures content from various sources, typically through scanning and OCR. The captured information is then released to Alfresco Content Services to be managed in an ad-hoc manner or using pre-defined business processes.

The Kofax architecture provides a plug-in architecture for deploying a Kofax Release script that is responsible for mapping and transferring the information captured by Kofax to the destination application or database.

The Kofax Integration comprises a Release script plug-in that is installed within the Kofax Capture application and a set of web scripts installed on the Alfresco Content Services server.

The Kofax Integration provides the following capabilities:

-   Alfresco Content Services server connection \(connection URL, user name, password\)
-   Destination folder in which to store the captured documents \(folders can be automatically created based on index field values\)
-   Mapping of Kofax Capture indexing information and files to Alfresco Content Services properties
    -   Support for Alfresco Content Services types, sub-types, and aspects, and their associated properties
    -   Mapping of Kofax Image \(TIFF\), Text \(OCR\), or PDF files to Alfresco Content Services content properties
-   Automatic versioning, overwrite, and error handling for existing documents

-   **[Kofax Integration system requirements and prerequisites](../concepts/kofax-reqs.md)**  

-   **[Installing the Kofax Integration](../tasks/kofax-install.md)**  
Installing the Kofax Integration is a two-part process.
-   **[Configuring the Kofax Integration](../concepts/kofax-config.md)**  
Use these instructions to set up the Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.
-   **[Publishing a batch class](../tasks/kofax-publishbatchclass.md)**  
After you select all your batch class settings, you must publish your batch class before you can use it.
-   **[Releasing batches](../tasks/kofax-releasebatches.md)**  
The Kofax Capture Release module will process batches based on the settings of the associated batch classes. This module is responsible for releasing documents, as well as index data using the attributes defined during release setup.
-   **[Advanced configuration: custom types, aspects, and properties](../tasks/kofax-advconfig.md)**  
By default, the Release Setup web script \(\\service\\kofax\\releasesetup\) displays all types, aspects, and their associated properties available in your repository.
-   **[Removing the Kofax Release script](../tasks/kofax-remove.md)**  
The following steps describe how to remove the Kofax Release script from your Kofax installation.
-   **[Troubleshooting the Kofax Release script](../concepts/kofax-troubleshooting.md)**  
Use this information to troubleshoot the Kofax Release script.

**Parent topic:**[Installing integrations](../concepts/install-integrations-overview.md)

