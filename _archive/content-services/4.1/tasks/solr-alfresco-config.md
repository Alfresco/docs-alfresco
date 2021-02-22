---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Activating Solr

This section describes how to activate the Solr search mechanism in a manual Alfresco installation or an upgrade from a previous version.

 

**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

## Global properties file

1.  Open the <configRoot\>alfresco-global.properties file.

2.  Set the following properties:

    |Property|Description|
    |--------|-----------|
    |`index.subsystem.name`|The subsystem type value. The `index.subsystem.name` property values are either `solr` or `lucene`.|
    |`solr.host`|The host name where the Solr instance is located.|
    |`solr.port`|The port number on which the Solr instance is running.|
    |`solr.port.ssl`|The port number on which the Solr SSL support is running.|

    For example, some example properties for activating Solr are:

    ```
    index.subsystem.name=solr
    solr.host=localhost
    solr.port=8080
    solr.port.ssl=8443
    ```

3.  Save the global properties file and restart the Alfresco server.


## Share Admin Console

 

1.  Open the Share Admin Console.

2.  Edit the following properties:

    |Property|Description|
    |--------|-----------|
    |`index.subsystem.name`|Select the subsystem type value as either `solr` or `lucene`.|
    |`solr.host`|The host name where the Solr instance is located.|
    |`solr.port`|The port number on which the Solr instance is running.|
    |`solr.port.ssl`|The port number on which the Solr SSL support is running.|

3.  Click Save.


## JMX client

 

1.  To switch between Lucene and Solr in JMX, choose **MBeans \> Alfresco \> Configuration \> Search**.

2.  Set the manager `sourceBeanName` to either `solr` or `lucene`.

    The subsystems have their own related properties. The `managed - solr` instance exposes the `solr.base.url` property. The `lucene` subsystem exposes all the properties that had to be set at start up.

3.  These can now be configured live and the subsystem redeployed.


