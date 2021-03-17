---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Synchronization triggers

Synchronization can be triggered by each of the following events:

-   **Startup**

    On system startup or restart of the Synchronization subsystem, a differential sync is triggered \(unless disabled with configuration\).

-   **Authentication**

    On successful authentication of a user who does not yet exist locally, a differential sync is triggered \(unless disabled with configuration\).

-   **Schedule**

    A scheduled job triggers synchronization in differential with removals mode every 24 hours. This can instead by scheduled in full mode if you set the `synchronization.synchronizeChangesOnly` property to false. The scheduling of this job can also be altered.


**Parent topic:**[Configuring synchronization](../concepts/sync-intro.md)

