# Installing and configuring Search and Insight Engine

Installing Alfresco Search and Insight Engine introduces additional features, including new sharding methods and sharding with SSL. Mutual TLS is not just used to encrypt data in transit, it is also used as an authentication mechanism between the repository and Search and Insight Engine.

It is possible to deploy Alfresco Content Services without mutual TLS between the repository and Search and Insight Engine, however this will expose internal APIs that give full access to the repository without authentication. In such a setup, it is critical to properly protect these APIs.

You may choose to secure Search and Insight Engine with SSL.

> **Note:** When choosing to secure Search and Insight Engine with SSL, be aware that there is a known issue when using Solr 6 where the SSL truststore and keystore passwords are visible as plain text in the Solr 6 process arguments. Alfresco recommends that you ensure the server running Solr 6 is security hardened and access is restricted to admin users only. For more information, see [https://issues.apache.org/jira/browse/SOLR-8897](https://issues.apache.org/jira/browse/SOLR-8897).

**Important:** Alfresco strongly recommends that you use firewalls and other infrastructure means to ensure that the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

You can download the Search and Insight Engine installation file from the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com/). Click Downloads, and then select the version of the product you require.

-   **[Prerequisites and supported platforms](../concepts/supported-stacks.md)**  
The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.
-   **[Deploying Search and Insight Engine using Docker Compose](../tasks/search-insight-deploying.md)**  
Use this information to start up Alfresco Content Services 6.2 or above and Alfresco Search and Insight Engine 2.0 using Docker Compose. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.
-   **[Configuring the Search and Insight Engine subsystem](../concepts/solr-subsystem.md)**  

-   **[Installing and configuring Search and Insight Engine with mutual TLS using the distribution zip](../tasks/solr-install.md)**  
Use this information to install Alfresco Search and Insight Engine on the same machine as Alfresco Content Services with mutual TLS.
-   **[Installing and configuring Search and Insight Engine without mutual TLS using the distribution zip](../tasks/solr-install-withoutSSL.md)**  
Use this information to install Alfresco Search and Insight Engine on the same machine as Alfresco Content Services without mutual TLS.
-   **[Configuring Search and Insight Engine using Admin Console](../tasks/adminconsole-searchservice-solr.md)**  
The topic describes the properties for configuring the Solr 6 search service.
-   **[Search and Insight Engine directory structure](../concepts/solr-directories.md)**  
After you've installed Alfresco Search and Insight Engine, several directories and configuration files related to Solr will be available in the Search and Insight Engine home directory.
-   **[Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md)**  
As a best practice, use the alfresco-insight-engine/solr.in.sh file (Linux-based platform) or alfresco-insight-engine/solr.in.cmd file (Windows-based platform) to set the external configuration that applies to all the Alfresco Search and Insight Engine cores.
-   **[Generating secure keys overview](../concepts/generate-keys-overview.md)**  
This section describes a recommended approach for generating and setting up certificates. It is not required that you use this approach if you have an alternative solution that you already use.
-   **[Solr configuration files](../concepts/solr-config-files.md)**  
When you install Alfresco Search and Insight Engine, several Solr configuration files are made available to you. The section lists the Solr configuration files, their location in the directory structure, and their description.
-   **[Solr security](../concepts/solrsecurity-intro.md)**  
By default, communication between the repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.
-   **[Solr sharding](../concepts/solr-shard-overview.md)**  
Solr sharding involves splitting a single Solr index into multiple parts, which may be on different machines. When the data is too large for one node, you can break it up and store it in sections by creating one or more shards, each containing a unique slice of the index.
-   **[Solr replication](../concepts/solr-replication.md)**  
Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.
-   **[Configuring OpenSearch](../tasks/config-opensearch.md)**  
You can configure OpenSearch to use a search engine proxy.
-   **[Using Filtered search](../concepts/filtered-search.md)**  
Use this information to get an overview of the filtered search capability in Alfresco Share along with its configuration details. It also describes how to define your own custom filters.
-   **[Full text search configuration properties for Solr index](../concepts/search-fts-config.md)**  
The Solr index's full text search properties influence the behaviour of Solr indexes.
-   **[Transactional metadata query](../concepts/intrans-metadata.md)**  
Use this information for an overview on the transactional metadata query. It also describes the process of configuring the optional patch for upgrade.
-   **[Alfresco Index Engine](../concepts/index-engine.md)**  
You can host a separate instance of Alfresco Content Services 6.2 or above with Solr 6 for high scalability and for maximizing the throughput of your Alfresco services. This setup is termed Alfresco Index Engine.

**Parent topic:**[Alfresco Search and Insight Engine](../concepts/search-insight-engine-overview.md)

