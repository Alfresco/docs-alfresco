---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
keyword: configuring
---

# Configuring Alfresco

This section provides information on the mechanisms for configuring Alfresco.

-   **[Configuration overview](../concepts/configuration-overview.md)**  
Alfresco is preconfigured with a set of system configuration parameters. Many of the system configuration parameters are completely exposed as properties, which you can extend or override.
-   **[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)**  
By default, you can reconfigure Alfresco by shutting down the server, editing the relevant property in the configuration files, and then restarting the server. There are some support operations that can be performed on-demand at runtime without needing to restart the server.
-   **[Global properties file](../concepts/global-props-intro.md)**  
The global properties alfresco-global.properties file contains the customizations for extending Alfresco.
-   **[Modifying the global properties file](../tasks/global-props-config.md)**  
This section describes the steps for modifying the alfresco-global.properties file.
-   **[Setting composite properties in the global properties file](../tasks/global-props-composite.md)**  
This section uses the `imap.server.mountPoints` property as an example.
-   **[Java command line](../concepts/java-commandline.md)**  
All the Alfresco properties can be set using the standard alfresco-global.properties configuration file. There may be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.
-   **[Modifying Spring bean definition files](../tasks/ext-file-config.md)**  
For advanced configuration, you can also extend or override the Spring bean definitions that control the Alfresco Java classes.
-   **[Modifying system configuration files](../tasks/systemfiles-modify.md)**  
This section describes the recommended method for modifications to the system configuration files.
-   **[Customizing individual configuration items](../concepts/default-files-config.md)**  
This section provides information about the types of configuration files available in Alfresco, and how to configure them.

**Parent topic:**[Administering](../concepts/ch-administering.md)

