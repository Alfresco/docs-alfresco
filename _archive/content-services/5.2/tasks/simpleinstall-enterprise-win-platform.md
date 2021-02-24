---
author: Alfresco Documentation
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
---

# Installing on Windows using the Platform installer

The Alfresco Content Services Platform Installer for Windows installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other required software like ImageMagick. It does not install Alfresco Share.

**Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Windows using the Alfresco Content Services installer](simpleinstall-enterprise-win.md) for more information. Use the Platform Installer only if you have a specific requirement for it.

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication](generate-keys-solr4.md).

1.  Download the following installation file:

    alfresco-content-services-platform-installer-5.2.7-win-x64.exe

    Files are available from the [Support Portal](http://support.alfresco.com/).

    The setup wizard is for 64-bit Windows systems.

2.  Double-click the downloaded file.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup - Platform window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

        |****Easy****|Easy type installs using the default options and configuration. This install type requires you to enter information in only two fields: the install location and the administrator password. Choose this route to install with the default environment.**Note:** If you have previously installed Alfresco Content Services and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.

|
    |****Advanced****|Advanced type installs but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, we recommend that you use the **Easy** installation option. However, if you want to connect to an existing database server and also, want to see how the various components are being configured, use the **Advanced** installation option.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

    3.  On the Admin Password window, enter a password for the Administrator user \(`admin`\).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the Completing the Platform Setup Wizard window and launching Alfresco Content Services.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

7.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    -   Java \(this is JRE only\)
    -   PostgreSQL
    -   LibreOffice
    -   Alfresco Content Services Platform
    -   Solr 4
    -   Alfresco Office Services
8.  When you have finished selecting the components, click **Next**.

9.  On the Installation Folder window, click Next to accept the default location.

    For example, the default location is C:\\alfresco-one-platform.

    Alternatively, click the ![](../images/installlocation-icon.png) icon to choose another location.

    **Important:** There is a known problem related to the use of virtual Windows drives and permission restrictions on the C drive in Windows. If you select a virtual Windows drive, and you have selected additional components in step 6, you might receive an error message during installation:

    ```
    09160000 An IO error was encountered during deployment of the AMP into the WAR
    ```

    The installation will complete, but additional components will not be added to the installation. The error does not occur if the virtual drive is associated with a folder that is not on the C drive \(that is, any other physical or virtual hard disk on the Windows machine\). You have two options:

    -   Do not use the SUBST command for folders on the C drive \(in other words, use SUBST on other drives instead\)
    -   Use a Virtual Hard Disk \(VHD\), which behaves like a physical disk, in place of the virtual Windows drive for the install. For guidance, see [Create and use a Virtual Hard Disk](http://technet.microsoft.com/en-us/magazine/ee872416.aspx).
10. On the Database Server Parameters window, enter a port number for your database.

    Enter a suitable port number or click **Next** to accept the default of 5432.

11. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    1.  Web Server Domain

        For example, the default is 127.0.0.1.

        The URL [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share) is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco Content Services is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where the installation is, you need to define and create a publicly addressable name.

    2.  Tomcat Server Port

        For example, the default is 8080.

    3.  Tomcat Shutdown Port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

12. \(Optional\) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

13. If you are connecting to a remote Solr server, the Remote Solr configuration window displays. Enter the Solr host and SSL port number to connect to.

14. On the Sharded Solr installation window, specify if you are using a sharded Solr installation, and then click **Next**.

    **Important:** When using the installer, the templates used to create shards do not use the port specified in the installer. To set the port manually when creating a shard, see [Installing and configuring Solr shards](install-solr-shards.md#port).

15. On the FTP Port window, enter a port number for the FTP server, and then click **Next**.

16. On the RMI Port window, enter a port number to execute remote commands to, and then click **Next**.

17. On the Admin Password window, type a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco administrator user account \(admin\).

    CAUTION:

    You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password \(to include non-ASCII characters\) after installation, see [Changing a user's password](admintools-user-password.md).

18. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

19. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

20. On the Completing the Alfresco Content Services Platform Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch platform. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco Content Services at this point, deselect the Launch option.

    **Important:** If you are installing the S3 Connector as part of your installation, deselect the Launch option. You must not start Alfresco Content Services before applying the S3 AMP file.

21. Click **OK** to close the Readme.

    The server starts and then platform launches in your default browser.

    The browser page that is displayed gives you links to resources such as the online documentation, WebDav, WebScripts, the Admin Console, Alfresco Support, and CMIS 1.0 and 1.1 documentation.

    **Important:** It can take several minutes to start the server and to launch the page. Your browser opens and tries to connect to [http://127.0.0.1:8080/alfresco](http://127.0.0.1:8080/alfresco).

22. To access resources such as the Admin Console, log on as the `admin` user. Enter the password that you specified in the Admin Password window.

    The server is launched as a Windows service. If you did not automatically launch Alfresco Content Services at the end of the installation wizard, to start now, you need to start all the services. From the **Start** menu, select **All Programs \> Alfresco One Platform \> Alfresco One Platform Service \> Start Alfresco One Platform service**, or from a command prompt, navigate to the installation directory \(C:/alfresco-one-platform\) and run `servicerun START` as an administrator.

23. To fully stop Alfresco Content Services, you must stop all the services. Use the platform options \(see the previous step\) to manage the services, or use the scripts in the installation directory to start or stop the services: servicerun START and servicerun STOP. You need administrator rights to run these commands.


**Parent topic:**[Using the installers on Windows](../concepts/installs-win-intro.md)

