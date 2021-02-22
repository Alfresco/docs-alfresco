# Installing the Process Services App

Perform these steps to install the Process Services application, activiti-app.

1.  Install your Web container and database.

    These instructions use Tomcat and MySQL as examples.

2.  Create a MySQL schema.

    The default name is `activiti`.

    For example, in the MYSQL utility, issue the following:

    ```
    create database activiti
    CHARACTER SET utf8
    COLLATE utf8_bin;
    ```

3.  Copy the activiti-app WAR file into your web container.

    The default application name is `activiti-app`. If you change this name, you must update the configuration to the [correct context root](http://tomcat.apache.org/tomcat-8.0-doc/config/context.html).

    For example, for Tomcat, copy the `activiti-app.war` to the `webapps` folder.

4.  Edit the properties in the example `activiti-app.properties` provided with the WAR file.
    1.  Uncomment and modify JDBC details as necessary for your type of database and the schema to be used.
    2.  Modify the `contentstorage.fs.rootFolder` to specify a location for file content to be stored.
    3.  Modify the `elastic-search.data.path` to specify a location for the search and analytics indexes.
    4.  Copy the `activiti-app.properties` file onto the container classpath, for example the `<Install>/tomcat/lib` folder

**Parent topic:**[Installing using the WAR file](../topics/installing_using_the_war_file.md)

