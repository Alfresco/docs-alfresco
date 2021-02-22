---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: extended services replication set up
---

# Setting up database replication

Replication allows you to continuously copy a database to a different server.

To enable replication, you set one server \(the slave\) to take all its updates from the other server \(the master\). During replication, no *data* is actually copied. It is the SQL *statements* that manipulate the data that is copied.

All statements that change the master database are stored in the master's binary logs. The slave reads these logs and repeats the statements on its own database. The databases will not necessarily be exactly synchronized. Even with identical hardware, if the database is actually in use, the slave will always be behind the master. The amount by which the slave is behind the master depends on factors such as network bandwidth and geographic location. The other server can be on the same computer or on a different computer. The effect of replication is to allow you to have a nearly current standby server.

Using more than one server allows you to share the read load. You can use two slaves. If one of the three servers fails, you can use one server for service while another server can copy to the failed server. The slaves need not be running continuously. When they are restarted, they catch up. With one or more slaves you can stop the slave server to use a traditional backup method on its data files.

Each slave uses as much space as the master \(unless you choose not to replicate some tables\) and must do as much write work as the master does to keep up with the write rate. Do not be without at least one slave or comparable solution if high reliability matters to you.

**Note:** Replication is not another form of back up. You must do normal backups as well as replication. If a user mistypes a DELETE statement on the master, the deletion is faithfully reproduced on the slave.

-   **[Setting up MySQL replication](../tasks/replication-setup.md)**  
This section describes the replication steps for the MySQL database.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

