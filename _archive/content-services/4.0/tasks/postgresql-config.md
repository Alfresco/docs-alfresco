---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: PostgreSQL database
---

# Configuring a PostgreSQL database

This section describes how to configure a PostgreSQL database for use with Alfresco.

1.  Install the PostgreSQL database connector. The database connector allows PostgreSQL database to talk to the Alfresco server.

    1.  Download postgresql-9.0.802.jdbc4.jar from the PostgreSQL download site: [http://www.postgresql.org/download/](http://www.postgresql.org/download/).

    2.  Copy the JAR file into the <TOMCAT\_HOME\>/lib directory for Tomcat 6.

2.  Create a database named alfresco.

3.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

4.  Set the new user's password to alfresco.

5.  Ensure the alfresco user has the required privileges to create and modify tables.

6.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

7.  Locate the following line:

    `dir.root=./alf_data`

8.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

9.  Uncomment the following properties:

    ```
    # PostgreSQL connection (requires postgresql-8.2-504.jdbc3.jar or equivalent)
    #
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://${db.host}:${db.port}/${db.name} 
    ```

10. Set the other database connection properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=5432
    db.pool.max=40
    ```

    **Note:** Ensure that these database connection properties are not commented out.

11. Save the file without the .sample extension.

12. To allow password-authenticated connections through TCP/IP, ensure the PostgreSQL configuration file, pg\_hba.conf, contains the following:

    ```
    host all all `127.0.0.1/32` password
    ```

13. Restart the Alfresco server.

    If you receive JDBC errors, ensure the location of the PostgreSQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

