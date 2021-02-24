---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [install, wizard, WAR, Community]
---

# Alfresco installation files

There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.

The setup wizards install all the components you need for running Alfresco and ensure that you have all the recommended software installed and that configurations are set. When you install Alfresco using the setup wizards, it runs within an instance of the Tomcat application server.

If you wish to install Alfresco within an existing Tomcat or another application server, use the Alfresco WAR file. If you use the WAR file to install Alfresco, you must install the required additional components manually.

The following section helps you to determine what files to download and install.

|Installation file|File name|Description|
|-----------------|---------|-----------|
|Setup wizard for **Windows**|alfresco-enterprise-4.2.8-installer-win-x64.exe \(64 bit\)|The Alfresco setup wizard for Windows is for 64-bit systems. It is not suitable for use on 32-bit environments.|
|Setup wizard for **Linux**|alfresco-enterprise-4.2.8-installer-linux-x64.bin \(64 bit\)|The Alfresco setup wizard for Linux is for 64-bit systems. It is not suitable for use on 32-bit environments.

 The Linux executable file is a graphical installer, but you can also run this file to install Alfresco using text mode. Text mode is a keyboard-based installation method. Run the command with the --mode text option.

|
|Alfresco Enterprise Distribution zip|alfresco-enterprise-4.2.8.zip|Alfresco WAR files for manual install into existing application servers or for upgrades to existing Alfresco installations. This distribution zip also contains the Module Management Tool \(MMT\) and the sample extension files, such as alfresco-global.properties.

|
|Alfresco Enterprise EAR zip|alfresco-enterprise-ear-4.2.8.zip|Enterprise EAR file includes the sample extension files, such as alfresco-global.properties, and also contains the alfresco-enterprise.ear file and myfaces1\_1-websphere-shared-lib.zip.|
|Solr search zip|alfresco-enterprise-solr-4.2.8.zip|Solr search installation file|
|Alfresco Enterprise File Transfer Receiver zip|alfresco-enterprise-file-transfer-receiver-4.2.8.zip|File Transfer Receiver installation file|
|SharePoint Protocol Support zip|alfresco-enterprise-spp-4.2.8.zip|Microsoft SharePoint Protocol Support functionality|
|Web Quick Start zip|alfresco-enterprise-wcmqs-4.2.8.zip|Web Quick Start bundle containing the AMPs for Web Quick Start and the Alfresco Web Editor.|
|Alfresco Web Editor zip|alfresco-enterprise-webeditor-4.2.8.zip|Web Editor bundle containing the AMPs for Web Editor Framework and Alfresco Web Editor.|
|Deployment receiver installation file for Windows|alfresco-enterprise-deployment-4.2.8-win.exe|Windows installer for Standalone Deployment Receiver|
|Deployment receiver installation file for Linux|alfresco-enterprise-deployment-4.2.8-linux.bin|Linux Installer for Standalone Deployment Receiver|
|Forms Developer Kit|alfresco-enterprise-fdk-4.2.8.zip|Alfresco Forms Development AMPs|
|Alfresco Records Management zip|alfresco-rm-2.2.1.4-23.zip|Records Management zip containing the required core and Share AMPs.|
|Alfresco SDK and APIs zip|alfresco-enterprise-sdk-4.2.8.zip|Alfresco Software Development Kit containing the source files.|
|Alfresco Web Service client zip|alfresco-web-service-client-4.2.8.zip|WSDL-based API providing standard remote access to the Alfresco repository.|

-   **[Downloading Enterprise installation files](../tasks/download-file.md)**  
This section describes the location of the Enterprise installation files that are available for download.
-   **[Supported platforms](../concepts/alf3-supported-stacks.md)**  
The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco.

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

