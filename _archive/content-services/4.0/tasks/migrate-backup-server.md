---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: migrate back up server
---

# Backing up Alfresco Server 1

This task describes how to back up the first server for migration.

1.  Stop the application server to ensure that no changes can be made while backing up or restoring.

2.  Export the database to `dir.root` \(same location as content and indexes\).

3.  Copy the `configuration` directory to `dir.root.`

    For example:

    `cp -r tomcat/shared/classes/alfresco/extension alf_data`

4.  Back up dir.root.


**Parent topic:**[Migrating servers](../concepts/migrating-servers.md)

