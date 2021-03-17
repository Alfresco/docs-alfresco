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

You can change OpenOffice subsystem using the following ways:

-   Modifying the alfresco-global.properties file
-   Runtime administration using your JMX client
-   Share Admin Console

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

6.  Edit the **jodconverter.enabled** value to `true`.

7.  Restart the subsystem.


**Note:** Although it is possible to run both subsystems, Alfresco recommends that you enable only one at a time.

## Share Admin Console

You can also change which OpenOffice subsystem is enabled on the Share Admin Console page.

**Related information**  


[Managing OpenOffice](at-adminconsole-openoffice.md)

