---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Starting the Alfresco Content Services server

The server must be running before you can use Alfresco Share. When you install using the setup wizard, the server is automatically installed and started as a service.

-   If you installed as a service, from the **Start** menu select **All Programs \>****Alfresco Content Services \> Start Alfresco Content Services services**.

-   Alternatively, from a command prompt, navigate to the Alfresco installation directory \(C:/Alfresco\) and run `servicerun START`.

    You need administrator rights to run this command.

    These services are also available from the **Start** menu under **Control Panel \> System and Security \> Administrative Tools \> Services**.

-   If you installed as a service, double click the Application Manager tool in the Alfresco Content Services root directory and start the `PostgreSQL Database` and `Tomcat Server` services.

-   Alternatively, browse to /opt/alfresco/ and run ./alfresco.sh start as an administrator.

    **Important:** If you installed using the setup wizard, the alfresco.sh script included in the installation disables the Security-Enhanced Linux \(SELinux\) feature across the system.

    **Note:** The default shell for this script is sh. You can edit the alfresco.sh file to change to your preferred shell. For example, change the `#!/bin/sh` line to `#!/bin/bash`.


**Parent topic:**[Starting and stopping Alfresco Content Services](../concepts/start-stop-intro.md)

