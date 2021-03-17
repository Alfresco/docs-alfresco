---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# What you need to install Alfresco

There are a number of different installation files available to you, each of which you can choose depending on what is already installed on your system.

The setup wizards install all the components you need for running Alfresco and ensure that you have all the recommended software installed and that configurations are set. When you install Alfresco using the setup wizards, it runs within an instance of the Tomcat application server. The setup wizards provide a full Alfresco install, which you can use if no Alfresco component is installed on your production environment system. See [Installing Alfresco using setup wizards](installs-eval-intro.md) for more information on the options available.

If you wish to install Alfresco within an existing Tomcat or another application server, use the Alfresco WAR file. If you use the WAR file to install Alfresco, you must install the required additional components manually.

All files are available from the Alfresco Support Portal at [http://support.alfresco.com](http://support.alfresco.com). Click Online Resources \> Downloads, and select the file you require.

The following information helps you to determine what files to download and install.

|Installation file|File name|Description|
|-----------------|---------|-----------|
|Alfresco One setup wizard for **Windows**|alfresco-one-installer-5.1.5-win-x64.exe \(64 bit\)|The Alfresco setup wizard for Windows is for 64-bit systems. It is not suitable for use on 32-bit environments.|
|Alfresco One Share setup wizard for **Windows**|alfresco-one-share-installer-5.1.5-win-x64.exe \(64 bit\)|The Share Installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco One Installer is recommended for most purposes. Use the Share Installer only if you have a specific requirement for it.|
|Alfresco One Platform setup wizard for **Windows**|alfresco-one-platform-installer-5.1.5-win-x64.exe \(64 bit\)|The Platform Installer installs the Alfresco repository and all the software and components that you require for running the Alfresco platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco One Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco One setup wizard for **Linux**|alfresco-one-installer-5.1.5-linux-x64.bin \(64 bit\)|The Alfresco setup wizard for Linux is for 64-bit systems. It is not suitable for use on 32-bit environments.

The Linux executable file is a graphical installer, but you can also run this file to install Alfresco using text mode. Text mode is a keyboard-based installation method. Run the command with the --mode text option.|
|Alfresco One Share setup wizard for **Linux**|alfresco-one-share-installer-5.1.5-linux-x64.bin \(64 bit\)|The Share Installer installs Alfresco Share only, with its own Tomcat application server and the Share Services AMP. The Alfresco One Installer is recommended for most purposes. Use the Share Installer only if you have a specific requirement for it.|
|Alfresco One Platform setup wizard for **Linux**|alfresco-one-platform-installer-5.1.5-linux-x64.bin \(64 bit\)|The Platform Installer installs the Alfresco repository and all the software and components that you require for running the Alfresco platform; for example, a Tomcat application server, PostgreSQL database, JRE, LibreOffice, Solr 4 and other software such as ImageMagick. It does not install Alfresco Share. The Alfresco One Installer is recommended for most purposes. Use the Platform Installer only if you have a specific requirement for it.|
|Alfresco One Distribution zip|alfresco-one-distribution-5.1.5.zip|Alfresco WAR files for manual install into existing application servers or for upgrades to existing Alfresco installations. This distribution zip also contains the Module Management Tool \(MMT\) and the sample extension files, such as alfresco-global.properties.

|
|Alfresco One EAR zip|alfresco-one-ear-distribution-5.1.5.zip|Enterprise EAR file includes the sample extension files, such as alfresco-global.properties, and also contains the alfresco-enterprise.ear file and myfaces1\_1-websphere-shared-lib.zip.|
|Alfresco One File Transfer Receiver zip|alfresco-one-file-transfer-receiver-5.1.5.zip|File Transfer Receiver installation file|
|Web Quick Start zip|alfresco-wcmqs-5.1.5.zip|Web Quick Start bundle containing the AMPs for Web Quick Start and the Alfresco Web Editor.|

**Parent topic:**[Installing Alfresco manually](../concepts/ch-install.md)

