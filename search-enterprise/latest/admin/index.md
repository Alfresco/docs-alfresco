---
title: Overview
---

# Indexing

* [New Repository](#new-repository)
* [Existing Repository](#existing-repository)
* [Partial indexing](#partial-indexing)
  * [By Ids Range](#ids-range)
  * [By Dates Range](#dates-range)

### Pre-Indexing considerations

The Exact Term search feature, that allows searching using the equals operator `=`, is disabled by default to save index space.
It's possible to enable it for specific properties and property types using the configuration file `exactTermSearch.properties` located in **Alfresco Repository** under classpath `/alfresco/search/elasticsearch/config/`.

In order to overwrite this configuration when using Docker, mount this file as an external volume. Following sample describes a local configuration to be applied to Elasticsearch Search Subsystem when using Docker Compose deployment:

```
services:
  alfresco:
    volumes:
      - ./exactTermSearch.properties:/usr/local/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/search/elasticsearch/config/exactTermSearch.properties
```

>> Once you have done that you will need to perform a reindex, so it is recommended to enable the exact term feature before you start creating an index.

### Alfresco Elasticsearch Connector

**Indexing** is provided by a Spring Boot application called `Alfresco Elasticsearch Connector`. This application contains two main components that build and maintain the index in Elasticsearch:

* *Live Indexing*: Metadata, Content and Permissions from Alfresco Repository are consumed using ActiveMQ messages so they can be indexed in the Elasticsearch server. The information created and updated in Alfresco Repository is not immediately available in Elasticsearch, as it takes some time to process the messages coming from the Repository. The previous [Eventual consistency]({% link search-services/latest/install/index.md %}#eventual-consistency) approach, based on transactions and used for Solr deployments, has been replaced by this new approach based on ActiveMQ messages.

* *Reindexing*: Indexing the information of a pre-populated Alfresco Repository or catching up with Alfresco Repositories that have missed some ActiveMQ messages is provided by the Reindexing component. Metadata and Permissions from the Alfresco Repository is retrieved using a direct JDBC connection to the Alfresco Database (nb. currently only PostgreSQL is supported). Reindexing application also generates content indexing messages in ActiveMQ in order to get the content indexed, so it may take some time to process all these requests after the reindexing application has finished.

## New Repository

When creating a new Alfresco Repository, use the `Alfresco Elasticsearch Connector` applications in the following sequence:

* Start the ACS Stack, including the Alfresco Elasticsearch Connector Live Indexing services and Elasticsearch server
* Configure Alfresco Elasticsearch Connector Reindexing app to point to the database and Elasticsearch server
* Run the reindexing app from the command line replacing the connection details as appropriate:

```java
$ java -jar alfresco-elasticsearch-reindexing-3.0.0-app.jar \
--alfresco.reindex.jobName=reindexByIds \
--spring.elasticsearch.rest.uris=http://localhost:9200 \
--spring.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
--spring.datasource.username=alfresco \
--spring.datasource.password=alfresco \
--alfresco.reindex.prefixes-file=file:reindex.prefixes-file.json
o.s.batch.core.step.AbstractStep         : Step: [reindexByIdsStep] executed in 4s952ms
o.a.r.w.ElasticsearchRepoEventItemWriter : Total indexed documents:: 845
o.a.r.listeners.JobLifecycleListener     : Current Status: COMPLETED
```

Once the command has completed, metadata from the out-of-the-box Repository nodes will be indexed in the Elasticsearch server. Additionally, the Alfresco Elasticsearch Connector Live Indexer will add any new permissions and content if nodes are created, updated or deleted.

## Existing Repository

When using a pre-populated Alfresco Repository, use the `Alfresco Elasticsearch Connector` applications in the following sequence:

* Ensure the ACS Stack with SOLR (configured as the search subsystem) is running
* Start the Elasticsearch server
* Configure the Alfresco Elasticsearch Connector Reindexing app to point to the database and Elasticsearch server
* Run the reindexing app replacing the connection details as appropriate:

```java
$ java -jar alfresco-elasticsearch-reindexing-3.0.0-app.jar \
--alfresco.reindex.jobName=reindexByIds \
--spring.elasticsearch.rest.uris=http://localhost:9200 \
--spring.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
--spring.datasource.username=alfresco \
--spring.datasource.password=alfresco \
--alfresco.reindex.prefixes-file=file:reindex.prefixes-file.json
o.a.r.w.ElasticsearchRepoEventItemWriter : Total indexed documents:: 80845
o.a.r.listeners.JobLifecycleListener     : Current Status: COMPLETED
```

Once the command is completed, metadata from any existing Repository nodes will be indexed in the Elasticsearch server. Change the Alfresco Repository configuration in order to use Elasticsearch as the search subsystem and then re-start the Repository.

## Partial Indexing

Over time it's possible that certain data is not indexed correctly. For example this could be caused by a prolonged network connectivity issue. The Reindexing application provides two strategies in order to fill gaps in the Elasticsearch index:

* Fetch by IDS (`alfresco.reindex.jobName=reindexByIds`): index nodes in an interval of database `ALF_NODE.id` column
* Fetch by DATE (`alfresco.reindex.jobName=reindexByDate`): index nodes in an interval of database `ALF_TRANSACTION.commit_time_ms` column

### Ids Range

The following sample will reindex all the nodes in the Alfresco Repository which have an `ALF_NODE.id` value between 1 and 10000.

```java
java -jar target/alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.jobName=reindexByIds \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.fromId=1 \
  --alfresco.reindex.toId=10000 \
  --alfresco.reindex.concurrentProcessors=2
```

### Date Range

The following sample will reindex all the nodes in the Alfresco Repository which have a value for `ALF_TRANSACTION.commit_time_ms` between 202001010000 and 202104180000. Date time values are written in the format `yyyyMMddHHmm`.

```java
 java -jar target/alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.jobName=reindexByDate \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.concurrentProcessors=6 \
  --alfresco.reindex.fromTime=202001010000 \
  --alfresco.reindex.toTime=202104180000
```

## Deploying at Scale

This section describes how to run Alfresco Enterprise Search 3.0 at scale. Recommendations are based on testing carried out against a 50 million node repository.

The following services are required:

* Alfresco Content Repository includes a Tomcat server deploying `alfresco.war` application
* Alfresco Database is used to store metadata and other relevant information for Alfresco Content Repository
* Alfresco Transform Service includes a Spring Boot application with several transformation services (ImageMagick, LibreOffice, PDF Renderer and LibreOffice)
* Alfresco Shared File Store includes a Spring Boot application serving transformed files by Alfresco Transform Service
* Alfresco Elasticsearch Connector includes a Spring Boot application with several indexing services (mediation, metadata and content)
* Alfresco ActiveMQ is a message-oriented middleware (MOM) sharing messages between Alfresco Content Repository, Alfresco Elasticsearch Connector and Alfresco Transform Service
* Elasticsearch is a search and analytics engine that stores indexed metadata and content

* [Identifying critical paths](#identifying-critical-paths)
* [Metadata indexing performance](#metadata-indexing-performance)
* [Permissions indexing performance](#permissions-indexing-performance)
* [Content indexing performance](#content-indexing-performance)
* [Searching performance](#searching-performance)
* [Reindex using remote partitioning](#reindex-using-remote-partitioning)

## Identifying critical paths

In order to identify the services used for the different features provided by Alfresco Enterprise Search 3.0, critical paths should be reviewed:

* Indexing metadata and permissions
* Indexing content
* Searching metadata and content

![flows]({% link search-enterprise/images/elasticsearch_flows.png %})

### Metadata and Permissions

Every time a node is created or updated in Content Repository, new messages with metadata and permissions are sent to ActiveMQ. Elasticsearch Connector is consuming these and send the indexing requests to Elasticsearch server.

### Content

Every time a content node is created or updated in Content Repository, new messages are sent to ActiveMQ. Elasticsearch Connector is consuming these messages from ActiveMQ and creates new transformation messages back in ActiveMQ. Content Repository consumes the transformation messages and offloads the transformation of documents into plain text to the Transform Service. Once the transformation has been performed, Content Repository produces a transformation complete message in ActiveMQ and uploads the plain text file to Shared File Store. Elasticsearch Connector is consuming the messages and downloads the extracted text from Shared File Store. Then the document's text is sent for indexing to Elasticsearch server.

### Searching metadata and content

Searching operations are handled by Content Repository REST API. Depending on the search syntax used (only AFTS is currently supported), Content Repository translates the search query to Elasticsearch REST API language and sends the search request to Elasticsearch.

## Metadata indexing performance

Inappropriately configured or deployed system can result in a significant delay between the time when documents are created or updated in Content Repository and when they appear in search results (indexed in Elasticsearch).

The following information describes how to identify bottlenecks in the system's performance and recommendations to mitigate those for metadata only indexing scenario.

### Alfresco Repository

Alfresco Repository is updating the database the document's metadata in the database and producing messages to `alfresco.repo.event2` ActiveMQ topic. The rate of created or updated documents depends on the Content Repository cluster performance.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Increase database pool if no connections are available.
* Increase the number of threads if no threads are available.
* Increase the number of Content Repository nodes in the cluster.

### Database

The database is being updated to create new nodes or to modify existing ones. Additionally, the queries are executed in the database to populate metadata for returned entities in REST API responses for search queries. These operations are mainly related to `ALF_NODE` and `ALF_NODE_PROPERTIES` tables.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Regularly update statistics for `ALF_NODE` and `ALF_NODE_PROPERTIES` tables to optimise query planner performance.

### Alfresco Elasticsearch Connector

This service is consuming messages from ActiveMQ topic `alfresco.repo.event2` and producing / consuming ActiveMQ messages from queue `metadata.event`.

Recommendations:

* Always use a pool of connections to ActiveMQ (`spring.activemq.pool.enabled` set to true with `spring.activemq.pool.max-connections` sized).
* Increase the number of consumers for `live-indexing-mediation` component if messages enqueued count is significantly greater than messages dequeued for ActiveMQ topic `alfresco.repo.event2`.
* Increase the number of consumers for `live-indexing-metadata` component if messages enqueued count is significantly greater than messages dequeued for ActiveMQ queue `metadata.event`.

### ActiveMQ

ActiveMQ is transporting messages from Content Repository and Elasticsearch Connector. It is also used for Content Repository to Transform Service communication.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.

### Elasticsearch

Elasticsearch server is getting indexing requests from Elasticsearch Connector. If all the other services are working as expected, an increment in messages enqueued without dequeuing operation for queue `metadata.event` may indicate Elasticsearch server requires more resources. Slow responses for search queries can also indicate the insufficient resource for the server.

Recommendations:

* Increase resources for the server if CPU load or memory consumption is high.
* Increase resources for the server if ingestion rate is decreasing with higher volumes of data.

## Permissions indexing performance

### Alfresco Repository

Recommendations:

* Concurrent multiple updates on the same node can lead to missed information on elasticsearch. [SEARCH-2772](https://alfresco.atlassian.net/browse/SEARCH-2772)
* Updating permissions on folder containing a high number of nodes may cause that the permissions of descendants are not correctly updated on elasticsearch. [SEARCH-2768](https://alfresco.atlassian.net/browse/SEARCH-2768)

## Content indexing performance

### Alfresco Repository

Recommendations:

* Increasing the number of concurrent consumers for the ActiveMQ Queue `acs-repo-transform-request` can lead to missed content transformations. Maintain this value below 10 in order to be sure all the documents are transformed.

### Alfresco Elasticsearch Connector

Recommendations:

* Increase timeout used to contact via HTTP the Shared File Store setting the value in `alfresco.sharedFileStore.timeout`. This will help to avoid issues when the Shared File Store response slower than usual under a huge load.
* Increase content retry delay used to retrieve a content from Shared File Store setting the value in `alfresco.content.event.retry.delay`. This will help when we are doing a massive document upload in the system and we have to wait for the content available more than usual.
* Choose the right configuration for the Shared File Store content age scheduler. If for disk space issues you reduce it, consider that you can face many not found exceptions with a consequent content reinsert request.

## Searching performance

Alfresco Elasticsearch Connector is using an out-of-the-box Elasticsearch server. In order to improve query performance, [official recommendations from Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/master/tune-for-search-speed.html) are valid.

## Reindexing

Reindexing component has been tested on reading replica with Postgres database.
Tests have been performed on the local environment and AWS.

To run database read replicas in AWS follow the guidelines given in [AWS read replicas](https://aws.amazon.com/rds/features/read-replicas/l)

For using the read replica in the reindexing phase, configure the reindexing component for targeting the correct read replica:

```bash
spring.datasource.url=jdbc:postgresql://<READ_REPLICA_ADDRESS>:<READ_REPLICA_PORT>/alfresco
```

## Reindex using remote partitioning

When it is required to index a huge Alfresco Repository instance, using a single reindex process can require much time. We can scale the reindex node vertically in order to improve performance, but this cannot be enough. Using [remote partitioning](https://docs.spring.io/spring-batch/docs/current/reference/html/scalability.html#partitioning), a Spring Batch feature, we can scale horizontally the Reindexing service.



 ┌─────────────────────────┐                             ┌────────────────┐
 │         Manager         │                             │    Worker 1    │
 │                         │   Produce     ┌────────────►│                ├───┐
 │                         │   partition   │             │* Read partition│   │
 │ * DB Schema Validation  │   requests┌───┴──────┐      │* Index nodes   │   │
 │                         ├──────────►│ ActiveMQ │      └──────┬─────────┘   │
 │ * Partition creation    │◀──────────┤          │ ◀───────────┘             │
 │                         │           └───┬──────┘                           │
 │                         │   Consumes    │ ▲                                │
 │                         │   workers     │ │                                │
 │                         │   replies     │ │                                │
 │                         │               │ │                                │
 │                         │               │ │                                │
 │                         │               │ │                                │
 │                         │               │ │           ┌────────────────┐   │
 └───────────┬─────────────┘               │ └───────────┤    Worker n    │   │
             │                             │             │                │   │
             │                             └────────────►│* Read partition│   │
             │                                           │* Index nodes   │   │
             │                                           └────────┬───────┘   │
             │           ┌────────────┐                           │           │
             │           │ Shared     │◄──────────────────────────┘           │
             └──────────►│ Database   │                                       │
                         │            │◄──────────────────────────────────────┘           
                         └────────────┘

This solution requires a **manager** node that executes verification steps, like database schema validation, and creates partitions and multiple **worker** nodes that index the partition. The **manager** sends partitions to Worker using ActiveMQ. 

To use this feature we need to run a **manager*+ node and at least a **worker** node, to scale up the system we can increase the number of worker nodes setting the property _alfresco.reindex.partitioning.grid-size_. The number of worker nodes, usually, should be equals to the grid size, but if it is more a worker will consume multiple partitions.

The system will automatically select the partition strategy depending on the job name, currently we have two:

* Partition by id range
* Partition by date range

Both strategies split the specified range in multiple ranges depending on the grid size.

_Manager_:

```shell
java -jar alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.jobName=reindexByIds \
  --alfresco.reindex.partitioning.type=manager \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100  \
  --alfresco.reindex.fromId=0 \
  --alfresco.reindex.toId=10000 \
  --spring.batch.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
  --spring.batch.datasource.username=springBatchUser \
  --spring.batch.datasource.password=****** \
  --spring.batch.datasource.driver-class-name=org.postgresql.Driver \
  --spring.batch.drop.script=classpath:/org/springframework/batch/core/schema-drop-postgresql.sql \
  --spring.batch.schema.script=classpath:/org/springframework/batch/core/schema-postgresql.sql
```

_Worker_:

```shell
java -jar alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
  --alfresco.reindex.partitioning.type=worker \
  --alfresco.reindex.pagesize=100 \
  --alfresco.reindex.batchSize=100 \
  --alfresco.reindex.concurrentProcessors=2 \
  --spring.batch.datasource.url=jdbc:postgresql://localhost:5432/alfresco \
  --spring.batch.datasource.username=springBatchUser \
  --spring.batch.datasource.password=****** \
  --spring.batch.datasource.driver-class-name=org.postgresql.Driver \
  --spring.batch.drop.script=classpath:/org/springframework/batch/core/schema-drop-postgresql.sql \
  --spring.batch.schema.script=classpath:/org/springframework/batch/core/schema-postgresql.sql
```

You don't need to specify a job name for the **worker** because the configuration to use is in the manager step context. This also means that you don't need to restart a worker if the job name specified in the **manager** configuration changes.

The **worker** will not stop automatically because it is always up and running in order to wait for the new partition to index.
The **manager** will automatically stop when all partition has been indexed.

### Batch Job Store DB

When using remote partitioning **it is mandatory to use a shared database** accessible from all nodes. The database will contain the Batch Job store. Spring batch will automatically create required tables, and those tables don't contain sensitive data, so you can wipe them out whenever you want and it isn't required to backup them. Even if you can use a unique database user to read partition and managing Spring Batch, it is strongly suggested to use a different one. A list of supported databases can be retrieved [here](https://docs.spring.io/spring-batch/docs/current/api/org/springframework/batch/support/DatabaseType.html), while all available SQL initialization scripts are available [here](https://github.com/spring-projects/spring-batch/tree/main/spring-batch-core/src/main/resources/org/springframework/batch/core).

When using a different database you need to add to Java classpath the right connection driver. Because the Reindexing service is a Spring Boot application you can's simple add the JAR to the classpath, but you need to use a different command line as in the example below:

```shell
 java -cp alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar:mysql-connector-java-8.0.25.jar
   -Dloader.main=org.alfresco.reindexing.ReindexingApp org.springframework.boot.loader.PropertiesLauncher 
   --alfresco.reindex.jobName=reindexByIds
   --alfresco.reindex.partitioning.type=manager 
   --alfresco.reindex.fromId=0
   --alfresco.reindex.toId=10000
   --spring.batch.datasource.url=jdbc:mysql://localhost:3306/alfresco
   --spring.batch.datasource.username=batchUser
   --spring.batch.datasource.password=*****
   --spring.batch.datasource.driver-class-name=com.mysql.jdbc.Driver
   --spring.batch.drop.script=classpath:/org/springframework/batch/core/schema-drop-mysql.sql
   --spring.batch.schema.script=classpath:/org/springframework/batch/core/schema-mysql.sql
```

### Failures handling

If the **manager fails or a worker fails** you can check what partitions were indexed in the log and launching again the Reindexing service only for missing partitions.

### Partition definition

Because the Reindexing service will create partitions only partitioning the interval between the specified range, it is necessary to choose the right range in order to **avoid empty partitions**. For instance, you can select the min and max values from the Alfresco database and then use those values in configuration properties.

When reindexing by ID range you can retrieve min and max values executing the query below and use them for _alfresco.reindex.fromId_ and _alfresco.reindex.toId_:

```sql
select min(id) as fromId, max(id) as toId from alf_node;
```

When reindexing by date range you can retrieve min and max values executing the query below and use them for _alfresco.reindex.fromTime_ and _alfresco.reindex.toTime_:

```sql
select to_char(to_timestamp(min(commit_time_ms)/1000),'YYYYMMDDHHMI') as fromTime, to_char(to_timestamp(max(commit_time_ms)/1000),'YYYYMMDDHHMI') as toTime from alf_transaction;
```

Because it is easier to have **unbalanced partitions** when indexing by date range, it is recommended to use this strategy only when we are interested in indexing a specific date range, while it is recommended to perform a reindex by id range when we need to perform a **full reindex**.

### Indexing only metadata

Reindexing application may be used to index only metadata, excluding the content indexation from the process.

In order to apply this configuration, set parameter `alfresco.reindex.contentIndexingEnabled` to `false`

```shell
java -jar alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
    --alfresco.reindex.contentIndexingEnabled=false
```

## Indexing PATH property

By default, reindexing PATH property is disabled. In order to enable this feature, set parameter `alfresco.reindex.pathIndexingEnabled` to `true`.

```shell
java -jar alfresco-elasticsearch-reindexing-3.0.0-SNAPSHOT-app.jar \
    --alfresco.reindex.pathIndexingEnabled=true
```

## Enabling and disabling reindexing features recommendations

By default reindexing application uses following configuration:

* `alfresco.reindex.metadataIndexingEnabled = true` 
* `alfresco.reindex.contentIndexingEnabled = true` 
* `alfresco.reindex.pathIndexingEnabled = false` 

Reindexing metadata process is also indexing permissions associated with the document. Hence, when disabling metadata reindexing, Content and Path will not be updated for non-indexed documents. Only indexed documents will be updated with Content and Path.

Main use case to reindex only Content or Path is a fully metadata indexed Repository that needs to update / complete Content or Path.

### Recommendations for large reindexing processes

When indexing large repositories from scratch, metadata indexing rate will be higher than content indexing rate. This will increase the number of messages pending in `acs-repo-transform-request` ActiveMQ queue with the time. However, since [default ActiveMQ configuration](https://activemq.apache.org/amq-message-store) is prepared to handle [million of messages](https://activemq.apache.org/how-do-i-configure-activemq-to-hold-100s-of-millions-of-queue-messages) per queue, this won't be an issue for the platform. 

>> If you are using a custom ActiveMQ configuration, verify that messages can be persisted not only in memory but also in the filesystem.
