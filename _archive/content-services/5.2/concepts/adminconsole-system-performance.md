---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# System Performance

Use this tool to see live and historical detail on your system performance.

You can see details of memory usage, CPU usage, and the number of threads running. For each of these you can select the chart timescale.

-   **Memory Usage**

    Displays the memory usage for the timescale you select.

    -   Max \(MB\) - the maximum memory available
    -   Committed \(MB\) - the memory reserved for Alfresco Content Services
    -   Used \(MB\) - what your system is currently using
-   **CPU Usage**

    Displays the current CPU usage and the historical usage for the timescale you select.

-   **Threads**

    Displays the number of threads currently running and the peak thread count \(the historical maximum number of threads that has been reached since the last system start or restart\) Select the timescale that you want to see.


**Note:** The data in the graphs is refreshed every two seconds using a lightweight webscript that runs a JMX bean operation. This has negligable impact on performance.

**Parent topic:**[Support Tools](../concepts/monitoring-intro.md)

**Related information**  


[Launching the Admin Console](../tasks/adminconsole-open.md)

