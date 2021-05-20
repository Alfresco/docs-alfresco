---
title: Administration of Desktop Sync
---

## Manage automatic configuration updates

If you're an IT administrator, you can upload a new configuration file to the repository so that it's automatically 
provided to all Desktop Sync clients.

This allows you to update the configuration file for all your Desktop Sync users without any manual intervention.

1. Create a **Desktop Sync** folder in the Alfresco Content Services repository path: `/Data Dictionary/`

2. Browse to the [Alfresco Support Portal](http://support.alfresco.com/) and download the configuration file: `AlfrescoSync.conf`.

3. Save the file in the new **Desktop Sync** folder.

    >**Note:** Don't rename the file, otherwise the configuration update won't work.

    Once the configuration file is uploaded, users receive a notification telling them that the new configuration 
    file has been downloaded.

    When the Desktop Sync client connects to the repository for file updates, it checks for new versions of the configuration. 
    The client periodically checks for new configuration files - no more than once per 24 hour period. 
    When a new configuration file is found, it's downloaded and retained in the appropriate folder. For example:

    * Windows: `<userHome>\AppData\Local\Alfresco`
    * Mac:`~/Library/Application Support/Alfresco`

    The existing configuration file is kept as a backup (i.e. `AlfrescoSync-backup.conf`).

    Users will have to restart Desktop Sync to apply the changes.

    >**Note:** If you're a Windows user, you'll see a message stating:
    >
    >```
    >C:\Users\Program Files\AppData\Local\Alfresco\AlfrescoSync.conf
    >This file has been modified by another program. Do you want to reload it?
    >```

4. Select **OK** to apply the changes to your configuration.

## Manage automatic installation updates

If you're an IT administrator, you can upload new installation files into the repository to automatically update 
all users with Desktop Sync clients.

This ensures users with Desktop Sync clients are always up to date with minimal manual intervention.

1. Create a **Desktop Sync** folder in the Alfresco Content Services repository path: `/Data Dictionary/`
2. Upload the latest installer files for Windows and Mac clients to this location.

    >**Note:** Don't rename the files, otherwise the client upgrade won't work.

    Once the installer files are uploaded, users receive a notification telling them that an update is available and a 
    new installation file has been downloaded.

    Users will have to restart Desktop Sync to apply the new installation file.

    See [Updating Desktop Sync]({% link desktop-sync/1.6/upgrade/index.md %}) for more information about how an update is applied.

## SAML authentication

Starting from version 1.4, Alfresco Desktop Sync users can authenticate through a SAML identity provider.

The following prerequisites are required:

* Alfresco Content Services 6.2 or later
* Alfresco Sync Service 3.3 or later
* Identity Service 1.1 or later

SAML authentication in Desktop Sync clients (Windows and Mac) is automatically enabled if the 
Alfresco Content Services repository is configured to use the Identity Service.

See the Alfresco Sync Service documentation for [SAML configuration]({% link sync-service/latest/config/index.md %}#saml-configuration) details.

Once users have entered the repository URL (shown in step 2 of [Setting up Desktop Sync]({% link desktop-sync/1.6/install/index.md %}#setting-up-desktop-sync-on-windows) for Windows and [Setting up Desktop Sync]({% link desktop-sync/1.6/install/index.md %}#faq/mac) for Mac), they will be asked to enter their username and password into the SAML provider login page via their default browser.
