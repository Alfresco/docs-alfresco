# Client setup

To connect to an external Elasticsearch cluster, set following property combined with the general settings.

|Property|Description|
|elastic-search.server.type|**client**|

No data is stored on the server in which the application is running \(contrary to the embedded setup\). The data fully resides within the externally managed Elasticsearch cluster.

The version used in the application is **Elasticsearch 1.7.3**. It is recommended that you use the same version as the library JAR.

**Parent topic:**[Elasticsearch configuration](../topics/elasticsearch_configuration.md)

