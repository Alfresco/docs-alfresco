---
title: Properties
---

This page lists the configuration properties for a Solr core and the Solr index's full text search.

## Solr core configuration properties

The `solrcore.properties` configuration file is the property configuration file for a Solr core. There's one `solrcore.properties` file in each core's configuration directory. Use this information to understand the properties of this file, their description, and the default value.

|Property|Description|
|-------------|-----------|
|alfresco.aclBatchSize|This property is used for batch fetching updates during tracking, for example `10`.|
|alfresco.baseUrl|This property configures the base URL to Alfresco Content Services web project, for example `/alfresco`. If you need to change the `baseUrl` value, see [Deploying with a different context path [Deploy with a different context path]({% link content-services/6.1/config/repository.md %}#deploy-with-a-different-context-path).|
|alfresco.batch.count|This property indicates the number of updates that should be made to this core before a commit is executed, for example  `1000`.|
|alfresco.cascade.tracker.enabled|Index fields required for path-based queries. Disabling support for path queries (i.e. setting this to false) can speed up indexing in sharded systems, for example `true`.  NOTE: Updating this property will result in path-based fields not being populated. Consequently it should not be changed after the initial startup of the server.|
|alfresco.changeSetAclsBatchSize|This property is used for batch fetching updates during tracking, for example `100`.|
|alfresco.corePoolSize|This property specifies the pool size for multi-threaded tracking. It is used for indexing nodes, for example `3`.|
|alfresco.cron|This property specifies the cron expression that instructs Solr how often to track Alfresco Content Services and index new or updated content. The default value indicates that Solr tracks every 15 seconds i.e. `0/15 * * * * ? *`.|
|alfresco.doPermissionChecks|This property allows users to see the document name or properties on a search result, for example `true`.|
|alfresco.encryption.ssl.keystore.location|This property specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located, for example `ssl.repo.client.keystore`.|
|alfresco.encryption.ssl.keystore. passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT keystore, also the default that is used to store keys within the keystore, for example `ssl-keystore-passwords.properties`.|
|alfresco.encryption.ssl.keystore.provider|This property specifies the Java provider that implements the `type` attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the keystore type specified is used.|
|alfresco.encryption.ssl.keystore.type|This property specifies the CLIENT keystore type, for example `JCEKS`.|
|alfresco.encryption.ssl.truststore.location|This property specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located, for example `ssl.repo.client.truststore`.|
|alfresco.encryption.ssl.truststore. passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT truststore, also the default that is used to store keys within the truststore, for example `ssl-truststore-passwords.properties`.|
|alfresco.encryption.ssl.truststore.provider|This property specifies the Java provider that implements the `type` attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the truststore type specified is used.|
|alfresco.encryption.ssl.truststore.type|This property specifies the CLIENT truststore type, for example `JCEKS`.|
|alfresco.hole.retention|Each track will revisit all transactions from the timestamp of the last in the index, less this value, to fill in any transactions that might have been missed, for example `3600000`.|
|alfresco.host|This property specifies the host name for the instance that Solr should track and index, for example `localhost`.|
|alfresco.index.transformContent|If this property is set to false, the index tracker will not transform any content and only the metadata will be indexed, for example `false`. The default value is `true`.|
|alfresco.keepAliveTime|This property specifies the time (in seconds) to keep non-core idle threads in the pool, for example `120`.|
|alfresco.lag|When Solr tracking starts, it aims to get up to date to the current time (in seconds), less this lag, for example `1000`.|
|alfresco.maxHostConnections|This property is used for HTTP client configuration, for example `40`.|
|alfresco.maximumPoolSize|This property specifies the maximum pool size for multi-threaded tracking, for example `-1`.|
|alfresco.maxTotalConnections|This property is used for HTTP client configuration, for example `40`.|
|alfresco.metadata.ignore.datatype.0|This property configures the metadata pulling control, for example `cm:person`.|
|alfresco.metadata.ignore.datatype.1|This property configures the metadata pulling control, for example `app:configurations`.|
|alfresco.metadata.skipDescendantDocsForSpecificTypes|This property reduces the overhead caused by reindexing sites, for example `false`.|
|alfresco.port|This property specifies the HTTP port for the instance that Solr should track and index, for example `8080`.|
|alfresco.port.ssl|This property specifies the HTTPS port for the instance that Solr should track and index, for example `8443`.|
|alfresco.secureComms|This property instructs Solr if it should talk over HTTP or HTTPS. Set to none if a plain HTTP connection should be used, for example `https`.|
|alfresco.socketTimeout|This property specifies the amount of time Solr tracker will take to notice if the Alfresco Content Services web app shuts down first, if Alfresco Content Services and Solr are running on the same web application, for example `60000`.|
|alfresco.stores|This property specifies the repository store that this core should index, for example `workspace://SpacesStore`.|
|alfresco.threadDaemon|This property sets whether the threads run as daemon threads or not. If set to `false`, shut down is blocked else it is left unblocked, for example `true`.|
|alfresco.threadPriority|This property specifies the priority that all threads must have on the scale of 1 to 10, where 1 has the lowest priority and 10 has the highest priority, for example `5`.|
|alfresco.topTermSpanRewriteLimit|Term expansion is used to convert wildcard \* matches into a finite disjunction - e.g. "cat*" -> "cat OR category OR catalogue OR ... caterpillar". This property controls the number of terms in this disjunction, which are chosen from the index with preference given to more popular terms. If you increase the value too much you may not have good performance and if you decrease the value too much you may not receive any results. How you are affected by variations in the limit will depend on your installation, for example `1000`.|
|alfresco.transactionDocsBatchSize|This property is used for batch fetching updates during tracking, for example `100`.|
|alfresco.version|This property specifies the Alfresco Content Services version installed, for example `6.1`.|
|alfresco.workQueueSize|This property specifies the maximum number of queued work instances to keep before blocking against further adds, for example `-1`.|
|data.dir.root|This property specifies the top level directory path for the indexes managed by Solr, for example `/alfresco-search-services/solrhome`|
|data.dir.store|This property specifies the directory relative to data.dir.root where the data for this core is stored, for example `workspace/SpacesStore`|
|enable.alfresco.tracking|This property instructs Solr if it should index Alfresco Content Services content in the associated repository store or not, for example `true`.|
|max.field.length|This property specifies the maximum number of tokens to include for each field. By default, all tokens are added, for example `2147483647`.|
|maxScheduledTransactions|This optional parameter controls the maximum transactions to schedule for reindexing in the admin fix tool. If the admin fix action specifies a value for `maxScheduledTransactions` then the request parameter that is used in the solrcore.properties configuration file is ignored.|
|solr.authorityCache.autowarmCount|This property configures the Solr result cache, for example `0`.|
|solr.authorityCache.initialSize|This property configures the caches used in authority filter generation, for example `64`.|
|solr.authorityCache.size|This property configures the caches used in authority filter generation, for example `64`.|
|solr.deniedCache.autowarmCount|This property configures the Solr result cache, for example `0`.|
|solr.deniedCache.initialSize|This property configures the Solr result cache, for example `1024`.|
|solr.deniedCache.size|This property configures the Solr result cache, for example `4096`.|
|solr.documentCache.autowarmCount|This property configures the number of document objects to pre-populate from the old cache, for example `0`.|
|solr.documentCache.initialSize|This property configures the Solr document cache, for example `64`.|
|solr.documentCache.size|This property configures the Solr document cache, for example `64`.|
|solr.filterCache.autowarmCount|This property configures the number of entries to pre-populate from the old cache, for example `128`.|
|solr.filterCache.initialSize|This property specifies the initial capacity (number of entries) of the Solr filter cache. You may want to increase the value if you have many users, groups, and tenants, for example `64`.|
|solr.filterCache.size|This property specifies the maximum number of entries in the Solr filter cache. You may want to increase the value if you have many users, groups, and tenants, for example `64`.|
|solr.maxBooleanClauses|This property specifies the number of Boolean clauses in a query. It can affect range or wildcard queries that expand to big Boolean queries, for example `10000`.|
|solr.nodeBatchSize|This property configures the batch fetch, for example `10`.|
|solr.ownerCache.autowarmCount|This property configures the Solr result cache, for example `0`.|
|solr.ownerCache.initialSize|This property configures the Solr result cache, for example `1024`.|
|solr.ownerCache.size|This property configures the Solr result cache, for example `4096`.|
|solr.pathCache.autowarmCount|This property configures the Solr result cache, for example `128`.|
|solr.pathCache.initialSize|This property configures the cache used for `PATH` query parts, for example `64`.|
|solr.pathCache.size|This property configures the cache used for `PATH` query parts, for example `64`.|
|solr.queryResultCache.autowarmCount|This property configures the number of search results to pre-populate from the old cache, for example `0`.|
|solr.queryResultCache.initialSize|Increase the value of this property to cache more query results, for example `1024`.|
|solr.queryResultCache.size|This property configures the number of query results. Increase the value to cache more query results, for example `1024`.|
|solr.queryResultMaxDocsCached|Set this property to a higher value if you expect to page through most results, for example `2000`.|
|solr.queryResultWindowSize|This property rounds-up a request number to the nearest multiple of the setting, thereby storing a range or window of documents to be quickly available, for example `200`.|
|solr.readerCache.autowarmCount|This property configures the Solr result cache, for example `0`.|
|solr.readerCache.initialSize|This property configures the Solr result cache, for example `1024`.|
|solr.readerCache.size|This property configures the Solr result cache, for example `4096`.|

## Full text search configuration properties

The Solr index's full text search properties influence the behavior of Solr indexes.

The main index and deltas all use the same configuration. The data dictionary settings for properties determine how individual properties are indexed.

If you wish to change the default value of a property, add the relevant property to the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file and then make the changes.

### Solr index properties

| Property | Description |
| -------- | ----------- |
| solr.host=localhost | The host name where the Solr instance is located |
| solr.port=8080 | The port number on which the Solr instance is running |
| solr.port.ssl=8443 | The port number on which the Solr SSL support is running. |
| solr.solrUser=solr | The Solr user name |
| solr.solrPassword=solr | The Solr password |
| solr.secureComms=https | The HTTPS connection |
| solr.solrConnectTimeout=5000 | The Solr connection timeouts in ms |
| solr.solrPingCronExpression=0 0/5 * * * ? * | The cron expression defining how often the Solr Admin client (used by JMX) pings Solr if it goes away |

### Data dictionary options

The indexing behavior for each property can be set in the content model. By default the index is eventually consistent with the created content and properties are tokenized when indexed. For more information on how to configure indexing for properties in the content model see this [Content Model Extension Point ]({% link content-services/6.1/develop/repo-ext-points/content-model.md %})
.

### Indexing options

If you want archive or zip files to be unzipped and the files included in the index, set the following property:

```bash
transformer.Archive.includeContents=true
```

The default setting is false.
