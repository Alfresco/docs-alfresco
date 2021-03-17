# REST client configuration properties

To connect to a remote instance of an Elasticsearch service using the REST client capability, set the following properties.

|Property

|Description

|
|`elastic-search.server.type`

|The server type for Elasticsearch configuration. Set this to **REST** to enable the REST client implementation.

|
|`elastic-search.rest-client.port`|The port running Elasticsearch.|
|`elastic-search.rest-client.connect-timeout`|Connection timeout for the REST client.|
|`elastic-search.rest-client.socket-timeout`|Socket timeout for the REST client.|
|`elastic-search.rest-client.address`|IP address of the REST client.|

**Note:** No data is stored on the server on which the application is running. The data fully resides within the Elasticsearch cluster in the remote environment.

For information about the compatibility between the REST client and the remote Elasticsearch cluster environment, see [Communicating with an Elasticsearch Cluster using HTTP](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/_motivations_around_a_new_java_client.html).

**Parent topic:**[Elasticsearch configuration settings](../topics/general_settings.md)

