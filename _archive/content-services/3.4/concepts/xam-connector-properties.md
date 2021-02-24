---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [XAM, Extensions/Third Party]
keyword: [Centera, XAM, Connector, Software]
---

# Alfresco XAM Connector module properties

The following properties can be set for the XAM connector module.

Set the Alfresco XAM Connector module properties in the alfresco-global.properties file.

-   **xam.xri=snia-xam://centera\_vim!128.221.200.60?/opt/centera/us2\_armTest1.pea**

    Specifies the full XAM connection string.

-   **xam.archive.storeName=xamArchive**

    Specifies the name of the XAM store that will be used by the `xam:archive` behavior.

-   **xam.archive.retentionPeriodDays=0**

    Specifies the number of days to retain a XAM document. Use `0` to ignore; `>0` days to retain.

-   **xam.archive.addLock=true**

    Specifies whether to add the `cm:lockable` aspect automatically. Set to true to apply a lock when the aspect is added; set to false to not apply a lock

-   **xam.archive.cronExpression=0 0 21 \* \* ?**

    Specifies a cron expression for the XAM archive cleaner job.

-   **xam.archive.bindingPropertiesPattern=vnd\\\\.com\\\\.alfresco\\\\..\***

    Specifies the pattern for all binding properties. Any property \(full property name at time of writing\) that does not match will be written as non-binding. For example, `vnd\\.com\\.alfresco\\..*` will match all properties prefixed with `vnd.com.alfresco`. Refer to [http://download.oracle.com/javase/tutorial/essential/regex/](http://download.oracle.com/javase/tutorial/essential/regex/), also [http://download.oracle.com/javase/6/docs/api/](http://download.oracle.com/javase/6/docs/api/).

-   **xam.archive.app.vendor= xam.archive.app.name= xam.archive.app.version= xam.archive.app.db=$\{db.url\}**

    The XAM well-known properties, which will be automatically populated.

-   **xam.archive.globalPropertiesPrefix=vnd.com.alfresco. xam.archive.globalPropertiesToWrite=xam.archive.app.vendor, xam.archive.app.name, xam.archive.app.version, xam.archive.app.db**

    The list of global properties to add to the XSet \(comma-separated\). For example, `${xam.archive.globalPropertiesPrefix}xam.archive.app.vendor`. This can be a list of any value that can be set in the alfresco-global.properties file but you should import any required properties using variable replacement to get consistent naming.

-   **xam.archive.contentFieldName=$\{xam.archive.globalPropertiesPrefix\}content**

    Specifies the name of the property against which to store content.

-   **xam.archive.nodePropertiesPrefix=xam.archive.node. xam.archive.nodePropertiesToWrite=sys:ref, sys:path, cm:name, cm:created, cm:creator, cm:owner**

    The list of node properties to add to the XSet \(comma-separated, namespace-prefixes\). For example, `${xam.archive.globalPropertiesPrefix}${xam.archive.nodePropertiesPrefix}cm:name`. Properties that are not present on the node are ignored. Implicit properties are generated and can be listed, for example, `sys:ref`, `sys:path`.

-   **xam.archive.forceBackgroundStoreMove**

    Specifies whether to move content to the XAM store immediately or as a background job. The aspect `xam.archivemodel:archivePending` is added to the document, pending the move to the XAM store. Set to false to move the content binaries to XAM as soon as the retention date is set. Set to true to move the content when the scheduled job runs. The default value for this property is false.


**Parent topic:**[Configuring the XAM connection](../tasks/xam-connection-config.md)

