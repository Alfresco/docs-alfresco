# Installing using the WAR file

Alfresco Process Services is installed as two web applications. You can install the two applications in the same web container, although in production configurations it is more usual to use separate containers. For example, if you run them in separate Tomcat instances, you can stop the user webapp running, while continuing to use the administration webapp to change configurations or perform other operations on one or multiple Alfresco Process Services servers.

-   **activiti-admin.war**

    This contains the Alfresco Process Services Administrator application. You use this to administer and monitor your Process Engines.

-   **activiti-app.war**

    This contains the Alfresco Process Services landing page. This webapp is also the user interface for people involved in the task and processes running in the Process Engine. You also use this webapp to create and manage process definitions, and to display and define analytics reports on users' tasks and processes.


-   **[Software requirements](../topics/software_requirements.md)**  
 The Alfresco Process Services WAR \(Web Application Archive\) files are installed in a Java web container. Alfresco Process Services uses a database to store data.
-   **[Installing the Process Services App](../topics/installing_process_services_app.md)**  
 Use these steps to install the Process Services application, activiti-app.
-   **[Installing the Administrator application](../topics/installing_administrator_application.md)**  
 Perform these steps to install Alfresco Process Services Administrator application, activiti-admin.

**Parent topic:**[Installing Alfresco Process Services](../topics/installing_process_services.md)

