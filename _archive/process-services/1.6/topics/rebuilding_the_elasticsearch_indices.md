# Rebuilding the Elasticsearch indices

Occasionally, an Elasticsearch index can get corrupted and become unusable. All data that are sent to Elasticsearch is stored in the relational database \(except if the property *event.processing.processed.events.action* has been set to *delete*, in which case the data is lost\).

You might have to rebuild the indices when changing the core Elasticsearch settings \(for example, number of shards\).

Events are stored in the **ACT\_EVT\_LOG** table before they are processed. The **IS\_PROCESSED\_** flag is set to 0 when inserting an event and changing it to 1 to process for ElasticSearch. An asynchronous component will move those table rows with *1* for the flag to the **PROCESSED\_ACTIVITI\_EVENTS**.

Therefore, to rebuild the Elasticsearch index, you must do the following:

-   Remove the data from Elasticsearch \(deleting the data folders for example in the embedded mode\)

-   Copy the rows from *PROCESSED\_ACTIVITI\_EVENTS* to *ACT\_EVT\_LOG* and setting the *IS\_PROCESSED* flag to 0 again.


To make things a little bit complex, due to historical reasons, the *DATA\_* column has different types in *ACT\_EVT\_LOG* \(byte array\) and *PROCESSED\_ACTIVITI\_EVENTS* \(long text\). So a data type conversion is needed when moving rows between those tables.

See the example-apps folder that comes with Alfresco Process Services. It has an event-backup-example folder, in which a Maven project can be found that carries out the data type conversion. You can also use this to back up and restore events. Note that this example uses Java, but it can also be done with other languages. It first writes the content of *PROCESSED\_ACTIVITI\_EVENTS* to a .csv file. This is also useful when this table becomes too big in size: store the data in a file and remove the rows from the database table.

**Parent topic:**[Elasticsearch configuration](../topics/elasticsearch_configuration.md)

