---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server, Start]
keyword: starting server
---

# Starting the Alfresco server

The server must be running before you can use Alfresco Share or Alfresco Explorer. When you install Alfresco using the setup wizard, the server is automatically installed and started as a service.

-   \(Windows\)

    -   Browse to C:\\Alfresco, and double-click servicerun.bat, or open the Control Panel Services window and start the following services:
        -   `alfrescoPostgreSQL`
        -   `alfrescoTomcat`
    -   If you installed Alfresco as a service, from the **Start** menu, select **All Programs \> Alfresco Enterprise \> Alfresco Enterprise Service \> Start Alfresco Enterprise service****.**
-   \(Linux\) Browse to /opt/alfresco/ and run ./alfresco.sh start.

    **Important:** If you installed Alfresco using the setup wizard, the alfresco.sh script included in the installation disables the Security-Enhanced Linux \(SELinux\) feature across the system.

    **Note:** The default shell for this script is sh. You can edit the alfresco.sh file to change to your preferred shell. For example, change the `#!/bin/sh` line to `#!/bin/bash`.


A command prompt opens with a message indicating the server has started.

INFO: Server startup in nnnn ms

**Parent topic:**[Starting and stopping](../concepts/start-stop-intro.md)

**Parent topic:**[Getting started](../concepts/kb-about.md)

**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

