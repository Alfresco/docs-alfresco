---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Installation]
keyword: [install, check list, architecture, environment, validation]
---

# Validating the architecture

This section describes the steps required to validate the architecture to ensure that it meets the prerequisites for an Alfresco installation.

1.  Check the supported stacks list.

    Validate that your environment is on the supported stacks list on [http://www.alfresco.com](http://www.alfresco.com).

2.  Validate the disk performance

    One of the primary determinants of Alfresco's performance is I/O. Optimize the following, in priority order:

    -   I/O to the disk the relational database Alfresco is configured to use.
    -   I/O to the disk subsystem on which the Lucene indexes are stored.
    -   I/O to the disk subsystem on which the content is stored.
    It is recommended that the disk throughput is greater than 200MB/sec. On linux the hdparm tool can be used to measure disk throughput. A sample output is shown below \(on a SATA disk\)::

    ```
    
    hdparm -tT /dev/sda1
    /dev/sda1:
    Timing cached reads:   27998 MB in  2.00 seconds = 14018.28 MB/sec
    Timing buffered disk reads: 536 MB in  3.01 seconds = 178.05 MB/sec
    
    ```

    Other useful tools to detect disk I/O issues are: dd, seeker and iozone.

3.  Validate network performance

    In each case, the goal is to minimize the latency \(response time\) between Alfresco and the storage system, while also maximizing bandwidth. Low latency is particularly important for database I/O, and one rudimentary test of this is to \*ping\* the database server from the Alfresco server - round trip times greater than \*1ms\* indicate a sub-optimal network topology or configuration that will adversely impact Alfresco performance. Jitter \(highly variable round trip times\) is also of concern, as that will increase the variability of Alfresco's performance - the standard deviation for round trip times should be less than \*0.1ms\*. An example output of ping would be:

    ```
    
    ping -c 20 dbserver.com
    	   ...
    20 packets transmitted, 20 received, 0% packet loss, time 19029ms
    rtt min/avg/max/mdev = 0.286/0.750/1.818/0.391 ms
    
    ```

4.  Ensure that your system has a clock speed of greater than 2.5Ghz.

    For production use, this clock speed will ensure reasonable response times to the end user. Alfresco Enterprise 3.x and later versions have been tested on 64-bit CPU architectures, primarily because it allows the JVM to use more memory \(RAM\) that the earlier 32-bit CPU architecture.

    **Attention:** CPU clock speed is of particular concern for the Sun UltraSPARC architecture, as some current UltraSPARC based servers ship with CPUs that have clock speeds as low as 900Mhz, well below what is required for adequate Alfresco performance. If you intend to use Sun servers for hosting Alfresco, ensure that all CPUs have a clock speed of at least 2.5Ghz.

    This implies that:

    -   An X or M class Sun server is required, with careful CPU selection to ensure 2.5Ghz \(or better\) clock speed.
    -   T class servers should not be used, as they do not support CPUs faster than approximately 2Ghz. Alfresco is unable to provide specific guidance on Sun server classes, models, or configurations, so you should talk with your Sun reseller to confirm that minimum CPU clock speed recommendations will be met.
5.  Ensure that you allocate extra virtual memory on Linux systems.

    This extra space is required for processes within the Alfresco server that use the fork operation \(for example, ImageMagick \). Allocating this extra space ensures that Alfresco has sufficient memory to complete fork operations without reserving extra RAM.

6.  Validate the database.

    **Important:** Alfresco does not provide technical support for maintaining or tuning your relational database. Ensure that your project has access to a certified database administrator \(DBA\) to support your Alfresco installation.

    Regular maintenance and tuning of the Alfresco database is necessary. Specifically, all of the database servers that Alfresco supports require at the very least that some form of index statistics maintenance be performed at frequent, regular intervals to maintian optimal Alfresco performance.

    **Important:** Index maintenance can have a severe impact on Alfresco performance while in progress, hence it needs to be discussed with your project team and scheduled appropriately.

7.  Validate the Operating System.

    1.  Ensure that your chosen OS has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    2.  Alfresco recommends that a 64-bit OS is used. See the Supported Stacks list for information on the exceptions.

    3.  If your system is running Windows Server 2008 R2 or Windows 7, you need to install Fix373886. This is to avoid the "no buffer space available" exception on your system. For details, see the [Microsoft Support](http://support.microsoft.com/kb/2577795) website.

8.  Validate and tune the JVM.

    Ensure that your chosen JDK-enabled Java Virtual Machine has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    For information on configuring and tuning the JVM, refer to [Tuning the JVM](../concepts/jvm-tuning.md).

    **Note:** Alfresco requires an official Sun JDK. Other JVMs \(including OpenJDK, Harmony, gcj, JRockit, IBM, HP, and so on\) are not supported. Alfresco recommends using a 64-bit Sun JVM if the underlying platform \(operating system and hardware\) is 64-bit capable.


**Parent topic:**[Production environment checklist](../concepts/configuration-checklist.md)

