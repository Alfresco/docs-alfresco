---
title: Install and configure databases
---

Use these instructions to install and configure a database for Sync Service.

{% capture postgres %}

Alfresco recommends that you use a separate PostgreSQL instance for the Sync Service.

> **Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository doesn't communicate with the database.

The Sync Service isn't packaged with a PostgreSQL driver, so it'll need to be downloaded separately and cited in the start-up. See step [Starting the Sync Service]({% link sync-service/3.10/install/options.md %}).

1. Download the appropriate driver that's compatible with JDBC42 from the [PostgreSQL JDBC Driver download](https://jdbc.postgresql.org/download.html){:target="_blank"} page.

2. Copy the JAR file into the same directory as the Sync Service JAR.

3. Increase the maximum connections setting in the PostgreSQL configuration file.

    1. Locate the configuration file:

        * Linux: `/var/lib/pgsql/9.4/data/postgresql.conf`
        * Windows: `C:\Program Files\PostgreSQL\9.4\data\postgresql.conf`

    2. Add or edit the `max_connections` property:

        ```bash
        max_connections = 450
        ```

        If `max_connections` is left unchanged, bear in mind that in the PostgreSQL database, the default `max_connections` is `100`. So, the value of the `db.pool.max` property in the `config.yml` file must be less than or equal to `100`.

        If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `max_connections` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

        For example, if `max_connections=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

    3. Restart the database.

4. Review your memory requirements in `work_mem` in the `postgresql.conf` file in your PostgreSQL directory.

    Increasing the `work_mem` value increases performance and allows PostgreSQL to perform larger in-memory sorting. For more information about PostgreSQL performance, see  [Tuning PostgreSQL](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server){:target="_blank"}.

5. Create a Postgres user with the username given by the sync property, `sql.db.username`, with password given by the sync property `sql.db.password`:

    ```sql
    CREATE USER alfresco WITH PASSWORD 'admin';
    ```

6. Create a Postgres database with the name given in the property,  `sql.db.url`, owned by the user `alfresco` that you will use to run PostgreSQL, and ensure that this user has write permissions on all tables and sequences.

    ```sql
    CREATE DATABASE alfresco OWNER alfresco ENCODING 'utf8';
    GRANT ALL PRIVILEGES ON DATABASE alfresco TO alfresco;
    ```

7. Ensure `sql.db.driver` and `sql.db.url` are correctly updated in the `config.yml` file, e.g.

    ```yaml
    sql:
        db:
            driver: org.postgresql.Driver
            url: jdbc:postgresql://localhost:5432/alfresco
    ```

### Additional PostgreSQL configuration requirements

For the Sync Service installation, there are some additional PostgreSQL database configuration requirements.

The PostgreSQL settings to configure depends on:

* Level of repository activity: A higher activity increases the database insert/update and auto_vacuum analyze load.
* Number of syncs: A higher number of syncs results in a higher query load. The sizing of memory buffers need to reflect this.
* Event size: The average event size is 1300 bytes.

#### Sync activity level

Setting affected by the sync activity level include:

* `work_mem`: The sync query result set sizes may be large for subscriptions that haven't been synced for a while. Also, the subscriptions need to be sorted. By default, the client will sync every 5 minutes so the number of sync changes is not likely to be very large, but clients that are offline will build up large outstanding sync result sets. Set `work_mem` higher if clients are expected to be offline for long periods of time.

#### Repository activity level

Settings affected by repository activity level include:

* `autovacuum_naptime`: The database is split into half between writes (event persistence) and reads (sync changes). For a more write heavy installation in which the repository updates outweigh the sync activity, this property needs to be set lower so that the new events are incorporated into the table statistics (and hence indexes are used optimally).
* `autovacuum_analyze_threshold`: The default value is 50 tuples. For a more repository update heavy installation, set this property to a low value to help with queries.

#### Disk space

Disk space is required for the events and subscriptions. The events use most of the disk space. A typical operation, such as add folder/document, update document, delete folder/document, move folder/document will result in 1-10 events. More complex operations, such as create site will generate more.

A cleanup job runs periodically to clean up events that are older than a configurable number. The default value is 28 days, so the disk space is required to cover this time period. The disk space is set using the `sync.cleanup` property in the `config.yml` file.

A rough estimate of disk space requirements for PostgreSQL database can be calculated as follows:

```bash
(#update operations per hour * 24*28 * 5 * 1300) / (1024*1024) MB
```

So based on the above assumptions and 100 operations per hour, we have ~416MB.

The following query will give the disk space usage for each of the Sync Service tables and indexes:

```sql
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_relation_size(C.oid)) AS "size"
FROM pg_class C
LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
WHERE nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
AND relname like '%sync%'
ORDER BY pg_relation_size(C.oid) DESC
LIMIT 200;
```

{% endcapture %}

{% capture oracle %}

Alfresco recommends that you use a separate Oracle instance for the Sync Service.

> **Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository does not communicate with the database.

The Sync Service isn't packaged with an Oracle driver, so it'll need to be downloaded separately and cited in the start-up. See step [Starting the Sync Service]({% link sync-service/3.10/install/options.md %}).

1. Download the Oracle database connector `ojdbc7.jar` from the [Oracle JDBC Driver download](https://www.oracle.com/database/technologies/jdbc-drivers-12c-downloads.html){:target="_blank"} page.

2. Copy the JAR file into the same directory as the Sync Service JAR.

    The JDBC driver for Oracle is in the JAR file: `ojdbc7.jar`.

    However, if you see the following error, then add the `Doracle.jdbc.thinLogonCapability=o3` parameter to `JAVA_OPTS`:

    ```bash
    java.sql.SQLException: OAUTH marshaling failure
    ```

3. The Oracle database must be created with the AL32UTF8 character set. Check the current character set by executing:

    ```sql
    SELECT value$ FROM sys.props$ WHERE name = 'NLS_CHARACTERSET' ;
    ```

    Have a look at this quick tutorial to alter the character set: [Change Oracle Database Character Set : NLS_CHARACTERSET](https://easyoradba.com/2010/07/02/change-oracle-database-character-set-nls_characterset/){:target="_blank"}.

4. Increase the maximum connections setting in the Oracle configuration file. The property `processes` specifies the maximum number of operating system user processes that can simultaneously connect to Oracle. This effectively determines the maximum number of concurrent users in the system.

    ```bash
    alter system set processes=450 scope=spfile
    ```

    The value of the `db.pool.max` property in the  `config.yml` file must be less than `processes`.

    If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `processes` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

    For example, if `processes=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

5. Create a user with the username given by the sync property, `sql.db.username`, with password given by the sync property, `sql.db.password`:

    ```sql
    CREATE USER alfresco IDENTIFIED BY admin;
    ```

6. Grant the alfresco user Connect and Resource privileges in Oracle.

    1. Grant the user write permissions on all tables and sequences:

        ```sql
        GRANT CONNECT, RESOURCE TO alfresco;
        ```

    2. Configure the privileges by using one of the following commands:

        ```sql
        ALTER USER alfresco QUOTA <QUOTE_M> ON Users;
        ```

        or

        ```sql
        GRANT UNLIMITED TABLESPACE TO alfresco
        ```

        > **Note:** If the privileges on tablespace "USERS" aren't set correctly, you may see the following error:

        ```bash
        ORA-01950: no privileges on tablespace 'USERS'
        ```

7. Ensure `sql.db.driver` and `sql.db.url` are correctly updated in the `config.yml` file, for example:

    ```yaml
    sql:
        db:
            driver: oracle.jdbc.OracleDriver
            url: jdbc:oracle:thin:@//localhost:1521/xe
    ```

{% endcapture %}

{% capture mysql %}

Alfresco recommends that you use a separate MySQL instance for the Sync Service.

**Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository doesn't communicate with the database.

The Sync Service isn't packaged with a MySQL driver, so it'll need to be downloaded separately and cited in the start-up. See step [Starting the Sync Service]({% link sync-service/3.10/install/options.md %}).

1. Download the MySQL database connector from the [MySQL JDBC Driver download](https://dev.mysql.com/downloads/connector/j/) page.

2. Copy the JAR file into the same directory as the Sync Service JAR.

3. Locate the configuration file:

    * For Linux: `/etc/my.cnf`
    * For Windows: `C:\Users\All Users\MySQL\MySQL Server 5.6\my.ini`

4. Increase the maximum connections setting in the MySQL configuration file. In the `mysqld` section, add or edit the `max_connections` property:

    ```bash
    max_connections = 450
    ```

    If `max_connections` is left unchanged, bear in mind that in the MySQL database, the default `max_connections` is `151`. So, the value of the `db.pool.max` property in the config.yml file must be less than or equal to `151`.

    If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `max_connections` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

    For example, if `max_connections=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

5. Set the `max_allowed_packet` parameter to an appropriate size, for example `1M`.

    ```bash
    max_allowed_packet=1M
    ```

    This helps to avoid [Packet too large](https://dev.mysql.com/doc/refman/5.7/en/packet-too-large.html){:target="_blank"} exceptions, since the average event size is 1300 bytes.

6. To further improve InnoDB performance, you can increase the InnoDB buffer pool size.

    ```bash
    innodb_buffer_pool_size=2G
    ```

    The larger the InnoDB buffer pool, the more InnoDB acts like an in-memory database. The default value is `8M`. See the MySQL documentation on [Configuring the InnoDB buffer pool size](https://dev.mysql.com/doc/refman/5.7/en/innodb-buffer-pool-resize.html){:target="_blank"} for more details.

7. Divide your buffer pool into separate instances:

    ```bash
    innodb_buffer_pool_instances=4
    ```

    This can improve concurrency by reducing contention, as different threads read and write to cached pages. Default value is 1 when `innodb_buffer_pool_size<1G`.

8. Restart the database.

9. Create a MySQL user with the username given by the sync property, `sql.db.username`, with password given by the sync property, `sql.db.password`:

    ```sql
    CREATE USER 'alfresco' IDENTIFIED BY 'admin';
    ```

10. Create a MySQL database with the name given by the property, `sql.db.url`, owned by the user, `alfresco`:

    ```yaml
    sql:
        db:
            url: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
    ```

    If the repository generates events for nodes with names or paths that require non-US-ASCII characters, you need to set the encoding for internationalization. This allows you to store content with accents in the repository. The database must be created with the UTF-8 character set and the `utf8_bin` collation. Although MySQL is a Unicode database, and uses Unicode strings in Java, the JDBC driver might corrupt your non-English data. Ensure that you keep the `?useUnicode=yes&characterEncoding=UTF-8` parameters at the end of the JDBC URL.

    > **Note:** Ensure that the MySQL database is set to use UTF-8 and InnoDB.

11. Ensure that the MySQL database is set to use UTF-8 and InnoDB:

    ```sql
    CREATE DATABASE alfresco DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
    GRANT ALL ON alfresco.* to alfresco IDENTIFIED BY 'admin';
    ```

12. Ensure `sql.db.driver` and `sql.db.url` are correctly updated in the `config.yml` file, for example:

    ```yaml
    sql:
        db:
            driver: com.mysql.jdbc.Driver
            url: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
    ```

{% endcapture %}

{% include tabs.html tableid="databases" opt1="Postgres" content1=postgres opt2="Oracle" content2=oracle opt3="MySQL" content3=mysql %}
