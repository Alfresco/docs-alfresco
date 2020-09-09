---
title: Manage automatic configuration updates
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
