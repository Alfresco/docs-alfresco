---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: PostgreSQL database
---

# Configuring a PostgreSQL database

This section describes how to configure a PostgreSQL database for use with Alfresco.

1.  Copy the appropriate PostgreSQL driver JAR to:

    -   \(Tomcat\) $TOMCAT\_HOME/lib
    -   \(JBoss\) /jboss/server/default/lib
2.  Create a database named alfresco.

3.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

4.  Set the new user's password to alfresco.

5.  Ensure the Alfresco user has the required privileges to create and modify tables.

6.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

7.  Locate the following line:

    `dir.root=./alf_data`

8.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

9.  Uncomment the following properties:

    ```
    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    #db.driver=org.postgresql.Driver
    #db.url=jdbc:postgresql://localhost:5432/alfresco
    ```

10. Ensure that the other database connection properties are commented out.

11. Save the file without the .sample extension.

12. To allow password-authenticated connections through TCP/IP, ensure the PostgreSQL configuration file, pg\_hba.conf, contains the following:

    ```
    host all all `127.0.0.1/32` password
    ```

    For PostgreSQL version 8.1.3, the file name is pg\_hba.conf. For every other version, the file name is pg\_hba.conf.

13. Restart the Alfresco server.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

