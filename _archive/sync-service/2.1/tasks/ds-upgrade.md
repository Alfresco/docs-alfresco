---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Upgrading Desktop Sync

Use these instructions to upgrade your instance of Desktop Sync synchronization service.

1.  Stop the Alfresco server.

2.  Stop the synchronization service.

3.  Backup your synchronization service PostgreSQL database.

4.  Browse to the [Alfresco Support Portal](http://support.alfresco.com) and download the latest synchronization service zip.

5.  Configure the synchronization service using the instructions in [Installing Desktop Sync service](desktop-sync-install.md).

    **Note:** When you apply the new Desktop Sync AMPs, apply them to clean/ vanilla WAR files to avoid the risk of having multiple versions of the same AMP.


Test that you can connect successfully to Alfresco from Desktop Sync.

**Parent topic:**[Administering Desktop Sync](../concepts/desktop-sync.md)

