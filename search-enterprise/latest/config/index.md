---
title: Overview
---

Use the following information to configure Search Enterprise.

The Admin console is used to manage the interaction between Alfresco and Search Enterprise from the Alfresco Repository. This gives you the ability to determine the high-level health of the Search Enterprise index.

To use Search Enterprise with the Alfresco Content Services platform the following configuration must be applied:

* For *searching* features the Alfresco Repository properties must be configured in the `alfresco-global.properties` file. This can also be done as an environment variable by configuring the Search Subystem.
* The Elasticsearch connector environment variables related to communication with the Alfresco Repository (Database, ActiveMQ and Transform Service) must be set and the Elasticsearch server for *indexing* features.

> **Note:** To ensure backward compatibility, the exact same property values are used for configuring connection to the Opensearch Search subsystem (*'elasticsearch'* prefixes and aliases shall not change).

## Alfresco Repository

Alfresco Repository provides configuration properties for the Elasticsearch Search subystem that defines the connection to the external Elasticsearch server, for more see [Subsystem]({% link search-enterprise/latest/install/index.md %}#configure-subsystem-in-repository).

Additional property values can be included in the global configuration file `alfresco-global.properties`

|Property|Description|
|--------|-----------|
| elasticsearch.host | Name of the Elasticsearch server. The default value is `localhost`. |
| elasticsearch.port | Port of the Elasticsearch server. The default value is `9200`. |
| elasticsearch.baseUrl | Context path for the Elasticsearch server endpoint. |
| elasticsearch.secureComms | Set secure communications for requests to the Elasticsearch server. When you set this value to `https`, adding the Elasticsearch Trusted CA certificate to Alfresco Repository Truststore is required. Once this done communication with the Elasticsearch server is managed with the HTTPS protocol. When you set this value to `none`, communication to the Elasticsearch server is managed with the HTTP protocol. |
| elasticsearch.ssl.host.name.verification | When using the HTTPS protocol, this property controls the Elasticsearch server TLS certificate and includes a CN with the real DNS hostname. To use the property set the value to be `true`, to ignore the property set the value to `false`. The default value is `false`. |
| elasticsearch.user | Username for Elasticsearch server. It is left empty by default. |
| elasticsearch.password | Password for Elasticsearch server. It is left empty by default. |
| elasticsearch.max.total.connections | Maximum number of HTTP(s) connections allowed for the Elasticsearch server. The default value is `30`. |
| elasticsearch.max.host.connections | Maximum number of HTTP(s) connections allowed for an Elasticsearch endpoint. The default value is `30`. |
| elasticsearch.http.socket.timeout | Maximum timeout in milliseconds to wait for a socket response. The default value is `30000`. |
| elasticsearch.http.connection.timeout | Maximum timeout in milliseconds to wait for a socket connection. The default value is `1000`. |
| elasticsearch.indexName | Name of the index to be used in the Elasticsearch server. The default value is `alfresco`. |
| elasticsearch.createIndexIfNotExists | An Index is created in the Elasticsearch server when this value is set to `true`. The default value is `false`. |
| elasticsearch.retryPeriodSeconds | Number of seconds to wait before retrying the Elasticsearch index initialization. The default value is `10`. |
| elasticsearch.retryAttempts | Number of attempts to try Elasticsearch index initialization. The default value is `3`. |
| elasticsearch.lockRetryPeriodSeconds | Number of seconds to wait before retrying the Elasticsearch index initialization in lock mode. The default value is `10`. |
| elasticsearch.query.includeGroupsForRoleAdmin | Include groups for Role Admin in permission filters when this value is set to `true`. The default value is `false`. |
| elasticsearch.index.mapping.total_fields.limit | Mapping limit settings: The maximum number of fields in Alfresco index. When working on deployments including a large collection of custom content models, this value may be increased, but it is not recommended. The default value is `7500`. |
| elasticsearch.index.max_result_window | Maximum number of results that can be returned by a single query. The default value is `10000`. |

Some of the properties above can be edited in the Search Admin Console, but values will be applied only to the Alfresco Repository instance. To update values for the Elasticsearch connector update its property file manually. **Note:** It is important that the Elasticsearch connector and repository configuration match, otherwise the search functionality will be impaired.

Additionally, these properties can be set as environment variables in Alfresco Repository Docker Image when using Docker Compose. In the following sample, `elasticsearch.host` and `elasticsearch.createIndexIfNotExists` override the default values.

```docker
alfresco:
    image: quay.io/alfresco/alfresco-content-repository:7.4.0
    environment:
        JAVA_OPTS: "
        -Dindex.subsystem.name=elasticsearch
        -Delasticsearch.host=elasticsearch
        -Delasticsearch.createIndexIfNotExists=true
        "
```

## Alfresco Elasticsearch connector

The indexing feature is provided by a Spring Boot application called Elasticsearch connector. This application includes two main components that build and maintain the index in Elasticsearch:

* *Re-Indexing*: Indexing the information of a pre-populated Alfresco Repository or catching up with Alfresco Repositories that has missed some ActiveMQ messages is provided by the re-indexing component.

* *Live Indexing*: Metadata, and Content and Permissions from the Alfresco Repository are consumed using ActiveMQ messages so they can be indexed in the Elasticsearch server.

### Alfresco Re-indexing app

Alfresco re-indexing app requires a working Alfresco Repository Database and the Elasticsearch server.

The tool may be used as a standalone jar file. The table below lists the main configuration properties that can be specified through the Spring Boot configuration.

| Property | Description |
| -------- | ------------|  
| server.port | Default HTTP port, each module defines itself. The default value is `8190`. |
| alfresco.reindex.jobName | The data fetching strategy to use: `reindexByIds`, or `reindexByDate`. The default value is `reindexByIds`. |
| alfresco.reindex.batchSize | The batch size of documents inserted into Elasticesearch by the re-indexing app.  The default value is `100`. |
| alfresco.reindex.pagesize | The page size of nodes fetched from the Alfresco dabatase. The default value is `100`. |
| alfresco.reindex.concurrentProcessors | Number of parallel processors. The default value is `10`. |
| alfresco.reindex.fromId | Start ID for fetching nodes (_reindexByIds_). The default value is `0`. |
| alfresco.reindex.toId | Start ID for fetching nodes (_reindexByIds_) is configured. The default value is `10000`. |
| alfresco.reindex.fromTime | Start time for fetching nodes (_reindexByDate_), pattern: yyyyMMddHHmm. The default value is `190001010000`. |
| alfresco.reindex.toTime | End time for fetching nodes (_reindexByDate_), pattern: yyyyMMddHHmm. The default value is `203012312359`. |
| spring.datasource.url | JDBC url of the Alfresco database. The default value is `jdbc:postgresql://localhost:5432/alfresco`. |
| spring.datasource.username | Username for the Alfresco database. The default value is `alfresco`. |
| spring.datasource.password | Password for the Alfresco database. The default value is `alfresco`. |
| spring.elasticsearch.rest.uris | Rest(s) url of Elasticsearch. The default value is `http://elasticsearch:9200`. |
| spring.elasticsearch.rest.username | Username for Elasticsearch when using Basic Authentication. |
| spring.elasticsearch.rest.password | Password for username in Elasticsearch when using Basic Authentication. |
| spring.activemq.broker-url | ActiveMQ Broker url, use async sending to improve performance. The default value is `tcp://localhost:61616?jms.useAsyncSend=true`. |
| spring.activemq.user | ActiveMQ Broker user. The default is `admin`. |
| spring.activemq.password | ActiveMQ Broker password. The default is `admin`. |
| alfresco.reindex.multithreadedStepEnabled | Enable steps to be executed in parallel threads. Retrying settings are only applied when this property is set to `true`. The default value is `false`. |
| alfresco.reindex.retryingEnabled | Retry the execution of a step in case of fail. The default value is `true`. |
| alfresco.reindex.retryingMaxCount | Number of times to retry the step before throwing an error. The default value is `3`. |
| alfresco.reindex.retryingInitialDelay | Waiting time before retrying the step in milliseconds. The default value is `1000`. |
| alfresco.reindex.retryingDelayIntervalMultiplier | Every try should wait N times the initial delay, where N is the number specified in this property. The default value is `2`. |
| alfresco.reindex.retryingMaxDelay | Maximum delay to be waited before executing a retry on a step. The default value is `30000`. |
| alfresco.reindex.prefixes-file | File with namespaces-prefixes mapping. The default value is `classpath:reindex.prefixes-file.json`. |
| alfresco.reindex.partitioning.type | Remote node type, can be master or worker. If not specified, the app runs as a single node instance. By default it is left empty. |
| alfresco.reindex.partitioning.grid-size | Number of partitions, usually equals the number of available workers. The default value is `3`. |
| alfresco.reindex.partitioning.requests-queue| Request queue for remote partitioning. `org.alfresco.search.reindex`.requests. |
| alfresco.reindex.partitioning.replies-queue | Reply queue for remote partitioning. `org.alfresco.search.reindex.replies` |
| alfresco.db.minimum.schema.version | Minimum Alfresco Repository database version supported: 14002. |
| alfresco.accepted-content-media-types-cache.base-url | URL to get the list of Content Media Types supported. The default URL is `http://localhost:8090/transform/config`. |
| alfresco.accepted-content-media-types-cache.enabled | Cache the list of Content Media Types supported in memory. The default value is `true`. |
| alfresco.reindex.metadataIndexingEnabled | Re-index document metadata. The default value is `true`. |
| alfresco.reindex.contentIndexingEnabled | Re-index document content. The default value is `true`. |
| alfresco.reindex.pathIndexingEnabled | Re-index document Path property. The default value is `false`. |

There are two strategies to fill the gaps in the Elasticsearch server when provoked by ActiveMQ unavailability or any other external cause:

* Fetch by IDS `alfresco.reindex.jobName=reindexByIds`: index nodes in an interval of database `ALF_NODE.id` column
* Fetch by DATE `alfresco.reindex.jobName=reindexByDate`: index nodes in an interval of database `ALF_TRANSACTION.commit_time_ms` column

Sample invocation for Fetch by IDS.

```java
java -jar target/alfresco-elasticsearch-reindexing-3.3.0-app.jar \
  --alfresco.reindex.jobName=reindexByIds \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.fromId=1 \
  --alfresco.reindex.toId=10000 \
  --alfresco.reindex.concurrentProcessors=2
```

Sample invocation for Fetch by DATE.

```java
 java -jar target/alfresco-elasticsearch-reindexing-3.3.0-app.jar \
  --alfresco.reindex.jobName=reindexByDate \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.concurrentProcessors=6 \
  --alfresco.reindex.fromTime=202001010000 \
  --alfresco.reindex.toTime=202104180000
```

### Alfresco Live Indexing app

The Alfresco Live Indexing app requires a working Alfresco ActiveMQ service, Alfresco Shared File store service, and the Elasticsearch server.

The table below lists the main configuration properties that can be specified through the Spring boot configuration.

|Property|Description|
|--------|-----------|
| server.port |Default HTTP port, each module defines itself. The default value is `8190`.|
| spring.activemq.broker-url | ActiveMQ broker url. The default value is `tcp://localhost:61616`. |
| spring.activemq.user | ActiveMQ username. The default value is `admin`. |
| spring.activemq.password | ActiveMQ password. The default value is `admin`. |
| spring.jms.cache.enabled | Cache JMS sessions. The default value is `false`. |
| spring.elasticsearch.rest.uris | Comma-separated list of Elasticsearch endpoints. The default value is `http://localhost:9200`. |
|elasticsearch.indexName | Name of the index to be used in Elasticsearch server. The default value is `alfresco`.|
| alfresco.content.refresh.event.queue | The channel where transform requests are re-inserted by the content event aggregator as consequence of a failure. The default value is `org.alfresco.search.contentrefresh.event`. |
| alfresco.content.event.retry.maxAllowed | Maximum number of redelivery attempts allowed. `0` is used to disable redelivery, and `-1` will attempt redelivery forever until it succeeds. |
| alfresco.content.event.retry.backoff | Exponential backoff multiplier that can be used to multiply each consequent redelivery delay. |
| alfresco.content.event.retry.delay | Initial delay in milliseconds between redelivery attempts. Subsequent delays will be affected by the backoff multiplier. |
| alfresco.content.event.retry.maxDelay | An upper bound in milliseconds for the computed redelivery delay. This is used when you specify backoff multiplied delays and is used to avoid the delay growing too large. |
| acs.repo.transform.request.endpoint | Alfresco Repository channel. The default value is `activemq:queue:acs-repo-transform-request?jmsMessageType=Text`. |
| alfresco.sharedFileStore.baseUrl | Alfresco Shared FileStore endpoint. The default value is `http://127.1.0.1:8099/alfresco/api/-default-/private/sfs/versions/1/file/`. |
| alfresco.sharedFileStore.timeout | Alfresco Shared FileStore maximum read timeout in milliseconds. The default value is `4000`. |
| alfresco.sharedFileStore.maxBufferSize | Alfresco Shared FileStore maximum buffer size (-1 for unlimited buffer). The default value is `-1`. |
| alfresco.event.topic | Topic name for Alfresco Repository events. The default value is `activemq:topic:alfresco.repo.event2`. |
| alfresco.metadata.event.channel | Alfresco Metadata channel. The default value is `activemq:queue:org.alfresco.search.metadata.event`. |
| alfresco.content.event.channel | Alfresco Content channel. The default value is `activemq:queue:org.alfresco.search.content.event`. |
| alfresco.metadata.event.queue | Alfresco Metadata queue name. The default value is `org.alfresco.search.metadata.event`. |
| alfresco.metadata.retry.event.queue | Alfresco Error event queue name. The default value is `org.alfresco.search.metadata.retry.event`. |
| metadata.events.batch.size | Maximum number of events per batch. The default value is `10`. |
| metadata.events.batch.timeout | Maximum timeout in milliseconds for batch creation. The default value is `1000`. |
| alfresco.retransmission.max.attempts | Maximum number of retries in case of transient failure processing. The default value is `3`. |
| alfresco.event.retry.delay | Delay time for error event in milliseconds. The default value is `1000`. |
| alfresco.mediation.filter-file | The configuration file which contains fields and node types blacklists. The default value is `classpath:mediation-filter.yml`. |
| alfresco.accepted-content-media-types-cache.refresh-time  | Time until you refresh the cache. We can disable the scheduler by replacing the value of the cron expression with a dash "-". In case you want to refresh the cache contents before the next scheduled refresh we should restart the application. The default value is `0 0 * * * *`. |
| alfresco.accepted-content-media-types-cache.enabled | Property to set if you want to enable or disable the cache for contacting the Transform Core AIO. The default value is `true`. |
| alfresco.accepted-content-media-types-cache.base-url | URL to get the list of Content Media Types supported. The default URL is `http://localhost:8090/transform/config`. |
| alfresco.path.retry.delay | Delay in milliseconds to retry a Path indexing operation. The default value is `1000`. |
| alfresco.path.retry.maxAttempts | Maximum number of attempts to retry a Path indexing operation. The default value is `3`. |
| alfresco.path-indexing-component.enabled | Index Path property. The default value is `true`. |
| alfresco.content-indexing-component.enabled | Index content property. The default value is `true`. |

Within the Elasticsearch connector there is a subset of components that index data. A component called Mediation subscribes to the channel indicated by the `alfresco.event.topic` attribute, as seen in the table above, and processes the incoming node events. The configuration of that component allows you to declare three blacklist sets for filtering out nodes or attributes to be indexed. These blacklists can be specified in the file using the `alfresco.mediation.filter-file` attribute, as seen in the table above. The default file is called `mediation-filter.yml` that must be in the module classpath, see the sample content of that file:

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
  nodeAspects:
     - nodeAspect1
     - nodeAspect2
     - …
     - nodeAspectN
  fields:
     - field1
     - field2
     - ...
     . fieldN
```

Where:

* **nodeTypes**: if the node wrapped in the incoming event has a type which is included in this set, the node processing is skipped.
* **contentNodeTypes**: if the node wrapped in the incoming event has a content change associated with it and it has a type which is included in this set, then the corresponding content processing won't be executed. This means nodes belonging to one of the node types in this set, won't have any content indexed in Elasticsearch.
* **nodeAspects**: if the node wrapped in the incoming event has an aspect which is included in this set, the node processing is skipped.
* **fields**: fields listed in this set are removed from the incoming nodes metadata. This means fields in this set won't be sent to Elasticsearch for indexing, and therefore they won't be searchable.

To override some of these values command line system properties can be specified. Using the standard Spring boot approach, the name of the property must be converted to uppercase and dots must be changed by underscore characters. The following sample overrides the default values for three different properties.

```java
$ java -DSPRING_ELASTICSEARCH_REST_URIS=http://localhost:9200
 -DSPRING_ACTIVEMQ_BROKERURL=nio://activemq:61616
 -DALFRESCO_SHAREDFILESTORE_BASEURL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/
 -jar alfresco-elasticsearch-live-indexing-3.3.0-app.jar
```

The same convention can be used when deploying the Elasticsearch connector using the Docker compose template.

```docker
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

For example, content indexing for `cm:content` documents can be disabled using the following Docker configuration:

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
  nodeAspects:
    - sys:hidden
  fields:
    - cmis:changeToken
```

See [Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config){:target="_blank"} for more.

## Scaling up

All Elasticsearch connector services can be scaled up to use an ActiveMQ Connection Pool to increase the number of Consumers.

To use the ActiveMQ Connection Pool, add the following properties to your `.env` file in Docker compose. The Pool size is set to `100` in the sample.

```bash
$ cat .env
ACTIVEMQ_POOL_ENABLED=true
ACTIVEMQ_POOL_SIZE=100
```

Spring related properties can be associated to the Elasticsearch connector when declaring the service in the `docker-compose.yml` file.

```docker
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
            SPRING_ACTIVEMQ_POOL_ENABLED: ${ACTIVEMQ_POOL_ENABLED}
            SPRING_ACTIVEMQ_POOL_MAXCONNECTIONS: ${ACTIVEMQ_POOL_SIZE}
```

To increase the consumer number you must check the property name in the `application.properties` file for the service and to then override it in the `docker-compose.yml` file. The following sample increases the consumer number to `20` for `elasticsearch-live-indexing-metadata`.

```docker
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            INPUT_ALFRESCO_METADATA_BATCH_EVENT_CHANNEL: sjms-batch:metadata.event?completionTimeout=1000&completionSize=10&aggregationStrategy=#eventAggregator&?consumerCount=20
```

## Using HTTP Basic Authentication to access Elasticsearch

When using the Elasticsearch server with the HTTP Basic Authentication protocol you must add your Elasticsearch credentials to the `alfresco-global.properties` configuration file.

```bash
elasticsearch.user=elastic
elasticsearch.password=bob123
```

Additionally, for every "live-indexing" service from the Elasticsearch connector the same credentials must be configured. Use Java and the following global properties:

```bash
SPRING_ELASTICSEARCH_REST_USERNAME=elastic
SPRING_ELASTICSEARCH_REST_PASSWORD=bob123
```

The environment variables can be passed as a command line argument when running the Spring boot application locally or they can be added to the `environment` service section when using Docker Compose. The example above connects to an Elasticsearch server configured with the following values:

```docker
elasticsearch:
  image: elasticsearch:7.10.2
  environment:
    - discovery.type=single-node
    - xpack.security.enabled=true
    - ELASTIC_PASSWORD=bob123
```

You must also add these credentials to the Kibana app.

```docker
kibana:
   image: kibana:7.10.1
   environment:
     - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
     - ELASTICSEARCH_USERNAME=elastic
     - ELASTICSEARCH_PASSWORD=bob123
```

## Using HTTPS to access Elasticsearch for end to end encryption

When using the Elasticsearch server with the HTTPs protocol, additional configuration should be added to the Alfresco Repository.

A _truststore_ file, including public certificate and certificate chain from Elasticsearch HTTPs endpoint, must be added to the `alfresco-global.properties` configuration file.

Add the following properties to use the _truststore_ file from the Alfresco Repository. The `encryption.ssl.truststore.passwordFileLocation=` property has been intentionally left blank as the keystore includes only public information.

```docker
encryption.ssl.truststore.location=/usr/local/tomcat/alf_data/keystore/truststore.jceks
encryption.ssl.truststore.passwordFileLocation=
encryption.ssl.truststore.type=JCEKS
```

If you are using Docker compose, add the same properties in the `JAVA_OPTS` section for the Alfresco service using the "-D" prefix.

Additionally, for every "live-indexing" service from the Elasticsearch connector the same _truststore_ must be configured. Use Java and the following global properties:

```java
JAVAX_NET_SSL_TRUSTSTORE=/usr/local/tomcat/alf_data/keystore/truststore.jceks
JAVAX_NET_SSL_TRUSTSTOREPASSWORD=
JAVAX_NET_SSL_TRUSTSTORETYPE=JCEKS
```

These environment variables can be passed as command line arguments when running the spring boot application locally or they can be added to the `environment` service section when using Docker compose.

## Exact Term Search

The Exact Term search feature, that allows searching using the equals operator `=`, is disabled by default to save index space. It's possible to enable it for specific properties and property types using the following configuration file `/alfresco/search/elasticsearch/config/exactTermSearch.properties` located in the Alfresco Repository.

**Note:** Once you have the Exact term search configured a re-index is required. If you need the feature from the beginning, it is recommended to enable it before your first index is created.

|Property|Description|
|--------|-----------|
| alfresco.cross.locale.datatype.0 | A new cross locale field has been added for any property of this data-type. For example `{http://www.alfresco.org/model/dictionary/1.0}text`. |
| alfresco.cross.locale.property.0 | A new cross locale field to cover exact term search) has been added for the property. For example `{http://www.alfresco.org/model/content/1.0}content`. |

You can add as many data-types and properties as you like by adding lines and incrementing the associated index:

```bash
alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}content
```

In order to overwrite this configuration when using Docker, mount this file as an external volume. Following sample describes a local configuration to be applied to Elasticsearch Search Subsystem when using Docker Compose deployment:

```docker
services:
  alfresco:
    volumes:
      - ./exactTermSearch.properties:/usr/local/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/search/elasticsearch/config/exactTermSearch.properties
```

## Support for different databases

PostgreSQL is the default database for Search Enterprise. You can use different databases with Search Enterprise, but they must be configured within your system and must match the database used by Content Services. The other types of databases supported by Search Enterprise are: MySQL, MariaDB, Microsoft SQL Server, and Oracle.

Edit the `alfresco-global.properties` file using the following properties to change the Search Enterprise database.

| Property | Description |
| -------- | ------------|  
| spring.datasource.url | *Required*. The database name. |
| spring.datasource.username | *Required*. Enter the username for the database. |
| spring.datasource.password | *Required*. Enter the password for the username. |
| spring.datasource.hikari.maximumpoolsize | *Optional*. Sets the maximum size of the connections in HikariCP. |
| alfresco.dbtype | *Optional*. Use this property to set your database type. When you set the type of database you are using the database auto-detection type is turned off. The supported values are: `postgresql`, `mysql`, `mariadb`, `sqlserver`, and `oracle`. |

### Provide custom JDBC Drivers

Search Enterprise only provides the PostgreSQL driver by default and it is bundled with the Search Enterprise executable components. If you want to use a different database to PostgreSQL you must provide the correct JDBC configuration and corresponding driver.
The drivers are loaded from a directory called `db-drivers` that must be present at the same directory level as the executable `.jar` file.

For example:

```text
├── `alfresco-elasticsearch-reindexing-x.x.x-app.jar`
└── `db-drivers`
    └── `mydb-driver.jar`
```

If you are using Docker Compose to install Search Enterprise you must add the JDBC driver information inside the docker container.

For example:

```yaml
services:
    reindexing-service:
        image: quay.io/alfresco/alfresco-elasticsearch-reindexing:latest
        mem_limit: 1024m
        environment:
        - ...
        volumes:
            - ./<location>/jdbc/drivers:/opt/db-drivers:ro
```
