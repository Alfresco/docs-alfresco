---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Installing and configuring Alfresco Kofax Release script

This section provides details on installing, configuring, and using the Alfresco Kofax Release script.

Integrating Kofax and Alfresco provides complete content management support including the capture, management, and publishing of content. Kofax Capture captures content from various sources, typically through scanning and OCR. The captured information is then released to Alfresco to be managed in an ad-hoc manner or using pre-defined business processes.

The Kofax architecture provides a plug-in architecture for deploying a Kofax Release script that is responsible for mapping and transferring the information captured by Kofax to the destination application or database.

The Alfresco Kofax Release script comprises a Release script plug-in that is installed within the Kofax Capture application and a set of Alfresco web scripts installed on the Alfresco server.

The Alfresco Kofax Release script provides the following capabilities:

-   Alfresco server connection \(connection URL, user name, password\)
-   Destination folder in which to store the captured documents \(folders may be automatically created based on index field values\)
-   Mapping of Kofax Capture indexing information and files to Alfresco properties
    -   Support for Alfresco types, sub-types, and aspects, and their associated properties
    -   Mapping of Kofax Image \(TIFF\), Text \(OCR\), or PDF files to Alfresco content properties
-   Automatic versioning, overwrite, and error handling for existing documents

-   **[System requirements and prerequisites](../concepts/kofax-reqs.md)**  
This section describes the system requirements for the Alfresco Kofax Release script.
-   **[Installing Kofax Release script](../tasks/kofax-install.md)**  
Installing the Alfresco Kofax Release script is a two-part process.
-   **[Configuring the Alfresco Kofax Release script](../concepts/kofax-config.md)**  
This section provides instructions on setting up the Alfresco Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.
-   **[Publishing a batch class](../tasks/kofax-publishbatchclass.md)**  
After you select all your batch class settings, you must publish your batch class before you can use it.
-   **[Releasing batches](../tasks/kofax-releasebatches.md)**  
The Kofax Capture Release module will process batches based on the settings of the associated batch classes. This module is responsible for releasing documents, as well as index data using the attributes defined during release setup.
-   **[Advanced configuration: custom types, aspects, and properties](../tasks/kofax-advconfig.md)**  
By default, the Release Setup web script \(\\service\\kofax\\releasesetup\) displays all types, aspects, and their associated properties available in your Alfresco repository.
-   **[Removing the Alfresco Kofax Release script](../tasks/kofax-remove.md)**  
The following steps describe how to remove the Alfresco Kofax Release script from your Kofax installation.
-   **[Troubleshooting the Kofax Release script](../concepts/kofax-troubleshooting.md)**  
This section describes how to troubleshoot the Kofax Release script.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

