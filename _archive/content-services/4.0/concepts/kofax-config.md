---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Configuring the Alfresco Kofax Release script

This section provides instructions on setting up the Alfresco Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.

In Kofax Capture, release scripts are associated with document classes. The script is configured to define where and how the documents will be released, including:

-   URL to connect to your Alfresco server
-   Alfresco user name and password used to create the documents in Alfresco
-   Location in the Alfresco repository where documents will be released
-   Options for handing existing documents, such as Overwrite, Version, Release to Default Folder, or Report an Error
-   Alfresco document type
-   Mapping between the Alfresco properties \(including those based on type and configured aspects\), and the Kofax indexing fields to be populated by the release script

-   **[Associating the Alfresco Kofax Release script with a document class](../tasks/kofax-assocdocclass.md)**  
Once you have set up a batch class with an associated document class in Kofax Capture, you can associate a Release script with the batches document class. As part of this process, you are prompted to enter the connection details for your Alfresco server.
-   **[Alfresco Kofax Release script configuration tabs](../concepts/kofax-relscript-config.md)**  
The Kofax Release script is configured using three main tabs. The following sections describe each of these and the options available.

**Parent topic:**[Installing and configuring Alfresco Kofax Release script](../concepts/kofax-intro.md)

