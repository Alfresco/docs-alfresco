---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring search

This section provides an overview on the Solr server and describes how to configure it.

-   **[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)**  
 The following sections describe how to configure search in Alfresco Share.
-   **[Solr overview](../concepts/solr-overview.md)**  
Alfresco supports use of the Solr Enterprise search platform for searching within the Alfresco repository. Also, the existing embedded Lucene index remains available.
-   **[Configuring Solr](../concepts/solr-webapp-config.md)**  
The way that you configure Alfresco to use Solr depends on how you have installed Alfresco.
-   **[Solr security](../concepts/solrsecurity-intro.md)**  
By default, communication between Alfresco repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.
-   **[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)**  
This section provides help for monitoring and resolving any Solr index issues that might arise as a result of a transaction.
-   **[Solr index backup and restore](../concepts/solr-backup-recovery.md)**  
This section describes the process for backing up and restoring the Solr server.
-   **[Lucene index backup and restore](../concepts/backup-lucene-intro.md)**  
This section describes how to back up and restore the Lucene indexes.
-   **[Migrating from Lucene to Solr search](../tasks/lucene-solr-migration.md)**  
This section describes how to migrate from Alfresco Enterprise 3.x with Lucene search server to Alfresco Enterprise 4.x with Solr search server.
-   **[Full text search configuration properties for Solr and Lucene indexes](../concepts/search-fts-config.md)**  
The repository.properties file defines the properties that influence how all indexes behave. This section describes the full text search properties, for the Solr and Lucene indexes, contained in the repository.properties file.
-   **[Setting Solr log4j values](../tasks/set-solr-log4j.md)**  
This topic describes the method of setting the Solr log4j values.
-   **[Calculate the memory needed for Solr nodes](../concepts/solrnodes-memory.md)**  
Solr can have high memory requirements. You can use a formula to calculate the memory needed for the Alfresco internal data structures used in Solr for PATH queries and read permission enforcement.
-   **[Transactional metadata query](../concepts/intrans-metadata.md)**  
Alfresco supports the execution of a subset of the CMIS Query Language \(CMIS QL\) and Alfresco Full Text Search \(AFTS\) queries directly against the database. This feature is called transactional metadata query \(TMDQ\).
-   **[Configuring OpenSearch](../tasks/config-opensearch.md)**  
You can configure OpenSearch to use a search engine proxy.

**Parent topic:**[Administering](../concepts/ch-administering.md)

