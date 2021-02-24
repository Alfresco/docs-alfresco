---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Upgrading search

Use this information to migrate the search subsystem during an upgrade to 5.2.7.

**Important:** The Lucene search subsystem is not available in 5.2.7.

**Important:** During an upgrade, Solr 4 needs to reindex the entire repository. While reindexing is in progress, you may use Solr 1 for basic search functionality - new functionality enabled by Solr 4 \(such as filtered searches\) will not be available, and you may encounter other issues with search capabilities.

This information describes the migration path of the following two examples:

-   Upgrading from Alfresco Content Services 4.x with Lucene to Alfresco Content Services 5.2.7 with Solr 4
-   Upgrading from Alfresco Content Services 4.x with Solr 1.4 to Alfresco Content Services 5.2.7 with Solr 4

-   **[Issues to consider before upgrading search](../concepts/solr4-considerations.md)**  
Before beginning an upgrade of the search subsystems, there are some important issues you should consider.
-   **[Upgrading from Lucene to Solr 4 search](../tasks/lucene-solr4-migration.md)**  
Older versions of Alfresco Content Services use the Lucene search server. You can upgrade from Alfresco Content Services 4.x with the Lucene  search server to Alfresco Content Services 5.2.7 with the Solr 4 search server.
-   **[Upgrading from Solr 1.4 to Solr 4 search](../tasks/solr-solr4-migration.md)**  
Use this information to upgrade from Alfresco Content Services 4.x with the Solr 1.4  search server to Alfresco Content Services 5.2.7  with the Solr 4 search server.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

