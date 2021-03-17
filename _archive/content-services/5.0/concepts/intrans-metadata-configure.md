---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Configuring transactional metadata query

This topic describes how to configure the transaction metadata query using the subsystem properties.

The common properties used to configure the transactional metadata query for the search subsystems are:

-   `solr.query.cmis.queryConsistency`
-   `solr.query.fts.queryConsistency`

These properties should be set in the alfresco-global.properties file.

The default value for these properties is `TRANSACTIONAL_IF_POSSIBLE`. However, you can override it with any of the following permitted values:

-   `EVENTUAL`
-   `TRANSACTIONAL`

The `solr.query.cmis.queryConsistency` and `solr.query.fts.queryConsistency` properties can also be set per query on the `SearchParameters` and `QueryOptions` objects.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

