---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: tracking clusters
---

# Tracking clustering issues

This section describes how to track issues with clustering in a high availability environment.

1.  Enable the following log categories:

    -   `log4j.logger.net.sf.ehcache.distribution=DEBUG`

        Check that heartbeats are received from from live machines.

    -   `log4j.logger.org.alfresco.repo.node.index.IndexTransactionTracker=DEBUG`

        Remote index tracking for Alfresco DM.

    -   `log4j.logger.org.alfresco.repo.node.index.AVMRemoteSnapshotTracker=DEBUG`

        Remote index tracking for AVM.

2.  Enable the following JGroups logs:

    -   `log4j.logger.org.alfresco.repo.jgroups=debug`

        `log4j.logger.org.alfresco.enterprise.repo.cache.jgroups=debug`

        Checks heartbeat messages sent and received by machines in the cluster, and watches the entry and exit of cluster members.

3.  If cache clustering is not working, the EHCache website describes some common problems. The remote debugger can be downloaded as part of the EHCache distribution files and executed:

    ```
    > java -jar ehcache-1.3.0-remote-debugger.jar
    Command line to list caches to monitor: java -jar ehcache-remote-debugger.jar path_to_ehcache.xml
    Command line to monitor a specific cache: java -jar ehcache-remote-debugger.jar path_to_ehcache.xml cacheName
    ```


**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

