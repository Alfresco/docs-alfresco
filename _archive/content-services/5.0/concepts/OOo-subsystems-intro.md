---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring OpenOffice subsystem

Within Alfresco, you can transform a document from one format to another. This feature requires you to install LibreOffice or OpenOffice.org.

-   **OOoJODconverter**

    The JODConverter integration, which is a library that improves the stability and performance of OpenOffice.org or LibreOffice within Alfresco. The OOoJODConverter runs on the same machine as the Alfresco server and it supports:

    -   a pool of separate OpenOffice processes
    -   automatic restart of crashed OpenOffice processes
    -   automatic termination of slow OpenOffice operations
    -   automatic restart of any OpenOffice process after a number of operations \(this is a workaround for OpenOffice memory leaks\)
-   **OOoDirect**

    The subsystem for direct OpenOffice integration, in which the Alfresco server manages OpenOffice directly. To enable or disable this subsystem, use the following property:

    ```
    ooo.enabled=false
    ```


**Note:** If you install Alfresco manually, by default, the OOoDirect subsystem is enabled, and the OOoJodconverter subsystem is disabled. Although it is possible to run both subsystems, Alfresco recommends that you enable only one at a time. To take advantage of the stability and performance benefits of the OOoJodconverter subsystem, ensure that you disable OOoDirect and enable OOoJodConverter using the following properties in the alfresco-global.properties file:

```
ooo.enabled=false
jodconverter.enabled=true
```

-   **[Changing the Office subsystems](../tasks/OOo-subsystems-config.md)**  
When you install Alfresco using the setup wizards, the default subsystem for OpenOffice transformations is OOoJodconverter. Alfresco also supports the OOoDirect subsystem.
-   **[Configuring transformations in the global properties file](../tasks/OOo-props-config.md)**  
The subsystem for OpenOffice transformations is called OOoDirect. Using this direct OpenOffice integration, the Alfresco server manages OpenOffice directly.
-   **[OOoDirect subsystem configuration properties](../concepts/OOoDirect-subsystem-props.md)**  
The following properties can be configured for the OOoDirect subsystem.
-   **[OOoJodconverter subsystem configuration properties](../concepts/OOoJodconverter-subsystem-props.md)**  
The following properties can be configured for the OOoJodconverter subsystem.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

