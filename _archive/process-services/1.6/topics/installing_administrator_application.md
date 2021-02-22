# Installing the Administrator application

Perform these steps to install Alfresco Process Services Administrator application, activiti-admin.

1.  Install your Web container.

    These instructions use Tomcat as an example. However, you can use the same web container that was used for the Alfresco Process Services webapp.

2.  Install your database.

    These instructions use MySQL as an example. You can use the same database instance that you created for the Alfresco Process Services webapp.

3.  Create a MySQL schema.

    The default name is `activitiadmin`.

    For example, in the MySQL utility:

    ```
    create database activitiadmin
    CHARACTER SET utf8
    COLLATE utf8_bin;
    ```

4.  Copy the activiti-admin WAR file into your web container.

    The default application name is `activiti-admin`. To change this name, you must update the configuration to the correct [context root](http://tomcat.apache.org/tomcat-8.0-doc/config/context.html).

    For example, for Tomcat, copy the `activiti-admin.war` to the `webapps` folder.

5.  Edit the properties in the example `activiti-admin.properties` provided with the WAR file.
    1.  Uncomment and modify JDBC details as necessary for your type of database and the schema to be used.
    2.  Copy the `activiti-admin.properties` file onto the container classpath, for example the `<Install>/tomcat/lib` folder.

**Parent topic:**[Installing using the WAR file](../topics/installing_using_the_war_file.md)

