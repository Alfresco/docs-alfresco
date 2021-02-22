---
author: Alfresco Documentation
source: 
---

# Upgrading Sync Service

Use these instructions to upgrade your instance of the Sync Service from version 2.1.x to version 2.2.0.

1.  Download the latest synchronization service from [Alfresco Support Portal](http://support.alfresco.com/).

2.  Stop the Alfresco Content Services server.

3.  Stop the synchronization service.

4.  Back up Alfresco Content Services using the instructions in [Backing up and restoring the repository](https://docs.alfresco.com/5.2/concepts/backup-intro.html).

5.  Backup your Sync Service database using the instructions in [Backing up and restoring Sync Service](ds-backup-restore.md).

6.  Configure the synchronization service using the instructions in [Installing Desktop Sync service](desktop-sync-install.md).

7.  Test that you can connect successfully to Alfresco Content Services from Desktop Sync.


**Important:** When you apply the new Sync Service AMPs, apply them to clean/ vanilla WAR files to avoid the risk of having multiple versions of the same AMP. See [Uninstalling an AMP file](https://docs.alfresco.com/5.2/tasks/uninstall-amp.html) for information about removing AMPs.

**Important:** When upgrading, ensure that you use the new config.yml supplied in the latest synchronization service ZIP. Copy your existing settings from the config.yml file into the new file. The differences in the config.yml file between 2.1.1 and 2.2.0 are detailed in the Releases Notes, which are available from the [Alfresco Support Portal](http://support.alfresco.com/).

**Parent topic:**[Alfresco Sync Service 2.2](../concepts/syncservice-overview.md)

