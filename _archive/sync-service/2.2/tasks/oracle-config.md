---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: [configuration, oracle]
---

# Installing and configuring Oracle database

Use these instructions to install and configure an Oracle database for Sync Service.

Alfresco recommends that you use a separate Oracle instance for the Sync Service.

**Note:** Only the Sync Service communicates with the database. It persists events taken from the JMS queue into the database. The repository does not communicate with the database.

The Sync Service is not packaged with an Oracle driver, so it will need to be downloaded separately and cited in the start-up \(see [Starting the Sync Service](desktop-sync-install.md#10)\).



1.  Download the Oracle database connector `ojdbc7.jar` from the [Oracle JDBC Driver download](http://www.oracle.com/technetwork/database/features/jdbc/jdbc-drivers-12c-download-1958347.html) page.

2.  Copy the JAR file into the same directory as the Sync Service JAR.

    The JDBC driver for Oracle is in the JAR file: `ojdbc7.jar`. However, if you see the following error, then add the `Doracle.jdbc.thinLogonCapability=o3` parameter to `JAVA_OPTS`:

    ```
    java.sql.SQLException: OAUTH marshaling failure
    ```

3.  The Oracle database must be created with the AL32UTF8 character set. Check the current character set by executing:

    ```
    SELECT value$ FROM sys.props$ WHERE name = 'NLS_CHARACTERSET' ; 
    ```

    Have a look at this quick tutorial to alter the character set: [Change Oracle Database Character Set : NLS\_CHARACTERSET](https://easyoradba.com/2010/07/02/change-oracle-database-character-set-nls_characterset/).

4.  Increase the maximum connections setting in the Oracle configuration file. This property `processes` specifies the maximum number of operating system user processes that can simultaneously connect to Oracle. This effectively determines the maximum number of concurrent users in the system.

    ```
    alter system set processes=450 scope=spfile
    ```

    The value of the `db.pool.max` property in the  `config.yml` file must be less than `processes`.

    If there are multiple Sync Service instances forming a cluster hidden behind a load balancer, `processes` should be greater than or equal to the sum of all `db.pool.max` from all `config.yml` files.

    For example, if `processes=450`, and there are 3 Sync Service instances, then the correct setting in `config.yml` is `db.pool.max : 150`.

5.  Create a user with the username given by the sync property, `sql.db.username`, with password given by the sync property, `sql.db.password`:

    ```
    CREATE USER alfresco IDENTIFIED BY admin;
    ```

6.  Grant the alfresco user Connect and Resource privileges in Oracle.

    1.  Grant the user write permissions on all tables and sequences:

        ```
        GRANT CONNECT, RESOURCE TO alfresco;
        ```

    2.  Configure the privileges by using one of the following commands:

        ```
        ALTER USER alfresco QUOTA <QUOTE_M> ON Users;
        ```

        or

        ```
        GRANT UNLIMITED TABLESPACE TO alfresco
        ```

        **Note:** If the privileges on tablespace "USERS" are not set correctly, you may see the following error:

        ```
        ORA-01950: no privileges on tablespace 'USERS'
        ```


**Parent topic:**[Installing and configuring databases](../concepts/syncservice-db-config.md)

