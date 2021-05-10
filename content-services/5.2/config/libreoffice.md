---
title: Configuring LibreOffice
---

You can transform a document from one format to another using the LibreOffice subsystem. This feature requires you to install LibreOffice.

-   **OOoJODconverter**

    The JODConverter integration, which is a library that improves the stability and performance of LibreOffice in Alfresco Content Services. The OOoJODConverter runs on the same machine as the Alfresco Content Services server and it supports:

    -   a pool of separate LibreOffice processes
    -   automatic restart of crashed LibreOffice processes
    -   automatic termination of slow LibreOffice operations
    -   automatic restart of any LibreOffice process after a number of operations (this is a workaround for LibreOffice memory leaks)

-   **OOoDirect**

    If you are using OpenOffice in place of LibreOffice, use the OOoDirect subsystem for OpenOffice integration. To enable or disable this subsystem, use the following property:

    ```
    ooo.enabled=false
    ```

> **Note:** If you install Alfresco Content Services manually, by default, the OOoDirect subsystem is enabled, and the OOoJodconverter subsystem is disabled. Although it is possible to run both subsystems, we recommend that you enable only one at a time. To take advantage of the stability and performance benefits of the OOoJodconverter subsystem, ensure that you disable OOoDirect and enable OOoJodConverter using the following properties in the `alfresco-global.properties` file:

```
ooo.enabled=false
jodconverter.enabled=true
```

-   **[Changing the Office subsystems](#changing-the-office-subsystems)**  
When you install Alfresco Content Services using the setup wizards, the default subsystem for LibreOffice transformations is OOoJodconverter. Alfresco Content Services also supports the OOoDirect subsystem for OpenOffice.
-   **[LibreOffice configuration properties](#libreoffice-configuration-properties)**  
LibreOffice uses the OOoJodConverter subsystem. Configure the following properties for the OOoJodconverter subsystem.
-   **[Configuring OpenOffice transformations in place of LibreOffice](#configuring-openoffice-transformations-in-place-of-libreoffice)**  
LibreOffice is used in preference to OpenOffice in Alfresco Content Services. Use this information if you need to configure OpenOffice transformations specifically.

## Changing the Office subsystems {#changing-the-office-subsystems}

When you install Alfresco Content Services using the setup wizards, the default subsystem for LibreOffice transformations is OOoJodconverter. Alfresco Content Services also supports the OOoDirect subsystem for OpenOffice.

You can change the OOoJodConverter and OOoDirect subsystems using the following ways:

-   Admin Console
-   Runtime administration using your JMX client
-   Modifying the `alfresco-global.properties` file

### Admin Console: Transformation Services

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


### JMX interface runtime administration

1.  Open your JMX client, for example, JConsole.

2.  Locate the **OOoDirect** subsystem.

3.  Edit the **ooo.enabled** value to `false`.

4.  Restart the subsystem.

5.  Locate the **OOoJodconverter** subsystem.

6.  Edit the **jodconverter.enabled** value to `true`.

7.  Restart the subsystem.


### Global properties file

1.  Open the `alfresco-global.properties` file.

2.  Edit the following lines:

    ```
    ooo.enabled=false
    jodconverter.enabled=true
    ```

3.  Save the file.

4.  Restart the Alfresco Content Services server.


## LibreOffice configuration properties {#libreoffice-configuration-properties}

LibreOffice uses the OOoJodConverter subsystem. Configure the following properties for the OOoJodconverter subsystem.

-   **jodconverter.connectTimeout**

    Specifies the maximum number of milliseconds before a connection times out. The default is 10000 milliseconds (10 seconds).

-   **jodconverter.enabled**

    Enables or disables the Jodconverter process(es).

-   **jodconverter.maxTasksPerProcess**

    Specifies the number of transforms before the process restarts. The default is 200.

-   **jodconverter.officeHome**

    Specifies the name of the LibreOffice install directory. The following are examples of install directory paths:

    -   Mac OS X: jodconverter.officeHome=/Applications/alfresco/libreoffice.app/Contents
    -   Windows: jodconverter.officeHome=c:/Alfresco/LibreOffice.org
    -   Linux: /opt/alf5100/libreoffice
-   **jodconverter.portNumbers**

    Specifies the port numbers used by each processing thread. The number of process will match the number of ports. The default numbers are 2022, 2023, and 2024.

-   **jodconverter.taskExecutionTimeout**

    Specifies the maximum number of milliseconds that an operation is allowed to run before it is aborted. It is used to recover from operations that have hung. The default is 120000 milliseconds (2 minutes).

-   **jodconverter.taskQueueTimeout**

    Specifies the maximum number of milliseconds a task waits in the transformation queue before the process restarts. It is used to recover hung LibreOffice processes. The default is 30000 milliseconds (30 seconds).

## Configuring OpenOffice transformations in place of LibreOffice {#configuring-openoffice-transformations-in-place-of-libreoffice}

LibreOffice is used in preference to OpenOffice in Alfresco Content Services. Use this information if you need to configure OpenOffice transformations specifically.

1.  Open the `alfresco-global.properties` file.

2.  Set the ooo.exe property to the path of the OpenOffice installation.

3.  Ensure that the following line is set to true:

    ```
    ooo.enabled=true
    ```

4.  Save the file.

5.  Restart the Alfresco Content Services server.


### OOoDirect subsystem configuration properties {#ooodirect-subsystem-configuration-properties}

The following properties can be configured for the OOoDirect subsystem.

-   **ooo.exe**

    Specifies the OpenOffice installation path.

-   **ooo.enabled**

    Enables or disables the OOoDirect subsystem.
