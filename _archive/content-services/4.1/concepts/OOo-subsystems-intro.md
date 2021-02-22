---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, OpenOffice]
keyword: [OpenOffice, Extensions/Third Party Tools]
---

# Configuring OpenOffice

Within Alfresco, you can transform a document from one format to another. This feature requires you to install OpenOffice.

Alfresco supports the following OpenOffice subsystems:

-   **OOoJodconverter**: This subsystem is intended for **Enterprise** users only.
-   **OOoDirect**: This subsystem is intended for **Community** users only.

**Important:** Do not enable both these subsystems at the same time.

-   **OOoJodconverter**

    The JodConverter integration, which is a library that improves the stability and performance of OpenOffice.org \(OOo\) within Alfresco. The OOoJodConverter runs on the same machine as the Alfresco server. The JodConverter supports:

    -   a pool of separate OpenOffice processes
    -   automatic restart of crashed OpenOffice processes
    -   automatic termination of slow OpenOffice operations
    -   automatic restart of any OpenOffice process after a number of operations \(this is a workaround for OpenOffice memory leaks\)
    If you install Alfresco using the setup wizard, this subsystem is enabled. However, if you install Alfresco manually, this subsystem is disabled, by default, and you must enable it using the following property:

    ```
    jodconverter.enabled=true
    ```

-   **OOoDirect**

    The direct OpenOffice integration, in which the Alfresco server manages OpenOffice directly. If you install Alfresco using the setup wizard, this subsystem is disabled. However, if you install Alfresco manually, this subsystem is enabled, by default, and you must disable it using the following property:

    ```
    ooo.enabled=false
    ```


-   **[Changing the OpenOffice subsystem](../tasks/OOo-subsystems-config.md)**  
The default subsystem for OpenOffice transformations is OOoDirect. You can change the preferred OpenOffice subsystem to OOoJodconverter.
-   **[Configuring OpenOffice in the global properties file](../tasks/OOo-props-config.md)**  
The subsystem for OpenOffice transformations is called OOoDirect. Using this direct OpenOffice integration, the Alfresco server manages OpenOffice directly. By default, this subsystem is enabled.
-   **[OOoDirect subsystem configuration properties](../concepts/OOoDirect-subsystem-props.md)**  
The following properties can be configured for the OOoDirect subsystem.
-   **[OOoJodconverter subsystem configuration properties](../concepts/OOoJodconverter-subsystem-props.md)**  
The following properties can be configured for the OOoJodconverter subsystem.

**Parent topic:**[Administering](../concepts/ch-administering.md)

