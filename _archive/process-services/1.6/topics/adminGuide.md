# Administering Alfresco Process Services

This guide describes how to install and configure Alfresco Process Services, a commercially supported suite of components built by Alfresco on top of the Process Engine.

-   **[Upgrading from a previous release](../topics/upgrading_from_a_previous_release.md)**  
You can upgrade from earlier versions to Alfresco Process Services 1.6.4.
-   **[Uploading a license from the User Interface](../topics/uploading_a_license_from_the_user_interface_ui.md)**  
To use the license upload feature, add that capability to the appropriate user. Typically an administrator has the capability to add licenses from the **Identity management** app \> **Capabilities** tab.
-   **[Checklist for a new installation](../topics/checklist_for_a_new_installation.md)**  
Alfresco Process Services is shipped with the default configuration settings, which can be configured.
-   **[Alfresco Process Services high-level architecture](../topics/high_level_architecture.md)**  
The following diagram gives a high-level overview of the technical components in Alfresco Process Services.
-   **[Licensing Alfresco Process Services](../topics/licensing.md)**  
Alfresco Process Services must have a valid license to work properly. Alfresco provides this license in the form of a file named *activiti.lic*.
-   **[Installing Alfresco Process Services](../topics/installing_process_services.md)**  
If you have signed up for the Alfresco Process Services 30-day trial, you will receive an email containing links to the installers and your trial license file.
-   **[Installing Process Services using Docker](../concepts/ps_installing_docker.md)**  
Process Services can be deployed using a Docker container.
-   **[Multi-node clustered setup](../topics/multi_node_clustered_setup.md)**  
Running the application on multiple servers, for performance, resilience or failover reasons, is straightforward. The application is architected to be stateless. This means that any server can handle any request from any user. When using multiple servers, it is enough to have a traditional load balancer \(or proxy\) in front of the servers running the Alfresco Process Services application. Scaling out is done in a "horizontal" way, by simply adding more servers behind the load balancer.
-   **[Configuring Alfresco Process Services](../topics/administration_application_config.md)**  
Configure Alfresco Process Services using a properties file named activiti-app.properties. This file must be placed on the application server’s classpath to be found.
-   **[Alfresco Process Services Administrator](../topics/administrator_application.md)**  
The Administrator app can be used to inspect and manage the data for an Alfresco Process Services Process Engine \(or cluster of engines\). It also is used for cluster configuration and monitoring. It is distributed as a separate web application \(WAR file\).

**Parent topic:**[Alfresco Process Services](../concepts/welcome.md)

