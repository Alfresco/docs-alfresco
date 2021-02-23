---
author: [Alfresco Documentation, Helen Mullally]
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
category: Installation
keyword: [install, Windows]
---

# Installing Alfresco Enterprise on Windows

The setup wizard for Microsoft Windows installs all the software and components that you require for running Alfresco. This setup wizard installs Alfresco and additional software, including a Tomcat application server, PostgreSQL database, SWFTools, LibreOffice, and ImageMagick.

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr Communication](generate-keys-solr.md).

1.  Download the following installation file:

    alfresco-enterprise-4.2.8-installer-win-x64.exe

    The Alfresco setup wizard is for 64-bit Windows systems.

2.  Double-click the downloaded file.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

4.  On the **Setup - Alfresco Enterprise** window, click **Next**.

5.  On the Installation type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

        |****Easy****|**Easy** type installs Alfresco using the default options and configuration. This install type requires only two fields: install location and administrator password. Choose this route to install Alfresco with the default environment.**Note:** If you have previously installed Alfresco and the server is running, when you run this setup wizard again, you may be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.

|
    |****Advanced****|**Advanced** type installs Alfresco but lets you configure the server ports and service properties. You can also choose which additional components to install.

|

    **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, Alfresco recommends that you use the **Easy** installation option. However, if you want to connect to an existing database server for Alfresco and also, want to see how the various components are being configured, use the **Advanced** installation option.

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

6.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    You can select from the following components:

    -   PostgreSQL
    -   SharePoint
    -   Web Quick Start
    -   Google Docs Integration
    -   LibreOffice
    **Note:** You cannot deselect the Alfresco component because it is installed by default.

7.  When you have finished selecting the components, click **Next**.

8.  On the Installation folder window, click Next to accept the default location.

    For example, the default location is C:\\Alfresco.

    Alternatively, click the ![](../images/installlocation-icon.png) icon to choose another location.

    **Important:** There is a known problem related to the use of virtual Windows drives and permission restrictions on the C drive in Windows. If you select a virtual Windows drive, and you have selected additional components in step 6, you might receive an error message during installation:

    ```
    09160000 An IO error was encountered during deployment of the AMP into the WAR
    ```

    The installation will complete, but additional components will not be added to the Alfresco installation. The error does not occur if the virtual drive is associated with a folder that is not on the C drive \(that is, any other physical or virtual hard disk on the Windows machine\). You have two options:

    -   Do not use the SUBST command for folders on the C drive \(in other words, use SUBST on other drives instead\)
    -   Use a Virtual Hard Disk \(VHD\), which behaves like a physical disk, in place of the virtual Windows drive for the install. For guidance, see [Create and use a Virtual Hard Disk](http://technet.microsoft.com/en-us/magazine/ee872416.aspx).
9.  On the Database Server Parameters window, enter a port number for your database.

    Enter a suitable port number or click **Next** to accept the default of 5432.

10. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters, and then click **Next**.

    1.  Enter the Web Server domain number.

        For example, the default is 127.0.0.1.

        The URL [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share) is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where Alfresco is installed, you need to define and create a publicly addressable name.

    2.  Enter the port number for the Tomcat web application.

        For example, the default is 8080.

    3.  Enter the Tomcat Shutdown port number.

        For example, the default is 8005.

    4.  Enter the Tomcat SSL port number.

        For example, the default is 8443.

    5.  Enter the Tomcat AJP Port number.

        For example, the default is 8009.

11. On the Alfresco FTP Port window, enter a port number for the Alfresco FTP server, and then click **Next**.

12. On the Alfresco RMI Port window, enter a port number for the RMI service, and then click **Next**.

13. On the Admin Password window, enter a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco Administrator user account \(admin\).

    CAUTION:

    You must use ASCII characters only when setting the password using the installer. If you need to reset the password \(to include non-ASCII characters\) after installation, see [Changing a user's password](admintools-user-password.md).

14. \(Optional\) If you are installing SharePoint Protocol Support, the Alfresco SharePoint Port window displays. Enter a port number, and then click **Next**.

15. \(Optional\) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

16. On the Service Startup Configuration window, you are presented with two options for starting up the Alfresco services.

        |****Manual****|Sets the services to be started manually. Choose this option if you want to start the services yourself.|
    |****Auto****|Sets the services to start up automatically when you restart the machine.

|

    Select the services start up option, and then click **Next**.

17. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

18. On the **Completing the Alfresco Enterprise Setup Wizard** window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to start the server and launch Alfresco Share. By default, these options are selected and will start when you click **Finish**. If you do not want to start Alfresco at this point, deselect the **Launch Alfresco Enterprise Share** check box.

    **Important:** If you are installing the S3 connector as part of your Alfresco installation, deselect the **Launch Alfresco Enterprise Share** check box. You must not start Alfresco before applying the S3 AMP file.

19. Click **OK** to close the Readme.

    The Alfresco server starts and then Alfresco Share launches in your default browser.

    **Important:** It may take several minutes to start the Alfresco server and to launch Share. Your browser opens and tries to connect to [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share).

20. Log on to Alfresco Share as the admin user. Enter the password that you specified in the Admin Password window.

    The Alfresco server is launched as a Windows service. If you did not automatically launch Alfresco at the end of the installation wizard, to start Alfresco, you need to start all the services. From the **Start** menu, select **All Programs \> Alfresco One \> alfresco manager tool** and start the `Tomcat Server` and `Postgres` services, or from a command prompt, navigate to the Alfresco installation directory \(C:/Alfresco\) and run `servicerun START` as an administrator.

21. To fully stop Alfresco, you must stop all the services. Use the alfresco manager tool \(see the previous step\) to manage the services, or use the scripts in the installation directory to start or stop the services: servicerun START and servicerun STOP. You need administrator rights to run these commands.


**Parent topic:**[Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)

