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

2.  Validate and optimize the hardware \(I/O subsystems and CPU\) settings.

    1.  Optimize the following I/O, in this order of priority:

        -   I/O to the relational database that Alfresco is configured to use.
        -   I/O to the disk subsystem on which the Lucene indexes are stored.
        -   I/O to the disk subsystem on which the content is stored.
        I/O is one of the main factors that influence Alfresco performance. In each case, the goal is to minimize the latency \(response time\) between Alfresco and the storage system, while also maximizing bandwidth. Low latency is particularly important for database I/O, and one rudimentary test of this is to ping the database server from the Alfresco server. Round trip times greater than 1ms indicate a suboptimal network topology or configuration that will adversely impact Alfresco performance. “Jitter” \(highly variable round trip times\) is also of concern, as that will increase the variability of Alfresco’s performance. The standard deviation for round trip times should be less than 0.1ms.

    2.  Ensure that your system has a clock speed of greater than 2.5Ghz.

        For production use, this clock speed will ensure reasonable response times to the end user. Alfresco Enterprise 3.x and later versions have been tested on 64-bit CPU architectures, primarily because it allows the JVM to use more memory \(RAM\) that the earlier 32-bit CPU architecture.

        **Attention:** CPU clock speed is of particular concern for the Sun UltraSPARC architecture, as some current UltraSPARC based servers ship with CPUs that have clock speeds as low as 900Mhz, well below what is required for adequate Alfresco performance. If you intend to use Sun servers for hosting Alfresco, ensure that all CPUs have a clock speed of at least 2.5Ghz.

        This implies that:

        -   An X or M class Sun server is required, with careful CPU selection to ensure 2.5Ghz \(or better\) clock speed.
        -   T class servers should not be used, as they do not support CPUs faster than approximately 2Ghz. Alfresco is unable to provide specific guidance on Sun server classes, models, or configurations, so you should talk with your Sun reseller to confirm that minimum CPU clock speed recommendations will be met.
3.  Validate the database.

    **Important:** Alfresco does not provide technical support for maintaining or tuning your relational database. Ensure that your project has access to a certified database administrator \(DBA\) to support your Alfresco installation.

    Regular maintenance and tuning of the Alfresco database is necessary. Specifically, all of the database servers that Alfresco supports require at the very least that some form of index statistics maintenance be performed at frequent, regular intervals to maintain optimal Alfresco performance.

    **Important:** Index maintenance can have a severe impact on Alfresco performance while in progress, hence it needs to be discussed with your project team and scheduled appropriately.

4.  Validate the Operating System.

    1.  Ensure that your chosen OS has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    2.  Alfresco recommends that a 64-bit OS is used. See the Supported Stacks list for information on the exceptions.

    3.  If your system is running Windows Server 2008 R2 or Windows 7, you need to install Fix373886. This is to avoid the "no buffer space available" exception on your system. For details, see the [Microsoft Support](http://support.microsoft.com/kb/2577795) website.

5.  Validate and tune the JVM.

    Ensure that your chosen JDK-enabled Java Virtual Machine has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    For information on configuring and tuning the JVM, refer to [Tuning the JVM](../concepts/jvm-tuning.md).

    **Note:** Alfresco requires an official Sun JDK. Other JVMs \(including OpenJDK, Harmony, gcj, JRockit, IBM, HP, and so on\) are not supported. Alfresco recommends using a 64-bit Sun JVM if the underlying platform \(operating system and hardware\) is 64-bit capable.


**Parent topic:**[Production environment checklist](../concepts/configuration-checklist.md)

