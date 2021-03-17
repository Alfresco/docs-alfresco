---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Hardware settings

This section describes how to validate your I/O subsystems and CPU.

-   **I/O**: One of the primary determinants of Alfresco's performance is I/O. Optimize the following, in priority order:

    1.  I/O to the relational database Alfresco is configured to use.
    2.  I/O to the disk subsystem on which the Lucene or Solr indexes are stored.
    3.  I/O to the disk subsystem on which the content is stored.
    In each case, the goal is to minimize the latency \(response time\) between Alfresco and the storage system, while also maximizing bandwidth.

    Alfresco recommends that the disk throughput is greater than 200MB/sec. On Linux, use the `hdparm` tool to measure disk throughput. The following sample output is on an SATA disk:

    ```
    hdparm -tT /dev/sda1
    /dev/sda1:
    Timing cached reads:   27998 MB in  2.00 seconds = 14018.28 MB/sec
    Timing buffered disk reads: 536 MB in  3.01 seconds = 178.05 MB/sec
    ```

    Other useful tools for detecting disk I/O issues include `dd`, `seeker`, and `iozone`.


-   **CPU**: Alfresco will function correctly on virtually all modern 32bit and 64bit CPUs, however, for production use, Alfresco recommends a clock speed greater than 2.5Ghz to ensure reasonable response times to the end user. Although it is not strictly necessary, a 64bit architecture is also recommended, primarily because it allows the JVM to utilize more memory \(RAM\) than a 32bit architecture.

    **Note:** CPU clock speed is of particular concern for the Oracle UltraSPARC architecture, as some current UltraSPARC based servers ship with CPUs that have clock speeds as low as 900Mhz, well below what is required for adequate Alfresco performance! If you intend to use Sun servers for hosting Alfresco, please ensure that all CPUs have a clock speed of at least 2.5Ghz.

    At time of writing, this implies that:

    -   an X or M class Sun server is required, with careful CPU selection to ensure 2.5Ghz \(or better\) clock speed
    -   T class servers should not be used, as they do not support CPUs faster than approximately 2Ghz
    Understandably, Alfresco is unable to provide specific guidance on Sun server classes, models or configurations, so you should talk with your Oracle reseller to confirm that minimum CPU clock speed recommendations will be met.


**Parent topic:**[Day Zero architecture validation](../tasks/zeroday-architecture.md)

