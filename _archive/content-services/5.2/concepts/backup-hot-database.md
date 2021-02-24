---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Backup and restore
option: hot backup
---

# Backing up the database

In an Alfresco Content Services system, the ability to support hot backup is dependent on the hot backup capabilities of the database product it's configured to use.

Database hot backup requires a tool that can snapshot a consistent version of the Alfresco Content Services database \(that is, it must capture a transactionally-consistent copy of all the tables in the database\). In addition, to avoid serious performance problems in the running the system while the backup is in progress, this snapshot operation should either operate without locking in the database or it should complete quickly \(within seconds\).

Backup capabilities vary widely between relational database products, and you should ensure that any backup procedures that are instituted are validated by a qualified, experienced database administrator before being put into a production environment.

**Parent topic:**[Performing a hot backup](../tasks/backup-hot.md)

