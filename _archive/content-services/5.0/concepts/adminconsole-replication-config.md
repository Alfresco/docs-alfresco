---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Working with the replication service

The **Replication Service** page in Admin Console displays the settings to enable or disable the replication service and to control permissions.

The replication service allows content to be replicated \(transferred\) between distinct Alfresco repositories. For more information, see [Managing replication jobs](admintools-replication-intro.md).

|Replication service property|Example setting|What is it?|
|----------------------------|---------------|-----------|
|**Replication Enabled**|disabled|Enables or disables the ability to replicate content from this repository.|
|**Replicate Read Only**|enabled|Enables or disables the permission settings for replicas in the target repository. The default setting is enabled, which sets the replicas as read-only. Replicas are normally read-only to enforce integrity. This option should only be disabled for specific use cases.|

**Parent topic:**[Admin Console: Repository Services](../concepts/adminconsole-reposervices.md)

**Related information**  


[Launching the Admin Console](../tasks/adminconsole-open.md)

[Managing replication jobs](admintools-replication-intro.md)

[Setting up replication jobs](admintools-replication-config.md)

