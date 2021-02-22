---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Changing the Office subsystems

When you install Alfresco using the setup wizards, the default subsystem for OpenOffice transformations is OOoJodconverter. Alfresco also supports the OOoDirect subsystem.

The JODConverter subsystem requires OpenOffice.org 3.0.0 or later and recommends 3.1.0+.

You can change the Office subsystem using the following ways:

-   Alfresco Admin Console
-   Runtime administration using your JMX client
-   Modifying the alfresco-global.properties file

**Parent topic:**[Configuring OpenOffice subsystem](../concepts/OOo-subsystems-intro.md)

## Alfresco Admin Console

You can also change which Office subsystem is enabled on the Alfresco Admin Console.

**Related information**  


[Admin Console: Transformation services](adminconsole-transformationservices.md)

## JMX interface runtime administration

1.  Open your JMX client, for example, JConsole.

2.  Locate the **OOoDirect** subsystem.

3.  Edit the **ooo.enabled** value to `false`.

4.  Restart the subsystem.

5.  Locate the **OOoJodconverter** subsystem.

6.  Edit the **jodconverter.enabled** value to `true`.

7.  Restart the subsystem.


## Global properties file

1.  Open the alfresco-global.properties file.

2.  Edit the following lines:

    ```
    ooo.enabled=false
    jodconverter.enabled=true
    ```

3.  Save the file.

4.  Restart the Alfresco server.


