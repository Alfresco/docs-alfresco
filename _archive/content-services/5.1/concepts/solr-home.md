---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring search

From Alfresco One 5.0 onwards, Solr 4 is the default search subsystem. Use this information for an overview on the Solr 4 search service and how to configure it.

**Note:** In this information, we refer to **Solr 4** search subsystem as **Solr**.

**Important:** The Lucene search subsystem is not supported in Alfresco One 5.1.5.

-   **[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)**  
 The following sections describe how to configure search in Alfresco Share.
-   **[Solr overview](../concepts/solr-overview.md)**  
Alfresco supports use of the Solr search platform for searching within the Alfresco repository.
-   **[Configure Solr search service](../concepts/configure-solr4.md)**  
The way that you configure Alfresco to use Solr depends on how you have installed Alfresco. If you install Alfresco using the setup wizard, Solr 4 is installed and enabled automatically.
-   **[Solr security](../concepts/solrsecurity-intro.md)**  
By default, communication between Alfresco repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.
-   **[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)**  
Help for monitoring and resolving any Solr index issues that might arise as a result of a transaction.
-   **[Solr backup and restore](../concepts/solr-backup-recovery.md)**  
Use this information to backup and restore the Solr server.
-   **[Solr replication](../concepts/solr-replication.md)**  
Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.
-   **[Solr sharding](../concepts/solr-shard-overview.md)**  
Solr sharding involves splitting a single Solr index into multiple parts, which may be on different machines. When the data is too large for one node, you can break it up and store it in sections by creating one or more shards, each containing a unique slice of the index.
-   **[Full text search configuration properties for Solr index](../concepts/search-fts-config.md)**  
The Solr index's full text search properties influence the behaviour of Solr indexes.
-   **[Using Filtered search](../concepts/filtered-search.md)**  
Use this information for an overview of the filtered search capability in Alfresco Share along with its configuration details. It also describes how to define your own custom filters.
-   **[Setting Solr logging](../tasks/set-solr-log4j.md)**  
You can set different debug logging levels for Alfresco-Solr components using the Solr log4j properties.
-   **[Calculate the memory needed for Solr nodes](../concepts/solrnodes-memory.md)**  
Solr can have high memory requirements. You can use a formula to calculate the memory needed for the Alfresco internal data structures used in Solr for PATH queries and read permission enforcement.
-   **[Transactional metadata query](../concepts/intrans-metadata.md)**  
Use this information for an overview on the transactional metadata query. It also describes the process of configuring the optional patch for upgrade.
-   **[Configuring OpenSearch](../tasks/config-opensearch.md)**  
You can configure OpenSearch to use a search engine proxy.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

