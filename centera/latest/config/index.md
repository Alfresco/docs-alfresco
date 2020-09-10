---
title: Configure Content Connector
---
Use these instructions to configure your Alfresco Content Services environment for the Centera Connector.

You can configure the Centera Connector module to alter the behavior of the connection.

1. Open the `<classpathRoot>/alfresco-global.properties` file.

2. Add the `centera.url` property.

    For example:

    ```xml
    centera.url=168.159.214.24?c:/centera/c2armtesting.pea
    ```

    The `centera.url` property specifies the details of the Centera server. For example, in this case, it specifies the IP address `168.159.214.24`.

    The property also includes the location of the Centera c2armtesting.pea file. For example, C:/centera/c2armtesting.pea or `/usr/local/Centera_SDK/c2armtesting.pea`.

3. Set any additional properties to alter the way that the Centera Connector behaves.

    There are various additional properties that can be set to control the Centera Connector module. For example, the retention period for storing content is controlled using the `xam.archive.retentionPeriodDays=1` property.

    > **Note:** The sample alfresco-global.properties file supplied in the Alfresco EMC Centera Connector AMP provides example settings and values.

4. Save the `alfresco-global.properties` file.

5. Ensure that Java can find the Centera libraries.

    On Windows, set the `Path` environment variable.

    1. Open **Control Panel\All Control Panel Items\System**.

    2. Select **Advanced System Settings > Advanced > Environment Variables**.

    3. In the **System Variables** section, modify the existing `Path` environment variable by adding the path to the Centera libs.

    For example:

    ```bash
    Path=c:\centera\lib64
    ```

    On Linux, set the `PATH` and `LD_LIBRARY_PATH` environment variables.

    For example:

    ```bash
    export PATH=$PATH:/usr/local/Centera_SDK/lib/64
    export LD_LIBRARY_PATH=/usr/local/Centera_SDK/lib/64
    ```

## Centera Connector module properties

The following properties can be set for the Centera Connector module.

Set these properties in the `alfresco-global.properties` file.

| Property | Description |
| -------- | ----------- |
|centera.url | Specifies the full Centera connection string. For example, `centera.url=168.159.214.24?c:/centera/c2armtesting.pea`|
|xam.archive.storeName | Specifies the name of the XAM store that will be used by the `xam:archive` behavior. For example, `xam.archive.storeName=xamArchive`|
|xam.archive.retentionPeriodDays| Specifies the number of days to retain a XAM document. Use `0` to ignore; `>0` days to retain. Alfresco Content Services can be configured to allow deletes in conflict to the Centera enforce retention periods. A retention period is the time that a C-Clip and its underlying blobs must be stored on an EMC Centera before an application is allowed to delete them. According to configuration, `retentionPeriod` is set to 1 day. If you switch the server date to 1-2 days ahead on the Alfresco Content Services side, this will not result in the expiry of retention periods in the Centera cluster. For this reason, delete is not permitted. You should not change the date/time but wait until this period finished. Change the `xam.archive.retentionPeriodDays` to be not be greater then `system.content.orphanProtectDays`. This will prevent the cleaner from deleting non-expired Centera binary content. For example, `xam.archive.retentionPeriodDays=0`|
|xam.archive.addLock=true|Specifies whether to add the `cm:lockable` aspect automatically. Set to true to apply a lock when the aspect is added; set to false to not apply a lock|
|xam.archive.cronExpression| Specifies a cron expression for the XAM archive cleaner job. For example, `xam.archive.cronExpression=0 0 21 * * ?`|
|xam.archive.bindingPropertiesPattern| Specifies the pattern for all binding properties. Any property (full property name at time of writing) that does not match will be written as non-binding. For example, `vnd\\.com\\.alfresco\\..*` will match all properties prefixed with `vnd.com.alfresco`. Refer to [http://download.oracle.com/javase/tutorial/essential/regex/](http://download.oracle.com/javase/tutorial/essential/regex/), also [http://download.oracle.com/javase/6/docs/api/](http://download.oracle.com/javase/6/docs/api/).|
|xam.archive.app.db| The XAM well-known properties, which will be automatically populated. For example, `xam.archive.app.db=${db.url}`|
|xam.archive.globalPropertiesPrefix| The list of global properties to add to the XSet (comma-separated). For example, `${xam.archive.globalPropertiesPrefix}xam.archive.app.vendor`. This can be a list of any value that can be set in the alfresco-global.properties file but you should import any required properties using variable replacement to get consistent naming. For example, `xam.archive.globalPropertiesPrefix=vnd.com.alfresco. xam.archive.globalPropertiesToWrite=xam.archive.app.vendor, xam.archive.app.name, xam.archive.app.version, xam.archive.app.db`|
|xam.archive.contentFieldName| Specifies the name of the property against which to store content. For example, `xam.archive.contentFieldName=${xam.archive.globalPropertiesPrefix}content`|
|xam.archive.nodePropertiesPrefix| The list of node properties to add to the XSet (comma-separated, namespace-prefixes). For example, `${xam.archive.globalPropertiesPrefix}${xam.archive.nodePropertiesPrefix}cm:name`. Properties that are not present on the node are ignored. Implicit properties are generated and can be listed, for example, `sys:ref`, `sys:path`. For example, `xam.archive.nodePropertiesPrefix=xam.archive.node. xam.archive.nodePropertiesToWrite=sys:ref, sys:path, cm:name, cm:created, cm:creator, cm:owners`|
|xam.archive.forceBackgroundStoreMove| Specifies whether to move content to the XAM store immediately or as a background job. The aspect `xam.archivemodel:archivePending` is added to the document, pending the move to the XAM store. Set to false to move the content binaries to XAM as soon as the retention date is set. Set to true to move the content when the scheduled job runs. The default value for this property is false.|
|centera.fp.option.embedded.data| The maximum data size, in bytes, for data to be embedded in the CDF instead of being stored as separate blobs. The default value is 0 bytes, meaning data is never embedded in the CDF. The maximum value is 102400 bytes (100 KB). The value for the embedded data threshold can be set to less than or equal to 102400 bytes. For example, `centera.fp.option.embedded.data=102400`|
|centera.fp.option.maxconnections| The maximum number of sockets that the SDK will allocate for your application. Sockets are used to communicate with the Atmos CAS nodes managed in each pool object. The default value is 100. The maximum value is 999. For example, `centera.fp.option.maxconnections=100`|
|centera.fp.option.buffersize| The size of an internal C-Clip buffer in bytes. The default value is 16*1024. This value must be greater than 0. For example, `centera.fp.option.buffersize=153600`|
|centera.fp.option.prefetch.size| The size of the prefetch buffer. This buffer is used to assist in determining the size of the blob. The default size is 32 KB. The maximum size is 1 MB. For example, `centera.fp.option.prefetch.size=1048576`|

## Testing the EMC Centera connection

The JCASScript tool is provided with the EMC Centera® SDK and Community Tools.

> **Note:** From version 2.2 the Centera Connector only supports the EMC Centera proprietary API. The Alfresco XAM connector is no longer supported.

Use the JCASScript tool to connect to the Centera server using the `centera.url` property that you specified in the alfresco-global.properties file.

1. Start the JCASScript tool using the following command:

    ```bash
    java -jar JCASScript.jar
    ```

2. Enter the following command to connect to the Centera server:

    ```bash
    poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
    ```

    An example of the output is as follows:

    ```bash
    CASScript>poolOpen 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea

    Attempting to connect to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea

    Connected to: 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea

    CASPool Properties:
       Connection String:                 168.159.214.24?/usr/local/Centera_SDK/c2armtesting.pea
      Cluster Time:                      2014.01.10 06:25:31 GMT
      Buffer Size:                       16384
      Prefetch Buffer Size:              32768
      Connection Timeout:                120000
      Multi-Cluster Failover Enabled:    True
      Collision Avoidance Enabled:       False
    ```
