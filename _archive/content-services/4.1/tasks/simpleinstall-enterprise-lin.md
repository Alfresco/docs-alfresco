---
author: Alfresco Documentation
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
category: Installation
keyword: [install, Linux]
---

# Installing Alfresco Enterprise on Linux

The setup wizard for Linux installs all the software and components that you require for running Alfresco. This setup wizard installs Alfresco and additional software, including a Tomcat application server, PostgreSQL database, JDK, OpenOffice, SWFTools, and ImageMagick.

1.  Download the following installation file:

    alfresco-enterprise-4.1.10-installer-linux-x64.bin

    This Alfresco setup wizard is for 64-bit Linux systems.

    **Important:** If you're using Ubuntu 10.04 or later, you must increase the SHMMAX value **before** starting the installer. Refer to [PostgreSQL official documentation ](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server#shared_buffers) \(shared\_buffers section\) to evaluate the proper value for SHMMAX. Change the SHMMAX value \(minimum value required is 40000\):

    ```
    sudo sysctl -w kernel.shmmax=**newValueInBytes**
    ```

    and make the change reboot resistant:

    ```
    sudo echo "kernel.shmmax=**newValueInBytes**" >> /etc/sysctl.conf
    ```

2.  Execute the downloaded file using the following commands:

    ```
    chmod 777 alfresco-enterprise-4.1.10-installer-linux-x64.bin 
    ./alfresco-enterprise-4.1.10-installer-linux-x64.bin
    ```

    **Note:** You should avoid running applications as the root \(Linux administrator\) user where possible, however if you must install Alfresco as the root user, then run the alfresco-enterprise-4.1.10-installer-linux-x64.bin file with `sudo` specified:

    ```
    chmod 777 alfresco-enterprise-4.1.10-installer-linux-x64.bin 
    sudo ./alfresco-enterprise-4.1.10-installer-linux-x64.bin
    ```

    The setup wizard starts.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

4.  On the **Setup - Alfresco Enterprise** window, click **Next**.

5.  On the Installation type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

        |****Easy****|Easy type installs Alfresco using the default options and configuration. This install type requires you to enter information in only two fields: the Alfresco install location and the administrator password. Choose this route to install Alfresco with the default environment.**Note:** If you have previously installed Alfresco and the server is running, when you run this setup wizard again, you may be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.

|
    |****Advanced****|Advanced type installs Alfresco but lets you configure the server ports and service properties. You can also choose which additional components to install.|

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation folder window, click Next to accept the default location.

        **Note:** You must use ASCII characters only when setting the installation folder using the Alfresco setup wizard.

    3.  On the Admin Password window, enter a password for the Administrator user \(`admin`\).

        CAUTION:

        You must use ASCII characters only when setting the password using the installer. You can reset the password \(to include non-ASCII characters\) after installation.

    4.  Repeat the password, and then click **Next**.

    5.  Click **Next** through the remaining windows in the setup wizard.

    6.  Click **Finish** to complete the installation.

        Go to the step for the **Completing the Alfresco Enterprise Setup Wizard** window and launching Alfresco Share.

    To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

6.  On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    You can select from the following components:

    -   Java
    -   PostgreSQL
    -   SharePoint
    -   Web Quick Start
    -   OpenOffice
    **Note:** You cannot deselect the Alfresco component because it is installed by default.

7.  When you have finished selecting the components, click **Next**.

8.  On the Installation folder window, click Next to accept the default location.

    For example, the default location is /opt/alfresco-4.1.x.

    Alternatively, click the ![](../images/installlocation-icon.png) icon to choose another location.

    **Note:** You must use ASCII characters only when setting the installation folder using the Alfresco setup wizard.

9.  On the Database Server Parameters window, enter a port number for your database.

    Enter a suitable port number or click **Next** to accept the default of 5432.

10. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    1.  Web Server Domain

        For example, the default is 127.0.0.1.

        The URL [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share) is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where Alfresco is installed, you need to define and create a publicly addressable name.

    2.  Tomcat port

        For example, the default is 8080.

    3.  Tomcat Shutdown port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

11. On the Alfresco FTP Port window, enter a port number for the Alfresco FTP server, and then click **Next**.

12. On the Alfresco RMI Port window, enter a port number for the RMI service, and then click **Next**.

13. On the Admin Password window, type a password. Repeat the password, and then click **Next**.

    This sets the password for the Alfresco Administrator user account \(admin\).

    CAUTION:

    You must use ASCII characters only when setting the password using the installer. You can reset the password \(to include non-ASCII characters\) after installation.

14. \(Optional\) If you are installing SharePoint Protocol Support, the Alfresco SharePoint Port window displays. Enter a port number, and then click **Next**.

15. \(Optional\) If you are installing the OpenOffice component, the OpenOffice Server Port window displays. Enter a port number on which the OpenOffice server will listen, and then click **Next**.

    **Note:** If you are installing OpenOffice, the system requires the following additional libraries, which are not supplied with the Alfresco installer.

    -   linux-vdso.so.1
    -   libXext.so.6
    -   libm.so.6
    -   libc.so.6
    -   libdl.so.2
    -   libpthread.so.0
    -   libfreetype.so.6
    -   libX11.so.6
    -   libXau.so.6
    -   ld-linux-x86-64.so.2
    -   libXdmcp.so.6
    If these libraries are not already available on your system, you may need to install them. For example, you can use your system's package manager to install the following packages: libXext, glibc, freetype, libX11, libXau, and libXdmcp.

16. On the Service Startup Configuration window, there are two options for starting up the Alfresco services.

        |****Manual****|Sets the services to be started manually.|
    |****Auto****|Sets the services to start up automatically when you start your machine.|

    Select the services start up option, and then click **Next**.

17. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

18. On the **Completing the Alfresco Enterprise Setup Wizard** window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Share. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco at this point, deselect the **Launch Alfresco Enterprise Share** check box.

    **Important:** If you are installing the S3 connector as part of your Alfresco installation, deselect the **Launch Alfresco Enterprise Share** check box. You must not start Alfresco before applying the S3 AMP file.

19. Click **OK** to close the Readme.

    The Alfresco server starts and then Alfresco Share launches in your default browser.

    **Important:** It may take several minutes to start the Alfresco server and to launch Share. Your browser opens and tries to connect to [http://127.0.0.1:8080/share](http://127.0.0.1:8080/share).

20. Log on to Alfresco Share as the admin user. Enter the password that you specified in the Admin Password window.

    The Alfresco server is launched automatically as a service called `alfresco`. This service comprises the following individual services:

    -   `postgresql`
    -   `Tomcat Server`
    If you did not automatically launch Alfresco at the end of the setup wizard, to start Alfresco, you need to start all the services.

21. Manually start the Alfresco server:

    `service alfresco start`

    To start only the `tomcat` service:

    `service alfresco start tomcat`

22. To fully stop Alfresco, you must stop all the services:

    `service alfresco stop`


**Parent topic:**[Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)

