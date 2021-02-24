---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing in a distributed environment

Use these steps for installing Alfresco Content Services in a distributed environment.

The main stages involved in installing Alfresco Content Services in a cluster are shown in the diagram. You must install and configure your data on a single node first and then on the second node, and so on.

The main steps involved in the installing process include preparing your system for installation, [installing on a single node](install-singleinstance.md), installing on node 2, and finally, testing and getting familiar with Alfresco Content Services. Repeat the last two steps on all the other nodes in your system in series.

If you do not need Alfresco Share on each instance in your cluster, you can use the Platform Installer instead of the Alfresco Content Services Installer. See [Installing on Linux using the Platform Installer](../tasks/simpleinstall-enterprise-lin-platform.md) and [Installing on Windows using the Platform installer](../tasks/simpleinstall-enterprise-win-platform.md) for more information.

Each of these main stages consist of sub-steps, as shown in the diagram, which displays the sub-steps that need to be performed in order to complete each main stage.

**Note:** Note that the steps shown in the diagrams have a colour code. For example, Preparing for install stage consists of five sub-steps, namely, Software requirements, Language support, Validate the architecture, Validate the environment, and Recommended distribution.

**Note:** Make sure you do not install and configure all the nodes in parallel. Follow in the installation process in series for all the nodes in your system.

To get started quickly with installing in a distributed environment, follow the process shown.

Click on each task to learn more about it.

![](../images/disinstall.png)

-   **[Cluster-specific configuration](../concepts/cluster-requirement.md)**  
If you have a distributed environment and want to implement clustering to improve the availability and performance of various services, you should enable clustering. This information describes the cluster-specific configurations for Alfresco Content Services.

**Parent topic:**[Install guide](../concepts/quick-install.md)

