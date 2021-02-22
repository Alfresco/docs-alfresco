---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Uninstalling Alfresco

The topic describe how to uninstall Alfresco.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

## Uninstalling Alfresco on Windows

1.  Stop the Alfresco server using different processes, such as `servicerun.bat` through the **Application Manager** and `services.msc`.

    The Alfresco server has successfully stopped.

2.  Run `uninstall.exe` from your Alfresco installation directory.

    The installer prompts you to confirm the uninstallation of Alfresco and all its modules.

3.  Click **Yes**.

    The Alfresco uninstall window appears and the uninstall process starts.


The uninstall process is complete. The Alfresco installation directory has been successfully removed from your system.

**Note:** If you have added any folders to your installation directory, these folders are not removed by the uninstall process, and you will need to remove them manually.

## Uninstalling Alfresco on Linux

The uninstalling steps below are based on the following assumptions:

-   Alfresco is installed using the installer/ setup wizard.
-   Alfresco is installed at /opt/alfresco-x.x.x.
-   Alfresco service is created.
-   Installed the X Window System and a graphical desktop environment.

1.  Navigate to the directory where Alfresco is installed.

    For example, the default location is /opt/alfresco-x.x.x.

2.  Launch the uninstall binary file.

    You will see the Question window.

3.  Click **Yes** to continue with uninstalling Alfresco.

    If you do not want to uninstall Alfresco, click **No**.

    The Setup window displays the progress bar for uninstalling Alfresco.

4.  After the uninstall process is complete, click **OK** to close the window.


The uninstall process is complete. The Alfresco installation directory has been successfully removed from your system.

**Note:** If you have added any folders to your installation directory, these folders are not removed by the uninstall process, and you will need to remove them manually.

**What to do next:**

[Go to Installing  Alfresco flowchart](../concepts/install-singleinstance.md)

[Go to Upgrading  Alfresco flowchart](../concepts/upgrade-singleinstance.md) 

**Next:** [  Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)

