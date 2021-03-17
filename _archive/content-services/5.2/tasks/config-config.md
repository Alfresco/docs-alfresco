---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: <config\> tags configuration file xml
---

# Customizing extension files

Extension files end with the extension .xml, and define `<config>` tags. A typical configuration file is <web-extension\>/share-config-custom.xml.

A configuration file contains `<alfresco-config>` tags outside the `<config>` tags. You must preserve these tags in your customized file.

1.  Open the configuration file that you want to customize.

2.  Edit each pair of `<config> </config>` tags that you want to modify.

    **Replacing a configuration**

    To replace the configuration, add a `replace=“true”` attribute to the configuration element. For example: `<config evaluator="xx" condition=“yy” replace=“true”>`

    **Attention:** Any configuration within a section marked this way completely replaces any configuration found in the Alfresco Content Services-maintained files.

    **Modifying one property**

    The attribute `replace` completely replaces the configuration. To modify one property, add the changed piece.

3.  Save your customized file.


**Parent topic:**[Customizing individual configuration items](../concepts/default-files-config.md)

