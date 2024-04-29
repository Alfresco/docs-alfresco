---
title: Run Sync Service via a script
---

Use these instructions to run the Sync Service using a script.

Ensure that you've installed the required software before installing Sync Service.

Before you start the Sync Service, see the [Prerequisites]({% link sync-service/4.0/install/index.md %}) and `Readme.txt` file included in the `AlfrescoSyncServer-4.0.x.zip` for more information.

1. Create a user that you'll use to run the process.

    1. For Linux:

        Create a user named **dsync** that you'll use to run the process, with user home set to `/opt/alfresco-sync-service`.

        For example:

        ```bash
        sudo useradd -m -d /opt/alfresco-sync-service dsync
        ```

        The format of the command is: `sudo useradd -m -d </PATH/TO/FOLDER> <USERNAME>`

    2. For Windows:

        You only need a dedicated user if JMX remote authentication is enabled. See `Readme.txt` file in `AlfrescoSyncServer-4.0.x.zip` for details.

2. Use one of the start up scripts from the distribution zip.

    * For Linux: `syncservice.sh`
    * For Windows: `syncservice.bat`

    On Linux:

    1. Make the script file executable:

        ```bash
        sudo chmod +x /opt/alfresco-sync-service/syncservice.sh
        ```

    2. Start the Sync Service by issuing the following command:

        ```bash
        sudo /opt/alfresco-sync-service/syncservice.sh start
        ```

    3. Stop the Sync Service by issuing the following command:

        ```bash
        sudo /opt/alfresco-sync-service/syncservice.sh stop
        ```

    On Windows:

    1. Run `syncservice.bat` to start the Sync Service.

    2. Press `CTRL+C` to stop the Sync Service, or via JMX. See `Readme.txt` for more.
