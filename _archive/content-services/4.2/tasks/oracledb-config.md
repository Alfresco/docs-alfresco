---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring an Oracle database

Use this information to configure an Oracle RDBMS database for use with Alfresco.

The Oracle database is case sensitive, so any configuration setting that you add into the alfresco-global.properties file must match the case used in Oracle.

**Note:** The Oracle database must be created with the AL32UTF8 character set.

**Note:** The Oracle Thin driver is recommended. Check the [supported platform](../concepts/alf3-supported-stacks.md) page for the proper driver and connection URL to use.

1.  Create a database named alfresco.

2.  Create a user named alfresco.

    The alfresco user must have Connect and Resource privileges in Oracle.

    This user must have write permissions on all tables and sequences.

3.  Set the new user's password to alfresco.

4.  Ensure the alfresco user has the required privileges to create and modify tables.

    You can remove these privileges once the server has started, but they may also be required for upgrades.

5.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

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
    db.url=jdbc:oracle:thin:@${db.host}:${db.port}:${db.name}
    ```

    If using the oci configuration, change the URL syntax as shown below:

    ```
    db.url=jdbc:oracle:oci:@${db.host}:${db.port}:${db.name}
    ```

    The Oracle connection URL in this example is basic. Typical Oracle connection strings can be used with the Oracle driver \(Thin/OCI\). The Thin driver is recommended over the OCI driver.

    For database URLs and specifiers, see the Oracle documentation at [Database URLs and Database Specifiers](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIJFHHB) and [Thin-style Service Name Syntax](http://docs.oracle.com/cd/B28359_01/java.111/b31224/urls.htm#BEIDHCBA).

    You can use standard \(OCI/Thin\) connection URL, Oracle service, and Oracle DNS service URL without any issues.

    **Note:** If you are using the OCI URL, you need an Oracle client on the Alfresco host. For more information, see [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

9.  Save the file without the .sample extension.

10. Copy the Oracle JDBC driver JAR into /lib.

    CAUTION:

    Do not put multiple driver jars in the application or the application server lib directory. Only include the driver jar which is advised in these instructions. Remove any others, if present.

11. Restart the Alfresco server.

    **Note:** If you receive JDBC errors:

    -   Ensure the location of the Oracle JDBC drivers are on the system path or added to the relevant lib directory of the application server.
    -   Check if you have `LD_LIBRARY_PATH` in use in your environment to remove the old Oracle client \(for example, /home/oracle/app/oracle/product/11.2.0/client\_1/lib\) and add the full path to the current `ojdbc6.jar`. If you do not have this environment variable, do not add it.
    **Note:** The JDBC driver for Oracle is in the JAR file: `ojdbc7.jar`. However, if you see the following error, then add the Doracle.jdbc.thinLogonCapability=o3 parameter to JAVA\_OPTS:

    ```
    java.sql.SQLException: OAUTH marshaling failure
    ```


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

