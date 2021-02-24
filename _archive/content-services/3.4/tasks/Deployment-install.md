---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Installation
option: AVM Deployment Receiver
---

# Installing the standalone deployment receiver

The standalone deployment receiver allows a web project from AVM to be deployed to a remote file server, typically a web or application server. The published files are then typically published by a web server such as Apache for static content, or an application server, such as Tomcat or JBoss for dynamic content

1.  Browse to the Alfresco Enterprise download area.

2.  Download one of the following files:

    -   \(Windows\) alfresco-enterprise-deployment-3.4.14-win.exe
    -   \(Linux\) alfresco-enterprise-deployment-3.4.14-linux.bin
3.  Run the installation file.

4.  In the Setup - Alfresco Enterprise Deployment window, click **Next**.

5.  In the Installation Directory window, click **Next** to accept the default location for the deployment receiver, or you can choose another location.

    For example, C:\\alfresco\\deployment on Windows or /opt/alfresco/deployment on Linux.

6.  In the User Account Details window, enter a user name and password for the user account that will administer the deployment receiver, and then click **Next**.

7.  If you are using RMI as your transport protocol, enter the port numbers for the following:

    |**Deployment**|**Description**|
    |--------------|---------------|
    |RMI Registry Port Number|The port number for the RMI registry. Choose the default of 44100 to avoid conflict the other services.|
    |RMI Service Port Number|The port number to use for the RMI service. Choose the default of 44101 to avoid conflicts with other services.|

8.  Click **Next**.

9.  In the Ready to Install window, click **Next**.

10. In the Completing the Alfresco Enterprise Deployment Setup Wizard window, click **Finish**.


The deployment receiver, out of the box, is configured with a single file system deployment target.

**Parent topic:**[Installing AVM](../concepts/wcm-install-intro.md)

