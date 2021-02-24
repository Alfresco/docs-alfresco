---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuring a PostgreSQL database

This section describes how to configure a PostgreSQL database for use with Alfresco.

1.  Install the PostgreSQL database connector. The database connector allows PostgreSQL database to talk to the Alfresco server.

    1.  Download postgresql-9.0.802.jdbc4.jar from the PostgreSQL download site: [http://www.postgresql.org/download/](http://jdbc.postgresql.org/download.html).

    2.  Copy the JAR file into the /lib directory.

        For example, for Tomcat, copy the JAR file into the <TOMCAT\_HOME\>/lib directory.

2.  Increase the maximum connections setting in the PostgreSQL configuration file.

    1.  Locate the configuration file:

        -   Linux: /var/lib/pgsql/9.3/data/postgresql.conf
        -   Windows: C:\\Program Files\\PostgreSQL\\9.3\\data\\postgresql.conf
    2.  Add or edit the max\_connections property:

        ```
        max_connections = 275
        ```

    3.  Restart the database.

3.  Create a database named alfresco.

4.  Create a user named alfresco.

    This user must have write permissions on all tables and sequences.

5.  Set the new user's password to alfresco.

6.  Ensure the alfresco user has the required privileges to create and modify tables.

7.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

8.  Locate the following line:

    `dir.root=./alf_data`

9.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

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

    **Note:** Ensure that these database connection properties are not commented out.

12. Save the file without the .sample extension.

13. To allow password-authenticated connections through TCP/IP, ensure that the PostgreSQL configuration file, pg\_hba.conf, contains the following line:

    ```
    host all all `127.0.0.1/32` password
    ```

14. Restart the Alfresco server.

    If you receive JDBC errors, ensure the location of the PostgreSQL JDBC drivers are on the system path, or add them to the relevant lib directory of the application server.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

