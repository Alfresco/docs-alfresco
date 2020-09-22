---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Transactional metadata query

Use this information for an overview on the transactional metadata query. It also describes the process of configuring the optional patch for upgrade.

-   **[Overview of transactional metadata query](../concepts/intrans-metadata-overview.md)**  
Alfresco Content Services supports the execution of a subset of the CMIS Query Language \(CMIS QL\) and Alfresco Full Text Search \(AFTS\) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query \(TMDQ\).
-   **[Features of transactional metadata query](../concepts/intrans-metadata-feature.md)**  
Use this information to understand the features of the transactional metadata query.
-   **[Options supported by Query Languages](../concepts/query-lang-support.md)**  
Use this information to know what options are supported by the Public API, CMIS Query Language \(QL\), and Alfresco Full Text Search Query Language \(FTS QL\).
-   **[Transactional metadata queries supported by database](../concepts/intrans-metadata-query.md)**  
Use this information to understand the queries supported by the database.
-   **[Configuring transactional metadata query](../concepts/intrans-metadata-configure.md)**  
Configure the transaction metadata query using the subsystem properties.
-   **[Configuring an optional patch for upgrade](../concepts/intrans-metadata-conf-patch.md)**  
Transactional metadata query requires two optional patches to be applied for full support. If no patch is applied there is no database support.
-   **[Adding optional indexes to database](../concepts/intrans-metadata-create-index.md)**  
When you are upgrading the database, you can add optional indexes in order to support the metadata query feature. This information lets you know the likely duration of the upgrade and how to do it incrementally.
-   **[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)**  
 The following sections describe how to configure search in Alfresco Share.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

