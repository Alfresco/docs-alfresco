---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Stopping the Alfresco Content Services server

Choose one of these options to stop the server.

-   \(Windows\)

    -   Open the Control Panel Services window and stop the following services:
        -   `alfrescoPostgreSQL`
        -   `alfrescoTomcat`
    -   Click the **Start** menu, and select **All Programs \>****Alfresco Content Services \> Stop Alfresco Content Services services**.
    The command prompt that opened during startup closes. Alfresco Content Services has now stopped.

-   \(Linux\) Browse to /opt/alfresco/, and run ./alfresco.sh stop.


**Parent topic:**[Starting and stopping Alfresco Content Services](../concepts/start-stop-intro.md)

