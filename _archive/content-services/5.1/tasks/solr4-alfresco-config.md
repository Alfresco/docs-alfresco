---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Activating Solr

Use this information to activate the Solr search mechanism in a manual Alfresco installation or when upgrading from a previous version.

-   **[Working with the Search Service](../concepts/adminconsole-searchservice.md)**  
Search Service in the Admin Console helps you to manage and monitor the search service you want to use in Alfresco.

**Parent topic:**[Configure Solr search service](../concepts/configure-solr4.md)

## Global properties file

1.  Open the <classpathRoot\>\\alfresco-global.properties file.

2.  Set the following properties:

    |Property|Description|
    |--------|-----------|
    |`index.subsystem.name`|The subsystem type value. The default value is `solr4`.|
    |`solr.host`|The host name where the Solr instance is located.|
    |`solr.port`|The port number on which the Solr instance is running.|
    |`solr.port.ssl`|The port number on which the Solr SSL support is running.|

    For example, some example properties for activating Solr are:

    ```
    index.subsystem.name=solr4
    solr.host=localhost
    solr.port=8080
    solr.port.ssl=8443
    ```

3.  Save the global properties file and restart the Alfresco server.


## Admin Console

1.  Open the Admin Console.

2.  Edit the following properties:

    |Property|Description|
    |--------|-----------|
    |`index.subsystem.name`|Select the subsystem type value as `solr4`.|
    |`solr.host`|The host name where the Solr instance is located.|
    |`solr.port`|The port number on which the Solr instance is running.|
    |`solr.port.ssl`|The port number on which the Solr SSL support is running.|

3.  Click Save.

    For more information, see [Working with the Search Service](../concepts/adminconsole-searchservice.md).


## JMX client

1.  Navigate to **MBeans \> Alfresco \> Configuration \> Search**.

2.  Set the manager `sourceBeanName` to `solr4`.

    The subsystems have their own related properties. The `managed - solr4` instance exposes the `solr.base.url` property.

3.  These can now be configured live and the subsystem redeployed.


