# Installing Alfresco Process Services

If you have signed up for the Alfresco Process Services 30-day trial, you will receive an email containing links to the installers and your trial license file.

Alternatively, you can [sign up for a free trial](https://www.alfresco.com/products/activiti/trial).

If you want to set up Alfresco Process Services using your own web application container and database product, download the WAR distribution and follow the steps in [Installing using the WAR file](installing_using_the_war_file.md).

-   **[Installing using an installer](../topics/installing_using_an_installer.md)**  
The installer for Windows, OSX, or Linux installs an evaluation copy of Alfresco Process Services that may be used for quick trials and experimentation. The installer will install all the prerequisite software that Alfresco Process Services needs on your platform. You will need to add a license file, which will have been provided with the download links.
-   **[Installing using the WAR file](../topics/installing_using_the_war_file.md)**  
Alfresco Process Services is installed as two web applications. You can install the two applications in the same web container, although in production configurations it is more usual to use separate containers. For example, if you run them in separate Tomcat instances, you can stop the user webapp running, while continuing to use the administration webapp to change configurations or perform other operations on one or multiple Alfresco Process Services servers.
-   **[Starting the Alfresco Process Services app](../topics/starting_process_services_app.md)**  
 To start Alfresco Process Services, start your web container. For example, to start Tomcat, run:
-   **[Stopping the Alfresco Process Services app](../topics/stopping_process_services_app.md)**  
 To stop Alfresco Process Services, stop your web container.
-   **[Multi-tenant post-installation](../topics/multi_tenant_post_installation.md)**  
If you have purchased a multi-tenant license, you must sign in as the default administrator user and perform the minimum configuration after installation. However, this configuration is not required for the 30-day trial or standard installation as it is not multi-tenant.

**Parent topic:**[Administering Alfresco Process Services](../topics/adminGuide.md)

