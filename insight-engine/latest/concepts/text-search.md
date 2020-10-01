---
title: Full text search configuration properties for Solr index 
---
The Solr index's full text search properties influence the behaviour of Solr indexes.

The main index and deltas all use the same configuration. The data dictionary settings for properties determine how individual properties are indexed.

If you wish to change the default value of a property, add the relevant property to the TOMCAT\_HOME\>/shared/classes/alfresco-global.properties file and then make the changes.

### Solr index properties

-   **solr.host=localhost**

    The host name where the Solr instance is located.

-   **solr.port=8080**

    The port number on which the Solr instance is running.

-   **solr.port.ssl=8443**

    The port number on which the Solr SSL support is running.

-   **solr.solrUser=solr**

    The Solr user name.

-   **solr.solrPassword=solr**

    The Solr password.

-   **solr.secureComms=https**

    The HTTPS connection.

-   **solr.solrConnectTimeout=5000**

    The Solr connection timeouts in ms.

-   **solr.solrPingCronExpression=0 0/5 \* \* \* ? \***

    The cron expression defining how often the Solr Admin client (used by JMX) pings Solr if it goes away.

### Data dictionary options

The indexing behavior for each property can be set in the content model. By default the index is eventually consistent with the created content and properties are tokenized when indexed. For more information on how to configure indexing for properties in the content model see this [page](https://docs.alfresco.com/6.2/references/dev-extension-points-content-model-define-and-deploy.html).

### Indexing options

If you want archive or zip files to be unzipped and the files included in the index, set the following property:

```bash
transformer.Archive.includeContents=true
```

The default setting is false.
