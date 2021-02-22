---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Alfresco installation files

There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.

The setup wizards install all the components you need for running Alfresco and ensure that you have all the recommended software installed and that configurations are set. When you install Alfresco using the setup wizards, it runs within an instance of the Tomcat application server. The setup wizards provide a full Alfresco install, which you can use if no Alfresco component is installed on your production environment system.

If you wish to install Alfresco within an existing Tomcat or another application server, use the Alfresco WAR file. If you use the WAR file to install Alfresco, you must install the required additional components manually.

The following section helps you to determine what files to download and install.

|Installation file|File name|Description|
|-----------------|---------|-----------|
|Setup wizard for **Windows**|alfresco-enterprise-5.0.5-installer-win-x64.exe \(64 bit\)|The Alfresco setup wizard for Windows is for 64-bit systems. It is not suitable for use on 32-bit environments.|
|Setup wizard for **Linux**|alfresco-enterprise-5.0.5-installer-linux-x64.bin \(64 bit\)|The Alfresco setup wizard for Linux is for 64-bit systems. It is not suitable for use on 32-bit environments.

The Linux executable file is a graphical installer, but you can also run this file to install Alfresco using text mode. Text mode is a keyboard-based installation method. Run the command with the --mode text option.|
|Alfresco Enterprise Distribution zip|alfresco-enterprise-5.0.5.zip|Alfresco WAR files for manual install into existing application servers or for upgrades to existing Alfresco installations. This distribution zip also contains the Module Management Tool \(MMT\) and the sample extension files, such as alfresco-global.properties.

|
|Alfresco Enterprise EAR zip|alfresco-enterprise-ear-5.0.5.zip|Enterprise EAR file includes the sample extension files, such as alfresco-global.properties, and also contains the alfresco-enterprise.ear file and myfaces1\_1-websphere-shared-lib.zip.|
|Alfresco Enterprise File Transfer Receiver zip|alfresco-enterprise-file-transfer-receiver-5.0.5.zip|File Transfer Receiver installation file|
|Web Quick Start zip|alfresco-enterprise-wcmqs-5.0.5.zip|Web Quick Start bundle containing the AMPs for Web Quick Start and the Alfresco Web Editor.|

-   **[Downloading Enterprise installation files](../tasks/download-file.md)**  
This section describes the location of the Enterprise installation files that are available for download.
-   **[Supported platforms](../concepts/supported-stacks.md)**  
The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco.

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

