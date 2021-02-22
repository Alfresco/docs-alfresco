---
author: [Alfresco Documentation, Alfresco Documentation]
---

# New Alfresco Content Services configuration properties

Alfresco Content Services 5.2.7 provides a range of new properties for configuring your installation, along with their default settings. These properties can be set in the alfresco-global.properties file.

-   **authentication.protection.enabled=true**

    Specifies if the login protection feature is enabled or disabled.

-   **authentication.protection.limit=10**

    Specifies the number of attempts after which the user id becomes protected.

-   **authentication.protection.periodSeconds=6**

    Specifies the protection period after which a valid login attempt can be done.

-   **content.metadataExtracter.pdf.overwritePolicy=PRAGMATIC**

    Specifies the default overwrite policy for `PdfBoxMetadataExtracter`.

-   **content.transformer.retryOn.different.mimetype=true**

    Enables transformation retrying if the file mimetype differs the file extension. This property is ignored if `transformer.strict.mimetype.check` is true as these transformations will not take place.

-   **dir.contentstore.bucketsPerMinute=0**

    Splits the data into a maximum number of buckets within the minute. The default value is zero, which means all the content created within the same minute will live in the same folder in the content store. If a value is specified, the content will be distributed into sub folders based on the second in which it was created. For example, dir.contentstore.bucketsPerMinute=6.

-   **system.api.discovery.enabled=true**

    Specifies if the detailed version information about the repository should be returned from the Discovery REST API. The default value is true and it returns a successful response. If this property is set to false, Discovery is disabled for the system and the server returns a `501 Not Implemented` error code.

-   **transformer.strict.mimetype.check=true**

    Checks that the declared mimetype \(of the node\) is the same as the derived mimetype of the content before a transformation takes place. Only files in the repository \(not intermediate files in a transformer pipeline\) are checked.

-   **system.workflow.comment.property.max.length=4000**

    Specifies the max length that a comment on a task can have. It replaces the `system.workflow.jbpm.comment.property.max.length` property, which has been deprecated in Alfresco Content Services 5.2.7.

-   **spaces.quickshare.link\_expiry\_actions.childname=app:quick\_share\_link\_expiry\_actions**

    Specifies the name of the folder which will be created \(if it doesn't already exist\) under the Data Dictionary in Alfresco Share to serve as a container for all the expiry actions nodes.

-   **system.quickshare.expiry\_date.enforce.minimum.period=DAYS**

    By default, the difference between the quick share expiry date and the current time must be at least 1 day \(24 hours\). This can be changed to at least 1 hour or 1 minute for testing purposes. For example, if you set the value to `MINUTES`, the service will calculate the difference between NOW and the given expiry date in terms of minutes, and check for the difference to be greater than 1 minute.

-   **system.remove-jbpm-tables-from-db.ignored=true**

    Removes all jBPM tables from the database. If set to false, it runs the script to delete the tables.

    **Note:** The jBPM workflow engine was deprecated and all associated workflows were removed in Alfresco One 5.0. Any unused data will be removed when the `jbpm_` tables are removed. The Activiti BPM engine data in the `act_` tables is completely unaffected.

    In Alfresco Content Services 5.2.7, by default, the tables and the unused data still remains. In the future releases of Alfresco Content Services, the tables will be removed.


The properties to dynamically map Alfresco stores to a Solr 6 instance where the index for a store resides are:

`solr6.store.mappings=solrMappingAlfresco,solrMappingArchive`

`solr6.store.mappings.value.solrMappingAlfresco.httpClientFactory=solrHttpClientFactory`

`solr6.store.mappings.value.solrMappingAlfresco.baseUrl=/solr/alfresco`

`solr6.store.mappings.value.solrMappingAlfresco.protocol=workspace`

`solr6.store.mappings.value.solrMappingAlfresco.identifier=SpacesStore`

`solr6.store.mappings.value.solrMappingArchive.httpClientFactory=solrHttpClientFactory`

`solr6.store.mappings.value.solrMappingArchive.baseUrl=/solr/archive`

`solr6.store.mappings.value.solrMappingArchive.protocol=archive`

`solr6.store.mappings.value.solrMappingArchive.identifier=SpacesStore`

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

