# Configuring the REST app for use with the Administrator application

When using the Process Engine embedded in a custom application \(or multiple embedded engines\), it is still needed to set up a REST endpoint that the Administrator application can use to communicate with to see and manage data in the engines cluster.

Alfresco Process Services already contains this REST API, so you must add this additional REST app.

Out of the box, the REST application is configured to have a default admin user for authentication and uses an in memory H2 database. The latter of course needs to be changed to point to the same database as the engines are using.

The easiest way to do this, is to change the properties in the */WEB-INF/classes/META-INF/db.properties* file with the correct datasource parameters. Make sure the driver jar is on the classpath.

To change default user, change the settings in */WEB-INF/classes/META-INF/engine.properties*. In the same file, you can also configure the following basic engine settings:

-   **engine.schema.update**: Indicates if the database schema should be upgraded after booting the engine \(if this is needed\). The default value is true.

-   **engine.asyncexecutor.enabled**: Indicates if the async job executor is enabled. By default, it is set to false, as this is better done on the engine nodes itself otherwise you would have to make sure the classpath has all the delegates used in the various processes.

-   **engine.asyncexecutor.activate**: Instructs the Process Engine to start the Async executor thread pool at startup. The default value is false.

-   **engine.history.level**: The history level of the process engine. **Make sure this matches the history level in the other engines in the cluster**, as otherwise this might lead to inconsistent data. The default value is audit.


If these two property files are insufficient in configuring the process engine, you can override the complete process engine configuration in a Spring xml file located at */WEB-INF/classes/META-INF/activiti-custom-context.xml*. Uncomment the bean definitions and configure the engine without restrictions, similar to a normal Activiti Process Engine configuration.

The out-of-the-box datasource uses C3P0 as connection pooling framework. In the same file, you can configure this datasource and transaction manager.

The application uses Spring Security for authentication. By default, it will use the Alfresco Process Services identityService to store and validate the user. To change it, add a bean with id *authenticationProvider* to */WEB-INF/classes/META-INF/activiti-custom-context.xml*. The class should implement the *org.springframework.security.authentication.AuthenticationProvider* interface \(see Spring docs for multiple implementations\).

**Note:** The Rest app is not compatible with using a master configuration. It needs to be configured through the properties or the spring context XML.

**Parent topic:**[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)

