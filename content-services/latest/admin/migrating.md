---
title: Migration
---

You can perform various migration procedures for Content Services servers and databases.

## Migrate servers

The process of migrating an instance of Content Services running on one server to another server follows a similar pattern to the backup process, with additional steps to ensure any configuration is also copied over.

The `dir.root` property is usually defined in the `alfresco-global.properties` file.

The `dir.root` is often a directory named `alf_data` within the directory where Content Services is installed, and will hold both content and full text indexes by default. The `dir.root` location is also reported in the logs when the server is started.

### Back up Content Services Server 1

This task describes how to back up the first server for migration.

1. Stop the Content Services server to ensure that no changes can be made while backing up or restoring.

2. Export the database to `dir.root` (same location as content and indexes).

3. Copy the configuration directory to `dir.root`.

    For example:

    ```bash
    cp -r tomcat/shared/classes/alfresco/extension alf_data
    ```

4. Back up `dir.root`.

### Restore to Content Services Server 2

This task describes how to restore a back up of a server to another server.

1. Install a compatible Content Services server. This is typically an identical version to server 1.

    > **Note:** Do not start the new server.

2. Restore `dir.root`. If the path is different on server 2, change the `dir.root` configuration.

3. Rename the new server's configuration directory.

    For example:

    ```bash
    mv tomcat/shared/classes/alfresco/extension new_ext
    ```

4. Move the configuration directory from `dir.root` to the appropriate location

    For example:

    ```bash
    mv alf_data/extension tomcat/shared/classes/alfresco
    ```

5. If any configuration references server 1 explicitly, change these references to server 2.

6. Import the database from `dir.root`.

7. Start the server.

You should now have a new instance of Content Services on a second server with identical data.
