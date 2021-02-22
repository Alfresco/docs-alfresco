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

-   **OOoDirect**

    The direct OpenOffice integration, in which the Alfresco server manages OpenOffice directly. This subsystem is enabled, by default.

-   **OOoJodconverter**

    The JodConverter integration, which is a library that improves the stability and performance of OpenOffice.org \(OOo\) within Alfresco. This subsystem is disabled, by default. The OOoJodConverter runs on the same machine as the Alfresco server. The JodConverter supports:

    -   a pool of separate OpenOffice processes
    -   automatic restart of crashed OpenOffice processes
    -   automatic termination of slow OpenOffice operations
    -   automatic restart of any OpenOffice process after a number of operations \(this is a workaround for OpenOffice memory leaks\)

**Note:** If you install Alfresco manually, ensure that you disable OOoDirect and enable OOoJodConverter using the following properties in the alfresco-global.properties file:

```
ooo.enabled=false
jodconverter.enabled=true
```

-   **[Changing the OpenOffice subsystem](../tasks/OOo-subsystems-config.md)**  
The default subsystem for OpenOffice transformations is OOoDirect. You can change the preferred OpenOffice subsystem to OOoJodconverter.
-   **[OOoDirect subsystem configuration properties](../concepts/OOoDirect-subsystem-props.md)**  
The following properties can be configured for the OOoDirect subsystem.
-   **[OOoJodconverter subsystem configuration properties](../concepts/OOoJodconverter-subsystem-props.md)**  
The following properties can be configured for the OOoJodconverter subsystem.

**Parent topic:**[Administering](../concepts/ch-administering.md)

