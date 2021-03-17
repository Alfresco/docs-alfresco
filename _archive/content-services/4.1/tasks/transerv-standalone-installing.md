---
author: Alfresco Documentation
---

# Installing the standalone Transformation Server

This section describes how to install the standalone Transformation Server.

Before you start the installation, verify that you have:

-   installed and activated Windows 2008 Server
-   installed and activated Microsoft Office 2010
-   logged on to the Windows Server as a user with administrator rights

1.  Double click the MSI installer package alfresco-4.2-transformationserver-server-1.4.0.msi.

    The Welcome screen displays. 

2.  Click **Next**.

    The copyright information screen displays. 

3.  Click **Next**.

4.  Select an installation folder or accept the default folder, and then click **Next**.

5.  Select the TCP/IP ports used by the Transformation Server. 

    The default values are 8080 \(HTTP\) and 8443 \(HTTPS\) but you can also use the standard ports 80 and 443 \(or any other port\) if this fits better into your network infrastructure.

6.  Click **Next** to start the installation. 

    You see a progress bar during the installation and the **Cluster Setting** dialog box displays. Use this dialog box to configure clustered transformation servers.

7.  Choose the number of servers you have from the **Number of servers** list.

8.  If you have multiple transformation servers, complete the following steps to configure them.

    1.  In the **Log database host** field, specify the hostname of the remote transformation server where the logs from this server should be sent.

    2.  In the **Cluster node name** field, specify a unique name for this transformation server.

    3.  Click **OK** to continue.

9.  If you do not have multiple transformation servers, click **OK** to continue.

10. Click **Next** to finish the installation.

    The **Alfresco Transformation Server has been successfully installed** message displays.

11. Click **Close**.

12. Verify that the installation has completed successfully.

    1.  Check the Windows Services in the management console. 

    2.  Locate the new service called **Transformation Service**, and check that it is set to **Started**.


**Parent topic:**[Installing the Alfresco Transformation Server](../concepts/transerv-installing.md)

