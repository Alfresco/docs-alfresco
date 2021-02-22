---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Stopping the Alfresco server

This section describes how to stop the Alfresco server.

-   \(Windows\)

    -   Open the Control Panel Services window and stop the following services:
        -   `alfrescoPostgreSQL`
        -   `alfrescoTomcat`
    -   Click the **Start** menu, and select **All Programs \>****Alfresco Enterprise \> Alfresco Enterprise Service****\> Stop **Alfresco** Enterprise service**.
    -   Click the **Start** menu, and select **All Programs \>****Alfresco Community \> Alfresco Community Service****\> Stop **Alfresco** Community service**.
    The command prompt that opened during startup closes. Alfresco has now stopped.

-   \(Linux\) Browse to /opt/alfresco/, and run ./alfresco.sh stop.


**Parent topic:**[Starting and stopping Alfresco](../concepts/start-stop-intro.md)

