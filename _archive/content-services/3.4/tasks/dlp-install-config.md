---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: DocLib Portlets
keyword: [DocLib Portlets, Liferay, installing, configuring]
---

# Installing and configuring Alfresco DocLib Portlets

This describes how to install and configure Alfresco DocLib Portlets within Liferay. DocLib Portlets provide the rich document management capabilities of the Share Document Library page component within a portal. This feature consists of three portlets for accessing Share sites and the Alfresco repository. In the Share sites portlet, you have access to the sites you are already a member of and all public sites.

Once deployed to Liferay, you will be unable to log in to the native Share application. Therefore, to create and manage Share sites \(including managing site membership and accessing other functionality outside the Document Library component\), you will require a second Share instance deployed to a separate Tomcat server.

Before proceeding with the installation and configuration, ensure the following:

-   The Alfresco repository \(`alfresco.war`\) running must be Enterprise 3.3.3 or later.
-   Alfresco has been installed using the installers or is running in a Tomcat 6 container.
-   Liferay Portal 5.2.3 is installed and working.
-   The administrative user knows the location to which Liferay is deployed.
-   The required modifications have been completed if you are using Tomcat 6. The modifications must be made for both Alfresco and Liferay if you are using different servers.
-   The deployed version of share.war in Liferay must be the same as the deployed version of alfresco.war.

-   **[DocLib Portlets capabilities](../concepts/dlp-capabilities.md)**  
The Share DocLib Portlets include most of the functionality available in a standard Share Document Library.
-   **[Configuring Liferay](../tasks/dlp-liferay-config.md)**  
If you are running Liferay and Alfresco on the same machine, you need to change the port numbers used by the Liferay Tomcat server to prevent conflicts.
-   **[Configuring Alfresco](../tasks/dlp-alfresco-config.md)**  
This task describes how to configure Alfresco for Doclib Portlets.
-   **[Configuring the Liferay Share web application](../tasks/dlp-webapp-deploy.md)**  
This task describes how to deploy the web application.
-   **[Creating Liferay users](../tasks/dlp-create-users.md)**  
This task describes how to create the Liferay users.
-   **[Adding portlets to Liferay](../tasks/dlp-add-portlets.md)**  
This task describes how to add the portlets to Liferay.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

