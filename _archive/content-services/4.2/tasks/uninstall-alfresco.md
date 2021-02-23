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

## Uninstalling Alfresco Enterprise on Windows

1.  Stop the Alfresco server using different processes, such as `servicerun.bat` through the **Application Manager** and `services.msc`.

    Alfresco server has successfully stopped.

2.  Run `uninstall.exe` from your Alfresco installation directory.

    The installer prompts you to confirm uninstallation of Alfresco and all its modules.

3.  Click **Yes**.

    The **Uninstalling Alfresco Enterprise Setup** window appears, initiating the uninstalling process is started.


The uninstallation process is complete. The Alfresco installation directory has been successfully removed from your system.

## Uninstalling Alfresco Enterprise on Linux

The uninstalling steps below are based on the following assumptions:

-   Alfresco Enterprise is installed using the installer/ setup wizard.
-   Alfresco is installed at /opt/alfresco-4.2.0.
-   Alfresco service is created.
-   Installed the X Window System and a graphical desktop environment.

1.  Navigate to the directory where Alfresco is installed.

    For example, the default location is /opt/alfresco-4.2.0.

2.  Launch uninstall binary.

    You see the Question window.

3.  Click **Yes** to continue with uninstalling Alfresco.

    If you do not want to uninstall Alfresco, click **No**.

    You see the Setup window displaying the progress bar for uninstalling Alfresco Enterprise.

4.  After the uninstallation process is complete, you see the Info window.

    Click **OK** to close the window.


The uninstallation process is complete. The Alfresco installation directory \(for example, /opt/alfresco-4.2.0\)has been successfully removed from your system.

**What to do next:**

[Go to Installing  Alfresco flowchart](../concepts/install-singleinstance.md)

[Go to Upgrading  Alfresco flowchart](../concepts/upgrade-singleinstance.md) 

**Next:** [  Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)

