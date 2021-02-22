---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Deferring the start of cron based jobs

You can configure `alfresco-global.properties` and `dev-log4j.properties` to implement a global delay to cron based jobs; for example, until after the server has fully started.

You can set a delay for all cron based jobs; in other words, jobs that use the `org.alfresco.util.CronTriggerBean` class. The default value is 10 minutes.

1.  Shut down the Alfresco Content Services server.

2.  Locate and edit the alfresco-global.properties file in the <classpathRoot\> directory.

    For information about modifying the alfresco-global.properties file, see [Modifying the global properties file](global-props-config.md).

3.  Add two configurations to the `alfresco-global.properties` file, where the number in `startDelayMins=` is the number of minutes you want to delay your job. In this example, the delay length is 2 minutes:

    ```
    activities.feed.cleaner.cronExpression=0/1 * * * * ?
    activities.feed.cleaner.startDelayMins=2
    ```

4.  Extend the dev-log4j.properties with a new configuration in the <classpathRoot\>/alfresco/extension directory:

    ```
    log4j.logger.org.alfresco.repo.activities.feed.cleanup.FeedCleaner=trace
    ```

    This file will override subsystem settings that are not applicable in alfresco-global.properties. For more information about log4j extensions, see [log4j.properties file](../concepts/dev-extensions-modules-module-log4j.md).

5.  Start the server.

    After the specified interval, the `FeedCleaner` trace logs will be generated. In the example, the logs will start after two minutes.


**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

