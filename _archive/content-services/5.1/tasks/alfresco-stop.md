---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Stopping the Alfresco server

Choose one of these options to stop the Alfresco server.

-   \(Windows\)

    -   Open the Control Panel Services window and stop the following services:
        -   `alfrescoPostgreSQL`
        -   `alfrescoTomcat`
    -   Click the **Start** menu, and select **All Programs \>****Alfresco One \> Alfresco One Service****\> Stop **Alfresco** One service**.
    The command prompt that opened during startup closes. Alfresco has now stopped.

-   \(Linux\) Browse to /opt/alfresco/, and run ./alfresco.sh stop.


**Parent topic:**[Starting and stopping Alfresco](../concepts/start-stop-intro.md)

