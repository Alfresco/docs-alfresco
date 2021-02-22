---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Standalone Document Transformation Engine prerequisites

The standalone Document Transformation Engine requires prerequisite software components to be installed and available on the same machine.

See [Supported Platforms](https://www.alfresco.com/services/subscription/supported-platforms) for details of the correct prerequisite software.

The following points are important to note before you install the Document Transformation Engine:

-   Install only the English versions of MS Windows Server 2012 R2, and MS Office 2010 or Office 2013 32 bit because other languages cause encoding issues resulting in unpredictable behavior.

    **Note:** Although the engine must be configured in English, this has no impact on the transformation language used for documents.

-   Document Transformation Engine does not work with Windows non-English regional settings.
-   Make sure that the Windows print spooler service is running.
-   Ensure you have Oracle JDK 8 \(32-bit or 64-bit\) installed.
-   GhostScript v8.64 and pdf2swf are no longer distributed along with Document Transformation Engine. Make sure you install both these tools manually.

There are a number of recommendations for calculating sizing. You will need:

-   Four high clocked cores per engine, with between 4 GB and 6 GB RAM. If you find that you need more power, it is better to add another engine instance with a similar specification than to upgrade the hardware. The reason for this is that Microsoft Office is not very scalable.
-   Between 10 GB and 15 GB of free space. Storage is not that important, but if you have lots of large files, you should make sure that creating temporary copies of those files will not slow the system down.
-   Gigabit Ethernet
-   At least one CPU for each concurrent transformation that is expected to be processed by the engine

**Parent topic:**[Document Transformation Engine setup](../concepts/transerv-prerequisites.md)

