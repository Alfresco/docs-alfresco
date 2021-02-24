---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Customization
option: database SQL Server
---

# Configuring a SQL Server database

This section describes how to configure a Microsoft SQL Server database for use with Alfresco.

1.  Install the Microsoft SQL Server database connector. The database connector allows SQL Server database to talk to the Alfresco server.

    1.  Download jtds-1.2.5.jar from the Microsoft SQL Server download site.

    2.  Copy the jTDS JDBC driver into the <TOMCAT\_HOME\>/lib directory for Tomcat 6.

        This release requires the jTDS driver Version 1.2.5 for compatibility with the SQL Server database.

2.  Create a database named alfresco.

    Create the database using default collation settings.

3.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences. For example, you can provide these permissions by granting your database user \(in this case, the alfresco user\) the `db_owner` role. See [Database-Level Roles](http://msdn.microsoft.com/en-us/library/ms189121.aspx) for more information.

4.  Set the new user's password to alfresco.

5.  Ensure the alfresco user has the required privileges to create and modify tables.

    This can be removed once the server has started, but may be required during upgrades.

6.  Enable snapshot isolation mode with the following command:

    `ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;`

7.  Ensure that the TCP connectivity is enabled on the fixed port number 1433.

8.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

9.  Locate the following line:

    `dir.root=./alf_data`

10. Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

11. Uncomment the following properties:

    ```
    # SQLServer connection 
    #
    db.driver=net.sourceforge.jtds.jdbc.Driver
    db.url=jdbc:jtds:sqlserver://${db.host}:${db.port}/${db.name} 
    db.txn.isolation=4096
    ```

12. Set the other database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1433
    db.pool.max=40
    ```

    **Note:** Ensure that these database connection properties are not commented out.

13. Save the file without the .sample extension.

14. Restart the Alfresco server.

    If you receive JDBC errors, ensure the location of the SQL Server JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


-   **[Optimizing Microsoft SQL Server to work with Alfresco](../concepts/mssql-config-settings.md)**  
Make sure you manage Microsoft SQL Server to optimise performance.

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

