---
author: Alfresco Documentation
---

# Using MySQL with a repository AMP project

The Alfresco SDK can be configured to use MySQL, rather than the default database which is H2. The following shows how to configure a repository AMP project to use MySQL.

This tutorial assumes you have access to a suitable MySQL server, or a local installation of MySQL. Instructions on how to do this can be found in the [MySQL documentation](http://dev.mysql.com/doc/). It is also assumed that you have created a repository AMP project according to instructions found [here](alfresco-sdk-tutorials-amp-archetype.md).

You will see how to configure Alfresco SDK to use MySQL, rather than H2. This involves running a simple script in MySQL, to create the necessary database and user, and set privileges. You will also need to add some configuration to the AMP project pom.xml file.

1.  Create a file db\_setup.sql with the following contents:

    ```
    create database alfresco default character set utf8;
     grant all on alfresco.* to 'alfresco'@'localhost' identified by 'alfresco' with grant option;
     grant all on alfresco.* to 'alfresco'@'localhost.localdomain' identified by 'alfresco' with grant option;                                            
    ```

2.  Log into your MySQL server as root using the MySQL client:

    ```
    mysql -u root -p                                            
    ```

3.  Run your script to set up the database for Alfresco:

    ```
    source db_setup.sql                                            
    ```

    This will create the Alfresco database \(alfresco\) and user/pwd \(alfresco/alfresco\).

4.  You now need to configure your project POM file. Change into your project directory and load pom.xml into your editor of choice.

5.  Add a dependency for the MySQL JDBC driver at the `<project>` level of your pom.xml file:

    ```
    <dependencies>
            ...
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.32</version>
            </dependency>
    </dependencies>                    
    ```

6.  Now add the configuration required for connecting to your MySQL server in the properties section of the POM:

    ```
    <!-- MySQL configuration -->
    <alfresco.db.name>alfresco</alfresco.db.name>
    <alfresco.db.username>alfresco</alfresco.db.username>
    <alfresco.db.password>alfresco</alfresco.db.password>
    <alfresco.db.host>localhost</alfresco.db.host>
    <alfresco.db.port>3306</alfresco.db.port>
    <alfresco.db.params></alfresco.db.params>
    <alfresco.db.url>jdbc:mysql://${alfresco.db.host}:${alfresco.db.port}/${alfresco.db.name}</alfresco.db.url>
    <alfresco.db.datasource.class>org.gjt.mm.mysql.Driver</alfresco.db.datasource.class>                        
    ```

7.  Save your changes to the pom.xml file.

8.  Comment out the H2 Dialect configuration from `alfresco-global.properties`

    Open the src/test/properties/local/alfresco-global.properties configuration file. Then comment out the following line:

    ```
    #hibernate.dialect=org.hibernate.dialect.H2Dialect
    ```

9.  Now in the project directory you can type:

    ```
    mvn clean install                          
    ```

10. Clean up any previous runs with H2:

    ```
    rm -rf alf_data_dev/                                            
    ```

    This step is also very **important** as it will remove any content and indexes created when you started with the H2 database. When you switch over to run with MySQL the system thinks that it is the first time that you are running Alfresco, so it will create a new database, new content, and index again, which will clash with any previous starts with H2.

11. Once you have a successful build you can run up Alfresco using:

    ```
    mvn clean install -Pamp-to-war                                            
    ```

    Alfresco will start up and use the MySQL database server that you configured. Track console messages to confirm such as:

    ```
    ...
    2014-09-15 15:47:52,552  INFO  [alfresco.repo.admin] [localhost-startStop-1] Using database URL 'jdbc:mysql://localhost:3306/alfresco' with user 'alfresco'.
    2014-09-15 15:47:52,987  INFO  [alfresco.repo.admin] [localhost-startStop-1] Connected to database MySQL version 5.6.11                
    ...                    
    ```

12. Check for the message `INFO: Starting ProtocolHandler ["http-bio-8080"]`.

13. Point your web browser at `http://localhost:8080/alfresco`, and log in as `admin` with password `admin`.


You have configured the Alfresco SDK to use MySQL rather than H2.

**Parent topic:**[Using MySQL](../concepts/alfresco-sdk-tutorials-mysql-intro.md)

