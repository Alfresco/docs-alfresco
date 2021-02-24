# Elasticsearch configuration

[Elasticsearch](http://www.elasticsearch.org/) is an open source data store for [JSON](http://www.json.org/) documents. Its main features include fast full text search and analytics.

Elasticsearch is used in Alfresco Process Services as a data store for generating analytics and reports. The full text search capabilities are not currently used, but will be in a future release.

There are two ways to configure Elasticsearch in the application:

-   **Embedded**: The Elasticsearch server starts up embedded within Alfresco Process Services. The embedded instances can be configured to autodiscover other nodes. However, this is disabled by default.

-   **Client**: The application only creates a client, which connects to an Elasticsearch cluster. This approach is similar to connecting to a relational database.


**Note:** By default, an Elasticsearch client will always be created. In the *Client* use case, this is all that will be instantiated. In the *Embedded* setup, an Elasticsearch client will be created that connects to a cluster, which also includes the local node. In Elasticsearch terminology, they are referred to as *client* and *data* nodes.

-   **[General Settings](../topics/general_settings.md)**  
 The following properties are applicable to both embedded and client setup.
-   **[Embedded Setup](../topics/embedded_setup.md)**  
 This is the default configuration. The following properties need to be set when using Elasticsearch in an embedded setup.
-   **[Client setup](../topics/client_setup.md)**  
To connect to an external Elasticsearch cluster, set following property combined with the general settings.
-   **[Disabling Elasticsearch](../topics/disabling_elasticsearch.md)**  
 To disable Elasticsearch \(embedded or the client\), set the *elastic-search.server.type* property to *none*.
-   **[Event Processing for analytics](../topics/event_processing_for_analytics.md)**  

-   **[Backing up Elasticsearch data](../topics/backing_up_elasticsearch_data.md)**  

-   **[Rebuilding the Elasticsearch indices](../topics/rebuilding_the_elasticsearch_indices.md)**  
 Occasionally, an Elasticsearch index can get corrupted and become unusable. All data that are sent to Elasticsearch is stored in the relational database \(except if the property *event.processing.processed.events.action* has been set to *delete*, in which case the data is lost\).

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

