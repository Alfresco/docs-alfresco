---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Validating the architecture

There are a number of steps required to validate the architecture to ensure that it meets the prerequisites for an Alfresco Content Services installation.

1.  Validate that your environment is on the [Supported Platforms](http://www.alfresco.com/services/subscription/supported-platforms/) page.

    The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.

2.  Validate and optimize the hardware \(I/O subsystems and CPU\) settings.

    1.  Optimize the following I/O, in this order of priority:

        -   I/O to the relational database that Alfresco Content Services is configured to use.
        -   I/O to the disk subsystem on which the Solr indexes are stored.
        -   I/O to the disk subsystem on which the content is stored.
        I/O is one of the main factors that influence performance. In each case, the goal is to minimize the latency \(response time\) between Alfresco Content Services and the storage system, while also maximizing bandwidth. Low latency is particularly important for database I/O, and one rudimentary test of this is to ping the database server from the Alfresco Content Services server. Round trip times greater than 1ms indicate a suboptimal network topology or configuration that will adversely impact performance. “Jitter” \(highly variable round trip times\) is also of concern, as that will increase the variability of Alfresco Content Services performance.

        We recommend that the disk throughput is greater than 200 MB/sec. On Linux, use the `hdparm` tool to measure disk throughput. The following sample output is on an SATA disk:

        ```
        hdparm -tT /dev/sda1
        /dev/sda1:
        Timing cached reads:   27998 MB in  2.00 seconds = 14018.28 MB/sec
        Timing buffered disk reads: 536 MB in  3.01 seconds = 178.05 MB/sec
        ```

        Other useful tools for detecting disk I/O issues include `dd`, `seeker`, and `iozone`.

    2.  Ensure that your system has a clock speed of greater than 2.0 Ghz.

        For production use, this clock speed will ensure reasonable response times to the end user. Alfresco Content Services 3.x and later versions have been tested on 64-bit CPU architectures, primarily because it allows the JVM to use more memory \(RAM\) that the earlier 32-bit CPU architecture.

        **Attention:** CPU clock speed is of particular concern for the Orale UltraSPARC architecture, as some current UltraSPARC based servers ship with CPUs that have clock speeds as low as 900 Mhz, well below what is required for adequate performance. If you intend to use Oracle servers for hosting, ensure that all CPUs have a clock speed of at least 2.0 Ghz.

        This implies that:

        -   An X or M class Oracle server is required, with careful CPU selection to ensure 2.0 Ghz \(or better\) clock speed.
        -   T class servers should not be used, as they do not support CPUs faster than approximately 2 Ghz. We're unable to provide specific guidance on Oracle server classes, models, or configurations, so you should talk with your Oracle reseller to confirm that minimum CPU clock speed recommendations will be met.
3.  Validate the database.

    **Important:** We don't provide technical support for maintaining or tuning your relational database. Ensure that your project has access to a certified database administrator \(DBA\) to support your installation.

    Regular maintenance and tuning of the database is necessary. Specifically, all of the database servers that supports require at the very least that some form of index statistics maintenance be performed at frequent, regular intervals to maintain optimal performance.

    **Important:** Index maintenance can have a severe impact on performance while in progress, hence it needs to be discussed with your project team and scheduled appropriately.

4.  Validate the operating system \(OS\).

    1.  Ensure that your chosen OS has been officially certified for use with Alfresco Content Services \(refer to the supported stacks list for details\).

    2.  We recommend that a 64-bit OS is used.

5.  Validate and tune the JVM.

    Ensure that your chosen Java Virtual Machine has been officially certified for use witth Alfresco Content Services \(refer to the Supported Stacks list for details\).

    For information on configuring and tuning the JVM, refer to [Tuning the JVM](../concepts/jvm-tuning.md).


**Parent topic:**[Environment checklist](../concepts/configuration-checklist.md)

