---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: <config\> tags configuration file xml
---

# Customizing configuration files

Configuration files end with the extension `.xml`, and define `<config>` tags. A typical configuration file is <extension\>/web-client-config-custom.xml.

A configuration file contains `<alfresco-config>` tags outside the `<config>` tags. You must preserve these tags in your customized file.

1.  Open the configuration file that you want to customize.

2.  Delete each pair of `<config> </config>` tags that you do not want to modify.

3.  To delete part of an item:

    1.  Copy the original `<config>` statement.

    2.  Delete the children you do not want.

    3.  Use the replace=“true” attribute.

4.  To add another item, you only need a single item. The other items will remain enabled.

5.  Customize the contents of the remaining `<config>` tags.

6.  Save your customized file.


-   **[Configuration files](../concepts/configfiles-webclient.md)**  
The configuration files contain configurations that either augment or replace the standard configuration. The system configuration files are located in <configRoot\>\\classes\\alfresco\\web-client-config-\*

**Parent topic:**[Customizing individual configuration items](../concepts/default-files-config.md)

