---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: [configuration, postgres]
---

# Installing and configuring PostgreSQL database

Use these instructions to install and configure a PostgreSQL database for Sync Service.

Alfresco recommends that you use a separate PostgreSQL instance for the Sync Service.

**Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository does not communicate with the database.

The Sync Service is not packaged with a PostgreSQL driver, so it will need to be downloaded separately and cited in the start-up \(see [Starting the Sync Service](desktop-sync-install.md#10)\).



1.  Download the appropriate driver that's compatible with JDBC41 from the [PostgreSQL JDBC Driver download](https://jdbc.postgresql.org/download.html) page.

2.  Copy the JAR file into the same directory as the Sync Service JAR.

3.  Increase the maximum connections setting in the PostgreSQL configuration file.

    1.  Locate the configuration file:

        -   Linux: /var/lib/pgsql/9.4/data/postgresql.conf
        -   Windows: C:\\Program Files\\PostgreSQL\\9.4\\data\\postgresql.conf
    2.  Add or edit the max\_connections property:

        ```
        max_connections = 450
        ```

        If `max_connections` is left unchanged, bear in mind that in the PostgreSQL database, the default `max_connections` is `100`. So, the value of the `db.pool.max` property in the config.yml file must be less than or equal to `100`.

        If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `max_connections` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

        For example, if `max_connections=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

    3.  Restart the database.

4.  Review your memory requirements in `work_mem` in the postgresql.conf file in your PostgreSQL directory.

    Increasing the `work_mem` value increases performance and allows PostgreSQL to perform larger in-memory sorting. For more information about PostgreSQL performance, see  [Tuning PostgreSQL](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server).

5.  Create a Postgres user with the username given by the sync property, `sql.db.username`, with password given by the sync property `sql.db.password`:

    ```
    CREATE USER alfresco WITH PASSWORD 'admin';
    ```

6.  Create a Postgres database with the name given in the property,  `sql.db.url`, owned by the user,  alfresco that you will use to run PostgreSQL, and ensure that this user has write permissions on all tables and sequences.

    ```
    CREATE DATABASE alfresco OWNER alfresco ENCODING 'utf8';
    GRANT ALL PRIVILEGES ON DATABASE alfresco TO alfresco;
    ```


-   **[Additional PostgreSQL configuration requirements](../concepts/postgres-add-config.md)**  
For the Sync Service installation, there are some additional PostgreSQL database configuration requirements.

**Parent topic:**[Installing and configuring databases](../concepts/syncservice-db-config.md)

