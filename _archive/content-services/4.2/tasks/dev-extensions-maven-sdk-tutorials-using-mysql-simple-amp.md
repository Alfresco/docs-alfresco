---
author: Alfresco Documentation
---

# Using MySQL with a Simple AMP project

The Maven Alfresco SDK can be configured to use MySQL, rather than the default database which is H2. The following shows how to configure a Simple AMP project to use MySQL.

This tutorial assumes you have access to a suitable MySQL server, or a local installation of MySQL. Instructions on how to do this can be found in the [MySQL documentation](http://dev.mysql.com/doc/).

You will see how to configure Maven Alfresco SDK to use MySQL, rather than H2. This involves running a simple script in MySQL, to create the necessary database and user, and set privileges. You will also need to add some configuration to the project pom.xml file.

1.  Create a fresh [Simple AMP project](dev-extensions-maven-sdk-tutorials-amp-archetype.md) to work with. You can use the instructions contained in [this tutorial](dev-extensions-maven-sdk-tutorials-amp-archetype.md) as your guide.

2.  Create a file db\_setup.sql with the following contents:

    ```
    
                            
        create database alfrescoamp default character set utf8;
        grant all on alfrescoamp.* to 'alfresco'@'localhost' identified by 'alfresco' with grant option;
        grant all on alfrescoamp.* to 'alfresco'@'localhost.localdomain' identified by 'alfresco' with grant option;                        
                            
                        
    ```

3.  Log into your MySQL server as root using the MySQL client:

    ```
    
                            
        mysql -u root -p                        
                            
                        
    ```

4.  Run your script to set up the database for Alfresco:

    ```
    
                            
        source db_setup.sql                        
                            
                        
    ```

    This will create the Alfresco database and user.

5.  You now need to configure your project POM file. Change into your project directory and load pom.xml into your editor of choice.

6.  Add a dependency for the MySQL Connector-J driver at the `<project>` level of your pom.xml file:

    ```
    
        
        <dependencies>
            ...
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.28</version>
            </dependency>
        </dependencies>
    
                        
    ```

7.  Now add the configuration required for connecting to your MySQL server in the properties section of the POM:

    ```
    
                            
            <!-- MySQL configuration -->
            <alfresco.db.name>alfrescoamp</alfresco.db.name>
            <alfresco.db.username>alfresco</alfresco.db.username>
            <alfresco.db.password>alfresco</alfresco.db.password>
            <alfresco.db.host>localhost</alfresco.db.host>
            <alfresco.db.port>3306</alfresco.db.port>
            <alfresco.db.params></alfresco.db.params>
            <alfresco.db.url>jdbc:mysql://${alfresco.db.host}:${alfresco.db.port}/${alfresco.db.name}</alfresco.db.url>
            <alfresco.db.datasource.class>org.gjt.mm.mysql.Driver</alfresco.db.datasource.class>                        
                            
                        
    ```

8.  Save your changes to the pom.xml file.

9.  Now in the project directory you can type:

    ```
    
                            
        mvn clean install                        
                            
                        
    ```

10. Once you have a successful build you can run up Alfresco using:

    ```
    
                            
        mvn install -Pamp-to-war                        
                            
                        
    ```

    Alfresco will start up and use the MySQL database server that you configured.


You have configured the Maven Alfresco SDK to use MySQL rather than H2.

**Parent topic:**[Using MySQL](../concepts/dev-extensions-maven-sdk-tutorials-mysql-intro.md)

