---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: configuration
---

# Backing up and restoring Sync Service

The approach to backup and restore is to ensure that the repository is backed up before the Sync Service, so that a subsequent restore can simply remove any tracked repository changes that occurred after the repository backup.

1.  To perform a backup of your Sync Service database, follow these steps:

    1.  Backup your repository database. See [Backing up and restoring](http://docs.alfresco.com/5.2/concepts/ch-backup-restore.html).

    2.  After you have successfully backed up the repository, wait for a couple of minutes to ensure that the synchronization server has correctly tracked the repository after the repository backup.

    3.  Alternatively, ensure that all undelivered events in the event queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes` have been delivered such that `Messages Dequeued == Number Of Pending Messages`. Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

    4.  Backup your synchronization service database using your database vendor's backup/restore tools.

2.  To perform a restore, follow these steps:

    1.  Use the ActiveMQ console to check that all the events in the event queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes` have been consumed. Using the ActiveMQ console, you can either:

    -   Remove any undelivered events in the Virtual Topic, `VirtualTopic.alfresco.repo.events.nodes` and associated queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes`, or
    -   Delete the Virtual Topic, `VirtualTopic.alfresco.repo.events.nodes` and associated queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes`.

        Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

        Note that the Virtual Topic and associated queue will be recreated automatically.

    1.  Restore the repository database. See [Backing up and restoring the repository](http://docs.alfresco.com/5.2/concepts/backup-intro.html).

    2.  Restore the Sync Service database using your database vendor's backup/restore tools.

    3.  Restart the Sync Service with the following additional command line parameter:

        ```
         -Drecover=<repo admin username>:<repo admin password>
        ```

        The Sync Service will ensure that it and the repository are in sync during bootstrap, before becoming available for requests.


**Parent topic:**[Administering Sync Service](../concepts/desktop-sync.md)

