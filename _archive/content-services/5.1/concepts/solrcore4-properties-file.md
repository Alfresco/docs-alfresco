---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [configuration files, solr]
---

# Solr core configuration properties

The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory. Use this information to understand the properties of this file, their description, and the default value.

|Property Name|Description|Default Value|
|-------------|-----------|-------------|
|data.dir.root|This property specifies the top level directory path for the indexes managed by Solr.|C:/Alfresco/alf\_data/solr4/index|
|data.dir.store|This property specifies the directory relative to data.dir.root where the data for this core is stored.|workspace/SpacesStore|
|enable.alfresco.tracking|This property instructs Solr if it should index Alfresco content in the associated Alfresco repository store or not.|`true`|
|max.field.length|This property specifies the maximum number of tokens to include for each field. By default, all tokens are added.|`2147483647`|
|alfresco.version|This property specifies the Alfresco version installed.|`5.1.5`|
|alfresco.host|This property specifies the host name for the Alfresco instance that Solr should track and index. In a default installation, both Alfresco and Solr runs in the same Tomcat instance and on the same host, so host would be set to local host.|`localhost`|
|alfresco.port|This property specifies the HTTP port for the Alfresco instance that Solr should track and index.|`8080`|
|alfresco.port.ssl|This property specifies the HTTPS port for the Alfresco instance that Solr should track and index.|`8443`|
|alfresco.cron|This property specifies the cron expression that instructs Solr how often to track Alfresco and index new or updated content. The default value indicates that Solr tracks Alfresco every 15 seconds.|`0/15 * * * * ? *`|
|alfresco.stores|This property specifies the Alfresco repository store that this core should index.|`workspace://SpacesStore`|
|alfresco.baseUrl|This property configures the base URL to Alfresco web project. If you need to change the `baseUrl` value, see [Deploying Alfresco with a different context path](../tasks/deploy-contextpath.md) for configuring information.|`/alfresco`|
|alfresco.lag|When Solr tracking starts, it aims to get up to date to the current time \(in seconds\), less this lag.|`1000`|
|alfresco.hole.retention|Each track will revisit all transactions from the timestamp of the last in the index, less this value, to fill in any transactions that might have been missed.|`3600000`|
|alfresco.batch.count|This property indicates the number of updates that should be made to this core before a commit is executed.|`1000`|
|alfresco.secureComms|This property instructs Solr if it should talk to Alfresco over HTTP or HTTPS. Set to none if a plain HTTP connection should be used.|`https`|
|alfresco.encryption.ssl.keystore.type|This property specifies the CLIENT keystore type.|`JCEKS`|
|alfresco.encryption.ssl.keystore.provider|This property specifies the Java provider that implements the `type` attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the keystore type specified is used.| |
|alfresco.encryption.ssl.keystore.location|This property specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located.|`ssl.repo.client.keystore`|
|alfresco.encryption.ssl.keystore.passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT keystore, also the default that is used to store keys within the keystore.|`ssl-keystore-passwords.properties`|
|alfresco.encryption.ssl.truststore.type|This property specifies the CLIENT truststore type.|`JCEKS`|
|alfresco.encryption.ssl.truststore.provider|This property specifies the Java provider that implements the `type` attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the truststore type specified is used.| |
|alfresco.encryption.ssl.truststore.location|This property specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located.|`ssl.repo.client.truststore`|
|alfresco.encryption.ssl.truststore.passwordFileLocation|This property specifies the location of the file containing the password that is used to access the CLIENT truststore, also the default that is used to store keys within the truststore.|`ssl-truststore-passwords.properties`|
|alfresco.corePoolSize|This property specifies the pool size for multi-threaded tracking. It is used for indexing nodes.|`3`|
|alfresco.maximumPoolSize|This property specifies the maximum pool size for multi-threaded tracking.|`-1`|
|alfresco.keepAliveTime|This property specifies the time \(in seconds\) to keep non-core idle threads in the pool.|`120`|
|alfresco.threadPriority|This property specifies the priority that all threads must have on the scale of 1 to 10, where 1 has the lowest priority and 10 has the highest priority.|`5`|
|alfresco.threadDaemon|This property sets whether the threads run as daemon threads or not. If set to `false`, shut down is blocked else it is left unblocked.|`true`|
|alfresco.workQueueSize|This property specifies the maximum number of queued work instances to keep before blocking against further adds.|`-1`|
|alfresco.maxTotalConnections|This property is used for HTTP client configuration.|`40`|
|alfresco.maxHostConnections|This property is used for HTTP client configuration.|`40`|
|alfresco.socketTimeout|This property specifies the amount of time Solr tracker will take to notice if the Alfresco web app shuts down first, if Alfresco and Solr are running on the same web application.|`60000`|
|solr.filterCache.size|This property specifies the maximum number of entries in the Solr filter cache.|`64`|
|solr.filterCache.initialSize|This property specifies the initial capacity \(number of entries\) of the Solr filter cache.|`64`|
|solr.queryResultCache.size|This property configures the Solr result cache.|`1024`|
|solr.queryResultCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.documentCache.size|This property configures the Solr document cache.|`64`|
|solr.documentCache.initialSize|This property configures the Solr document cache.|`64`|
|solr.queryResultMaxDocsCached|This property configures the Solr result cache.|`2000`|
|solr.authorityCache.size|This property configures the Solr result cache.|`64`|
|solr.authorityCache.initialSize|This property configures the Solr result cache.|`64`|
|solr.pathCache.size|This property configures the Solr result cache.|`64`|
|solr.pathCache.initialSize|This property configures the Solr result cache.|`64`|
|solr.ownerCache.size|This property configures the Solr result cache.|`4096`|
|solr.ownerCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.readerCache.size|This property configures the Solr result cache.|`4096`|
|solr.readerCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.deniedCache.size|This property configures the Solr result cache.|`4096`|
|solr.deniedCache.initialSize|This property configures the Solr result cache.|`1024`|
|solr.nodeBatchSize|This property configures the Solr result cache.|`10`|
|solr.filterCache.autowarmCount|This property configures the Solr result cache.|`128`|
|solr.authorityCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.pathCache.autowarmCount|This property configures the Solr result cache.|`128`|
|solr.deniedCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.readerCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.ownerCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.queryResultCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.documentCache.autowarmCount|This property configures the Solr result cache.|`0`|
|solr.queryResultWindowSize|This property configures the Solr result cache.|`200`|
|alfresco.doPermissionChecks|This property configures the Solr result cache.|`true`|
|alfresco.metadata.skipDescendantDocsForSpecificTypes|This property configures the Solr result cache.|`false`|
|alfresco.metadata.ignore.datatype.0|This property configures the Solr result cache.|`cm:person`|
|alfresco.metadata.ignore.datatype.1|This property configures the Solr result cache.|`app:configurations`|
|solr.maxBooleanClauses|This property specifies the number of Boolean clauses in a query. It can affect range or wildcard queries that expand to big Boolean queries.|`10000`|
|alfresco.transactionDocsBatchSize|This property is used for batch fetching updates during tracking.|`100`|
|alfresco.changeSetAclsBatchSize|This property is used for batch fetching updates during tracking.|`100`|
|alfresco.aclBatchSize|This property is used for batch fetching updates during tracking.|`10`|
|alfresco.index.transformContent|If this property is set to false, the index tracker will not transform any content and only the metadata will be indexed.|`false`|

**Parent topic:**[Solr configuration files](../concepts/solr4-config-files.md)

