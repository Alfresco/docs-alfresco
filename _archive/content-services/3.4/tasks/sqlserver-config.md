---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Customization
option: database SQL Server
---

# Configuring a SQL Server database

This section describes how to configure a Microsoft SQL Server database for use with Alfresco. To modify the default database configuration, you must edit values in the <ClasspathRoot\>\\alfresco-global.properties file.

1.  Create a new `alfresco` database and and user in SQL Server.

    Create the database with a UTF8 character set and the default collation settings.

2.  Ensure the `alfresco` user has the required privileges to create and modify tables.

    This can be removed once the server has started, but may be required during upgrades.

3.  Enable snapshot isolation mode with the following command:

    `ALTER DATABASE alfresco SET ALLOW_SNAPSHOT_ISOLATION ON;`

4.  Ensure that the TCP connectivity is enabled on the fixed port number 1433.

5.  Copy the jTDS JDBC driver to $TOMCAT\_HOME\\lib.

    This release requires the jTDS driver Version 1.2.5 for compatibility with the SQL Server database.

6.  Edit the alfresco-global.properties.sample file.

7.  Edit the `dir.root=` property with an absolute path to point to the directory in which you want to store Alfresco data.

    For example: `dir.root=C:/Alfresco/alf_data`.

8.  Set the database connection properties.

    For example:

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1433
    db.driver=net.sourceforge.jtds.jdbc.Driver
    db.url=jdbc:jtds:sqlserver://${db.host}:${db.port}/${db.name}
    db.txn.isolation=4096
    ```

9.  Ensure that the other database connection settings are commented out.

10. Save the file without the .sample extension.

11. Start the Alfresco server.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

