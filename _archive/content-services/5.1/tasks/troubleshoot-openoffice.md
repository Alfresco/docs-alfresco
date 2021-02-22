---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: OpenOffice subsystem
---

# Troubleshooting LibreOffice subsystems

Use these tips for troubleshooting the LibreOffice subsystems.

1.  Enable the following log4j properties to debug:

    ```
    log4j.logger.org.alfresco.enterprise.repo.content=DEBUG
    log4j.logger.org.artofsolving.jodconverter=DEBUG
    ```

    For information about how to create a `log4j.properties` file, see [Key tools and files](../concepts/audit-key-tools-files.md).

    **Note:** The OOoDirect debug entry is: `log4j.logger.org.alfresco.repo.content.transform=DEBUG`.

2.  If Tomcat is not shutdown gracefully, the soffice.bin process cannot be stopped. This can result in errors when starting Tomcat with port 8080 being is use. If this occurs, manually kill the soffice.bin process.

3.  You might see a failure to connect error message.

    If the LibreOffice process takes more than 10 seconds to fully start up, then Alfresco fails to connect to it. If this occurs, manually kill the soffice.bin process before attempting to restart the Jodconverter subsystem.

    **Note:** The next time that you start LibreOffice, it usually starts fast enough to connect \(this is due to operating system caching\).

4.  If the LibreOffice home location is incorrect, the Jodconverter subsystem will still start, but no LibreOffice process will be running or connected. The error is reported in the console but not in the alfresco.log file.

    The correct value for the `jodconverter.officeHome` property varies with host operating system.

    -   For Mac OS X, it should be set to the directory that contains MacOS/soffice.bin, which is /Applications/LibreOffice/Contents by default.
    -   For other operating systems, it should be set to the directory that contains program/soffice.bin.
5.  When restarting the Jodconverter subsystem using JMX, you need to set the enabled property to true \(this will also stop the JOD subsystem if it is running\); then use the **start** operation to start the Jodconverter subsystem with the new property settings.

6.  The JodConverter can run a pool of multiple reusable instances of the soffice LibreOffice process. To use this capability, set the `jodconverter.portNumbers` property to a comma-separated list of port numbers, all of which must be available for use. For example, `2022, 2023, 2024` for a pool of three `soffice` processes.

7.  The JodConverter supports configurable restart behavior for the LibreOffice `soffice` process. To ensure that potential memory leaks in LibreOffice do not accumulate and affect performance, the JodConverter will restart an `soffice` process after a given number of tasks \(transformations, metadata extractions\) have been performed. The default for `jodConverter.maxTasksPerProcess` is 200.

8.  The JodConverter allows long-running or hung tasks to be timed out. The first timeout is controlled by `jodconverter.taskQueueTimeout`, which is 30000 by default \(30000 milliseconds = 30 seconds\). If a task spends this long in a JodConverter queue awaiting execution, it will be dropped from the queue. The second timeout is controlled by `jodconverter.taskExecutionTimeout`, which is 120000 by default \(120000 milliseconds = 2 minutes\). If a task has been executing within an `soffice` process for longer than this period, that `soffice` process will be terminated and restarted.

9.  Throughput of OOo-related tasks, such as transformations, can be balanced against available hardware resources \(memory, CPU\) by altering the pool size and the two timeout timers.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

