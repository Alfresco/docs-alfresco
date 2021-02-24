---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Configuring Alfresco Search Services with Solr 6

Alfresco Content Services 5.2.7 provides search capabilities for searching content within the repository using Solr 6.

In all previous Alfresco Content Services versions, Solr.war was bundled with the repository. With Alfresco Content Services 5.2.7, you no longer deploy a Solr.war to your application server. Solr 6 is an independently executable standalone application powered by a Jetty server.

Alfresco Content Services uses Solr 4 as the default search service index. For an improved and efficient search functionality, you can upgrade to Alfresco Search Services with Solr 6.

-   **[Solr 6 features and enhancements](../concepts/solr6-overview.md)**  
Alfresco Content Services 5.2.7 comes with new enhancements to Alfresco’s search capabilities. Use this information to know about the new features of the Alfresco Search Services 1.2.
-   **[Installing and configuring Solr 6](../concepts/solr6-install-config.md)**  
When you install Alfresco Content Services 5.2.7 using the setup wizard \(installer\), Solr 4 is installed by default. For additional search functionality, you can install Alfresco Search Services with Solr 6 which introduces additional features, including new sharding methods and sharding with SSL. It can optionally be configured with or without SSL.
-   **[Upgrading from Solr 4 to Solr 6 search](../tasks/solr4-solr6-migration.md)**  
Use this information to upgrade from Alfresco One 5.1 with the Solr 4  search index server to Alfresco Content Services 5.2.7  with the Solr 6 search index server.
-   **[Upgrading from Alfresco Search Services 1.0 or 1.1 to Alfresco Search Services 1.2](../tasks/upgrade-ss1.0-ss1.1.md)**  
Use this information to upgrade from Alfresco Search Services 1.0 or 1.1 to Alfresco Search Services 1.2 with the Solr 6 search index server.
-   **[Backing up Solr 6](../tasks/solr6-backup.md)**  
There are a number of ways to back up Solr 6. You can set the Solr indexes backup properties either by using the Admin Console in Share, by editing the alfresco-global.properties file, or by using a JMX client, such as JConsole.
-   **[Solr 6 sharding methods](../concepts/solr6-shard-approaches.md)**  
When an index grows too large to be stored on a single search server, it can be distributed across multiple search servers. This is known as sharding. The distributed/sharded index can then be searched using Alfresco/Solr's distributed search capabilities.
-   **[Document Fingerprints](../concepts/fingerprinting.md)**  
Alfresco Content Services 5.2.7 provides support for Document Fingerprints to find related documents. Document Fingerprinting is performed by algorithms that map data, such as documents and files to shorter text strings, also known as fingerprints. This feature is exposed as a part of the Alfresco Full Text Search Query Language.

**Parent topic:**[Managing search services](../concepts/search-home.md)

