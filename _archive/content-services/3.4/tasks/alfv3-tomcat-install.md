---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [install, WAR, Tomcat, JDK]
---

# Installing Alfresco on Tomcat

For more complex Alfresco installations or if you wish to use an existing Tomcat application server, you can use the Web Archive \(WAR\) bundle to install on any platform. For this type of installation, you must ensure that the required software is installed on the machine.

Use this method of installing Alfresco if you already have installed a JDK, a supported database, an application server, and the additional Alfresco components.

-   **[Installing Tomcat application server](../tasks/configfiles-change-path.md)**  
This section describes how to install an instance of Tomcat manually and modify it to use the correct directory structure and files for Alfresco.
-   **[Installing the Alfresco WAR](../tasks/alfv3-war-install.md)**  
A WAR file is a JAR file used to distribute a collection of files \(JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static Web pages\) that together constitute a web application.
-   **[Deploying Share into a separate Tomcat instance](../tasks/share-tomcat-deploy.md)**  
You can run the Share application in a separate Tomcat instance from the instance running the Alfresco WAR. This additional instance can be installed on the same server as the original Tomcat instance, or it can be installed on a separate server.
-   **[Configuring Alfresco as a Windows service](../tasks/alf-winservice.md)**  
This section describes how to configure Alfresco as a Windows service in a standard Tomcat installation. To configure Alfresco to run as a Windows service, you need to set up the application server \(Tomcat\) to run as a Windows service.

**Parent topic:**[Installing Alfresco](../concepts/ch-install.md)

