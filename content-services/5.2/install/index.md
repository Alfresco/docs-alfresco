---
title: Installing Alfresco Content Services
---

This information helps you install Alfresco Content Services, additional software, and modules. The products have different installers, so you should be aware of what installers are shipped with your product.

Alfresco Content Services ships with three installers:

-   Alfresco Content Services Installer: this is appropriate for the majority of users, and installs everything you require to run Alfresco Content Services. It corresponds to the installer used in previous versions.
-   Alfresco Content Services Platform Installer: this installs the repository, all required third party components (for example, ImageMagick), and links to a variety of developer and admin resources. If you have a clustered environment, you might want to use the Platform installer across these servers.
-   Alfresco Share Share Installer: this installs Alfresco Share only, with its own Tomcat instance and the Share Services AMP. You might want to use the Share installer to connect to one or more repositories (that you have installed using the Platform installer).

    > **Note:** Use the Alfresco Share installer to connect to a repository that you installed using the Platform installer only. Other setups are not supported.

Depending on your system, you can install Alfresco Content Services using one of the following methods:

-   Using a setup wizard, which contains the required software and components you need for evaluating Alfresco
-   Using a standard WAR file to deploy in a production environment

-   **[Install guide](#install-guide)**  
You can install Alfresco Content Services as a single instance and also in a distributed and clustered environment.
-   **[Installing using setup wizards](#installing-using-setup-wizards)**  
Use these methods to install Alfresco Content Services using the setup wizards.
-   **[Installing manually](#installing-manually)**  
Use this information to manually install Alfresco Content Services.
-   **[Testing the installation](#testing-the-installation)**  
Installation testing checks that Alfresco Content Services is successfully installed and it is working as expected after installation.
-   **[Uninstalling Alfresco Content Services](#uninstalling-alfresco-content-services)**  
Use this information to uninstall Alfresco Content Services, or any AMP files.
-   **[Installing integrations](#installing-integrations)**  
Use this information to install any components or modules that integrate Alfresco Content Services to other applications.

## Install guide

You can install Alfresco Content Services as a single instance and also in a distributed and clustered environment.

This guide provides you with simple instructions on how to download and install the Alfresco Content Services installer.

It is designed for users who just need a checklist to follow. For detailed step-by-step installation instructions, and more complex options, see [Installing]({% link content-services/5.2/install/index.md %}#installing).

-   **[Installing as a single instance](#installing-as-a-single-instance)**  
Follow these steps to install a single instance of Alfresco Content Services.
-   **[Installing in a distributed environment](#installing-in-a-distributed-environment)**  
Use these steps for installing Alfresco Content Services in a distributed environment.

### Installing as a single instance

Follow these steps to install a single instance of Alfresco Content Services.

The main stages involved in setting up and configuring Alfresco Content Services are shown in the diagram. These include preparing your system for installation, installing as an out-of-box application, configuring it based on your requirements, and finally, testing and getting familiar with Alfresco Content Services.

Each of these main stages consist of sub-steps, as shown in the diagram, which shows the sub-steps that need to be performed in order to complete each main stage.

> **Note:** Note that the steps shown in the diagrams have a color code. For example, Preparing for install stage consists of four sub-steps, namely, Software requirements, Language support, Validate the architecture, and Validate the environment.

To get started quickly with installing a single instance, follow the process shown. Click on each step to learn more about it.

![]({% link content-services/images/singleinstall.png %})

### Installing in a distributed environment

Use these steps for installing Alfresco Content Services in a distributed environment.

The main stages involved in installing Alfresco Content Services in a cluster are shown in the diagram. You must install and configure your data on a single node first and then on the second node, and so on.

The main steps involved in the installing process include preparing your system for installation, [installing on a single node](#installing-as-a-single-instance), installing on node 2, and finally, testing and getting familiar with Alfresco Content Services. Repeat the last two steps on all the other nodes in your system in series.

If you do not need Alfresco Share on each instance in your cluster, you can use the Platform Installer instead of the Alfresco Content Services Installer. See [Installing on Linux using the Platform Installer](#installing-on-linux-using-the-platform-installer) and [Installing on Windows using the Platform installer](#installing-on-windows-using-the-platform-installer) for more information.

Each of these main stages consist of sub-steps, as shown in the diagram, which displays the sub-steps that need to be performed in order to complete each main stage.

> **Note:** Note that the steps shown in the diagrams have a colour code. For example, Preparing for install stage consists of five sub-steps, namely, Software requirements, Language support, Validate the architecture, Validate the environment, and Recommended distribution.

> **Note:** Make sure you do not install and configure all the nodes in parallel. Follow in the installation process in series for all the nodes in your system.

To get started quickly with installing in a distributed environment, follow the process shown.

Click on each task to learn more about it.

![]({% link content-services/images/disinstall.png %})

-   **[Cluster-specific configuration](#cluster-specific-configuration)**  
If you have a distributed environment and want to implement clustering to improve the availability and performance of various services, you should enable clustering. This information describes the cluster-specific configurations for Alfresco Content Services.

#### Cluster-specific configuration

If you have a distributed environment and want to implement clustering to improve the availability and performance of various services, you should enable clustering. This information describes the cluster-specific configurations for Alfresco Content Services.

Note that this is an optional step. For more information about how to set up a clustered environment, see [Setting up clustering]({% link content-services/5.2/admin/cluster.md %}#setting-up-clustering).


![]({% link content-services/images/hr.png %})


## Installing using setup wizards

Use these methods to install Alfresco Content Services using the setup wizards.

-   **[Using the installers on Linux](#using-the-installers-on-linux)**  
Use this information to install Alfresco Content Services on Linux, using the Alfresco Content Services, Alfresco Content Services Platform, and Alfresco Share installers.
-   **[Using the installers on Windows](#using-the-installers-on-windows)**  
Use this information to install Alfresco Content Services on Windows, using the Alfresco Content Services, Alfresco Content Services Platform, and Alfresco Share installers.
-   **[Installing in an unattended mode](#installing-in-an-unattended-mode)**  
Alfresco Content Services distributes binary all-in-one installers which include a setup wizard built with Bitrock technology. You can automate the installation process by running the installers in an unattended mode.
-   **[Securing Alfresco Content Services components](#securing-alfresco-content-services-components)**  
After you have installed Alfresco Content Services 5.2.7, consider these best practices to secure the Tomcat web server, PostgreSQL database, and LibreOffice.

### Using the installers on Linux

Use this information to install Alfresco Content Services on Linux, using the Alfresco Content Services, Alfresco Content Services Platform, and Alfresco Share installers.

-   **[Installing on Linux using the Alfresco Content Services Installer](#installing-on-linux-using-the-alfresco-content-services-installer)**  
The setup wizard for Linux installs all the software and components that you require for running Alfresco Content Services. This setup wizard installs Alfresco Content Services and additional software, including a Tomcat application server, PostgreSQL database, JRE, and LibreOffice.
-   **[Installing on Linux using the Platform Installer](#installing-on-linux-using-the-platform-installer)**  
The Alfresco Content Services Platform Installer for Linux installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other required software like ImageMagick. It does not install Alfresco Share.
-   **[Installing on Linux using the Alfresco Share Installer](#installing-on-linux-using-the-alfresco-share-installer)**  
The Alfresco Share Installer for Linux installs only Alfresco Share, with its own Tomcat application server and the Share Services AMP.


#### Installing on Linux using the Alfresco Content Services Installer

The setup wizard for Linux installs all the software and components that you require for running Alfresco Content Services. This setup wizard installs Alfresco Content Services and additional software, including a Tomcat application server, PostgreSQL database, JRE, and LibreOffice.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

1.  Download the installation file: alfresco-content-services-installer-5.2.7-linux-x64.bin

    Files are available from the [Support Portal](http://support.alfresco.com/).

    This setup wizard is for 64-bit Linux systems.

2.  Execute the downloaded file using the following commands:

    ```
    chmod 777 alfresco-content-services-installer-5.2.7-linux-x64.bin 
    ./alfresco-content-services-installer-5.2.7-linux-x64.bin
    ```

    > **Note:** You should avoid running applications as the root (Linux administrator) user where possible, however if you must install as the root user, then run the alfresco-content-services-installer-5.2.7-linux-x64.bin file with `sudo` specified:

    ```
    chmod 777 alfresco-content-services-installer-5.2.7-linux-x64.bin 
    sudo ./alfresco-content-services-installer-5.2.7-linux-x64.bin
    ```

    The setup wizard starts.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

    |**Easy**|Easy type installs using the default options and configuration. This install type requires you to enter information in only two fields: the install location and the administrator password. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed Alfresco Content Services and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, we recommend that you use the **Easy** installation option. However, if you want to connect to an existing database server and also want to see how the various components are being configured, use the **Advanced** installation option.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

        > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

    3.  On the Admin Password window, enter a password for the Administrator user (`admin`).

        CAUTION:

        You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the Completing the Setup Wizard window and launching Alfresco Share.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

7.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    -   Java (this is JRE only)
    -   PostgreSQL
    -   LibreOffice
    -   Alfresco Content Services
    -   Solr1

        > **Important:** The Solr 1 option should be used only for migration to Solr 4.

    -   Solr 4
    -   Alfresco Office Services
    -   Web Quick Start
    -   Google Docs Integration
8.  When you have finished selecting the components, click **Next**.

9.  On the Installation Folder window, click Next to accept the default location.

    For example, the default location is /opt/alfresco-one.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

    > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

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

12. (Optional) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

13. If you are connecting to a remote Solr server, the Remote Solr configuration window displays. Enter the Solr host and SSL port number to connect to Alfresco Content Services.

14. On the Sharded Solr installation window, specify if you are using a sharded Solr installation, and then click **Next**.

    > **Important:** When using the installer, the templates used to create shards do not use the port specified in the installer. To set the port manually when creating a shard, see [Installing and configuring Solr shards]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr-shards).

15. On the FTP Port window, enter a port number for the FTP server, and then click **Next**.

16. On the RMI Port window, enter a port number for to execute remote commands, and then click **Next**.

17. On the Admin Password window, type a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco administrator user account (admin).

    CAUTION:

    You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

18. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

19. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

20. On the Completing the Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Content Services. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco Content Services at this point, deselect the Launch option.

    > **Important:** If you are installing the S3 Connector as part of your installation, deselect the **Launch Alfresco Content Services** check box. You must not start Alfresco before applying the S3 AMP file.

21. Click **OK** to close the Readme.

    The server starts and then Alfresco Share launches in your default browser.

    > **Important:** It can take several minutes to start the server and to launch Alfresco Share. Your browser opens and tries to connect to [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share).

22. Log on as the `admin` user. Enter the password that you specified in the Admin Password window.

    The server is launched automatically as a service called `alfresco`. This service comprises the following individual services:

    -   `postgresql`
    -   `Tomcat Server`
    If you did not automatically start Alfresco Content Services at the end of the setup wizard, to start now you need to start all the services.

23. Manually start the server:

    Browse to `/opt/alfresco-one/` (the installation folder that you created in [9]({% link content-services/5.2/admin/audit.md %}#installing-on-linux-using-the-alfresco-content-services-installer)). As an administrator, run

    ```
    ./alfresco.sh start
    ```

24. To fully stop Alfresco Content Services, you must stop all the services:

    Browse to `/opt/alfresco-one/` (the installation folder that you created in [9](#installing-on-linux-using-the-alfresco-content-services-installer)). As an administrator, run

    ```
    ./alfresco.sh stop
    ```


-   **[Installing Linux libraries manually](#installing-linux-libraries-manually)**  
Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and Red Hat.

##### Installing Linux libraries manually

Use this information to install Linux libraries manually on supported Linux distributions, such as Ubuntu, SUSE and Red Hat.

LibreOffice requires the following libraries to be installed on your system:

-   libfontconfig
-   libICE
-   libSM
-   libXrender
-   libXext
-   libXinerama
-   libcups
-   libGLU
-   libcairo2
-   libgl1-mesa-glx

On some Linux distributions, such as Ubuntu, SUSE, and Red Hat, the setup wizard will validate whether or not the required libraries are present. If the required libraries are missing, you will get a warning message. You can install them using your package manager from the command line. Also, the Linux libraries file names may vary by distribution.

If LibreOffice does not start up normally with Alfresco Content Services, test manually; for example, by running this startup script:

```bash
start ex.  
{installdir}/libreoffice/scripts/libreoffice_ctl.sh start 
status ex. {installdir} 
/libreoffice/scripts/libreoffice_ctl.sh status
```

If you receive errors that indicate that a library missing, work with your system administrator to add the missing library or its equivalent from your configured repositories.


#### Installing on Linux using the Platform Installer

The Alfresco Content Services Platform Installer for Linux installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other required software like ImageMagick. It does not install Alfresco Share.

> **Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Linux using the Alfresco Content Services Installer](#installing-on-linux-using-the-alfresco-content-services-installer) for more information. Use the Platform Installer only if you have a specific requirement for it.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

1.  Download the following installation file:

    alfresco-content-services-platform-installer-5.2.7-linux-x64.bin

    Files are available from the [Support Portal](http://support.alfresco.com/).

    This setup wizard is for 64-bit Linux systems.

2.  Execute the downloaded file using the following commands:

    ```
    chmod 777 alfresco-content-services-platform-installer-5.2.7-linux-x64.bin 
    ./alfresco-content-services-platform-installer-5.2.7-linux-x64.bin
    ```

    > **Note:** You should avoid running applications as the root (Linux administrator) user where possible, however if you must install as the root user, then run the alfresco-content-services-platform-installer-5.2.7-linux-x64.bin file with `sudo` specified:

    ```
    chmod 777 alfresco-content-services-platform-installer-5.2.7-linux-x64.bin 
    sudo ./alfresco-content-services-platform-installer-5.2.7-linux-x64.bin
    ```

    The setup wizard starts.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup - Platform window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

    |**Easy**|Easy type installs using the default options and configuration. This install type requires you to enter information in only two fields: the install location and the administrator password. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed Alfresco Content Services and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, we recommend that you use the **Easy** installation option. However, if you want to connect to an existing database server and also want to see how the various components are being configured, use the **Advanced** installation option.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

        > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

    3.  On the Admin Password window, enter a password for the Administrator user (`admin`).

        CAUTION:

        You must use ASCII characters only when setting the password using the Alfresco setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the Completing the Platform Setup Wizard window and launching the Alfresco Content Services platform.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

7.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    -   Java (this is JRE only)
    -   PostgreSQL
    -   LibreOffice
    -   Alfresco Content Services
    -   Solr 4
    -   Alfresco Office Services
8.  When you have finished selecting the components, click **Next**.

9.  On the Installation Folder window, click Next to accept the default location.

    For example, the default location is /opt/alfresco-one-platform.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

    > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

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

12. (Optional) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

13. If you are connecting to a remote Solr server, the Remote Solr configuration window displays. Enter the Solr host and SSL port number to connect to.

14. On the Sharded Solr installation window, specify if you are using a sharded Solr installation, and then click **Next**.

    > **Important:** When using the installer, the templates used to create shards do not use the port specified in the installer. To set the port manually when creating a shard, see [Installing and configuring Solr shards]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr-shards).

15. On the FTP Port window, enter a port number for the FTP server, and then click **Next**.

16. On the RMI Port window, enter a port number to execute remote commands to, and then click **Next**.

17. On the Admin Password window, type a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco administrator user account (admin).

    CAUTION:

    You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

18. On the Service Startup Configuration window, select whether you want the service to start up manually or automatically.

19. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

20. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

21. On the Completing the Platform Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch the platform. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco Content Services at this point, deselect the Launch option.

    > **Important:** If you are installing the S3 Connector as part of your installation, deselect the Launch option. You must not start Alfresco Content Services before applying the S3 AMP file.

22. Click **OK** to close the Readme.

    The server starts and then the platform launches in your default browser.

    The browser page that is displayed gives you links to resources such as the online documentation, WebDav, WebScripts, the Admin Console, Alfresco Support, and CMIS 1.0 and 1.1 documentation.

    > **Important:** It can take several minutes to start the server and to launch the page. Your browser opens and tries to connect to [http://127.0.0.1:8080/alfresco](http://127.0.0.1:8080/alfresco).

    The server is launched automatically as a service called `alfresco`. This service comprises the following individual services:

    -   `postgresql`
    -   `Tomcat Server`
23. To access resources such as the Admin Console, log on as the `admin` user. Enter the password that you specified in the Admin Password window.

    If you did not automatically launch Alfresco Content Services at the end of the setup wizard, to start now you need to start all the services.

24. Manually start the server:

    Browse to `/opt/alfresco-one-platform/` (the installation folder that you created in [9](#installing-on-linux-using-the-platform-installer)). As an administrator, run

    ```
    ./alfresco.sh start
    ```

25. To fully stop Alfresco Content Services, you must stop all the services:

    Browse to `/opt/alfresco-one-platform/` (the installation folder that you created in [9](#installing-on-linux-using-the-platform-installer)). As an administrator, run

    ```
    ./alfresco.sh stop
    ```



#### Installing on Linux using the Alfresco Share Installer

The Alfresco Share Installer for Linux installs only Alfresco Share, with its own Tomcat application server and the Share Services AMP.

> **Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Linux using the Alfresco Content Services Installer](#installing-on-linux-using-the-alfresco-content-services-installer) for more information. Use the Alfresco Share Installer only if you have a specific requirement for it; for example, if you are linking to an repository on a different server, that has been installed using the Alfresco Content Services Platform Installer.

1.  Download the following installation file:

    alfresco-content-services-share-installer-5.2.7-linux-x64.bin

    Files are available from the [Support Portal](http://support.alfresco.com/).

    This setup wizard is for 64-bit Linux systems.

2.  Execute the downloaded file using the following commands:

    ```
    chmod 777 alfresco-content-services-share-installer-5.2.7-linux-x64.bin 
    ./alfresco-content-services-share-installer-5.2.7-linux-x64.bin
    ```

    > **Note:** Avoid running applications as the root (Linux administrator) user where possible, however if you must install as the root user, then run the alfresco-content-services-share-installer-5.2.7-linux-x64.bin file with `sudo` specified:

    ```
    chmod 777 alfresco-content-services-share-installer-5.2.7-linux-x64.bin 
    sudo ./alfresco-content-services-share-installer-5.2.7-linux-x64.bin
    ```

    The setup wizard starts.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup - Alfresco Share window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

    |**Easy**|Easy type installs Share using the default options and configuration. This install type requires you to enter locations for where you want to install, and which repository you want to connect to. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but asks you to specify the components that you want to install, and the Tomcat configuration parameters that you require.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. The Installer provides a Tomcat server to run Share, so if you have your repository on the same machine as your Share installation, you must use the Advanced setup, so that you can specify alternative Tomcat ports for the Tomcat server.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

        > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

    3.  On the Connect to the repository window, enter the location of your repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

7.  On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

8.  On the Completing the Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Content Services. By default, these options are selected and will launch when you click **Finish**. If you do not want to start at this point, deselect the Launch option.

9.  Click **Finish** to complete the installation.

10. To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

11. On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    Java is the only option available to select or deselect.

12. When you have finished selecting the components, click **Next**.

13. On the Installation Folder window, click Next to accept the default location.

    For example, the default location is /opt/alfresco-one-share.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

    > **Note:** You must use ASCII characters only when setting the installation folder using the setup wizard.

14. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    > **Note:** The Alfresco Share Installer provides its own Tomcat server to run Share, so if you have your repository on the same machine as your Share installation, you must specify alternative Tomcat ports for the Tomcat server.

    1.  Web Server Domain

        For example, the default is 127.0.0.1

        The URL http://127.0.0.1:8080/share is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco Content Services is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where the installation is, you need to define and create a publicly addressable name.

    2.  Tomcat port

        For example, the default is 8080.

    3.  Tomcat Shutdown port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

15. On the Connect to the repository window, enter the location of your repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

16. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

17. On the Completing the Setup Wizard window, deselect the Launch option, and click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Share. By default, these options are selected and will launch when you click **Finish**. We recommend that you do not launch yet, because you need to complete the next steps before starting your servers.

18. Click **OK** to close the Readme.

19. Link your Share instance to a repository, by applying the Share Services AMP to your chosen platform instance.

    > **Important:** If you do not apply the Share Services AMP to the repository, Share will not work correctly, and when you start up Share, you will see the message:

    ```
    Alfresco is running without Share Services.  See your System Administrator for more details.
    ```

    1.  Navigate to the alfresco-one-share/amps directory, and locate the alfresco-share-services.amp file.

    2.  Copy the alfresco-share-services.amp file to your instance (alfresco-one-platform/amps), on the machine that hosts your platform repository.

    3.  Use the guidance in [Installing an Alfresco Module Package](#installing-an-alfresco-module-package) to apply the AMP to your repository.

    4.  Restart the platform instance where you have installed the Share Services AMP to see that the changes have been applied.

20. Manually start your Tomcat server for the instance that you have just installed with the Installer:

    From the alfresco-one-share installation directory: `service alfresco start`

21. Log on to Share (http://localhost:port/share) as the `admin` user. Enter the password that you specified in the Admin Password window.

22. Check for error messages as you open Share.

    Use the information in [Troubleshooting the installation](#troubleshooting-the-installation) to help you.

    If you need to change any settings after installation, these are stored in the `share-config-custom.xml` file. See [Configuring Share with the share-config-custom.xml file]({% link content-services/5.2/develop/share-ext-points/share-config.md %}) for more information.

23. To fully stop Alfresco Content Services, you must stop all the services:

    ```bash
    service alfresco stop
    ```

### Using the installers on Windows

Use this information to install Alfresco Content Services on Windows, using the Alfresco Content Services, Alfresco Content Services Platform, and Alfresco Share installers.

-   **[Installing on Windows using the Alfresco Content Services installer](#installing-on-windows-using-the-alfresco-content-services-installer)**  
The setup wizard for Microsoft Windows installs all the software and components that you require for running Alfresco Content Services. This setup wizard installs Alfresco Content Services and additional software, including a Tomcat application server, PostgreSQL database, JRE, and LibreOffice.
-   **[Installing on Windows using the Platform installer](#installing-on-windows-using-the-platform-installer)**  
The Alfresco Content Services Platform Installer for Windows installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other required software like ImageMagick. It does not install Alfresco Share.
-   **[Installing on Windows using the Alfresco Share Installer](#installing-on-windows-using-the-alfresco-share-installer)**  
The Alfresco Share Installer for Windows installs only Alfresco Share, with its own Tomcat application server and the Share Services AMP.

#### Installing on Windows using the Alfresco Content Services installer

The setup wizard for Microsoft Windows installs all the software and components that you require for running Alfresco Content Services. This setup wizard installs Alfresco Content Services and additional software, including a Tomcat application server, PostgreSQL database, JRE, and LibreOffice.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

1.  Download the following installation file:

    alfresco-content-services-installer-5.2.7-win-x64.exe

    Files are available from the [Support Portal](http://support.alfresco.com/).

    The setup wizard is for 64-bit Windows systems.

2.  Double-click the downloaded file.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

**|Easy type installs using the default options and configuration. This install type requires only two fields: install location and administrator password. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed Alfresco Content Services and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, we recommend that you use the **Easy** installation option. However, if you want to connect to an existing database server and also, want to see how the various components are being configured, use the **Advanced** installation option.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

    3.  On the Admin Password window, enter a password for the Administrator user (`admin`).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the Completing the Setup Wizard window and launching Alfresco Share.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

7.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    -   Java (this is JRE only)
    -   PostgreSQL
    -   LibreOffice
    -   Alfresco Content Services
    -   Solr1

        > **Important:** The Solr 1 option should be used only for migration to Solr 4.

    -   Solr 4
    -   Alfresco Office Services
    -   Web Quick Start
    -   Google Docs Integration
8.  When you have finished selecting the components, click **Next**.

9.  On the Installation Folder window, click Next to accept the default location.

    For example, the default location is C:\alfresco-content-services.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

    > **Important:** There is a known problem related to the use of virtual Windows drives and permission restrictions on the C drive in Windows. If you select a virtual Windows drive, and you have selected additional components in step 6, you might receive an error message during installation:

    ```
    09160000 An IO error was encountered during deployment of the AMP into the WAR
    ```

    The installation will complete, but additional components will not be added to the installation. The error does not occur if the virtual drive is associated with a folder that is not on the C drive (that is, any other physical or virtual hard disk on the Windows machine). You have two options:

    -   Do not use the SUBST command for folders on the C drive (in other words, use SUBST on other drives instead)
    -   Use a Virtual Hard Disk (VHD), which behaves like a physical disk, in place of the virtual Windows drive for the install. For guidance, see [Create and use a Virtual Hard Disk](http://technet.microsoft.com/en-us/magazine/ee872416.aspx).
10. On the Database Server Parameters window, enter a port number for your database.

    Enter a suitable port number or click **Next** to accept the default of 5432.

11. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters, and then click **Next**.

    1.  Enter the Web Server domain number.

        For example, the default is 127.0.0.1.

        The URL [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share) is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco Content Services is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where the installation is, you need to define and create a publicly addressable name.

    2.  Enter the port number for the Tomcat web application.

        For example, the default is 8080.

    3.  Enter the Tomcat Shutdown port number.

        For example, the default is 8005.

    4.  Enter the Tomcat SSL port number.

        For example, the default is 8443.

    5.  Enter the Tomcat AJP Port number.

        For example, the default is 8009.

12. (Optional) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

13. If you are connecting to a remote Solr server, the Remote Solr configuration window displays. Enter the Solr host and SSL port number to connect to Alfresco Content Services.

14. On the Sharded Solr installation window, specify if you are using a sharded Solr installation, and then click **Next**.

    > **Important:** When using the installer, the templates used to create shards do not use the port specified in the installer. To set the port manually when creating a shard, see [Installing and configuring Solr shards]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr-shards).

15. On the FTP Port window, enter a port number for the FTP server, and then click **Next**.

16. On the RMI Port window, enter a port number for the RMI service, and then click **Next**.

17. On the Admin Password window, enter a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco administrator user account (admin).

    CAUTION:

    You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

18. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

19. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

20. On the Completing the Alfresco Content Services Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Content Services. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco Content Services at this point, deselect the Launch option.

    > **Important:** If you are installing the S3 Connector as part of your installation, deselect the **Launch Alfresco Content Services** check box. You must not start Alfresco before applying the S3 AMP file.

21. Click **OK** to close the Readme.

    The server starts and then Alfresco Share launches in your default browser.

    > **Important:** It can take several minutes to start the server and to launch Alfresco Share. Your browser opens and tries to connect to [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share).

22. Log on as the `admin` user. Enter the password that you specified in the Admin Password window.

    The server is launched as a Windows service. To manage the server, open the Control Panel Services window. The services that will be running for an install using the default options are:

    -   `alfrescoPostgreSQL`
    -   `alfrescoTomcat`
    If you did not automatically start Alfresco Content Services at the end of the setup wizard, to start now you need to start all the services. Use the servicerun start script in the installation directory or select **All Programs > Alfresco One > Alfresco One Service > Start Alfresco One Service**.

23. To fully stop Alfresco Content Services, you must stop all the services. Use the servicerun stop script in the installation directory or select **All Programs > Alfresco One > Alfresco One Service > Stop Alfresco One Service**.



#### Installing on Windows using the Platform installer

The Alfresco Content Services Platform Installer for Windows installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other required software like ImageMagick. It does not install Alfresco Share.

> **Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Windows using the Alfresco Content Services installer](#installing-on-windows-using-the-alfresco-content-services-installer) for more information. Use the Platform Installer only if you have a specific requirement for it.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

1.  Download the following installation file:

    alfresco-content-services-platform-installer-5.2.7-win-x64.exe

    Files are available from the [Support Portal](http://support.alfresco.com/).

    The setup wizard is for 64-bit Windows systems.

2.  Double-click the downloaded file.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup - Platform window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

    |**Easy**|Easy type installs using the default options and configuration. This install type requires you to enter information in only two fields: the install location and the administrator password. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed Alfresco Content Services and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. If you are installing on a demo system for evaluation purpose only, we recommend that you use the **Easy** installation option. However, if you want to connect to an existing database server and also, want to see how the various components are being configured, use the **Advanced** installation option.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

    3.  On the Admin Password window, enter a password for the Administrator user (`admin`).

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the Completing the Platform Setup Wizard window and launching Alfresco Content Services.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

7.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    -   Java (this is JRE only)
    -   PostgreSQL
    -   LibreOffice
    -   Alfresco Content Services Platform
    -   Solr 4
    -   Alfresco Office Services
8.  When you have finished selecting the components, click **Next**.

9.  On the Installation Folder window, click Next to accept the default location.

    For example, the default location is C:\alfresco-one-platform.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

    > **Important:** There is a known problem related to the use of virtual Windows drives and permission restrictions on the C drive in Windows. If you select a virtual Windows drive, and you have selected additional components in step 6, you might receive an error message during installation:

    ```
    09160000 An IO error was encountered during deployment of the AMP into the WAR
    ```

    The installation will complete, but additional components will not be added to the installation. The error does not occur if the virtual drive is associated with a folder that is not on the C drive (that is, any other physical or virtual hard disk on the Windows machine). You have two options:

    -   Do not use the SUBST command for folders on the C drive (in other words, use SUBST on other drives instead)
    -   Use a Virtual Hard Disk (VHD), which behaves like a physical disk, in place of the virtual Windows drive for the install. For guidance, see [Create and use a Virtual Hard Disk](http://technet.microsoft.com/en-us/magazine/ee872416.aspx).
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

12. (Optional) If you are installing the LibreOffice component, the LibreOffice Server Port window displays. Enter a port number on which the LibreOffice server will listen.

13. If you are connecting to a remote Solr server, the Remote Solr configuration window displays. Enter the Solr host and SSL port number to connect to.

14. On the Sharded Solr installation window, specify if you are using a sharded Solr installation, and then click **Next**.

    > **Important:** When using the installer, the templates used to create shards do not use the port specified in the installer. To set the port manually when creating a shard, see [Installing and configuring Solr shards]({% link content-services/5.2/admin/search.md %}#installing-and-configuring-solr-shards).

15. On the FTP Port window, enter a port number for the FTP server, and then click **Next**.

16. On the RMI Port window, enter a port number to execute remote commands to, and then click **Next**.

17. On the Admin Password window, type a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco administrator user account (admin).

    CAUTION:

    You must use ASCII characters only when setting the password using the setup wizard. If you need to reset the password (to include non-ASCII characters) after installation, see [Changing a user's password]({% link content-services/5.2/admin/users-groups.md %}#changing-a-user's-password).

18. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

19. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

20. On the Completing the Alfresco Content Services Platform Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch platform. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco Content Services at this point, deselect the Launch option.

    > **Important:** If you are installing the S3 Connector as part of your installation, deselect the Launch option. You must not start Alfresco Content Services before applying the S3 AMP file.

21. Click **OK** to close the Readme.

    The server starts and then platform launches in your default browser.

    The browser page that is displayed gives you links to resources such as the online documentation, WebDav, WebScripts, the Admin Console, Alfresco Support, and CMIS 1.0 and 1.1 documentation.

    > **Important:** It can take several minutes to start the server and to launch the page. Your browser opens and tries to connect to [http://127.0.0.1:8080/alfresco](http://127.0.0.1:8080/alfresco).

22. To access resources such as the Admin Console, log on as the `admin` user. Enter the password that you specified in the Admin Password window.

    The server is launched as a Windows service. If you did not automatically launch Alfresco Content Services at the end of the installation wizard, to start now, you need to start all the services. From the **Start** menu, select **All Programs > Alfresco One Platform > Alfresco One Platform Service > Start Alfresco One Platform service**, or from a command prompt, navigate to the installation directory (C:/alfresco-one-platform) and run `servicerun START` as an administrator.

23. To fully stop Alfresco Content Services, you must stop all the services. Use the platform options (see the previous step) to manage the services, or use the scripts in the installation directory to start or stop the services: servicerun START and servicerun STOP. You need administrator rights to run these commands.



#### Installing on Windows using the Alfresco Share Installer

The Alfresco Share Installer for Windows installs only Alfresco Share, with its own Tomcat application server and the Share Services AMP.

> **Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Windows using the Alfresco Content Services installer](#installing-on-windows-using-the-alfresco-content-services-installer) for more information. Use the Alfresco Share Installer only if you have a specific requirement for it; for example, if you are linking to an repository on a different server, that has been installed using the Alfresco Content ServicesPlatform Installer.

1.  Download the following installation file:

    alfresco-content-services-share-installer-5.2.7-win-x64.exe

    Files are available from the [Support Portal](http://support.alfresco.com/).

    The setup wizard is for 64-bit Windows systems.

2.  Double-click the downloaded file.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    > **Note:** This doesn't set the language that's used in Alfresco Content Services.

4.  On the Setup - Alfresco Share window, click **Next**.

5.  Read and accept the license agreement.

6.  On the Installation type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

    |**Easy**|Easy type installs Share using the default options and configuration. This install type requires you to enter locations for where you want to install, and which repository you want to connect to. Choose this route to install with the default environment.<br><br>**Note:** If you have previously installed and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.|
    |**Advanced**|Advanced type installs but asks you to specify the components that you want to install, and the Tomcat configuration parameters that you require.|

    > **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. The Installer provides a Tomcat server to run Share, so if you have your Alfresco repository on the same machine as your Share installation, you must use the Advanced setup, so that you can specify alternative Tomcat ports for the Tomcat server.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

    3.  Click **Next** through the remaining windows in the setup wizard.

    4.  On the Connect to the repository window, enter the location of your repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

7.  On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

8.  On the Completing the Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Content Services. By default, these options are selected and will launch when you click **Finish**. If you do not want to start at this point, deselect the Launch option.

9.  Click **Finish** to complete the installation.

10. To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

11. On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    Java is the only option available to select or deselect.

12. When you have finished selecting the components, click **Next**.

13. On the Installation Folder window, click Next to accept the default location.

    For example, the default location is C:\alfresco-one-share.

    Alternatively, click the ![]({% link content-services/images/installlocation-icon.png %}) icon to choose another location.

14. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    > **Note:** The Alfresco Share Installer provides its own Tomcat server to run Share, so if you have your Alfresco repository on the same machine as your Share installation, you must specify alternative Tomcat ports for the Tomcat server.

    1.  Web Server Domain

        For example, the default is 127.0.0.1

        The URL http://127.0.0.1:8080/share is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco Content Services is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where the installation is, you need to define and create a publicly addressable name.

    2.  Tomcat port

        For example, the default is 8080.

    3.  Tomcat Shutdown port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

15. On the Connect to the repository window, enter the location of your repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

16. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

17. On the Warning window, review the list of environment notifications for your installation.

    This list of environment notifications is based on an evaluation of your installation environment while the setup wizard is running.

18. On the Completing the Setup Wizard window, deselect the Launch option, and click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Share. By default, these options are selected and will launch when you click **Finish**. We recommend that you do not launch yet, because you need to complete the next steps before starting your servers.

19. Click **OK** to close the Readme.

20. Link your Share instance to a repository, by applying the Share Services AMP to your chosen platform instance.

    > **Important:** If you do not apply the Share Services AMP to the repository, Share will not work correctly, and when you start up Share, you will see the message:

    ```
    Alfresco is running without Share Services.  See your System Administrator for more details.
    ```

    1.  Navigate to the alfresco-one-share/amps directory, and locate the alfresco-share-services.amp file.

    2.  Copy the alfresco-share-services.amp file to your instance (alfresco-one-platform/amps), on the machine that hosts your platform repository.

    3.  Use the guidance in [Installing an Alfresco Module Package](#installing-an-alfresco-module-package) to apply the AMP to your repository.

    4.  Restart the platform instance where you have installed the Share Services AMP to see that the changes have been applied.

21. Log on to Share (http://localhost:port/share) as the `admin` user. Enter the password that you specified in the Admin Password window.

    The server is launched as a Windows service. If you did not automatically launch Share at the end of the installation wizard, to start it you need to start all the services. From the **Start** menu, select **All Programs > Alfresco One Share > Alfresco One Share Service > Start Alfresco One Share service**, or from a command prompt, navigate to the installation directory (C:/alfresco-one-share) and run `servicerun START` as an administrator.

22. Check for error messages as you open Share.

    Use the information in [Troubleshooting the installation](#troubleshooting-the-installation) to help you.

    If you need to change any settings after installation, these are stored in the `share-config-custom.xml` file. See [Configuring Share with the share-config-custom.xml file]({% link content-services/5.2/develop/share-ext-points/share-config.md %}) for more information.

23. To fully stop Alfresco Content Services, you must stop all the services. Use the Share options (see the previous step) to manage the services, or use the scripts in the installation directory to start or stop the services: servicerun START and servicerun STOP. You need administrator rights to run these commands.



#### Installing in an unattended mode

Alfresco Content Services distributes binary all-in-one installers which include a setup wizard built with Bitrock technology. You can automate the installation process by running the installers in an unattended mode.

These installers contain all the dependencies that you need to quickly get Alfresco Content Services up and running. For example, the installers install and configure all the necessary software, such as Java, Apache Tomcat, a PostgreSQL database, LibreOffice, and ImageMagick. The resulting install is optimized for demonstration and initial evaluation. The installer configures Alfresco Content Services on Windows and Linux (if run as root) for easier startup.

> **Note:** There is no support for installing on the Mac platform in unattended mode.

To automate the installation process and customize it for your environment, you can run the install wizard in an **unattended mode** and provide an option file. The available options can be listed by calling the installer executable on the command line and passing it the `--help` flag. You can pass an option file called install_opts to the installer using a command, for example:

For Unix:

```bash
sudo ./alfresco-content-services-installer-5.2.7-linux-x64.bin --optionfile install_opts
```

For Windows:

```bash
alfresco-content-services-installer-5.2.7-win-x64.exe --optionfile install_opts
```

either as an administrator, or by clicking yes on User Account Control window that pops up.

This is an example option file, which installs most components, uses an external database, and does not install the start-up scripts:

```text
mode=unattended
enable-components=javaalfresco,alfrescowcmqs,libreofficecomponent
disable-components=postgres

# Use JDBC settings for an existing database
jdbc_url=jdbc:postgresql://localhost/alfresco
jdbc_driver=org.postgresql.Driver
jdbc_database=alfresco
jdbc_username=alfresco
jdbc_password=alfresco

# Install location
prefix=/opt/alfresco_51

alfresco_admin_password=admin

# Don't install init scripts
baseunixservice_install_as_service=0
```

The full list of options available are listed:

|Option|Information|
|------|-----------|
|`--help`|Displays the list of valid options|
|`--version`|Displays the product version and information|
|`--unattendedmodeui <option>`|Unattended Mode User Interface. Default is `none`. Options are `none`, `minimal`, `minimalWithDialogs`|
|`--optionfile <option>`|Installation option file|
|`--debuglevel <option>`|Debugging information. Default is `2`. Options are `0`, `1`, `2`, `3`, `4`.|
|`--mode <option>`|Installation mode. Default is `gtk`. Options are `gtk`, `xwindow`, `text`, `unattended`.|
|`--debugtrace <option>`|Debugging file name|
|`--enable-components <option>`|Comma-separated list of components. Default is `javaalfresco,postgres,alfrescosolr4,alfrescogoogledocs,libreofficecomponent` Options are `javaalfresco`, `postgres`, `alfrescosolr`, `alfrescosolr4`, `alfrescowcmqs`, `alfrescogoogledocs`, `libreofficecomponent`|
|`--disable-components <option>`|Comma-separated list of components. Default is `alfrescosolr,alfrescowcmqs` Options are `javaalfresco`, `postgres`, `alfrescosolr`, `alfrescosolr4`, `alfrescowcmqs`, `alfrescogoogledocs`, `libreofficecomponent`|
|`--installer-language <option>`|Language selection. Default is `en`. Options are `en`, `fr`, `es`, `it`, `de`, `ja`, `nl`, `ru`, `zh_CN`, `no`, `pt_BR`|
|`--prefix <option>`|Select a folder|
|`--jdbc_url <option>`|JDBC URL identifier. Default is `jdbc:postgresql://localhost/alfresco`|
|`--jdbc_driver <option>`|JDBC driver. Default is `org.postgresql.Driver`|
|`--jdbc_database <option>`|Database name. Default is `alfresco`|
|`--jdbc_username <option>`|User name|
|`--jdbc_password <option>`|Password|
|`--postgres_port <option>`|Database server port. Default is `5432`|
|`--tomcat_installation_type <option>`|Tomcat installation typeSetting `tomcat_installation_type=existing` prevents the tomcat binaries from being installed.

|
|`--tomcat_server_domain <option>`|Web server domain|
|`--tomcat_server_port <option>`|Tomcat server port. Default is `8080`|
|`--tomcat_server_shutdown_port <option>`|Tomcat shutdown port. Default is `8005`|
|`--tomcat_server_ssl_port <option>`|Tomcat SSL port. Default is `8443`|
|`--tomcat_server_ajp_port <option>`|Tomcat AJP port. Default is `8009`|
|`--libreoffice_port <option>`|LibreOffice server port. Default is `8100`|
|`--alfresco_ftp_port <option>`|FTP port. Default is `21`|
|`--alfresco_rmi_port <option>`|RMI port. default is `50500`|
|`--alfresco_admin_password <option>`|Admin password|
|`--baseunixservice_install_as_service <option>`|Option to install Alfresco Content Services as a service. Default is `1`|
|`--baseunixservice_script_name <option>`|Service script name. Default is `alfresco`|
|`--alfrescocustomstack_services_startup <option>`|Option to automatically start up Alfresco Content Services custom services. Default is `demand`. Options are `demand`, `auto`|

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).


### Securing Alfresco Content Services components

After you have installed Alfresco Content Services 5.2.7, consider these best practices to secure the Tomcat web server, PostgreSQL database, and LibreOffice.

These instructions:

-   Are for out-of-the-box Alfresco Content Services 5.2.7 installation using the installer.
-   Assume that you have installed Alfresco Content Services 5.2.7 in a folder called alfresco-content-services.
-   Are for Linux operating system (Ubuntu and Red Hat).

To secure the Tomcat server, PostgreSQL database, and LibreOffice, you will:

1.  Create a user to run the PostgreSQL database, with limited permissions to the alfresco-content-services/postgresql/ and alfresco-content-services/alf_data/postgresql/ folders. No other user(s) or group(s) should be allowed to write or execute code in these folders.
2.  Create two users, `tomcatusr` and `lofficeusr`, and add them to a group, `alfusrs`. The `tomcatusr` user will run the Tomcat web server and the `lofficeusr` user will run the LibreOffice process.
3.  Ensure that only `tomcatusr` is allowed to write in the important Alfresco folders.
4.  Make `lofficeusr` as the owner of the LibreOffice folder. This user will only be able to write in the /tomcat/temp folder because of the group ownership (`alfusrs`) over tomcat/temp and the setting of `setguid` feature on tomcat/temp.
5.  Start the LibreOffice process with the very limited `lofficeusr` by allowing the system to do a sudo from `tomcatusr` to `lofficeusr` without asking for a password.



#### Securing the PostgreSQL database

To secure your PostgreSQL database, follow these steps:

1.  Create a new limited user.

    ```bash
    $ adduser psqlusr
    ```

2.  To display all the groups (along with their uids) associated with `psqlusr` use:

    ```bash
    $ id psqlusr
    ```

    Result:

    ```bash
    $ uid=1003(psqlusr) gid=1004(psqlusr) groups=1004(psqlusr)
    ```

3.  Move to the alfresco-content-services installation folder and change the user and group ownership to restrict the access to the database files only to `psqlusr`.

    ```bash
    ~/alfresco-content-services$ chown -R psqlusr postgresql/ alf_data/postgresql/
    ~/alfresco-content-services$ chgrp -R psqlusr postgresql/ alf_data/postgresql/
    ```

4.  To start the database, switch to the `psqlusr` user created above using any one of the following methods:

    -   ```bash
        psqlusr > alfresco-content-services/postgresql/bin$ ./pg_ctl start -w -D {path to install folder}/alfresco-content-services/alf_data/postgresql
        waiting for server to start.... done
        server started
        ```

    -   ```bash
        psqlusr > alfresco-content-services$ ./alfresco.sh start postgresql
        waiting for server to start.... done
        server started
        ```


#### Securing the Tomcat server

To secure your Tomcat server, follow these steps:

1.  Create a new restricted user and a group to run the Tomcat web server and LibreOffice in a secure way.

    ```
    $ adduser tomcatusr
    $ groupadd alfusrs
    $ usermod -a -G alfusrs tomcatusr
    ```

2.  Assign the newly created user as the owner of the important folders from the installation folder:

    ```
    :~/alfresco-content-services$ chown -R tomcatusr tomcat/work/ tomcat/temp/ tomcat/logs/ tomcat/shared/
    alf_data/contentstore/ alf_data/contentstore.deleted/ alf_data/keystore/ alf_data/solr4/
    common/ libreoffice/ alf_data/oouser/
    ```

    Make sure you change the ownership of all the file/folder under the alf_data folder, except for the postgresql folder that needs to be owned by the proper Postgres user.

3.  In addition, assign the new group as the owner of all these files/folders:

    ```
    :~/alfresco-content-services$ chgrp -R tomcatusr tomcat/work/ tomcat/temp/ tomcat/logs/ tomcat/shared/
    alf_data/contentstore alf_data/contentstore.deleted/ alf_data/keystore/ alf_data/solr4/
    common/ libreoffice/ alf_data/oouser/
    ```

4.  Go to <installLocation>/tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties and update the location of `alfresco.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/alfresco.log
    ```

5.  Go to <installLocation>/tomcat/webapps/share/WEB-INF/classes/log4j.properties and update the location of `share.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/share.log
    ```

6.  Go to <installLocation>/solr4/log4j-solr.properties and update the location of `solr.log` in the `log4j.appender.File.File` property.

    ```
    ###### File appender definition #######
    log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
    log4j.appender.File.File=./tomcat/logs/solr.log
    ```

7.  To start Alfresco, switch to the `tomcatusr` user created above.

    ```
    tomcatusr > alfresco-content-services$ ./alfresco.sh start tomcat
    ```


When the Tomcat web server runs with a limited user, it is not allowed to bind to ports lower than 1024. If you need file sharing protocols through JLAN, see [Running SMB/CIFS from a normal user account]({% link content-services/5.2/config/file-servers.md %}#running-smb/cifs-from-a-normal-user-account) to set up proper ports and firewall rules/port forwarding.

#### Securing LibreOffice process

To secure LibreOffice, follow these steps:

1.  Follow the steps to secure the Tomcat web server, as described above.

2.  Create a limited user, `lofficeusr`.

    ```
    $ adduser lofficeusr
    ```

    Only a limited user can run the LibreOffice process and is allowed to write files in the alfresco-content-services/tomcat/temp folder. The temp folder is used by the Alfresco process to communicate and request file transformations. LibreOffice will not able to write files in any other folder.

3.  Add the user to the group, `alfusr`.

    ```
    $ usermod -a -G alfusrs lofficeusr
    ```

4.  To display all the groups (along with their uids) associated with `tomcatusr` use:

    ```
    id tomcatusr
    ```

    Result:

    ```
    uid=1001(tomcatusr) gid=1001(tomcatusr) groups=1001(tomcatusr),1003(alfusrs)
    ```

5.  To display all the groups (along with their uids) associated with `lofficeusr` use:

    ```
    id lofficeusr
    ```

    Result:

    ```
    uid=1002(lofficeusr) gid=1002(lofficeusr) groups=1002(lofficeusr),1003(alfusrs)
    ```

6.  Set the owners of the libreoffice folder.

    ```
    chown -R lofficeusr libreoffice/
    chgrp -R alfusrs libreoffice/
    ```

7.  Delete all the files and folders (including the hidden ones) from the tomcat/temp folder.

8.  Allow the `loffice` user to write files in the tomcat/temp folder.

    ```
    chgrp -R alfusrs tomcat/temp/
    chmod g+w tomcat/temp/
    ```

9.  Set `setuid` to tomcat/temp so that all the files created in this folder (or its subfolders) will have `alfusrs` as the group owner.

    ```
    chmod g+s tomcat/temp
    ```

    The folder permission for the tomcat/temp folder would look like this:

    ```
    drwxrwsr-x  5 tomcatusr  alfusrs
    ```

    > **Note:** The `setuid` and `setgid` feature may work differently on different Linux distributions. If the `setgid` feature is not enabled, JODConverter will not work.

10. Edit the soffice.bin file. This script is started by the JODConverter code from Alfresco.

    ```
    alfresco@alfresco-VB-U14:~/alfresco-content-services$ cat libreoffice/program/soffice.bin
    #!/bin/sh
    
    export LD_LIBRARY_PATH="" 
    
    #exec /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin "$@"
    
    sudo -u lofficeusr /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin "$@"
    ```

11. Instruct the Linux system that you trust `tomcatusr` to allow `lofficeusr` to run the LibreOffice executable under that role without asking for a password.

    ```
    $ visudo
    ```

    Add this in the sudoers file:

    ```
    tomcatusr ALL=(lofficeusr) NOPASSWD: /home/alfresco/alfresco-content-services/libreoffice/program/.soffice.bin
    ```

    Use the exact path to your /libreoffice/program/.soffice.bin file.


![]({% link content-services/images/hr.png %})


## Installing manually {#install-zip}

Use this information to manually install Alfresco Content Services.

-   **[Prerequisites for installing Alfresco Content Services](#prerequisites-for-installing-alfresco-content-services)**  
Use this information to review your system before you manually install Alfresco Content Services.
-   **[What you need to install Alfresco Content Services](#what-you-need-to-install-alfresco-content-services)**  
There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.
-   **[Installing Alfresco Content Services on Tomcat](#installing-alfresco-content-services-on-tomcat)**  
For more complex Alfresco Content Services installations or if you wish to use an existing Tomcat application server, you can use the Web Archive (WAR) bundle to install Alfresco Content Services on any platform. For this type of installation, you must ensure that the required software is installed on the machine.
-   **[Installing Alfresco Content Services on other web applications](#installing-alfresco-content-services-on-other-web-applications)**  
Use this information if you are using an application server other than Tomcat.
-   **[Tailoring your installation](#tailoring-your-installation)**  
When installing Alfresco Content Services, an important part of the configuration process is the removal of any unused applications. Use this information to determine any applications that you might want to remove from your installation and how to remove them.
-   **[Installing an Alfresco Module Package](#installing-an-alfresco-module-package)**  
An Alfresco Module Package (AMP) is a bundle of code, content model, content, and the directory structure that is used to distribute additional functionality for Alfresco Content Services. Use the Module Management Tool (MMT) to install and manage AMP files. You can install an AMP in an Alfresco WAR using the MMT, or by using the `apply_amps` tool.
-   **[Installing additional software for Alfresco Content Services](#installing-additional-software-for-alfresco-content-services)**  
The third-party software used by Alfresco Content Services is installed when you use the setup wizards to install Alfresco Content Services. If you wish to install the third-party software independently, this information describes the steps for obtaining and installing the software. Some of the software can be installed any time before or after installing Alfresco Content Services.


### Prerequisites for installing Alfresco Content Services

Use this information to review your system before you manually install Alfresco Content Services.

The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.

See [Supported Platforms]({% link content-services/5.2/support/index.md %}) for information about prerequisites and requirements.

-   **[Software requirements](#software-requirements)**  
Use this information to understand the required software that must be on your system for manually installing Alfresco Content Services.
-   **[Language support](#language-support)**  
The Alfresco Content Services interface is supported for use with a number of languages that have been through an Engineering quality assurance (QA) and linguistic testing cycle.
-   **[Environment checklist](#environment-checklist)**  
Use this check list to validate the architecture on which Alfresco Content Services will run and also for validating the environment prior to installation.



#### Software requirements {#software-requirements}

Use this information to understand the required software that must be on your system for manually installing Alfresco Content Services.

|Component

|Recommendation

|
|-----------|----------------|
|Java Runtime Environment (JRE)|Alfresco Content Services supports Java 8. The `JAVA_HOME` environment variable must be set to the location of the JRE.|
|Application server|Alfresco Content Services runs in Tomcat, but can be installed on other application servers.|
|Database|Alfresco Content Services comes preconfigured with a PostgreSQL 9.4.4 database. If you intend to use Alfresco Content Services in a production environment, you can use one of the supported databases. For the latest information on supported databases, see the [Supported Platforms]({% link content-services/5.2/support/index.md %}) page. For information on configuring the database settings, refer to [Configuring databases]({% link content-services/5.2/config/databases.md %}).|
|LibreOffice|Alfresco Content Services uses LibreOffice 6.1.6 for transforming documents from one format to another, for example, a text file to a PDF file.|
|ImageMagick|Alfresco Content Services uses ImageMagick 7.0.5 to manipulate images for previewing.|
|alfresco-pdf-renderer|Alfresco Content Services uses alfresco-pdf-renderer for creating document thumbnails and previews. See [Installing alfresco-pdf-renderer](#installing-alfresco-pdf-renderer).|


#### Language support {#language-support}

The Alfresco Content Services interface is supported for use with a number of languages that have been through an Engineering quality assurance (QA) and linguistic testing cycle.

Alfresco Content Services is supported with the following languages:

-   US English (en)
-   German (de)
-   Spanish (es)
-   French (fr)
-   Italian (it)
-   Japanese (ja)
-   Dutch (nl)
-   Simplified Chinese (zh_CN)
-   Russian (ru)
-   Norwegian Bokmål (nb)
-   Brazilian Portuguese (pt_BR)

If you select a language when you install using the setup wizards, your selected language will be used for the installation instructions. To use a localized version, ensure that you configure the correct language in your browser settings.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, for the French version, site-welcome.properties is called sitewelcome_ fr.properties.

Although the interface is localized, the following components have not been localized, therefore, any strings originating from these components will be displayed in English.

-   SharePoint
-   Web Quick Start
-   LibreOffice

The following files are not localized and the error messages remain in English to ease searching for fixes to issues.

-   content-service.properties
-   dictionary-messages.properties
-   module-messages.properties
-   patch-service.properties
-   repoadmin-interpreter-help.properties
-   schema-update.properties
-   system-messages.properties (partially translated)
-   tenant-interpreter-help.properties
-   version-service.properties
-   webclient-config-admin-interpreter-help.properties
-   workflow-interpreter-help.properties
-   control.properties (in remote-api directory)

**What to do next:**

[Go to the installing flowchart](#installing-as-a-single-instance)

[Go to the upgrading flowchart]({% link content-services/5.2/upgrade/index.md %}#upgrading-on-a-single-instance)

[Validating the architecture](#validating-the-architecture)


#### Environment checklist {#environment-checklist}

Use this check list to validate the architecture on which Alfresco Content Services will run and also for validating the environment prior to installation.

-   **[Validating the architecture](#validating-the-architecture)**  
There are a number of steps required to validate the architecture to ensure that it meets the prerequisites for an Alfresco Content Services installation.
-   **[Validating the environment](#validating-the-environment)**  
The following environment-specific items must be validated prior to installing Alfresco Content Services.


##### Validating the architecture {#validating-the-architecture}

There are a number of steps required to validate the architecture to ensure that it meets the prerequisites for an Alfresco Content Services installation.

1.  Validate that your environment is on the [Supported Platforms]({% link content-services/5.2/support/index.md %}) page.

    The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.

2.  Validate and optimize the hardware (I/O subsystems and CPU) settings.

    1.  Optimize the following I/O, in this order of priority:

        -   I/O to the relational database that Alfresco Content Services is configured to use.
        -   I/O to the disk subsystem on which the Solr indexes are stored.
        -   I/O to the disk subsystem on which the content is stored.
        I/O is one of the main factors that influence performance. In each case, the goal is to minimize the latency (response time) between Alfresco Content Services and the storage system, while also maximizing bandwidth. Low latency is particularly important for database I/O, and one rudimentary test of this is to ping the database server from the Alfresco Content Services server. Round trip times greater than 1ms indicate a suboptimal network topology or configuration that will adversely impact performance. “Jitter” (highly variable round trip times) is also of concern, as that will increase the variability of Alfresco Content Services performance.

        We recommend that the disk throughput is greater than 200 MB/sec. On Linux, use the `hdparm` tool to measure disk throughput. The following sample output is on an SATA disk:

        ```
        hdparm -tT /dev/sda1
        /dev/sda1:
        Timing cached reads:   27998 MB in  2.00 seconds = 14018.28 MB/sec
        Timing buffered disk reads: 536 MB in  3.01 seconds = 178.05 MB/sec
        ```

        Other useful tools for detecting disk I/O issues include `dd`, `seeker`, and `iozone`.

    2.  Ensure that your system has a clock speed of greater than 2.0 Ghz.

        For production use, this clock speed will ensure reasonable response times to the end user. Alfresco Content Services 3.x and later versions have been tested on 64-bit CPU architectures, primarily because it allows the JVM to use more memory (RAM) that the earlier 32-bit CPU architecture.

        **Attention:** CPU clock speed is of particular concern for the Orale UltraSPARC architecture, as some current UltraSPARC based servers ship with CPUs that have clock speeds as low as 900 Mhz, well below what is required for adequate performance. If you intend to use Oracle servers for hosting, ensure that all CPUs have a clock speed of at least 2.0 Ghz.

        This implies that:

        -   An X or M class Oracle server is required, with careful CPU selection to ensure 2.0 Ghz (or better) clock speed.
        -   T class servers should not be used, as they do not support CPUs faster than approximately 2 Ghz. We're unable to provide specific guidance on Oracle server classes, models, or configurations, so you should talk with your Oracle reseller to confirm that minimum CPU clock speed recommendations will be met.
3.  Validate the database.

    > **Important:** We don't provide technical support for maintaining or tuning your relational database. Ensure that your project has access to a certified database administrator (DBA) to support your installation.

    Regular maintenance and tuning of the database is necessary. Specifically, all of the database servers that supports require at the very least that some form of index statistics maintenance be performed at frequent, regular intervals to maintain optimal performance.

    > **Important:** Index maintenance can have a severe impact on performance while in progress, hence it needs to be discussed with your project team and scheduled appropriately.

4.  Validate the operating system (OS).

    1.  Ensure that your chosen OS has been officially certified for use with Alfresco Content Services (refer to the supported stacks list for details).

    2.  We recommend that a 64-bit OS is used.

5.  Validate and tune the JVM.

    Ensure that your chosen Java Virtual Machine has been officially certified for use witth Alfresco Content Services (refer to the Supported Stacks list for details).

    For information on configuring and tuning the JVM, refer to [Tuning the JVM]({% link content-services/5.2/config/repository.md %}#tuning-the-jvm).


##### Validating the environment {#validating-the-environment}

The following environment-specific items must be validated prior to installing Alfresco Content Services.

> **Note:** An Environment Validation tool is also available that can validate most of the following requirements. This tool is available from the [Support Portal](http://support.alfresco.com). All versions are also available on the Nexus server at [https://artifacts.alfresco.com/nexus/index.html#nexus-search;quick~alfresco-environment-validation](https://artifacts.alfresco.com/nexus/index.html#nexus-search;quick~alfresco-environment-validation).

1.  Validate that the host name of the server can be resolved in DNS.

    This is required if you're configuring in a cluster.

    > **Note:** Using an incorrect host name or a host name that no longer resolves to its own IP address can give an internal error, such as `ObjID already in use`. You can get more information about this error by adding the following line into the log4j.properties file:

    ```
    log4j.logger.org.springframework.remoting.rmi.RmiServiceExporter=debug
    ```

    To resolve this error, you can either:

    -   Validate that the IP address and the host name of the server are correctly set in the /etc/hosts file. For example, if you set the IP address as `10.20.30.40` and the host name as `ip-10-20-30-40`, the content of the /etc/hosts file should contain the following entry:

        ```
        10.20.30.40 ip-10-20-30-40 
        ```

    -   Specify the correct IP address in the `alfresco-global.properties` file as shown:

        ```
        alfresco.rmi.services.host=10.20.30.40
        ```

2.  Validate that the user Alfresco Content Services will run as can open sufficient file descriptors (4096 or more).

3.  Validate that the ports on which Alfresco Content Services listens are available:

    > **Note:** The ports listed in the following table are the defaults. If you are planning to reconfigure to use different ports, or wish to enable additional protocols (such as HTTPS, SMTP, or IMAP), update this list with those port numbers.

    |Protocol|Port number|Notes|
    |--------|-----------|-----|
    |FTP|TCP 21|On Unix-like operating systems that offer so-called “privileged ports”, Alfresco Content Services will normally be unable to bind to this port, unless it is run as the root user (which is not recommended). In this case, even if this port is available, Alfresco Content Services will still fail to bind to it, however for FTP services, this is a non-fatal error. The FTP functionality will be disabled in the repository.|
    |SMTP|TCP 25|SMTP is not enabled by default.|
    |SMB/NetBT:|UDP 137,138||
    |SMB/NetBT:|TCP 139,445|On Unix-like operating systems that offer so‐called “privileged ports”, Alfresco Content Services will normally be unable to bind to this port, unless it is run as the root user (which is not recommended). In this case, even if this port is available, Alfresco Content Services will still fail to bind to it, however for CIFS services, this is a non-fatal error. The CIFS functionality will be disabled in the repository.|
    |IMAP|TCP 143|IMAP is not enabled by default.|
    |Tomcat Administration|TCP 8005||
    |HTTP|TCP 8080||
    |RMI|TCP 50500||

4.  Validate that the installed Oracle JVM is version 1.7 or 1.8.

5.  Validate that the directory in which the JVM is installed does not contain spaces.

6.  Validate that the installation directory does not contain spaces.

7.  Validate that the directory to be used for the repository (typically called alf_data) is both readable and writeable by the operating system user that the process will run as.

8.  Validate that you can connect to the database as the Alfresco Content Services database user, from the server.

    Ensure that you install the database vendor's client tools on the server.

9.  Validate that the character encoding for the database is UTF-8.

10. (MySQL only) Validate that the storage engine for the database is InnoDB.

11. Validate that the following third-party software is installed and the correct versions:

    1.  ImageMagick v6.2 or newer

12. (RHEL and Solaris only) Validate that LibreOffice is able to run in headless mode.


**What to do next:**

[Go to the installing flowchart](#installing-as-a-single-instance)

[Go to upgrading flowchart]({% link content-services/5.2/upgrade/index.md %}#upgrading-on-a-single-instance)



### What you need to install Alfresco Content Services

There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.

The setup wizards install all the components you need for running Alfresco Content Services and ensure that you have all the recommended software installed and that configurations are set. When you install using the setup wizards, it runs within an instance of the Tomcat application server. The setup wizards provide a full Alfresco Content Services install, which you can use if no Alfresco Content Services component is installed on your production environment system. See [Installing using setup wizards](#installing-using-setup-wizards) for more information on the options available.

If you wish to install within an existing Tomcat or another application server, use the Alfresco WAR file. If you use the WAR file to install, you must install the required additional components manually.

All files are available from the Support Portal at [http://support.alfresco.com](http://support.alfresco.com). Click Online Resources > Downloads, and select the file you require.

The following information helps you to determine what files to download and install.

|Installation file|File name|Description|
|-----------------|---------|-----------|
|Alfresco Content Services setup wizard for **Windows**|alfresco-content-services-installer-5.2.7-win-x64.exe (64 bit)|This setup wizard for Windows is for 64-bit systems. It is not suitable for use on 32-bit environments.|
|Alfresco Share setup wizard for **Windows**|alfresco-content-services-share-installer-5.2.7-win-x64.exe (64 bit)|This installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco Content Services is recommended for most purposes. Use this installer only if you have a specific requirement for it.|
|Alfresco Content Services Platform setup wizard for **Windows**|alfresco-content-services-platform-installer-5.2.7-win-x64.exe (64 bit)|This installer installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco Content Services Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco Content Services setup wizard for **Linux**|alfresco-content-services-installer-5.2.7-linux-x64.bin (64 bit)|This setup wizard for Linux is for 64-bit systems. It is not suitable for use on 32-bit environments.

The Linux executable file is a graphical installer, but you can also run this file to install Alfresco Content Services using text mode. Text mode is a keyboard-based installation method. Run the command with the --mode text option.|
|Alfresco Share setup wizard for **Linux**|alfresco-content-services-share-installer-5.2.7-linux-x64.bin (64 bit)|This installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco Content Services Installer is recommended for most purposes. Use this installer only if you have a specific requirement for it.|
|Alfresco Content Services Platform setup wizard for **Linux**|alfresco-content-services-platform-installer-5.2.7-linux-x64.bin (64 bit)|This installer installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco Content Services Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco Content Services Distribution zip|alfresco-content-services-distribution-5.2.7.zip|Alfresco WAR files for manual install into existing application servers or for upgrades to existing installations. This distribution zip also contains the Module Management Tool (MMT) and the sample extension files, such as `alfresco-global.properties`.

|
|Alfresco Content Services EAR zip|alfresco-content-services-ear-distribution-5.2.7.zip|Alfresco Content Services EAR file includes the sample extension files, such as `alfresco-global.properties`, and also contains the alfresco-content-services.ear file and myfaces1_1-websphere-shared-lib.zip.|
|Alfresco Content Services File Transfer Receiver zip|alfresco-content-services-file-transfer-receiver-5.2.7.zip|File Transfer Receiver installation file|
|Web Quick Start zip|alfresco-wcmqs-5.2.7.zip|Web Quick Start bundle containing the AMPs for Web Quick Start and the Alfresco Web Editor.|



### Installing Alfresco Content Services on Tomcat

For more complex Alfresco Content Services installations or if you wish to use an existing Tomcat application server, you can use the Web Archive (WAR) bundle to install Alfresco Content Services on any platform. For this type of installation, you must ensure that the required software is installed on the machine.

Use this method of installing Alfresco Content Services if you already have installed a JRE, a supported database, an application server, and the additional components.

For information about securing Tomcat, see [Tomcat security considerations](https://tomcat.apache.org/tomcat-7.0-doc/security-howto.html).

-   **[Installing the Tomcat application server](#installing-the-tomcat-application-server)**  
Install an instance of Tomcat 7 manually and modify it to use the correct directory structure and files for Alfresco Content Services.
-   **[Installing the Alfresco WARs](#installing-the-alfresco-wars)**  
A WAR file is a JAR file used to distribute a collection of files (JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages) that together constitute a web application.
-   **[Installing into an existing web application](#installing-into-an-existing-web-application)**  
If you install Alfresco Content Services manually, you must deploy the `ROOT.war` application to the server root. If you already have an application running in the server root, you can merge the Alfresco Content Services function into your existing web application.
-   **[Configuring Alfresco Content Services as a Windows service](#configuring-alfresco-content-services-as-a-windows-service)**  
To configure Alfresco Content Services to run as a Windows service, you need to set up the application server (Tomcat) to run as a Windows service.


#### Installing the Tomcat application server

Install an instance of Tomcat 7 manually and modify it to use the correct directory structure and files for Alfresco Content Services.

These instructions recommend that you name the required directories as shared/classes and shared/lib because these are the path names used within full Alfresco Content Services installations. You can substitute alternative names for these directories. The installation directory for Tomcat is represented as <TOMCAT_HOME>.

1.  Download and install Tomcat version 7 following the instructions from [http://tomcat.apache.org](http://tomcat.apache.org).

2.  Create the directories required for an Alfresco Content Services installation:

    1.  Create the shared/classes directory.

    2.  Create the shared/lib directory.

3.  Open the <TOMCAT_HOME>/conf/catalina.properties file.

4.  Change the value of the `shared.loader=` property to the following:

    `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

    > **Note:** If you have used alternative names for the directories, you must specify these names in the `shared.loader` property.

5.  Copy the JDBC drivers for the database you are using to the lib/ directory.

6.  Edit the <TOMCAT_HOME>/conf/server.xml file.

7.  Set attributes of HTTP connectors.

    Tomcat uses ISO-8859-1 character encoding when decoding URLs that are received from a browser. This can cause problems when creating, uploading, and renaming files with international characters.

    By default, Tomcat uses an 8 KB header buffer size, which might not be large enough for Kerberos and NTLM authentication protocols.

    Use the following example when installing into a production environment with a proxy that uses SSL encryption and communicates via HTTP. Locate the `Connector` sections, and then add the `URIEncoding`, `scheme`, `secure`, and `maxHttpHeaderSize` properties.

    ```
    <Connector port="8080"
    protocol="HTTP/1.1"
    URIEncoding="UTF-8"
    connectionTimeout="20000"
    scheme="https"
    secure="true"
    redirectPort="8443"
    maxHttpHeaderSize="32768"/>
    ```

    Use the following example if installing into a test environment without a proxy.

    ```
    <Connector port="8080"
    protocol="HTTP/1.1"
    connectionTimeout="20000"
    redirectPort="8443" />
    ```

8.  Save the server.xml file.


#### Installing the Alfresco WARs

A WAR file is a JAR file used to distribute a collection of files (JavaServer Pages, servlets, Java classes, XML files, tag libraries, and static web pages) that together constitute a web application.

Use this method of installing if you've already installed a JRE, a supported database, an application server, and the additional components.

The Alfresco Content Services Distribution file is a zip containing the required WAR files, in addition to the additional commands, and configuration files for a manual installation.

1.  Browse to the [Support Portal](https://support.alfresco.com){:target="_blank"}.

2.  Download the following file:

    alfresco-content-services-distribution-5.2.7.zip

3.  Specify a location for the download and extract the file.

    You see the following directory structure:

    ```
    alf_data
    alfresco-pdf-renderer
    amps
    bin
    licenses
    solr4
    web-server
    ```

    The Distribution zip also contains the following file:

    ```
    README.txt
    ```

    The VERSIONS.md file provides a list of recommended components for the latest Alfresco Content Services release.

    The /alf_data directory contains the following directory:

    ```
    keystore
    ```

    This directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |browser.p12|The pkcs12 keystore generated from ssl.keystore that contains the repository private key and certificate for use in browsers, such as Firefox.|
    |CreateSSLKeystores.txt|Contains instructions to create an RSA public/private key pair for the repository with a certificate that has been signed by the Alfresco Certificate Authority (CA).|
    |generate_keystores.bat|Windows batch file for generating secure keys for Solr communication.|
    |generate_keystores.sh|Linux script file for generating secure keys for Solr communication.|
    |keystore|Secret key keystore containing the secret key used to encrypt and decrypt node properties.|
    |keystore-passwords.properties|Contains password protecting the keystore entries.|
    |readme.txt|Text file containing information about other files in a directory.|
    |ssl-keystore-passwords.properties|Contains passwords for SSL keystore.|
    |ssl-truststore-passwords.properties|Contains passwords for SSL truststore.|
    |ssl.keystore|Repository keystore containing the repository private/public key pair and certificate.|
    |ssl.truststore|Repository truststore containing certificates that the repository trusts.|

    The /alfresco-pdf-renderer directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |alfresco-pdf-renderer-1.0-linux.tgz|alfresco-pdf-renderer binary for Linux|
    |alfresco-pdf-renderer-1.0-win64.tgz|alfresco-pdf-renderer binary for Windows|
    |alfresco-pdf-renderer-1.0-osx.tgz|alfresco-pdf-renderer binary for Mac|

    The /amps directory contains the following files:

    |File name|Description|
    |---------|-----------|
    |alfresco-share-services.amp|Share Services AMP|

    You can create an /amps_share directory to add any Share AMP files that you want to install separately.

    > **Important:** If you do not apply the Share Services AMP to the repository, Alfresco Share will not work correctly, and when you start up Share, you will see the message: *Alfresco Content Services is running without Share Services. See your System Administrator for more details.*

    See [step 18](#installing-on-linux-using-the-alfresco-share-installer) of the wizard install topic for more information.

    The /bin directory contains these files:

    |File name|Description|
    |---------|-----------|
    |Win32NetBIOS.dllWin32NetBIOSx64.dll

 Win32Utils.dll

Win32Utilsx64.dll

|These DLLs handle the connection between the native CIFS server and Alfresco Content Services.|
    |alfresco-mmt.jar|Alfresco Module Management Tool (MMT).|
    |alfresco-spring-encryptor.jar|Alfresco Encrypted Properties Management tool|
    |apply_amps.bat|Windows batch file for Tomcat application server installs, used to apply all AMP files in the <installLocation> directory.|
    |apply_amps.sh|Linux script file for Tomcat application server installs, used to apply all AMP files in the <installLocation> directory.|
    |clean_tomcat.bat|Windows batch file for cleaning out temporary application server files from previous installations.|
    |clean_tomcat.sh|Linux script for cleaning out temporary application server files from previous installations.|

    The /licenses directory contains the following structure:

    ```
    3rd-party
    ```

    This directory contains the third-party license files.

    You can create a /modules directory with the following structure:

    ```
    platform
    share
    ```

    Put simple JAR modules in these folders so that they're loaded when Alfresco Content Services starts up. See [Simple Module]({% link content-services/5.2/admin/content-stores.md %}#simple-module) for more information.

    The /solr4 directory contains the following files and folders:

    |File or folder name|Description|
    |-------------------|-----------|
    |/alfrescoModels|This directory contains all the content models that come out of the box. Any new custom content model added are synced to this directory so that Solr 4 knows about it.|
    |/archive-SpacesStore|Configuration directory for the archive core.|
    |/conf|Contains configuration files.|
    |context.xml|Configuration file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
    |/lib|This directory contains extra libraries that Solr 4 loads on start up. These libraries are used to communicate by using CMIS, Alfresco data model or Alfresco Surf Web Scripts.|
    |log4j-solr.properties|Configuration file for Solr 4-specific logging.|
    |solr.xml|Configuration file which specifies the cores to be used by Solr 4.|
    |/templates| |
    |/workspace-SpacesStore|Configuration directory for the workspace core.|

    The /web-server directory has a standard Tomcat structure:

    ```
    conf
    lib
    shared
    webapps
    ```

    The /conf directory contains Catalina repository and Share xml files.

    The /lib directory contains the PostgreSQL JDBC jar file.

    The /shared directory includes the Alfresco Content Services configuration files:

    |File name|Description|
    |---------|-----------|
    |/classes/alfresco-global.properties.sample|The sample global properties file, which is used for configuration properties.|
    |/classes/alfresco-encrypted.properties|A sample encrypted properties overlay file.|
    |/classes/alfresco|Contains the directory structure for the configuration override files, including the extension, and web-extension directories.|

    The /webapps directory contains these files:

    |File name|Description|
    |---------|-----------|
    |alfresco.war|The Alfresco WAR file|
    |ROOT.war|Application for the server root|
    |share.war|The Alfresco Share WAR file|
    |solr4.war|The Solr 4 WAR file|

4.  Move the WAR files from /webapps to the appropriate location for your application server.

    For example, for Tomcat, move the WAR files to the <TOMCAT_HOME>/webapps directory. If you already have a web application that is running in the server root, see [Installing into an existing web application](#installing-into-an-existing-web-application) for instructions on how to merge the files into your application.

    > **Note:** If you are using JBoss, you must customize the web.xml for all WAR files to include this code fragment:

    ```
    <context-param> 
       <param-name> 
          org.jboss.jbossfaces.WAR_BUNDLES_JSF_IMPL 
       </param-name> 
       <param-value>true</param-value
    </context-param>
    ```

    This ensures that the JSF deployer in JBoss uses its own bundled JSF version.

5.  Move the contents from /conf, /lib, and /shared to the appropriate location for your application server.

6.  Remove all directories in <TOMCAT_HOME>/webapps.

    If you do not remove these directories, then the WAR files are not deployed when the server starts.

7.  Edit the /shared/classes/alfresco-global.properties.sample file with your configuration settings.

    As a minimum, uncomment and edit the following properties in the selected sections:

    ```
    # Sample custom content and index data location
    #dir.root
    #dir.keystore
    
    # Solr indexing
    #index.subsystem.name
    #solr.host
    #solr.port.ssl
    
    # Sample database connection properties 
    #db.username
    #db.password
    
    # PostgreSQL connection
    #db.driver
    #db.url
    
    # URL Generation Parameters
    #alfresco.context
    #alfresco.host
    #alfresco.port
    #alfresco.protocol
    #
    #share.context
    #share.host
    #share.port
    #share.protocol
    
    ```

    > **Note:** See [Managing search services]({% link content-services/5.2/admin/search.md %}) and [Solr subsystem]({% link content-services/5.2/admin/search.md %}#solr-subsystem) for more on Solr indexing properties.

8.  Save the file without the .sample extension.

9.  Move the `alfresco-global.properties` file to <classpathRoot>.

    For example, <TOMCAT_HOME>/shared/classes.


You are now ready to install any additional software that you require. See [Installing additional software for Alfresco Content Services](#installing-additional-software-for-alfresco-content-services) and [Installing integrations](#installing-integrations) for more information.

> **Note:** If you deployed previous versions of Alfresco Content Services, you must remove any temporary files created by your application server. Use the clean_tomcat.bat or clean_tomcat.sh command.

> **Note:** If you are installing the S3 Connector as part of your installation, do not start Alfresco Content Services before applying the S3 AMP file.

> **Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).



#### Installing into an existing web application

If you install Alfresco Content Services manually, you must deploy the `ROOT.war` application to the server root. If you already have an application running in the server root, you can merge the Alfresco Content Services function into your existing web application.

The `ROOT.war` application is required to enable Alfresco Office Services (AOS). If you have a custom application that is running in the server root directory, it is important that you modify this application to enable AOS.

There are two types of requests that are sent to the server root directly by Microsoft Office and Windows:

1.  A request for the `_vti_inf.html` file that contains configuration information
2.  `OPTIONS` and `PROPFIND` requests

The following diagram shows the information flow between Microsoft Office and Alfresco Content Services, including interactions with the `/alfresco`, `_vti_bin` and `ROOT` applications:

![]({% link content-services/images/aos-howitworks.png %})

1.  Extract the `_vti_inf.html` file from the <TOMCAT_HOME>webapps/ROOT.war archive file and add it to your web application.

2.  In your web application, modify the service that responds to requests to the server root, so that it sends `PROPFIND` and `OPTIONS` requests to the /alfresco application.

    If you have a `.jsp` page responding to the server root, you can add this code example to that page:

    ```
    <% 
    if(request.getMethod().equals("PROPFIND") || request.getMethod().equals("OPTIONS")) 
    {     
      ServletContext alfrescoContext = application.getContext("/alfresco");     
      if( (alfrescoContext != null) && !alfrescoContext.equals(getServletContext()) )     
      {         
         RequestDispatcher rd = alfrescoContext.getRequestDispatcher("/AosResponder_ServerRoot");
         if(rd != null)
         {
                 rd.forward(request, response);
                 return;
         }
      }
    } 
    %>   
    ```

    and add this import statement to the top of the `.jsp` page:

    ```
    <%@page session="true" import="javax.servlet.ServletContext, javax.servlet.RequestDispatcher” %>
    ```

    If you have deployed Alfresco Content Services to a different context path (something other than `/alfresco`), make sure that you edit the `application.getContext` value to represent this.

    If you have a servlet responding to these requests, integrate the Java code from these JSP code examples into your application.

3.  Depending on your application server, ensure that requests are dispatched by default between different application servers.

    For Tomcat, add a file called `context.xml` to the META-INF directory of your web application. Here is an example of the `context.xml` file:

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <Context path="/" debug="100" privileged="true" reloadable="true" crossContext="true">
    </Context>
    ```



#### Configuring Alfresco Content Services as a Windows service

To configure Alfresco Content Services to run as a Windows service, you need to set up the application server (Tomcat) to run as a Windows service.

Before you start, ensure that Alfresco Content Services and a supported JRE are installed on your Windows system.

> **Note:** For more information on editing, updating, installing a Windows service, see the Apache documentation for the version of Tomcat that you are using:

-   For Tomcat 8: [Updating services](https://tomcat.apache.org/tomcat-8.0-doc/windows-service-howto.html#Updating_services)
-   For Tomcat 7: [Updating services](https://tomcat.apache.org/tomcat-7.0-doc/windows-service-howto.html#Updating_services)

1.  To install Alfresco Content Services as a service, run the following command from a command prompt:

    ```
    service.bat install alfresco
    ```

2.  Open the Services panel.

3.  Locate the service named **alfresco**, and then select **Start the service**.

    Alfresco Content Services starts running as a Windows service.

4.  To uninstall the service, run the following commands from a command prompt:

    ```
    cd c:\alfresco\tomcat\bin 
    service.bat uninstall alfresco
    ```


### Installing Alfresco Content Services on other web applications

Use this information if you are using an application server other than Tomcat.

> **Note:** If you are using Alfresco Office Services (AOS), you'll need to customise you Alfresco WAR file after installing the AOS AMP file. See [Installing Alfresco Office Services]({% link microsoft-office/1.1/install/index.md %}) for more information.

-   **[Installing Alfresco Content Services on JBoss](#installing-alfresco-content-services-on-jboss)**  
You can install and deploy the Alfresco WAR on the JBoss application server.
-   **[Installing Alfresco Content Services on WebLogic](#installing-alfresco-content-services-on-weblogic)**  
Use this information to install Alfresco Content Services as an Enterprise Archive format (EAR) into Oracle WebLogic.
-   **[Installing Alfresco Content Services on WebSphere](#installing-alfresco-content-services-on-websphere)**  
Use this information to install Alfresco Content Services on WebSphere 8.5.5.



#### Installing Alfresco Content Services on JBoss

You can install and deploy the Alfresco WAR on the JBoss application server.

Ensure that JBoss and Java 8 are installed. Review the [Support Platforms]({% link content-services/5.2/support/index.md %}) page for more information.

The following instructions:

-   Assume that you know the path of the JBoss directory, which is represented as <JBOSS_EAP_HOME>.
-   Are written for Windows Server 2012 R2 installation with MySQL as data source. See the [JBoss Enterprise Application Platform 6](https://access.redhat.com/site/documentation/en-US/JBoss_Enterprise_Application_Platform/6/html-single/Administration_and_Configuration_Guide/index.html) guide for more details on JBoss EAP 6 configuration.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the Enterprise zip file alfresco-content-services-ear-distribution-5.2.7.zip.

3.  Create a temporary directory (the path for it is represented as `<TEMP>`) and uncompress the zip file here.

4.  Create a module with Alfresco Content Services configuration.

    1.  Create a main directory, for example at `<JBOSS_EAP_HOME>\modules\org\alfresco\configuration\main`.

    2.  Copy the unzipped contents of `<TEMP>\web-server\classpath` to `<JBOSS_EAP_HOME>\modules\org\alfresco\configuration\main` directory.

        > **Note:** Do not set the database properties at this stage.

    3.  Modify the `alfresco-global.properties.sample` file in the `<JBOSS_EAP_HOME>\modules\org\alfresco\configuration\main` directory.

        See [Modifying the global properties file]({% link content-services/5.2/config/index.md %}#modifying-the-global-properties-file)for more information.

    4.  Save the `alfresco-global.properties.sample `file without the .sample extension.

    5.  Create the Alfresco Content Services configuration file, `module.xml` in the `<JBOSS_EAP_HOME>\modules\org\alfresco\configuration\main` directory with the following content:

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
          <module xmlns="urn:jboss:module:1.0" name="org.alfresco.configuration">
            <resources>
             <resource-root path="."/>
            </resources>
          </module>
        ```

    6.  Extract the EAR file found in `alfresco-content-services-ear-distribution-5.2.7.zip` and check the contents of `META-INF\jboss-deployment-structure.xml`:

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
          <jboss-deployment-structure>
           <sub-deployment name="alfresco.war">
            <dependencies>
             <module name="org.alfresco.configuration" />
              <module name="org.apache.xalan" />
            </dependencies>
           </sub-deployment>
           <sub-deployment name="share.war">
            <dependencies>
             <module name="org.alfresco.configuration" />
            </dependencies>
           </sub-deployment>
          </jboss-deployment-structure>                                           
        ```

5.  Follow the instructions for [configuring JBoss for Alfresco Content Services](#configuring-jboss-for-alfresco-content-services).


-   **[Configuring JBoss for Alfresco Content Services](#configuring-jboss-for-alfresco-content-services)**  
Use this information to configure an Alfresco Content Services installation on JBoss.
-   **[Installing Solr on JBoss 6 EAP with Java 8](#installing-solr-on-jboss-6-eap-with-java-8)**  
Use this information to install Solr on the same JBoss 6 instance on which Alfresco Content Services is installed.
-   **[Configuring on JBoss with Solr installed on a Tomcat instance](#configuring-on-jboss-with-solr-installed-on-a-tomcat-instance)**  
Use this information to configure Alfresco Content Services deployed on JBoss EAP 6 with Solr on a separate Tomcat instance.

##### Configuring JBoss for Alfresco Content Services

Use this information to configure an Alfresco Content Services installation on JBoss.

These steps assume that you know the path of the JBoss directory, which is represented as `<JBOSS_EAP_HOME>`.

1.  Install the JDBC driver for MySQL database.

    1.  To install the required JDBC driver as a core module, create the `<JBOSS_EAP_HOME>\modules\com\mysql\main` directory.

    2.  Copy the JDBC driver, `mysql-connector-java-5.1.20-bin.jar` to `<JBOSS_EAP_HOME>\modules\com\mysql\main`.

    3.  Create the `<JBOSS_EAP_HOME>\modules\com\mysql\main\module.xml` file with the following contents:

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
          <module xmlns="urn:jboss:module:1.0" name="com.mysql">
            <resources>
             <resource-root path="mysql-connector-java-5.1.20-bin.jar"/>
            </resources>
            <dependencies>
             <module name="javax.api"/>
            </dependencies>
          </module>
        ```

2.  Configure the MySQL datasource resource in the server subsystem.

    Modify the subsystem datasources in the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file to have the following content:

    ```xml
    <subsystem xmlns="urn:jboss:domain:datasources:1.1">
      <datasources>
        <datasource jndi-name="java:jboss/datasources/MySqlDS" pool-name="MySqlDS" enabled="true">
        <connection-url>jdbc:mysql://localhost:3306/alfresco</connection-url>
        <driver>com.mysql</driver>
            <pool>
              <min-pool-size>10</min-pool-size>
              <max-pool-size>100</max-pool-size>
              <prefill>true</prefill>
            </pool>
            <security>
              <user-name>alfresco</user-name>
              <password>alfresco</password>
            </security>
            <statement>
              <prepared-statement-cache-size>32</prepared-statement-cache-size>
              <share-prepared-statements>true</share-prepared-statements>
            </statement>
        </datasource>
        <drivers>
            <driver name="com.mysql" module="com.mysql">
              <driver-class>com.mysql.jdbc.Driver</driver-class> 
              <xa-datasource-class>com.mysql.jdbc.jdbc2.optional.MysqlXADataSource</xa-datasource-class>
            </driver>
        </drivers>
      </datasources>
    </subsystem>
    ```

    > **Note:** If Alfresco is deployed with MS SQL Server, set SNAPSHOT transaction isolation level by adding the following to the subsystem datasources:

    ```text
    <new-connection-sql>SET TRANSACTION ISOLATION LEVEL SNAPSHOT;</new-connection-sql>
    ```

    Ensure that `ALLOW_SNAPSHOT_ISOLATION` database option is set to `ON`.

    Also ensure that `enable-welcome-root` is set to false. For example:

    ```xml
    <subsystem xmlns="urn:jboss:domain:web:1.5" default-virtual-server="default-host" native="false">             
       <connector name="http" protocol="HTTP/1.1" scheme="http" socket-binding="http"/>             
       <virtual-server name="default-host" enable-welcome-root="false">
          <alias name="localhost"/>
          <alias name="example.com"/>             
       </virtual-server>         
    </subsystem>
    ```

3.  Apply a workaround to upgrade the JBoss library to avoid EclipseJavaCompiler problems.

    CAUTION:

    From JBoss EAP 6.4.0 onwards, this step is not needed.

    > **Note:** There is an outstanding issue with Java 8 and the Eclipse Compiler for Java. Follow these steps to avoid the problem, and see [ClassFormatException problem](https://issues.jboss.org/browse/DROOLS-329) if you require more information about of the JBoss issue.

    1.  Download the Eclipse Compiler for Java 4.4 JAR file: [ECJ 4.4](https://repo1.maven.org/maven2/org/eclipse/jdt/core/compiler/ecj/4.4/)

    2.  Navigate to `jboss-eap-6.2\modules\system\layers\base\org\jboss\as\web\main\module.xml` and change the following line:

        ```text
        <resource-root path="ecj-3.7.2-redhat-1.jar"/>
        ```

        to

        ```text
        <resource-root path="ecj-4.4.jar"/>
        ```

    3.  Add the new ECJ version JAR file to the jboss-eap-6.2\modules\system\layers\base\org\jboss\as\web\main\ directory.

4.  **(Optional):** Configure another datasource for the Activiti ID generator that is used in activiti-context.xml (recommended for production). For simplicity, you can reuse `MySqlDS` as defined in [step 2](#configuring-jboss-for-alfresco-content-services).

5.  Unzip `alfresco-content-services-platform-ear-distribution-5.2.5.zip`.

6.  Then unzip `alfresco-content-services.ear`.

7.  Now unzip `<TEMP>/alfresco.war` and check or modify the `WEB-INF\jboss-web.xml` file to have the correct references to the main data source (in this example, it is `MySqlDS`, which is defined in standalone.xml) and to `activitiIdGeneratorDataSource` (used in `activiti-context.xml`):

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE jboss-web PUBLIC"-//JBoss
    //DTD Web Application 4.2//EN"
      "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
    <jboss-web>
       <resource-ref>
         <res-ref-name>jdbc/dataSource</res-ref-name>
         <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
       </resource-ref>
       <resource-ref>
         <res-ref-name>jdbc/activitiIdGeneratorDataSource</res-ref-name>
         <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
       </resource-ref>
    </jboss-web>
    ```

8.  Copy `vaadin-application-server-class-loader-workaround-1.0.1.jar` from `<TEMP>\web-server\lib to the `\WEB-INF\lib` directory of the unzipped `alfresco.war` from alfresco-content-services.ear.

    > **Note:** `<TEMP>` refers to the path of the temporary directory.

9.  Configure logging.

    1.  (For Windows): 
        
        In `<J`BOSS_EAP_HOME>\bin\standalone.conf.bat`, add the following to `JAVA_OPTS`:

        ```text
        set "JAVA_OPTS=%JAVA_OPTS% -Dorg.jboss.as.logging.per-deployment=false"
        ```

        (For Unix/Linux):
        
        In `<JBOSS_EAP_HOME>/bin/standalone.conf`, add the following to `JAVA_OPTS`:

        ```text
        JAVA_OPTS="$JAVA_OPTS -Dorg.jboss.as.logging.per-deployment=false"
        ```

    2.  Modify logging subsystem in <JBOSS_EAP_HOME>\standalone\configuration\standalone.xml.

        -   Change the default level for `<root-logger>` from `INFO` to `ERROR` in `<subsystem xmlns="urn:jboss:domain:logging:1.3">`.
        -   Add the `logger` elements as children to `<subsystem xmlns="urn:jboss:domain:logging:1.3”>` with logging configuration taken from `alfresco-content-services.ear\alfresco.war\WEB-INF\classes\log4j.properties`.

        > **Note:** For more information on logging mapping elements, see [JBoss logging](#jboss-logging).

10. Set appropriate memory values for `–Xms`, `-Xmx`, and other JVM options in:

    -   `<JBOSS_EAP_HOME>\bin\standalone.conf.bat` (for Windows) or
    -   `<JBOSS_EAP_HOME>/bin/standalone.conf` (for Unix/Linux).

11. Configure `URI_ENCODING` with UTF-8. Set the following system properties in `standalone.xml` after `extensions` tag:

    ```xml
    <system-properties>
     <property name="org.apache.catalina.connector.URI_ENCODING" value="UTF-8"/>
     <property name="org.apache.catalina.connector.USE_BODY_ENCODING_FOR_QUERY_STRING" value="true"/>
    </system-properties>
    ```

12. Disable the JBoss webservices subsystem as it conflicts with Alfresco CMIS. The following lines should be removed from `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml`:

    ```xml
    <extension module="org.jboss.as.webservices"/>
    ```

    ```xml
    <subsystem xmlns="urn:jboss:domain:webservices:1.2">
        <modify-wsdl-address>true</modify-wsdl-address>
        <wsdl-host>${jboss.bind.address:127.0.0.1}</wsdl-host>
        <endpoint-config name="Standard-Endpoint-Config"/>
        <endpoint-config name="Recording-Endpoint-Config">
          <pre-handler-chain name="recording-handlers" protocol-bindings="##SOAP11_HTTP ##SOAP11_HTTP_MTOM ##SOAP12_HTTP ##SOAP12_HTTP_MTOM">
            <handler name="RecordingHandler" class="org.jboss.ws.common.invocation.RecordingServerHandler"/>
          </pre-handler-chain>
        </endpoint-config>
    </subsystem>
    ```

13. Compress `alfresco.war`.

14. Then compress `alfresco-content-services.ear` to include the changes made.

15. Start the standalone JBoss server.

16. Set the server's IP address in the JBoss Management Console.

    1.  Open the **JBoss Management Console**.

    2.  Set the server IP address in **Profiles > General Configurations > Interfaces > Network Interfaces > Available Interfaces**.

17. Set the server IP address in all the corresponding configuration files, including `alfresco-global.properties`.

18. Deploy Alfresco Content Services.

    1.  Open the **JBoss Management Console**.

    2.  Navigate to **Runtime > Manage Deployments**.

    3.  Click the **Add** button.

    4.  Browse and select the modified alfresco-content-services-distribution-5.2.7.zip file.

    5.  After the EAR file is added, click the **Enable** button.


Alfresco Content Services is successfully deployed.

> **Note:** Oracle JMX is not supported when using JBoss EAP. This is a known issue; see JBoss issue [AS7-1859](https://issues.jboss.org/browse/AS7-1859). We recommend that you use JBoss JMX instead. For information on how to connect to the JBoss AS7 JMX MBeanServer from JConsole, see the [JBoss Developer documentation](https://community.jboss.org/wiki/UsingJconsoleToConnectToJMXOnAS7).

-   **[JBoss logging](#jboss-logging)**  
You can add logger elements to the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file for configuring JBoss logging.



###### JBoss logging

You can add logger elements to the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file for configuring JBoss logging.

```xml
<logger category="org.hibernate">
    <level name="ERROR"/>
</logger>
<logger category="org.hibernate.util.JDBCExceptionReporter">
    <level name="FATAL"/>
</logger>
<logger category="org.hibernate.event.def.AbstractFlushingEventListener">
    <level name="FATAL"/>
</logger>
<logger category="org.hibernate.type">
    <level name="WARN"/>
</logger>
<logger category="org.hibernate.cfg.SettingsFactory">
    <level name="WARN"/>
</logger>
<logger category="org.springframework">
    <level name="WARN"/>
</logger>
<logger category="org.springframework.remoting.support">
    <level name="ERROR"/>
</logger>
<logger category="org.springframework.util">
    <level name="ERROR"/>
</logger>
<logger category="org.apache.axis">
    <level name="INFO"/>
</logger>
<logger category="org.apache.ws">
    <level name="INFO"/>
</logger>
<logger category="org.apache.cxf">
    <level name="ERROR"/>
</logger>
<logger category="org.apache.myfaces.util.DebugUtils">
    <level name="INFO"/>
</logger>
<logger category="org.apache.myfaces.el.VariableResolverImpl">
    <level name="ERROR"/>
</logger>
<logger category="org.apache.myfaces.application.jsp.JspViewHandlerImpl">
    <level name="ERROR"/>
</logger>
<logger category="org.apache.myfaces.taglib">
    <level name="ERROR"/>
</logger>
<logger category="net.sf.jooreports.openoffice.connection">
    <level name="FATAL"/>
</logger>
<logger category="org.hibernate.ps.PreparedStatementCache">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.admin">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.cache.TransactionalCache">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.model.filefolder">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.tenant">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.avm">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.config">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.config.JndiObjectFactoryBean">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.config.JBossEnabledWebApplicationContext">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.management.subsystems">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory$ChildApplicationContext">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.security.sync">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.security.person">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.sample">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.web">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.webservice">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.service.descriptor.DescriptorService">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.importer.ImporterBootstrap">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.web.ui.common.Utils">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.admin.patch.PatchExecuter">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.domain.patch.ibatis.PatchDAOImpl">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.admin.patch.impl.DeploymentMigrationPatch">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.version.VersionMigrator">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.admin.patch.impl.ResetWCMToGroupBasedPermissionsPatch">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.module.ModuleServiceImpl">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.domain.schema.SchemaBootstrap">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.admin.ConfigurationChecker">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.node.index.AbstractReindexComponent">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.node.index.IndexTransactionTracker">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.node.index.FullIndexRecoveryComponent">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.node.index.AVMFullIndexRecoveryComponent">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.util.OpenOfficeConnectionTester">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.node.db.hibernate.HibernateNodeDaoServiceImpl">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.domain.hibernate.DirtySessionMethodInterceptor">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.transaction.RetryingTransactionHelper">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.util.transaction.SpringAwareUserTransaction.trace">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.util.AbstractTriggerBean">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.enterprise.repo.cluster">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.version.Version2ServiceImpl">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.workflow">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.smb.protocol">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.ftp.protocol">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.webdav.protocol">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.fileserver">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.node.integrity">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.search.Indexer">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.search.impl.lucene.index">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.search.impl.lucene.fts.FullTextSearchIndexerImpl">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.web.forms.xforms.XFormsBean">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.web.forms.XSLTRenderingEngine">
    <level name="ERROR"/>
</logger>
<logger category="alfresco.missingProperties">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.web.ui.repo.component.property.UIChildAssociation">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.web.ui.repo.component.property.UIAssociation">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.dictionary">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.dictionary.types.period">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.mbeans.VirtServerRegistry">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.util.RuntimeSystemPropertiesSetter">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.content.ReplicatingContentStore">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.content.replication">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.activities">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.usage">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.module.vti">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.forms">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.web.config.forms">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.web.scripts.forms">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.opencmis">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.opencmis.AlfrescoCmisServiceInterceptor">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.cmis">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.cmis.dictionary">
    <level name="WARN"/>
</logger>
<logger category="org.apache.chemistry.opencmis">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.imap">
    <level name="INFO"/>
</logger>
<logger category="org.springframework.extensions.webscripts">
    <level name="INFO"/>
</logger>
<logger category="org.springframework.extensions.webscripts.ScriptLogger">
    <level name="WARN"/>
</logger>
<logger category="org.springframework.extensions.webscripts.ScriptDebugger">
    <level name="OFF"/>
</logger>
<logger category="org.alfresco.repo.web.scripts">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.web.scripts.BaseWebScriptTest">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.web.scripts.AlfrescoRhinoScriptDebugger">
    <level name="OFF"/>
</logger>
<logger category="org.alfresco.repo.jscript">
    <level name="ERROR"/>
</logger>
<logger category="org.alfresco.repo.jscript.ScriptLogger">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.cmis.rest.CMISTest">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.avm.actions">
    <level name="INFO"/>
</logger>
<logger category="org.alfresco.repo.bulkimport">
    <level name="WARN"/>
</logger>
<logger category="org.alfresco.repo.content.metadata.AbstractMappingMetadataExtracter">
    <level name="WARN"/>
</logger>
<logger category="org.apache.pdfbox.pdmodel.font.PDSimpleFont">
    <level name="FATAL"/>
</logger>
<logger category="org.apache.pdfbox.pdmodel.font.PDFont">
    <level name="FATAL"/>
</logger>
<logger category="org.apache.pdfbox.pdmodel.font.PDCIDFont">
    <level name="FATAL"/>
</logger>
<logger category="org.alfresco.repo.search.impl.noindex.NoIndexIndexer">
    <level name="FATAL"/>
</logger>
<logger category="org.alfresco.repo.search.impl.noindex.NoIndexSearchService">
    <level name="FATAL"/>
</logger>
<logger category="org.alfresco.repo.search.impl.lucene.index.IndexInfo">
    <level name="WARN"/>
</logger>
```


##### Installing Solr on JBoss 6 EAP with Java 8

Use this information to install Solr on the same JBoss 6 instance on which Alfresco Content Services is installed.

Ensure that JBoss and Java 8 are installed. Review the Supported Platforms page on the [Support Portal]({% link content-services/5.2/support/index.md %}) for more information.

The following instructions:

-   Are only for Solr 1 installation; the Solr 4 server is only supported when running in a Tomcat application server.
-   Assume that you know the path of the JBoss directory, which is represented as `<JBOSS_EAP_HOME>`.
-   Are written for Windows Server 2008 R2 installation with MySQL as data source. More details for JBoss 6 EAP configuration could be found in the [JBoss Enterprise Application Platform 6](https://access.redhat.com/site/documentation/en-US/JBoss_Enterprise_Application_Platform/6/html-single/Administration_and_Configuration_Guide/index.html) guide.

Before installing Solr, ensure that:

-   Alfresco Content Services has been deployed on JBoss EAP 6.
-   JBoss server is not running.

The following instructions use `<ALF_DATA>` to refer to the value of the `dir.root` property, which specifies the directory where the content and indexes are stored.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the `alfresco-solr1-5.2.7.zip` file.

3.  Create a temporary directory (the path for it is represented as `<TEMP>`) and uncompress the zip file here.

4.  Create a JBoss module with Solr configuration.

    1.  Create a main directory at `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\`.

    2.  Copy the contents of `<TEMP>` to the `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main` directory. Do not copy the contents of the `alf_data` directory.

    3.  Copy the contents of `<TEMP>\alf_data` to `<ALFRESCO_HOME>/ALF_DATA` directory.

    4.  Add the following properties to the `alfresco-global.properties` file:

        ```bash
        index.subsystem.name=solr
        dir.keystore=${dir.root}/keystore
        encryption.ssl.keystore.type=JKS
        encryption.ssl.truststore.type=JKS
        solr.port.ssl=8443
        solr.host=<solr_host_ip_address>
        solr.port=8080
        ```

    5.  Create the `module.xml` file at `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main\` with the following content:

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
         <module xmlns="urn:jboss:module:1.0" name="org.apache.solr.configuration">
           <resources>
             <resource-root path="."/>
           </resources>
         </module>
        ```

    6.  Add the following system properties to the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file:

        ```xml
        <system-properties>
          <property name="solr.solr.home" value="<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main" />
          <property name="solr.data.dir" value="<SOLR_DATA>" />
        </system-properties>
        ```

        where `<SOLR_DATA>` is the directory where indexes would be stored.

    7.  Generate certificates that will be used for Solr and Alfresco Content Services communication. The `<ALF_DATA>\keystore\generate_keystores.bat` can be used, the only requirement is to use JKS keystores and truststores, as JBoss does not support JCEKS.

    8.  Replace the existing certificates with the newly generated certificates at the following locations:

        -   `<ALF_DATA>\keystore to <JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main\archive-SpacesStore\conf`
        -   `<ALF_DATA>\keystore to <JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main\workspace-SpacesStore\conf`

    9.  Modify the following property files with the new certificate properties:

        -   `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main\archive-SpacesStore\conf\solrcore.properties`
        -   `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main\workspace-SpacesStore\conf\solrcore.properties`

    10. Add SSL connector to the web subsystem in the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file.

        ```xml
        <subsystem xmlns="urn:jboss:domain:web:1.5" default-virtual-server="default-host" native="false">
          <connector name="https" protocol="HTTP/1.1" scheme="https" socket-binding="https" secure="true">
             <ssl name="ssl" key-alias="ssl.repo" password="kT9X6oe68t" certificate-key-file="<ALF_DATA>\keystore\ssl.keystore" protocol="TLSv1" verify-client="true"
                ca-certificate-file="<ALF_DATA>\keystore\ssl.truststore" keystore-type="JKS"
                truststore-type="JKS"/>
          </connector>
            ...
        </subsystem>
        ```

    11. Create the `roles.properties` file in the `<ALF_DATA>\keystore` directory with the following content:

        ```text
        <REPO_CERT_DNAME>=repository
        <SOLR_CLIENT_CERT_DNAME>=repoclient
        ```

        where, `REPO_CERT_DNAME` specifies the repository server certificate subject name, and `SOLR_CLIENT_CERT_DNAME` specifies the Solr client certificate subject name.

        For example, if the following certificate subject names are used:

        ```text
        REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
        SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
        ```

        then contents of the `roles.properties` file should be:

        ```text
        CN\=Alfresco\ Repository\ Client,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repoclient
        CN\=Alfresco\ Repository,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repository
        ```

    12. Add a security domain in the security subsystem in `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml`:

        ```xml
        <subsystem xmlns="urn:jboss:domain:security:1.2">
         <security-domains>
           <security-domain name="trustStore">
              <jsse truststore-password="kT9X6oe68t" truststore-type="JKS" truststore-url="<ALF_DATA>\keystore\ssl.truststore" protocols="TLSv1"/>
           </security-domain>
           <security-domain name="alfresco" cache-type="default">
              <authentication>
                <login-module code="CertificateRoles" flag="required">
                  <module-option name="securityDomain" value="java:/jaas/trustStore"/>
                  <module-option name="verifier" value="org.jboss.security.auth.certs.AnyCertVerifier"/>
                  <module-option name="rolesProperties" value="<ALF_DATA>\keystore\roles.properties"/>
                </login-module>
              </authentication>
           </security-domain>
         </security-domains>
        </subsystem>
        ```

        > **Note:** Remember to replace `<ALF_DATA>` with an actual path.

    13. Rename the WAR file to `solr.war` in the `<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main` directory.

    14. Unzip `solr.war` and update the `WEB-INF\jboss-deployment-structure.xml` file as shown below:

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <jboss-deployment-structure>
          <deployment>
            <dependencies>
              <module name="org.apache.solr.configuration"/>
            </dependencies>
          </deployment>
        </jboss-deployment-structure>
        ```

        Also, modify the `WEB-INF\jboss-web.xml` file with the following content:

        ```xml
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE jboss-web PUBLIC "-//JBoss//DTD Web Application 4.2//EN" "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
         <jboss-web>
           <security-domain>alfresco</security-domain>
        </jboss-web>
        ```

    15. Unzip the `alfresco-content-services.ear\alfresco.war` file and add the security domain to `WEB-INF\jboss-web.xml`:

        ```xml
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE jboss-web PUBLIC "-//JBoss//DTD Web Application 4.2//EN" "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
           <jboss-web>
             <resource-ref>
               <res-ref-name>jdbc/dataSource</res-ref-name>  
               <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
             </resource-ref>
             <resource-ref>
                <res-ref-name>jdbc/activitiIdGeneratorDataSource</res-ref-name>
                <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>       
             </resource-ref>
             <security-domain>alfresco</security-domain>
           </jboss-web>
        ```

    16. Re-compress the Alfresco WAR and `alfresco-content-services.ear` files.

    17. Start the standalone JBoss Web Server.

    18. Redeploy the modified Alfresco EAR file as shown is Step 14 of [Configuring JBoss for Alfresco Content Services](#configuring-jboss-for-alfresco-content-services).

5.  Deploy the Solr WAR.

    1.  Open the **JBoss Management Console**.

    2.  Navigate to **Runtime > Manage Deployments**.

    3.  Click the **Add** button.

    4.  Browse and select the modified Solr WAR file.

    5.  After the WAR file is added, click the **Enable** button.



##### Configuring on JBoss with Solr installed on a Tomcat instance

Use this information to configure Alfresco Content Services deployed on JBoss EAP 6 with Solr on a separate Tomcat instance.

Before configuring Alfresco Content Services, ensure that:

-   Solr is installed on a separate Tomcat instance. For detailed information, see [Configure Solr search service]({% link content-services/5.2/admin/search.md %}#configure-solr-search-service).
-   Alfresco Content Services has been deployed on JBoss EAP 6.
-   JBoss server is not running.

The following instructions use `<ALF_DATA>` to refer to the value of the `dir.root` property, which specifies the directory where the content and indexes are stored.

1.  Add the following properties to the `alfresco-global.properties` file:

    ```text
    index.subsystem.name=solr
    dir.keystore=${dir.root}/keystore
    encryption.ssl.keystore.type=JKS
    encryption.ssl.truststore.type=JKS
    solr.port.ssl=8443
    solr.host=<solr_host_ip_address>
    solr.port=8080
    ```

2.  Generate certificates that will be used for Solr and Alfresco Content Services communication. The `<ALF_DATA>\keystore\generate_keystores.bat` can be used, the only requirement is to use JKS keystores and truststores, as JBoss does not support JCEKS.

3.  Replace the newly generated certificates with certificates in the `<ALF_DATA>\keystore` and Solr configuration directories.

4.  Add the SSL connector to the web subsystem in the `<JBOSS_EAP_HOME>\standalone\configuration\standalone.xml` file.

    ```xml
    <subsystem xmlns="urn:jboss:domain:web:1.5" default-virtual-server="default-host" native="false">
      <connector name="https" protocol="HTTP/1.1" scheme="https" socket-binding="https" secure="true">
        <ssl name="ssl" key-alias="ssl.repo" password="kT9X6oe68t" certificate-key-file="<ALF_DATA>\keystore\ssl.keystore"
            protocol="TLSv1" verify-client="true" ca-certificate-file="<ALF_DATA>\keystore\ssl.truststore" keystore-type="JKS"
            truststore-type="JKS"/>
      </connector>
       ...
    </subsystem>
    ```

    > **Note:** Remember to replace `<ALF_DATA>` with an actual path.

5.  Create the roles.properties file in `<ALF_DATA>\keystore` with the following content:

    ```text
    <SOLR_CLIENT_CERT_DNAME>=repoclient
    ```

    where `SOLR_CLIENT_CERT_DNAME` is the Solr client certificate subject name.

    For example, if the following certificate subject name was used:

    ```text
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    ```

    then contents of `roles.properties` should be:

    ```text
    CN\=Alfresco\ Repository\ Client,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repoclient
    ```

6.  Add a security domain in the security subsystem in the `<JBOSS_EAP_HOME>\standalone\configuration\` standalone.xml file.

    ```xml
    <subsystem xmlns="urn:jboss:domain:security:1.2">
      <security-domains>    
        ...
     <security-domain name="trustStore">
      <jsse truststore-password="kT9X6oe68t" truststore-type="JKS" truststore-url="<ALF_DATA>\keystore\ssl.truststore" protocols="TLSv1"/>
     </security-domain>
     <security-domain name="alfresco" cache-type="default">
      <authentication>
        <login-module code="CertificateRoles" flag="required">
          <module-option name="securityDomain" value="java:/jaas/trustStore"/>
          <module-option name="verifier" value="org.jboss.security.auth.certs.AnyCertVerifier"/>
          <module-option name="rolesProperties" value="<ALF_DATA>\keystore\roles.properties"/>
        </login-module>
      </authentication>
     </security-domain>
    </subsystem>  
    ```

    where `<ALF_DATA>` should be substituted with an actual path.

7.  Unzip the alfresco-content-services.ear\alfresco.war file and add the security domain to the `WEB-INF\jboss-web.xml` file:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE jboss-web PUBLIC "-//JBoss//DTD Web Application 4.2//EN" "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
    <jboss-web>
      <resource-ref>
        <res-ref-name>jdbc/dataSource</res-ref-name>
        <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
      </resource-ref>
      <resource-ref>
        <res-ref-name>jdbc/activitiIdGeneratorDataSource</res-ref-name>
        <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
      </resource-ref>
      <security-domain>alfresco</security-domain>
    </jboss-web>
    ```

8.  Start the standalone JBoss Web Server.

9.  Redeploy the Alfresco EAR as we have made changes to it.


#### Installing Alfresco Content Services on WebLogic

Use this information to install Alfresco Content Services as an Enterprise Archive format (EAR) into Oracle WebLogic.

Before you start:

-   Install OpenOffice and ensure that the ooo.exe property is set in the `alfresco-global.properties` file.
-   Create an Alfresco Content Services database and user with appropriate permissions.
-   [Install WebLogic 12.2.1](http://www.oracle.com/technetwork/middleware/weblogic/downloads/index.html) without creating any domains or servers. For more information, see [Installing and Configuring Oracle WebLogic Server and Coherence](http://docs.oracle.com/middleware/1212/core/WLSIG/install_gui.htm) documentation.
-   Ensure that the installation environment meets the system requirements.
-   Install the appropriate Java 8 version according to [Oracle Fusion Middleware Supported System Configurations](http://www.oracle.com/technetwork/middleware/ias/downloads/fusion-certification-100350.html) for WebLogic 12.2.1 and relevant OS. For details, see [Verifying Certification and System Requirements](http://docs.oracle.com/middleware/1212/core/ASINS/preparing.htm#ASINS325).

> **Note:** Certain components of Alfresco Content Services require access to the EAR file contents as files. These instructions require that you expand the .ear into exploded format, as described in the WebLogic documentation. The Alfresco Content Services WebLogic deployment solution makes use of a Filter Classloader, configured in the weblogic-application.xml file, to ensure that the unmodified contents of the Alfresco Content Services web module will run in WebLogic.

The following instructions use `<Oracle_Home>` to refer to the Oracle home directory where WebLogic is installed on your system.

1.  Browse to the [Support Portal](https://support.alfresco.com){:target="_blank"}.

2.  Download and extract the Enterprise EAR file alfresco-content-services-ear-distribution-5.2.7.zip.

3.  Obtain the license (`.lic`) file.

4.  For Windows OS (except **Windows 10**), copy the `Win32NetBIOS.dll`, `Win32NetBIOSx64.dll`, `Win32Utils.dll`, and `Win32Utilsx64.dll` files from the `alfresco-content-services-ear-distribution-5.2.7.zip\bin` directory to `C:\WINDOWS\system32` directory.

5.  Create a directory in the WebLogic user's home directory to host the exploded EAR file and copy the `alfresco-content-services.ear` file to that directory.

6.  Run the following commands in the new directory to explode the EAR file:

    1.  `mkdir alfresco`

    2.  `cd alfresco`

    3.  `jar xvf ../alfresco-content-services.ear`

    4.  `mv alfresco.war alfresco.war.tmp`

    5.  `mv share.war share.war.tmp`

    6.  `mkdir alfresco.war`

    7.  `mkdir share.war`

    8.  `cd alfresco.war`

    9.  `jar xvf ../alfresco.war.tmp`

    10. `cd ../share.war`

    11. `jar xvf ../share.war.tmp`

7.  Create the WebLogic domain for Alfresco Content Services using the WebLogic Configuration Wizard.

    On Unix, use the following command to start the configuration wizard and create a new domain called `alf_domain` using the blank template:

    ```bash
    <ORACLE_HOME>/oracle_common/common/bin/config.sh
    ```

    This task assumes that the domain location is `<Oracle_Home>/user_projects/domains/alf_domain`.

    For more information, see Oracle Fusion Middleware documentation on [Creating and Configuring a WebLogic Domain](http://docs.oracle.com/middleware/1212/core/WLSIG/create_domain.htm#WLSIG284).

8.  Copy the `share-config-custom.xml` file from `alfresco-content-services-ear-distribution-5.2.7.zip/web-server/classpath/alfresco/web-extension to `<DOMAINS>/alf_domain/alfresco/web-extension`.

9.  Create a directory for the license file.

    For example, in Linux, use the following command:

    ```bash
    mkdir -p <Oracle_Home>/user_projects/domains/alf_domain/alfresco/extension/license
    ```

10. Move the license `.lic` file into the license directory.

11. In the `<Oracle_Home>/user_projects/domains/alf_domain` directory, create the `alfresco-global.properties` file.

    Modify the file in the same way you would for global properties configuration.

12. Add the following line to the `alfresco-global.properties` file.

    ```bash
    db.pool.statements.enable=false
    ```

    This property setting is required to make the DBCP connection pool work on WebLogic.

13. Configure the Oracle JDBC driver.

    1.  Download the appropriate Oracle Instant Client package for your operating system from [Oracle Database Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

    2.  Unzip the package to a local directory.

        Ensure that the path to the driver is on the WebLogic server's classpath.

        For example, to configure Oracle Thin Driver ojdbc6.jar that is located in `/opt/oracle/config`, follow the steps below:

        1.  Add the following lines to the `setDomainEnv.sh` file that is located in `<Oracle_Home>/user_projects/domains/alf_domain/bin` directory.

            ```bash
            LD_LIBRARY_PATH=/opt/oracle/config
            export LD_LIBRARY_PATH
            EXT_PRE_CLASSPATH=$LD_LIBRARY_PATH/ojdbc6.jar
            export EXT_PRE_CLASSPATH
            ```

        2.  Add the following line to the `alfresco-global.properties` file: 

            ```text
            db.url=jdbc:oracle:thin:@${db.host}:1521:${db.name}
            ```

14. Update the setDomainEnv.sh file for the following parameters:

    1.  Heap size parameter

        ```
        WLS_MEM_ARGS_64BIT=-Xmx2048m
        WLS_MEM_ARGS_32BIT=-Xmx1024m
        ```

        We recommend that you set this parameter.

    2.  `JAVA_OPTIONS` parameter

        -   Use the `-Dweblogic.disableMBeanAuthorization` system property to disable servicing of Platform MbeanServer with the WLS security infrastructure.
        -   The JAXBContext provider is used by the JAXB provider for the JAXB-related tasks. To configure the JAXB providers, set the Java system property, `-Djavax.xml.bind.JAXBContext` to `com.sun.xml.bind.v2.ContextFactory`.
        ```
        JAVA_OPTIONS=”${JAVA_OPTIONS} -Dweblogic.disableMBeanAuthorization=true”
        JAVA_OPTIONS=”${JAVA_OPTIONS} -Djavax.xml.bind.JAXBContext=com.sun.xml.bind.v2.ContextFactory"
        ```

        This modification will allow Alfresco Content Services MBeans to co-exist with WebLogic MBeans.

    3.  `alf_domain` location

        Ensure that `alf_domain` is in the global classpath.

        ```text
        PRE_CLASSPATH="<Oracle_Home>/user_projects/domains/alf_domain"
        export PRE_CLASSPATH
        ```

15. Edit the `<Oracle_Home>/user_projects/domains/alf_domain/config/config.xml` file and add the following before the end of the `</security-configuration>` section:

    ```xml
    <enforce-valid-basic-auth-credentials>false</enforce-valid-basic-auth-credentials>
    ```

16. Open the `<Oracle_Home>/user_projects/domains/alf_domain/nodemanager/nodemanager.properties` file, and then edit the settings so that the `setDomainEnv` settings are passed on to the Alfresco Content Services server by the node manager.

    ```text
    StartScriptEnabled=true
    ```

    If the Node Manager type is set as `Plain (non SSL)` when creating a new machine in Step 19(e), then the `NodeManager` should be configured with the `SecureListener=false` property.

17. Start the domain admin server and node manager.

    For example:

    ```text
    <Oracle_Home>/user_projects/domains/alf_domain/bin/startWebLogic.sh
    <Oracle_Home>/user_projects/domains/alf_domain/bin/startNodeManager.sh
    ```

18. Open a web browser and log in to the admin server (for example, at http://localhost:7001/console) with the credentials that you specified while configuring WebLogic domain.

19. Create a new `Machine` and a `Server` for running Alfresco Content Services. This will allow you to stop and start Alfresco Content Services without having to restart WebLogic.

    1.  In the left pane of the Administration Console under `alf_domain`, open up the Environment section and then click **Machines**.

    2.  In the right pane, click **New**.

    3.  Optionally, change the **Name and Machine OS**.

    4.  Click **Next**.

    5.  Depending on how the Node manager is configured, you may need to change the default **Type** from `SSL` to say `Plan`.

    6.  Click **Finish**.

    7.  In the left pane, click **Servers**.

    8.  In the right pane, click **New**.

    9.  Change the **Server Name** to `AlfrescoServer`.

    10. Choose a unique **Server Listen Port**. A good port number to choose is `8080` because it is preconfigured in Share.

    11. You can leave the host name blank if you want it to listen on all network adapters.

    12. Click **Finish**.

    13. Click on `AlfrescoServer` and change the **Machine** to be the one just created.

    14. Click **Save**.

20. Deploy the war files to the `AlfrescoServer`.

    1.  In the left pane of the Administration Console under `alf_domain`, click **Deployments**.

    2.  In the right pane, click **Install**.

    3.  Locate and select the directory of your exploded EAR file (created in Step 5). It should contain the alfresco.war and share.war.

    4.  Click **Next**.

    5.  Check **Install this deployment as an application**.

    6.  Click **Next**.

    7.  Select `AlfrescoServer`.

    8.  Click **Next**.

    9.  Click **Finish**. The page refresh will take a few seconds and there should be a message indicating the deployment was successful.

    10. In the left pane under **alf_domain** and **Environment**, click **Servers**.

    11. In the right pane, click the **Control** tab.

    12. Check **AlfrescoServer**.

    13. Click **Start**. There should be a message to indicate a request has been sent to the Node Manager to start the selected server.

21. To enable JMX functionality, enable the Platform MBean server and then restart the AdminServer:

    1.  In the left pane of Administration Console, click the domain name link, for example, `alf_domain`.

    2.  In the General Configuration tab in the right pane, expand the **Advanced** options group.

    3.  Check the **Platform MBean Server Enabled** checkbox.

    4.  Ensure that the **Platform MBean Server Used** checkbox is checked.

    5.  Click **Save**.

    6.  In the left pane under `alf_domain` and **Environment**, click **Servers**.

    7.  In the right pane, click the **Control** tab.

    8.  Check the **AlfrescoServer(admin)** checkbox.

    9.  Select **Force shutdown now** from the **Shutdown** control.

    10. Once it has shutdown, run the starWebLogic.sh script again as shown in Step 17.

22. Log in to Alfresco Share at http://localhost:8080/share.


> **Note:** If Alfresco Content Services finds a JDBC data source with JNDI path (`java:comp/env/jdbc/dataSource`), it uses this data source instead of the embedded data source. To set up the embedded data source in WebLogic,

1.  Define a new global data source, for example, `AlfrescoDataSource`. See the WebLogic documentation for more information
2.  Map `AlfrescoDataSource` into Alfresco Content Services by updating the `WEB-INF/weblogic.xml` file in `alfresco.war` containing the following resources:

```xml
<!DOCTYPE weblogic-web-app PUBLIC "-//BEA Systems, Inc.//DTD WebApplication 8.1//EN"
"http://www.bea.com/servers/wls810/dtd/weblogic810-web-jar.dtd">
<weblogic-web-app>
   <resource-description>
      <res-ref-name>AlfrescoDataSource</res-ref-name>
      <jndi-name>jdbc/dataSource</jndi-name>
   </resource-description>
</weblogic-web-app>
```

-   **[Configuring Solr 4 with Alfresco Content Services running on WebLogic](#configuring-solr-4-with-alfresco-content-services-running-on-weblogic)**  
These instructions describe how to configure Solr 4 to communicate with Alfresco Content Services deployed on WebLogic.
-   **[Enabling Google Docs with Alfresco Content Services deployed on WebLogic](#enabling-google-docs-with-alfresco-content-services-deployed-on-weblogic)**  
Follow these steps to enable Google Docs for Alfresco Content Services running on WebLogic.


##### Configuring Solr 4 with Alfresco Content Services running on WebLogic

These instructions describe how to configure Solr 4 to communicate with Alfresco Content Services deployed on WebLogic.

Solr 4 must be deployed on a separate Tomcat instance.

-   Configure Solr 4 using these instructions: [Configure Solr search service]({% link content-services/5.2/admin/search.md %}#configure-solr-search-service).

> **Note:** The SSL certificate provided with your Alfresco Content Services installation will not work on WebLogic. You need to generate a new SSL certificate for Solr to work correctly. For more information, see the instructions in [Generating secure keys for Solr communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

Ensure that Alfresco Content Services is installed on WebLogic using the instructions described in [Installing Alfresco Content Services on WebLogic](#installing-alfresco-content-services-on-weblogic).

1.  Edit the `<Weblogic_HOME>/user_projects/domains/alf_domain/alfresco-global.properties` file, and add the following properties:

    ```text
    dir.keystore=<Weblogic_HOME>/user_projects/domains/alf_domain/keystore
    index.subsystem.name=solr4
    solr.host=<SOLR_HOST>
    solr.port=8080     
    solr.port.ssl=8443
    ```

2.  Create and populate a keystore directory for the Alfresco Content Services and Solr servers.

    1.  Create a folder called `<Weblogic_HOME>/user_projects/domains/alf_domain/keystore`.

        > **Note:** At this stage, the keystore directory will just be a template, containing standard keys that are incompatible with Weblogic.

    2.  Copy all the files from `<SOLR_HOME>/alf_data/keystore` to this new folder.

        > **Note:** To secure the installation, you must follow the steps to generate new keys as explained in  [Generating secure keys for Solr communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

3.  Open the WebLogic Admin Console:

    1.  Go to **Environment – Servers – AlfrescoServer – Configuration – General**.

    2.  Select the **SSL Listen Port Enabled** checkbox and then enter **8443** in the **SSL Listen Port** field.

    3.  Click **Save**.

    4.  On the **Keystores** tab, click **Change** and then select the **Custom Identity and Custom Trust** value in drop down menu.

    5.  Click **Save**.

    6.  In the **Identity** section, enter following parameter values:

        ```text
        Custom Identity Keystore:
        <Weblogic_HOME>/user_projects/domains/alf_domain/keystore/ssl.keystore
        Custom Identity Keystore Type:   JCEKS
        Custom Identity Keystore Passphrase:   kT9X6oe68t
        Confirm Custom Identity Keystore Passphrase:   kT9X6oe68t
        ```

    7.  In the **Trust** section provide following parameters:

        ```text
        Custom Trust Keystore: <Weblogic_HOME>/user_projects/domains/alf_domain/keystore/ssl.truststore
        Custom Trust Keystore Type:  JCEKS
        Custom Trust Keystore Passphrase:   kT9X6oe68t
        Confirm Custom Trust Keystore Passphrase:   kT9X6oe68t 
        ```

    8.  Click **Save**.

    9.  Select the **SSL** tab and then enter the following fields:

        ```text
        Private Key Alias:   ssl.repo     
        Private Key Passphrase:   kT9X6oe68t     
        Confirm Private Key Passphrase:  kT9X6oe68t
        ```

    10. Click **Save**.

    11. Expand the Advanced link and then enter the following fields:

        ```text
        Two Way Client Cert Behavior: Client Certs Requested But Not Enforced     
        ```

    12. Click **Save**.

4.  Test that Alfresco Content Services can now be accessed over SSL.

    For example, enter https://localhost:8443/alfresco.

5.  In the WebLogic Admin Console, go to **Security Realms – myrealm – Providers – Authentication – DefaultIdentityAsserter**.

    1.  In Available Types: select X.509 and move it to the Chosen: list.

    2.  Click **Save**.

    3.  Select the **Provider Specific** tab and fill following parameters as below:

        ```text
        Default User Name Mapper Attribute Delimiter: , (Comma)     
        Default User Name Mapper Attribute Type: CN     
        Use Default User Name Mapper: true (check the checkbox).
        ```

    4.  Click **Save**.

6.  Restart AdminServer and AlfrescoServer.

7.  In the WebLogic Admin Console, go to **Security Realms – myrealm – Users and Groups - Users**.

8.  Click **New**.

9.  In Create a New User page fill following parameters as below:

    ```text
    Name:   Alfresco Repository Client     
    Password:   kT9X6oe68t     
    Confirm Password:    kT9X6oe68t     
    ```

10. Click **OK**.   

11. To complete the installation, it is necessary to secure the two-way communication between Alfresco Content Services and Solr by generating your own keys. For details, see [Generating secure keys for Solr communication]({% link content-services/5.2/admin/search.md %}#generating-secure-keys-for-solr-communication).

12. Restart the Alfresco Content Services server.



##### Enabling Google Docs with Alfresco Content Services deployed on WebLogic

Follow these steps to enable Google Docs for Alfresco Content Services running on WebLogic.

1.  Ensure you have downloaded and installed the Google Docs amp files.

    See [Installing Google Docs Integration manually](#installing-google-docs-integration-manually) for more information.

2.  In the Change Center, click **Lock and Edit**.

    For more information, see [Use the Change Center](http://docs.oracle.com/cd/E12839_01/apirefs.1111/e13952/taskhelp/console/UseTheChangeCenter.html).

3.  Expand **Environment** and select **Servers**.

4.  Select **Configuration > SSL**, and then click **Advanced**.

5.  In the AlfrescoServer > Keystores choose the **Custom Identity and Java Standard Trust** keystore.

6.  Set the **Hostname Verification** field to **None**.

    Oracle recommends leaving host name verification on in production environments.

7.  Select **Use JSSE SSL**.

8.  Click **Save**.

9.  Restart the server.



#### Installing Alfresco Content Services on WebSphere

Use this information to install Alfresco Content Services on WebSphere 8.5.5.

Before you start:

-   These instructions are valid for installing on Linux (SUSE 11.3 and SUSE 12) and Windows 2008
-   See the [Support Portal](http://support.alfresco.com) for the currently required Service Pack to ensure that both the application server and JDK components are applied
-   Install IBM WebSphere 8.5.5

1.  Download the Enterprise EAR file `alfresco-content-services-ear-distribution-5.2.7.zip` from the Support Portal and extract it to an empty directory.

    This embeds Alfresco Content Services, plus the necessary WebSphere configuration to use the myfaces1_1 shared library with parent-last loading order.

2.  Create a new folder for your shared library; for example:

    ```text
    $(WAS_INSTALL_ROOT)/httpcore 
    ```

    Due to library conflicts with WebSphere, this must be an isolated shared library with classes used by Share.

3.  From the directory where you extracted Enterprise EAR (`alfresco-enterprise.ear\share.war\WEB-INF\lib`), copy the `httpclient-<version>.jar` and `httpcore-<version>.jar` files to your new shared library folder, `$(WAS_INSTALL_ROOT)/httpcore`.

4.  Create a Myfaces v1.1 shared library.

    Because neither of the versions of JSF that ship with WebSphere are compatible with Alfresco Content Services, you must define a new isolated shared library in WebSphere that contains a compatible implementation. This is documented in the Configuring JavaServer Faces implementation section of the WebSphere documentation. The Alfresco .ear file embeds an appropriate shared library definition in `META-INF/ibmconfig`, so it is only necessary to prepare WebSphere.

    Copy and extract the `myfaces1_1-websphere-shared-lib-version.zip` file to the root WebSphere installation directory. This creates a `myfaces1_1` directory containing all the `.jars` required by the `myfaces1_1` shared library on WebSphere. For example, on Windows:

    ```bash
    cd /d "C:\Program Files\IBM\WebSphere\AppServer"
    java\bin\jar xvf myfaces1_1-websphere-shared-lib.zip
    ```

5.  If you are using Windows, copy the `Win32NetBIOS.dll`, `Win32NetBIOSx64.dll`,`Win32Utils.dll` and `Win32Utilsx64.dll` files from the alfresco-content-services-ear-distribution-5.2.7.zip\bin directory to the C:\WINDOWS\system32 directory.

6.  Enable Xalan as the standard JAXP transformer.

    1.  Copy the `$WAS_INSTALL_ROOT/java/jre/lib/jaxp.properties.sample` file (for example, `C:\Program Files\IBM\WebSphere\AppServer\java\jre\lib\jaxp.properties.sample`) to $`WAS_INSTALL_ROOT/java/jre/lib/jaxp.properties`.

    2.  Edit the `jaxp.properties` file as follows:

        ```text
        javax.xml.transform.TransformerFactory=org.apache.xalan.processor.TransformerFactoryImpl
        ```

        ```text
        javax.xml.parsers.DocumentBuilderFactory=org.apache.xerces.jaxp.DocumentBuilderFactoryImpl
        ```

        > **Note:** Remove any trailing spaces before saving your file.

7.  Configure Share to point to the WebSphere default HTTP port 9080 (or another number that you wish to specify).

    1.  Locate the `/web-server/classpath/alfresco/web-extension/share-config-custom.xml.sample` file from the extracted `alfresco-content-services-ear-distribution-5.2.7.zip` file.

    2.  Copy the `share-config-custom.xml.sample` file to `$WAS_INSTALL_ROOT/lib/alfresco/web-extension/share-config-custom.xml` (For example, `C:\Program Files\IBM\WebSphere\AppServer\lib\alfresco\web-extension\share-config-custom.xml`).

    3.  Uncomment this section by removing the begin comment `<--` and end comment `-->` lines surrounding this section.

        ```xml
          <config evaluator="string-compare" condition="Remote">
              <remote>
                 <endpoint>
                    <id>alfresco-noauth</id>
                    <name>Alfresco - unauthenticated access</name>
                    <description>Access to Alfresco Repository WebScripts that do not require authentication</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>none</identity>
                 </endpoint>
        
                 <endpoint>
                    <id>alfresco</id>
                    <name>Alfresco - user access</name>
                    <description>Access to Alfresco Repository WebScripts that require user authentication</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <identity>user</identity>
                 </endpoint>
        
                 <endpoint>
                    <id>alfresco-feed</id>
                    <name>Alfresco Feed</name>
                    <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description>
                    <connector-id>http</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
                    <basic-auth>true</basic-auth>
                    <identity>user</identity>
                 </endpoint>  
                    
                 <endpoint>
                    <id>alfresco-api</id>
                    <parent-id>alfresco</parent-id>
                    <name>Alfresco Public API - user access</name>
                    <description>Access to Alfresco Repository Public API that require user authentication.
                      This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                    <connector-id>alfresco</connector-id>
                    <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                    <identity>user</identity>
                 </endpoint>
              </remote>
           </config>
        ```

    4.  Edit the file, replacing all instances of 8080 with 9080 (or the port number that you specify) and all instances of `yourserver` with localhost (or a different host running Alfresco Content Services).

    5.  In certain environments, an HTTP request originating from Flash cannot be authenticated using an existing session. For these cases, it is useful to disable the Flash-based uploader for Share Document Libraries.

        To disable the Flash uploader, add the following lines to the Document Library config section:

        ```xml
        <!-- Document Library config section --> 
           <config evaluator="string-compare" condition="DocumentLibrary" replace="true"> 
              <!-- 
                 File upload configuration 
              --> 
              <file-upload> 
                 <adobe-flash-enabled>false</adobe-flash-enabled> 
              </file-upload> 
           </config>
        ```

    6.  Save the file.

8.  In the `web.xml` file from the alfresco.war,  remove the `<dispatcher>REQUEST</dispatcher>` parameter from the Global Localization Filter configuration section.

9.  Install a license.

    If you have been issued with a `.lic` license file for this version of Alfresco Content Services, copy it to a `$WAS_INSTALL_ROOT/lib/alfresco/extension/license` directory (for example, `C:\Program Files\IBM\WebSphere\AppServer\lib\alfresco\extension\license\mylicense.lic`).

10. Define the environment information using the extension classpath mechanism and the `alfresco-global.properties` file.

    1.  Locate the `/web-server/classpath/alfresco-global.properties.sample` file from the extracted `alfresco-content-services-ear-distribution-5.2.7.zip` file.

    2.  Copy the `alfresco-global.properties.sample` file to `$WAS_INSTALL_ROOT/lib`, removing the `.sample` extension.

        For example, `C:\Program Files\IBM\WebSphere\AppServer\lib\alfresco-global.properties`.

    3.  Disable the `mbean` server lookup by adding the following property `mbean.server.locateExistingServerIfPossible=false`.

    4.  Uncomment and edit the lines appropriate for your database type.

11. Copy the JDBC driver jar to the `${WAS_INSTALL_ROOT}/lib` directory. 

    For example, `C:\ProgramFiles\IBM\WebSphere\AppServer\lib`.

12. Install the EAR file.

    1.  Log on to the WebSphere Administrative console.

        For example, http://localhost:9060/ibm/console/

    2.  Navigate to **Application servers > server1 > Process definition > Java Virtual Machine**, and then set the Maximum heap size to 2048 MB.

    3.  Navigate to **Application servers > server1 > Container Settings >Web Container Settings >Web container transport chains**.

        -   Click **HttpQueueInboundDefault (where port is 9080)**.
        -   Click**HTTP inbound channel (HTTP_2) Custom properties**.
        -   Create a new property with the name `CookiesConfigureNoCache` and set the value to false.
    4.  Navigate to **Applications > New Application > New Enterprise Application**.

    5.  Browse to `alfresco-content-services.ear` on the local file system, and then click **Next**.

    6.  Select **Detailed - Show all installation options and parameters**, and then click **Next**.

    7.  When you reach the **Map environment entries for Web modules** step, change the following:

        -   For `properties/dir.root`, specify an absolute file system path where you would like Alfresco Content Services file data to be stored. For example, `C:\alf_data`.
        -   Leave the Hibernate properties blank, unless you want to override the default behavior, where they will be auto-detected.
    8.  Click **Next** and **Finish**.

    9.  Save your profile changes to the master repository.

    10. To configure the new shared library, login to the WebSphere Administrative console.

        For example, http://localhost:9060/ibm/console/.

    11. Navigate to **Environment > Shared** libraries.

    12. Choose server with Alfresco application for scope and create a new shared library.

    13. Specify the name for the new shared library (for example, httpcore).

    14. Specify the folder name (for example, `$(WAS_INSTALL_ROOT)/httpcore`) in the classpath.

    15. Check **Use an isolated class loader for this shared library**.

    16. Click Apply and Save.

    17. Navigate to **Applications > Application Types > WebSphere Enterprise applications > Alfresco > References > Shared** library references.

    18. Check **Alfresco Project Slingshot module**.

        Do not check Alfresco Content Services application.

    19. Click **Reference shared libraries**.

    20. Add httpcore shared library (or your specified shared library name) to the selected column.

    21. Click **OK** and save changes to the master configuration.

    22. Restart the WebSphere server.

        Alfresco Content Services starts with the WebSphere server.

13. Remove the SQL warning messages from log file.

    WebSphere shows warnings in the log file, similar to the following:

    ```text
    [12/7/10 17:24:42:206 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings SQL Warning: 4474, SQLState: 01000 
    [12/7/10 17:24:42:208 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings [jcc][t4][10217][10310][4.8.87] 
    Connection read-only mode is not enforceable after the connection has been established. 
    To enforce a read only connection, set the read-only data source or connection property. ERRORCODE=4474, SQLSTATE=01000
    ```

    The current driver implementation will display these warnings, however, they have no impact on the operation of Alfresco Content Services. You can either choose to ignore these warnings, or you can configure the logging to stop them displaying.

    1.  Open WebSphere Administrative Console.

    2.  Navigate to **Troubleshooting > Logs** and **trace- Server - Change Log Detail Levels**.

    3.  Search for the `org.hibernate.util.*` component.

    4.  Set `org.hibernate.util.JDBCExceptionReporter` class logger - Messages and Trace Levels to `severe` or `fatal`.

14. Log in to Alfresco Share: `http://localhost:9080/share`


-   **[Configuring Solr with Alfresco Content Services running on WebSphere](#configuring-solr-with-alfresco-content-services-running-on-websphere)**  
Use this information to configure Solr to communicate with Alfresco Content Services deployed on WebSphere.
-   **[Enabling Google Docs with Alfresco Content Services deployed on WebSphere](#enabling-google-docs-with-alfresco-content-services-deployed-on-websphere)**  
Use this information to enable Google Docs with Alfresco Content Services deployed on WebSphere.


##### Configuring Solr with Alfresco Content Services running on WebSphere

Use this information to configure Solr to communicate with Alfresco Content Services deployed on WebSphere.

Solr must be deployed on a separate Tomcat instance.

-   Configure Solr using the following instructions: [Configure Solr search service]({% link content-services/5.2/admin/search.md %}#configure-solr-search-service).
-   Ensure that Alfresco Content Services is installed on WebSphere using the instructions described in [Installing Alfresco Content Services on WebSphere](#installing-alfresco-content-services-on-websphere).

1.  Generate a keystore for the Solr host and export the self signed certificate using the below script:

    > **Note:** Set `ALFRESCO_HOME` to the right location in your installation.

    ```text
    @rem Please edit the variables below to suit your installation
    @rem Note: for an installation created by the Alfresco installer, you only need to edit ALFRESCO_HOME 
    
    @rem Alfresco installation directory
    set ALFRESCO_HOME=C:\alfresco-one
    set JAVA_HOME=%ALFRESCO_HOME%\java
    @rem Location in which new keystore files will be generated
    set CERTIFICATE_HOME=%USERPROFILE%
    @rem The repository server certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repository"
    set REPO_CERT_DNAME=CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    @rem The SOLR client certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repoclient"
    set SOLR_CLIENT_CERT_DNAME=CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    @rem The number of days before the certificate expires
    set CERTIFICATE_VALIDITY=36525
    
    @rem Ensure certificate output dir exists
    @if not exist "%CERTIFICATE_HOME%" mkdir "%CERTIFICATE_HOME%"
    
    @rem Generate new self-signed certificates for solr
    "%JAVA_HOME%\bin\keytool" -genkeypair -keyalg RSA -dname "%SOLR_CLIENT_CERT_DNAME%" -validity %CERTIFICATE_VALIDITY% -alias ssl.repo.client -keypass kT9X6oe68t 
    -keystore "%CERTIFICATE_HOME%\ssl.repo.client.keystore" -storetype JCEKS -storepass kT9X6oe68t"%JAVA_HOME%\bin\keytool" 
    -exportcert -alias ssl.repo.client -file "%CERTIFICATE_HOME%\ssl.repo.client.crt" 
    -keystore "%CERTIFICATE_HOME%\ssl.repo.client.keystore" -storetype JCEKS -storepass kT9X6oe68t
    ```

2.  Transfer the generated `ssl.repo.client.crt` to the WebSphere host.

3.  Generate a keystore for the repository in the WebSphere host and export the self signed certificate using the following script:

    > **Note:** Set `JAVA_HOME` to the right location in the WebSphere installation.

    ```text
    #! /bin/sh
    
    # Please edit the variables below to suit your installation
    
    # Set JAVA_HOME to the JDK used by WebSphere
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository"
    REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for the repository
    "$JAVA_HOME/bin/keytool" -genkeypair -keyalg RSA -dname "$REPO_CERT_DNAME" -validity
    $CERTIFICATE_VALIDITY -alias ssl.repo -keypass kT9X6oe68t -keystore
    "$CERTIFICATE_HOME/ssl.keystore" -storetype JCEKS -storepass kT9X6oe68t
        
    "$JAVA_HOME/bin/keytool" -exportcert -alias ssl.repo -file
    "$CERTIFICATE_HOME/ssl.repo.crt" -keystore "$CERTIFICATE_HOME/ssl.keystore" -storetype JCEKS -storepass kT9X6oe68t
    ```

4.  Transfer the generated `ssl.repo.crt` to the Solr host.

5.  Import the transferred `ssl.repo.client.crt` and the generated `ssl.repo.crt` to the repository truststore on WebSphere using the following script:

    > **Note:** Set `JAVA_HOME` to the right location in the WebSphere installation.

    ```text
    #! /bin/sh
    
    #Please edit the variables below to suit your installation
    
    # Set JAVA_HOME to the JDK used by WebSphere
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository"
    REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for the repository and solr
    "$JAVA_HOME/bin/keytool" -importcert -noprompt -alias ssl.repo.client -file
    "$CERTIFICATE_HOME/ssl.repo.client.crt" -keystore "$CERTIFICATE_HOME/ssl.truststore" -storetype JCEKS -storepass kT9X6oe68t
    
    "$JAVA_HOME/bin/keytool" -importcert -noprompt -alias ssl.repo -file "$CERTIFICATE_HOME/ssl.repo.crt" 
    -keystore "$CERTIFICATE_HOME/ssl.truststore" -storetype JCEKS -storepass kT9X6oe68t
    ```

6.  In the Solr host, import the transferred `ssl.repo.crt` to the Solr truststore using the following script:

    > **Note:** Set `ALFRESCO_HOME` to the right location in your installation.

    ```text
    @rem Please edit the variables below to suit your installation
    
    @rem Note: for an installation created by the Alfresco installer, you only need to edit ALFRESCO_HOME
    
    @rem Alfresco installation directory
    
    set ALFRESCO_HOME=C:\alfresco-one
    
    set JAVA_HOME=%ALFRESCO_HOME%\java
    
    @rem Location in which new keystore files will be generated
    
    set CERTIFICATE_HOME=%USERPROFILE%
    
    @rem The repository server certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repository"
    
    set REPO_CERT_DNAME=CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    
    @rem The SOLR client certificate subject name, as specified in tomcat\conf\tomcat-users.xml with roles="repoclient"
    
    set SOLR_CLIENT_CERT_DNAME=CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB
    
    @rem The number of days before the certificate expires
    
    set CERTIFICATE_VALIDITY=36525
    
    @rem Ensure certificate output dir exists
    
    @if not exist "%CERTIFICATE_HOME%" mkdir "%CERTIFICATE_HOME%"
        
    "%JAVA_HOME%\bin\keytool" -importcert -noprompt -alias ssl.repo -file
    "%CERTIFICATE_HOME%\ssl.repo.crt" -keystore "%CERTIFICATE_HOME%\ssl.repo.client.truststore" -storetype JCEKS 
    -storepass kT9X6oe68t
    ```

7.  Optionally, generate `browser.p12` for use with the browser using the following script:

    ```text
    #! /bin/sh
    
    # Please edit the variables below to suit your installation
    
    # Note: for an installation created by the Alfresco installer, you only need to edit `ALFRESCO_HOME`
    JAVA_HOME=/opt/alfresco/IBM/WebSphere/AppServer/java_1.7_64
    
    # Location in which new keystore files will be generated
    CERTIFICATE_HOME=$HOME
    
    # The repository server certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repository
    "REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The SOLR client certificate subject name, as specified in tomcat/conf/tomcat-users.xml with roles="repoclient"
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    
    # The number of days before the certificate expires
    CERTIFICATE_VALIDITY=36525
    
    # Ensure certificate output dir exists
    mkdir -p "$CERTIFICATE_HOME"
    
    # Generate new self-signed certificates for browser
    "$JAVA_HOME/bin/keytool" -importkeystore -srckeystore "$CERTIFICATE_HOME/ssl.keystore" -srcstorepass kT9X6oe68t 
    -srcstoretype JCEKS -srcalias ssl.repo -srckeypass kT9X6oe68t -destkeystore
    "$CERTIFICATE_HOME/browser.p12" -deststoretype pkcs12 -deststorepass alfresco -destalias ssl.repo -destkeypass alfresco
    ```

8.  In the WebSphere host, copy `ssl.keystore` and `ssl.truststore` from `$HOME` to `<WEBSPHERE_HOME>/alf_data/keystore` directory.

9.  In the Solr host, copy `ssl.repo.client.keystore` and `ssl.repo.client.truststore` from the user home directory (for example, `c:\Users\<username>`) to the following two folders:

    -   `<ALFRESCO_HOME>/SOLR4/archive-SpacesStore/conf`
    -   `<ALFRESCO_HOME>/SOLR4/workspace-SpacesStore/conf`

10. Edit the `solrcore.properties` (in the Solr host) for archive-Spacestore (`<ALFRESCO_HOME>/SOLR4/archive-SpacesStore/conf`) and workspace-Spacestore (`<ALFRESCO_HOME>/SOLR4/workspace-SpacesStore/conf`)to specify the WebSphere host, port, and SSL port.

    For example:

    ```text
    alfresco.host=KAlfWebsphere
    alfresco.port=8080
    alfresco.port.ssl=9443
    ```

11. On the WebSphere host, edit the `alfresco-global.properties` file to include the Solr host, port, and SSL port.

    For example:

    ```text
    index.subsystem.name=solr4
    solr.host=kavdesktop
    solr.port=8080
    solr.port.ssl=8443
    solr.secureComms=https
    encryption.keystore.provider=IBMJCE 
    encryption.ssl.keystore.provider=IBMJCE 
    encryption.ssl.truststore.provider=IBMJCE
    ```

12. Add the JVM option `-Dhttps.protocols="TLSv1"` to Tomcat to make JDK 1.8 use `TLSv1`.

13. Edit server.xml `SSL CONNECTOR` to change the keystores to the repository client keystores.

    Solr is now communicating with the WebSphere host, so the existing repository keystores are not valid.

    ```xml
    <Connector port="8443" URIEncoding="UTF-8" protocol="org.apache.coyote.http11.Http11Protocol" 
    SSLEnabled="true"  maxThreads="150" scheme="https"
     keystoreFile="C:/alfresco-one/solr4/archive-SpacesStore/conf/ssl.repo.client.keystore"
     keystorePass="kT9X6oe68t" keystoreType="JCEKS" secure="true" connectionTimeout="240000"
     truststoreFile="C:/alfresco-one/solr4/archive-SpacesStore/conf/ssl.repo.client.truststore"
     truststorePass="kT9X6oe68t" truststoreType="JCEKS" clientAuth="want" sslProtocol="TLS"
     allowUnsafeLegacyRenegotiation="true" maxHttpHeaderSize="32768" maxSavePostSize="-1" />
    ```

14. In the WebSphere Administration Console, go to **Security > SSL certificate and key management > Key stores and certificates**, and then select **New**.

15. Specify the following parameters and then select **OK**.

    ```text
    **Name:** AlfrescoKeyStore 
    **Path:** <WAS_INSTALL_ROOT>/alf_data/keystore/ssl.keystore
    **Password:** kT9X6oe68t
    **Confirm password:** kT9X6oe68t
    **Type:** JCEKS
    ```

    Save the changes to the master configuration.

16. Create another keystore using following parameters:

    ```text
    **Name:** AlfrescoTrustStore
    **Path:** <WAS_INSTALL_ROOT>/alf_data/keystore/ssl.truststore
    **Password:** kT9X6oe68t
    **Confirm password:** kT9X6oe68t
    **Type:** JCEKS  
    ```

    Save the changes to the master configuration.

17. Go to **Security > SSL certificate and key management > SSL configurations > NodeDefaultSSLSettings**, and make the following updates:

    1.  Specify AlfrescoTrustStore as the **Trust store name**.

    2.  Specify AlfrescoKeyStore as the **Keystore name**.

    3.  Click **Get certificate aliases** and then select **OK**.

    4.  Under **Additional Properties**, select **Quality of protection (QoP)**.

    5.  Set **Client Authentication** to **Supported**.

    6.  Set **Protocol** to **TLS**.

    7.  Select **OK**.

    8.  Save the changes to the master configuration.



##### Enabling Google Docs with Alfresco Content Services deployed on WebSphere

Use this information to enable Google Docs with Alfresco Content Services deployed on WebSphere.

1.  Log into the WebSphere Administrative Console.

2.  Navigate to **Security > SSL certificate and key management > Configuration settings > Manage endpoint security configurations**.

3.  Select the appropriate outbound configuration to get to your server.

    For example, **(cell):SwSt4-AS1-119Node01Cell:(node):SwSt4-AS1-119Node01 management scope**.

4.  Under **Related Items**, click **Key stores and certificates** and select the **AlfrescoTrustStore** key store.

5.  Under **Additional Properties**, click **Signer certificates and Retrieve From Port**.

6.  Click **Retrieve From Port**.

7.  In the **Host field**, enter the host address: google.com

8.  In the **Port** field, enter 443.

9.  In the **Alias field**, enter the alias: google.com_cert

10. Click **Retrieve Signer Information**.

11. Verify that the certificate information is for a certificate that you can trust.

12. Click **Apply**.

13. Click **Save**.

14. Restart your application server.


### Tailoring your installation

When installing Alfresco Content Services, an important part of the configuration process is the removal of any unused applications. Use this information to determine any applications that you might want to remove from your installation and how to remove them.

For example, if you want a Share-only tier, remove the Alfresco WAR file and any Solr configurations. Likewise, if you want an Alfresco-only tier, remove the Alfresco Share WAR file and any Solr configurations.

Alternatively, consider using the Share Installer or the Platform Installer instead of the Alfresco Content Services Installer. See [Installing](#installing) for more information.

-   **[Removing the alfresco.war file](#removing-the-alfresco.war-file)**  
 The Alfresco WAR file is a bundle file containing the required WAR files, additional commands, configuration files, and licenses for a manual installation. Use this information to remove the alfresco.war file from your application.
-   **[Removing the share.war file](#removing-the-share.war-file)**  
Use this information to remove the share.war file from your application.

#### Removing the alfresco.war file

The Alfresco WAR file is a bundle file containing the required WAR files, additional commands, configuration files, and licenses for a manual installation. Use this information to remove the alfresco.war file from your application.

If you want a Share-only tier in your application, you will need to delete the alfresco.war file from your application server. The alfresco.war file is stored in the `<TOMCAT-HOME>` directory.

1.  Navigate to `<TOMCAT_HOME>/webapps` directory.

2.  Delete the alfresco.war file.


You have successfully removed the `alfresco.war` file from your application server.

**What to do next:**

[**Go to Parent topic:** Remove any unwanted applications](#tailoring-your-installation)

[**Next:** Remove share.war file](#removing-the-share.war-file)


#### Removing the share.war file

Use this information to remove the share.war file from your application.

If you want an Alfresco Content Services-only tier in your application, you will need to delete the share.war file from your application server. The `share.war` file is stored in the `<TOMCAT-HOME>` directory.

1.  Navigate to `<TOMCAT_HOME>/webapps` directory.

2.  Delete the share.war file.


You have successfully removed the share.war file from your application server.

**What to do next:**

[**Go to Parent topic:** Remove any unwanted applications](#tailoring-your-installation)

[**Next:** Modify Alfresco Content Services applications]({% link content-services/5.2/config/index.md %}#customizing-applications)

### Installing an Alfresco Module Package

An Alfresco Module Package (AMP) is a bundle of code, content model, content, and the directory structure that is used to distribute additional functionality for Alfresco Content Services. Use the Module Management Tool (MMT) to install and manage AMP files. You can install an AMP in an Alfresco WAR using the MMT, or by using the `apply_amps` tool.

The MMT is included in the installers, and it is also available as a separate JAR file from the Distribution zip (`alfresco-content-services-distribution-5.2.7.zip`), in the zip's `/bin` directory. Place the `/bin` directory and its contents in the same location that is used by the installer (`<installdir>/bin`).

1.  Browse to the `/bin` directory:

    -   (Windows) `C:\Alfresco\bin`
    -   (Linux) `/opt/alfresco/bin`

2.  Run the `apply_amps` application to apply all AMP files that are in the amps and amps_share directories:

    -   For Windows, navigate to the bin directory and double click `apply_amps`.
    -   For Linux, enter the command: `bin/apply_amps.sh`

3.  Alternatively, to install individual AMP files, use MMT:

    `java -jar alfresco-mmt.jar install <AMPFileLocation> <WARFileLocation> [options]`

    Where:

    |Option|Description|
    |------|-----------|
    |`<AMPFileLocation>`|The location of the AMP file that you want to install.|
    |`<WARFileLocation>`|The location of the WAR file for your installation.|
    |`-verbose`|Install command [options]. Enables detailed output containing what is being updated and to where it is being copied.|
    |`-directory`|Install command [options]. Indicates that the AMP file location specified is a directory. All AMP files found in the directory and its sub directories are installed.|
    |`-force`|Install command [options]. Forces installation of AMP regardless of currently installed module version.|
    |`-preview`|Install command [options]. Previews installation of AMP without modifying WAR file. It reports the modifications that will occur on the WAR without making any physical changes, for example, the changes that will update existing files. It is good practice to use this option before installing the AMP.|
    |`-nobackup`|Indicates that the WAR will not be backed up before the AMP is installed.|

    This command installs the files found in the AMP into the Alfresco WAR. If the module represented by the AMP is already installed and the installing AMP is of a higher release version, then the files for the older version are removed from the WAR and replaced with the newer files.

    The following commands show examples of how to install the `example-amp.amp`, and assumes that the AMP file is in the same directory as the WAR file:

    ```java
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -preview
    ```

    Review the modification to check the changes that will update any existing files.

    The following example will install the AMP file:

    ```java
    java -jar alfresco-mmt.jar install example-amp.amp alfresco.war -verbose
    ```

    The modified Alfresco WAR can then be redeployed back into your application server.

    On restarting the application server, the console will show that the custom class was initialized during startup.

4.  Verify that the AMP is installed using the MMT list command. For example:

    ```java
    java -jar alfresco-mmt.jar list <WARFileLocation>
    ```

    This command provides a detailed listing of all the modules currently installed in the WAR file specified.


When the repository is next started, the installed module configuration will be detected, and the repository will be bootstrapped to include the new module functionality and data.

It is not recommended that you overwrite an existing file in an AMP, however it is sometimes necessary. The MMT makes a backup copy of the updated file and stores it in the WAR. When an update of the module occurs and the old files are removed, this backup will be restored prior to the installation of the new files. Problems can occur if multiple installed modules modify the same existing file. In these cases, a manual restore might be necessary if recovery to an existing state is required.

Some application servers (notably Tomcat) do not always fully clean up their temporary working files, and this can interfere with successful installation of an AMP file. To remedy this situation, it is recommended that you delete (or move) the Tomcat work and temp directories while Tomcat is shut down.

-   **[Viewing module packages](#viewing-module-packages)**  
Alfresco Module Packages are used to package customizations and extensions for deployment. Use the Module Browser page to view all the AMPs that have been applied to Alfresco Content Services.

#### Viewing module packages

Alfresco Module Packages are used to package customizations and extensions for deployment. Use the Module Browser page to view all the AMPs that have been applied to Alfresco Content Services.

1.  Click **Admin Tools** then **Module Browser**.

    The Module Browser page shows a list of all the module packages that are either pre-configured in an out-of-the-box installation or applied by the user, along with the description and version number.

    ![]({% link content-services/images/amp.png %})



### Installing additional software for Alfresco Content Services

The third-party software used by Alfresco Content Services is installed when you use the setup wizards to install Alfresco Content Services. If you wish to install the third-party software independently, this information describes the steps for obtaining and installing the software. Some of the software can be installed any time before or after installing Alfresco Content Services.

-   **[Installing LibreOffice](#installing-libreoffice)**  
In Alfresco Content Services, you can transform a document from one format to another, for example, a text file to a PDF file. To have access to these transformation facilities, you must install LibreOffice. This is optional, and can be done any time after Alfresco Content Services is installed.
-   **[Installing ImageMagick](#installing-imagemagick)**  
To enable image manipulation in Alfresco Content Services, you must install and configure ImageMagick. Alfresco Content Services uses ImageMagick to manipulate images for previewing.
-   **[Installing alfresco-pdf-renderer](#installing-alfresco-pdf-renderer)**  
Alfresco Content Services uses alfresco-pdf-renderer for creating document thumbnails and previews. Use this information to install alfresco-pdf-renderer on your system.
-   **[Installing TinyMCE language packs](#installing-tinymce-language-packs)**  
Translations in Alfresco Content Services use the language packs supplied in the default install. The supported language packs are: German (de), English (en), Spanish (es), French (fr), Italian (it), Japanese (ja), and Dutch (nl). The language used switches according to the browser locale. Ensure that your browser is set up to view the relevant locale, which ensures that the special characters display correctly in your installed instance.

#### Installing LibreOffice

In Alfresco Content Services, you can transform a document from one format to another, for example, a text file to a PDF file. To have access to these transformation facilities, you must install LibreOffice. This is optional, and can be done any time after Alfresco Content Services is installed.

1.  Browse to the LibreOffice download site: [LibreOffice download site](https://www.libreoffice.org/download/libreoffice-fresh/)

2.  Download the latest (stable) version of LibreOffice for your platform.

3.  When prompted, specify a download destination.

4.  Browse to the location of your downloaded file, and install the application.

5.  Change the installation directory to:

    -   (Windows) `c:\Alfresco\LibreOffice`
    -   (Linux) `/opt/alfresco/LibreOffice`

    If you are installing LibreOffice on Linux, you also need a number of libraries to be installed. See [Installing Linux libraries manually](#installing-linux-libraries-manually) for more information.

6.  Modify the `ooo.exe=` property in the `<classpathRoot>/alfresco-global.properties` file to point to the LibreOffice application `libreoffice.app`.

    > **Note:** For Windows, set the path using the `\` separator or use the forward slash `/` Unix path separator. For example: `c:\Alfresco\LibreOffice\libreoffice.app` or `c:/Alfresco/LibreOffice/libreoffice.app`.

7.  If the Alfresco Content Services server is running, stop and restart the server.

#### Installing ImageMagick

To enable image manipulation in Alfresco Content Services, you must install and configure ImageMagick. Alfresco Content Services uses ImageMagick to manipulate images for previewing.

1.  Verify that ImageMagick is already installed on your system.

    Use the ImageMagick convert command to check that you have the right software installed on your machine. This command is usually located in `/usr/bin`: `install Image`.

2.  If the ImageMagick software is not available on your system, download and install the appropriate package for your platform.

    To download ImageMagick, browse to [ImageMagick download website](http://www.imagemagick.org/script/download.php).

    > **Note:** In next steps you will make changes to the Alfresco Content Services application configuration files to enable the manually installed ImageMagick application. These steps can only be performed after Alfresco Content Services has been installed.

3.  Browse to the `<classpathRoot>` directory. See [System paths]({% link content-services/5.2/admin/index.md %}#system-path-conventions) for more information.

4.  Open the `alfresco-global.properties` file.

5.  Modify the ImageMagick properties to point to the ImageMagick root directory:

    |Property|Description|
    |--------|-----------|
    |img.root|On Windows, set this property to `img.root=C:\ImageMagick`<br><br>On Linux, set this property to `img.root=/ImageMagick`<br><br>**Note:** Do not include a slash (`/`) at the end of the path. For example, `/ImageMagick/`|
    |img.dyn|On Windows, set this property to `img.dyn=${img.root}\lib`<br><br>On Linux, set this property to `img.dyn=${img.root}/lib`|
    |img.exe|On Windows, set this property to `img.exe=${img.root}\convert.exe`<br><br>On Linux, set this property to `img.exe=${img.root}/bin/convert`|
    |img.coders|On Windows, set this property to `img.coders=${img.root}\modules\codersOn Linux, set this property to `img.coders=${img.root}/modules/coders`|
    |img.config|On Windows, set this property to `img.config=${img.root}\config`<br><br>On Linux, set this property to `img.config=${img.root}/config`|

    > **Note:** Test that you are able to convert a PDF using the command `convert filename.pdf[0] filename.png`.

#### Installing alfresco-pdf-renderer

Alfresco Content Services uses alfresco-pdf-renderer for creating document thumbnails and previews. Use this information to install alfresco-pdf-renderer on your system.

> **Note:** To use the alfresco-pdf-renderer, ensure that Alfresco Content Services has been installed. Changes made to the `alfresco-global.properties` file in your installation of Alfresco Content Services will change the configuration and enable you to manually install the alfresco-pdf-renderer application.

> **Note:** The `alfresco-pdf-renderer` executable file is platform-specific.

The alfresco-pdf-renderer binaries are available in the Alfresco Content Services Distribution zip.

-   For Windows:

    -   Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-win64.tgz` to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the `alfresco-global.properties` file:

        ```text
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```

-   For Linux:

    -   Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-linux.tgz` to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the `alfresco-global.properties` file:

        ```text
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```

-   For Mac:

    -   Extract the file `alfresco-pdf-renderer/alfresco-pdf-renderer-1.0-osx.tgz` to a location of your choice.
    -   Browse to the location of your saved file and extract the archive.
    -   Add the following properties to the `alfresco-global.properties` file:

        ```text
        alfresco-pdf-renderer.root=<alfresco-pdf-renderer_installation_dir>
        alfresco-pdf-renderer.exe=${alfresco-pdf-renderer.root}/alfresco-pdf-renderer
        ```

#### Installing TinyMCE language packs

Translations in Alfresco Content Services use the language packs supplied in the default install. The supported language packs are: German (de), English (en), Spanish (es), French (fr), Italian (it), Japanese (ja), and Dutch (nl). The language used switches according to the browser locale. Ensure that your browser is set up to view the relevant locale, which ensures that the special characters display correctly in your installed instance.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, site-welcome.properties is called sitewelcome_ fr.properties for the French version.

If you wish to use a translation that is not supplied with Alfresco Content Services, then you must add the appropriate TinyMCE language pack for the translation to work correctly.

If you installed Alfresco Content Services using one of the setup wizards, the default language packs are already installed. If you installed manually, you must install the supported language pack manually.

1.  Browse to the TinyMCE website: [TinyMCE](https://www.tiny.cloud/?ctrl=lang&act=download&pr_id=1){:target="_blank"}.

2.  Download the required TinyMCE language pack.

    > **Note:** The next step makes configuration changes to the Alfresco Share application to configure the additional language packs for TinyMCE. This step can only be performed after Alfresco Content Services has been installed.

3.  Unpack the language file to:

    `<TOMCAT_HOME>/webapps/share/modules/editors/tiny_mce/langs`.

4.  Ensure that the browser cache is cleared or refresh the page.



## Testing the installation

Installation testing checks that Alfresco Content Services is successfully installed and it is working as expected after installation.

Some of the points that need to be checked prior to testing your installation are:

-   Verify the pre-requisites needed to install.

-   Verify that after successfully installing, the application is working as per the specification document & meet user needs.

-   Upon uninstalling, check that all previously installed files and registry entries are removed as expected.


-   **[Test and familiarize after installing](#test-and-familiarize-after-installing)**  
You have successfully installed the out-of-box Alfresco Content Services application. Now you can test and gain familiarity with the core features and functions.
-   **[Test and familiarize after configuring](#test-and-familiarize-after-configuring)**  
You have successfully installed and configured Alfresco Share. This information will help you check that the features and customizations you have added are operational.
-   **[Test and familiarize after installing in a clustered environment](#test-and-familiarize-after-installing-in-a-clustered-environment)**  
You have successfully installed and configured Alfresco Content Services in a distributed/clustered environment. Now you can make sure that the features and customizations you have added are operational.
-   **[Troubleshooting the installation](#troubleshooting-the-installation)**  
Follow these tips if you see error messages when using the Alfresco Share Installer.

### Test and familiarize after installing

You have successfully installed the out-of-box Alfresco Content Services application. Now you can test and gain familiarity with the core features and functions.

Here are some tips to familiarize yourself.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

-   Can you login using your user name and password. See [Logging in]({% link content-services/5.2/using/share.md %}#signing-in).
-   Can you create a site. See [Creating a new site]({% link content-services/5.2/using/sites/index.md %}#creating-a-new-site).
-   Can you add new users to the site. See [Adding users to a site]({% link content-services/5.2/using/sites/index.md %}#adding-users-to-a-site).
-   Can you add pages to the site. See [Adding pages to a site](#configuring-jboss-for-alfresco-content-services).
-   Can you add content to a site library. See [Adding content items]({% link content-services/5.2/using/content/manage.md %}#adding-content).
-   Can you copy or move content from its current location to another folder or any other site. See [Copying content]({% link content-services/5.2/using/content/manage.md %}#copying-content) and [Moving content]({% link content-services/5.2/using/content/manage.md %}#moving-content).
-   Can you update/ edit content. See [Updating content]({% link content-services/5.2/using/content/files-folders.md %}#uploading-new-versions).
-   Can you manage permissions for a user or a group for accessing content. See [Managing content permissions]({% link content-services/5.2/using/content/files-folders.md %}#managing-file-and-folder-permissions).
-   Can you add a new rule to a folder in the site library and check if it works. See [Adding a new rule]({% link content-services/5.2/using/content/rules.md %}#adding-to-a-set-of-rules).
-   Can you edit the new rule. See [Editing a rule]({% link content-services/5.2/using/content/rules.md %}#editing-a-rule).
-   Can you schedule events, such as meeting, for your team. See [Scheduling events]({% link content-services/5.2/using/sites/features.md %}#scheduling-events).

> **Note:** After you have finished testing, remember to delete the test site or test data in order to clear your database. Alternatively, if you have made any configuration changes, it is recommended that you [Uninstall Alfresco Content Services](#uninstalling-alfresco-content-services-on-linux) and then [Reinstall Alfresco Content Services](#installing-using-setup-wizards) to get a clean database.

### Test and familiarize after configuring

You have successfully installed and configured Alfresco Share. This information will help you check that the features and customizations you have added are operational.

Tips to help you test your customizations:

> **Note:** We recommend that you create one or two test sites for testing purposes and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   If you have installed Alfresco Records Management, test whether you can use it to search records in the repository. See [Using Records Management](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/governance-services/2.7/concepts/rm-intro.md){:target="_blank"}.
-   If you have installed and configured the Kofax Release script, test whether you can you use it to capture and publish content. See [Installing and configuring the Kofax Release script](#installing-and-configuring-the-alfresco-kofax-integration).


### Test and familiarize after installing in a clustered environment

You have successfully installed and configured Alfresco Content Services in a distributed/clustered environment. Now you can make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

-   Check that the application server is running.
-   Can you login using your user name and password. See [Signing in]({% link content-services/5.2/using/share.md %}#signing-in).
-   Check that various components are communicating with each other.
-   For a clustered installation, check if one node is down, check if the request is forwarded to the next available node.
-   Check if clustering is working properly by running the [cluster validation tool]({% link content-services/5.2/admin/cluster.md %}#managing-members-of-a-cluster) in the Admin Console.
-   Check if you are using a clustering-enabled license.
-   Change the cluster-related properties in the `alfresco-global.properties` file, and check if all the nodes are up and running.

> **Note:** After you have finished testing, remember to delete the test site or test data in order to clear your database. Alternatively, if you have made any configuration changes, it is recommended that you [Uninstall Alfresco Content Services](#uninstalling-alfresco-content-services-on-linux) and then [Reinstall Alfresco Content Services](#installing-using-setup-wizards) to get a clean database.

### Troubleshooting the installation

Follow these tips if you see error messages when using the Alfresco Share Installer.

> **Note:** The Alfresco Content Services Installer is recommended for most purposes. See [Installing on Linux using the Alfresco Content Services Installer](#installing-on-linux-using-the-alfresco-content-services-installer) for more information. These tips help troubleshoot problems found in Alfresco Share, when you have used the Alfresco Share Installer (see [Installing on Linux using the Alfresco Share Installer](#installing-on-linux-using-the-alfresco-share-installer) for more information). Use this installer only if you have a specific requirement for it.

1.  Start Alfresco Content Services and log on to Alfresco Share (http://localhost:port/share) as the `admin` user. Enter the password that you specified in [Installing on Linux using the Alfresco Share Installer](#installing-on-linux-using-the-alfresco-share-installer) in the Admin Password window.

2.  Check for error messages as you start Share.

3.  If you see the following message:

    *Alfresco Content Services is running without Share Services. See your System Administrator for more details*

    then check the Admin Console to determine which AMP files have been installed, and their versions. It might be that either you have not installed the Share Services AMP in the repository (see [Installing on Linux using the Alfresco Share Installer](#installing-on-linux-using-the-alfresco-share-installer) or [Installing on Windows using the Alfresco Share Installer](#installing-on-windows-using-the-alfresco-share-installer)), or the version of the AMP that you have installed is not correct.

4.  If you see the following message:

    ```text
    Invalid MANIFEST.MF: Share Specification-Version is missing, are you using the valid
          MANIFEST.MF supplied with the Share.war? 
    ```

    check that you have not deleted or changed the `MANIFEST.MF` file. The `MANIFEST.MF` file shipped with the Share.war is required for validation, and Alfresco Share will not work correctly if this cannot be read.

    If you are using a Maven WAR build, this will override the shipped `MANIFEST.MF` file. When you unpack your WAR file, you will need to specify `unpack-dependencies` explicitly, for example:

    ```xml
    <plugin> 
      <artifactId>maven-dependency-plugin</artifactId> 
      <executions> 
        <execution> 
          <id>unpack</id> 
          <phase>generate-sources</phase> 
          <goals> 
            <goal>unpack-dependencies</goal> 
          </goals> 
          <configuration> 
            <includeTypes>war</includeTypes> 
            <includeGroupIds>org.alfresco</includeGroupIds> 
            <includeArtifactIds>share</includeArtifactIds> 
            <includes>META-INF/MANIFEST.MF</includes> 
          </configuration> 
        </execution> 
      </executions> 
    </plugin> 
    
    <plugin> 
      <artifactId>maven-war-plugin</artifactId> 
      <configuration> 
        <archive> 
          <addMavenDescriptor>false</addMavenDescriptor> 
          <manifestFile>${project.build.directory}/dependency/META-INF/MANIFEST.MF</manifestFile> 
        </archive> 
        <webResources> 
        </webResources> 
      </configuration> 
    </plugin>
    ```


## Uninstalling Alfresco Content Services

Use this information to uninstall Alfresco Content Services, or any AMP files.

-   **[Uninstalling an AMP file](#uninstalling-an-amp-file)**  
Use the Module Management Tool (MMT) to uninstall one or more AMP files.
-   **[Uninstalling Alfresco Content Services on Linux](#uninstalling-alfresco-content-services-on-linux)**  
Use this information to uninstall Alfresco Content Services on Linux.
-   **[Uninstalling Alfresco Content Services on Windows](#uninstalling-alfresco-content-services-on-windows)**  
Use this information to uninstall Alfresco Content Services on Windows.


### Uninstalling an AMP file

Use the Module Management Tool (MMT) to uninstall one or more AMP files.

The MMT program, `alfresco-mmt.jar`, is available in the bin directory of the installation. MMT uninstalls an AMP file by removing content from the `alfresco.war` and `share.war` files. For more information on the tool, see [Using the Module Management Tool (MMT)]({% link content-services/5.2/develop/extension-packaging.md %}#using-the-module-management-tool-mmt).

MMT is a command line tool. The syntax for uninstalling an AMP file using MMT is:

```java
java -jar bin/alfresco-mmt.jar ﻿uninstall <ModuleId> <WARFileLocation>         
```

> **Note:** The `apply_amps` command does not uninstall AMP files (even if you remove the AMP files manually from the amps and amps_share directories). Use `apply_amps` to install AMP files only.

For each integration, there is always at least one AMP file to remove from the `alfresco.war` and `share.war` files. AMP files that are applied to `alfresco.war` usually reside in the amps directory, and AMP files that are applied to `share.war` usually reside in the amps_share directory.

1.  Open a command prompt and change into the root directory of your installation.

2.  Check for the presence of the module you wish to delete by typing in the following command:

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war                                         
    ```

    for `alfresco.war` AMP files, and

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war                        
    ```

    for `share.war` AMP files.

    This displays a list of installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `﻿org.alfresco.integrations.google.docs` in the amps directory, and `org.alfresco.integrations.share.google.docs` in the amps_share directory.

3.  Uninstall the module by entering the following command:

    ```java
    java -jar bin/alfresco-mmt.jar uninstall ﻿org.alfresco.integrations.google.docs tomcat/webapps/alfresco.war                                      
    ```

    and

    ```java
    java -jar bin/alfresco-mmt.jar uninstall ﻿org.alfresco.integrations.share.google.docs tomcat/webapps/share.war                                          
    ```

4.  You can check that the AMP files have been removed by rerunning the command:

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war                                        
    ```

    and

    ```java
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war                                          
    ```

5.  Delete the tomcat/webapps/alfresco and tomcat/webapps/share folders in the installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

6.  Restart Alfresco Content Services to see your changes.

### Uninstalling Alfresco Content Services on Linux

Use this information to uninstall Alfresco Content Services on Linux.

The uninstalling steps below are based on the assumptions that Alfresco Content Services:

-   Is installed using one of the setup wizards.
-   Is installed at /opt/alfresco-.
-   Service is created.

1.  Navigate to the directory where the installation is.

    For example:

    -   For Alfresco Content Services, this is `/opt/alfresco-one`
    -   For Alfresco Content Services Platform, this is `/opt/alfresco-one-platform`
    -   For Alfresco Share, this is `/opt/alfresco-one-share`

2.  Launch the uninstall binary file.

    You will see the Question window.

3.  Click **Yes** to continue with uninstalling.

    If you do not want to uninstall, click **No**.

    The Setup window displays the progress bar for uninstalling.

4.  After the uninstall process is complete, click **OK** to close the window.


The uninstall process is complete. The installation directory has been successfully removed from your system.

**What to do next:**

[Go to Installing flowchart](#installing-as-a-single-instance)

[Go to Upgrading flowchart]({% link content-services/5.2/upgrade/index.md %}#upgrading-on-a-single-instance)

**Next:**[ Installing using setup wizards](#installing-using-setup-wizards)

### Uninstalling Alfresco Content Services on Windows

Use this information to uninstall Alfresco Content Services on Windows.

1.  Stop the Alfresco Content Services server, as specified in [Stopping the Alfresco Content Services server]({% link content-services/5.2/admin/index.md %}#stopping-the-alfresco-content-services-server).

2.  From the Start Menu > Control Panel > Uninstall a program, double-click the installation that you want to remove. For example, Alfresco Content Services, Alfresco Content Services Platform or Alfresco Share

    The wizard prompts you to confirm the uninstallation and all its modules.

3.  Click **Yes**.

    The uninstall window appears and the installation directory and its contents are removed.


**What to do next:**

[Go to Installing flowchart](#installing-as-a-single-instance)

[Go to Upgrading flowchart]({% link content-services/5.2/upgrade/index.md %}#upgrading-on-a-single-instance)

**Next:**[ Installing using setup wizards](#installing-using-setup-wizards)


![]({% link content-services/images/hr.png %})


## Installing integrations

Use this information to install any components or modules that integrate Alfresco Content Services to other applications.

|Module or Integration|Additional information|Link|
|---------------------|----------------------|----|
|Alfresco Content Connector for EMC Centera|Paid add-on module. Install with an AMP file in Alfresco Content Services and install the EMC Centera SDK. Requires additional software.|[Installing and configuring the Alfresco Content Connector for EMC Centera](#installing-and-configuring-the-alfresco-content-connector-for-emc-centera)|
|Alfresco Kofax Integration|Install with an AMP in Alfresco Content Services and binary files in Kofax.|[Installing and configuring the Alfresco Kofax Integration](#installing-and-configuring-the-alfresco-kofax-integration)|
|Alfresco Office Services|AMP installed as part of the standard Alfresco Content Services install.|External link: [Installing and configuring Alfresco Office Services](#installing-and-configuring-alfresco-office-services)
|Alfresco Sync Service|Install with an AMP file.|External link: [Installing Sync Service](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/sync-service/2.2/concepts/desktopsync-admin.md){:target="_blank"}|
|Alfresco Outlook Integration|Paid add-on module. Install with AMPs in Alfresco Content Services and a zip file in Microsoft Outlook.|External link: [Installing and configuring Alfresco Outlook Integration](#installing-and-configuring-alfresco-outlook-integration)|
|SAML Single Sign-On (SSO) for Alfresco Content Services|Install with AMPs in Alfresco Content Services.|External link: [Installing SAML SSO in Alfresco](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/saml-module/1.0/concepts/saml-config-overview.md){:target="_blank"}|
|Alfresco Media Management|Paid add-on module that requires additional software. Install with AMPs.|External link: [Installing and configuring Alfresco Media Management](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/media-management/1.1/concepts/mm-install-overview.md){:target="_blank"}|
|Alfresco Records Management|Paid add-on module. Install with AMPs.|External link: [Installing Alfresco Records Management](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/governance-services/2.7/tasks/rm-install-proc.md){:target="_blank"}|
|Alfresco Content Connector for AWS S3|Paid add-on module. Install with an AMP file.|External link: [Installing and configuring the S3 Connector](https://github.com/Alfresco/docs-alfresco/blob/master/_archive/aws-s3/2.1/ditamaps/index.md){:target="_blank"}|
|Alfresco Document Transformation Engine|Paid add-on module. Install with AMP files in Alfresco Content Services and an MSI package on the standalone Transformation Server.|[Installing and configuring the Document Transformation Engine](#installing-and-configuring-the-document-transformation-engine)|
|Alfresco Web Quick Start|Can be installed as part of the standard Alfresco Content Services install (Advanced option).|[Installing and configuring Alfresco Web Quick Start](#installing-and-configuring-alfresco-web-quick-start)|
|Google Docs Integration|AMP installed as part of the standard Alfresco Content Services install.|[Installing and configuring Google Docs Integration](#installing-and-configuring-google-docs-integration)|

-   **[Installing and configuring the Alfresco Content Connector for EMC Centera](#installing-and-configuring-the-alfresco-content-connector-for-emc-centera)**  
Use this information to install and configure the Alfresco Content Connector for EMC Centera module. It also lists the prerequisites for setting up the EMC Centera environment on Windows and Linux platforms.
-   **[Installing and configuring the Alfresco Kofax Integration](#installing-and-configuring-the-alfresco-kofax-integration)**  

-   **[Installing and configuring Alfresco Office Services](#installing-and-configuring-alfresco-office-services)**  
Alfresco Office Services (AOS) allows you to access Alfresco Content Services directly from all your Microsoft Office applications.
-   **[Installing and configuring Alfresco Outlook Integration](#installing-and-configuring-alfresco-outlook-integration)**  
Alfresco Outlook Integration is an extension to Alfresco Content Services and Microsoft Outlook, that allows you to save and file your emails to Alfresco Content Services in Microsoft Outlook, in a centralized and structured way.
-   **[Installing and configuring the Document Transformation Engine](#installing-and-configuring-the-document-transformation-engine)**  
Use this information to install and configure the Document Transformation Engine.
-   **[Installing and configuring Alfresco Web Quick Start](#installing-and-configuring-alfresco-web-quick-start)**  
 The Alfresco Content Services repository provides an implementation for WCM called Web Quick Start (WQS).
-   **[Installing and configuring Google Docs Integration](#installing-and-configuring-google-docs-integration)**  
Google Docs Integration allows you to use Google Docs to edit document content stored in Alfresco Content Services, as an alternative to the online and offline editing capabilities in Alfresco Share.


### Installing and configuring the Alfresco Content Connector for EMC Centera

Use this information to install and configure the Alfresco Content Connector for EMC Centera module. It also lists the prequisites for setting up the EMC Centera environment on Windows and Linux platforms.

The Centera Connector module addresses the Centera store directly through its native API.

The module uses a series of properties to control the way that you access the store. A feature of this module allows you to set retention policies, such as, preventing content from being deleted for a period of time (for example, retaining invoices for seven years).

The Centera Connector module can be applied to Alfresco Content Services 4.2.0 or later.

-   **[Software prerequisites for the Centera Connector](#software-prerequisites-for-the-centera-connector)**  
To use the Centera Connector module, ensure that you have the prerequisite software installed on your machine.
-   **[Setting up the Centera Connector environment on Windows](#setting-up-the-centera-connector-environment-on-windows)**  
Create the environment on Windows for checking the EMC Centera connection.
-   **[Setting up the Centera Connector environment on Linux](#setting-up-the-centera-connector-environment-on-linux)**  
Create the environment on Linux for checking the EMC Centera connection.
-   **[Configuring the Centera Connector](#configuring-the-centera-connector)**  
You can configure the Centera Connector module to alter the behavior of the connection.
-   **[Installing the Centera Connector module](#installing-the-centera-connector-module)**  
These steps describe how to install the Centera Connector module to an instance of Alfresco Content Services.
-   **[Working with the Centera Connector module](#working-with-the-centera-connector-module)**  
Test that the Centera Connector module is working correctly with Alfresco Content Services.
-   **[Setting up the CenteraContentStore as the main store](#setting-up-the-centeracontentstore-as-the-main-store)**  
To set up the CenteraContentStore to be the main store, it is recommended that you also configure the primary store as a CachingContentStore.


#### Software prerequisites for the Centera Connector

To use the Centera Connector module, ensure that you have the prerequisite software installed on your machine.

Contact your EMC/Dell representative directly to access any downloads, for example:

-   EMC Centera® SDK 3.3
-   Server details and `.pea` files



#### Setting up the Centera Connector environment on Windows

Create the environment on Windows for checking the EMC Centera connection.

1.  Download and install the Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package.

2.  Download and extract EMC Centera® SDK to a suitable directory, for example, `C:\centera`.

    -   `Centera_SDK_Windows_2000-5.0-Win32Dev8.zip` for 32-bit systems
    -   `Centera_SDK_Windows_2000-5.0-Win64Dev8.zip` for 64-bit systems
    On 32-bit systems, the subdirectory structure of the C:\centera directory includes the following directories:

    ```text
    docs
    include
    lib
    lib32
    sdk_samples
    ```

    On 64-bit systems, the subdirectory structure of the C:\centera directory includes the following directories:

    ```text
    docs
    include
    lib
    lib64
    sdk_samples
    ```

3.  Download the Centera `.pea` file, for example, `c2armtesting.pea`.

4.  Move the `c2armtesting.pea` file to the Centera `C:\centera` directory.

5.  Download and extract EMC Centera® SDK and Community Tools to any directory.


The structure of the `C:\centera` directory is similar to the following example (for 32-bit systems):

```text
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:41    <DIR>          docs
10.01.2014  17:41    <DIR>          include
10.01.2014  17:41    <DIR>          lib
10.01.2014  17:41    <DIR>          lib32
10.01.2014  17:41    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera` directory is similar to the following example (for 64-bit systems):

```text
10.01.2014  17:55    <DIR>          .
10.01.2014  17:55    <DIR>          ..
11.12.2013  16:25             2 470 c2armtesting.pea
10.01.2014  17:37    <DIR>          docs
10.01.2014  17:37    <DIR>          include
10.01.2014  17:37    <DIR>          lib
10.01.2014  17:37    <DIR>          lib64
10.01.2014  17:37    <DIR>          sdk_samples
               1 File(s)          2 470 bytes
               7 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera\lib32` directory is similar to the following example:

```text
10.01.2014  17:41    <DIR>          .
10.01.2014  17:41    <DIR>          ..
29.08.2012  17:33           774 144 FPCore.dll
29.08.2012  17:33           610 304 FPLibrary.dll
29.08.2012  17:33           610 948 FPLibrary.lib
29.08.2012  17:33           323 584 fpos32.dll
29.08.2012  17:33         2 011 136 fpparser.dll
29.08.2012  17:33           184 320 FPStreams.dll
29.08.2012  17:33           438 272 FPUtils.dll
29.08.2012  17:33           184 320 FPXML.dll
10.01.2014  17:41    <DIR>          lib
29.08.2012  17:33           262 144 pai_module.dll
               9 File(s)      5 399 172 bytes
               3 Dir(s)  49 088 593 920 bytes free
```

The structure of the `C:\centera\lib64` directory is similar to the following example:

```text
10.01.2014  17:37    <DIR>          .
10.01.2014  17:37    <DIR>          ..
29.08.2012  17:34           983 552 FPCore.dll
29.08.2012  17:34           690 688 FPLibrary.dll
29.08.2012  17:34           616 178 FPLibrary.lib
29.08.2012  17:34           412 160 fpos64.dll
29.08.2012  17:34         2 919 424 fpparser.dll
29.08.2012  17:34           165 888 FPStreams.dll
29.08.2012  17:34           483 840 FPUtils.dll
29.08.2012  17:34           168 960 FPXML.dll
10.01.2014  17:37    <DIR>          lib
29.08.2012  17:34            63 488 pai_module.dll
               9 File(s)      6 504 178 bytes
               3 Dir(s)  49 088 593 920 bytes free
```



#### Setting up the Centera Connector environment on Linux

Create the environment on Linux for checking the EMC Centera connection.

1.  Download and extract EMC Centera® SDK (`Centera_SDK_Linux-gcc3.3.tgz`), for example, to `/opt`.

    A subdirectory structure of the `/opt/Centera_SDK` directory includes the following directories:

    ```text
    total 20
    drwxr-xr-x.  4 root root 4096 Jan 10 21:32 docs
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 include
    drwxr-xr-x.  2 root root 4096 Aug 30  2012 install
    drwxr-xr-x.  2 root root 4096 Jan 10 21:32 lib
    drwxr-xr-x. 13 root root 4096 Sep 14  2006 sdk_samples
    ```

2.  Install the EMC Centera® SDK using the following commands:

    ```text
    cd /opt/Centera_SDK/install
    ./install
    ```

    The default installation directory is `/usr/local/Centera_SDK`.

3.  Download the Centera `.pea` file, for example, `c2armtesting.pea`.

4.  Move the c2armtesting.pea file to the Centera `/usr/local/Centera_SDK` directory.

5.  Download and extract EMC Centera® SDK and Community Tools to any directory.


The structure of the `/usr/local/Centera_SDK` directory is similar to the following example:

```text
total 12
-rw-r--r--. 1 root root 2470 Dec 11 16:25 c2armtesting.pea
drwxr-xr-x. 2 root root 4096 Dec 19 22:51 include
drwxr-xr-x. 4 root root 4096 Dec 19 22:51 lib
```

The structure of the `/usr/local/Centera_SDK/lib/32` directory is similar to the following example:

```text
total 6316
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore32.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so.3.3.719
-rwxr-xr-x. 1 root root 1063484 Dec 19 22:51 libFPCore32.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/32/libFPCore32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary32.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so.3.3.719
-rwxr-xr-x. 1 root root  643603 Dec 19 22:51 libFPLibrary32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/32/libFPLibrary32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser32.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so.3.3.50
-rwxr-xr-x. 1 root root 3800245 Dec 19 22:51 libFPParser32.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/32/libFPParser32.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams32.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so.3.3.719
-rwxr-xr-x. 1 root root  121784 Dec 19 22:51 libFPStreams32.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/32/libFPStreams32.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils32.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so.3.3.719
-rwxr-xr-x. 1 root root  648376 Dec 19 22:51 libFPUtils32.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/32/libFPUtils32.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML32.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so.3.3.719
-rwxr-xr-x. 1 root root  129647 Dec 19 22:51 libFPXML32.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/32/libFPXML32.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module32.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so.3.3.100
-rwxr-xr-x. 1 root root   49036 Dec 19 22:51 libPAI_module32.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/32/libPAI_module32.so
```

The structure of the `/usr/local/Centera_SDK/lib/64` directory is similar to the following example:

```text
total 6736
lrwxrwxrwx. 1 root root      52 Dec 19 22:51 libFPCore64.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so.3.3.719
-rwxr-xr-x. 1 root root 1098829 Dec 19 22:51 libFPCore64.so.3.3.719
lrwxrwxrwx. 1 root root      44 Dec 19 22:51 libFPCore.so -> /usr/local/Centera_SDK/lib/64/libFPCore64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPLibrary64.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so.3.3.719
-rwxr-xr-x. 1 root root  671881 Dec 19 22:51 libFPLibrary64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPLibrary.so -> /usr/local/Centera_SDK/lib/64/libFPLibrary64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPParser64.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so.3.3.50
-rwxr-xr-x. 1 root root 4061679 Dec 19 22:51 libFPParser64.so.3.3.50
lrwxrwxrwx. 1 root root      46 Dec 19 22:51 libFPParser.so -> /usr/local/Centera_SDK/lib/64/libFPParser64.so
lrwxrwxrwx. 1 root root      55 Dec 19 22:51 libFPStreams64.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so.3.3.719
-rwxr-xr-x. 1 root root  134962 Dec 19 22:51 libFPStreams64.so.3.3.719
lrwxrwxrwx. 1 root root      47 Dec 19 22:51 libFPStreams.so -> /usr/local/Centera_SDK/lib/64/libFPStreams64.so
lrwxrwxrwx. 1 root root      53 Dec 19 22:51 libFPUtils64.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so.3.3.719
-rwxr-xr-x. 1 root root  713762 Dec 19 22:51 libFPUtils64.so.3.3.719
lrwxrwxrwx. 1 root root      45 Dec 19 22:51 libFPUtils.so -> /usr/local/Centera_SDK/lib/64/libFPUtils64.so
lrwxrwxrwx. 1 root root      51 Dec 19 22:51 libFPXML64.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so.3.3.719
-rwxr-xr-x. 1 root root  151395 Dec 19 22:51 libFPXML64.so.3.3.719
lrwxrwxrwx. 1 root root      43 Dec 19 22:51 libFPXML.so -> /usr/local/Centera_SDK/lib/64/libFPXML64.so
lrwxrwxrwx. 1 root root      56 Dec 19 22:51 libPAI_module64.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so.3.3.100
-rwxr-xr-x. 1 root root   52961 Dec 19 22:51 libPAI_module64.so.3.3.100
lrwxrwxrwx. 1 root root      48 Dec 19 22:51 libPAI_module.so -> /usr/local/Centera_SDK/lib/64/libPAI_module64.so
```



#### Configuring the Centera Connector {#configuring-the-centera-connector}

You can configure the Centera Connector module to alter the behavior of the connection.

1.  Open the `<classpathRoot>/alfresco-global.properties` file.

2.  Add the `centera.url` property, for example:

    ```text
    centera.url=168.159.214.24?c:/centera/c2armtesting.pea
    ```

    The `centera.url` property specifies the details of the Centera server. For example, in this case, it specifies the IP address `168.159.214.24`.

    The property also includes the location of the Centera c2armtesting.pea file. For example, `C:/centera/c2armtesting.pea` or `/usr/local/Centera_SDK/c2armtesting.pea`.

3.  Set any additional properties to alter the way that the Centera Connector behaves.

    There are various additional properties that can be set to control the Centera Connector module. For example, the retention period for storing content is controlled using the `xam.archive.retentionPeriodDays=1` property.

    > **Note:** The sample `alfresco-global.properties` file supplied in the Alfresco EMC Centera Connector AMP provides example settings and values.

4.  Save the `alfresco-global.properties` file.

5.  Ensure that Java can find the Centera libraries.

    On Windows, set the `Path` environment variable.

    1.  Open the **Control Panel\All Control Panel Items\System**.

    2.  Select **Advanced System Settings > Advanced > Environment Variables**.

    3.  In the **System Variables** section, modify the existing `Path` environment variable by adding the path to the Centera libs.

    For example:

    ```text
    Path=c:\centera\lib64
    ```

    On Linux, set the `PATH` and `LD_LIBRARY_PATH` environment variables.

    For example:

    ```text
    export PATH=$PATH:/usr/local/Centera_SDK/lib/64
    export LD_LIBRARY_PATH=/usr/local/Centera_SDK/lib/64
    ```


-   **[Centera Connector module properties](#centera-connector-module-properties)**  
The following properties can be set for the Centera Connector module.
-   **[Testing the EMC Centera connection](#testing-the-emc-centera-connection)**  
The JCASScript tool is provided with the EMC Centera® SDK and Community Tools.



##### Centera Connector module properties {#centera-connector-module-properties}

The following properties can be set for the Centera Connector module.

Set these properties in the `alfresco-global.properties` file.

-   **centera.url=168.159.214.24?c:/centera/c2armtesting.pea**

    Specifies the full Centera connection string.

-   **xam.archive.storeName=xamArchive**

    Specifies the name of the XAM store that will be used by the `xam:archive` behavior.

-   **xam.archive.retentionPeriodDays=0**

    Specifies the number of days to retain a XAM document. Use `0` to ignore; `>0` days to retain.

    Alfresco Content Services can be configured to allow deletes in conflict to the Centera enforce retention periods. A retention period is the time that a C-Clip and its underlying blobs must be stored on an EMC Centera before an application is allowed to delete them. According to configuration, `retentionPeriod` is set to 1 day. If you switch the server date to 1-2 days ahead on the Alfresco Content Services side, this will not result in the expiry of retention periods in the Centera cluster. For this reason, delete is not permitted. You should not change the date/time but wait until this period finished. Change the `xam.archive.retentionPeriodDays` to be not be greater then `system.content.orphanProtectDays`. This will prevent the cleaner from deleting non-expired Centera binary content.

-   **xam.archive.addLock=true**

    Specifies whether to add the `cm:lockable` aspect automatically. Set to true to apply a lock when the aspect is added; set to false to not apply a lock

-   **xam.archive.cronExpression=0 0 21 * * ?**

    Specifies a cron expression for the XAM archive cleaner job.

-   **xam.archive.bindingPropertiesPattern=vnd\.com\.alfresco\..**

    Specifies the pattern for all binding properties. Any property (full property name at time of writing) that does not match will be written as non-binding. For example, `vnd\.com\.alfresco\..*` will match all properties prefixed with `vnd.com.alfresco`. Refer to [http://download.oracle.com/javase/tutorial/essential/regex/](http://download.oracle.com/javase/tutorial/essential/regex/), also [http://download.oracle.com/javase/6/docs/api/](http://download.oracle.com/javase/6/docs/api/).

-   **xam.archive.app.db=${db.url}**

    The XAM well-known properties, which will be automatically populated.

-   **xam.archive.globalPropertiesPrefix=vnd.com.alfresco. xam.archive.globalPropertiesToWrite=xam.archive.app.vendor, xam.archive.app.name, xam.archive.app.version, xam.archive.app.db**

    The list of global properties to add to the XSet (comma-separated). For example, `${xam.archive.globalPropertiesPrefix}xam.archive.app.vendor`. This can be a list of any value that can be set in the `alfresco-global.properties` file but you should import any required properties using variable replacement to get consistent naming.

-   **xam.archive.contentFieldName=${xam.archive.globalPropertiesPrefix}content**

    Specifies the name of the property against which to store content.

-   **xam.archive.nodePropertiesPrefix=xam.archive.node. xam.archive.nodePropertiesToWrite=sys:ref, sys:path, cm:name, cm:created, cm:creator, cm:owners**

    The list of node properties to add to the XSet (comma-separated, namespace-prefixes). For example, `${xam.archive.globalPropertiesPrefix}${xam.archive.nodePropertiesPrefix}cm:name`. Properties that are not present on the node are ignored. Implicit properties are generated and can be listed, for example, `sys:ref`, `sys:path`.

-   **xam.archive.forceBackgroundStoreMove**

    Specifies whether to move content to the XAM store immediately or as a background job. The aspect `xam.archivemodel:archivePending` is added to the document, pending the move to the XAM store. Set to false to move the content binaries to XAM as soon as the retention date is set. Set to true to move the content when the scheduled job runs. The default value for this property is false.


**Advanced configuration properties**

-   **centera.fp.option.embedded.data=102400**

    The maximum data size, in bytes, for data to be embedded in the CDF instead of being stored as separate blobs. The default value is 0 bytes, meaning data is never embedded in the CDF. The maximum value is 102400 bytes (100 KB). The value for the embedded data threshold can be set to less than or equal to 102400 bytes.

-   **centera.fp.option.maxconnections=100**

    The maximum number of sockets that the SDK will allocate for your application. Sockets are used to communicate with the Atmos CAS nodes managed in each pool object. The default value is 100. The maximum value is 999.


-   **centera.fp.option.buffersize=153600**

    The size of an internal C-Clip buffer in bytes. The default value is 16*1024. This value must be greater than 0.

-   **centera.fp.option.prefetch.size=1048576**

    The size of the prefetch buffer. This buffer is used to assist in determining the size of the blob. The default size is 32 KB. The maximum size is 1 MB.


##### Testing the EMC Centera connection {#testing-the-emc-centera-connection}

The JCASScript tool is provided with the EMC Centera® SDK and Community Tools.

Use the JCASScript tool to connect to the XAM server using the `centera.url` property that you specified in the `alfresco-global.properties` file.

1.  Start the JCASScript tool using the following command:

    ```text
    java -jar JCASScript.jar
    ```

2.  Enter the following command to connect to the XAM server:

    ```text
    poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
    ```

    An example of the output is as follows:

    ```text
    CASScript>poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    Attempting to connect to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    Connected to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
     
    CASPool Properties:
       Connection String:                 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
      Cluster Time:                      2014.01.10 06:25:31 GMT
      Buffer Size:                       16384
      Prefetch Buffer Size:              32768
      Connection Timeout:                120000
      Multi-Cluster Failover Enabled:    True
      Collision Avoidance Enabled:       False
    ```



#### Installing the Centera Connector module {#installing-the-centera-connector-module}

These steps describe how to install the Centera Connector module to an instance of Alfresco Content Services.

The Centera Connector is packaged as an Alfresco Module Package (AMP) file.

1.  Browse to the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

2.  Download the alfresco-centera-connector-2.1.1.amp file.

3.  Use the Module Management Tool (MMT) to install the AMP.

    ```java
    java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-centera-connector-2.1.1.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

    If your Alfresco Content Services installation is running within the Tomcat application server, you can use the `<installLocation>\bin\apply_amps` command to apply all AMP files that are located in the `<installLocation>\amps` directory.

4.  Restart the Alfresco Content Services server.



#### Working with the Centera Connector module

Test that the Centera Connector module is working correctly with Alfresco Content Services.

1.  Enable `DEBUG` logging for the Centera Connector components.

    For example:

    ```text
    log4j.logger.org.alfresco.enterprise.repo.content.centera=DEBUG
    log4j.logger.org.alfresco.enterprise.repo.centera=DEBUG
    ```

2.  Add the `xam:archived` aspect to the `share-config-custom.xml` file.

    For example:

    ```xml
    <alfresco-config>
    
       <config evaluator="node-type" condition="cm:content">
    
          <forms>
             <form>
                <!-- 2 column template -->
    
                <edit-form />
     
                <field-visibility>
    
                <!-- aspect: cm:storeSelector -->
    
                <show id="cm:storeName" />
    
                <!-- aspect: xam:archive -->
                <show id="xam:dateArchived" for-mode="view" />
                <show id="xam:retainUntil" for-mode="view" />
                <show id="cm:content" for-mode="view" />
                </field-visibility>
    
                <appearance>
                   <!-- Store Selector -->
                   <field id="cm:storeName" label="Store Name" description="Content Store Name" />
                   <set id="xam-archive" appearance="bordered-panel" label="XAM Archived" />
                   <field id="xam:dateArchived" label="XAM Date Archived" set="xam-archive" />
                   <field id="xam:retainUntil" label="XAM Retain Until Date" set="xam-archive" />
                </appearance>
             </form>
          </forms>
       </config>
    
    <config evaluator="string-compare" condition="DocumentLibrary">
       <aspects>
             <visible>
                <aspect name="xam:archive" label="XAM Archive" />
             </visible>
       </aspects>
    </config>
    </alfresco-config>
    ```

3.  View the metadata for the document.

    The new store is shown as **xamArchive** and the **retainedUntil** date is set.

4.  Copy the ClipID, and then open the C-Clip using the JCASScript tool.

    For example:

    ```text
    CASScript>clipopen EQM2GC012MC77e72B24N2MMFU59G418ACSAIE70BAS340TN3E1JJL
    
    Clip Properties:
    
      Name:                untitled
      Creation Date:       2013.11.27 01:35:09 GMT
      Size:                13474
      Number of Tags:      1
      Number of Blobs:     1
      Retention Class:    
      Retention Seconds:   86396
      Modified:            False
      EBR Enabled :        False
      Retention Hold:      False
    ```

    1.  Check that the retention period was set.

        ```text
        CASScript>clipattribs
        
        Number of attributes:  17
        
        Name:   creation.poolid           Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   retention.period          Value:   86396
        Name:   sdk.version               Value:   3.3.718
        Name:   modification.poolid       Value:   861673fa-1dd2-11b2-b535-b66ede9133c1-7
        Name:   type                       Value:   Standard
        Name:   name                       Value:   untitled
        Name:   creation.date             Value:   2013.11.27 13:35:09 GMT
        Name:   modification.date         Value:   2013.11.27 13:35:12 GMT
        Name:   creation.profile          Value:   armtesting
        Name:   modification.profile      Value:   armtesting
        Name:   numfiles                  Value:   1
        Name:   totalsize                 Value:   13474
        Name:   refid                     Value:   E5S2HABU8PRRBAS340TN3E1JJL
        Name:   clusterid                 Value:   25c57a54-1dd2-11b2-b87c-ce625a7031f2
        Name:   prev.clip                 Value:  
        Name:   clip.naming.scheme         Value:   MD5
        Name:   numtags                   Value:   1
        ```

    2.  Check that the node and application properties have been copied over.

        Select the first tag of the opened C-Clip. For example:

        ```text
        CASScript>tagfirst
        
        CASTag Properties:
        
         Name:                com.alfresco.content
         Has Blob:            True
         Blob Size:           13474
         Number of Attributes:10
         Has Parent:          False
         Has Next Sibling:    False
         Has Child:           False
        ```

        Display all the attributes. For example:

        ```text
        CASScript>tagattribs
        
        Number of attributes: 10
        
         Name: modified-date   Value: 1385553402696
         Name: com.alfresco.xam.archive.node.sys:ref         Value: workspace://SpacesStore/51bba786-184b-4d7b-8b2a-da90875e5b16
         Name: com.alfresco.xam.archive.app.name             Value: Main Repository
         Name: com.alfresco.xam.archive.node.cm:created       Value: 2013-11-27T15:56:27.011+04:00
         Name: com.alfresco.xam.archive.app.version           Value: 4.2.0 (28)
         Name: com.alfresco.xam.archive.app.db                Value: jdbc:mysql://localhost:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
         Name: com.alfresco.xam.archive.node.sys:path         Value: /app:company_home/st:sites/cm:test/cm:documentLibrary/cm: abc.txt
         Name: com.alfresco.xam.archive.node.cm:creator       Value: admin
         Name: com.alfresco.xam.archive.node.cm:name         Value: abc.txt
         Name: com.alfresco.xam.archive.app.vendor           Value: Alfresco Software
        ```

    3.  Type `tagClose` to close curent tag.

    4.  Type `clipClose` to close current C-Clip.

    5.  Type `poolClose` to close current connection to EMC Centera pool.

5.  Test the folder hierarchy.

    1.  Create a folder containing several files and folders,

    2.  Apply the `xam:archived` aspect to the top-level folder.

    3.  Check that the aspect has been applied to the entire hierarchy.

    4.  Choose one of the files in the hierarchy and check through for a single file from step 1.


#### Setting up the CenteraContentStore as the main store

To set up the CenteraContentStore to be the main store, it is recommended that you also configure the primary store as a CachingContentStore.

See [Configuring CachingContentStore]({% link content-services/5.2/admin/content-stores.md %}#configuring-cachingcontentstore) for more information.

This setup relates to new content and cannot be applied retrospectively, unless all content is moved from the file system to Centera.

1.  Create `xam-custom-context.xml` file in the `<extension>` directory.

    For example, `<installLocation>/tomcat/shared/classes/alfresco/extension`.

2.  Copy the `org_alfresco_module_centera_centeraContentStore` bean from `<installLocation>/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org_alfresco_module_xamconnector/module-context.xml` file.

    For example:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
        <bean id="org_alfresco_module_centera_centeraContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">
    
            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>
    
        </bean>
    
    </beans>
    ```

3.  Paste the bean in to the newly created `xam-custom-context.xml` file.

4.  Change the bean id to `fileContentStore`.

    For example:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
        <bean id="fileContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">
    
            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>
    
        </bean>
    
    </beans>
    ```

5.  Add the following property to `alfresco-global.properties` file.

    ```text
    xam.archive.contentFieldName=com.alfresco.content
    ```

6.  Disable the `contentstore.deleted` store by emptying the list of listeners in the `content-services-context.xml` file.

    For example:

    ```xml
    <bean id="deletedContentBackupListeners" class="java.util.ArrayList">
          <constructor-arg>
             <list>
                <!--
                <ref bean="deletedContentBackupListener" />
                -->
             </list>
          </constructor-arg>
       </bean>
    ```

7.  Start Alfresco Content Services server.


### Installing and configuring the Alfresco Kofax Integration

Use this information to install, configure, and use the Kofax Integration.

Integrating Kofax Capture and Alfresco Content Services provides complete content management support including the capture, management, and publishing of content. Kofax Capture captures content from various sources, typically through scanning and OCR. The captured information is then released to Alfresco Content Services to be managed in an ad-hoc manner or using pre-defined business processes.

The Kofax architecture provides a plug-in architecture for deploying a Kofax Release script that is responsible for mapping and transferring the information captured by Kofax to the destination application or database.

The Kofax Integration comprises a Release script plug-in that is installed within the Kofax Capture application and a set of web scripts installed on the Alfresco Content Services server.

The Kofax Integration provides the following capabilities:

-   Alfresco Content Services server connection (connection URL, user name, password)
-   Destination folder in which to store the captured documents (folders can be automatically created based on index field values)
-   Mapping of Kofax Capture indexing information and files to Alfresco Content Services properties
    -   Support for Alfresco Content Services types, sub-types, and aspects, and their associated properties
    -   Mapping of Kofax Image (TIFF), Text (OCR), or PDF files to Alfresco Content Services content properties
-   Automatic versioning, overwrite, and error handling for existing documents

-   **[Kofax Integration system requirements and prerequisites](#kofax-integration-system-requirements-and-prerequisites)**  

-   **[Installing the Kofax Integration](#installing-the-kofax-integration)**  
Installing the Kofax Integration is a two-part process.
-   **[Configuring the Kofax Integration](#configuring-the-kofax-integration)**  
Use these instructions to set up the Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.
-   **[Publishing a batch class](#publishing-a-batch-class)**  
After you select all your batch class settings, you must publish your batch class before you can use it.
-   **[Releasing batches](#releasing-batches)**  
The Kofax Capture Release module will process batches based on the settings of the associated batch classes. This module is responsible for releasing documents, as well as index data using the attributes defined during release setup.
-   **[Advanced configuration: custom types, aspects, and properties](#advanced-configuration-custom-types-aspects-and-properties)**  
By default, the Release Setup web script (\service\kofax\releasesetup) displays all types, aspects, and their associated properties available in your repository.
-   **[Removing the Kofax Release script](#removing-the-kofax-release-script)**  
The following steps describe how to remove the Kofax Release script from your Kofax installation.
-   **[Troubleshooting the Kofax Release script](#troubleshooting-the-kofax-release-script)**  
Use this information to troubleshoot the Kofax Release script.



#### Kofax Integration system requirements and prerequisites {#kofax-integration-system-requirements-and-prerequisites}

These are the system requirements for the Kofax Integration.

The Kofax Integration must be run with Kofax 10.

You need to have a working knowledge of Kofax Capture and Alfresco Content Services.

Installation and advanced configuration requires experience with Alfresco Module Packages (AMPs) and defining Alfresco Content Services models. For more information on Kofax, refer to the Kofax Capture documentation.



#### Installing the Kofax Integration {#installing-the-kofax-integration}

Installing the Kofax Integration is a two-part process.

The installation process involves the following steps:

1.  Installation of the Kofax Release script Alfresco Module Package (AMP) file using the Module Management Tool.

2.  Installation of the Kofax Release script binaries in your Kofax Capture installation.


-   **[Installing the Kofax Integration AMP](#installing-the-kofax-integration-amp)**  
The following describes how to install the Kofax Integration AMP file on your Alfresco Content Services server.
-   **[Installing the Kofax Capture Release script binaries](#installing-the-kofax-capture-release-script-binaries)**  
The following steps describe how to install the binaries required to set up and configure the Kofax Release script in your Kofax Capture installation.



##### Installing the Kofax Integration AMP {#installing-the-kofax-integration-amp}

The following describes how to install the Kofax Integration AMP file on your Alfresco Content Services server.

1.  Browse to the [Support Portal](https://support.alfresco.com){:target="_blank"}.

2.  Download the `alfresco-kofax-integration-2.0.0-13.zip` file.

3.  Shut down your Alfresco Content Services server.

4.  Extract the ZIP file into a relevant directory.

5.  Move or copy the `alfresco-kofax-integration-2.0.0-13.amp` file to the amps directory in your Alfresco Content Services installation.

    -   (Windows) `c:\Alfresco\amps`
    -   (Linux) `/opt/alfresco/amps`
6.  From the command line, browse to the Alfresco `bin` directory.

    -   (Windows) `c:\Alfresco\bin`
    -   (Linux) `/opt/alfresco/bin`
7.  Install the Kofax Integration AMP using the Module Management Tool.

    For more information on MMT, see [Installing an Alfresco Module Package](#installing-an-alfresco-module-package).

    For Windows:

    -   `java -jar alfresco-mmt.jar install c:\Alfresco\amps\alfresco-kofax-integration-2.0.0-13.amp c:\Alfresco\tomcat\webapps\alfresco.war`
    For Linux:

    -   `java -jar alfresco-mmt.jar install /opt/alfresco/amps/alfresco-kofax-integration-2.0.0-13.amp /opt/alfresco/tomcat/webapps/alfresco.war`

    > **Note:** Alternatively for Tomcat, you can run the `apply_amps.bat` command in the root Alfresco directory to install the `alfresco-kofax-integration-2.0.0-13.amp`. This batch file applies all the AMPs that are located in the `amps` directory.

8.  Remove your existing expanded web application directory to allow updates to be picked up when the server restarts.

    -   (Windows) `c:\Alfresco\tomcat\webapps\alfresco`
    -   (Linux) `/opt/alfresco/tomcat/webapps/alfresco`



##### Installing the Kofax Capture Release script binaries {#installing-the-kofax-capture-release-script-binaries}

The following steps describe how to install the binaries required to set up and configure the Kofax Release script in your Kofax Capture installation.

> **Important:** You must have Windows administrator privileges to install Kofax Capture Release script binaries. If you do not have administrator rights, you might encounter errors and the script might fail to install.

1.  Unzip the `alfresco-kofax-integration-2.0.0-13.zip` file to your Kofax Capture `bin` directory.

    For example, (Windows) `c:\Program Files\Kofax\Capture\bin`

2.  Start the Kofax Capture Administration Module.

3.  In the Kofax Administration module, click **Tools > Export Connector Manager**.

4.  From the Export Connector Manager dialog box, click **Add** and then browse to the directory of the unzipped files.

5.  Select `Alfresco.Kofax.Release.inf`, and click **Open**.

6.  Click **OK** to register the release script.

7.  Close the open dialog boxes to complete the process.


#### Configuring the Kofax Integration {#configuring-the-kofax-integration}

Use these instructions to set up the Kofax Release script. These instructions assume you are familiar with Kofax Capture and have created a Kofax Capture batch class. For information on setting up batch classes in Kofax Capture, refer to the Kofax Capture documentation.

In Kofax Capture, release scripts are associated with document classes. The script is configured to define where and how the documents will be released, including:

-   URL to connect to your Alfresco Content Services server
-   Alfresco Content Services user name and password used to create the documents
-   Location in the repository where documents will be released
-   Options for handing existing documents, such as Overwrite, Version, Release to Default Folder, or Report an Error
-   Alfresco Content Services document type
-   Mapping between the Alfresco Content Services properties (including those based on type and configured aspects), and the Kofax indexing fields to be populated by the release script

-   **[Associating the Kofax Release script with a document class](#associating-the-kofax-release-script-with-a-document-class)**  
Once you have set up a batch class with an associated document class in Kofax Capture, you can associate a Release script with the batches document class. As part of this process, you are prompted to enter the connection details for your Alfresco Content Services server.
-   **[Kofax Release script configuration tabs](#kofax-release-script-configuration-tabs)**  
The Kofax Release script is configured using three main tabs. The following information describes each of the configuration tabs and the options available.


##### Associating the Kofax Release script with a document class {#associating-the-kofax-release-script-with-a-document-class}

Once you have set up a batch class with an associated document class in Kofax Capture, you can associate a Release script with the batches document class. As part of this process, you are prompted to enter the connection details for your Alfresco Content Services server.

1.  Start the Kofax Capture Administration Module.

2.  Select the **Batch class** tab from the Definitions panel, and right-click the applicable document class. (Expand the Batch class item to select associated document classes.)

3.  From the **Context** menu, select **Release Scripts**.

    ![]({% link content-services/images/kofax-relscript-window.png %})

    The **Release Scripts** dialog box displays, listing all available release scripts. Available release scripts are those that are registered with Kofax Capture.

4.  From the Release Scripts dialog box, select the Kofax Release Script, and click **Add**.

    ![]({% link content-services/images/kofax-login.png %})

    The Login dialog box displays.

5.  Enter your server URL, user name, and password.

6.  Click **Login**.


##### Kofax Release script configuration tabs {#kofax-release-script-configuration-tabs}

The Kofax Release script is configured using three main tabs. The following information describes each of the configuration tabs and the options available.

-   **[Repository tab](#repository-tab)**  
The Repository tab is used to configure where documents are stored in the repository and how existing documents are handled.
-   **[Index tab](#index-tab)**  
The Index tab defines the Alfresco Content Services document type used for released documents, and the mappings between Kofax index fields and Alfresco Content Services properties.
-   **[General tab](#general-tab)**  
The General tab defines the working folder used by Kofax Capture for temporary file storage during the release process.



###### Repository tab {#repository-tab}

The Repository tab is used to configure where documents are stored in the repository and how existing documents are handled.

![Repository tab]({% link content-services/images/rm-AlfRelscript-Repo.png %})

The Repository tab has the following options:

-   **Default Folder**

    Defines the root space in which documents will be created.

    > **Note:** The user that connects to Alfresco Content Services must have permission to create documents in this space.

-   **Folder Path by Index**

    Allows the folder path to be dynamically generated based on indexing values. Substitute Alfresco Content Services property name(s) to be used as part of the folder path.

    For example, the following will store all documents with the same `Invoice Date` property in folders according to the invoice date:

    ```text
    Company Home/Invoices/[Invoice Date]
    ```

-   **If Document Exists**

    A document already exists if a document of the same name already exists in the folder in which the document is being released. The following defines how the Release script will handle existing documents.

    -   **Overwrite**: Replaces the document with the one being currently released.
    -   **Version**: Creates a new version of the document.
    -   **Release To Default Folder**: If the folder path specified in the **Folder Path By Index** field has an existing document with the same name, the document will be put into the location specified in the **Default Folder** field.
    -   **Throw Error**: The release fails with the error Duplicate child name not allowed.
    -   **Create Folders if they don’t exist**: If selected, this will automatically create folders that do not exist as defined by the previous **Folder Path by Index** settings. If this is not selected, and the folder path(s) do not exist, an error will occur and the document will fail.



###### Index tab {#index-tab}

The Index tab defines the Alfresco Content Services document type used for released documents, and the mappings between Kofax index fields and Alfresco Content Services properties.

![Index tab]({% link content-services/images/rm-AlfRelscript-index.png %})

Each row defines the mapping between an Alfresco Content Services property and a Kofax indexing field. The **Content Type** and Alfresco Fields values available can be controlled through configuration.

-   **Content type**

    The content type that will be used for documents created by the Release script. It can be a custom content type or content.

-   **Alfresco Content Services Fields**

    Use the list to pick properties based on the available types and aspects that will be populated with Kofax Capture index data.

-   **Kofax fields**

    Use the list to pick the Kofax Capture field to map to a property. The **Text Constant** field can provide a fixed text value for the field.


> **Important:** You must define a **Name** field and a **Content** field, as shown in the previous figure. The **Content** field is used to store the image file, such as Image (TIF), PDF, or Text (OCR).



###### General tab {#general-tab}

The General tab defines the working folder used by Kofax Capture for temporary file storage during the release process.

![General tab]({% link content-services/images/rm-AlfRelscript-General.png %})

-   **Working Folder**

    Set this to a folder where the user running the script has write access on the local Kofax Capture machine.


#### Publishing a batch class {#publishing-a-batch-class}

After you select all your batch class settings, you must publish your batch class before you can use it.

The publishing process checks the integrity of the settings in your batch class and makes the batch class available for use. If problems are found with any of the settings, error and warning messages will display, along with the recommended actions for fixing the problems.

If you edit your batch class, you must publish your batch class again before your changes can be used. Your changes will not be applied to batches created before the new publication date.

1.  Start the Kofax Capture Administration module to display the main screen.

2.  Select the **Batch class** tab from the Definitions panel, and right-click the applicable batch class.

3.  From the **Context** menu, select **Publish**.

4.  From the Publish window, select your batch class and click **Publish**.

    Kofax Capture will check all of your batch class settings and display the results in the Results box.

    If no problems are detected, the message `Publishing successful` displays. If a problem is detected, a warning or error message displays along with recommended actions to resolve the problem. Perform the recommended actions, and then try to publish the batch class again.

5.  Run some sample batches through the system to test the operation of the release script.


After successfully publishing, you can create batches based on your batch class. As your batches flow through your Kofax Capture system, they will be routed from module to module. The modules that are used to process a batch, and the order that processing occurs, are specified as part of the batch class definition for the batch.

Refer to the Kofax Capture Help for more information about batch classes.



#### Releasing batches {#releasing-batches}

The Kofax Capture Release module will process batches based on the settings of the associated batch classes. This module is responsible for releasing documents, as well as index data using the attributes defined during release setup.

The Kofax Capture Release module usually runs as an unattended module on a Windows workstation, periodically polling the module for available batches. It can be configured to run during off-hours to avoid any impact to the throughput of Kofax Capture and/or the network system.

1.  Start the Kofax Capture Release module by selecting **Start > Programs > Kofax Capture > Release**.

    All batches queued for release will be processed after initiation of the module.

    Once your batch is released, it will be removed from Kofax Capture. If any documents or pages are rejected, the batch will be routed to the Kofax Capture Quality Control module.

2.  To exit the Kofax Capture Release module, select **Batch > Exit** from the module menu bar.


Refer to the Kofax Capture Help for more information about releasing batches.



#### Advanced configuration: custom types, aspects, and properties {#advanced-configuration-custom-types-aspects-and-properties}

By default, the Release Setup web script (\service\kofax\releasesetup) displays all types, aspects, and their associated properties available in your repository.

The Release script can be configured to limit this list to only show only those values that are applicable to your use case. A web script configuration file is used to define the items to be displayed.

The Release script configuration file uses a structure similar to that used by the model definitions themselves. Add the types and/or aspects and the relevant properties to the releasescript.get.config.xml file to define the options you want available. See the sample configuration provided for examples.

1.  Locate the `releasesetup.get.config.xml.sample` file. For Tomcat this will be located at:

    `tomcat\WEBINF\classes\alfresco\templates\webscripts\com\microstrat\kofax\releasesetup.get.config.xml.sample`

    > **Note:** This is the default location used by the Tomcat application server. The location of the file can vary depending on the application server used by your installation.

2.  Rename `releasesetup.get.config.xml.sample` to `releasesetup.get.config.xml`.

3.  Reload your web script using the Web Script Index page as follows:

    1.  Go to http://YOURHOST:8080/alfresco/service/index.

    2.  Click **Refresh Web Scripts**.

4.  Open the Release Script Index tab.

    This will now only allow selection of types, aspects, and properties as defined in the configuration file.


If an aspect exists with properties and these properties are to be mapped from Kofax to Alfresco Content Services, then all properties for this aspect must be populated in the batch process. If certain properties are omitted from the mapping within the release script set up, then when documents are released, the unmapped properties are overwritten with empty strings.

For example, you have an aspect with properties assigned to the default content model and have a document with this aspect assigned. When using Kofax integration, when the document exists `version` option is set, all aspect properties must be mapped and populated in the batch process, otherwise all unmapped properties are overwritten with empty strings (blanked out). This is because in the document exists case, the `version` option uses checkout/check in functionality, which means that the aspect as a whole is repopulated with empty strings if they are unmapped.

The workarounds are:

-   Map all properties in the batch process
-   Split out your aspects so that unmapped properties are part of different aspects



#### Removing the Kofax Release script {#removing-the-kofax-release-script}

The following steps describe how to remove the Kofax Release script from your Kofax installation.

1.  Start the Kofax Capture Administration module.

2.  Remove the Kofax Release script from any document classes using the script:

    1.  Right-click the applicable document class. (Expand the batch class item to select associated document classes.)

    2.  From the **Context** menu, select **Release Scripts**.

    3.  From the Release Scripts dialog box, select the Kofax Release Script from the list of Assigned Release Scripts, and click **Remove**.

3.  Repeat step 2 for all document classes using the Kofax Release script.

4.  In the Kofax Administration module, click **Tools > Release Script Manager**.

5.  Select **Alfresco Kofax Release Script**, and click **Remove**.

6.  To remove the installation files, manually delete the following files from your Kofax Capture `bin` directory.

    -   Alfresco.Kofax.Release.Core.dll
    -   Alfresco.Kofax.Release.Core.Logging.xml
    -   Alfresco.Kofax.Release.Core.xml
    -   Alfresco.Kofax.Release.inf
    -   Alfresco.Kofax.Release.WebScripts.dll
    -   Antlr.runtime.dll
    -   Common.Logging.dll
    -   Jayrock.Json.dll
    -   log4net.dll
    -   Spring.Core.dll

#### Troubleshooting the Kofax Release script {#troubleshooting-the-kofax-release-script}

Use this information to troubleshoot the Kofax Release script.

##### Error adding the Kofax Release script to a document class

If you see an error message “Error opening release script “ Kofax Release Script" when adding the script to a document class, it is an indication that you might not have copied the binaries to your Kofax Capture bin directory.

![]({% link content-services/images/kofax-ts-open.png %})

Ensure that the following files are in the bin directory:

-   Alfresco.Kofax.Release.Core.dll
-   Alfresco.Kofax.Release.Core.Logging.xml
-   Alfresco.Kofax.Release.Core.xml
-   Alfresco.Kofax.Release.inf
-   Alfresco.Kofax.Release.WebScripts.dll
-   Antlr.runtime.dll
-   Common.Logging.dll
-   Jayrock.Json.dll
-   log4net.dll
-   Spring.Core.dll

##### Release Error: [Release Script Returned -1. Your release script may need to be re-installed.]

This is a generic Kofax error. The most likely cause is that an invalid working folder has been specified when setting up the release.

Ensure that you have entered a valid folder path in the **Working Folder** field on the General tab.

Other causes of this error include missing dependencies in the installation. Check that you have installed all the required files the bin directory.

### Installing and configuring Alfresco Office Services

Alfresco Office Services (AOS) allows you to access Alfresco Content Services directly from all your Microsoft Office applications.

Installing Alfresco Office Services allows Microsoft Office Suite applications (for example, Word, PowerPoint, and Excel) to interact with Alfresco Content Services similar to SharePoint. This feature allows you to edit Office documents in Alfresco Share and to modify Office files without checking them in and out. Share locks the file while it is being modified and releases the lock when the file is saved and closed.

AOS replaces and enhances the Microsoft SharePoint Protocol Support that was available in previous versions of Alfresco Content Services.

See [Alfresco Office Services]({% link microsoft-office/1.1/install/index.md %}) for more information.



### Installing and configuring Alfresco Outlook Integration

Alfresco Outlook Integration is an extension to Alfresco Content Services and Microsoft Outlook, that allows you to save and file your emails to Alfresco Content Services in Microsoft Outlook, in a centralized and structured way.

You can drag and drop emails in and out of the repository, and add metadata automatically when an email is filed. Other features include leveraging Alfresco Content Services in-built workflow processing and filtered search capabilities.

Advanced metadata support includes:

-   Full support for custom models
-   A configurable and dynamic metadata dialog
-   The ability to map metadata configuration to a path, folder type, or aspect
-   The ability to assign the same metadata to a set of emails in Microsoft Outlook, or a set of files in your file system

You can apply a sorted view to the repository (in Microsoft Outlook), and page through a folder or site if it contains a large number of files.

For more information about installing and configuring Alfresco Outlook Integration, see [Install Outlook Integration]({% link microsoft-outlook/2.4/install/index.md %}).



### Installing and configuring the Document Transformation Engine

Use this information to install and configure the Document Transformation Engine.

-   **[Document Transformation Engine overview](#document-transformation-engine-overview)**  
The Document Transformation Engine is a stable, fast, and scalable solution for high-quality transformations of Microsoft Office documents. It is an enterprise alternative to LibreOffice.
-   **[Document Transformation Engine setup](#document-transformation-engine-setup)**  
The Document Transformation Engine consists of two software modules: the standalone Document Transformation Engine and the Alfresco Transformation client.
-   **[Installing the Document Transformation Engine](#installing-the-document-transformation-engine)**  
Use this information to install all the components required for the Document Transformation Engine.
-   **[Configuring the Document Transformation Engine](#configuring-the-document-transformation-engine)**  
Configuring the Document Transformation Engine consists of two parts: configuring the standalone Transformation Engine using the Web Console, and configuring the Alfresco Transformation client using a properties file or JMX.
-   **[Using the Document Transformation Engine](#using-the-document-transformation-engine)**  
The Document Transformation Engine is used when you upload files to Alfresco Content Services, and you can see results in the Alfresco Share preview.
-   **[Integrating with monitoring tools](#integrating-with-monitoring-tools)**  
You can integrate the Document Transformation Engine with monitoring tools; for example, Nagios or Hyperic, by using HTTP REST calls.



#### Document Transformation Engine overview {#document-transformation-engine-overview}

The Document Transformation Engine is a stable, fast, and scalable solution for high-quality transformations of Microsoft Office documents. It is an enterprise alternative to LibreOffice.

The engine features an open architecture, and it offers the following features:

-   **High quality**

    The Document Transformation Engine uses genuine Microsoft Office software to transform MS Word, Excel, and PowerPoint documents to PDF. This guarantees the handling of all Office files and pixel-perfect transformations, and it corrects previous layout issues in the Share preview feature.

    The Document Transformation Engine can also be used to convert emails to PDFs. This is a useful feature in conjunction with the Outlook Plugin.

-   **Scalable**

    The Document Transformation Engine communicates with Alfresco Content Services using an HTTP REST API, which means that you can scale up by adding multiple instances of the engine and connecting them through a standard HTTP Network Load Balancer.

-   **Stable**

    If Microsoft Office can open and transform your document, then so can the Document Transformation Engine. Robust error handling will take care of corrupt and encrypted documents. A Web Console shows you a detailed report if there is a problem during transformation, allowing you to correct documents.

-   **Fast**

    The Document Transformation Engine is two to three times faster when transforming multi-megabyte Office documents when compared with LibreOffice on the same hardware.

-   **Extensible format support**

    The Document Transformation Engine supports the transformation of MS Office formats.


#### Document Transformation Engine setup {#document-transformation-engine-setup}

The Document Transformation Engine consists of two software modules: the standalone Document Transformation Engine and the Alfresco Transformation client.

The Document Transformation Engine is sold as an Alfresco Content Services module that is enabled with a license key:

-   The standalone Document Transformation Engine runs on Windows and takes care of the file transformations.
-   The Alfresco Transformation client runs as part of Alfresco Content Services and communicates between Alfresco Content Services and the standalone Document Transformation Engine.

**Disc I/O bandwidth**

Microsoft Office transformations are I/O-heavy, and so on some solutions, I/O contention can be a performance bottleneck. When multiple Word conversions occur in parallel, performance can suffer heavily from poor random read and write speeds.

Using an Amazon EC2 instance c3.2xlarge, the I/O metrics are as follows:

-   sequential read speed: 131 MB/s
-   sequential write speed: 83 MB/s
-   random qd32 read speed: 10,4 MB/s
-   random qd32 write speed: 3,8 MB/s

-   **[Standalone Document Transformation Engine prerequisites](#standalone-document-transformation-engine-prerequisites)**  
The standalone Document Transformation Engine requires prerequisite software components to be installed and available on the same machine.



##### Standalone Document Transformation Engine prerequisites {#standalone-document-transformation-engine-prerequisites}

The standalone Document Transformation Engine requires prerequisite software components to be installed and available on the same machine.

See [Supported Platforms]({% link content-services/5.2/support/index.md %}) for details of the correct prerequisite software.

The following points are important to note before you install the Document Transformation Engine:

-   Install only the English versions of MS Windows Server 2012 R2, and MS Office 2010 or Office 2013 32 bit because other languages cause encoding issues resulting in unpredictable behavior.

    > **Note:** Although the engine must be configured in English, this has no impact on the transformation language used for documents.

-   Document Transformation Engine does not work with Windows non-English regional settings.
-   Make sure that the Windows print spooler service is running.
-   Ensure you have Oracle JDK 8 (32-bit or 64-bit) installed.
-   GhostScript v8.64 and pdf2swf are no longer distributed along with Document Transformation Engine. Make sure you install both these tools manually.

There are a number of recommendations for calculating sizing. You will need:

-   Four high clocked cores per engine, with between 4 GB and 6 GB RAM. If you find that you need more power, it is better to add another engine instance with a similar specification than to upgrade the hardware. The reason for this is that Microsoft Office is not very scalable.
-   Between 10 GB and 15 GB of free space. Storage is not that important, but if you have lots of large files, you should make sure that creating temporary copies of those files will not slow the system down.
-   Gigabit Ethernet
-   At least one CPU for each concurrent transformation that is expected to be processed by the engine


#### Installing the Document Transformation Engine {#installing-the-document-transformation-engine}

Use this information to install all the components required for the Document Transformation Engine.

The following file is shipped for the Document Transformation Engine:

`alfresco-documenttransformationserver-2.1.6.zip`

The zip file contains the following files:

-   `alfresco-documenttransformationserver-repo-2.1.6.amp`
-   `alfresco-documenttransformationserver-share-2.1.6.amp`
-   `DocumentTransformService.msi.msi`

Installing the Document Transformation Engine consists of two parts:

1.  Installing the MSI installation package on the standalone Document Transformation Engine.
2.  Installing the relevant AMP files and updating the license on the Alfresco Content Services server.

    > **Note:** When upgrading the Document Transformation Engine, the previous installation must be uninstalled first. If your old version of the Document Transformation Engine is earlier than 1.3.1, use the Control Panel **Uninstall a program** option to remove the old version, and then manually remove the Document Transformation Engine directory. By default, the Document Transformation Engine directory is `C:\Program Files (x86)\Transformation Engine`). If your old version of the Document Transformation Engine is 1.3.1 or later, the new Document Transformation Engine MSI package prompts you to uninstall the previous version. When the uninstall is complete, you can run the MSI package again to install the new version. There is no need to manually remove anything.


**Keystore**

The package ships a keystore that is used by the Tomcat SSL connector. This keystore is shipped for demonstration purposes only and should not be used in production environments. You can edit the file, conf/server.xml, to integrate a custom keystore. Remember to change the attributes, `keystoreFile` and `keystorePass`.

**GhostScript and pdf2swf**

GhostScript and pdf2swf are no longer installed by the Document Transformation Engine MSI. Make sure you install both these tools manually. For more information, see [Installing GhostScript and pdf2swf](#installing-ghostscript-and-pdf2swf). 



-   **[Installing the standalone Document Transformation Engine](#installing-the-standalone-document-transformation-engine)**  
Use this information to install the standalone Document Transformation Engine.
-   **[Installing the Document Transformation Engine on Alfresco Content Services](#installing-the-document-transformation-engine-on-alfresco-content-services)**  
Use this information to install the Document Transformation Engine AMP and to update the required license.
-   **[Installing the Document Transformation Engine SDK](#installing-the-document-transformation-engine-sdk)**  
Use this information to install the Document Transformation Engine SDK.
-   **[Installing GhostScript and pdf2swf](#installing-ghostscript-and-pdf2swf)**  
Use this information to install and setup GhostScript and pdf2swf manually.



##### Installing the standalone Document Transformation Engine {#installing-the-standalone-document-transformation-engine}

Use this information to install the standalone Document Transformation Engine.

Before you start the installation, verify that you have:

-   Installed and activated the correct software (see [Standalone Document Transformation Engine prerequisites](#standalone-document-transformation-engine-prerequisites))
-   Logged on to the Windows Server as a user with administrator rights

1.  Double click the MSI installer package DocumentTransformService.msi.msi.

    The Welcome screen opens. 

2.  Click **Next**.

    The license information screen displays. 

3.  Click **Next**.

4.  Select an installation folder or accept the default folder, and then click **Next**.

5.  Select the TCP/IP ports used by the Document Transformation Engine. 

    The default values are 8080 (HTTP) and 8443 (HTTPS) but you can also use the standard ports 80 and 443 (or any other port) if this fits better into your network infrastructure.

6.  Click **Next** to start the installation. 

    You see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

7.  Click **Close** to finish the installation.

8.  Verify that the installation has completed successfully.

    1.  Check the Windows Services in the management console.

    2.  Locate the new service called **Document Transformation Engine**, and check that it is **Started**.


> **Note:** Each time a file is transformed in Alfresco Content Services, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List (CRL).

Depending on the access that the Document Transformation Engine has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file.

To prevent this, use the Windows server firewall to block internet access for all office binaries.



##### Installing the Document Transformation Engine on Alfresco Content Services {#installing-the-document-transformation-engine-on-alfresco-content-services}

Use this information to install the Document Transformation Engine AMP and to update the required license.

Before you start, make sure that you verify that:

-   Your Alfresco Content Services server is correctly configured and tested
-   You have the correct Document Transformation Engine ZIP file for the version of Alfresco Content Services that you are running
-   You have an updated license file (a `*.lic` file). You can request a license from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}

1.  Stop the Alfresco Content Services server.

2.  Open a terminal (Linux) or command line window (Windows).

3.  Unzip the `alfresco-documenttransformationserver-2.1.6.zip` file.

4.  Copy `alfresco-documenttransformationserver-repo-2.1.6.amp` to the `<ALFRESCO_HOME>/amps folder`, and copy `alfresco-documenttransformationserver-share-2.1.6.amp` to the `<ALFRESCO_HOME>/amps_share` folder.

5.  Install the AMP files using the Module Management Tool (MMT).

6.  Copy your updated license file into the Alfresco Content Services installation folder. 

    Delete all files with extension `*.installed` in this directory.

7.  Start the Alfresco Content Services server.

8.  Monitor the Alfresco Content Services log. 

    You will see successful log entries about the license installation and the installation of the Alfresco Module Package (depending on the configuration of your log level).


##### Installing the Document Transformation Engine SDK {#installing-the-document-transformation-engine-sdk}

Use this information to install the Document Transformation Engine SDK.

1.  Download the Document Transformation Engine SDK from the [Alfresco Support Portal](http://support.alfresco.com).

    This is an executable jar file with all dependencies that works as a command line client. The executable class is `com.westernacher.transformationserver.demo.DemoClient`.

    ![]({% link content-services/images/demo-client.png %})

    To invoke the Document Transformation Engine SDK jar file, use the following syntax:

    ```
    java -jar transformation-sdk-2.0.1-RELEASE.jar -in input.doc -out output.pdf -url http://trafo-url:8080/transformation-server
    ```

    An API usage example is available at `com.westernacher.transformationserver.demo.ApiUsageExample`. You can copy, modify, and use this code in your own product.

    ![]({% link content-services/images/api-usage-example.png %})

    A list of the most important file formats is available at mimetypes.properties. These file formats have their mime type auto-detected by the file extension. Note that this is not the full list of supported formats.

    ![]({% link content-services/images/mimetypes.png %})

    The most important source and target formats are:

    -   Source formats:
        -   Most image formats
        -   Nearly all Microsoft Word, Excel, and PowerPoint formats
        -   `.eml` and `.msg` Emails
    -   Target formats
        -   PDF and PDF/A
        -   SWF
        -   Most image formats
    -   Functions that do not work with the SDK
        -   OCR
        -   Resizing an image, which is necessary to produce thumbnails
        -   PDF/A as a target format
    > **Note:** The Document Transformation Engine SDK source code is available on request. Contact [Customer Support](https://support.alfresco.com){:target="_blank"} for the SDK source code.



##### Installing GhostScript and pdf2swf {#installing-ghostscript-and-pdf2swf}

Use this information to install and setup GhostScript and pdf2swf manually.

1.  Download and install GhostScript version 8.64.

    -   **For Windows:**
        1.  Download Ghostscript (32 bit) from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Browse to the location of your downloaded file and install the application.
        3.  Update the `img.gslib` property in the `alfresco-global.properties` file as shown:

            ```text
            img.gslib = <GhostScript_installation_dir>/lib
            ```

    -   **For Linux:**

        From Source:

        1.  Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Make sure that building toolchains specific to your OS version are installed (for example, gcc, make or any related packages).
        3.  Run the following commands to install Ghostscript:

            ```text
            ./configure
            make
            make install
            ```

            This installs Ghostscript at /usr/local/.

        4.  Add the following to the `alfresco-global.properties` file:

            ```text
            img.gslib = /usr/local/share/ghostscript/<version>/lib 
            ```

        From repositories/CD:

        1.  Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
        2.  Open your distribution's terminal program.
        3.  Based on your Linux distribution, type the following command in the terminal.

            RHEL:

            ```bash
            yum install ghostscript
            ```

            SLES:

            ```bash
            zypper install ghostscript
            ```

            Ubuntu:

            ```bash
            apt-get install ghostscript
            ```

        4.  Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.
        
    -   **For Solaris:**

        From Source:

        1.  Download Ghostscript from the [Ghostscript Downloads Page](http://www.ghostscript.com/download/gsdnld.html).
        2.  Make sure that building toolchains specific to your OS version are installed (for example, gcc, make or any related packages).
        3.  Run the following commands to install Ghostscript:

            ```bash
            ./configure
            make
            make install
            ```

            This installs Ghostscript at /usr/local/.

        4.  Add the following to the `alfresco-global.properties` file:

            ```text
            img.gslib = /usr/local/share/ghostscript/<version>/lib 
            ```

        From repositories/CD:

        1.  Make sure that your OS is connected to the online repository/repositories or the installation media is accessible by the package manager.
        2.  Open your distribution's terminal program.
        3.  Type the following command in the terminal:

            ```bash
            pkgadd SUNWgscr
            ```

        4.  Wait as the files are downloaded and installed onto your system. A list of added files will show when the process is complete.
2.  Download and install [pdf2swf](http://www.swftools.org/download.html).
3.  Set the installation paths in the Document Transformation Engine `TransformationServer\tomcat\webapps\transformation-server\WEB-INF\classes\default-configuration.properties` file:

    ```text
    transformer.pdf2swf.executable=C:/Program Files (x86)/SWFTools/pdf2swf.exe
    transformer.ghostscript.executable=C:/Program Files/gs/gs9.19/bin/gswin64c.exe
    ```

    If GhostScript and pdf2swf are not installed properly or the configured path does not match the installation path, the following message will be displayed on startup of the Document Transformation Engine:

    ```text
    2017-03-28 09:06:10,847 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Property transformer.executable not found at path 
    C:/Program Files (x86)/SWFTools/pdf2swf.exe
    ....
    2017-03-28 09:00:46,115 WARN  [localhost-startStop-1] c.w.w.a.t.t.e.CommandLineTransformer  - Property transformer.executable not found at path 
    C:/Program Files/gs/gs9.19/bin/gswin64c.exe.
    ```


Alfresco Content Services 5.2 and later versions do not need pdf2swf. It is required by Alfresco One 5.0 if the installation is configured to continue using the deprecated Flash preview. If the administrator does not provide a link to a valid instance of pdf2swf, the warning will continue to appear in the log file. The warning can be ignored if the Document Transformation Engine is using Alfresco One 5.1, or Alfresco Content Services 5.2 and later versions.

GhostScript is used to convert from PDF to PDF/A2, which is available as a Share action.

Also, the following property has been added to determine how often the temporary files are cleaned:

```text
tempfilecleaner.cronExpression.windows
```



#### Configuring the Document Transformation Engine {#configuring-the-document-transformation-engine}

Configuring the Document Transformation Engine consists of two parts: configuring the standalone Transformation Engine using the Web Console, and configuring the Alfresco Transformation client using a properties file or JMX.

-   **[Configuring the standalone Document Transformation Engine](#configuring-the-standalone-document-transformation-engine)**  
Use this information to configure the standalone Document Transformation Engine. You need only to change the password of the transformation service.
-   **[Configuring the Alfresco Transformation client](#configuring-the-alfresco-transformation-client)**  
You can configure the Alfresco Transformation client by defining several parameters.



##### Configuring the standalone Document Transformation Engine {#configuring-the-standalone-document-transformation-engine}

Use this information to configure the standalone Document Transformation Engine. You need only to change the password of the transformation service.

1.  Open your browser and navigate to the following URL:

    ```text
    http://<transformation-host>:<port>/transformation-server/settings
    ```

    or `https://` if you are using SSL.

2.  Enter your login name and a password.

    By default, the login name is set to `alfresco`, and the password is set to `alfresco`. The login name `alfresco` cannot be changed.

3.  Enter a new password, and then click **Change** to save the password.

4.  To set up SSL with the Document Transformation Engine, update or replace the keystore in the default location: `C:\Program Files (x86)\TransformationServer\tomcat\conf\.keystore` using the method described in [Configuring SSL for a test environment]({% link content-services/5.2/config/repository.md %}#configuring-ssl-for-a-test-environment).

    See [Managing Alfresco keystores]({% link content-services/5.2/admin/security.md %}#managing-alfresco-keystores) for information about keystores.


If you close and reopen your browser, reenter your login and new password.



##### Configuring the Alfresco Transformation client {#configuring-the-alfresco-transformation-client}

You can configure the Alfresco Transformation client by defining several parameters.

There are three ways that you can configure the Alfresco Transformation client:

-   Using the `alfresco-global.properties` file
-   Using a JMX client, if you have installed the Oracle Java SE Development Kit (JDK)
-   Using the `default-configuration.properties` file

**Transformation timeout considerations**

There are a number of timeout settings in Alfresco Content Services that affect the Document Transformation Engine. These are the defaults:

```text
content.transformer.default.timeoutMs=120000
transformserver.transformationTimeout=300
transformer.timeout.default=300
```

`content.transformer.default.timeoutMs` is the system transformation timeout (set to 120000 milliseconds by default), but the Document Transformation Engine is controlled by `transformserver.transformationTimeout` and `transformer.timeout.default`. This means that with the default settings, Alfresco Content Services stops processing after 120 seconds, where the Document Transformation Engine attempts to transform a document for up to 300 seconds and any results returned after 120 seconds are ignored.

If you set the following:

```text
transformserver.transformationTimeout=120
transformer.timeout.default=120
```

the Document Transformation Engine stops processing at the same time as the default system transformation timeout.



**Configuration using the global properties file**

You configure the Alfresco Transformation client by adding the relevant properties to the global properties file.

1.  Open the `alfresco-global.properties` file.

2.  Add the required properties for configuration settings on the Alfresco Transformation client.

3.  Save the `alfresco-global.properties` file, and then restart your server.


The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformserver.aliveCheckTimeout`|2|Sets the timeout for the connection tester in seconds. If the Document Transformation Engine does not answer in this time interval, it is considered to be off line.|
|`transformserver.test.cronExpression`|0/10 * * * * ?|Sets the cron expression that defines how often the connection tester will check. The default value is every 10 seconds.|
|`transformserver.disableSSLCertificateValidation`|false|Set this property to true to allow self-signed certificates (that is, it is not issued by an official Cert Authority).|
|`transformserver.username`|alfresco|The user name used to connect to the Document Transformation Engine. > **Note:** **Do not change** this default.

|
|`transformserver.password`|alfresco|The password used to connect to the Document Transformation Engine. > **Note:** **Always change the password from the default.**

|
|`transformserver.qualityPreference`|QUALITY|There are two values for this property: -   QUALITY: optimizes the preview for quality.
-   SIZE: optimizes the preview for size. This is interesting if you have a lot of big Office documents, for example, PPT > 100 MB.

|
|`transformserver.transformationTimeout`|300|Sets the time in seconds to wait for the transformation to complete before assuming that it has hung and therefore stop the transformation. If you are transforming very large or complex files, this time can be increased.|
|`transformserver.url`| |The URL of your Document Transformation Engine (or the network load balancer if you are using more then one transformation engine). Use https:// if you want to use encrypted communication between the Alfresco Content Services server and the Document Transformation Engine.|
|`transformserver.usePDF_A`|false|Use this setting to transform PDF to PDF/A or to keep PDF/A in PDF/A format.|

In a normal setup, you will always overwrite the transformserver.password and transformserver.url properties. If you want to use SSL encryption with the default certificate of the transformation engine, make sure that you set `transformserver.disableSSLCertificateValidation=true`.

**Configuration using JMX**

The Alfresco Transformation client configuration parameters are exposed as JMX MBeans, which means that you can view and set the parameters using a JMX client. 

See [Runtime administration with a JMX client]({% link content-services/5.2/config/index.md %}#using-a-jmx-client-to-change-settings-dynamically) for instructions on how to connect a JMX client to your server.

**Configuration using the default configuration properties file**

You can configure values in the Alfresco Transformation client by adding the relevant properties to the transformation engine configuration file `C:\Program Files (x86)\TransformationServer\tomcat\webapps\transformation-server\WEB-INF\classes\default-configuration.properties`.

The following table shows an overview of the available properties:

|Property|Default value|Description|
|--------|-------------|-----------|
|`transformer.timeout.default`|300|Sets the transformer timeout value in seconds.|
|`transformer.timeout.word`| |Sets the timeout value in seconds for Word document transformation to complete.|
|`transformer.timeout.excel`| |Sets the timeout value in seconds for Excel document transformation to complete.|
|`transformer.timeout.powerpoint`| |Sets the timeout value in seconds for Powerpoint transformation to complete.|
|`transformer.word.exportMarkup`|true|When you work with a Microsoft Word document, you can add markup, for example, using Track changes and Highlight Changes options. This property controls whether or not to include the markup in the transformed Word document. To remove the markup from the transformed Word document, set the property to false.|
|`transformer.excel.maxRows`

|1000|This property determines the maximum number of rows of an Excel document that will be handled. Everything above will be ignored.

|

Use the code sample to set these document transformation timeouts:

```text
# transformer timeout in seconds
transformer.timeout.default=300
transformer.timeout.word = ${transformer.timeout.default}
transformer.timeout.excel = ${transformer.timeout.default}
transformer.timeout.powerpoint = ${transformer.timeout.default}
```

#### Using the Document Transformation Engine {#using-the-document-transformation-engine}

The Document Transformation Engine is used when you upload files to Alfresco Content Services, and you can see results in the Alfresco Share preview.

Administrators can view information about the engine and transformation errors using the Web Console.

-   **[Using the Document Transformation Engine Web Console](#using-the-document-transformation-engine-web-console)**  
Use the Document Transformation Engine Web Console to view information about the engine and transformation errors. The console provides the status of the engine, a historical view of all the transformations completed, and the number of successful and failed transformations.



##### Using the Document Transformation Engine Web Console {#using-the-document-transformation-engine-web-console}

Use the Document Transformation Engine Web Console to view information about the engine and transformation errors. The console provides the status of the engine, a historical view of all the transformations completed, and the number of successful and failed transformations.

Only Administrators can access and use the Document Transformation Engine Web Console.

1.  To open the Document Transformation Engine Web Console, open a browser, and then navigate to the following URL:

    ```text
    http://<transformation-host>:</port>:/transformation-server/
    ```

    Use `https://` if you use SSL.

    The **Server Status** view is the default view when you open the Document Transformation Engine Web Console. The **Server Status** view shows an overview of the health and the memory use of the Document Transformation Engine. Ensure that you have the flash plug-in to see the **Active Threads** and **Memory Usage** graphics.

2.  Click **History** view.

    Alternatively, you can go directly to the **History** view by opening a browser, and then navigating to the following URL:

    ```text
    http://<transformation-host>:<port>:/transformation-server/transformations
    ```

    The **History** view shows the details of the document transformations. It provides a number of search functions that allow administrators to find transformation problems for specific documents. 

3.  You can query the transformation history using the following parameters:

    -   Date-time From and To
    -   File name
    -   Status
    -   User name

4.  To investigate errors, set the **Outcome** field to **Error**. Hover over the warning sign to view an indication of the problem with the file.

5.  Click the **Statistics** view.

    Alternatively, you can go directly to the **Statistics** view by opening a browser, and then navigating to the following URL:

    ```text
    http://<transformation-host>:<port>:/transformation-server/stats
    ```

    The **Statistics** view indicates the number of transformations, and the success or failed ratio.

6.  Click the reset link to reset the counter.

#### Integrating with monitoring tools

You can integrate the Document Transformation Engine with monitoring tools; for example, Nagios or Hyperic, by using HTTP REST calls.

The tool should call the Document Transformation Engine URL with a set of parameters, and then monitor the response.

Two calls are available:

1.  Connection tester call

    This call is also used by the Alfresco Transformation client to test availability. It checks the transformation service is up and responding.

    1.  URL: `http://<transformation-host>:<port>/transformation-server/service/transform/v1/version`

    2.  HTTP Method: GET

    3.  Make sure that you include basic authentication credentials to your call.

2.  Transformation execution call

    This call gets an Office file from the Transformation Service to check whether the transformation engine is still functioning (the Transformation Service makes an internal post, but the HTTP method is still a GET call). This can be used for more in-depth monitoring.

    1.  URL: `http://<transformation-host>:<port>/transformation-server/service/transform/v1/available`

    2.  HTTP Method: GET

    3.  Make sure that you include basic authentication credentials to your call.


### Installing and configuring Alfresco Web Quick Start

The Alfresco Content Services repository provides an implementation for WCM called Web Quick Start (WQS).

 

-   **[Web Quick Start](#web-quick-start)**  
Web Quick Start is an easy-to-install package that provides developers with a strong starting point for their Alfresco Content Services implementations.
-   **[Alfresco Web Editor](#alfresco-web-editor)**  
The Alfresco Web Editor is a Surf-based web application that provides in-context editing capabilities for repository content. The editor provides a mechanism for non-technical users to make edits to content directly within a web page.



#### Web Quick Start {#web-quick-start}

Web Quick Start is an easy-to-install package that provides developers with a strong starting point for their Alfresco Content Services implementations.

Web Quick Start is packaged in four parts:

-   An Alfresco Module Package (AMP) that extends the repository to support a generic website model
-   An AMP that extends Alfresco Share for editing content for the website, managing the structure of the website, and publishing content using workflow.
-   A JAR file that contains a Java API for accessing the website data held in the repository.
-   A web application that, when deployed to a servlet container such as Tomcat, delivers a fictional financial news website. The web application is a Spring MVC application constructed using Alfresco Surf, and communicating with the repository using the Java API. As well as dynamically building the website from data held in the repository, Web Quick Start also provides examples of user generated content whereby content is sent from the web application back to the repository.

-   **[About Web Quick Start](#about-web-quick-start)**  
Web Quick Start is a set of website design templates and sample architecture, built on the Alfresco Share content management and collaboration framework.
-   **[Installing Alfresco Content Services and Web Quick Start](#installing-alfresco-content-services-and-web-quick-start)**  
If you are installing Alfresco Content Services and Web Quick Start for the first time, use the Alfresco Content Services setup wizard.
-   **[Manually installing Web Quick Start](#manually-installing-web-quick-start)**  
If you have an existing Alfresco Content Services installation and prefer to install Web Quick Start manually, you can apply the relevant AMP files to your application. This method is suitable for customized or integrated installations.
-   **[Creating the Web Quick Start site](#creating-the-web-quick-start-site)**  
The Web Quick Start site is a default Share Collaboration site with the sample Quick Start data imported. An Alfresco Share dashlet is provided, from which you can import the sample data.
-   **[Importing Web Quick Start demo data](#importing-web-quick-start-demo-data)**  
When you initially add the Web Quick Start dashlet into the site dashboard, the dashlet displays a link that enables you to import the Web Quick Start demo data.
-   **[Configuring Web Quick Start](#configuring-web-quick-start)**  
After you have imported the Web Quick Start website data, when you have refreshed Share, or the next time you log on, you can access the Web Quick Start site for configuration.



##### About Web Quick Start {#about-web-quick-start}

Web Quick Start is a set of website design templates and sample architecture, built on the Alfresco Share content management and collaboration framework.

With Quick Start, developers can rapidly build customized and dynamic web applications with powerful content management features for the business users without having to start from scratch.

Using standard development tools developers can quickly deploy the comprehensive content management capabilities of Alfresco Content Services to build new and innovative web applications. Developed using the Spring framework with Surf, the Web Quick Start allows developers to easily extend Alfresco Content Services to add new features to support the demands of the business.



##### Installing Alfresco Content Services and Web Quick Start {#installing-alfresco-content-services-and-web-quick-start}

If you are installing Alfresco Content Services and Web Quick Start for the first time, use the Alfresco Content Services setup wizard.

When you run the setup wizard, you can choose to install a number of components. Web Quick Start is provided as a component but it not selected by default.



##### Manually installing Web Quick Start {#manually-installing-web-quick-start}

If you have an existing Alfresco Content Services installation and prefer to install Web Quick Start manually, you can apply the relevant AMP files to your application. This method is suitable for customized or integrated installations.

This procedure describes how to copy the AMP files into their appropriate AMP directories and uses the apply_amps.bat or .sh file to apply them. Alternatively, use the Module Management Tool (MMT) to apply the AMP file.

1.  Download the Web Quick Start zip bundle file:

    `alfresco-wcmqs-5.2.7.zip`

2.  Unzip the file into a temporary location. The artifacts supplied with Web Quick Start are:

    -   `alfresco-wcmqs-5.2.7.amp` (AMP file for Alfresco Content Services)
    -   `alfresco-wcmqs-share-5.2.7.amp` (AMP file for Alfresco Share)
    -   `awe.war` (Web Editor)
    -   `wcmqs.war` (Spring-based Web Quick Start application)
    -   `awe-config-custom.xml`

3.  Locate your Alfresco Content Services installation directory.

4.  Copy the AMP files into the relevant amps directories for Alfresco Content Services and Share:

    1.  Copy the `alfresco-wcmqs-5.2.7.amp file` to the `amps` directory.

    2.  Copy the `alfresco-wcmqs-share-5.2.7.amp` file to the `amps-share` directory.

5.  Apply the AMP files using the apply_amps command for the Tomcat application server, or, alternatively, use the Module Management Tool (MMT).

6.  Copy the website WAR (wcmqs.war) into the webapps directory of your existing installation.

    For example, on Windows with a Tomcat application server, this is `C:\Alfresco\tomcat\webapps`.

7.  Copy the Web Editor file (awe.war) into the webapps directory to replace the existing awe.war file.

8.  Delete the existing alfresco and share directories.

9.  Restart the server.


##### Creating the Web Quick Start site {#creating-the-web-quick-start-site}

The Web Quick Start site is a default Share Collaboration site with the sample Quick Start data imported. An Alfresco Share dashlet is provided, from which you can import the sample data.

1.  Open Alfresco Share.

2.  Click **Create Site**.

    This creates a new collaboration site.

3.  Type a name for the site, for example, **Web Quick Start**.

4.  Type a URL name for the site, for example **wcmqs**.

5.  Click **OK**. The new site displays in your My Sites dashlet.

6.  Open the new site.

7.  Click **Customize Dashboard**.

8.  Click **Add Dashlets**.

9.  Drag the Web Quick Start dashlet to your dashboard layout.

10. Click **OK**.

    The Web Quick Start dashlet displays in the site dashboard.


##### Importing Web Quick Start demo data {#importing-web-quick-start-demo-data}

When you initially add the Web Quick Start dashlet into the site dashboard, the dashlet displays a link that enables you to import the Web Quick Start demo data.

1.  Click **Import Website Data**.

    Choose the sample content to import: **Government** or **Finance**.

    Both samples are identical in functionality but contain different images and section headings. The samples provide an example of how developers can package and import their own sample site data.

    The system imports the data for the demo website.

2.  Refresh the browser running Share.

    The Web Quick Start dashlet now displays a link to the **Web Quick Start Help**.


By default, Web Quick Start is configured to be accessed at `localhost` on port 8080. If these settings are relevant for your installation and the wcmqs.war is running in the same container as Alfresco Content Services, you will now be able to access the Web Quick Start editorial website on [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs).

To change the server host name, port, or web application context from the default values, refer to [Configuring Web Quick Start](#configuring-web-quick-start).



##### Configuring Web Quick Start {#configuring-web-quick-start}

After you have imported the Web Quick Start website data, when you have refreshed Share, or the next time you log on, you can access the Web Quick Start site for configuration.

1.  Open the Web Quick Start site.

2.  Navigate to the Document Library.

    The default site structure will have the following structure:

    ![]({% link content-services/images/WQS-doclib-structure.png %})

    The site structure contains two folders: Quick Start Editorial and Quick Start Live. These folders represent a separation between the work in progress content, and the finished, reviewed, editorially complete content that is then published to the “Live” environment.


If your web container is running on port 8080 and the web application is running in the same container as Alfresco Content Services, the setup is complete and you should be able to access the web site on [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs).

-   **[Configuring the web application host name, port, and context](#configuring-the-web-application-host-name-port-and-context)**  
Use this information to change the host name, port, and context for the Web Quick Start web application.
-   **[Disabling AWE on the Live environment](#disabling-awe-on-the-live-environment)**  
The Web Editor (AWE) is configured to be enabled on the Editorial content, and disabled on the Live. This is controlled by the `isEditorial` flag on the **Quick Start Editorial** metadata. This also (when complete) dictates what can be viewed by using the live web application with regards to publishing go live and expiry dates.
-   **[Configuring the API](#configuring-the-api)**  
 You configure the API in the wcmqs-api.properties file. The file is located in the clientapi JAR file in the alfresco folder. You can override this location by adding a file with the same name on the classpath before the clientapi JAR. For example, if you're using the WQS API from within a JEE webapp then add a wcmqs-api.properties file to the WEB-INF/classes/alfresco/ folder.



###### Configuring the web application host name, port, and context {#configuring-the-web-application-host-name-port-and-context}

Use this information to change the host name, port, and context for the Web Quick Start web application.

The Web Quick Start installation assumes that the web application has been deployed to localhost on port 8080, using the context of wcmqs. This means that the editorial website can be accessed at [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs). The "live" website can be accessed as default on [http://127.0.0.1:8080/wcmqs](http://127.0.0.1:8080/wcmqs).

If wcmqs.war is deployed on a different application server, such as Tomcat, you will need to modify the configuration to use the IP of the host application server where the wcmqs.war is deployed. For example, {tomcat}/webapps/wcmqs. Also, use the port that Tomcat is listening on.

1.  In the Web Quick Start site, navigate to the **Document Library**.

2.  Click **Edit Metadata** on either the **Quick Start Editorial** folder, or the **Quick Start Live** folder.

3.  Configure the **Host Name**, **Port**, and **Web App Context** fields to point to the location your web application (wcmqs.war).

4.  Click **Submit**.


A Web Quick Start installation with two projects, such as an editorial site and a live site, cannot use the same combination of host, port, and context.



###### Disabling AWE on the Live environment {#disabling-awe-on-the-live-environment}

The Web Editor (AWE) is configured to be enabled on the Editorial content, and disabled on the Live. This is controlled by the `isEditorial` flag on the **Quick Start Editorial** metadata. This also (when complete) dictates what can be viewed by using the live web application with regards to publishing go live and expiry dates.

This procedure configures the web application to view the “Live” site structure.

1.  Edit the metadata properties on the **Quick Start Live** folder.

2.  In the **Site Configuration** field, enter the `isEditorial=true` flag.

    ![]({% link content-services/images/WQS-config-isEditorial.png %})

3.  Click **Submit**.


The default configuration sets the host address to 127.0.0.1, so if you are running Web Quick Start locally, you can view the editorial environment on [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs) and the live on [http://127.0.0.1:8080/wcmqs](http://127.0.0.1:8080/wcmqs).

Make sure you don't have two projects, for example, an editorial site and a live site, using the same combination of host, port, and context.



###### Configuring the API {#configuring-the-api}

You configure the API in the wcmqs-api.properties file. The file is located in the `clientapi` JAR file in the `alfresco` folder. You can override this location by adding a file with the same name on the classpath before the clientapi JAR. For example, if you're using the WQS API from within a JEE webapp then add a `wcmqs-api.properties` file to the `WEB-INF/classes/alfresco/ folder`.

You can specify the following properties:

-   **wcmqs.api.alfresco**

    The base URL for the Alfresco repository. The default value is http://localhost:8080/alfresco.

-   **wcmqs.api.user**

    The username to authenticate the WQS API to Alfresco Content Services. It is recommended that this is changed.

-   **wcmqs.api.password**

    The password to authenticate the WQS API to Alfresco Content Services. It is recommended that this is changed.

-   **wcmqs.api.alfresco.cmis**

    The URL that the API will use to reach the CMIS interface. The default value is %{wcmqs.api.alfresco}/service/cmis.

-   **wcmqs.api.alfresco.webscript**

    The base URL the API uses invoke webscripts in the repository. The default value is %.


To override individual properties, place them in a file named wqsapi-custom.properties located on the classpath in a `/alfresco/extension/` (under `/shared/classes/` in a Tomcat installation, for example). You can specify these additional properties in this file:

-   **wcmqs.api.repositoryPollMilliseconds**

    The time the API will wait between checks for the repository being available. This mechanism ensures that the webapp can be started before the repository. The webapp will connect when the repository becomes available. The default value is 2000 milliseconds.

-   **wcmqs.api.sectionCacheSeconds**

    The time the API caches section objects before reloading them from the repository. The default value is 60 seconds.

-   **wcmqs.api.websiteCacheSeconds**

    The time the API caches website objects before reloading them from the repository. The default value is 300 seconds.


#### Alfresco Web Editor {#alfresco-web-editor}

The Alfresco Web Editor is a Surf-based web application that provides in-context editing capabilities for repository content. The editor provides a mechanism for non-technical users to make edits to content directly within a web page.

The Alfresco Web Editor uses the Forms Service default template.

The Web Editor is packaged as a stand-alone WAR file so that it can be deployed to web applications that are in the sample instance, or remote, to the server. When it's deployed, an banner displays in your deployed web pages showing the Web Editor tab and it identifies the editable content. By default, it assumes that you have JavaScript enabled but it can also run without JavaScript.

-   **[Web Editor deployment](#web-editor-deployment)**  
The simplest way to deploy the Web Editor (AWE) is to use the pre-built WAR (awe.war) file and to deploy it in the same application server instance of your web application.
-   **[Configuring the Web Editor](#configuring-the-web-editor)**  
The following Web Editor components must be configured:
-   **[Sample web application using Web Editor](#sample-web-application-using-web-editor)**  
A sample customer WAR file is available in the Web Editor distribution. It demonstrates how a customer might use the Web Editor in a very simple JSP-based web application. This sample must not be used in a production environment and is not supported.



##### Web Editor deployment {#web-editor-deployment}

The simplest way to deploy the Web Editor (AWE) is to use the pre-built WAR (awe.war) file and to deploy it in the same application server instance of your web application.

The following diagram shows an example Web Editor deployment in the same application server as the repository.

![]({% link content-services/images/Alfresco-web-editor.png %})

The Web Editor is a Surf-based application, therefore it is also possible to deploy it in a different application server instance from the repository.

By default the AWE assumes your repository is at `http://localhost:8080/alfresco/s/`. If your repository is not located here, you can use custom configuration to tell the AWE where to find your repository. To change the default repository location, add the following XML in the AWE configuration file with your values for **MYSERVER** and **MYPORT**:

```xml
<alfresco-config> 
   <plug-ins> 
      <element-readers> 
         <element-reader element-name="remote" class="org.springframework.extensions.config.RemoteConfigElementReader" /> 
      </element-readers> 
   </plug-ins> 

   <config evaluator="string-compare" condition="Remote"> 
      <remote> 
         <endpoint> 
            <id>alfresco</id> 
            <name>Alfresco - user access</name> 
            <description>Access to Alfresco Repository WebScripts that require user authentication</description> 
            <connector-id>alfresco</connector-id> 
            <endpoint-url>http://MYSERVER:MYPORT/alfresco/s 
            </endpoint-url> 
            <identity>user</identity> 
         </endpoint> 
      </remote> 
   </config> 
</alfresco-config> 
```

The AWE configuration file is placed on the classpath named `shared/classes/alfresco/web-extension/awe-config-custom.xml`.

The deployment comprises the following components:

-   **AWE.war**

    The Web Editor WAR file.

-   **Web Application**

    Your own web application.

-   **AWE tag library**

    Provides the ability to mark areas of the page as editable. The areas marked can represent any property or content from the repository.

-   **Web Editor Framework (WEF)**

    The client-side JavaScript framework on which the Web Editor is built. It is built using YUI and can be extended easily. New tabs and buttons can be packaged and dropped into the framework. This provides the core product features, and also provides the ability to build additional custom plugins.

    When the Web Editor is enabled, the WEF renders the tool bar and basic in-context editing buttons and functionality. If the WEF is deployed as standalone, the default blank tool bar is rendered.


-   **[Deploying the Web Editor](#deploying-the-web-editor)**  
The Web Editor distribution consists of a single zip file named `alfresco-webeditor-5.2.7.zip`.
-   **[Deploying the Web Editor to a Surf application](#deploying-the-web-editor-to-a-surf-application)**  
The Web Editor distribution also includes all the files required to provide the functionality within an existing Surf application.



###### Deploying the Web Editor

The Web Editor distribution consists of a single zip file named `alfresco-webeditor-5.2.7.zip`.

1.  Shut down your server.

2.  Browse to the Alfresco Content Services download area.

3.  Download the `alfresco-webeditor-5.2.7.zip` file.

4.  Deploy the awe.war file into the same application server instance as the repository.

5.  Copy the `alfresco-webeditor-taglib.jar` file to the `WEB-INF/lib` folder of your application.

6.  To include the tag library in your application, add the following tag library declaration to your JSP page:

    ```text
    <%@ taglib uri="http://www.alfresco.org/tags/awe" prefix="awe" %>
    ```

    Once the tag library is declared, you can use the `startTemplate`, `endTemplate` and `markContent` tags within your application.

7.  Restart your server.


###### Deploying the Web Editor to a Surf application

The Web Editor distribution also includes all the files required to provide the functionality within an existing Surf application.

1.  Copy the following files to your application `WEB-INF/lib` directory:

    1.  `yui-2.7.0.jar`

    2.  `spring-webeditor-1.0.0.CI-SNAPSHOT.jar`

    3.  `alfresco-forms-client.jar`

    4.  `alfresco-webeditor-plugin.jar`

    The `yui` and `spring-webeditor` JAR files represent the Web Editor Framework (WEF) upon which the Web Editor is built. The remaining `alfresco-form-client` and `alfresco-webeditor-plugin` JAR files provide the Web Editor functionality.

2.  If you plan to use the Web Editor within the application (rather than the application being a host for the Web Editor services) you also must copy the following additional files into the `WEB-INF/lib` directory:

    1.  `spring-webeditor-client-jsp-1.0.0.CI-SNAPSHOT.jar`

    2.  `alfresco-webeditor-taglib.jar`

3.  If you use the additional files, define a servlet filter in your application's web.xml file.

    If you do not provide the filter, the tags will be ignored. The following filter configuration is required:

    ```xml
    <filter>
        <filter-name>Alfresco Web Editor Filter</filter-name>
        <description>Enables support for the Alfresco Web Editor</description>
        <filter-class>org.alfresco.web.awe.filter.WebEditorFilter</filter-class>
        <init-param>
           <param-name>contextPath</param-name>
           <param-value>/your-context-path</param-value>
        </init-param> 
    </filter>
      
    <filter-mapping>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

4.  Set the `contextPath` parameter.

    If you do not provided a value for this parameter, a default `contextPath` of /awe is presumed.

    No further configuration is required as all the necessary Spring context files and configuration files are contained within the JAR files. However, there is no default hook point for custom form configuration but this can be located anywhere within your application.

##### Configuring the Web Editor

The following Web Editor components must be configured:

-   tag library, that is, the `markContent` tag used to define editable content
-   servlet filter
-   form configuration

-   **[Configuring the tag library](#configuring-the-tag-library)**  
there are a number of steps needed to configure the tag library.
-   **[Configuring the servlet filter](#configuring-the-servlet-filter)**  
The `startTemplate`, `markContent`, and `endTemplate` tags will only render their output if they detect the presence of the Web Editor servlet filter. The tags can remain in the JSP page in production and have no effect until the servlet filter configuration is added to the web.xml file.
-   **[Configuring Web Editor forms](#configuring-web-editor-forms)**  
The Web Editor (AWE) uses a form to edit the node referenced by a `markContent` tag. By default, the form displayed will contain the `cm:title`, `cm:description`, and `cm:content` fields. An alternative form can be used by providing the `markContent` tag with a `formId` attribute.



###### Configuring the tag library {#configuring-the-tag-library}

there are a number of steps needed to configure the tag library.

The tag library comprises the following tags:

-   `startTemplate`
-   `markContent`
-   `endTemplate`

1.  The `startTemplate` tag bootstraps the WEF using a script element that executes a web script. Place this tag in the `head` section of your page.

    The `startTemplate` tag has only one optional attribute.

    -   **toolbarLocation**

        Controls the initial location of the tool bar. The valid values are: `top`, `left`, and `right`. The default is `top`.

    The following shows an example of how to use the `startTemplate` tag:

    ```text
    <awe:startTemplate toolbarLocation="top" />
    ```

2.  Use the `markContent` tag to indicate an editable area of the page.

    The tag renders an edit icon that, when clicked, displays a form for editing the corresponding content and properties, or both.

    The `markContent` tag has two mandatory attributes and two optional attributes.

    -   **id**

        The mandatory identifier attribute specifies the NodeRef of the node to be edited.

    -   **title**

        The mandatory title attribute defines a descriptive title for the editable area being marked. The title used is used in the quick edit menu of editable items, as the title of the form edit popup/dialog and the alt text and tool tip text of the edit icon.

    -   **formId**

        This is an optional attribute that specifies which form will be used when the marked area is edited.

    -   **nestedMarker**

        This is an optional attribute, which defines whether the editable area is nested within another HTML tag that represents the content being edited. If it is set to true, the whole parent element is highlighted when the area is selected in the quick edit menu. If set to "false" only the edit icon is highlighted.

    An example use of the markContent tag is shown:

    ```text
    <awe:markContent id="<%=subTextNodeRef%>" formId="description" title="Edit Description" nestedMarker="true" />
    ```

3.  The `endTemplate` tag initializes the Web Editor with details of all the marked content areas on the page. It also renders a script element that executes the WEF resources web script, which starts the process of downloading all the assets required to render and display the tool bar and all configured plugins. Place this tag just before the closing body element.

    The `endTemplate` tag does not have any attributes.

    The following shows an example of how to use the `endTemplate` tag:

    ```text
    <awe:endTemplate />
    ```


###### Configuring the servlet filter

The `startTemplate`, `markContent`, and `endTemplate` tags will only render their output if they detect the presence of the Web Editor servlet filter. The tags can remain in the JSP page in production and have no effect until the servlet filter configuration is added to the web.xml file.

1.  Add the following servlet filter configuration to the web application's `web.xml` file:

    ```text
    <filter>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <description>Enables support for the Alfresco Web Editor</description>
       <filter-class>org.alfresco.web.awe.filter.WebEditorFilter</filter-class>
    </filter>
      
    <filter-mapping>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

    This enables the tags.

2.  Set the following two optional parameters:

    ```text
    <init-param>
       <param-name>contextPath</param-name>
       <param-value>/quickstart</param-value>
    </init-param>
    
    <init-param>
       <param-name>debug</param-name>
       <param-value>true</param-value>
    </init-param>
    ```

    These parameters control the `contextPath` that is used when URLs to the Web Editor are generated and the debug mode.


###### Configuring Web Editor forms

The Web Editor (AWE) uses a form to edit the node referenced by a `markContent` tag. By default, the form displayed will contain the `cm:title`, `cm:description`, and `cm:content` fields. An alternative form can be used by providing the `markContent` tag with a `formId` attribute.

Out of the box, only two other forms are configured: a form with an identifier of `title`, and one with an identifier of `description`. As the identifiers indicate, the forms display a single property: `cm:title` and `cm:description`, respectively. The node type is presumed to be `cm:content`.

If you have custom types or wish to specify other properties, you can use the forms configuration techniques.

When starting up, the AWE looks for a configuration file on the classpath named `shared/classes/alfresco/web-extension/awe-config-custom.xml`. Place any custom form definitions in this file.



##### Sample web application using Web Editor {#sample-web-application-using-web-editor}

A sample customer WAR file is available in the Web Editor distribution. It demonstrates how a customer might use the Web Editor in a very simple JSP-based web application. This sample must not be used in a production environment and is not supported.

A sample customer tag library is provided, which includes two tags. These tags are included as a demonstration sample and should never be used in a production environment.

-   **`content`**

    Allows content to be pulled from a repository and sends output to a JSP page. The `content` tag requires one mandatory attribute called `nodeRef`

-   **`property`**

    Allows properties to be pulled from a repository and sends output to a JSP page. The `property` tag requires two mandatory attributes: `nodeRef` and `property`.


The following example show the use of these tags:

```xml
<customer:content nodeRef="<%=mainTextNodeRef%>" />
<customer:property nodeRef="<%=subTextNodeRef%>" property="cm:description" />
```

The sample customer application consists of several, simple JSP pages that display the content and properties of two nodes from the repository. Update the `/includes/noderefs.jsp` page to provide the NodeRefs of two nodes in your repository.

By default, the sample pulls content from the repository located at http://localhost:8080/alfresco, using a user name and password of admin. These values can be supplied using `context-param` values in the `web.xml` file, for example:

```xml
 <context-param>
      <param-name>org.customer.alfresco.host</param-name>
      <param-value>localhost</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.port</param-name>
      <param-value>8080</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.context</param-name>
      <param-value>alfresco</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.username</param-name>
      <param-value>admin</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.password</param-name>
      <param-value>admin</param-value>
   </context-param>
```

### Installing and configuring Google Docs Integration

Google Docs Integration allows you to use Google Docs to edit document content stored in Alfresco Content Services, as an alternative to the online and offline editing capabilities in Alfresco Share.

When you use the setup wizards to install Alfresco Content Services, the Google Docs Integration feature is applied and enabled for supported content in an installation.

If you install manually, you need to apply the Google Docs AMP files separately to enable the feature.

With Google Docs Integration, you'll see new actions for creating documents, spreadsheets, and presentations. Also, you'll see an action called **Edit in Google Docs** on all supported document types.

> **Note:** When configuring Google Docs Integration with Alfresco Content Services, you don't need to identify a 'system' Google account.

-   **[Installing Google Docs Integration manually](#installing-google-docs-integration-manually)**  
Google Docs Integration is installed by default when you install Alfresco Content Services using the setup wizards. If you are installing manually, use these steps to install Google Docs Integration.
-   **[Configuring Google Docs Integration](#installing-and-configuring-google-docs-integration)**  
There are two ways to configure the Google Docs Integration: modify the properties in `alfresco-global.properties` or update the settings in the **Google Docs Console** of the Admin Console (Enterprise-only).
-   **[Google Docs supported document types](#google-docs-supported-document-types)**  
Google Docs restricts the formats of files or documents that can be uploaded or created.


#### Installing Google Docs Integration manually

Google Docs Integration is installed by default when you install Alfresco Content Services using the setup wizards. If you are installing manually, use these steps to install Google Docs Integration.

1.  Browse to the [Support Portal](https://support.alfresco.com){:target="_blank"}, and download the following files:

    |alfresco-googledocs-repo-3.0.4.x-ent.amp|This AMP contains the Google Docs functionality that is applied to the core repository. The AMP should be applied to the `tomcat/webapps/alfresco` directory.|
    |alfresco-googledocs-share-3.0.4.x-ent.amp|This AMP file contains the additional Google Docs functionality that is applied to an existing Alfresco Share user interface. The AMP should be applied to the `tomcat/webapps/share` directory.|

2.  Change into the root of the Alfresco Content Services installation directory. Directories specified in the following procedures are relative to this directory (`<installLocation>`).

3.  Move the `alfresco-googledocs-repo-3.0.4.x-ent.amp` file to the `amps` directory.

4.  Move the `alfresco-googledocs-share-3.0.4.x-ent.amp` file to the `amps_share` directory.

5.  Stop the Alfresco Content Services server.

6.  Delete the `tomcat\webapps\alfresco` and `tomcat\webapps\share folders` in the installation directory.

7.  Use the Module Management Tool (MMT) to install the AMP files into the relevant WAR file:

    For Alfresco Content Services repository:

    ```java
    java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps\alfresco-googledocs-repo-3.0.4.x-ent.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

    For Alfresco Share:

    ```java
    java -jar <installLocation>\bin\alfresco-mmt.jar install <installLocation>\amps_share\alfresco-googledocs-share-3.0.4.x-ent.amp <installLocation>\tomcat\webapps\share.war  
    ```

    Alternatively, if your installation is running in the Tomcat application server, you can use the `<installLocation>\bin\apply_amps` command to apply all AMP files that are located in both the amps and `amps_share` directories.

    Install both Google Docs AMP files at the same time by using the apply_amps command:

    -   Linux: `bin/apply_amps.sh`
    -   Windows: `bin\apply_amps.bat`
    The `apply_amps` command checks the version of Alfresco Content Services so that you install the relevant AMP package to the correct version.

8.  Start the server.


#### Configuring Google Docs Integration {#configuring-google-docs-integration}

There are two ways to configure the Google Docs Integration: modify the properties in `alfresco-global.properties` or update the settings in the **Google Docs Console** of the Admin Console (Enterprise-only).

Enterprise-only releases: For advanced configuration, you can customize how Google accounts are authenticated. See [Authenticating Google accounts with Alfresco Content Services](#authenticating-google-accounts-with-alfresco-content-services) for more information.

-   **[Configuring Google Docs using properties](#configuring-google-docs-using-properties)**  
The following properties can be configured for Google Docs Integration in the `alfresco-global.properties` file.
-   **[Configuring Google Docs using Admin Console](#configuring-google-docs-using-admin-console)**  
The **Google Docs Console** provides the settings for enabling and controlling Google Docs Integration.
-   **[Authenticating Google accounts with Alfresco Content Services](#authenticating-google-accounts-with-alfresco-content-services)**  
In Enterprise-only releases, you can register a custom Google configuration for API access.


##### Configuring Google Docs using properties

The following properties can be configured for Google Docs Integration in the `alfresco-global.properties` file.

-   **googledocs.enabled**

    Enables the Google Docs functionality. By default, this property is set to true. If you set this option to false, the **Edit in Google Docs** action will not be available. Documents that are currently being edited will still be available using the **Resume editing in Google Docs** action until they are saved or discarded.

-   **googledocs.idleThresholdSeconds**

    Sets the idle time threshold in seconds. Additional Google users that you invite to collaborate on the document will be considered to be 'idle' after this period. The period is measured from the time when the user last made a change to the document. When saving documents back to Alfresco Content Services, or discarding changes, you must confirm that you want to disconnect any non-idle users before the action completes.


> **Note:** Enterprise-only releases: You can also set these properties in the Admin Console. See [Configuring Google Docs using Admin Console](#configuring-google-docs-using-admin-console) for more.


##### Configuring Google Docs using Admin Console

The **Google Docs Console** provides the settings for enabling and controlling Google Docs Integration.

1.  Open the Admin Console.

2.  In the **Consoles** section, click **Google Docs Console**.

3.  Set the properties:

    |Google Docs property|Example setting|What is it?|
    |--------------------|---------------|-----------|
    |googledocs.enabled|true|Enables the Google Docs functionality.If you set this option to false, the **Edit in Google Docs** action will not be available. Documents that are currently being edited will still be available using the **Resume editing in Google Docs** action until they are saved or discarded.|
    |googledocs.idleThresholdSeconds|600|Sets the idle time threshold in seconds.Additional Google users that you invite to collaborate on the document will be considered to be 'idle' after this period. The period is measured from the time when the user last made a change to the document. When saving documents back to Alfresco Content Services, or discarding changes, you must confirm that you want to disconnect any non-idle users before the action completes.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


##### Authenticating Google accounts with Alfresco Content Services

In Enterprise-only releases, you can register a custom Google configuration for API access.

When this configuration is added to the Google Docs Integration, you can define the OAuth flow by creating your own web application configuration in the Google API Manager.

1.  Place [google-auth-return.html](https://raw.githubusercontent.com/Alfresco/googledrive/master/google-auth-return.html){:target="_blank"}. on a web server that's accessible by all users.

    This file lets users authenticate their Google account with Alfresco Content Services.

2.  Register the Google Docs Integration from the Google API Manager: [https://console.developers.google.com](https://console.developers.google.com){:target="_blank"}..

    Check that you have enabled the Google Drive API.

3.  Click **Library** in the left-hand navigation, select **Drive API**, and then **Enable**.

    This allows your registered application to access the Drive API.

4.  Click **Credentials**, select **Create Credentials**, and then pick **OAuth client ID** from the list.

5.  Click **Configure consent screen**, complete the required fields, and then select **Save**.

6.  Select **Web Application** as the application type.

7.  Enter a name for your application.

    This is what the application will be known as in your users Google Account.

8.  Enter a path in the **Authorized redirect URIs** field.

    This is the path to the `google-auth-return.html` page.

9.  Click **Create**.

    You may be see a popup showing your Client ID and Secret. If so, click **OK**.

10. Navigate to your registered application by selecting the name.

11. Click **Download JSON**.

    Next, use the Repository Administration Console to add your custom configuration.

12. Open Alfresco Share, and click **Admin Tools** on the toolbar, then select **Repository Administration Console**.

13. In the **Consoles** section, click **Google Docs Console**.

14. Copy the content of the JSON file into the **Google Docs OAuth Config** field.

15. Click **Save**.

    > **Important:** Before completing these steps, be aware that:

    -   If there are files currently being edited in Google Docs when changing this configuration, it will cause users to lose the ability to use the **Check in** action to bring those files back into Alfresco Content Services. We recommend that all files are checked back into Alfresco Content Services before switching the configuration.
    -   Switching the integration repeatedly between different configurations can corrupt the Google authentication store in Alfresco Content Services for your users. If this happens, users will need to remove access to the integration from their Google Account so that their connection can be set up again.


#### Google Docs supported document types {#google-docs-supported-document-types}

Google Docs restricts the formats of files or documents that can be uploaded or created.

The following table shows the file format restrictions for content that integrates with Google Docs.

|File type|Description|
|---------|-----------|
|DOC|A Microsoft Word 97-2003 document.|
|XLS|A Microsoft Excel 97-2003 Workbook.|
|PPT|A Microsoft PowerPoint 97-2003 Presentation.|
|DOCX|An XML-based Microsoft Word document.|
|XLSX|An XML-based Microsoft Excel Workbook.|
|PPTX|An XML-based Microsoft PowerPoint presentation.|

> **Note:** You can edit the DOC, XLS, and PPT formats in Google Docs but when you save the content back to Alfresco Content Services, you must confirm that these formats will be converted to the equivalent Microsoft Office 2007 (OOXML) formats.

Google places further restrictions on the size and complexity of documents that can be edited in Google Docs. The **Edit in Google Docs** action is not available for documents or spreadsheets larger than 2 MB and presentations larger than 50 MB. Google also prevents editing of other documents that exceed their published limits. See the published [Google size limits](https://support.google.com/drive/answer/37603?hl=en){:target="_blank"}.
