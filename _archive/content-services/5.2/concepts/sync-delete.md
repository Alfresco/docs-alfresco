---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Synchronization deletion

Users and groups removed from the LDAP directory or query are only identified when synchronization is triggered by the schedule job in either full mode or differential with removals mode.

Users and groups created as a result of a synchronization operation are tagged with an originating zone ID. This records the ID of the authentication subsystem instance that the user or group was queried from. On synchronization with a zone, only those users and groups tagged with that zone are candidates for deletion. This avoids accidental deletion of built-in groups, such as ALFRESCO\_ADMINISTRATORS.

When a removed user or group is detected, Alfresco Content Services will behave in one of two ways, depending on the value of the `synchronization.allowDeletions` property. When `true` \(the default value\), Alfresco Content Services simply deletes the user or group from the local repository. When false, the user or group is simply untagged from its zone, thus converting it to a local user or group. A removed user also loses its memberships from any of the LDAP groups they were in, whereas, a removed group is cleared of all their members. As the user or group is retained in the repository, this setting has the advantage that the site memberships for that user or group are remembered, should they later be reactivated.



**Parent topic:**[Configuring synchronization](../concepts/sync-intro.md)

