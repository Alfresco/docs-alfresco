---
title: Overview
---

In order to use Alfresco Search Enterprise 3.0 for Alfresco Content Services platform, following configuration should be performed:

* Alfresco Repository properties in configuration file `alfresco-global.properties` or as environment variables related to Search Subystem configuration for *searching* features
* Alfresco Elasticsearch Connector properties as environment variables related to communication with Alfresco Repository (Database, ActiveMQ and Transform Service) and Elasticsearch server for *indexing* features

### Alfresco Repository

Alfresco Repository provides configuration properties for `elasticsearch` Search Subystem to define the connection to an external Elasticsearch server.

Setting the subsystem search property to `elasticsearch` is required.

```bash
index.subsystem.name=elasticsearch
```

Additional property values can be included in Alfresco Repository global configuration file `alfresco-global.properties`

|Property|Description|
|--------|-----------|
| elasticsearch.host | Name of the Elasticsearch server. The default value is `localhost`. |
| elasticsearch.port | Port of the Elasticsearch server. The default value is `9200`. |
| elasticsearch.baseUrl | Context path for Elasticsearch server endpoint. |
| elasticsearch.secureComms | Set secure communications for requests to Elasticsearch server. When setting this value to `https`, adding Elasticsearch Trusted CA certificate to Alfresco Repository Truststore is required and communications with Elasticsearch server are managed with HTTPS protocol. When setting this value to `none`, communications to Elasticsearch server are managed with HTTP protocol. |
| elasticsearch.ssl.host.name.verification | When using HTTPS protocol, this property controls that the Elasticsearch server TLS certificate includes a CN with the real DNS hostname (`true`) or ignores this verification (`false`). The default value is `false`. |
| elasticsearch.max.total.connections | Maximum number of HTTP(s) connections allowed for the Elasticsearch server. The default value is `30`. |
| elasticsearch.max.host.connections | Maximum number of HTTP(s) connections allowed for an Elasticsearch endpoint. The default value is `30`. |
| elasticsearch.http.socket.timeout | Maximum timeout in milliseconds to wait for a socket response. The default value is `30000`. |
| elasticsearch.http.connection.timeout | Maximum timeout in milliseconds to wait for a socket connection. The default value is `1000`. |
| elasticsearch.indexName | Name of the index to be used in Elasticsearch server. The default value is `alfresco`. |
| elasticsearch.createIndexIfNotExists | Index is created in Elasticsearch server when this value is set to `true`. The default value is `false`. |
| elasticsearch.retryPeriodSeconds | Number of seconds to wait before retrying Elasticsearch index initialization. The default value is `10`. |
| elasticsearch.lockRetryPeriodSeconds | Number of seconds to wait before retrying Elasticsearch index initialization in lock mode. The default value is `10`. | |elasticsearch.query.includeGroupsForRoleAdmin | Include groups for Role Admin in permission filters when this value is set to `true`. The default value is `false`. |
| system.fixedACLs.maxTransactionTime | The number of milliseconds before permission updates start happening asynchronously. Permission updates for large folders will pause after this duration and updates will be resumed by a job scheduled for midnight. The default value is `10000`. |
| repo.event2.filter.users | Events by these users will be not be received by the Elasticsearch Connector. The default used to be "system,null" but has been changed to be an empty list. Left empty by default. |
| elasticsearch.index.mapping.total_fields.limit | Mapping limit settings: The maximum number of fields in Alfresco index. When working on deployments including a large collection of custom content models, this value may be increased (since it's not recommended). The default value is `7500`. |

Some of the properties above can be edited in the Search Admin Console, but values will be applied only to the Alfresco Repository instance, to update values for the Alfresco Elasticsearch Connector please update its property file manually. It is important that Elasticsearch Connector and repository configuration matches, otherwise search functionality will be impaired.

Additionally, these properties can be set as environment variables in Alfresco Repository Docker Image when using Docker Compose. In the following sample, `elasticsearch.host` and `elasticsearch.createIndexIfNotExists` are overriding default values.

```docker
alfresco:
    image: quay.io/alfresco/alfresco-content-repository:7.1.0
    environment:
        JAVA_OPTS: "
        -Dindex.subsystem.name=elasticsearch
        -Delasticsearch.host=elasticsearch
        -Delasticsearch.createIndexIfNotExists=true
        "
```

## Exact Term Search

Pre-Indexing considerations the Exact term search feature is disabled by default to save index space. It's possible to enable it for specific properties and property types in the configuration file: exactTermSearch.properties

|Property|Description|
|--------|-----------|
| alfresco.cross.locale.datatype.0 | A new cross locale field (to cover exact term search) is added for any property of this data-type. For example `{http://www.alfresco.org/model/dictionary/1.0}text`. By default the Exact Term Search is disabled |
| alfresco.cross.locale.property.0 | A new cross locale field (to cover exact term search) is added for the property. For example `{http://www.alfresco.org/model/content/1.0}content` By default the Exact Term Search is disabled |

You can add as many data-types and properties as you like by adding lines and incrementing the associated index:

alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}content

**Note:** Once you have done that you need to re-index, so if you need such a feature from the beginning, it is recommended to enable it before your very first indexing.

### Alfresco Elasticsearch Connector

Indexing feature is provided by a Spring Boot application named `Alfresco Elasticsearch Connector`. This application includes two main components that build and maintain the index in Elasticsearch:

* *Re-Indexing*: Indexing the information of a pre-populated Alfresco Repository or catching up with Alfresco Repositories that has missed some ActiveMQ messages is provided by the Re-Indexing component.

* *Live Indexing*: Metadata, Content and Permissions from Alfresco Repository are consumed using ActiveMQ messages so they can be indexed in Elasticsearch server.

### Alfresco Re-Indexing app

Alfresco Re-Indexing app requires a working Alfresco Repository Database and Elasticsearch server.

The tool may be used as a standalone jar. The table below lists the main configuration properties that can be specified through the Spring configuration capabilities.

| Property | Description |
| -------- | -------------- |  
| server.port | Default HTTP port, each module defines itself. The default value is `8190`. |
| alfresco.reindex.jobName | The data fetching strategy to be use: reindexByIds, reindexByDate. The default value is `reindexByIds`. |
| alfresco.reindex.batchSize | The size of batch of documents inserted into Elastic. The default value is `100`. |
| alfresco.reindex.pagesize | Page size of nodes fetched from the Alfresco's dabatase. The default value is `100`. |
| alfresco.reindex.concurrentProcessors | Number of parallel processors. The default value is `10`. |
| alfresco.reindex.fromId | Start ID for fetching nodes (_reindexByIds_). The default value is `0`. |
| alfresco.reindex.toId | Start ID for fetching nodes (_reindexByIds_) is configured. The default value is `10000`. |
| alfresco.reindex.fromTime | Start time for fetching nodes (_reindexByDate_), pattern: yyyyMMddHHmm. The default value is `190001010000`. |
| alfresco.reindex.toTime | End time for fetching nodes (_reindexByDate_), pattern: yyyyMMddHHmm. The default value is `203012312359`. |
| spring.datasource.url | JDBC url of Alfresco database. The default value is `jdbc:postgresql://localhost:5432/alfresco`. |
| spring.datasource.username | Username for Alfresco database. The default value is `alfresco`. |
| spring.datasource.password | Password for Alfresco database. The default value is `alfresco`. |
| spring.elasticsearch.rest.uris | Rest(s) url of Elasticsearch. The default value is `http://elasticsearch:9200` |
| spring.elasticsearch.rest.username | Username for Elasticsearch when using Basic Auth |
| spring.elasticsearch.rest.password | Password for username in Elasticsearch when using Basic Auth |
| alfresco.reindex.prefixes-file | File with namespaces-prefixes mapping | The default value is `classpath:reindex.prefixes-file.json`. |
| alfresco.reindex.partitioning.type | Remote node type, can be _master_ or _worker_. If not specified, the app runs as single node instance. Left empty by default. |
| alfresco.reindex.partitioning.grid-size | Number of partitions, usually equals to number of available workers. The default value is `3`. |
| alfresco.reindex.partitioning.requests-queue| request queue for remote partitioning. The default value is `org.alfresco.search.reindex.requests`. |
| alfresco.reindex.partitioning.replies-queue | reply queue for remote partitioning. The default value is `org.alfresco.search.reindex.replies`. |

There are two strategies in order to fill gaps in the Elasticsearch server provoked by ActiveMQ unavailability or any other external cause:

* Fetch by IDS (`alfresco.reindex.jobName=reindexByIds`): index nodes in an interval of database `ALF_NODE.id` column
* Fetch by DATE (`alfresco.reindex.jobName=reindexByDate`): index nodes in an interval of database `ALF_TRANSACTION.commit_time_ms` column

Sample invocation for Fetch by IDS.

```java
java -jar target/alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.jobName=reindexByIds \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.fromId=1 \
  --alfresco.reindex.toId=10000 \
  --alfresco.reindex.concurrentProcessors=2
```

Sample invocation for Fetch by DATE.

```java
 java -jar target/alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.jobName=reindexByDate \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.concurrentProcessors=6 \
  --alfresco.reindex.fromTime=202001010000 \
  --alfresco.reindex.toTime=202104180000
```

> **Note:** Additional use cases for this application will be covered in the [Indexing](Indexing) section.

## Alfresco Live Indexing app

Alfresco Live Indexing app requires a working Alfresco ActiveMQ service, Alfresco Shared FileStore service and Elasticsearch server.

The table below lists the main configuration properties that can be specified through the Spring configuration capabilities[1].

|Property|Description|
|--------|-----------|
| server.port |Default HTTP port, each module defines itself. The default value is `8190`.|
| spring.activemq.broker-url | ActiveMQ broker url. The default value is `tcp://localhost:61616`. |
| spring.activemq.username | ActiveMQ username. The default value is `admin`. |
| spring.activemq.password | ActiveMQ password. The default value is `admin`. |
| spring.jms.cache.enabled | Cache JMS sessions. The default value is `false`. |
| spring.elasticsearch.rest.uris | Comma-separated list of Elasticsearch endpoints. The default value is `http://localhost:9200`. |
|elasticsearch.indexName|Name of the index to be used in Elasticsearch server. The default value is `alfresco`.|
| alfresco.content.refresh.event.queue | The channel where transform requests are re-inserted by the content event aggregator as consequence of a failure. The default value is `org.alfresco.search.contentrefresh.event`. |
| alfresco.content.event.retry.maxAllowed | Maximum number of retries in case of transient failure processing. The default value is `3`. |
| alfresco.content.event.retry.delay | Delay in milliseconds between subsequent retries. The default value is `1000`. |
| acs.repo.transform.request.endpoint | Alfresco Repository channel. The default value is `activemq:queue:acs-repo-transform-request?jmsMessageType=Text` |
| alfresco.sharedFileStore.baseUrl | Alfresco Shared FileStore endpoint. The default value is `http://127.1.0.1:8099/alfresco/api/-default-/private/sfs/versions/1/file/` |
| alfresco.sharedFileStore.timeout | Alfresco Shared FileStore maximum read timeout in milliseconds. The default value is `2000`. |
| alfresco.sharedFileStore.maxBufferSize | Alfresco Shared FileStore maximum buffer size (-1 for unlimited buffer). The default value is `-1`. |
| alfresco.event.topic | Topic name for Alfresco Repository events. The default value is `activemq:topic:alfresco.repo.event2`. |
| alfresco.metadata.event.channel | Alfresco Metadata channel. The default value is `activemq:queue:org.alfresco.search.metadata.event`. |
| alfresco.content.event.channel | Alfresco Content channel. The default value is `activemq:queue:org.alfresco.search.content.event`. |
| alfresco.metadata.event.queue | Alfresco Metadata queue name. The default value is `org.alfresco.search.metadata.event`. |
| alfresco.metadata.retry.event.queue | Alfresco Error event queue name. The default value is `org.alfresco.search.metadata.retry.event`. |
| metadata.events.batch.size | Maximum number of events per batch. The default value is `10`. |
| metadata.events.batch.timeout | Maximum timeout in milliseconds for batch creation. The default value is `1000`. |
| alfresco.retransmission.max.attemps | Maximum number of retries in case of transient failure processing. The default value is `3`. |
| alfresco.event.retry.delay | Delay time for error event in milliseconds. The default value is `1000`. |
| alfresco.mediation.filter-file | The configuration file which contains fields and node types blacklists (see below). The default value is `classpath:mediation-filter.yml` |
| alfresco.acceptedContentMediaTypesCache.refreshTime | Time until we refresh the cache. We can disable the scheduler by replacing the value of the cron expression with a dash "-". In case we want to refresh the cache contents before the next scheduled refresh we should restart the application. The default value is `0 0 * * * *`. |
| alfresco.acceptedContentMediaTypesCache.enabled | Property to set if we want to enable or disable the cache for contacting the Transform Core AIO. The default value is `true`. |

Within the Elasticsearch-connector there's a subset of components that are in charge to index data: specifically a component called "Mediation" subscribes to the channel indicated by the `alfresco.event.topic` attribute (see the table above) and processes the incoming node events.
The configuration of that component allows to declare three blacklist sets for filtering out nodes/attributes to be indexed.
Those blacklists can be specified in the file indicated by the `alfresco.mediation.filter-file` attribute (see the table above) which defaults to a file called mediation-filter.yml that must be in the module classpath. Here's a sample content of that file:

```bash
mediation:
  nodeTypes:
     - nodeType1
     - nodeType2
     - ...
     . nodeTypeN
  contentNodeTypes:
     - nodeType1
     - nodeType2
     - ...
     . nodeTypeN
  fields:
     - field1
     - field2
     - ...
     . fieldN
```  

where:

* **nodeTypes**: if the node wrapped in the incoming event has a type which is included in this set, the node processing will be skipped
* **contentNodeTypes**: if the node wrapped in the incoming event has a content change associated with it and it has a type which is included in this set, then the corresponding content processing won't be executed. In other words, nodes belonging to one of the node types in this set, won't have any content indexed in Elasticsearch
* **fields**: fields listed in this set are removed from the incoming nodes metadata. In other words, fields in this set won't be sent to Elasticsearch for indexing, and therefore they won't be searchable.

In order to override some of these values, command line system properties can be specified. According to standard Spring Boot approach, the name of the property must be converted to uppercase and dots must be changed by underscore characters. The following sample override default values for three different properties.

```java
$ java -DSPRING_ELASTICSEARCH_REST_URIS=http://localhost:9200
 -DSPRING_ACTIVEMQ_BROKERURL=nio://activemq:61616
 -DALFRESCO_SHAREDFILESTORE_BASEURL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/
 -jar alfresco-elasticsearch-live-indexing-1.0.0-app.jar
```

The same convention can be used when deploying Alfresco Elasticsearch Connector using Docker Compose templates.

```docker
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

For instance, content indexing for `cm:content` documents can be disabled using following Docker configuration:

```docker
    live-indexing-mediation:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-mediation:${LIVE_INDEXING_MEDIATION_TAG}
        depends_on:
            - elasticsearch
            - alfresco
        environment:
            SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
            SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
            ALFRESCO_MEDIATION_FILTER-FILE: file:/usr/tmp/mediation-filter.yml
        volumes:
            - ./mediation-filter.yml:/usr/tmp/mediation-filter.yml
```

The file `mediation-filter.yml` includes default content and also the `cm:content` filter.

```bash
$ cat mediation-filter.yml
mediation:
  nodeTypes:
  contentNodeTypes:
    - cm:content
  fields:
    - cmis:changeToken
```

[Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)

### Scaling up

Every Alfresco Elasticsearch Connector service can be scaled up to use an ActiveMQ Connection Pool and to increase the number of Consumers.

In order to use the ActiveMQ **pool**, add following properties to your `.env` file in Docker Compose. Pool size is set to 100 in the sample.

```bash
$ cat .env
ACTIVEMQ_POOL_ENABLED=true
ACTIVEMQ_POOL_SIZE=100
```

Spring related properties can be associated to the Elasticsearch Connector when declaring the service in `docker-compose.yml` file.

```docker
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
            SPRING_ACTIVEMQ_POOL_ENABLED: ${ACTIVEMQ_POOL_ENABLED}
            SPRING_ACTIVEMQ_POOL_MAXCONNECTIONS: ${ACTIVEMQ_POOL_SIZE}
```

Increasing the **consumer** number requires to check the property name in the `application.properties` file for the service and to override it in `docker-compose.yml` file. The following sample is increasing the consumer number to 20 for `elasticsearch-live-indexing-metadata`.

```docker
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            INPUT_ALFRESCO_METADATA_BATCH_EVENT_CHANNEL: sjms-batch:metadata.event?completionTimeout=1000&completionSize=10&aggregationStrategy=#eventAggregator&?consumerCount=20
```

### Using HTTP Basic Auth to access Elasticsearch

When using Elasticsearch server with HTTP Basic Auth protocol, additional configuration should be added to **Alfresco Repository**.

Elasticsearch credentials are required to be added to `alfresco-global.properties` configuration file. We're using default Elasticsearch user `elastic` with `bob123` password.

```bash
elasticsearch.user=elastic
elasticsearch.password=bob123
```

Additionally, for every "live-indexing" service from **Alfresco Elasticsearch Connector** the same credentials need to be configured. Use Java the following global properties:

```bash
SPRING_ELASTICSEARCH_REST_USERNAME=elastic
SPRING_ELASTICSEARCH_REST_PASSWORD=bob123
```

This environment variables can be passed as command line arguments when running the Spring Boot application locally or they can be added to `environment` service section when using Docker Compose.

Above sample is connecting to an **Elasticsearch server** configured according the following values:

```docker
elasticsearch:
  image: elasticsearch:7.10.1
  environment:
    - discovery.type=single-node
    - xpack.security.enabled=true
    - ELASTIC_PASSWORD=bob123
```

Remember to add also these credentials to Kibana app.

```docker
kibana:
   image: kibana:7.10.1
   environment:
     - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
     - ELASTICSEARCH_USERNAME=elastic
     - ELASTICSEARCH_PASSWORD=bob123
```

### Using HTTPS to access Elasticsearch for end to end encryption

When using Elasticsearch server with HTTPs protocol, additional configuration should be added to **Alfresco Repository**.

A _truststore_ file, including public certificate and certificate chain from Elasticsearch HTTPs endpoint, is required to be added to `alfresco-global.properties` configuration file.

Add following properties in order to use that _truststore_ file from Alfresco Repository. Password has been skipped intentionally as this keystore includes only public information.

```docker
encryption.ssl.truststore.location=/usr/local/tomcat/alf_data/keystore/truststore.jceks
encryption.ssl.truststore.passwordFileLocation=
encryption.ssl.truststore.type=JCEKS
```

If you are using Docker Compose, just add the same properties in the `JAVA_OPTS` section for alfresco service using the "-D" prefix.

Additionally, for every "live-indexing" service from **Alfresco Elasticsearch Connector** the same _truststore_ need to be configured. Use Java the following global properties:

```docker
JAVAX_NET_SSL_TRUSTSTORE=/usr/local/tomcat/alf_data/keystore/truststore.jceks
JAVAX_NET_SSL_TRUSTSTOREPASSWORD=
JAVAX_NET_SSL_TRUSTSTORETYPE=JCEKS
```

This environment variables can be passed as command line arguments when running the Spring Boot application locally or they can be added to `environment` service section when using Docker Compose.
