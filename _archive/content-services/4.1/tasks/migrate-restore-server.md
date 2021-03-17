---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: migrate restore server
---

# Restoring to Server 2

This task describes how to restore a back up of a server to another server.

1.  Install a compatible Alfresco server. This is typically an identical version to server 1.

    **Note:** Do not start the new Alfresco server.

2.  Restore dir.root. If the path is different on server 2, change the dir.root configuration.

3.  Rename the new server's configuration directory.

    For example:

    mv tomcat/shared/classes/alfresco/extension new\_ext

4.  Move the configuration directory from dir.root to the appropriate location

    For example: 

    `mv alf_data/extension tomcat/shared/classes/alfresco`

5.  If any configuration references server 1 explicitly, change these references to server 2.

6.  Import the database from dir.root.

7.  Start the Alfresco server.


You should now have a new instance of Alfresco on a second server with identical data.

**Parent topic:**[Migrating servers](../concepts/migrating-servers.md)

