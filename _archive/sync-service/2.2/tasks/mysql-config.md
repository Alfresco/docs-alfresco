---
author: Alfresco Documentation
source: 
audience: 
category: Administration
apiname: configurationmysql
---

# Installing and configuring MySQL database

Use these instructions to install and configure a MySQL database for Sync Service.

Alfresco recommends that you use a separate MySQL instance for the Sync Service.

**Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository does not communicate with the database.

The Sync Service is not packaged with a MySQL driver, so it will need to be downloaded separately and cited in the start-up \(see [Starting the Sync Service](desktop-sync-install.md#10)\).



1.  Download the MySQL database connector from the [MySQL JDBC Driver download](https://dev.mysql.com/downloads/connector/j/) page.

2.  Copy the JAR file into the same directory as the Sync Service JAR.

3.  Locate the configuration file:

    -   For Linux: /etc/my.cnf
    -   For Windows: C:\\Users\\All Users\\MySQL\\MySQL Server 5.6\\my.ini
4.  Increase the maximum connections setting in the MySQL configuration file. In the `mysqld` section, add or edit the `max_connections` property:

    ```
    max_connections = 450
    ```

    If `max_connections` is left unchanged, bear in mind that in the MySQL database, the default `max_connections` is `151`. So, the value of the `db.pool.max` property in the config.yml file must be less than or equal to `151`.

    If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `max_connections` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

    For example, if `max_connections=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

5.  Set the `max_allowed_packet` parameter to an appropriate size, for example `1M`.

    ```
    max_allowed_packet=1M
    ```

    This helps to avoid [Packet too large](https://dev.mysql.com/doc/refman/5.7/en/packet-too-large.html) exceptions, since the average event size is 1300 bytes.

6.  To further improve InnoDB performance, you can increase the InnoDB buffer pool size.

    ```
    innodb_buffer_pool_size=2G
    ```

    The larger the InnoDB buffer pool, the more InnoDB acts like an in-memory database. The default value is `8M`. See the MySQL documentation on [Configuring the InnoDB buffer pool size](https://dev.mysql.com/doc/refman/5.7/en/innodb-buffer-pool-resize.html) for more details.

7.  Divide your buffer pool into separate instances:

    ```
    innodb_buffer_pool_instances=4
    ```

    This can improve concurrency by reducing contention, as different threads read and write to cached pages. Default value is 1 when `innodb_buffer_pool_size<1G`.

8.  Restart the database.

9.  Create a MySQL user with the username given by the sync property, `sql.db.username`, with password given by the sync property, `sql.db.password`:

    ```
    CREATE USER 'alfresco' IDENTIFIED BY 'admin';
    ```

10. Create a MySQL database with the name given by the property, `sql.db.url`, owned by the user, alfresco:

    ```
    sql:
        db: 
            url: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
    ```

    If the repository generates events for nodes with names or paths that require non-US-ASCII characters, you need to set the encoding for internationalization. This allows you to store content with accents in the repository. The database must be created with the UTF-8 character set and the `utf8_bin` collation. Although MySQL is a Unicode database, and uses Unicode strings in Java, the JDBC driver might corrupt your non-English data. Ensure that you keep the `?useUnicode=yes&characterEncoding=UTF-8` parameters at the end of the JDBC URL.

    **Note:** Ensure that the MySQL database is set to use UTF-8 and InnoDB

11. Ensure that the MySQL database is set to use UTF-8 and InnoDB:

    ```
    CREATE DATABASE alfresco DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
    GRANT ALL ON alfresco.* to alfresco IDENTIFIED BY 'admin';
    ```


**Parent topic:**[Installing and configuring databases](../concepts/syncservice-db-config.md)

