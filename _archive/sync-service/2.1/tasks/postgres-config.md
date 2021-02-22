---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Installing and configuring PostgreSQL database for Desktop Sync

Use these instructions to install and configure PostgreSQL database for Desktop Sync.

The synchronization service is not packaged with a PostgreSQL driver, so it will need to be downloaded separately and cited in the start-up. See [starting the synchronization service](desktop-sync-install.md#10).

Alfresco recommends that you use a separate PostgreSQL instance for the Desktop Sync service.

**Note:** Only the synchronization service communicates with the database. It persists events taken from the JMS queue into the database. The Alfresco One repository does not communicate with the database.

1.  Download the PostgreSQL database connector.

    -   For Windows: http://www.postgresql.org/download/windows/
    -   For Linux: http://www.postgresql.org/download/linux/
2.  Copy the JAR file into the same directory as the synchronization service jar.

3.  Increase the maximum connections setting in the PostgreSQL configuration file.

    1.  Locate the configuration file:

        -   Linux: /var/lib/pgsql/9.3/data/postgresql.conf
        -   Windows: C:\\Program Files\\PostgreSQL\\9.3\\data\\postgresql.conf
    2.  Add or edit the max\_connections property:

        ```
        max_connections = 275
        ```

        In PostgreSQL database, the default `max_connections` is `100`. So, the value of the `db.pool.max` property in the config.yml file must be less than or equal to `100`. This value can be changed to reflect the value set for the `max_connections` property in the PostgresSQL database.

    3.  Restart the database.

4.  Review your memory requirements in `work_mem` in the postgresql.conf file in your PostgreSQL directory.

    Increasing the `work_mem` value increases performance and allows PostgreSQL to perform larger in-memory sorting. For more information about PostgreSQL performance, see  [Tuning PostgreSQL](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server).

5.  Create a database named alfresco.

6.  Create a user named alfresco that you will use to run PostgreSQL, and ensure that this user has write permissions on all tables and sequences.

7.  Set a secured new user's password .

    This user password must match the password specified in the PostgreSQL settings in the AlfrescoSyncServer.zip/service-sync/config.yml file.

8.  Ensure the alfresco user has the required privileges to create and modify tables.


-   **[Additional PostgreSQL configuration requirements](../concepts/postgres-add-config.md)**  
For synchronization service installation, there are some additional PostgreSQL database configuration requirements.

**Parent topic:**[Installing Desktop Sync service](../tasks/desktop-sync-install.md)

