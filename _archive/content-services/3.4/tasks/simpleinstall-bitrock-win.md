---
author: [Alfresco Documentation, Helen Mullally]
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
category: Installation
keyword: [install, Windows]
---

# Installing Alfresco on Windows

The setup wizard for Microsoft Windows installs all the software and components that you require for running Alfresco. This setup wizard installs Alfresco and additional software, including a Tomcat application server, PostgreSQL database, JDK, OpenOffice, SWFTools, and ImageMagick.

1.  Download one of the following installation files:

    alfresco-enterprise-3.4.14-installer-win-x32.exe 

    alfresco-enterprise-3.4.14-installer-win-x64.exe

    There are two versions of the Alfresco installation wizard: one for 32-bit systems, and the other for 64-bit systems. Use the version appropriate for your system type.

2.  Double-click the downloaded file.

3.  On the **Setup - Alfresco Enterprise** window, click **Next**.

4.  On the Installation type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

        |****Easy****|Easy type installs Alfresco using the default options and configuration. This install type requires only two fields: install location and administrator password. Choose this route to install Alfresco with the default environment.**Note:** If you have previously installed Alfresco and the server is running, when you run this installation wizard again, you may be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.

|
    |****Advanced****|Advanced type installs Alfresco but lets you configure the server ports and service properties. You can also choose which components to install.

 **Note:** It is important to install the same combination of Alfresco-supplied modules \(AMPs\) as you had previously. Select **Advanced** to ensure that you have the same modules.

|

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation folder window, click Next to accept the default location.

    3.  On the Admin Password window, enter a password for the Administrator user \(`admin`\).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the **Completing the Alfresco Enterprise Setup Wizard** window and launching Alfresco Share.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

5.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    You can select from the following components:

    -   Java
    -   PostgreSQL
    -   SharePoint
    -   Records Management
    -   Web Quick Start
    -   Web Project Management \(AVM\)
    -   Quickr Connector Support
    -   OpenOffice
    **Note:** You cannot deselect the Alfresco component because it is installed by default.

6.  When you have finished selecting the components, click **Next**.

7.  On the Installation folder window, click Next to accept the default location.

    For example, the default location is C:\\Alfresco.

    Alternatively, click the ![](../images/installlocation-icon.png) icon to choose another location.

8.  The Database Server Parameters window prompts you to enter a port number for your database.

9.  On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    1.  Web Server Domain

        For example, the default is 127.0.0.1.

    2.  Tomcat port

        For example, the default is 8080.

    3.  Tomcat Shutdown port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

10. On the Alfresco FTP Port window, enter a port number for the Alfresco FTP server.

11. On the Alfresco RMI Port window, enter a port number for the RMI service.

12. On the Admin Password window, enter a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco Administrator user account \(admin\).

13. \(Optional\) If you are installing SharePoint Protocol Support, the Alfresco SharePoint Port window displays. Enter a port number, and then click **Next**.

14. \(Optional\) If you are installing the Quickr Connector Support component, the Quickr Content Services window displays. Enter the host and port details for your Quickr server, and then click **Next**.

    For example, the default is localhost and port number 6060. These settings are added to the Quickr configuration file.

15. \(Optional\) If you are installing the OpenOffice component, the OpenOffice Server Port window displays. Enter a port number on which the OpenOffice server will listen.

16. On the Service Startup Configuration window, you are presented with two options for starting up the Alfresco services.

        |****Manual****|Sets the services to be started manually. Choose this option if you want to start the services manually.|
    |****Auto****|Sets the services to start up automatically when you restart the machine.

|

    Select the services start up option, and then click **Next**.

17. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

18. On the **Completing the Alfresco Enterprise Setup Wizard** window, click **Finish**.

    By default, when you click **Finish**, the Readme file displays. If you do not want to view the Readme file, deselect the checkbox. Also, if you do not want to start Alfresco at this point, deselect the **Launch Alfresco Enterprise Share** checkbox.

19. Click **OK**.

    The Alfresco server starts and then Alfresco Share launches in your default browser.

    **Important:** It may take several minutes to start the Alfresco server and to launch Share. Your browser opens and tries to connect to [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share).

20. Log on to Alfresco Share as the admin user. Enter the password that you specified in the Admin Password window.

    The Alfresco server is launched as a Windows service. To manage the server, open the Control Panel Services window. The services that will be running for an Alfresco install using the default options are:

    -   `alfrescoPostgreSQL`
    -   `alfrescoTomcat`
    If you did not automatically launch Alfresco at the end of the installation wizard, to start Alfresco, you need to start all the services. Use the servicerun start script in the installation directory or select **All Programs \> Alfresco Enterprise \> Alfresco Enterprise Service \> Start Alfresco Enterprise Service**.

21. To fully stop Alfresco, you must stop all the services. Use the scripts in the installation directory to start or stop the services: servicerun start and servicerun stop.


The URL [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share) is the default for when you first install Alfresco, and can be used on this machine to verify that Alfresco is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where Alfresco is installed, you need to define and create a publicly addressable name.

**Parent topic:**[Alfresco Simple Installs](../concepts/simple-installs-intro.md)

