---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring search

From Alfresco One 5.0, Solr 4 is the default search subsystem. This section provides an overview on the Solr 4 search service and describes how to configure it.

**Note:** In this documentation, we refer to **Solr 1.4** search subsystem as **Solr**.

**Important:** The Lucene search subsystem is not supported in Alfresco One 5.0.

-   **[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)**  
 The following sections describe how to configure search in Alfresco Share.
-   **[Solr overview](../concepts/solr-overview.md)**  
Alfresco supports use of the Solr 4 search platform for searching within the Alfresco repository.
-   **[Configure Solr 4 search service](../concepts/configure-solr4.md)**  
The way that you configure Alfresco to use Solr 4 depends on how you have installed Alfresco. If you install Alfresco using the setup wizard, Solr 4 is installed and enabled automatically. Solr 4 is installed in the same Tomcat container as Alfresco, and the connection URL is unchanged from the default. The Solr 4 home is within the Alfresco home directory.
-   **[Solr 4 security](../concepts/solrsecurity-intro.md)**  
By default, communication between Alfresco repository and Solr 4 is protected by SSL with mutual authentication. Both the repository and Solr 4 have their own standard public/private key pair. To secure the two-way communication between the repository and Solr 4, you must generate your own keys.
-   **[Solr 4 monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)**  
This section provides help for monitoring and resolving any Solr 4 index issues that might arise as a result of a transaction.
-   **[Solr 4 backup and restore](../concepts/solr-backup-recovery.md)**  
This section describes the process for backing up and restoring the Solr 4 server.
-   **[Solr 4 replication](../concepts/solr-replication.md)**  
Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.
-   **[Full text search configuration properties for Solr 4 index](../concepts/search-fts-config.md)**  
This topic describes the Solr 4 index's full text search properties which influence the behaviour of Solr 4 indexes.
-   **[Using Filtered search](../concepts/filtered-search.md)**  
This section gives an overview on the application of filtered search capability in Alfresco Share along with its configuration details. It also describes how to define your own custom filters.
-   **[Setting Solr 4 log4j values](../tasks/set-solr-log4j.md)**  
You can set different debug logging levels for Alfresco-Solr 4 components using the Solr 4 log4j properties.
-   **[Calculate the memory needed for Solr 4 nodes](../concepts/solrnodes-memory.md)**  
Solr 4 can have high memory requirements. You can use a formula to calculate the memory needed for the Alfresco internal data structures used in Solr 4 for PATH queries and read permission enforcement.
-   **[Transactional metadata query](../concepts/intrans-metadata.md)**  
This section provides an overview on the transactional metadata query. It describes its features and instructions on configuring it. This section also describes the process of configuring the optional patch for upgrade.
-   **[Configuring OpenSearch](../tasks/config-opensearch.md)**  
You can configure OpenSearch to use a search engine proxy.

**Parent topic:**[Administering](../concepts/ch-administering.md)

