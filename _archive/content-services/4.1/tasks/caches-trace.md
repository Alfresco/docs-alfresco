---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: core services trace cache
---

# Tracing the caches

This task describes how to trace the repository caches.

1.  To output detailed Ehcache usage information, set the following logging category to `DEBUG`:

    `org.alfresco.repo.cache.EhCacheTracerJob`

2.  To target specific caches, you can append the cache name or package, for example:

    `org.alfresco.repo.cache.EhCacheTracerJob.org.alfresco`

3.  Open to the <configRoot\>\\alfresco\\scheduled-jobs-context.xml file.

4.  Locate the following bean:

    `ehCacheTracerJob`

    Override this bean to change the trigger schedule.

5.  Uncomment the `scheduler` property to activate the trigger.

    When `ehCacheTracerJob` is triggered, the job will collect detailed cache usage statistics and output them to the log/console, depending on how logging has been configured for the server.

6.  To ensure that caches use statistics, set the statistics property for all caches.

    `statistics="true"`

    Use the cluster cache sample file or copy the default cache configuration file into the <extensions\> directory.


**Parent topic:**[Configuring the repository cache](../concepts/cache-memorysettings.md)

