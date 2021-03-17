---
author: Alfresco Documentation
---

# Configuring the Kofax Integration

Use these instructions to set up the Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.

In Kofax Capture, release scripts are associated with document classes. The script is configured to define where and how the documents will be released, including:

-   URL to connect to your Alfresco Content Services server
-   Alfresco Content Services user name and password used to create the documents
-   Location in the repository where documents will be released
-   Options for handing existing documents, such as Overwrite, Version, Release to Default Folder, or Report an Error
-   Alfresco Content Services document type
-   Mapping between the Alfresco Content Services properties \(including those based on type and configured aspects\), and the Kofax indexing fields to be populated by the release script

-   **[Associating the Kofax Release script with a document class](../tasks/kofax-assocdocclass.md)**  
Once you have set up a batch class with an associated document class in Kofax Capture, you can associate a Release script with the batches document class. As part of this process, you are prompted to enter the connection details for your Alfresco Content Services server.
-   **[Kofax Release script configuration tabs](../concepts/kofax-relscript-config.md)**  
The Kofax Release script is configured using three main tabs. The following information describes each of the configuration tabs and the options available.

**Parent topic:**[Installing and configuring the Alfresco Kofax Integration](../concepts/kofax-intro.md)

