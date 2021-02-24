---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Installing and configuring Solr 6

When you install Alfresco Content Services 5.2.7 using the setup wizard \(installer\), Solr 4 is installed by default. For additional search functionality, you can install Alfresco Search Services with Solr 6 which introduces additional features, including new sharding methods and sharding with SSL. It can optionally be configured with or without SSL.

You may choose to secure Alfresco Search Services by installing Solr 6 with SSL enabled.

**Note:** When choosing to secure Solr 6 with SSL, be aware that there is a known issue when using Solr 6 where the SSL truststore and keystore passwords are visible as plain text in the Solr 6 process arguments. Alfresco recommends that you ensure the server running Solr 6 is security hardened and access is restricted to admin users only. For more information, see [https://issues.apache.org/jira/browse/SOLR-8897](https://issues.apache.org/jira/browse/SOLR-8897).

Alfresco Search Services 1.2 supports all Alfresco Content Services 5.2.7 certified platforms and components. For more information, see [Supported Platforms](supported-platforms-ACS.md).

-   **[Installing and configuring Solr 6 without SSL](../tasks/solr6-install-withoutSSL.md)**  
Use this information to install Alfresco Search Services with Solr 6 on the same machine as Alfresco without SSL.
-   **[Installing and configuring Solr 6 with SSL enabled](../tasks/solr6-install.md)**  
Use this information to install Alfresco Search Services with Solr 6 with SSL enabled.
-   **[Configuring the Solr 6 using Admin Console](../tasks/adminconsole-searchservice-solr6.md)**  
The topic describes the properties for configuring the Solr 6 search service.
-   **[Solr 6 subsystem](../concepts/solr6-subsystem.md)**  
Search is contained in a subsystem and it has an implementation of Solr 6.
-   **[Solr 6 directory structure](../concepts/solr6-directories.md)**  
After you have installed Solr 6, several directories and configuration files related to Solr will be available in the Solr 6 home directory.
-   **[Solr 6 externalized configuration](../concepts/external-properties-solr6.md)**  
As a best practice, use the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\) to set the external configuration that applies to all the Solr 6 cores.

**Parent topic:**[Configuring Alfresco Search Services with Solr 6](../concepts/solr6-home.md)

