---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: properties <config\> <bean\>
---

# Customizing individual configuration items

This section provides information about the types of configuration files available in Alfresco, and how to configure them.

The Alfresco configuration is implemented using three types of files:

-   Extension files
-   Bean files
-   Spring bean definitions

-   **[Customizing extension files](../tasks/config-config.md)**  
Extension files end with the extension .xml, and define `<config>` tags. A typical configuration file is <web-extension\>/share-config-custom.xml.
-   **[Modifying Spring bean definition files](../tasks/ext-file-config.md)**  
For advanced configuration, you can also extend or override the Spring bean definitions that control the Alfresco Java classes.
-   **[Customizing the Activity Email Summary](../tasks/ext-file-activities-config.md)**  
The Activity Email Summary ignores certain activity types by default. Use this information to override the Spring bean definition to include these activity types.
-   **[Customizing bean files](../tasks/bean-config.md)**  
Bean files end with the extension .xml and contain `<bean>` tags. You can modify `<bean>` tags to define properties or point to customized files.

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

