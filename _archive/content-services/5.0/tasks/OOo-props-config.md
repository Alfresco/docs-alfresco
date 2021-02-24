---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring transformations in the global properties file

The subsystem for OpenOffice transformations is called OOoDirect. Using this direct OpenOffice integration, the Alfresco server manages OpenOffice directly.

1.  Open the alfresco-global.properties file.

2.  Set the ooo.exe property to the path of the OpenOffice.org or LibreOffice installation.

3.  Ensure that the following line is set to true:

    ```
    ooo.enabled=true
    ```

4.  Save the file.

5.  Restart the Alfresco server.


**Parent topic:**[Configuring OpenOffice subsystem](../concepts/OOo-subsystems-intro.md)

