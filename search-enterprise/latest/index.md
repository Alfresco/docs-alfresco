---
title: Alfresco Search Enterprise 
---

Alfresco Content Services supports use of the Elasticsearch platform for searching within the repository from Alfresco Search Enterprise v3.0

Elasticsearch is an open source enterprise search platform that uses Lucene as indexing and search engine. Elasticsearch is written in Java and runs as a standalone search server. Alfresco Repository sends HTTP requests to Elasticsearch to search for metadata and content. Alfresco Elasticsearch Connector updates the cores and indexes in Elasticsearch consuming ActiveMQ messages produced by Alfresco Repository when folders, documents and permissions are created or updated in the repository.

>> There is only one index in Elasticsearch (*alfresco*) used for searching all live content. The index used for content marked as deleted (named *archive* in previous versions) is not available when using Elasticsearch.

**Indexing** feature is provided by a Spring Boot application named `Alfresco Elasticsearch Connnector`. Metadata, Content and Permissions from Alfresco Repository are consumed using ActiveMQ messages so they can be indexed in Elasticsearch server. The information created and updated in Alfresco Repository is not immediately available in Elasticsearch, as it takes some time to process the messages coming from the Repository. The previous [eventual consistency](https://docs.alfresco.com/search-community/concepts/solr-event-consistency.html) approach, based in transactions and used for Solr deployments, has been replaced by this one based in ActiveMQ messages.

**Searching** feature is provided by Alfresco Repository itself, that communicates with Elasticsearch server performing the required format translation for queries and results. Elasticsearch index contains all the content, metadata and permissions for a single document, so no external Elasticsearch plugin is required in order to perform these queries.

Required services are included in the following deployment diagram.

```
+---------------------------+                                         +---------------------+       +-------------------+
|                           |                                         |                     |       |                   |
|       ALFRESCO UI         |                  ~Searching             |    ELASTICSEARCH    |       |      KIBANA       |
|       ADW / ACA           |     +----------------------------------->                     <-------+                   |
|                           |     |                9200               |                     |  9200 |                   |
+------------+--------------+     |                                   +----------^----------+       +-------------------+
             |                    |                                              |
             | 8080               |                                              | 9200
             |                    |                                              |
+------------v--------------+     |   +-----------------------+       +----------+----------+
|                           +-----+   |                       |       |    ALFRESCO         |
|       ALFRESCO            |         |      ALFRESCO         |       |    ELASTICSEARCH    |
|       REPOSITORY          +--------->      ACTIVEMQ         <------->    CONNECTOR        |
|                           |  61616  |                       | 61616 |    ~Indexing        |
+------------+--------------+         +----------+------------+       +----------+----------+
             |                                   |                               |
             | 5432                              | 8090                          | 8099
             |                                   |                               |
+------------+--------------+         +----------+------------+       +----------v----------+  
|                           |         |      ALFRESCO         |       |     ALFRESCO        |
|       POSTGRESQL          |         |      TRANSFORM        +-------+     SHARED          |
|                           |         |      SERVICE          |       |     FILESTORE       |
+---------------------------+         +-----------------------+       +---------------------+
```

**Alfresco Search Enterprise v3.0** is deployed using the following components:

* Alfresco Content Services 7.0, that includes Alfresco ActiveMQ and Alfresco Transform Service
* Alfresco Elasticsearch Connector 1.0
* Elasticsearch server 7.10, that may be used as a standard managed service or that may be installed with default configuration

>> Note that Elasticsearch server doesn't require any additional software from Alfresco in order to be used by Alfresco Search Enterprise v3.0
