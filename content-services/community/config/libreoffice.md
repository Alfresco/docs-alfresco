---
title: Configure LibreOffice
---

You can transform a document from one format to another using the **OOoJodconverter** subsystem. This feature requires you to install LibreOffice.

The Jodconverter integration is a library that improves the stability and performance of LibreOffice in Community Edition. The Jodconverter runs on the same machine as the Community Edition server and it supports:

* a pool of separate LibreOffice processes
* automatic restart of crashed LibreOffice processes
* automatic termination of slow LibreOffice operations
* automatic restart of any LibreOffice process after a number of operations (this is a workaround for LibreOffice memory leaks)

It's also possible to use OpenOffice instead of LibreOffice.

## Change the OOoJodconverter subsystems {#change-ooojodconverter}

The default subsystem for LibreOffice transformations is OOoJodconverter.

You can change the OOoJodConverter and OOoDirect subsystems using the following ways:

* Admin Console - Transformation Services
* Runtime administration using your JMX client
* Modifying the global properties file

{% capture admin-console %}

1. Open the Admin Console.

2. In the **Repository Services** section, click **Transformation Services** to open the Transformation Services page.

3. Set the Office Transform - JODConverter properties.

    | Property | Description |
    | -------- | ------------|
    | JODConverter Enabled | Enables or disables the JODConverter for transformations, for example `Yes`. |
    | Max Tasks per Process | The maximum number of tasks that can be performed concurrently, for example `200`. |
    | Office Suite Location | The directory path locations of OpenOffice.org or LibreOffice, for example `/opt/libreoffice6.3/`. |
    | Port Numbers | The port number that JODConverter uses. To enable multiple process instances, enter a comma-separated list of port numbers, all of which must be available, for example `8100`. |
    | Task Execution Timeout | The duration in milliseconds after which a task will timeout, for example `120000`. |
    | Task Queue Timeout | The duration in milliseconds after which the task queue will timeout, for example `30000`. |

4. Click **Save** to apply the changes you've made to the properties.

    If you don't want to save the changes, click **Cancel**.

{% endcapture %}
{% capture jmx %}

1. Open your JMX client, for example, JConsole.

2. Locate the `OOoJodconverter` subsystem.

3. Edit the property setting, such as set the `jodconverter.enabled` value to `true`.

4. Restart the subsystem.

{% endcapture %}
{% capture global %}

If you've previously modified a value using the Admin Console or JMX, it'll take preference to any change made to the global properties file.

1. Open the `alfresco-global.properties` file.

2. Edit the property setting, such as set the `jodconverter.enabled` value to `true`.

3. Save the file.

4. Restart the Community Edition server.

{% endcapture %}

{% include tabs.html opt1="Admin Console" content1=admin-console opt2="JMX" content2=jmx opt3="Global properties" content3=global %}

## Jodconverter configuration properties

The OOoJodconverter subsystem uses LibreOffice. Configure the following properties for the OOoJodconverter subsystem using either the Admin Console, JMX, or the global properties file.

| Property | Description |
| -------- | ------------|
| jodconverter.connectTimeout | Specifies the maximum number of milliseconds before a connection times out. The default is `10000` milliseconds (10 seconds). |
| jodconverter.enabled | Enables or disables the Jodconverter process(es). |
| jodconverter.maxTasksPerProcess | Specifies the number of transforms before the process restarts. The default is `200`. |
| jodconverter.officeHome | Specifies the name of the LibreOffice install directory. The following are examples of install directory paths:<br><br>Windows: `jodconverter.officeHome=c:/Alfresco/libreoffice`<br>Linux: `/opt/libreoffice6.3` |
| jodconverter.portNumbers | Specifies the port numbers used by each processing thread. The number of process will match the number of ports.
| jodconverter.taskExecutionTimeout | Specifies the maximum number of milliseconds that an operation is allowed to run before it is aborted. It is used to recover from operations that have hung. The default is `120000` milliseconds (2 minutes). |
| jodconverter.taskQueueTimeout | Specifies the maximum number of milliseconds a task waits in the transformation queue before the process restarts. It's used to recover hung LibreOffice processes. The default is `30000 milliseconds` (30 seconds). |

## Configure OpenOffice transformations in place of LibreOffice {#configure-openoffice}

LibreOffice is used in preference to OpenOffice in Community Edition. Use this information if you need to configure OpenOffice transformations specifically. Although unsupported, it should be possible to use OpenOffice in place of LibreOffice. You can do this by setting the `jodconverter.officeHome` property to the path of the OpenOffice installation in the global properties file.

1. Open the `alfresco-global.properties` file.

2. Set the `jodconverter.officeHome` property to the path of the OpenOffice installation.

3. Restart the Community Edition server.
