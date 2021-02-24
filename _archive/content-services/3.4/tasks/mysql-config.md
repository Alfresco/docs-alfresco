---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Customization
option: database mysql connection
---

# Configuring the MySQL database

This section describes how to configure a MySQL database for use with Alfresco.

1.  Install the MySQL database connector.

    The MySQL database connector is required when installing Alfresco with MySQL. The database connector allows MySQL database to talk to the Alfresco server.

    1.  Browse to the MySQL download site: [http://dev.mysql.com/](http://dev.mysql.com)

    2.  Download MySQL Connector/J x.x, and extract the following file from the downloaded .zip or .tar.gz file:

        mysql-connector-java-5.x.x-bin.jar

    3.  Copy the JAR file into the <TOMCAT\_HOME\>/lib directory for Tomcat 6.

2.  Create a database named alfresco.

3.  Create a user named alfresco.

4.  Set the new user's password to alfresco.

5.  Open the <classpathRoot\>/alfresco-global.properties.sample file.

6.  Locate the following line:

    `dir.root=./alf_data`

7.  Edit the line with an absolute path to point to the directory in which you want to store Alfresco data. For example: `dir.root=C:/Alfresco/alf_data`

8.  Locate the MySQL connection section, and then uncomment the following lines:

    ```
    #db.driver=org.gjt.mm.mysql.Driver
    #db.url=jdbc:mysql://localhost/alfresco?useUnicode=yes&characterEncoding=UTF-8
    ```

9.  Set the host, port, and name to the location of your MySQL JDBC driver.

    `db.url=jdbc:mysql://your-host:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8`

    If you are using MySQL and require the use of non-US-ASCII characters, you need to set the encoding for internationalization. This allows you to store content with accents in the repository. The database must be created with the UTF-8 character set and the utf8\_bin collation. Although MySQL is a unicode database, and Unicode strings in Java, the JDBC driver may corrupt your non-English data. Ensure that you keep the `?useUnicode=yes&characterEncoding=UTF-8` parameters at the end of the JDBC URL.

10. \(Optional\) Enable case sensitivity.

    The default, and ideal, database setting for Alfresco is to be case-insensitive. For example, the user name properties in the <configRoot\>\\classes\\alfresco\\repository.properties file are:

    ```
    # Are user names case sensitive?
    user.name.caseSensitive=false
    domain.name.caseSensitive=false
    domain.separator=
    ```

    If your preference is to set the database to be case-sensitive, add the following line to the alfresco-global.properties file:

    `user.name.caseSensitive=true`

    **Note:** You also must ensure that the MySQL database is set to use UTF-8 and InnoDB. Refer to [Configuration settings for using MySQL with Alfresco](../concepts/mysql-config-settings.md)

11. Save the <classpathRoot\>/alfresco-global.properties.sample file without the .sample extension.


-   **[Optimizing MySQL to work with Alfresco](../concepts/mysql-config-settings.md)**  
When installing MySQL, there are some settings that are required for it to work with Alfresco. This section describes the configuration settings that you should use in your MySQL instance.

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

