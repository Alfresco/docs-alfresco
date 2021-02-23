---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Validating the architecture

Use these steps to validate the architecture of an Alfresco installation against the recommended prerequisites.

1.  Validate the disk performance. See [Hardware settings](../concepts/zeroday-hardware.md) for more information.

2.  Validate network performance.

    In each case, the goal is to minimize the *latency* \(response time\) between Alfresco and the storage system, while also maximizing bandwidth. Low latency is particularly important for database I/O, and one rudimentary test of this is to `ping` the database server from the Alfresco server - round trip times greater than \*1ms\* indicate a sub-optimal network topology or configuration that will adversely impact Alfresco performance. *Jitter* \(highly variable round trip times\) is also of concern, as that will increase the variability of Alfresco's performance. The standard deviation for round trip times should be less than 0.1ms.

    An example ping is:

    ```
    ping -c 20 dbserver.com
    	   ...
    20 packets transmitted, 20 received, 0% packet loss, time 19029ms
    rtt min/avg/max/mdev = 0.286/0.750/1.818/0.391 ms
    ```

3.  Ensure that your system has a clock speed of greater than 2.5Ghz. See [Hardware settings](../concepts/zeroday-hardware.md) for more information.

4.  Ensure that you allocate extra virtual memory on Linux systems.

    This extra space is required for processes within the Alfresco server that use the fork operation \(for example, ImageMagick\). Allocating this extra space ensures that Alfresco has sufficient memory to complete fork operations without reserving extra RAM.

5.  Validate the database.

    **Important:** Alfresco does not provide technical support for maintaining or tuning your relational database. Ensure that your project has access to a certified database administrator \(DBA\) to support your Alfresco installation.

    Regular maintenance and tuning of the Alfresco database is necessary. Specifically, all of the database servers that Alfresco supports require at the very least that some form of index statistics maintenance be performed at frequent, regular intervals to maintain optimal Alfresco performance.

    **Important:** Index maintenance can have a severe impact on Alfresco performance while in progress, hence it needs to be discussed with your project team and scheduled appropriately.

6.  Validate the operating system.

    1.  Ensure that your chosen OS has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    2.  Alfresco recommends that a 64-bit OS is used. See the Supported Stacks list for information on the exceptions.

    3.  If your system is running Windows Server 2008 R2 or Windows 7, you need to install Fix373886. This is to avoid the "no buffer space available" exception on your system. For details, see the [Microsoft Support](http://support.microsoft.com/kb/2577795) website.

7.  Validate and tune the JVM.

    Ensure that your chosen JDK-enabled Java Virtual Machine has been officially certified for use with Alfresco \(refer to the Supported Stacks list for details\).

    For information on configuring and tuning the JVM, refer to [Tuning the JVM](../concepts/jvm-tuning.md).


**Parent topic:**[Day Zero architecture validation](../tasks/zeroday-architecture.md)

**Parent topic:**[Production environment checklist](../concepts/configuration-checklist.md)

