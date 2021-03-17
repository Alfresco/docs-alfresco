---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: properties file
---

# Customizing properties files

Properties files contain properties and end with the extension `.properties`. Each property is defined on one line. A `.properties` file has no header, so you do not need to take any action to preserve the header.

1.  Open the file you want to customize.

    For example, open the `alfresco-global.properties` file.

2.  Comment out all the properties you do not want to modify by adding the “\#” character.

    For example, to override the `db.driver` property, you only require one line:

    ```
    db.driver=oracle.jdbc.OracleDriver
    ```

3.  Uncomment all the properties that you want to activate by removing the “\#” character.

4.  Save the file.


**Parent topic:**[Customizing individual configuration items](../concepts/default-files-config.md)

