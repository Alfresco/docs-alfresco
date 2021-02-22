---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Backing up and restoring Desktop Sync

The approach to backup and restore is to ensure that the repository is backed up before the synchronization service, so that a subsequent restore can simply remove any tracked repository changes that occurred after the repository backup.

**Performing a backup**

1.  To perform a backup of your synchronization service database, follow these steps:

    1.  Backup your repository database. See [Backing up and restoring](http://docs.alfresco.com/5.0/concepts/ch-backup-restore.html).

    2.  After you have successfully backed up the repository, wait for a couple of minutes to ensure that the synchronization server has correctly tracked the repository after the repository backup.

    3.  Alternatively, ensure that all undelivered events in the event queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes` have been delivered such that `Messages Dequeued == Number Of Pending Messages`. Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

    4.  Backup your synchronization service database using your database vendor's backup/restore tools.

2.  To perform a restore, follow these steps:

    1.  Use the ActiveMQ console to check that all the events in the event queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes` have been consumed. Using the ActiveMQ console, you can either:

    -   remove any undelivered events in the Virtual Topic, `VirtualTopic.alfresco.repo.events.nodes` and associated queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes`, or
    -   delete the Virtual Topic, `VirtualTopic.alfresco.repo.events.nodes` and associated queue, `Consumer.<guid>.VirtualTopic.alfresco.repo.events.nodes`.

        Here, `guid` is the synchronization server id, which can be determined from the `syncServiceIdCheck` in the health check response, `https://localhost:9090/alfresco/healthcheck`.

        Note that the Virtual Topic and associated queue will be recreated automatically.

    1.  Restore the repository database. See [Backing up and restoring the repository](http://docs.alfresco.com/5.0/concepts/backup-intro.html).

    2.  Restore the synchronization service database using your database vendor's backup/restore tools.

    3.  Restart the synchronization service with the following additional command line parameter:

        ```
         -Drecover=<repo admin username>:<repo admin password>
        ```

        The synchronization service will ensure that it and the repository are in sync during bootstrap, before becoming available for requests.


