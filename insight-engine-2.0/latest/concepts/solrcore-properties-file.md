# Solr core configuration properties

The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory. Use this information to understand the properties of this file, their description, and the default value.

|Property Name|Description|Default Value|
|-------------|-----------|-------------|
|alfresco.aclBatchSize|This property is used for batch fetching updates during tracking.|`10`|
|`alfresco.acl.tracker.maxParallelism`|Defines the number of threads that are used when indexing documents using the ACL Tracker.|`32`|
|alfresco.baseUrl|This property configures the base URL to Alfresco Content Services web project. If you need to change the `baseUrl` value, see [Deploying with a different context path](https://docs.alfresco.com/6.1/tasks/deploy-contextpath.html).

|`/alfresco`|
|alfresco.batch.count|This property indicates the number of updates that should be made to this core before a commit is executed.|`1000`|
|alfresco.cascade.tracker.enabled|Index fields required for path-based queries. Disabling support for path queries \(i.e. setting this to false\) can speed up indexing in sharded systems.

 NOTE: Updating this property will result in path-based fields not being populated. Consequently it should not be changed after the initial startup of the server.

|`true`|
|`alfresco.cascade.tracker.maxParallelism`|Defines the number of threads that are used when indexing documents using the Cascade Tracker.|`32`|
|alfresco.changeSetAclsBatchSize|This property is used for batch fetching updates during tracking.|`100`|
|`alfresco.content.tracker.maxParallelism`|Defines the number of threads that are used when indexing documents using the Content Tracker.|`32`|
|alfresco.corePoolSize|This property specifies the pool size for multi-threaded tracking. It is used for indexing nodes.|`3`|
|alfresco.cron|This property specifies the cron expression that instructs Solr how often to track Alfresco Content Services and index new or updated content. The default value indicates that Solr tracks every 15 seconds.|`0/15 * * * * ? *`|
|alfresco.doPermissionChecks|This property allows users to see the document name or properties on a search result.|`true`|
|alfresco.encryption.ssl.keystore.location|This property specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located.|`ssl.repo.client.keystore`|
|alfresco.encryption.ssl.keystore. passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT keystore, also the default that is used to store keys within the keystore.|`ssl-keystore-passwords.properties`|
|alfresco.encryption.ssl.keystore.provider|This property specifies the Java provider that implements the `type` attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the keystore type specified is used.| |
|alfresco.encryption.ssl.keystore.type|This property specifies the CLIENT keystore type.|`JCEKS`|
|alfresco.encryption.ssl.truststore.location|This property specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located.|`ssl.repo.client.truststore`|
|alfresco.encryption.ssl.truststore. passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT truststore, also the default that is used to store keys within the truststore.|`ssl-truststore-passwords.properties`|
|alfresco.encryption.ssl.truststore.provider|This property specifies the Java provider that implements the `type` attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the truststore type specified is used.| |
|alfresco.encryption.ssl.truststore.type|This property specifies the CLIENT truststore type.|`JCEKS`|
|alfresco.hole.retention|Each track will revisit all transactions from the timestamp of the last in the index, less this value, to fill in any transactions that might have been missed.|`3600000`|
|alfresco.host|This property specifies the host name for the instance that Solr should track and index.|`localhost`|
|`alfresco.nodestate.tracker.cron`|This property controls the frequency of registration of a Search Services shard to Alfresco Content Services.**Note:** The value you set for `alfresco.nodestate.tracker.cron` should be lower than the value you set for `search.solrShardRegistry.shardInstanceTimeoutInSecond`, which is set in the alfresco-global.properties file.

|`0/10 * * * * ? *)`|
|alfresco.index.transformContent|If this property is set to false, the index tracker will not transform any content and only the metadata will be indexed.|`false`|
|alfresco.keepAliveTime|This property specifies the time \(in seconds\) to keep non-core idle threads in the pool.|`120`|
|alfresco.lag|When Solr tracking starts, it aims to get up to date to the current time \(in seconds\), less this lag.|`1000`|
|alfresco.maxHostConnections|This property is used for HTTP client configuration.|`40`|
|alfresco.maximumPoolSize|This property specifies the maximum pool size for multi-threaded tracking.|`-1`|
|alfresco.maxTotalConnections|This property is used for HTTP client configuration.|`40`|
|alfresco.metadata.ignore.datatype.0|This property configures the metadata pulling control.|`cm:person`|
|alfresco.metadata.ignore.datatype.1|This property configures the metadata pulling control.|`app:configurations`|
|alfresco.metadata.skipDescendantDocsForSpecificTypes|This property reduces the overhead caused by reindexing sites.|`false`|
|`alfresco.metadata.tracker.maxParallelism`|Defines the number of threads used when indexing documents using the Metadata Tracker.|`32`|
|alfresco.port|This property specifies the HTTP port for the instance that Solr should track and index.|`8080`|
|alfresco.port.ssl|This property specifies the HTTPS port for the instance that Solr should track and index.|`8443`|
|alfresco.secureComms|This property instructs Solr if it should talk over HTTP or HTTPS. Set to none if a plain HTTP connection should be used.|`https`|
|alfresco.socketTimeout|This property specifies the amount of time Solr tracker will take to notice if the Alfresco Content Services web app shuts down first, if Alfresco Content Services and Solr are running on the same web application.|`60000`|
|alfresco.stores|This property specifies the repository store that this core should index.|`workspace://SpacesStore`|
|alfresco.threadDaemon|This property sets whether the threads run as daemon threads or not. If set to `false`, shut down is blocked else it is left unblocked.|`true`|
|alfresco.threadPriority|This property specifies the priority that all threads must have on the scale of 1 to 10, where 1 has the lowest priority and 10 has the highest priority.|`5`|
|alfresco.topTermSpanRewriteLimit|Term expansion is used to convert wildcard \* matches into a finite disjunction - e.g. "cat\*" -\> "cat OR category OR catalogue OR ... caterpillar". This property controls the number of terms in this disjunction, which are chosen from the index with preference given to more popular terms. If you increase the value too much you may not have good performance and if you decrease the value too much you may not receive any results. How you are affected by variations in the limit will depend on your installation.|`1000`|
|alfresco.transactionDocsBatchSize|This property is used for batch fetching updates during tracking.|`100`|
|alfresco.version|This property specifies the Alfresco Content Services version installed.|`6.2`|
|alfresco.workQueueSize|This property specifies the maximum number of queued work instances to keep before blocking against further adds.|`-1`|
|data.dir.root|This property specifies the top level directory path for the indexes managed by Solr.|/alfresco-insight-engine/solrhome|
|data.dir.store|This property specifies the directory relative to data.dir.root where the data for this core is stored.|workspace/SpacesStore|
|enable.alfresco.tracking|This property instructs Solr if it should index Alfresco Content Services content in the associated repository store or not.|`true`|
|max.field.length|This property specifies the maximum number of tokens to include for each field. By default, all tokens are added.|`2147483647`|
|`maxScheduledTransactions`|This optional parameter controls the maximum transactions to schedule for reindexing in the admin fix tool. If the admin fix action specifies a value for `maxScheduledTransactions` then the request parameter that is used in the solrcore.properties configuration file is ignored.

| |
|`search.solrShardRegistry.dbidRangeRefreshTimeoutInSeconds`|This property controls the frequency of synchronisation of the shard information between multiple ACS instances for `DBID_Range` sharding.**Note:** This property is only used when you are using `DBID_Range` sharding with multiple ACS instances.

|`30`|
|solr.authorityCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.authorityCache.initialSize|This property configures the caches used in authority filter generation.|`64`|
|solr.authorityCache.size|This property configures the caches used in authority filter generation.|`64`|
|solr.deniedCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.deniedCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.deniedCache.size|This property configures the Solr result cache.|`4096`|
|solr.documentCache.autowarmCount|This property configures the number of document objects to pre-populate from the old cache.|`0`|
|solr.documentCache.initialSize|This property configures the Solr document cache.|`64`|
|solr.documentCache.size|This property configures the Solr document cache.|`64`|
|solr.filterCache.autowarmCount|This property configures the number of entries to pre-populate from the old cache.|`128`|
|solr.filterCache.initialSize|This property specifies the initial capacity \(number of entries\) of the Solr filter cache. You may want to increase the value if you have many users, groups, and tenants.|`64`|
|solr.filterCache.size|This property specifies the maximum number of entries in the Solr filter cache. You may want to increase the value if you have many users, groups, and tenants.|`64`|
|`solr.initial.transaction.range`|When checking the consistency of the repository and index, the first transaction is compared in both the repository and index repositories. In order to receive that initial transaction from the database a range of between 0-2000 for transaction id should be used. This parameter can be used when the initial transaction id is greater than 2000.|`0-2000`|
|solr.maxBooleanClauses|This property specifies the number of Boolean clauses in a query. It can affect range or wildcard queries that expand to big Boolean queries.|`10000`|
|solr.nodeBatchSize|This property configures the batch fetch.|`10`|
|solr.ownerCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.ownerCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.ownerCache.size|This property configures the Solr result cache.|`4096`|
|solr.pathCache.autowarmCount|This property configures the Solr result cache.|`128`|
|solr.pathCache.initialSize|This property configures the cache used for `PATH` query parts.|`64`|
|solr.pathCache.size|This property configures the cache used for `PATH` query parts.|`64`|
|solr.queryResultCache.autowarmCount|This property configures the number of search results to pre-populate from the old cache.|`0`|
|solr.queryResultCache.initialSize|Increase the value of this property to cache more query results.|`1024`|
|solr.queryResultCache.size|This property configures the number of query results. Increase the value to cache more query results.|`1024`|
|solr.queryResultMaxDocsCached|Set this property to a higher value if you expect to page through most results.|`2000`|
|solr.queryResultWindowSize|This property rounds-up a request number to the nearest multiple of the setting, thereby storing a range or window of documents to be quickly available.|`200`|
|solr.readerCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.readerCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.readerCache.size|This property configures the Solr result cache.|`4096`|
|`solr.request.content.compress`|This property when set to `true` will compress the content that is sent back from the repository during system communication.|`false`|

**Parent topic:**[Solr configuration files](../concepts/solr-config-files.md)

