---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: OpenOffice subsystem
---

# Changing the OpenOffice subsystem

The default subsystem for OpenOffice transformations is OOoDirect. You can change the preferred OpenOffice subsystem to OOoJodconverter.

The JodConverter requires OpenOffice.org 3.0.0 or later and recommends 3.1.0+.

There are two methods that you can use to change OpenOffice subsystem.

-   Modifying the alfresco-global.properties file
-   Runtime administration using your JMX client

**Parent topic:**[Configuring OpenOffice](../concepts/OOo-subsystems-intro.md)

## Global properties file

1.  Open the alfresco-global.properties file.

2.  Uncomment the following lines:

    ```
    #ooo.enabled=false
    #jodconverter.enabled=true
    ```

3.  Save the file.

4.  Restart the Alfresco server.


## JMX interface runtime administration

1.  Open your JMX client, for example, JConsole.

2.  Locate the **OOoDirect** subsystem.

3.  Edit the **ooo.enabled** value to `false`.

4.  Restart the subsystem.

5.  Locate the **OOoJodconverter** subsystem.

6.  Edit the **jodconverter.enabled** value to true.

7.  Restart the subsystem.


**Note:** Although it is possible to run both subsystems, Alfresco recommends that you enable only one at a time.

