---
author: Alfresco Documentation
---

# Using MySQL with an All-in-One project

The Alfresco SDK can be configured to use MySQL, rather than the default database which is H2. The following shows how to configure an All-in-One project to use MySQL.

This tutorial assumes you have access to a suitable MySQL server, or a local installation of MySQL. Instructions on how to do this can be found in the [MySQL documentation](http://dev.mysql.com/doc/).

You will see how to configure Alfresco SDK to use MySQL, rather than H2. This involves running a simple script in MySQL, to create the necessary database and user, and set privileges. You will also need to add some configuration to the project pom.xml file.

1.  Create a fresh All-in-One \(AIO\) project to work with. You can use the instructions contained in [this tutorial](alfresco-sdk-tutorials-all-in-one-archetype.md) as your guide.

2.  Create a file db\_setup\_aio.sql with the following contents:

    ```
    create database alfrescoaio default character set utf8;
     grant all on alfrescoaio.* to 'alfresco'@'localhost' identified by 'alfresco' with grant option;
     grant all on alfrescoaio.* to 'alfresco'@'localhost.localdomain' identified by 'alfresco' with grant option;                                            
    ```

    CAUTION:

    Note a different database has been specified here to avoid conflict with the previous tutorial.

3.  Log into your MySQL server as root using the MySQL client:

    ```
    mysql -u root -p                           
    ```

4.  Run your script to set up the database for Alfresco:

    ```
    source db_setup_aio.sql                                            
    ```

    This will create the Alfresco database and user.

5.  Add a dependency for the MySQL JDBC driver

    Open the \{AIO\_PROJECT\_ROOT\}/runner/pom.xml project file. Then add the following dependency at the end of the `tomcat7-maven-plugin` definition:

    ```
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
    ...
        </configuration>
        <dependencies>
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.32</version>
            </dependency>
        </dependencies>
    </plugin>                    
    ```

6.  Now add the configuration required for connecting to your MySQL server

    Open the \{AIO\_PROJECT\_ROOT\}/pom.xml project file. Then add the MySQL database connection properties as follows:

    ```
    <properties>
     ...
        <!-- MySQL configuration -->
        <alfresco.db.name>alfrescoaio</alfresco.db.name>
        <alfresco.db.username>alfresco</alfresco.db.username>
        <alfresco.db.password>alfresco</alfresco.db.password>
        <alfresco.db.host>localhost</alfresco.db.host>
        <alfresco.db.port>3306</alfresco.db.port>
        <alfresco.db.params></alfresco.db.params>
        <alfresco.db.url>jdbc:mysql://${alfresco.db.host}:${alfresco.db.port}/${alfresco.db.name}</alfresco.db.url>
        <alfresco.db.datasource.class>org.gjt.mm.mysql.Driver</alfresco.db.datasource.class>                        
    </properties>
    ```

7.  Comment out the H2 Dialect configuration from `alfresco-global.properties`

    Open the \{AIO\_PROJECT\_ROOT\}/repo/src/main/properties/local/alfresco-global.properties configuration file. Then comment out the following line:

    ```
    #hibernate.dialect=org.hibernate.dialect.H2Dialect
    ```

    Open the \{AIO\_PROJECT\_ROOT\}/repo-amp/src/test/properties/local/alfresco-global.properties configuration file. Then comment out the following line:

    ```
    #hibernate.dialect=org.hibernate.dialect.H2Dialect
    ```

8.  Now in the project directory you can type:

    ```
    mvn clean install                                            
    ```

    This step is very **important** as it cleans up any previous configuration files from target/...

9.  Clean up any previous runs with H2:

    ```
    rm -rf alf_data_dev/                                            
    ```

    This step is also very **important** as it will remove any content and indexes created when you started with the H2 database. When you switch over to run with MySQL the system thinks that it is the first time that you are running Alfresco, so it will create a new database, new content, and index again, which will clash with any previous starts with H2.

10. Once you have a successful build the project you can start up Alfresco using:

    ```
    mvn clean install -Prun                                            
    ```

    Alfresco will start up and use the MySQL database server that you configured. As before, scan the console for messages that confirm that Alfresco has connected to MySQL:

    ```
    2014-09-15 16:14:59,912  INFO  [domain.schema.SchemaBootstrap] [localhost-startStop-1] Connecting to database: jdbc:mysql://localhost:3306/alfrescoaio, UserName=alfresco@localhost, MySQL Connector Java
    2014-09-15 16:14:59,913  INFO  [domain.schema.SchemaBootstrap] [localhost-startStop-1] Schema managed by database dialect org.hibernate.dialect.MySQLInnoDBDialect.                   
    ```

11. Point your web browser at `http://localhost:8080/share`, and log in as `admin` with password `admin`.


You have configured the Alfresco SDK to use MySQL rather than H2.

**Parent topic:**[Using MySQL](../concepts/alfresco-sdk-tutorials-mysql-intro.md)

