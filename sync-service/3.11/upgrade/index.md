---
title: Upgrade Sync Service
---

Use these instructions to upgrade your instance of the Sync Service from version 2.2.0.

1. Download the latest Sync Service zip file from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Stop the Alfresco Content Services server.

3. Stop the Sync Service.

4. Back up Alfresco Content Services using the instructions in [Back up and restore the repository]({% link content-services/latest/admin/backup-restore.md %}).

5. Backup your Sync Service database using the steps in [Back up and restore Sync Service]({% link sync-service/3.11/admin/index.md %}#back-up-and-restore-sync-service).

6. Configure the Sync Service using the steps in [Install Sync Service]({% link sync-service/3.11/install/options.md %}).

7. Test that you can connect successfully to Alfresco Content Services from Desktop Sync.

> **Important:** When you apply the new Sync Service AMPs, apply them to clean/ vanilla WAR files to avoid the risk of having multiple versions of the same AMP. See [Uninstalling an AMP file]({% link content-services/latest/install/zip/amp.md %}#uninstall-an-amp-file) for information about removing AMPs.

> **Important:** When upgrading, ensure that you use the new `config.yml` supplied in the latest Sync Service ZIP. Copy your existing settings from the `config.yml` file into the new file. The differences in the `config.yml` file between 2.2.0 and 3.11 are detailed in the Releases Notes, which are available from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

> **Important:** When upgrading Alfresco Content Services, ensure that the correct licence file is installed in the Alfresco folder before starting Alfresco Content Services; Alfresco will not start correctly with the Sync Service AMP applied when an invalid licence is present. See [Uploading a new license]({% link content-services/latest/admin/license.md %}#uploadlicense) for details on adding license files.
