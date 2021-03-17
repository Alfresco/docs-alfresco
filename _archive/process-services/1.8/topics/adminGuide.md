# Administering

This section describes how to install and configure Alfresco Process Services.

-   **[Installing Alfresco Process Services](../topics/installing_process_services.md)**  
If you have signed up for the Alfresco Process Services 30-day trial, you will receive an email containing links to the installers and your trial license file.
-   **[Upgrading from a previous release](../topics/upgrading_from_a_previous_release.md)**  
You can upgrade from earlier versions to Alfresco Process Services 1.8.
-   **[Installing Process Services using Docker](../concepts/ps_installing_docker.md)**  
Process Services can be deployed using a Docker container.
-   **[Multi-node clustered setup](../topics/multi_node_clustered_setup.md)**  
You can run the application on multiple servers, for performance, resilience or for failover reasons. The application architecture is designed to be stateless. This means that any server can handle any request from any user. When using multiple servers, it is enough to have a traditional load balancer \(or proxy\) in front of the servers running the Alfresco Process Services application. Scaling out is done in a "horizontal" way, by adding more servers behind the load balancer.
-   **[Configuring Alfresco Process Services](../topics/administration_application_config.md)**  
Configure Alfresco Process Services using a properties file named activiti-app.properties. This file must be placed on the application server’s classpath to be found.
-   **[Alfresco Process Services Administrator](../topics/administrator_application.md)**  
The Administrator app can be used to inspect and manage the data for an Alfresco Process Services Process Engine \(or cluster of engines\). It also is used for cluster configuration and monitoring. It is distributed as a separate web application \(WAR file\).

**Parent topic:**[Alfresco Process Services](../concepts/welcome.md)

