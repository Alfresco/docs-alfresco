---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Synchronization configuration properties

The synchronization subsystem manages synchronization of Alfresco by configuring the subsystem's properties.

The following properties can be configured for the synchronization subsystem.

-   **synchronization.synchronizeChangesOnly**

    Specifies whether the scheduled synchronization job is run in differential mode. The default is true, which means that the scheduled sync job is run in differential mode \(rather than full mode\). Regardless of this setting a differential sync can still be triggered when a user who does not yet exist in Alfresco is successfully authenticated.

-   **synchronization.allowDeletions**

    Specifies if deletion of local users and groups is allowed. See the information about [Synchronization deletion](sync-delete.md) and [Collision resolution](sync-collision.md) for the circumstances under which this can happen. The default is true. If false, then no sync job will be allowed to delete users or groups during the handling of removals or collision resolution.

-   **synchronization.import.cron**

    Specifies a cron expression defining when the scheduled synchronization job should run, by default at midnight every day.

    For more information about the cron expression, see the [CronTrigger tutorial](http://www.quartz-scheduler.org/documentation/quartz-1.x/tutorials/crontrigger).

-   **synchronization.syncOnStartup**

    Specifies whether to trigger a differential sync when the subsystem starts up. The default is true. This ensures that when user registries are first configured, the bulk of the synchronization work is done on server startup, rather than on the first login.

-   **synchronization.syncWhenMissingPeopleLogIn**

    Specifies whether to trigger a differential sync when a user, who does not yet exist in Alfresco, is successfully authenticated. The default is true. If there are users created in the LDAP server that do not already exist in Alfresco, when you start Alfresco, a differential synchronization is triggered.

-   **synchronization.autoCreatePeopleOnLogin**

    Specifies whether to create a user with default properties when a user is successfully authenticated, who does not yet exist in Alfresco, and was not returned by a differential sync \(if enabled with the specified property\). The default is true. Setting this to false allows you to restrict Alfresco to a subset of those users who could be authenticated by LDAP; only those created by synchronization are allowed to log in. You can control the set of users in this more restricted set by overriding the user query properties of the LDAP authentication subsystem.


**Parent topic:**[Configuring synchronization](../concepts/sync-intro.md)

