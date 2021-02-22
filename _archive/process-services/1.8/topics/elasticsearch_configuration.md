# Elasticsearch configuration

Elasticsearch is used in Alfresco Process Services as a data store for generating analytics and reports. [Elasticsearch](http://www.elasticsearch.org/) is an open source data store for [JSON](http://www.json.org/) documents. Its main features include fast full text search and analytics.

You can configure Elasticsearch in the application using the following methods:

-   **Embedded**: The Elasticsearch server is embedded within Process Services. The embedded instances can be configured to autodiscover other nodes. This is disabled by default.

-   **Client**: The application creates a client, which connects to an Elasticsearch cluster. This approach is similar to connecting to a relational database.

-   **REST**: The application creates a Java Low Level REST client, which allows you to configure Process Services to index event data into a remote Elasticsearch service. The REST client internally uses the Apache HTTP Async Client to send HTTP requests. This allows communication with an Elasticsearch cluster through HTTP. For more details regarding the REST client, see [Java Low Level REST Client](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-low.html).

    **Note:** REST operations made using the native transport protocol are not supported. The Elasticsearch service exposes only the REST API and not the transport protocol. Operations must therefore be run across an HTTP connection.


**Note:** By default, an Elasticsearch client will always be created. In the **Client** method, this is all that will be instantiated. In the **Embedded** method, an Elasticsearch client will be created that connects to a cluster, which also includes the local node. In Elasticsearch terminology, they are referred to as *client* and *data* nodes.

-   **[Elasticsearch configuration settings](../topics/general_settings.md)**  
 The following properties are applicable to both embedded and client setup.
-   **[Disabling Elasticsearch](../topics/disabling_elasticsearch.md)**  
 To disable Elasticsearch \(embedded or the client\), set the elastic-search.server.type property to `none`.
-   **[Event processing for analytics](../topics/event_processing_for_analytics.md)**  

-   **[Backing up Elasticsearch data](../topics/backing_up_elasticsearch_data.md)**  

-   **[Rebuilding the Elasticsearch indexes](../topics/rebuilding_the_elasticsearch_indexes.md)**  
Occasionally, an Elasticsearch index can get corrupted and become unusable. All data that are sent to Elasticsearch is stored in the relational database \(except if the property event.processing.processed.events.action has been set to delete, in which case the data is lost\).

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

