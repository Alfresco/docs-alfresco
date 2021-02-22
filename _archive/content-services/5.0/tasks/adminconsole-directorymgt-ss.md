---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Managing synchronization settings

The synchronization settings manage the synchronization of Alfresco with all the user registries \(LDAP servers\) in the authentication chain. This topic describes how to configure the synchronization subsystem.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  Under the Authentication Chain section, click **Synchronization Settings**.

    You see the Synchronization Settings page.

4.  Set the synchronization properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Sync on Startup**|Yes|This triggers synchronization when the subsystem starts up. This ensures that when the user registries are first configured, bulk of synchronization work is done on server startup, rather than on the first login.|
    |**Sync When Missing People Login**|Yes|This triggers synchronization when a user, who does not yet exist in Alfresco, is successfully authenticated. The default is true.|
    |**Allow Deletions**|Yes|This triggers deletion of the local users and groups during synchronization when handling removals or collision resolution. The default is true. If false, then no sync job will be allowed to delete users or groups during the handling of removals or collision resolution.|
    |**Logging Interval**|100|This specifies the number of user or group entries processed during synchronization before the progress is logged at INFO level. It requires the following default entry in log4j.properties:     ```
log4j.logger.org.alfresco.repo.security.sync=info
    ```

The default is 100.|
    |**Auto Create People On Login**|Yes|This specifies whether to create a user with default properties, when a user is successfully authenticated, who does not yet exist in Alfresco, and was not returned by synchronization \(if enabled with the **Sync When Missing People Login** property\). The default is true.|
    |**Sync Changes Only**|Yes|This triggers a differential synchronization. Deselect this option, to run full synchronization. Regardless of this setting, a differential synchronization can still be triggered when a user, who does not yet exist in Alfresco, is successfully authenticated.|
    |**Import CRON Expression**|0 0 0 \* \* ?|This specifies a cron expression which defines when the scheduled synchronization job should run. By default, this is every 24 hours at midnight.|
    |**Sync Worker Threads**|1|This specifies the number of worker threads used for synchronization. The default is 1.|

    **Note:** Settings are common to all the directories for which synchronization is enabled.

5.  Click **Save** to apply the changes you have made to the authentication chain.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing the authentication chain](../tasks/adminconsole-directorymgt-ac.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

