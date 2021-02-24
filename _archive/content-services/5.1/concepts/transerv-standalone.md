---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Standalone Document Transformation Server prerequisites

The Standalone Document Transformation Server requires prerequisite software components to be installed and available on the same machine.

See [Alfresco Supported Platforms](https://www.alfresco.com/services/subscription/supported-platforms) for details of the correct prerequisite software.

The following points are important to note before you install the Document Transformation Server:

-   Install only the English versions of MS Windows Server 2012 and Office 2013 because other languages result in unpredictable behavior.

    **Note:** Although the server must be configured in English, this has no impact on the transformation language used for documents.

-   Make sure that the Windows print spooler service is running
-   Ensure you have Java 8 installed
-   Java 7 and Java 6 x64 are not supported

There are a number of recommendations for calculating sizing. You will need:

-   Four high clocked cores per server, with between 4 GB and 6 GB RAM. If you find that you need more power, it is better to add another server instance with a similar specification than to upgrade the hardware. The reason for this is that Microsoft Office is not very scalable.
-   Between 10 GB and 15 GB of free space. Storage is not that important, but if you have lots of large files, you should make sure that creating temporary copies of those files will not slow the system down.
-   Gigabit Ethernet
-   At least one CPU for each concurrent transformation that is expected to be processed by the server

**Parent topic:**[Document Transformation Server setup](../concepts/transerv-prerequisites.md)

