---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server, Start, FSR]
keyword: [start, FSR]
---

# Starting the standalone deployment engine

The standalone deployment engine is implemented as a set of Java libraries and is multi-platform.

Bourne shell scripts are provided for UNIX and Windows batch files are provided for Windows.

-   \(Windows\) To start the standalone deployment engine:

    -   Open a command prompt, and run the deploy\_start script, or
    -   Select **Start Menu \> All Programs \> Alfresco Standalone Deployment Receiver \> Start Alfresco Standalone Deployment Receiver**.
    The Start menu action is available if you have used the deployment installer to install the Standalone Deployment Engine. This action is calling the deploy\_start.bat script.

    It is also possible to install the standalone deployment engine as a Windows service, which can automatically start when Windows starts.

-   \(Linux\) To start the standalone deployment engine, open a command prompt and run the deploy\_start.sh script.

    **Note:** The default shell for this script is sh. You can edit the alfresco.sh file to change to your preferred shell. For example, change the `#!/bin/sh` line to `#!/bin/bash`.


When deploying to a deployment engine running on a multi-NIC system, it may be necessary to bind the RMI registry to a particular IP address. To do this, add the following to the Java command in deploy\_start.sh or deploy\_start.bat:

```
-Djava.rmi.server.hostname=x.x.x.x
```

Where `x.x.x.x` is the IP address assigned to the NIC to which you want to bind.

**Parent topic:**[Starting and stopping](../concepts/start-stop-intro.md)

**Related information**  


[Installing the WCM standalone deployment receiver](Deployment-install.md)

