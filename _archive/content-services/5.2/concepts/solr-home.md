---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Configuring search with Solr 4

Solr 4 is the default search subsystem. Use this information for an overview on the Solr 4 search service and how to configure it.

**Note:** In this information, the **Solr 4** search subsystem is referred to as **Solr**.

**Important:** The Lucene search subsystem is not supported in Alfresco Content Services 5.2.7.

-   **[Solr overview](../concepts/solr-overview.md)**  
Alfresco Content Services supports use of the Solr search platform for searching within the repository.
-   **[Configure Solr search service](../concepts/configure-solr4.md)**  
The way that you configure Alfresco Content Services to use Solr depends on how you have installed Alfresco Content Services. If you install using the setup wizard, Solr 4 is installed and enabled automatically.
-   **[Solr security](../concepts/solrsecurity-intro.md)**  
By default, communication between repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.
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
You can set different debug logging levels for Solr components using the Solr log4j properties.
-   **[Transactional metadata query](../concepts/intrans-metadata.md)**  
Use this information for an overview on the transactional metadata query. It also describes the process of configuring the optional patch for upgrade.
-   **[Configuring OpenSearch](../tasks/config-opensearch.md)**  
You can configure OpenSearch to use a search engine proxy.

**Parent topic:**[Managing search services](../concepts/search-home.md)

