---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Document Transformation Engine setup

The Document Transformation Engine consists of two software modules: the standalone Document Transformation Engine and the Alfresco Transformation client.

The Document Transformation Engine is sold as an Alfresco Content Services module that is enabled with a license key:

-   The standalone Document Transformation Engine runs on Windows and takes care of the file transformations.
-   The Alfresco Transformation client runs as part of Alfresco Content Services and communicates between Alfresco Content Services and the standalone Document Transformation Engine.

**Disc I/O bandwidth**

Microsoft Office transformations are I/O-heavy, and so on some solutions, I/O contention can be a performance bottleneck. When multiple Word conversions occur in parallel, performance can suffer heavily from poor random read and write speeds.

Using an Amazon EC2 instance c3.2xlarge, the I/O metrics are as follows:

-   sequential read speed: 131 MB/s
-   sequential write speed: 83 MB/s
-   random qd32 read speed: 10,4 MB/s
-   random qd32 write speed: 3,8 MB/s

-   **[Standalone Document Transformation Engine prerequisites](../concepts/transerv-standalone.md)**  
The standalone Document Transformation Engine requires prerequisite software components to be installed and available on the same machine.

**Parent topic:**[Installing and configuring the Document Transformation Engine](../concepts/transerv-intro.md)

