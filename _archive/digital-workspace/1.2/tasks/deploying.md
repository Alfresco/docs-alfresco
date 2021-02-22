# Deploying Alfresco Digital Workspace

There are a number of different ways to deploy Alfresco Digital Workspace. You can deploy it using Docker images that are packaged in Helm charts or using Docker Compose. You can also install Alfresco Content Services using standard WAR files contained in the distribution zip, and then configure the installation to include Alfresco Digital Workspace.

The deployment methods are:

-   [Containerized deployment](containerized-deployment.md). Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.
-   [Installing into Tomcat](deploy-tomcat.md).
-   [Installing into a different web server](setup-in-webserver.md).

-   **[Containerized deployment](../tasks/containerized-deployment.md)**  
Alfresco Digital Workspace is deployed as part of Alfresco Content Services using Helm charts or a Docker Compose file. Both these methods include a lightweight, pre configured, NGINX server and Alfresco Digital Workspace application. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.
-   **[Installing into Tomcat](../tasks/deploy-tomcat.md)**  
To deploy Alfresco Digital Workspace into Tomcat, you first need to install Alfresco Content Services 6.1 using the distribution zip.
-   **[Installing into a different web server](../tasks/setup-in-webserver.md)**  
You can deploy Alfresco Digital Workspace into a different web server than where Alfresco Content Services is running. You can use another instance of Tomcat, a lightweight web server such as NGINX, or you can use a web server of your choice. First you need to install Alfresco Content Services 6.1 using the distribution zip.

**Parent topic:**[Alfresco Digital Workspace 1.2](../concepts/welcome-adw.md)

