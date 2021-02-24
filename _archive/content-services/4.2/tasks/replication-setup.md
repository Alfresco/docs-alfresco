---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: extended services mysql replication set up
---

# Setting up MySQL replication

This section describes the replication steps for the MySQL database.

1.  Open a MySQL command prompt on the master server.

2.  Grant the slave permission to replicate:

    ```
    GRANT REPLICATION SLAVE ON *.* TO <slave_user> IDENTIFIED BY '<slave_password>'
    ```

3.  If the master is not using the binary update log, add the following lines to my.cnf \(Linux\) or my.ini \(Windows\) configuration file on the master, and restart the server:

    ```
    [mysqld]
    log-bin
    server-id=1
    ```

    **Note:** By convention, server-id for the master is usually `server-id 1`, and any slaves from 2 onwards, although you can change this. If the master is already using the binary update log, either note the offset at the moment of the backup \(the next step\), or use the `RESET MASTER` statement to clear all binary logs and immediately begin the backup. You may want to make a copy of the binary logs before doing this if you need to use the binary logs to restore from backup.

4.  Make a backup of the database.

    This will be used to start the slave server. You can skip this step if you use the `LOAD DATA FROM MASTER` statement, but first review the following comments about locking the master.

5.  Add the following to the configuration file on the slave:

    ```
    master-host=master-hostname
    master-user=slave-user
    master-password=slave-password
    server-id=2
    ```

    The slave user and slave password are those to which you set when you granted `REPLICATION SLAVE` permission on the master. The `server-id` must be a unique number, different to the master or any other slaves in the system. There are also two other options: `master-port`, used if the master is running on a non-standard port \(3306 is default\), and `master-connect-retry`, a time in seconds for the slave to attempt to reconnect if the master goes down. The default is 60 seconds.

    Restore the data from the master, either as you would normally restore a backup or with the statement `LOAD DATA FROM MASTER`. The latter will lock the master for the duration of the operation, which could be quite lengthy, so you may not be able to spare the downtime.


**Parent topic:**[Setting up database replication](../concepts/replication.md)

