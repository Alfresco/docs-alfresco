---
title: Configure databases
---

You can configure supported databases for use with Community Edition:

* MySQL or MariaDB
* PostgreSQL

## MySQL and MariaDB

You can configure a MySQL or MariaDB database connection (with a MySQL JDBC driver) for use with Community Edition.

1. Install the MySQL database connector to allow the database to talk to the Community Edition server.

    The connector is a JAR file, for example, `mysql-connector-java-5.x.x`.

    1. Download the database connector from the [MySQL site](https://dev.mysql.com/){:target="_blank"}.

    2. Copy the JAR file into the `/lib` directory.

        For example, for Tomcat, copy the JAR file into the `<TOMCAT_HOME>/lib` directory.

2. Create a database named `alfresco`.

    If you're using MySQL and require the use of non-US-ASCII characters, you need to set the encoding for internationalization. This allows you to store content with accents in the repository. The database must be created with the UTF-8 character set and the `utf8_bin` collation. Although MySQL is a unicode database, and Unicode strings in Java, the JDBC driver might corrupt your non-English data. Ensure that you keep the `?useUnicode=yes&characterEncoding=UTF-8` parameters at the end of the JDBC URL.

    > **Note:** You also must ensure that the MySQL database is set to use UTF-8 and InnoDB. See [Optimizing MySQL](#optimize-mysql) for more information.

3. Increase the maximum connections setting in the MySQL configuration file.

    1. Locate the configuration file, for example:

        * Linux: `/etc/my.cnf`
        * Windows: `c:\Users\All Users\MySQL\MySQL Server 5.x\my.ini`

    2. In the `mysqld` section, add or edit the `max_connections` property:

        ```bash
        max_connections = 275
        ```

    3. Restart the database.

4. Create a user named `alfresco`.

5. Set the new user's password to `alfresco`.

6. Navigate to the `<ALFRESCO_HOME>/alf_data/ directory` and empty the `<contentstore>` directory.

    This is because the `contentstore` must be consistent with the database. Step 2 created an empty database, and so the `contentstore` must also be empty.

7. Open the `<classpathRoot>/alfresco-global.properties.sample` file.

8. Edit the following line with an absolute path to point to the directory in which you want to store Community Edition data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ````

9. Uncomment the following properties:

    ```bash
    db.driver=com.mysql.jdbc.Driver
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?useUnicode=yes&characterEncoding=UTF-8
    ```

10. Set the other database connection properties.

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=3306
    db.pool.max=275
    ```

    > **Note:** Ensure that these database connection properties aren't commented out.

11. Copy the `keystore` directory from the `alf_data` directory in the old location to the `alf_data` directory in the new location (specified in step 7).

12. (Optional) Enable case sensitivity.

    The default, and ideal, database setting for Community Edition is to be case-insensitive. For example, the user name properties in the `<configRoot>/classes/alfresco/repository.properties` file are:

    ```bash
    # Are user names case sensitive?
    user.name.caseSensitive=false
    domain.name.caseSensitive=false
    domain.separator=
    ```

    If your preference is to set the database to be case-sensitive, add the following line to the `alfresco-global.properties` file:

    `user.name.caseSensitive=true`

13. Save the file without the `.sample` extension.

14. Restart the Community Edition server.

    If you receive JDBC errors, ensure the location of the MySQL JDBC drivers are on the system path, or add them to the relevant `lib` directory of the application server.

### Optimize MySQL

There are some settings that are required to optimize MySQL to work with Community Edition. The following table represents the specific settings in the MySQL configuration wizard that enable MySQL to work effectively.

|  Configuration wizard dialog | Setting |
|  --------------------------- | ------- |
|  Server Type | Choose **Dedicated MySQL Server Machine**. The option selected determines the memory allocation. |
|  Database usage | Choose **Transactional Database Only**. This creates a database that uses InnoDB as its storage engine. |
|  InnoDB Tablespace | Accept the default drive and path. |
|  Concurrent Connections | Select **Decision Support (DSS) OLAP**. This sets the approximate number of concurrent connections to the server. |
|  Networking and Strict Mode Options | Accept the default networking options (**Enable TCP/IP Networking**, **Port Number 3306**), and the default server SQL mode (`Enable Strict Mode`). |
|  Character Set | Select **Best Support for Multilingualism**. This sets the default character set to be UTF-8 (set in `character-set-server`). |
|  Security Options | Select **Modify Security Settings**. Type the root password `admin`, then retype the password. |

By default, table aliases are case sensitive on Unix but not on Windows or Mac OS X.

Use the following variable setting to enable MySQL server to handle case sensitivity of database and table names:

```bash
 lower_case_table_names=1  
```

Using this variable setting allows MySQL to convert all table names to lowercase on storage and lookup. This behavior also applies to database names and table aliases. This setting also prevents data transfer problems between platforms and between file systems with varying case sensitivity.

See the [MySQL site](https://dev.mysql.com/){:target="_blank"} for more information on this variable.

## PostgreSQL

You can configure a PostgreSQL database for use with Community Edition.

1. Install the PostgreSQL database connector to allow the database to talk to the Community Edition server.

    The database connector is a JAR file, for example, `postgresql-x.x.jar`.

    1. Download the latest database connector from the [PostgreSQL download site](https://jdbc.postgresql.org/download.html){:target="_blank"}.

    2. Copy the JAR file into the `/lib` directory.

        For example, for Tomcat, copy the JAR file into the `<TOMCAT_HOME>/lib` directory.

2. Increase the maximum connections setting in the PostgreSQL configuration file.

    1. Locate the configuration file:

        * Linux: `/var/lib/pgsql/<version-of-postgresql\>/data/postgresql.conf`
        * Windows: `C:\Program Files\PostgreSQL\<version-of-postgresql>\data\postgresql.conf`

    2. Add or edit the `max_connections` property:

        ```bash
        max_connections = 275
        ```

    3. Restart the database.

3. Create a database named `alfresco`.

4. Create a user named `alfresco`.

    This user must have write permissions on all tables and sequences.

5. Set the new user's password to `alfresco`.

6. Ensure the `alfresco` user has the required privileges to create and modify tables.

7. Open the `<classpathRoot>/alfresco-global.properties.sample` file.

8. Locate the line: `dir.root=./alf_data`

9. Edit the line with an absolute path to point to the directory in which you want to store Community Edition data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

10. Uncomment the following properties:

    ```bash
    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://${db.host}:${db.port}/${db.name}
    ```

11. Set the other database connection properties.

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=5432
    db.pool.max=275
    ```

    > **Note:** Ensure that these database connection properties aren't commented out.

12. Save the file without the `.sample` extension.

13. To allow password-authenticated connections through TCP/IP, ensure that the PostgreSQL configuration file, `pg_hba.conf`, contains the following line:

    ```bash
    host all all `127.0.0.1/32` password
    ```

14. Restart the Community Edition server.

    If you receive JDBC errors, ensure the location of the PostgreSQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.

## Advanced configuration properties

As an administrator, you need to edit some advanced properties to customize your database configuration. Many properties, however, don't need to be edited.

The advanced database configuration properties are categorized into two groups based on their relevance:

* properties that you **SHOULD** edit
* properties that you **COULD** edit

The following table describes the properties that you **SHOULD** edit:

| Property | Description |
| -------- | ----------- |
| db.txn.isolation | The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The value of `-1` indicates that the database's default transaction isolation level should be used. For the Microsoft SQL Server JDBC driver, the special value of `4096` should be used to enable snapshot isolation. The default value is `-1` |
| db.pool.initial | The number of connections opened when the pool is initialized. The default value is `10` |
| db.pool.validate.query | The SQL query that is used to ensure that your connections are still alive. This is useful if your database closes long-running connections after periods of inactivity.{::nomarkdown}<ul><li>For Oracle database, use `SELECT 1 from dual`</li><li>For MySQL database, use `SELECT 1`</li><li>For SQL Server database, use `SELECT 1`</li><li>For PostgreSQL database, use `SELECT 1`</li></ul>{:/} |

The following table describes the properties that you **COULD** edit:

| Property | Description |
| -------- | ----------- |
| db.pool.statements.enable | A Boolean property. When set to `true` it indicates that all pre-compiled statements used on a connection will be kept open and cached for reuse. The default value is `true` |
| db.pool.statements.max | The maximum number of pre-compiled statements to cache for each connection. Note that Oracle doesn't allow more that `50` by default. The default value is `40` |
| db.pool.idle | The maximum number of connections that aren't in use but kept open. The default value is `10` |
| db.pool.max | The maximum number of connections in the pool. See the note below for more information on this property. The default value is `275` |
| db.pool.min | The minimum number of connections in the pool. The default value is `10` |
| db.pool.wait.max | Time (in milliseconds) to wait for a connection to be returned before generating an exception when connections are unavailable. A value of `0` or `-1` indicates that the exception shouldn't be generated. The default value is `5000` |
| db.pool.validate.borrow | A Boolean property. When set to `true` it indicates that connections will be validated before being borrowed from the pool. The default value is `true` |
| db.pool.validate.return | A Boolean property. When set to `true` it indicates that connections will be validated before being returned to the pool. The default value is `false` |
| db.pool.evict.interval | Indicates the interval (in milliseconds) between eviction runs. If the value of this property is zero or less, idle objects won't be evicted in the background. The default value is `600000` |
| db.pool.evict.idle.min | The minimum number of milliseconds that a connection may remain idle before it's eligible for eviction. The default value is `1800000` |
| db.pool.evict.validate | A Boolean property. When set to `true` it indicates that the idle connections will be validated during eviction runs. The default value is `false` |
| db.pool.abandoned.detect | A Boolean property. When set to `true` it indicates that a connection is considered abandoned and eligible for removal if it's been idle longer than the `db.pool.abandoned.time`. The default value is `false` |
| db.pool.abandoned.time | The time in seconds before an abandoned connection can be removed. The default value is `300` |

The `db.pool.max` property is the most important. By default, each Community Edition instance is configured to use up to a maximum of 275. All operations require a database connection, which places an upper limit on the amount of concurrent requests a single instance can service from all protocols.

Most Java application servers have higher default settings for concurrent access (Tomcat allows up to 200 concurrent HTTP requests by default). Coupled with other threads in Community Edition (non-HTTP protocol threads, background jobs, and so on) this can quickly result in excessive contention for database connections, manifesting as poor performance for users.

If you're using Community Edition in anything other than a single-user evaluation mode, increase the maximum size of the database connection pool to at least the following setting.

```bash
[number of application server worker threads] + 75
```

For a Tomcat default HTTP worker thread configuration, and with all other thread pools left at the defaults, this means this property should be set to at least 275.

To increase the database connection pool, add the `db.pool.max` property to the `alfresco.global.properties` file, and set it to the recommended value of 275, for example:

```bash
db.pool.max=275
```

For clarity, add this property immediately after the other database properties.

> **Important:** After increasing the size of the database connection pools, you must also increase the number of concurrent connections your database can handle to at least the size of the cumulative connection pools. In a cluster, each node has its own independent database connection pool. You must configure sufficient database connections for all of the cluster nodes to be able to connect simultaneously. We recommend that you configure at least 10 more connections to the database than are configured cumulatively across all of the connection pools to ensure that you can still connect to the database, even if Community Edition saturates its own connection pools. Remember to factor in cluster nodes (which can each use up to 275 database connections) as well as connections required by other applications that are using the same database server as Community Edition.

The precise mechanism for reconfiguring your database's connection limit depends on the relational database product you're using. Contact your DBA for configuration details.

## Validate your database

Validate your database to ensure that it meets the prerequisites for a Community Edition installation.

> **Note:** We're unable to provide specialized support for maintaining or tuning your relational database. You MUST have an experienced, certified DBA on staff to support your installation(s). Typically this is not a full time role once the database is configured and tuned, and automated maintenance processes are in place. However, an experienced, certified DBA is required to get to this point.

### Maintenance and tuning

As with any application that uses a relational database, regular maintenance and tuning of the database and schema is necessary. Specifically, all of the database servers that Community Edition supports require a minimum level of index statistics maintenance at frequent, regular intervals. Unless your DBA suggests otherwise, Alfresco recommends daily maintenance.

> **Note:** Relying on your database's automated statistics gathering mechanism might not be optimal – consult an experienced, certified DBA for your database to confirm this.

> **Note:** Index maintenance on most databases is an expensive, and in some cases, blocking operation that can severely impact performance while in progress. Consult your experienced, certified DBA regarding best practices for scheduling these operations in your database.

The following table describes example commands for specific databases. These commands are for illustration only. You must validate the commands required for your environment with your DBA.

| Database | Example maintenance commands |
| -------- | ---------------------------- |
| MySQL | ANALYZE ([ANALYZE TABLE Statement](https://dev.mysql.com/doc/refman/5.6/en/analyze-table.html){:target="_blank"})<br><br>Consult with an experienced, certified MySQL DBA who has InnoDB experience (Community Edition can't use a MyISAM database and hence an InnoDB-experienced MySQL DBA is required). |
| PostgreSQL | VACUUM and ANALYZE ([Routine Database Maintenance Tasks](https://www.postgresql.org/docs/10/maintenance.html){:target="_blank"})<br><br>Consult with an experienced, certified PostgreSQL DBA. |
| Oracle | See [Database Performance Tuning Guide](https://docs.oracle.com/cd/B19306_01/server.102/b14211/stats.htm#g49431){:target="_blank"} (depending on version)<br><br>Consult with an experienced, certified Oracle DBA. |
| Microsoft SQL Server | ALTER INDEX REBUILD ([Transact-SQL](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-index-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"})<br>UPDATE STATISTICS ([Transact-SQL](https://docs.microsoft.com/en-us/sql/t-sql/statements/update-statistics-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"})<br><br>Consult with an experienced, certified MS SQL Server DBA. |
