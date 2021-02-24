---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Customization
option: database Oracle
---

# Configuring an Oracle database

This section describes how to configure an Oracle RDBMS database for use with Alfresco.

The Oracle database is case sensitive, so any configuration setting that you add into the alfresco-global.properties file must match the case used in Oracle.

**Note:** The Oracle database must be created with the AL32UTF8 character set.

1.  Create a new alfresco user and schema in Oracle.

    The alfresco user must have Connect and Resource privileges in Oracle.

2.  Ensure the alfresco user has the required privileges to create and modify tables.

    You can remove these privileges once the server has started, but they may also be required for upgrades.

3.  Open the <ClassPathRoot\>\\alfresco-global.properties.sample file.

4.  Locate the following line:

    `dir.root=./alf_data`

5.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

6.  Override the repository properties by removing the comments on each of the following lines:

    ```
    #db.driver=oracle.jdbc.OracleDriver
    #db.url=jdbc:oracle:thin:@localhost:1521:alfresco
    ```

7.  Set the `host` and `port` number to the location of your Oracle JDBC driver.

8.  \(Optional\) If you have multiple Alfresco instances installed on your Oracle server, add the following:

    `hibernate.default_schema=ALFRESCO`

    This forces the database metadata queries to target the schema that each database user is using.

9.  Ensure that the other database connection settings are commented out.

10. Save the file without the .sample extension.

11. Copy the Oracle JDBC driver JAR into /lib.

12. Start the Alfresco server.

    If you receive JDBC errors, ensure the location of the Oracle JDBC drivers are on the system path, or add them to the relevant lib directory of the application server. The Oracle JDBC drivers are located in the <orainst\>/ora<ver\>/jdbc/lib directory \(for example, c:\\oracle\\ora92\\jdbc\\lib\).

    The JDBC driver for Oracle is in the JAR file: ojdbc6.jar. However, if you see the following error:

    ```
    java.sql.SQLException: OAUTH marshaling failure
    ```

    add the Doracle.jdbc.thinLogonCapability=o3 parameter to JAVA\_OPTS.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

