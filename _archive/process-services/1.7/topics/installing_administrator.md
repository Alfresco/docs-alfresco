# Installing Alfresco Process Services Administrator

The Alfresco Process Services Administrator is distributed as a regular *WAR* \(Web Application ARchive\) file that can be dropped in any Java web container.

Drop the *activiti-admin.war* file into the web container and start the web container. To make the application use your database, you must do the following:

-   Copy the correct JDBC database driver to the classpath of the web application.

-   Create a property file called **activiti-admin.properties** and **make sure it is on the classpath** of the web application. The properties must point to the correct environment settings. If no properties file is found on the classpath, then the activiti-admin \(*WEB-INF/classes/META-INF/activiti-admin*\) file is used by default.


-   **[Administrator database configuration](../topics/database_configuration.md)**  

-   **[Cluster configuration and monitoring](../topics/cluster_configuration_and_monitoring.md)**  
Alfresco Process ServicesAdministrator can show the process data and manage the configuration of multiple clusters. In this context a *cluster* is a number of Process Engines that logically belong together. Note that this does not relate to the way that these engines are architecturally set up: embedded, exposed through REST, with or without a load balancer in front, and so on.
-   **[Cluster master configuration](../topics/master_configuration.md)**  
For each cluster, a *master configuration* can be defined. When the instance boots up, it will request the master configuration data from the Administrator application. For this to work, the *cluster.x* properties \(or equivalent programmatic setters\) listed above need to be set correctly.
-   **[HTTP communication with Administrator](../topics/http_communication_overview.md)**  
Communication with the Administrator Application is done using HTTP REST calls. The calls use HTTP Basic Authentication for security, but do use different users, depending on the user case.
-   **[Configuring the REST app for use with the Administrator application](../topics/rest_app_config.md)**  
When using the Process Engine embedded in a custom application \(or multiple embedded engines\), it is still needed to set up a REST endpoint that the Administrator application can use to communicate with to see and manage data in the engines cluster.

**Parent topic:**[Alfresco Process Services Administrator](../topics/administrator_application.md)

