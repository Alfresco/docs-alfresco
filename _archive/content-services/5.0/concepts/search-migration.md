---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Upgrading search subsystems

This section provides information on how to migrate the search subsystem during an upgrade to Alfresco One 5.0.

**Important:** The Lucene search subsystem is not available on Alfresco One 5.0.

**Important:** During an upgrade, Solr 4 needs to reindex the entire repository. While reindexing is in progress, you may use Solr 1 for basic search functionality - new functionality enabled by Solr 4 \(such as filtered searches\) will not be available, and you may encounter other issues with search capabilities.

Although the Solr 1 search subsystem is available on Alfresco One 5.0, it is only supported while Solr 4 is in the process of reindexing the repository. Only Solr 4 is fully supported on Alfresco One 5.0.

This section describes the migration path of the following two examples:

-   Upgrading from Alfresco 4.x with Lucene to Alfresco One 5.0 with Solr 4
-   Upgrading from Alfresco 4.x with Solr 1.4 to Alfresco One 5.0 with Solr 4

-   **[Issues to consider before upgrading search](../concepts/solr4-considerations.md)**  
Before beginning an upgrade of the search subsystems, there are some important issues you should consider.
-   **[Upgrading from Lucene to Solr 4 search](../tasks/lucene-solr4-migration.md)**  
This topic describes how to upgrade from Alfresco Enterprise 4.x with the Lucene  search server to Alfresco One 5.0  with the Solr 4 search server.
-   **[Upgrading from Solr to Solr 4 search](../tasks/solr-solr4-migration.md)**  
This section describes how to upgrade from Alfresco Enterprise 4.x with the Solr  search server to Alfresco One 5.0  with the Solr 4 search server.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

