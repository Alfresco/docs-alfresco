# Backing up Elasticsearch data

Backing up the data stored in Elasticsearch is described in detail in the [Elastic search documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html). When using the *snapshot* functionality of ElasticSearch, you must enable the HTTP interface and create firewall rules to prevent general public from accessing it.

When running Elasticsearch in embedded mode, the folder configured to store the Elaticsearch data can also be backed up. Note that this might not include the latest changes \(as they might not yet have been flushed to disk\).

**Parent topic:**[Elasticsearch configuration](../topics/elasticsearch_configuration.md)

