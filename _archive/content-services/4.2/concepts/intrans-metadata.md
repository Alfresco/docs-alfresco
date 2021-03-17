---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Transactional metadata query

Alfresco supports the execution of a subset of the CMIS Query Language \(CMIS QL\) and Alfresco Full Text Search \(AFTS\) queries directly against the database. This feature is called transactional metadata query \(TMDQ\).

Use this information to learn more about transactional metadata query, its features, and how to configure it. This section also describes how to configure an optional patch for upgrade.

-   **[Overview of transactional metadata query](../concepts/intrans-metadata-overview.md)**  
The noindex subsystem, also referred to as TMDQ, supports queries only against the database. TMDQ supports cases where eventual consistency is not efficient and there is a short delay between when the content is added, updated, or deleted, and when the index is updated to reflect this.
-   **[Features of transactional metadata query](../concepts/intrans-metadata-feature.md)**  
This topic describes the features of the transactional metadata query.
-   **[Transactional metadata queries supported by database](../concepts/intrans-metadata-query.md)**  
The database can only be used for a subset of all queries. These queries can be in the CMIS Query Language \(CMIS QL\) or Alfresco Full Text Search Query Language \(AFTS QL\).
-   **[Configuring transactional metadata query](../concepts/intrans-metadata-configure.md)**  
This topic describes how to configure the transaction metadata query using the subsystem properties.
-   **[Configuring an optional patch for upgrade](../concepts/intrans-metadata-conf-patch.md)**  
TMDQ requires two optional patches to be applied for full support. If no patch is applied, there is no database support.
-   **[Adding optional indexes to database](../concepts/intrans-metadata-create-index.md)**  
This topic provides an overview on upgrading the database by adding optional indexes in oder to support metadata query feature. It also provides information on how long the upgrade may take \(duration of upgrade\) and how to do it incrementally.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

