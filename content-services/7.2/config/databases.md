---
title: Configure databases
---

You can configure supported databases for use with Content Services:

* Amazon Relational Database Service (RDS) in the cloud
  * Choose either Amazon Aurora, MySQL, Oracle, PostgreSQL, or Microsoft SQL Server
* MySQL or MariaDB
* Oracle
* PostgreSQL
* Microsoft SQL Server

Before continuing, check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver version for your chosen database.

## Amazon RDS

Amazon RDS makes it easy to set up, operate, and scale a relational database in the cloud. It's a web service running in the cloud and provides relational database for use with Content Services. Amazon RDS supports and gives you online access to the capabilities of the following relational database management systems (RDBMS):

* Amazon Aurora
* MySQL
* Oracle
* PostgreSQL
* Microsoft SQL Server

As good practice, when using an Amazon's Elastic Compute Cloud (EC2) environment, you may want to use Amazon's Simple Storage Service (S3) where an S3 bucket is used as a content store. See [Alfresco Content Connector for AWS S3]({% link aws-s3/latest/index.md %}) for more information.

Read the following sections to configure a database for Amazon RDS.

### Amazon Aurora database on Amazon RDS

You can configure an Aurora database on Amazon RDS for use with Content Services. Amazon Aurora is a MySQL-compatible relational database management system, and has the following prerequisites:

* [Setup Amazon RDS using the AWS Management Console](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html){:target="_blank"}.
* Content Services deployed on an Amazon EC2 instance

> **Note:** Aurora support is only available when running in Amazon Web Services (AWS).

To configure the database:

1. Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    * For Amazon Linux, the user name is `ec2-user`.
    * For RHEL5, the user name is either `root` or `ec2-user`.
    * For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`.

2. Execute `sudo su` to change to root.

3. [Install Content Services]({% link content-services/7.2/install/containers/index.md %})on your Amazon EC2 instance.

4. Install the Aurora database connector.

    This release requires `mysql-connector-java-5.x.x.jar` for compatibility with the SQL Server database. Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver.

    1. Download the driver from the [MySQL site](https://dev.mysql.com/){:target="_blank"}.

    2. Copy the JDBC driver into the `<TOMCAT_HOME>/lib` directory.

5. Install and use a database tool to connect to the Amazon RDS.

6. Create a database named `alfresco`.

7. Create a user named `alfresco`.

8. Set the new user's password to `alfresco`.

9. Open the `<classpathRoot>/alfresco-global.properties` file.

10. Locate the following property:

    `dir.root=`

11. Edit this to set an absolute path to point to the directory in which you want to store Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

12. Set and uncomment the database connection properties as shown below:

    ```bash
    db.name=alfresco2
    db.username=alfresco
    db.password=alfresco
    db.host=auroraqadb-cluster.cluster-clqevmd2v8y9.us-east-1.rds.amazonaws.com
    db.port=13306
    db.prefix=mysql
    db.pool.max=275

    # MySQL database connection

    db.driver=org.gjt.mm.mysql.Driver
    db.url=jdbc:mysql://${db.host}/${db.name}?${db.params}
    OR
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?${db.params}
    ```

13. Save the file.

14. Restart the Content Services server.

### MySQL database on Amazon RDS

You can configure a MySQL database on Amazon RDS for use with Content Services, with the following prerequisites:

* [Setup Amazon RDS using the AWS Management Console](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html){:target="_blank"}
* Amazon EC2 instance

1. Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    * For Amazon Linux, the user name is `ec2-user`.
    * For RHEL5, the user name is either `root` or `ec2-user`.
    * For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`.

2. Execute `sudo su` to change to root.

3. Install Content Services using one of the [options]({% link content-services/7.2/install/containers/index.md %}) provided.

4. Install the MySQL database connector.

    The MySQL database connector is required when installing with MySQL, and allows the MySQL database to talk to the server. Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver.

    1. Download `mysql-connector-java-5.x.x` from the [MySQL download site](https://dev.mysql.com/){:target="_blank"}.

    2. Copy the JAR file into the `/lib` directory.

        For example, for Tomcat, copy the JAR file into the `<TOMCAT_HOME>/lib` directory.

5. Install and use a database tool to connect to the Amazon RDS.

6. Create a database named `alfresco`.

7. Create a user named `alfresco`.

8. Set the new user's password to `alfresco`.

9. Open the `<classpathRoot>/alfresco-global.properties` file.

10. Edit the following line with an absolute path to point to the directory in which you want to store Content Services data.

    For example: `dir.root=C:/Alfresco/alf_data`

11. Set and uncomment the database connection properties as shown below:

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=alfqa-mysql5-6-19a.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=3306
    db.pool.max=275

    # MySQL connection
  
    db.driver=org.gjt.mm.mysql.Driver
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?useUnicode=yes&characterEncoding=UTF-8
    ```

    > **Note:** Ensure that these database connection properties aren't commented out.

12. Save the file.

13. Restart the Content Services server.

### Oracle database on Amazon RDS

You can configure an Oracle database on Amazon RDS for use with Content Services, with the following prerequisites:

* [Setup Amazon RDS using the AWS Management Console](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html){:target="_blank"}
* Amazon EC2 instance

The Oracle database is case sensitive, so any configuration setting that you add into the `alfresco.global.properties` file must match the case used in Oracle.

1. Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    * For Amazon Linux, the user name is `ec2-user`.
    * For RHEL5, the user name is either `root` or `ec2-user`.
    * For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`.

2. Execute `sudo su` to change to root.

3. Install Content Services using one of the [options]({% link content-services/7.2/install/containers/index.md %}) provided.

4. Install the Oracle database connector to allow the database to talk to the server.

    1. Download `ojdbc7.jar` from the [Oracle download site](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html){:target="_blank"}.

    2. Copy the JAR file into the `/lib` directory.

        For example, for Tomcat, copy the JAR file into the `<TOMCAT_HOME>/lib` directory.

5. Install and use a database tool to connect to the Amazon RDS.

6. Increase the available connections.

    1. In the SQL*Plus Console, run these commands:

        ```bash
        alter system set processes=275 scope=spfile sid='*';
        alter system set sessions=305 scope=spfile sid='*';
        alter system set transactions=330 scope=spfile sid='*';
        ```

    2. Restart the database.

7. Create a database named `alfresco`.

8. Create a user named `alfresco`.

9. Set the new user's password to `alfresco`.

10. Open the `<classpathRoot>/alfresco-global.properties.sample` file.

11. Edit the following line with an absolute path to point to the directory in which you want to store Content Services data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

12. Set and uncomment the database connection properties as shown below:

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=alfrescoora12.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=1433
    db.pool.max=275
    db.txn.isolation=4096

    # Oracle database connection

    db.driver=oracle.jdbc.OracleDriver
    db.url=jdbc:oracle:thin:@${db.host}:${db.port}:${db.name}
    ```

    > **Note:** Ensure that these database connection properties aren't commented out.

13. Save the file without the `.sample` extension.

14. Restart the Content Services server.

### PostgreSQL database on Amazon RDS

You can configure a PostgreSQL database on Amazon RDS for use with Content Services, with the following prerequisites:

* [Setup Amazon RDS using the AWS Management Console](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html){:target="_blank"}
* Amazon EC2 instance

To configure the database:

1. Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    * For Amazon Linux, the user name is `ec2-user`.
    * For RHEL5, the user name is either `root` or `ec2-user`.
    * For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`.

2. Execute `sudo su` to change to root.

3. Install Content Services using one of the [options]({% link content-services/7.2/install/containers/index.md %}) provided.

4. Install the PostgreSQL database connector to allow the database to talk to the server.

    1. Download `postgresql-42.x.jar` from the [PostgreSQL download site](https://jdbc.postgresql.org/download.html){:target="_blank"}.

    2. Copy the JAR file into the `/lib` directory.

        For example, for Tomcat, copy the JAR file into the `<TOMCAT_HOME>/lib` directory.

5. Install and use a database tool to connect to the Amazon RDS PostgreSQL datasource.

    If Content Services is installed as standard with no configuration then `psql` from the installation folder can be used.

6. Create a database named `alfresco`.

7. Create a user named `alfresco`.

    This user must have write permissions on all tables and sequences.

8. Set the new user's password to `alfresco`.

9. Open the `<classpathRoot>/alfresco-global.properties` file.

10. Locate the line: `dir.root=./alf_data`

11. Edit this to set an absolute path to point to the directory in which you want to store Content Services data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

12. Uncomment and set the database connection properties.

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=postgressql-alfresco.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=5432
    db.pool.max=275

    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://${db.host}:${db.port}/${db.name}
    ```

    > **Note:** Ensure that these database connection properties aren't commented out.

13. Save the file.

14. Restart the Content Services server.

### SQL Server database on Amazon RDS

You can configure a SQL Server database on Amazon RDS for use with Content Services, with the following prerequisites:

* [Setup Amazon RDS using the AWS Management Console](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html){:target="_blank"}.
* Amazon EC2 instance

To configure the database:

1. Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    * For Amazon Linux, the user name is `ec2-user`.
    * For RHEL5, the user name is either `root` or `ec2-user`.
    * For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`.

2. Execute `sudo su` to change to root.

3. Install Content Services using one of the [options]({% link content-services/7.2/install/containers/index.md %}) provided.

4. Install the Microsoft SQL Server database connector to allow the database to talk to the server.

    Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver version.

    1. Download `sqljdbc4.jar` from the Microsoft SQL Server download site.

    2. Copy the JDBC driver into the `<TOMCAT_HOME>/lib` directory.

5. Install and use a database tool to connect to the Amazon RDS.

6. Create a database named `alfresco`.

7. Enable snapshot isolation mode with the following command:

    ```bash
    ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;
    ```

8. Create a user named `alfresco`.

9. Set the new user's password to `alfresco`.

10. Open the `<classpathRoot>/alfresco-global.properties` file.

11. Locate the property: `dir.root=`

12. Edit this to set an absolute path to point to the directory in which you want to store Content Services data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

13. Set and uncomment the database connection properties as shown below:

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=sql-alfresco.cw4mo3qj8qdu.us-east-1.rds.amazonaws.com
    db.port=1433
    db.pool.max=275
    db.txn.isolation=4096

    # SQL Server connection

    db.driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
    db.url=jdbc:sqlserver://${db.host}:${db.port};databaseName=${db.name}
    ```

14. Save the file.

15. Restart the Content Services server.

## MySQL and MariaDB

You can configure a MySQL or MariaDB database connection (with a MySQL JDBC driver) for use with Content Services.

1. Install the MySQL database connector to allow the database to talk to the Content Services server.

    The connector is a JAR file, for example, `mysql-connector-java-5.x.x`.

    Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver version.

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

8. Edit the following line with an absolute path to point to the directory in which you want to store Content Services data. For example:

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

    The default, and ideal, database setting for Content Services is to be case-insensitive. For example, the user name properties in the `<configRoot>/classes/alfresco/repository.properties` file are:

    ```bash
    # Are user names case sensitive?
    user.name.caseSensitive=false
    domain.name.caseSensitive=false
    domain.separator=
    ```

    If your preference is to set the database to be case-sensitive, add the following line to the `alfresco-global.properties` file:

    `user.name.caseSensitive=true`

13. Save the file without the `.sample` extension.

14. Restart the Content Services server.

    If you receive JDBC errors, ensure the location of the MySQL JDBC drivers are on the system path, or add them to the relevant `lib` directory of the application server.

### Optimize MySQL

There are some settings that are required to optimize MySQL to work with Content Services. The following table represents the specific settings in the MySQL configuration wizard that enable MySQL to work effectively.

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

## Oracle

You can configure an Oracle RDBMS database for use with Content Services. The Oracle database is case sensitive, so any configuration setting that you add into `alfresco-global.properties` must match the case used in Oracle.

> **Note:** The Oracle database must be created with the `AL32UTF8` character set.

> **Note:** Alfresco supports RAC as a single instance Oracle database as the customers will benefit from high availability and resiliency. As Content Services requires a sequentially ordered transaction ID, customers will not see a performance improvement from deploying on Oracle RAC.

> **Note:** The Oracle Thin driver is recommended. Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver.

1. Create a database named `alfresco`.

2. Create a user named `alfresco`.

    This user must have Connect and Resource privileges in Oracle, and write permissions on all tables and sequences.

3. Set the new user's password to `alfresco`.

4. Ensure the `alfresco` user has the required privileges to create and modify tables.

    You can remove these privileges once the server has started, but they might also be required for upgrades.

    > **Note:** When connecting to Oracle database 12c, you must configure privileges on tablespace `USERS` to avoid the following error:<br><br>
    >`ORA-01950: no privileges on tablespace 'USERS'`

    You can do this by using one of the following commands:

    ```bash
    ALTER USER <username> QUOTA <QUOTE_M> ON <tablespace name>
    ```

    ```bash
    GRANT UNLIMITED TABLESPACE TO <username>
    ```

5. Open the `<classpathRoot>/alfresco-global.properties.sample` file.

6. Locate the line: `dir.root=./alf_data`

7. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

8. Set and uncomment the Oracle database connection properties:

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1521
    db.pool.max=275

    # Oracle connection

    db.driver=oracle.jdbc.OracleDriver
    db.url= jdbc:oracle:thin:@${db.host}:${db.port}:${db.name}
    ```

    If you're using the `oci` configuration, change the URL syntax:

    ```bash
    db.url=jdbc:oracle:oci:@${db.host}:${db.port}:${db.name}
    ```

    The Oracle connection URL in this example is basic. Typical Oracle connection strings can be used with the Oracle driver (Thin/Oracle Call Interface (OCI)). The Thin driver is recommended over the OCI driver.

    For database URLs and specifiers, see the Oracle documentation:
    * [Database URLs and Database Specifiers](https://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIJFHHB){:target="_blank"}
    * [Thin-style Service Name Syntax](https://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIDHCBA){:target="_blank"}

    You can use standard (OCI/Thin) connection URL, Oracle service, and Oracle DNS service URL without any issues.

    > **Note:** If you're using the OCI URL, you need an Oracle client on the Alfresco host. For more information, see [OCI Instant Client](https://docs.oracle.com/cd/B28359_01/java.111/b31224/instclnt.htm#CIHFDFJC){:target="_blank"}.

9. Save the file without the `.sample` extension.

10. Copy the Oracle JDBC driver JAR into `/lib`.

    > **CAUTION:** Don't put multiple driver JARs in the application or the application server `lib` directory. Only include the driver JAR that's advised in these instructions. Remove any others, if present.

11. Restart the Alfresco server.

    >**Note:** If you receive JDBC errors:
    >
      * Ensure the location of the Oracle JDBC driver is on the system path or added to the relevant `lib` directory of the application server.
      * Check if you have `LD_LIBRARY_PATH` in use in your environment to remove the old Oracle client (for example, `/home/oracle/app/oracle/product/11.2.0/client_1/lib`) and add the full path to the current `ojdbc7.jar`. If you don't have this environment variable, don't add it.

    > **Note:** The JDBC driver for Oracle is in the JAR file: `ojdbc7.jar`. However, if you see the following error, then add the `Doracle.jdbc.thinLogonCapability=o3` parameter to `JAVA_OPTS`:
    >
      * `java.sql.SQLException: OAUTH marshaling failure`

## PostgreSQL

You can configure a PostgreSQL database for use with Content Services.

1. Install the PostgreSQL database connector to allow the database to talk to the Content Services server.

    The database connector is a JAR file, for example, `postgresql-x.x.jar`.

    Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver.

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

9. Edit the line with an absolute path to point to the directory in which you want to store Content Services data. For example:

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

14. Restart the Content Services server.

    If you receive JDBC errors, ensure the location of the PostgreSQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.

## Microsoft SQL Server

You can configure a Microsoft SQL Server database for use with Content Services. To modify the default database configuration, you must edit values in the `<classpathRoot>/alfresco-global.properties` file.

1. Install the Microsoft SQL Server database connector to allow the database to talk to the Content Services server.

    Check the [Supported platforms]({% link content-services/7.2/support/index.md %}) page for the correct driver version.

    1. Download the JDBC driver from the Microsoft SQL Server download site.

    2. Copy the JDBC driver into the `<TOMCAT_HOME>/lib` directory.

2. Increase the available connections setting in the Microsoft SQL Server configuration file.

    Follow the instructions in [Configuring the user connections option](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-user-connections-server-configuration-option?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"} to update the setting.

3. Create a database named `alfresco`.

    Create the database using default collation settings.

4. Create a user named `alfresco`.

    This user must have write permissions on all tables and sequences. For example, you can provide these permissions by granting your database user (in this case, the `alfresco` user) the `db_owner` role.

    See [Database-Level Roles](https://docs.microsoft.com/en-us/sql/relational-databases/security/authentication-access/database-level-roles?redirectedfrom=MSDN&view=sql-server-ver15){target="_blank"} for more information.

5. Set the new user's password to `alfresco`.

6. Ensure the `alfresco` user has the required privileges to create and modify tables.

    This can be removed once the server has started, but may be required during upgrades.

7. Enable snapshot isolation mode with the following command:

    ```bash
    ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;
    ```

8. Ensure that the TCP connectivity is enabled on the fixed port number `1433`.

9. Open the `<classpathRoot>/alfresco-global.properties.sample` file.

10. Locate the property: `dir.root=`

11. Edit the line with an absolute path to point to the directory in which you want to store Content Services data. For example:

    ```bash
    dir.root=C:/Alfresco/alf_data
    ```

12. Set the database connection properties:

    ```bash
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1433
    db.pool.max=275
    ```

13. Add the following properties to register the driver and set up the connection:

    ```bash
    db.driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
    db.url=jdbc:sqlserver://${db.host}:${db.port};databaseName=${db.name};lockTimeout=1000;
    db.txn.isolation=4096
    ```

14. Save the file without the `.sample` extension.

15. Restart the Content Services server.

    If you receive JDBC errors, ensure the location of the SQL Server JDBC drivers are on the system path, or add them to the relevant `lib` directory of the application server.

### Optimize Microsoft SQL Server

Make sure you manage Microsoft SQL Server to optimize performance.

To ensure that your performance doesn't degrade, it's useful to carry out the following weekly maintenance operations on your SQL server, especially in repositories with a high transaction count and frequency:

* Recompute statistics by running the command:

    ```bash
    EXEC sp_updatestats
    ```

* Clear the buffers by running the command:

    ```bash
    DBCC DROPCLEANBUFFERS
    ```

* Clear the cache by running the command:

    ```bash
    DBCC FREEPROCCACHE
    ```

* Run an index fragmentation check and also:

  * Rebuild anything that's >30% fragmented
  * Reorganize anything that's between 5% and 30% fragmented

  See [Reorganize and rebuild indexes](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/reorganize-and-rebuild-indexes?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"} for more information.

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

The `db.pool.max` property is the most important. By default, each Content Services instance is configured to use up to a maximum of 275. All operations require a database connection, which places an upper limit on the amount of concurrent requests a single instance can service from all protocols.

Most Java application servers have higher default settings for concurrent access (Tomcat allows up to 200 concurrent HTTP requests by default). Coupled with other threads in Content Services (non-HTTP protocol threads, background jobs, and so on) this can quickly result in excessive contention for database connections, manifesting as poor performance for users.

If you're using Content Services in anything other than a single-user evaluation mode, increase the maximum size of the database connection pool to at least the following setting.

```bash
[number of application server worker threads] + 75
```

For a Tomcat default HTTP worker thread configuration, and with all other thread pools left at the defaults, this means this property should be set to at least 275.

To increase the database connection pool, add the `db.pool.max` property to the `alfresco.global.properties` file, and set it to the recommended value of 275, for example:

```bash
db.pool.max=275
```

For clarity, add this property immediately after the other database properties.

> **Important:** After increasing the size of the database connection pools, you must also increase the number of concurrent connections your database can handle to at least the size of the cumulative connection pools. In a cluster, each node has its own independent database connection pool. You must configure sufficient database connections for all of the cluster nodes to be able to connect simultaneously. We recommend that you configure at least 10 more connections to the database than are configured cumulatively across all of the connection pools to ensure that you can still connect to the database, even if Content Services saturates its own connection pools. Remember to factor in cluster nodes (which can each use up to 275 database connections) as well as connections required by other applications that are using the same database server as Content Services.

The precise mechanism for reconfiguring your database's connection limit depends on the relational database product you're using. Contact your DBA for configuration details.

## Validate your database

Validate your database to ensure that it meets the prerequisites for a Content Services installation.

> **Note:** We're unable to provide specialized support for maintaining or tuning your relational database. You MUST have an experienced, certified DBA on staff to support your installation(s). Typically this is not a full time role once the database is configured and tuned, and automated maintenance processes are in place. However, an experienced, certified DBA is required to get to this point.

### Maintenance and tuning

As with any application that uses a relational database, regular maintenance and tuning of the database and schema is necessary. Specifically, all of the database servers that Content Services supports require a minimum level of index statistics maintenance at frequent, regular intervals. Unless your DBA suggests otherwise, Alfresco recommends daily maintenance.

> **Note:** Relying on your database's automated statistics gathering mechanism might not be optimal – consult an experienced, certified DBA for your database to confirm this.

> **Note:** Index maintenance on most databases is an expensive, and in some cases, blocking operation that can severely impact performance while in progress. Consult your experienced, certified DBA regarding best practices for scheduling these operations in your database.

The following table describes example commands for specific databases. These commands are for illustration only. You must validate the commands required for your environment with your DBA.

| Database | Example maintenance commands |
| -------- | ---------------------------- |
| MySQL | ANALYZE ([ANALYZE TABLE Statement](https://dev.mysql.com/doc/refman/5.6/en/analyze-table.html){:target="_blank"})<br><br>Consult with an experienced, certified MySQL DBA who has InnoDB experience (Content Services can't use a MyISAM database and hence an InnoDB-experienced MySQL DBA is required). |
| PostgreSQL | VACUUM and ANALYZE ([Routine Database Maintenance Tasks](https://www.postgresql.org/docs/10/maintenance.html){:target="_blank"})<br><br>Consult with an experienced, certified PostgreSQL DBA. |
| Oracle | See [Database Performance Tuning Guide](https://docs.oracle.com/cd/B19306_01/server.102/b14211/stats.htm#g49431){:target="_blank"} (depending on version)<br><br>Consult with an experienced, certified Oracle DBA. |
| Microsoft SQL Server | ALTER INDEX REBUILD ([Transact-SQL](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-index-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"})<br>UPDATE STATISTICS ([Transact-SQL](https://docs.microsoft.com/en-us/sql/t-sql/statements/update-statistics-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15){:target="_blank"})<br><br>Consult with an experienced, certified MS SQL Server DBA. |
