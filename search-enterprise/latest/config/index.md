---
title: Overview
---

## Configuration

In order to use Alfresco Search Enterprise v3.0 for Alfresco Content Services platform, following configuration should be performed:

* Alfresco Repository properties in configuration file `alfresco-global.properties` or as environment variables related to Search Subystem configuration for *searching* features
* Alfresco Elasticsearch Connector properties as environment variables related to communication with Alfresco Repository (ActiveMQ and Transform Service) and Elasticsearch server for *indexing* features

### Alfresco Repository

Alfresco Repository provides configuration properties for `elasticsearch` Search Subystem to define the connection to an external Elasticsearch server.

Setting the subsystem search property to `elasticsearch` is required.

```
index.subsystem.name=elasticsearch
```

Additional property values can be included in Alfresco Repository global configuration file `alfresco-global.properties`

|Property|Description|Default value|
|--------|-----------|------------:|
| elasticsearch.host | Name of the Elasticsearch server | localhost |
| elasticsearch.port | Port of the Elasticsearch server | 9200 |
| elasticsearch.baseUrl | Context path for Elasticsearch server endpoint | / |
| elasticsearch.secureComms | Set secure communications for requests to Elasticsearch server. When setting this value to `https`, adding Elasticsearch Trusted CA certificate to Alfresco Repository Truststore is required and communications with Elasticsearch server are managed with HTTPS protocol. When setting this value to `none`, communications to Elasticsearch server are managed with HTTP protocol. | none |
| elasticsearch.ssl.host.name.verification | When using HTTPS protocol, this property controls that the Elasticsearch server TLS certificate includes a CN with the real DNS hostname (`true`) or ignores this verification (`false`) | false |
| elasticsearch.user | User name for HTTP Basic Authentication to connect to Elasticsearch server | |
| elasticsearch.password | Password for HTTP Basic Authentication to connecto to Elasticsearch server | |
| elasticsearch.max.total.connections | Maximum number of HTTP(s) connections allowed for the Elasticsearch server | 30 |
| elasticsearch.max.host.connections | Maximum number of HTTP(s) connections allowed for an Elasticsearch endpoint | 30 |
| elasticsearch.http.socket.timeout | Maximum timeout in milliseconds to wait for a socket response | 30000 |
| elasticsearch.http.connection.timeout | Maximum timeout in milliseconds to wait for a socket connection | 1000 |
| elasticsearch.indexName | Name of the index to be used in Elasticsearch server | alfresco |
| elasticsearch.createIndexIfNotExists | Index is created in Elasticsearch server when this value is set to `true` | false |
| elasticsearch.retryPeriodSeconds | Number of seconds to wait before retrying Elasticsearch index initialization | 10 |
| elasticsearch.lockRetryPeriodSeconds | Number of seconds to wait before retrying Elasticsearch index initialization in lock mode | 10 | elasticsearch.query.includeGroupsForRoleAdmin | Include groups for Role Admin in permission filters when this value is set to `true` | false |

Some of the properties above can be edited in the Search Admin Console, but values will be applied only to the Alfresco Repository instance, to update values for the Alfresco Elasticsearch Connector please update its property file manually. It is important that Elasticsearch Connector and repository configuration matches, otherwise search functionality will be impaired.

Additionally, these properties can be set as environment variables in Alfresco Repository Docker Image when using Docker Compose. In the following sample, `elasticsearch.host` and `elasticsearch.createIndexIfNotExists` are overriding default values.

```
alfresco:
    image: quay.io/alfresco/alfresco-content-repository:7.0.0
    environment:
        JAVA_OPTS: "
        -Dindex.subsystem.name=elasticsearch
        -Delasticsearch.host=elasticsearch
        -Delasticsearch.createIndexIfNotExists=true
        "
```

### Alfresco Elasticsearch Connector

Alfresco Elasticsearch Connector requires a working Alfresco ActiveMQ service, Alfresco Shared FileStore service and Elasticsearch server.

The table below lists the main configuration properties that can be specified through the Spring configuration capabilities[1]. 

|Property|Description|Default value|
|--------|-----------|------------:|
| server.port |Default HTTP port, each module defines itself.|8190|
| spring.activemq.broker-url | ActiveMQ broker url | tcp://localhost:61616 |
| spring.activemq.username | ActiveMQ username | admin |
| spring.activemq.password | ActiveMQ password | admin |
| spring.jms.cache.enabled | Cache JMS sessions | false |
| spring.elasticsearch.rest.uris | Comma-separated list of Elasticsearch endpoints | http://localhost:9200 |
|elasticsearch.indexName|Name of the index to be used in Elasticsearch server	|alfresco|
| alfresco.content.refresh.event.queue | The channel where transform requests are re-inserted by the content event aggregator as consequence of a failure | org.alfresco.search.contentrefresh.event |
| alfresco.content.event.retry.maxAllowed | Maximum number of retries in case of transient failure processing | 3 |
| alfresco.content.event.retry.delay | Delay in milliseconds between subsequent retries | 1000 |
| acs.repo.transform.request.endpoint | Alfresco Repository channel | activemq:queue:acs-repo-transform-request?jmsMessageType=Text |
| alfresco.sharedFileStore.baseUrl | Alfresco Shared FileStore endpoint | http://127.0.0.1:8099/alfresco/api/-default-/private/sfs/versions/1/file/ |
| alfresco.sharedFileStore.timeout | Alfresco Shared FileStore maximum read timeout in milliseconds | 2000 |
| alfresco.sharedFileStore.maxBufferSize | Alfresco Shared FileStore maximum buffer size (-1 for unlimited buffer) | -1 |
| alfresco.event.topic | Topic name for Alfresco Repository events | activemq:topic:alfresco.repo.event2 |
| alfresco.metadata.event.channel | Alfresco Metadata channel | activemq:queue:org.alfresco.search.metadata.event |
| alfresco.content.event.channel | Alfresco Content channel | activemq:queue:org.alfresco.search.content.event |
| alfresco.metadata.event.queue | Alfresco Metadata queue name | org.alfresco.search.metadata.event |
| alfresco.metadata.retry.event.queue | Alfresco Error event queue name | org.alfresco.search.metadata.retry.event |
| metadata.events.batch.size | Maximum number of events per batch | 10 |
| metadata.events.batch.timeout | Maximum timeout in milliseconds for batch creation | 1000 |
| alfresco.retransmission.max.attemps | Maximum number of retries in case of transient failure processing | 3 |
| alfresco.event.retry.delay | Delay time for error event in milliseconds | 1000 |
| alfresco.mediation.filter-file | The configuration file which contains fields and node types blacklists (see below)| classpath:mediation-filter.yml |

Within the Elasticsearch-connector there's a subset of components that are in charge to index data: specifically a component called "Mediation" subscribes to the channel indicated by the `alfresco.event.topic` attribute (see the table above) and processes the incoming node events.    
The configuration of that component allows to declare three blacklist sets for filtering out nodes/attributes to be indexed.
Those blacklists can be specified in the file indicated by the `alfresco.mediation.filter-file` attribute (see the table above) which defaults to a file called mediation-filter.yml that must be in the module classpath. Here's a sample content of that file: 

```
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
* **fields**: fields listed in this set are removed from the incoming nodes metadata. In other words, fields in this set won't be sent to Elasticsearch for indexing, and therefore they won't be searchable    

In order to override some of these values, command line system properties can be specified. According to standard Spring Boot approach, the name of the property must be converted to uppercase and dots must be changed by underscore characters. The following sample override default values for three different properties.

```
$ java -DSPRING_ELASTICSEARCH_REST_URIS=http://localhost:9200
 -DSPRING_ACTIVEMQ_BROKERURL=nio://activemq:61616
 -DALFRESCO_SHAREDFILESTORE_BASEURL=http://localhost:8099/alfresco/api/-default-/private/sfs/versions/1/file/
 -jar alfresco-elasticsearch-live-indexing-1.0.0-app.jar
```

The same convention can be used when deploying Alfresco Elasticsearch Connector using Docker Compose templates.

```
live-indexing:
    image: quay.io/alfresco/alfresco-elasticsearch-live-indexing
    environment:
        SPRING_ELASTICSEARCH_REST_URIS: http://elasticsearch:9200
        SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
        ALFRESCO_SHAREDFILESTORE_BASEURL: http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file/
```

For instance, content indexing for `cm:content` documents can be disabled using following Docker configuration:

```
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

```
$ cat mediation-filter.yml
mediation:
  nodeTypes:
  contentNodeTypes:
    - cm:content
  fields:
    - cmis:changeToken
    ...
```

---
[1] https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config


### Scaling up

Every Alfresco Elasticsearch Connector service can be scaled up to use an ActiveMQ Connection Pool and to increase the number of Consumers.

In order to use the ActiveMQ **pool**, add following properties to your `.env` file in Docker Compose. Pool size is set to 100 in the sample.

```
$ cat .env
ACTIVEMQ_POOL_ENABLED=true
ACTIVEMQ_POOL_SIZE=100
```

Spring related properties can be associated to the Elasticsearch Connector when declaring the service in `docker-compose.yml` file.

```
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            SPRING_ACTIVEMQ_BROKERURL: nio://activemq:61616
            SPRING_ACTIVEMQ_POOL_ENABLED: ${ACTIVEMQ_POOL_ENABLED}
            SPRING_ACTIVEMQ_POOL_MAXCONNECTIONS: ${ACTIVEMQ_POOL_SIZE}
```

Increasing the **consumer** number requires to check the property name in the `application.properties` file for the service and to override it in `docker-compose.yml` file. The following sample is increasing the consumer number to 20 for `elasticsearch-live-indexing-metadata`.

```
    live-indexing-metadata:
        image: quay.io/alfresco/alfresco-elasticsearch-live-indexing-metadata:${LIVE_INDEXING_METADATA_TAG}
        environment:
            INPUT_ALFRESCO_METADATA_BATCH_EVENT_CHANNEL: sjms-batch:metadata.event?completionTimeout=1000&completionSize=10&aggregationStrategy=#eventAggregator&?consumerCount=20
```
