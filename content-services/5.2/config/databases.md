---
title: Configuring databases
---

Use this information to configure supported databases for use with Alfresco Content Services.

-   **[Configuring Amazon RDS databases](#configuring-amazon-rds-databases)**  
Amazon Relational Database Service (RDS) makes it easy to set up, operate, and scale a relational database in the cloud.  
-   **[Configuring a DB2 database](#configuring-a-db2-database)**  
Use this information to configure a DB2 database for use with Alfresco Content Services.
-   **[Configuring the MariaDB database connection](#configuring-the-mariadb-database-connection)**  
Use this information to configure the connection to the MariaDB database for use with Alfresco Content Services.
-   **[Configuring the MySQL database](#configuring-the-mysql-database)**  
Use this information to configure a MySQL database for use with Alfresco Content Services.
-   **[Configuring an Oracle database](#configuring-an-oracle-database)**  
Use this information to configure an Oracle RDBMS database for use with Oracle.
-   **[Configuring a PostgreSQL database](#configuring-a-postgresql-database)**  
Use this information to configure a PostgreSQL database for use with Alfresco Content Services.
-   **[Configuring a SQL Server database](#configuring-a-sql-server-database)**  
Use this information to configure a Microsoft SQL Server database for use with Alfresco Content Services. To modify the default database configuration, you must edit values in the `<classpathRoot>\alfresco-global.properties` file.
-   **[Advanced database configuration properties](#advanced-database-configuration-properties)**  
As an administrator, you need to edit some advanced properties to customize your database configuration. Many properties, however, do not need to be edited.
-   **[Validating your database](#validating-your-database)**  
Validate your database to ensure that it meets the prerequisites for an Alfresco Content Services installation.

## Configuring Amazon RDS databases {#configuring-amazon-rds-databases}

Amazon Relational Database Service (RDS) makes it easy to set up, operate, and scale a relational database in the cloud.  

It is a web service running in the cloud and provides relational database for use in Alfresco Content Services. Amazon RDS supports and gives you online access to the capabilities of a MySQL, Oracle, Microsoft SQL Server, PostgreSQL, or Amazon Aurora relational database management system.

As a good practice, when using Amazon EC2 environment you may want to use S3 bucket for content store. For more information, see [Alfresco Content Connector for AWS S3](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/aws-s3/2.1/concepts/s3-contentstore-overview.md){:target="_blank"}.

For configuring different databases for Amazon RDS, see the topics below.

-   **[Configuring an Aurora database on Amazon RDS](#configuring-an-aurora-database-on-amazon-rds)**  
Use this information to configure an Aurora database on Amazon RDS for use with Alfresco Content Services. Amazon Aurora is a MySQL-compatible relational database management system.
-   **[Configuring the MySQL database on Amazon RDS](#configuring-the-mysql-database-on-amazon-rds)**  
Use this information to configure a MySQL database on Amazon RDS for use with Alfresco Content Services.
-   **[Configuring an Oracle database on Amazon RDS](#configuring-an-oracle-database-on-amazon-rds)**  
Use this information to configure an Oracle database on Amazon RDS for use with Alfresco Content Services.
-   **[Configuring a PostgreSQL database on Amazon RDS](#configuring-a-postgresql-database-on-amazon-rds)**  
Use this information to configure a PostgreSQL database on Amazon RDS for use with Alfresco Content Services.
-   **[Configuring a SQL Server database on Amazon RDS](#configuring-a-sql-server-database-on-amazon-rds)**  
Use this information to configure a SQL Server database on Amazon RDS for use with Alfresco.

### Configuring an Aurora database on Amazon RDS {#configuring-an-aurora-database-on-amazon-rds}

Use this information to configure an Aurora database on Amazon RDS for use with Alfresco Content Services. Amazon Aurora is a MySQL-compatible relational database management system.

**Prerequisites:**

-   Aurora support is only available when running in AWS.
-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Alfresco Content Services is deployed on an Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco Content Services installer for Linux from the [Support Portal](http://support.alfresco.com).

4.  Install the downloaded installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.N.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.N.x-installer-linux-x64.bin
    ```

5.  Install the Aurora database connector.

    This release requires mysql-connector-java-5.1.42.jar for compatibility with the SQL Server database.

    1.  Download the mysql-connector driver from the MySQL JDBC driver download site.

    2.  Copy the JDBC driver into the <TOMCAT_HOME>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot>/alfresco-global.properties file.

11. Locate the following property:

    `dir.root=`

12. Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

13. Set and uncomment the database connection properties as shown below:

    ```
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

14. Save the file.

15. Restart the Alfresco Content Services server.

### Configuring the MySQL database on Amazon RDS {#configuring-the-mysql-database-on-amazon-rds}

Use this information to configure a MySQL database on Amazon RDS for use with Alfresco Content Services.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco Content Services installer for Linux from the [Support Portal](http://support.alfresco.com).

4.  Install the downloaded installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin      
    ```

5.  Install the MySQL database connector.

    The MySQL database connector is required when installing with MySQL. The database connector allows MySQL database to talk to the server.

    1.  Download mysql-connector-java-5.1.32 from the MySQL download site: [http://dev.mysql.com/](http://dev.mysql.com).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT_HOME>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot>/alfresco-global.properties file.

11. Edit the following line with an absolute path to point to the directory in which you want to store Alfresco Content Services data.

    For example: `dir.root=C:/Alfresco/alf_data`

12. Set and uncomment the database connection properties as shown below:

    ```
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

    > **Note:** Ensure that these database connection properties are not commented out.

13. Save the file.

14. Restart the Alfresco Content Services server.

### Configuring an Oracle database on Amazon RDS {#configuring-an-oracle-database-on-amazon-rds}

Use this information to configure an Oracle database on Amazon RDS for use with Alfresco Content Services.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

The Oracle database is case sensitive, so any configuration setting that you add into the `alfresco-global.properties` file must match the case used in Oracle.

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco Content Services installer for Linux from the [Support Portal](http://support.alfresco.com).

4.  Install the downloaded installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin
    ```

5.  Install the Oracle database connector. The database connector allows Oracle database to talk to the server.

    1.  Download ojdbc7.jar from the [Oracle download site](http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html).

        Use the ojdbc7.jar in the Oracle Database 12c Release 1 (12.1.0.1) drivers.

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT_HOME>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Increase the available connections.

    1.  In the SQL*Plus Console, run these commands:

        ```
        alter system set processes=275 scope=spfile sid='*';
        alter system set sessions=305 scope=spfile sid='*';
        alter system set transactions=330 scope=spfile sid='*';
        ```

    2.  Restart the database.

8.  Create a database named alfresco.

9.  Create a user named alfresco.

10. Set the new user's password to alfresco.

11. Open the <classpathRoot>/alfresco-global.properties.sample file.

12. Edit the following line with an absolute path to point to the directory in which you want to store Alfresco Content Services data.

    For example: `dir.root=C:/Alfresco/alf_data`

13. Set and uncomment the database connection properties as shown below:

    ```
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

    > **Note:** Ensure that these database connection properties are not commented out.

14. Save the file without the .sample extension.

15. Restart the Alfresco Content Services server.


### Configuring a PostgreSQL database on Amazon RDS {#configuring-a-postgresql-database-on-amazon-rds}

Use this information to configure a PostgreSQL database on Amazon RDS for use with Alfresco Content Services.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco Content Services installer for Linux from the [Support Portal](http://support.alfresco.com).

4.  Install the downloaded installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin 
    ```

5.  Install the PostgreSQL database connector. The database connector allows PostgreSQL database to talk to the server.

    1.  Download postgresql-9.3-xxxx.jdbc4.jar from the PostgreSQL download site: [http://www.postgresql.org/download/](http://jdbc.postgresql.org/download.html).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT_HOME>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS Postgresql datasource. If Alfresco Content Services is installed as standard with no configuration then `psql` from the installation folder can be used.

7.  Create a database named alfresco.

8.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

9.  Set the new user's password to alfresco.

10. Open the <classpathRoot>/alfresco-global.properties file.

11. Locate the following line:

    `dir.root=./alf_data`

12. Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

13. Uncomment and set the database connection properties.

    ```
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

    > **Note:** Ensure that these database connection properties are not commented out.

14. Save the file.

15. Restart the Alfresco Content Services server.

### Configuring a SQL Server database on Amazon RDS {#configuring-a-sql-server-database-on-amazon-rds}

Use this information to configure a SQL Server database on Amazon RDS for use with Alfresco.

**Prerequisites:**

-   Setup Amazon RDS using the AWS Management Console. For more information, see the [AWS documentation](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).
-   Amazon EC2 instance

1.  Use the `ssh` command to connect to the Amazon EC2 instance using a provided `.ppk` key.

    For Amazon Linux, the user name is `ec2-user`. For RHEL5, the user name is either `root` or `ec2-user`. For Ubuntu, the user name is `ubuntu`. For SUSE Linux, the user name is `root`. 

2.  Execute `sudo su` to change to root.

3.  Download the Alfresco installer for Linux from the [Alfresco Support Portal](http://support.alfresco.com).

4.  Install the downloaded Alfresco installer using the following commands:

    ```
    chmod 777 alfresco-enterprise-5.1.x-installer-linux-x64.bin
    sudo ./alfresco-enterprise-5.1.x-installer-linux-x64.bin      
    ```

5.  Install the Microsoft SQL Server database connector. The database connector allows SQL Server database to talk to the Alfresco server.

    This release requires MS SQL JDBC Driver 4.2 for compatibility with the SQL Server database.

    1.  Download sqljdbc4.jar from the Microsoft SQL Server download site.

    2.  Copy the JDBC driver into the <TOMCAT_HOME>/lib directory.

6.  Install and use a database tool to connect to the Amazon RDS.

7.  Create a database named alfresco.

8.  Enable snapshot isolation mode with the following command:

    ```
    ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;
    ```

9.  Create a user named alfresco.

10. Set the new user's password to alfresco.

11. Open the <classpathRoot>/alfresco-global.properties file.

12. Locate the following property:

    `dir.root=`

13. Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

14. Set and uncomment the database connection properties as shown below:

    ```
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

15. Save the file.

16. Restart the Alfresco Content Services server.

## Configuring a DB2 database {#configuring-a-db2-database}

Use this information to configure a DB2 database for use with Alfresco Content Services.

1.  Install the DB2 database connector. The database connector allows DB2 database to talk to the server.

    1.  Obtain a copy of db2jcc4.jar. This should be available in the /java or /jdbc directory of your DB2 installation.

    2.  Copy the JAR file into the <TOMCAT_HOME>/lib directory for Tomcat.

2.  Increase the available connections in DB2.

    1.  Follow these instructions to increase the `max_connections` setting to 275: [Setting max_connections](http://www-01.ibm.com/support/knowledgecenter/SSEPGG_9.7.0/com.ibm.db2.luw.admin.config.doc/doc/r0003289.html?cp=SSEPGG_9.7.0%2F2-2-6-6-41)

    2.  Run the following command:

        ```
        update dbm cfg using max_connections 275 automatic
        ```

3.  Create a database named alfresco.

    Create the database with a larger page size of 32 KB. Ensure that the database is created with the UTF-8 character set.

    If you do not create the database with these settings, you will see error SQL0286N (`sqlCode -286, sqlstate 42727`) because the schema is created for tables that do not fit the page size.

4.  Ensure that the `cur_commit` database configuration parameter is set to `ON`.

    For new databases, this parameter is set to ON, by default. If you have upgraded from a previous DB2 release, you must set this parameter manually.

5.  Create a user named alfresco and set the associated schema.

    This user must have write permissions on all tables and sequences.

    DB2 only integrates with the operating system security. You can not add a database user with a password in the DB2 database as you can with some other databases, for example the Oracle database.

6.  Open the <classpathRoot>/alfresco-global.properties.sample file.

7.  Locate the following line:

    `dir.root=./alf_data`

8.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

9.  When using a schema which does not match the DB2 username, set the `currentSchema` and `hibernate.default_schema` properties as shown below:

    ```
    # DB2 connection
    
    db.driver=com.ibm.db2.jcc.DB2Driver
    db.url=jdbc:db2://${db.host}:${db.port}/${db.name}:retrieveMessagesFromServerOnGetMessage=true;currentSchema=${hibernate.default_schema};
    hibernate.default_schema=SAMPLE_SCHEMA
    ```

    > **Note:** Remember to uncomment the database connection properties.

10. Set the other database connection properties.

    ```
    db.name=alfresco
    db.host=localhost
    db.port=50000
    db.pool.max=275
    ```

    > **Note:** Remember to uncomment the database connection properties.

11. Save the file without the .sample extension.

12. Restart the Alfresco Content Services server.

    If you receive JDBC errors, ensure the location of the DB2 JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


## Configuring the MariaDB database connection {#configuring-the-mariadb-database-connection}

Use this information to configure the connection to the MariaDB database for use with Alfresco Content Services.

To configure a MariaDB database connection, use the MySQL JDBC driver and follow instructions in [Configuring the MySQL database](#configuring-the-mysql-database).

## Configuring the MySQL database {#configuring-the-mysql-database}

Use this information to configure a MySQL database for use with Alfresco Content Services.

1.  Install the MySQL database connector.

    The MySQL database connector is required when installing Alfresco Content Services with MySQL. The database connector allows MySQL database to talk to the server.

    1.  Download mysql-connector-java-5.1.32 from the MySQL download site: [http://dev.mysql.com/](http://dev.mysql.com).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT_HOME>/lib directory.

2.  Create a database named alfresco.

    If you are using MySQL and require the use of non-US-ASCII characters, you need to set the encoding for internationalization. This allows you to store content with accents in the repository. The database must be created with the UTF-8 character set and the utf8_bin collation. Although MySQL is a unicode database, and Unicode strings in Java, the JDBC driver might corrupt your non-English data. Ensure that you keep the `?useUnicode=yes&characterEncoding=UTF-8` parameters at the end of the JDBC URL.

    > **Note:** You also must ensure that the MySQL database is set to use UTF-8 and InnoDB. Refer to [Optimizing MySQL to work with Alfresco Content Services](#optimizing-mysql-to-work-with-alfresco-content-services).

3.  Increase the maximum connections setting in the MySQL configuration file.

    1.  Locate the configuration file:

        -   Linux: /etc/my.cnf
        -   Windows: c:\Users\All Users\MySQL\MySQL Server 5.6\my.ini
    2.  In the mysqld section, add or edit the max_connections property:

        ```
        max_connections = 275
        ```

    3.  Restart the database.

4.  Create a user named alfresco.

5.  Set the new user's password to alfresco.

6.  Navigate to the `<ALFRESCO_HOME>/alf_data/` directory and empty the `<contentstore>` directory.

    This is because the contentstore must be consistent with the database. Step 2 created an empty database, and so the contentstore must also be empty.

7.  Open the `<classpathRoot>/alfresco-global.properties.sample` file.

8.  Edit the following line with an absolute path to point to the directory in which you want to store Alfresco Content Services data.

    For example: `dir.root=C:/Alfresco/alf_data`

9.  Uncomment the following properties:

    ```
    db.driver=com.mysql.jdbc.Driver
    db.url=jdbc:mysql://${db.host}:${db.port}/${db.name}?useUnicode=yes&characterEncoding=UTF-8 
    ```

10. Set the other database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=3306
    db.pool.max=275
    ```

    > **Note:** Ensure that these database connection properties are not commented out.

11. Copy the keystore directory from the alf_data directory at the old location to the alf_data directory at the new location, which is specified in Step 7.

12. (Optional) Enable case sensitivity.

    The default, and ideal, database setting for Alfresco Content Services is to be case-insensitive. For example, the user name properties in the <configRoot>\classes\alfresco\repository.properties file are:

    ```
    # Are user names case sensitive?
    user.name.caseSensitive=false
    domain.name.caseSensitive=false
    domain.separator=
    ```

    If your preference is to set the database to be case-sensitive, add the following line to the `alfresco-global.properties` file:

    `user.name.caseSensitive=true`

13. Save the file without the .sample extension.

14. Restart the Alfresco Content Services server.

    If you receive JDBC errors, ensure the location of the MySQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


-   **[Optimizing MySQL to work with Alfresco Content Services](#optimizing-mysql-to-work-with-alfresco-content-services)**  
There are some settings that are required for MySQL to work with Alfresco Content Services.

### Optimizing MySQL to work with Alfresco Content Services {#optimizing-mysql-to-work-with-alfresco-content-services}

There are some settings that are required for MySQL to work with Alfresco Content Services.

The following table represents the specific settings in the MySQL configuration wizard that enable MySQL to work effectively.

|Configuration wizard dialog|Setting for Alfresco Content Services|
|---------------------------|-------------------------------------|
|Server Type|Choose **Dedicated MySQL Server Machine**. The option selected determines the memory allocation.|
|Database usage|Choose **Transactional Database Only**. This creates a database that uses InnoDB as its storage engine.|
|InnoDB Tablespace|Accept the default drive and path.|
|Concurrent Connections|Select **Decision Support (DSS) OLAP**. This sets the approximate number of concurrent connections to the server.|
|Networking and Strict Mode Options|Accept the default networking options (**Enable TCP/IP Networking**, **Port Number 3306**), and the default server SQL mode (Enable Strict Mode).|
|Character Set|Select **Best Support for Multilingualism**. This sets the default character set to be UTF-8 (set in `character-set-server`).|
|Security Options|Select **Modify Security Settings**. Type the root password admin, then retype the password.|

By default, table aliases are case sensitive on Unix but not on Windows or Mac OS X. Use the following variable setting to enable MySQL server to handle case sensitivity of database and table names:

```
 lower_case_table_names=1  
```

Using this variable setting allows MySQL to convert all table names to lowercase on storage and lookup. This behavior also applies to database names and table aliases. This setting also prevents data transfer problems between platforms and between file systems with varying case sensitivity.

Refer to the [http://dev.mysql.com/](http://dev.mysql.com/) website for more information on this variable.

## Configuring an Oracle database {#configuring-an-oracle-database}

Use this information to configure an Oracle RDBMS database for use with Oracle.

The Oracle database is case sensitive, so any configuration setting that you add into the `alfresco-global.properties` file must match the case used in Oracle.

> **Note:** The Oracle database must be created with the AL32UTF8 character set.

> **Note:** Alfresco supports RAC as a single instance Oracle database as the customers will benefit from high availability and resiliency. As Alfresco Content Services requires a sequentially ordered transaction ID, customers will not see a performance improvement from deploying on Oracle RAC.

> **Note:** The Oracle Thin driver is recommended. Check the [Supported platforms]({% link content-services/5.2/support/index.md %}) page for the correct driver.

1.  Create a database named alfresco.

2.  Create a user named alfresco.

    The alfresco user must have Connect and Resource privileges in Oracle.

    This user must have write permissions on all tables and sequences.

3.  Set the new user's password to alfresco.

4.  Ensure the alfresco user has the required privileges to create and modify tables.

    You can remove these privileges once the server has started, but they might also be required for upgrades.

    > **Note:** When connecting to Oracle Database 12c, you must configure privileges on tablespace "USERS" to avoid the following error:

    ```
    ORA-01950: no privileges on tablespace 'USERS'
    ```

    You can do this by using one of the following commands:

    ```
    ALTER USER <username> QUOTA <QUOTE_M> ON <tablespace name>
    ```

    or

    ```
    GRANT UNLIMITED TABLESPACE TO <username>
    ```

5.  Open the <classpathRoot>/alfresco-global.properties.sample file.

6.  Locate the following line:

    `dir.root=./alf_data`

7.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

8.  Set and uncomment the Oracle database connection properties as shown below:

    ```
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

    If using the oci configuration, change the URL syntax as shown below:

    ```
    db.url=jdbc:oracle:oci:@${db.host}:${db.port}:${db.name}
    ```

    The Oracle connection URL in this example is basic. Typical Oracle connection strings can be used with the Oracle driver (Thin/OCI). The Thin driver is recommended over the OCI driver.

    For database URLs and specifiers, see the Oracle documentation at [Database URLs and Database Specifiers](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIJFHHB) and [Thin-style Service Name Syntax](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIDHCBA).

    You can use standard (OCI/Thin) connection URL, Oracle service, and Oracle DNS service URL without any issues.

    > **Note:** If you are using the OCI URL, you need an Oracle client on the Alfresco host. For more information, see [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

9.  Save the file without the .sample extension.

10. Copy the Oracle JDBC driver JAR into /lib.

    CAUTION:

    Do not put multiple driver jars in the application or the application server lib directory. Only include the driver jar which is advised in these instructions. Remove any others, if present.

11. Restart the Alfresco server.

    > **Note:** If you receive JDBC errors:

    -   Ensure the location of the Oracle JDBC drivers are on the system path or added to the relevant lib directory of the application server.
    -   Check if you have `LD_LIBRARY_PATH` in use in your environment to remove the old Oracle client (for example, /home/oracle/app/oracle/product/11.2.0/client_1/lib) and add the full path to the current ojdbc7.jar. If you do not have this environment variable, do not add it.
    > **Note:** The JDBC driver for Oracle is in the JAR file: ojdbc7.jar. However, if you see the following error, then add the Doracle.jdbc.thinLogonCapability=o3 parameter to JAVA_OPTS:

    ```
    java.sql.SQLException: OAUTH marshaling failure
    ```


## Configuring a PostgreSQL database {#configuring-a-postgresql-database}

Use this information to configure a PostgreSQL database for use with Alfresco Content Services.

1.  Install the PostgreSQL database connector.

    The database connector is a JAR file, for example postgresql-9.3-xxxx.jdbc4.jar.

    1.  Download the latest database connector JAR file from the PostgreSQL download site: [http://www.postgresql.org/download/](http://jdbc.postgresql.org/download.html).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT_HOME>/lib directory.

2.  Increase the maximum connections setting in the PostgreSQL configuration file.

    1.  Locate the configuration file:

        -   Linux: /var/lib/pgsql/<version of PostgreSQL>/data/postgresql.conf
        -   Windows: C:\Program Files\PostgreSQL\<version of PostgreSQL>\data\postgresql.conf
    2.  Add or edit the max_connections property:

        ```
        max_connections = 275
        ```

    3.  Restart the database.

3.  Create a database named alfresco.

4.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

5.  Set the new user's password to alfresco.

6.  Ensure the alfresco user has the required privileges to create and modify tables.

7.  Open the <classpathRoot>/alfresco-global.properties.sample file.

8.  Locate the following line:

    `dir.root=./alf_data`

9.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

10. Uncomment the following properties:

    ```
    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://${db.host}:${db.port}/${db.name} 
    ```

11. Set the other database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=5432
    db.pool.max=275
    ```

    > **Note:** Ensure that these database connection properties are not commented out.

12. Save the file without the .sample extension.

13. To allow password-authenticated connections through TCP/IP, ensure that the PostgreSQL configuration file, pg_hba.conf, contains the following line:

    ```
    host all all `127.0.0.1/32` password
    ```

14. Restart the Alfresco Content Services server.

    If you receive JDBC errors, ensure the location of the PostgreSQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


## Configuring a SQL Server database {#configuring-a-sql-server-database}

Use this information to configure a Microsoft SQL Server database for use with Alfresco Content Services. To modify the default database configuration, you must edit values in the <classpathRoot>\alfresco-global.properties file.

1.  Install the Microsoft SQL Server database connector. The database connector allows SQL Server database to talk to the Alfresco Content Services server.

    This release requires MS SQL JDBC Driver 4.2 for compatibility with the SQL Server database.

    1.  Download sqljdbc42.jar from the Microsoft SQL Server download site.

    2.  Copy the JDBC driver into the <TOMCAT_HOME>/lib directory.

2.  Increase the available connections setting in the Microsoft SQL Server configuration file.

    Follow these instructions to update the setting: [Configuring the user connections option](https://msdn.microsoft.com/en-us/library/ms187030.aspx).

3.  Create a database named alfresco.

    Create the database using default collation settings.

4.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences. For example, you can provide these permissions by granting your database user (in this case, the alfresco user) the `db_owner` role. See [Database-Level Roles](http://msdn.microsoft.com/en-us/library/ms189121.aspx) for more information.

5.  Set the new user's password to alfresco.

6.  Ensure the alfresco user has the required privileges to create and modify tables.

    This can be removed once the server has started, but may be required during upgrades.

7.  Enable snapshot isolation mode with the following command:

    `ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;`

8.  Ensure that the TCP connectivity is enabled on the fixed port number 1433.

9.  Open the <classpathRoot>/alfresco-global.properties.sample file.

10. Locate the following property:

    `dir.root=`

11. Edit the line with an absolute path to point to the directory in which you want to store Alfresco Content Services data. For example: `dir.root=C:/Alfresco/alf_data`

12. Set the database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1433
    db.pool.max=275
    ```

13. Add the following properties to register the driver and set up the connection:

    ```
    db.driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
    db.url=jdbc:sqlserver://${db.host}:${db.port};databaseName=${db.name};lockTimeout=1000;
    db.txn.isolation=4096
    ```

14. Save the file without the .sample extension.

15. Restart the Alfresco Content Services server.

    If you receive JDBC errors, ensure the location of the SQL Server JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


-   **[Optimizing Microsoft SQL Server to work with Alfresco Content Services](#optimizing-microsoft-sql-server-to-work-with-alfresco-content-services)**  
Make sure you manage Microsoft SQL Server to optimise performance.

### Optimizing Microsoft SQL Server to work with Alfresco Content Services {#optimizing-microsoft-sql-server-to-work-with-alfresco-content-services}

Make sure you manage Microsoft SQL Server to optimise performance.

To ensure that your performance does not degrade, it is useful to carry out the following weekly maintenance operations on your SQL server, especially in repositories with a high transaction count and frequency:

-   Recompute statistics by running the command: `EXEC sp_updatestats`
-   Clear the buffers by running the command: `DBCC DROPCLEANBUFFERS`
-   Clear the cache by running the command: `DBCC FREEPROCCACHE`
-   Run an index fragmentation check and:

    -   Rebuild anything that is >30% fragmented
    -   Reorganize anything that is between 5 and 30% fragmented
    See [Reorganize and Rebuild Indexes](http://technet.microsoft.com/en-us/library/ms189858.aspx) for more information.


## Advanced database configuration properties {#advanced-database-configuration-properties}

As an administrator, you need to edit some advanced properties to customize your database configuration. Many properties, however, do not need to be edited.

Alfresco Content Services 5.2.7 supports Oracle, Microsoft SQL Server, DB2, as well as MySQL and PostgreSQL.

The advanced database configuration properties are categorized into two groups based on their relevance:

-   properties that you **SHOULD** edit
-   properties that you **COULD** edit

The following table describes the properties that you **SHOULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.txn.isolation`|The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The value of -1 indicates that the database's default transaction isolation level should be used. For the Microsoft SQL Server JDBC driver, the special value of 4096 should be used to enable snapshot isolation.|`-1`|
|`db.pool.initial`|The number of connections opened when the pool is initialized.|`10`|
|`db.pool.validate.query`|The SQL query that is used to ensure that your connections are still alive. This is useful if your database closes long-running connections after periods of inactivity.|For Oracle database, use `SELECT 1 from dual`For MySQL database, use `SELECT 1`

For SQL Server database, use `SELECT 1`

For PostgreSQL database, use `SELECT 1`

|

The following table describes the properties that you **COULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.pool.statements.enable`|A Boolean property. When set to `true` it indicates that all pre-compiled statements used on a connection will be kept open and cached for reuse.|`true`|
|`db.pool.statements.max`|The maximum number of pre-compiled statements to cache for each connection. The default is 40. Note that Oracle does not allow more that 50 by default.|`40`|
|
|`db.pool.idle`|The maximum number of connections that are not in use kept open.|`10`|
|`db.pool.max`|The maximum number of connections in the pool. See the note below for more information on this property.|`275`|
|`db.pool.min`|The minimum number of connections in the pool.|`10`|
|`db.pool.wait.max`|Time (in milliseconds) to wait for a connection to be returned before generating an exception when connections are unavailable. A value of 0 or -1 indicates that the exception should not be generated.|`5000`|
|`db.pool.validate.borrow`|A Boolean property. When set to `true` it indicates that connections will be validated before being borrowed from the pool.|`true`|
|`db.pool.validate.return`|A Boolean property. When set to `true` it indicates that connections will be validated before being returned to the pool.|`false`|
|`db.pool.evict.interval`|Indicates the interval (in milliseconds) between eviction runs. If the value of this property is zero or less, idle objects will not be evicted in the background.|`600000`|
|`db.pool.evict.idle.min`|The minimum number of milliseconds that a connection may remain idle before it is eligible for eviction.|`1800000`|
|`db.pool.evict.validate`|A Boolean property. When set to `true` it indicates that the idle connections will be validated during eviction runs.|`false`|
|`db.pool.abandoned.detect`|A Boolean property. When set to `true` it indicates that a connection is considered abandoned and eligible for removal if it has been idle longer than the `db.pool.abandoned.time`.|`false`|
|`db.pool.abandoned.time`|The time in seconds before an abandoned connection can be removed.|`300`|

The `db.pool.max` property is the most important. By default, each Alfresco Content Services instance is configured to use up to a maximum of 275. All operations require a database connection, which places a hard upper limit on the amount of concurrent requests a single instance can service (that is, 40), from all protocols, by default.

Most Java application servers have higher default settings for concurrent access (Tomcat allows up to 200 concurrent HTTP requests by default). Coupled with other threads in Alfresco Content Services (non-HTTP protocol threads, background jobs, and so on) this can quickly result in excessive contention for database connections, manifesting as poor performance for users.

If you are using Alfresco Content Services in anything other than a single-user evaluation mode, increase the maximum size of the database connection pool to at least the following setting.

```
[number of application server worker threads] + 75. 
```

For a Tomcat default HTTP worker thread configuration, and with all other thread pools left at the defaults, this means this property should be set to at least 275.

To increase the database connection pool, add the `db.pool.max` property to the alfresco.global.properties file and set it to the recommended value of 275, for example:

```
db.pool.max=275
```

For clarity, add this property immediately after the other database properties.

> **Important:** After increasing the size of the database connection pools, you must also increase the number of concurrent connections your database can handle to at least the size of the cumulative connection pools. In a cluster, each node has its own independent database connection pool. You must configure sufficient database connections for all of the cluster nodes to be able to connect simultaneously. We recommend that you configure at least 10 more connections to the database than are configured cumulatively across all of the connection pools to ensure that you can still connect to the database even if Alfresco Content Services saturates its own connection pools. Remember to factor in cluster nodes (which can each use up to 275 database connections) as well as connections required by other applications that are using the same database server as Alfresco Content Services.

The precise mechanism for reconfiguring your database's connection limit depends on the relational database product you are using; contact your DBA for configuration details.


## Validating your database {#validating-your-database}

Validate your database to ensure that it meets the prerequisites for an Alfresco Content Services installation.

> **Note:** We are unable to provide specialized support for maintaining or tuning your relational database. You MUST have an experienced, certified DBA on staff to support your installation(s). Typically this is not a full time role once the database is configured and tuned and automated maintenance processes are in place. However an experienced, certified DBA is required to get to this point.

**Maintenance and Tuning**:

As with any application that uses a relational database, regular maintenance and tuning of the database and schema is necessary. Specifically, all of the database servers that Alfresco Content Services supports require a minimum level of index statistics maintenance at frequent, regular intervals. Unless your DBA suggests otherwise, Alfresco recommends daily maintenance.

> **Note:** Relying on your database's automated statistics gathering mechanism might not be optimal – consult an experienced, certified DBA for your database to confirm this.

> **Note:** Index maintenance on most databases is an expensive, and in some cases blocking, operation that can severely impact performance while in progress. Consult your experienced, certified DBA regarding best practices for scheduling these operations in your database.

The following table describes example commands for specific databases. These commands are for illustration only. You must validate the commands required for your environment with your DBA.

|Database|Example maintenance commands|
|--------|----------------------------|
|MySQL|ANALYZE - consult with an experienced, certified MySQL DBA who has InnoDB experience (Alfresco Content Services cannot use a MyISAM database and hence an InnoDB-experienced MySQL DBA is required). Refer to the following link: [http://dev.mysql.com/doc/refman/5.6/en/analyze-table.html](http://dev.mysql.com/doc/refman/5.6/en/analyze-table.html).|
|PostgreSQL|VACUUM and ANALYZE – consult with an experienced, certified PostgreSQL DBA. Refer to the following link: [http://www.postgresql.org/docs/8.4/static/maintenance.html](http://www.postgresql.org/docs/9.2/static/maintenance.html).|
|Oracle|Depends on version – consult with an experienced, certified Oracle DBA. Refer to the following link: [http://download.oracle.com/docs/cd/B19306_01/server.102/b14211/stats.htm#PFGRF003](http://download.oracle.com/docs/cd/B19306_01/server.102/b14211/stats.htm#PFGRF003).|
|Microsoft SQL Server|ALTER INDEX REBUILD ([http://technet.microsoft.com/en-­‐us/library/ms188388.aspx](http://technet.microsoft.com/en-­‐us/library/ms188388.aspx)), UPDATE STATISTICS ([http://technet.microsoft.com/en-­‐us/library/ms187348.aspx](http://technet.microsoft.com/en-­‐us/library/ms187348.aspx)) – consult with an experienced, certified MS SQL Server DBA|
|DB2|REORGCHK () [http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001971.html](http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001971.html)RUNSTATS ()

[http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001980.html](http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001980.html)|
