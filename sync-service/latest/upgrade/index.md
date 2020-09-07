---
title: Upgrade Sync Service
---

Use these instructions to upgrade your instance of the Sync Service from version 2.2.0 to version 3.3.

1. Download the latest synchronization service from [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}.

2. Stop the Alfresco Content Services server.

3. Stop the synchronization service.

4. Back up Alfresco Content Services using the instructions in [Backing up and restoring the repository](https://docs.alfresco.com/6.0/concepts/backup-intro.html){:target="_blank"}(#LINK).

5. Backup your Sync Service database using the instructions in [Backing up and restoring Sync Service]({% link sync-service/latest/admin/index.md %}).

6. Configure the synchronization service using the instructions in [Install Sync Service]({% link sync-service/latest/install/zip/index.md %}).

7. Test that you can connect successfully to Alfresco Content Services from Desktop Sync.

> **Important:** When you apply the new Sync Service AMPs, apply them to clean/ vanilla WAR files to avoid the risk of having multiple versions of the same AMP. See [Uninstalling an AMP file](https://docs.alfresco.com/5.2/tasks/uninstall-amp.html){:target="_blank"}(#LINK) for information about removing AMPs.

> **Important:** When upgrading, ensure that you use the new `config.yml` supplied in the latest synchronization service ZIP. Copy your existing settings from the `config.yml` file into the new file. The differences in the `config.yml` file between 2.2.0 and 3.3 are detailed in the Releases Notes, which are available from the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}.

> **Important:** When upgrading Alfresco Content Services, ensure that the correct licence file is installed in the Alfresco folder before starting Alfresco Content Services; Alfresco will not start correctly with the Sync Service AMP applied when an invalid licence is present. See [Uploading a new license](https://docs.alfresco.com/6.0/tasks/at-adminconsole-license.html){:target="_blank"}(#LINK) for details on adding license files.
