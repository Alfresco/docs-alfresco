---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring LibreOffice

You can transform a document from one format to another using the LibreOffice subsystem. This feature requires you to install LibreOffice.

-   **OOoJODconverter**

    The JODConverter integration, which is a library that improves the stability and performance of LibreOffice in Alfresco. The OOoJODConverter runs on the same machine as the Alfresco server and it supports:

    -   a pool of separate LibreOffice processes
    -   automatic restart of crashed LibreOffice processes
    -   automatic termination of slow LibreOffice operations
    -   automatic restart of any LibreOffice process after a number of operations \(this is a workaround for LibreOffice memory leaks\)
-   **OOoDirect**

    If you are using OpenOffice in place of LibreOffice, use the OOoDirect subsystem for OpenOffice integration. To enable or disable this subsystem, use the following property:

    ```
    ooo.enabled=false
    ```


**Note:** If you install Alfresco manually, by default, the OOoDirect subsystem is enabled, and the OOoJodconverter subsystem is disabled. Although it is possible to run both subsystems, Alfresco recommends that you enable only one at a time. To take advantage of the stability and performance benefits of the OOoJodconverter subsystem, ensure that you disable OOoDirect and enable OOoJodConverter using the following properties in the alfresco-global.properties file:

```
ooo.enabled=false
jodconverter.enabled=true
```

-   **[Changing the Office subsystems](../tasks/OOo-subsystems-config.md)**  
When you install Alfresco using the setup wizards, the default subsystem for LibreOffice transformations is OOoJodconverter. Alfresco also supports the OOoDirect subsystem for OpenOffice.
-   **[LibreOffice configuration properties](../concepts/OOoJodconverter-subsystem-props.md)**  
LibreOffice uses the OOoJodConverter subsystem. Configure the following properties for the OOoJodconverter subsystem.
-   **[Configuring OpenOffice transformations in place of LibreOffice](../tasks/OOo-props-config.md)**  
LibreOffice is used in preference to OpenOffice in Alfresco. Use this information if you need to configure OpenOffice transformations specifically.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

