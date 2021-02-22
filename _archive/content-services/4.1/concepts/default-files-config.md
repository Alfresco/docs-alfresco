---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: properties <config\> <bean\>
---

# Customizing individual configuration items

This section provides information about the types of configuration files available in Alfresco, and how to configure them.

The Alfresco configuration is implemented using three types of files:

-   Properties files
-   Configuration files
-   Bean files

-   **[Customizing properties files](../tasks/properties-config.md)**  
Properties files contain properties and end with the extension `.properties`. Each property is defined on one line. A `.properties` file has no header, so you do not need to take any action to preserve the header.
-   **[Customizing configuration files](../tasks/config-config.md)**  
Configuration files end with the extension `.xml`, and define `<config>` tags. A typical configuration file is <extension\>/web-client-config-custom.xml.
-   **[Customizing bean files](../tasks/bean-config.md)**  
Bean files end with the extension .xml and contain `<bean>` tags. You can modify `<bean>` tags to define properties or point to customized files.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

