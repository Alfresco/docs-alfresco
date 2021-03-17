---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Changing the Office subsystems

When you install Alfresco Content Services using the setup wizards, the default subsystem for LibreOffice transformations is OOoJodconverter. Alfresco Content Services also supports the OOoDirect subsystem for OpenOffice.

You can change the OOoJodConverter and OOoDirect subsystems using the following ways:

-   Admin Console
-   Runtime administration using your JMX client
-   Modifying the alfresco-global.properties file

**Parent topic:**[Configuring LibreOffice](../concepts/OOo-subsystems-intro.md)

## Admin Console: Transformation Services

1.  Open the Admin Console.

2.  In the Repository Services section, click **Transformation Services**.

    You see the Transformation Services page.

3.  Set the Office Transform - JODConverter properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**JODConverter Enabled**|No|This enables or disables the JODConverter for transformations.|
    |**Max Tasks per Process**|200|This is the maximum number of tasks that can be performed concurrently.|
    |**Office Suite Location**|/Applications/alfresco-5.0.0/libreoffice.app/Contents|This shows the directory path locations of OpenOffice.org or LibreOffice.|
    |**Port Numbers**|8100|This is the port number that JODConverter uses. To enable multiple process instances, enter a comma-separated list of port numbers, all of which must be available.|
    |**Task Execution Timeout**|120000|This is the duration in milliseconds after which a task will timeout.|
    |**Task Queue Timeout**|30000|This is the duration in milliseconds after which the task queue will timeout.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


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

4.  Restart the Alfresco Content Services server.


