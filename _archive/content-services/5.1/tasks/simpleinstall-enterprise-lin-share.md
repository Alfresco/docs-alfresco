---
author: Alfresco Documentation
source: Documented during installation
publisher: Alfresco Software, Inc.
audience: 
---

# Installing Alfresco on Linux using the Share Installer

The Alfresco One Share Installer for Linux installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP.

**Note:** The Alfresco One Installer is recommended for most purposes. See [Installing Alfresco on Linux using the Alfresco One Installer](simpleinstall-enterprise-lin.md) for more information. Use the Alfresco One Share Installer only if you have a specific requirement for it; for example, if you are linking to an Alfresco repository on a different server, that has been installed using the Alfresco One Platform Installer.

1.  Download the following installation file:

    alfresco-one-share-installer-5.1.5-linux-x64.bin

    Files are available from the [Support Portal](http://support.alfresco.com/).

    This Alfresco setup wizard is for 64-bit Linux systems.

2.  Execute the downloaded file using the following commands:

    ```
    chmod 777 alfresco-one-share-installer-5.1.5-linux-x64.bin 
    ./alfresco-one-share-installer-5.1.5-linux-x64.bin
    ```

    **Note:** Avoid running applications as the root \(Linux administrator\) user where possible, however if you must install Alfresco as the root user, then run the alfresco-one-share-installer-5.1.5-linux-x64.bin file with `sudo` specified:

    ```
    chmod 777 alfresco-one-share-installer-5.1.5-linux-x64.bin 
    sudo ./alfresco-one-share-installer-5.1.5-linux-x64.bin
    ```

    The setup wizard starts.

3.  Select the language that you wish to use for the installation.

    This sets the language to be used for the setup wizard.

    **Note:** This does not set the language that is used in Alfresco.

4.  On the Setup - Alfresco One Share window, click **Next**.

5.  On the Installation Type window, choose how you want to use the setup wizard.

    There are two types of installation in the setup wizard:

        |****Easy****|Easy type installs Alfresco One Share using the default options and configuration. This install type requires you to enter locations for where you want to install Share, and which repository you want to connect to. Choose this route to install with the default environment.**Note:** If you have previously installed Alfresco and the server is running, when you run this setup wizard again, you might be prompted to enter alternative port numbers for the components and services that you install, for example, for the Tomcat application server, FTP port, and the RMI port.

|
    |****Advanced****|Advanced type installs Alfresco One Share but asks you to specify the components that you want to install, and the Tomcat configuration parameters that you require.|

    **Note:** When choosing between the **Easy** or **Advanced** installation, consider your basic requirement. The Alfresco One Share Installer provides a Tomcat server to run Alfresco Share, so if you have your Alfresco repository on the same machine as your Alfresco Share installation, you must use the Advanced setup, so that you can specify alternative Tomcat ports for the Share Tomcat server.

    To complete the **Easy** setup wizard:

    1.  Select **Easy**, and then click **Next**.

    2.  On the Installation Folder window, click Next to accept the default location.

        **Note:** You must use ASCII characters only when setting the installation folder using the Alfresco setup wizard.

    3.  On the Connect Alfresco One Share to the repository window, enter the location of your Alfresco repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

6.  On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

7.  On the Completing the Alfresco One Share Setup Wizard window, click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Share. By default, these options are selected and will launch when you click **Finish**. If you do not want to start Alfresco at this point, deselect the Launch Alfresco One Share check box.

8.  Click **Finish** to complete the installation.

9.  To complete the **Advanced** setup wizard, select **Advanced** and then click **Next**.

    Follow the remaining steps in this task.

10. On the Select Components window, select the components that you want to install. Deselect the components that you do not want to install.

    Java is the only option available to select or deselect.

11. When you have finished selecting the components, click **Next**.

12. On the Installation Folder window, click Next to accept the default location.

    For example, the default location is /opt/alfresco-one-share.

    Alternatively, click the ![](../images/installlocation-icon.png) icon to choose another location.

    **Note:** You must use ASCII characters only when setting the installation folder using the Alfresco setup wizard.

13. On the Tomcat Port Configuration window, enter the following Tomcat configuration parameters:

    **Note:** The Alfresco One Share Installer provides its own Tomcat server to run Alfresco Share, so if you have your Alfresco repository on the same machine as your Alfresco Share installation, you must specify alternative Tomcat ports for the Share Tomcat server.

    1.  Web Server Domain

        For example, the default is 127.0.0.1

        The URL http://127.0.0.1:8080/share is based on the web server domain and the Tomcat port number that you specify on the Tomcat Port Configuration window. The default of 127.0.0.1 can be used on this machine to verify that Alfresco is running successfully. However, it is not an externally addressable URL, which means that it is not possible for users on other machines to access this URL. To make sure that other users can access the machine where Alfresco is installed, you need to define and create a publicly addressable name.

    2.  Tomcat port

        For example, the default is 8080.

    3.  Tomcat Shutdown port

        For example, the default is 8005.

    4.  Tomcat SSL Port

        For example, the default is 8443.

    5.  Tomcat AJP Port

        For example, the default is 8009.

14. On the Connect Alfresco One Share to the repository window, enter the location of your Alfresco repository, in the format: `http://yourserver:port/alfresco` or accept the default setting `http://localhost:8080/alfresco`

15. On the Ready to Install window, click **Next**.

    The Installing window displays, showing the progress of the installation.

16. On the Completing the Alfresco One Share Setup Wizard window, deselect the Launch Alfresco One Share check box, and click **Finish**.

    This window shows check boxes that determine whether you will see the Readme file, the [Getting Started](http://www.alfresco.com/resources/documentation/getting-started/) web page, and also whether to launch Alfresco Share. By default, these options are selected and will launch when you click **Finish**. We recommend that you do not launch Alfresco Share yet, because you need to complete the next steps before starting your servers.

17. Click **OK** to close the Readme.

18. Link your Share instance to a repository, by applying the Share Services AMP to your chosen Alfresco Platform instance.

    **Important:** If you do not apply the Share Services AMP to the Alfresco repository, Alfresco Share will not work correctly, and when you start up Alfresco Share, you will see the message:

    ```
    Alfresco is running without Share Services.  See your System Administrator for more details.
    ```

    1.  Navigate to the alfresco-one-share/amps directory, and locate the alfresco-share-services.amp file.

    2.  Copy the alfresco-share-services.amp file to your Alfresco instance \(alfresco-one-platform/amps\), on the machine that hosts your Alfresco Platform repository.

    3.  Use the guidance in [Installing an Alfresco Module Package](amp-install.md) to apply the AMP to your repository.

    4.  Restart the Alfresco Platform instance where you have installed the Share Services AMP to see that the changes have been applied.

19. Manually start your Tomcat server for the instance that you have just installed with the Alfresco One Share Installer:

    From the alfresco-one-share installation directory: `service alfresco start`

20. Log on to Alfresco Share \(http://localhost:port/share\) as the `admin` user. Enter the password that you specified in the Admin Password window.

21. Check for error messages as you open Alfresco Share.

    Use the information in [Troubleshooting the installation](install-share-troubleshooting.md) to help you.

    If you need to change any settings after installation, these are stored in the `share-config-custom.xml` file. See [Configuring Share with the share-config-custom.xml file](share-customizing-custom-config-file.md) for more information.

22. To fully stop Alfresco, you must stop all the services:

    `service alfresco stop`


**Parent topic:**[Using the Alfresco installers on Linux](../concepts/installs-lin-intro.md)

