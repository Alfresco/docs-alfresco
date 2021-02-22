---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring synchronization service

The out-of-the-box synchronization service provides an SSL key but it is recommended that you use your own SSL key. To configure synchronization service, update the `server.applicationConnectors.http.keyStore*` properties in the sync/service-sync/config.yml file.

The following table lists the repository properties of the synchronization service along with their description:

|Property|Description|
|--------|-----------|
|repo.scheme|Specifies the repository URL scheme. The default value is `http repo.scheme`.|
|repo.hostname|Specifies the repository hostname. The default value is localhost.|
|repo.port|Specifies the repository port. The default value is 8080.|
|repo.jmxUser|Specifies the repository JMX username \(monitor role\). This property is used for event health check monitoring only.|
|repo.jmxPassword|Specifies the repository JMX password \(monitor role\). This property is used for event health check monitoring only.|
|messaging.broker.host|Specifies the ActiveMQ broker hostname.|
|sql.db.url|Specifies the sync database URL.|
|sql.db.username|Specifies the sync database username.|
|sql.db.password|Specifies the sync database password.|

**Additional properties**

You can modify the installation depending on your requirement using the following optional properties in the <installLocation\>/service-sync/config.yml file:

|Property name|Description|
|-------------|-----------|
|`events.repo.node.maxConsumers`|Specifies the maximum size of the event consumer thread pool. Increase this to provide more threads for event consumption.

|
|`repo.jmxPort`|For the health check to work properly, the synchronization service needs to be able to connect the repository JMX port. This property specifies the port number for the JMX endpoint of the repository.

|
|`repo.jmxUser`|For the health check to work properly, the synchronization service needs to be able to connect the repository JMX. This property specifies the username for the JMX endpoint of the repository.

|
|`repo.jmxPassword`|For the health check to work properly, the synchronization service needs to be able to connect the repository JMX. This property specifies the password for the JMX endpoint of the repository.

|
|`sync.eventLagTolerance`|Specifies the event lag the synchronization service events health check will tolerate before displaying a warning \(default is 5000ms\).|
|`sync.authentication.basicAuthUrl`|Specifies the standard repository authentication URL that the synchronization service uses to authenticate sync requests.|
|`sync.authentication.cache.expiryMs`|Specifies the expiry time \(in ms\) of the synchronization service authentication cache. Setting this higher than the default client polling time \(5 minutes\) should ensure that sync requests do not need to re-authenticate with the repository very often, at the cost of more memory use.

|
|`sync.cleanup.events.keepPeriod`|Specifies the length of time events are retained before being deleted.|
|`sync.cleanup.events.schedulerInitialDelay`|Specifies the initial delay before the event cleanup scheduler is run.|
|`sync.cleanup.events.schedulerPeriod`|Specifies the time period between event cleanup scheduler runs.|
|`sync.cleanup.numThreads`|Specifies the maximum number of threads to use for event cleanup.|
|`sync.cleanup.batchSize`|Specifies the batch size for event cleanup.|
|`logging.level`|Specifies the synchronization service logging level.|

