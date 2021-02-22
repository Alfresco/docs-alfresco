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

1.  Install the Oracle database connector. The database connector allows Oracle database to talk to the Alfresco server.

    1.  Download ojdbc6.jar from the Oracle download site.

    2.  Copy the JAR file into the <TOMCAT\_HOME\>/lib directory for Tomcat 6.

2.  Create a database named alfresco.

3.  Create a user named alfresco.

    The alfresco user must have Connect and Resource privileges in Oracle.

    This user must have write permissions on all tables and sequences.

4.  Set the new user's password to alfresco.

5.  Ensure the alfresco user has the required privileges to create and modify tables.

    You can remove these privileges once the server has started, but they may also be required for upgrades.

6.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

7.  Locate the following line:

    `dir.root=./alf_data`

8.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

9.  Set and uncomment the Oracle database connection properties as shown below:

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=1521
    db.pool.max=275
    
    db.driver=oracle.jdbc.OracleDriver
    db.url=jdbc:oracle:thin:@${db.host}:${db.port}:${db.name}
    ```

    The Oracle connection URL in this example is basic. Typical Oracle connection strings can be used with the Oracle driver \(Thin/OCI\). The Thin driver is recommended over the OCI driver.

    For database URLs and specifiers, see the Oracle documentation at [Database URLs and Database Specifiers](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIJFHHB) and [Thin-style Service Name Syntax](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIDHCBA).

    You can use standard \(OCI/Thin\) connection URL, Oracle service, and Oracle DNS service URL without any issues.

    **Note:** If you are using the OCI URL, you need an Oracle client on the Alfresco host. For more information, see [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

10. Save the file without the .sample extension.

11. Copy the Oracle JDBC driver JAR into /lib.

12. Restart the Alfresco server.

    If you receive JDBC errors, ensure the location of the Oracle JDBC drivers are on the system path, or add them to the relevant lib directory of the application server. The Oracle JDBC drivers are located in the <orainst\>/ora<ver\>/jdbc/lib directory \(for example, c:\\oracle\\ora92\\jdbc\\lib\).

    The JDBC driver for Oracle is in the JAR file: ojdbc6.jar. However, if you see the following error:

    ```
    java.sql.SQLException: OAUTH marshaling failure
    ```

    add the Doracle.jdbc.thinLogonCapability=o3 parameter to JAVA\_OPTS.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

