---
author: [Alfresco Documentation, Alfresco Documentation]
---

# What you need to install Alfresco Content Services

There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.

The setup wizards install all the components you need for running Alfresco Content Services and ensure that you have all the recommended software installed and that configurations are set. When you install using the setup wizards, it runs within an instance of the Tomcat application server. The setup wizards provide a full Alfresco Content Services install, which you can use if no Alfresco Content Services component is installed on your production environment system. See [Installing using setup wizards](installs-eval-intro.md) for more information on the options available.

If you wish to install within an existing Tomcat or another application server, use the Alfresco WAR file. If you use the WAR file to install, you must install the required additional components manually.

All files are available from the Support Portal at [http://support.alfresco.com](http://support.alfresco.com). Click Online Resources \> Downloads, and select the file you require.

The following information helps you to determine what files to download and install.

|Installation file|File name|Description|
|-----------------|---------|-----------|
|Alfresco Content Services setup wizard for **Windows**|alfresco-content-services-installer-5.2.7-win-x64.exe \(64 bit\)|This setup wizard for Windows is for 64-bit systems. It is not suitable for use on 32-bit environments.|
|Alfresco Share setup wizard for **Windows**|alfresco-content-services-share-installer-5.2.7-win-x64.exe \(64 bit\)|This installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco Content Services is recommended for most purposes. Use this installer only if you have a specific requirement for it.|
|Alfresco Content Services Platform setup wizard for **Windows**|alfresco-content-services-platform-installer-5.2.7-win-x64.exe \(64 bit\)|This installer installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco Content Services Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco Content Services setup wizard for **Linux**|alfresco-content-services-installer-5.2.7-linux-x64.bin \(64 bit\)|This setup wizard for Linux is for 64-bit systems. It is not suitable for use on 32-bit environments.

The Linux executable file is a graphical installer, but you can also run this file to install Alfresco Content Services using text mode. Text mode is a keyboard-based installation method. Run the command with the --mode text option.|
|Alfresco Share setup wizard for **Linux**|alfresco-content-services-share-installer-5.2.7-linux-x64.bin \(64 bit\)|This installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco Content Services Installer is recommended for most purposes. Use this installer only if you have a specific requirement for it.|
|Alfresco Content Services Platform setup wizard for **Linux**|alfresco-content-services-platform-installer-5.2.7-linux-x64.bin \(64 bit\)|This installer installs the repository and all the software and components that you require for running the Alfresco Content Services platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco Content Services Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco Content Services Distribution zip|alfresco-content-services-distribution-5.2.7.zip|Alfresco WAR files for manual install into existing application servers or for upgrades to existing installations. This distribution zip also contains the Module Management Tool \(MMT\) and the sample extension files, such as alfresco-global.properties.

|
|Alfresco Content Services EAR zip|alfresco-content-services-ear-distribution-5.2.7.zip|Alfresco Content Services EAR file includes the sample extension files, such as alfresco-global.properties, and also contains the alfresco-content-services.ear file and myfaces1\_1-websphere-shared-lib.zip.|
|Alfresco Content Services File Transfer Receiver zip|alfresco-content-services-file-transfer-receiver-5.2.7.zip|File Transfer Receiver installation file|
|Web Quick Start zip|alfresco-wcmqs-5.2.7.zip|Web Quick Start bundle containing the AMPs for Web Quick Start and the Alfresco Web Editor.|

**Parent topic:**[Installing manually](../concepts/ch-install.md)

