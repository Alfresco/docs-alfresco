---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring OpenOffice transformations in place of LibreOffice

LibreOffice is used in preference to OpenOffice in Alfresco. Use this information if you need to configure OpenOffice transformations specifically.

1.  Open the alfresco-global.properties file.

2.  Set the ooo.exe property to the path of the OpenOffice installation.

3.  Ensure that the following line is set to true:

    ```
    ooo.enabled=true
    ```

4.  Save the file.

5.  Restart the Alfresco server.


-   **[OOoDirect subsystem configuration properties](../concepts/OOoDirect-subsystem-props.md)**  
The following properties can be configured for the OOoDirect subsystem.

**Parent topic:**[Configuring LibreOffice](../concepts/OOo-subsystems-intro.md)

