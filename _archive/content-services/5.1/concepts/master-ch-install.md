---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
---

# Installing

This information helps you install Alfresco, additional software, and modules. The Alfresco products have different installers, so you should be aware of what installers are shipped with your product.

Alfresco One ships with three installers:

-   Alfresco One Installer: this is appropriate for the majority of users, and installs everything you require to run Alfresco. It corresponds to the installer used in previous versions of Alfresco.
-   Alfresco One Platform Installer: this installs the Alfresco repository, all required third party components \(for example, ImageMagick\), and links to a variety of developer and admin resources. If you have a clustered environment, you might want to use the Platform installer across these servers.
-   Alfresco One Share Installer: this installs Alfresco Share only, with its own Tomcat instance and the Share Services AMP. You might want to use the Share installer to connect to one or more repositories \(that you have installed using the Platform installer\).

    **Note:** Use the Share installer to connect to a repository that you installed using the Platform installer only. Other setups are not supported.


Alfresco Community Edition is designed to be deployed on a single server. As a result, it is shipped with a single Alfresco Community Edition Installer, which contains both the Alfresco Platform and Alfresco Share components. This is the same approach that is used in previous versions of Alfresco.

Depending on your system, you can install Alfresco using one of the following methods:

-   Using a setup wizard, which contains the required software and components you need for evaluating Alfresco
-   Using a standard WAR file to deploy Alfresco in a production environment

-   **[QuickStart install guide](../concepts/quick-install.md)**  
You can install Alfresco as a single instance and also in a distributed and clustered environment.
-   **[Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)**  
Use these methods to install Alfresco using the setup wizards.
-   **[Installing Alfresco manually](../concepts/ch-install.md)**  
Use this information to manually install Alfresco One.
-   **[Testing the Alfresco installation](../concepts/testing-alfresco.md)**  
Installation testing checks that Alfresco is successfully installed and it is working as expected after installation.
-   **[Uninstalling Alfresco](../concepts/uninstall-overview.md)**  
Use this information to uninstall Alfresco, or any Alfresco AMP files.
-   **[Installing Alfresco integrations](../concepts/install-integrations-overview.md)**  
Use this information to install any components or modules that integrate Alfresco to other applications.

**Parent topic:**[Alfresco One](../concepts/welcome.md)

