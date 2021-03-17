---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: OpenOffice subsystem jodconverter
---

# OOoJodconverter subsystem configuration properties

The following properties can be configured for the OOoJodconverter subsystem.

![Enterprise only feature](../images/enterprise-feature.png)

-   **jodconverter.enabled**

    Enables or disables the JodConverter process\(es\).

-   **jodconverter.maxTasksPerProcess**

    Specifies the number of transforms before the process restarts. The default is 200.

-   **jodconverter.officeHome**

    Specifies the name of the OpenOffice install directory. The following are examples of install directory paths:

    -   Linux: `jodconverter.officeHome=/usr/lib/openoffice`
    -   Mac: `jodconverter.officeHome=/Applications/OpenOffice.org.app/Contents`
    -   Windows: `jodconverter.officeHome=c:/Alfresco/OpenOffice.org`
-   **jodconverter.portNumbers**

    Specifies the port numbers used by each processing thread. The number of process will match the number of ports. The default numbers are 2022, 2023, and 2024.

-   **jodconverter.taskExecutionTimeout**

    Specifies the maximum number of milliseconds that an operation is allowed to run before it is aborted. It is used to recover from operations that have hung. The default is 120000 milliseconds \(2 minutes\).

-   **jodconverter.taskQueueTimeout**

    Specifies the maximum number of milliseconds a task waits in the transformation queue before the process restarts. It is used to recover hung OpenOffice processes. The default is 30000 milliseconds \(30 seconds\).


**Parent topic:**[Configuring OpenOffice](../concepts/OOo-subsystems-intro.md)

