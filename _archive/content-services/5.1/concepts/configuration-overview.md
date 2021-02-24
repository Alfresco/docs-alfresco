---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuration overview

Alfresco is preconfigured with a set of system configuration parameters. Many of the system configuration parameters are completely exposed as properties, which you can configure for your specific environment requirements.

Use the following methods to configure Alfresco:

-   Alfresco Admin Console
-   Share Admin Tools
-   Editing the global properties
-   Using a JMX client, such as JConsole

CAUTION:

If you use multiple methods to configure Alfresco, updates made using a JMX client will override any other settings, and updates in the Admin Console and Admin Tools override settings in alfresco-global.properties. These settings also persist in the database, and are not reflected back into the alfresco-global.properties file.

**Alfresco Admin Console**

The Alfresco Admin Console is an administrator's tool to manage your Alfresco configuration. You can run the Admin Console from a browser without having to start Alfresco Share. See [Using the Admin Console](at-adminconsole.md) for more information.

**Share Admin Tools**

Share Admin Tools is an administrator's tool to create and manage users and groups from Share, set application preferences, manage categories and tags, and browse the system information in the node browser. See [Using the Share Admin Tools](admintools.md) for more information.

**Global properties file**

The global properties file \(alfresco-global.properties\) is used by Alfresco to detect extended properties. For example, when you install Alfresco, many of the installation settings are saved in the global properties file. The global properties file is used by Alfresco to detect the extended properties. You can use the global properties to set all your property settings; whenever you make a change, you must restart the Alfresco server to apply those changes. See [Using the alfresco-global.properties file](global-props-intro.md) for more information.

**JMX client**

The JMX client allows you to edit the settings while the system is running. The settings you change are automatically persisted in the database and synchronized across a cluster. When you start up Alfresco, the system initially uses the alfresco-global.properties file to set the properties in the JMX client, but then any changes you make in the JMX client persist in the database but are not reflected back into the alfresco-global.properties file. See [Using a JMX client to change settings dynamically](jmx-intro-config.md) for more information.

-   **[Using the Admin Console](../concepts/at-adminconsole.md)**  
The Admin Console application gives you control over the management and settings of the Alfresco environment.
-   **[Using the Share Admin Tools](../concepts/admintools.md)**  
Share Admin Tools help you to manage your administration operations.
-   **[Using the alfresco-global.properties file](../concepts/global-props-intro.md)**  
The global properties alfresco-global.properties file contains the customizations for extending Alfresco.
-   **[Using a JMX client to change settings dynamically](../concepts/jmx-intro-config.md)**  
You can reconfigure Alfresco by shutting down the server, editing the relevant property in the configuration files, and then restarting the server. If you have installed the Oracle Java SE Development Kit \(JDK\), and have enabled JMX in your configuration files, there are some support operations that can be performed at runtime without needing to restart the server.
-   **[Using the Java command line to change settings dynamically](../concepts/java-commandline.md)**  
All Alfresco properties can be set using the standard alfresco-global.properties configuration file. There might be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.
-   **[Customizing Alfresco applications](../concepts/modify-alf-apps.md)**  
You can make basic configuration updates to customize Alfresco, or modify properties files to apply configuration changes to Alfresco.
-   **[Customizing individual configuration items](../concepts/default-files-config.md)**  
Use this information to understand the types of configuration files available in Alfresco, and how to configure them.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

