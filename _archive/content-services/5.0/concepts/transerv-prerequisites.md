---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Document Transformation Server prerequisites

The Document Transformation Server consists of two software modules: the Standalone Document Transformation Server and the Alfresco Transformation Client.

The Document Transformation Server is sold as an Alfresco module, which can only be enabled with a license key.

The Standalone Document Transformation Server runs on Windows and takes care of file transformations.

The Alfresco Transformation Client runs as part of Alfresco and communicates between Alfresco and the Standalone Document Transformation Server.

**Disc I/O bandwidth**

Microsoft Office transformations are I/O-heavy, and so on some solutions, I/O contention can be a performance bottleneck. When multiple Word conversions occur in parallel, performance can suffer heavily from poor random read and write speeds.

Using an Amazon EC2 instance c3.2xlarge, the I/O metrics are as follows:

-   seq. read speed: 131 MB/s
-   seq. write speed: 83 MB/s
-   random qd32 read speed: 10,4 MB/s
-   random qd32 write speed: 3,8 MB/s

Tests on this environment indicate that I/O was the performance bottleneck, not the transformation server software. Effectively this measures disk speed, not transformation performance. Switching to SSD instance resulted in doc files transforming 1.2 times faster and docx files transforming 1.7 times faster.

-   **[Standalone Document Transformation Server prerequisites](../concepts/transerv-standalone.md)**  
The Standalone Document Transformation Server requires prerequisite software components to be installed and available on the same machine.

**Parent topic:**[Installing and configuring the Document Transformation Server](../concepts/transerv-intro.md)

