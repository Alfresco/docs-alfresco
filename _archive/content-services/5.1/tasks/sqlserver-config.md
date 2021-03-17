---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring a SQL Server database

Use this information to configure a Microsoft SQL Server database for use with Alfresco. To modify the default database configuration, you must edit values in the <classpathRoot\>\\alfresco-global.properties file.

1.  Install the Microsoft SQL Server database connector. The database connector allows SQL Server database to talk to the Alfresco server.

    This release requires MS SQL JDBC Driver 4.2 for compatibility with the SQL Server database.

    1.  Download sqljdbc42.jar from the Microsoft SQL Server download site.

    2.  Copy the JDBC driver into the <TOMCAT\_HOME\>/lib directory.

2.  Increase the available connections setting in the Microsoft SQL Server configuration file.

    Follow these instructions to update the setting: [Configuring the user connections option](https://msdn.microsoft.com/en-us/library/ms187030.aspx).

3.  Create a database named alfresco.

    Create the database using default collation settings.

4.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences. For example, you can provide these permissions by granting your database user \(in this case, the alfresco user\) the `db_owner` role. See [Database-Level Roles](http://msdn.microsoft.com/en-us/library/ms189121.aspx) for more information.

5.  Set the new user's password to alfresco.

6.  Ensure the alfresco user has the required privileges to create and modify tables.

    This can be removed once the server has started, but may be required during upgrades.

7.  Enable snapshot isolation mode with the following command:

    `ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;`

8.  Ensure that the TCP connectivity is enabled on the fixed port number 1433.

9.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

10. Locate the following property:

    `dir.root=`

11. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

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

15. Restart the Alfresco server.

    If you receive JDBC errors, ensure the location of the SQL Server JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


-   **[Optimizing Microsoft SQL Server to work with Alfresco](../concepts/mssql-config-settings.md)**  
Make sure you manage Microsoft SQL Server to optimise performance.

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

