---
title: Alfresco Search Enterprise
---

Alfresco Content Services supports the Elasticsearch platform for searching within the repository using Alfresco Search Enterprise 3.0.

[Elastic Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html){:target="_blank"} is an open source enterprise search platform that uses the [Lucene](https://lucene.apache.org/){:target="_blank"} engine for indexing and searching. Elasticsearch is written in Java and runs as a standalone search server. The Alfresco Repository sends HTTP requests to Elasticsearch to search for content and metadata. The Alfresco Elasticsearch Connector updates the cores and indexes in Elasticsearch. This consumes ActiveMQ messages produced by the Alfresco Repository when folders, documents, and permissions are created or updated in the repository.

> **Note:** The *alfresco* index is the only index in Elasticsearch used for searching live content. The index used for content marked as deleted (named *archive* in previous versions) is not available when using Elasticsearch.

The **Search** feature is provided by the Alfresco Repository itself which communicates with the Elasticsearch server that then performs the required format translation for queries and results. The Elasticsearch index contains all the content, metadata, and permissions for a single document, so no external Elasticsearch plugin is required.

The **Indexing** feature is provided by a Spring Boot application called `Alfresco Elasticsearch Connector`. This application includes two main components that build and maintain the index in Elasticsearch:

* **Live Indexing**: The Metadata, Content, and Permissions from the Alfresco Repository are consumed using ActiveMQ messages so they can be indexed in the Elasticsearch server. The information created and updated in the Alfresco Repository is not immediately available in Elasticsearch because it takes time to process the messages. **NOTE:** The previous [Eventual consistency]({% link search-services/latest/install/index.md %}#eventual-consistency) approach which was based on transactions and used for Solr deployments, has been replaced by this new process.

* **Re-Indexing**: Indexing the information of a pre-populated Alfresco Repository or catching up with Alfresco Repositories that have missed some ActiveMQ messages is provided by the Re-Indexing component. Metadata from Alfresco Repository is retrieved using a direct JDBC connection to Alfresco Database. **Note:** Only PostgresSQL is currently supported.

Alfresco Search Enterprise consists of the following components:

* Alfresco Elasticsearch Connector 3.0.0
* Alfresco Content Services 7.1.0, that includes Alfresco ActiveMQ, Alfresco Transform Service, and Database
* Elasticsearch server 7.10, that may be used as a standard managed service or that may be installed with default configuration. **Note:** The Elasticsearch server does not require any additional software from Alfresco in order to be used by Alfresco Search Enterprise 3.0

The services required for Search Enterprise are included in the following diagram.

![architecture]({% link search-enterprise/images/elasticsearch_connector_architecture.png %})