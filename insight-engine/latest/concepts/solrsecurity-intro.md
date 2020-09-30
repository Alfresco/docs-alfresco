---
author: Alfresco Documentation
source: 
---

# Solr security

By default, communication between the repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.

> **Note:** For security reasons, you must generate a new set of keys to secure the Solr communication and access to the Solr Admin Console.

For more information, see [Configuring Search and Insight Engine using Admin Console](../tasks/adminconsole-searchservice-solr.md) and [Generating secure keys overview](generate-keys-overview.md).

-   **[Repository SSL keystores](../tasks/solr-repo-SSL-keystores.md)**  
Use this information to understand the keystores used by the repository for mutual TLS.
-   **[Solr SSL keystores](../concepts/solr-SSL-keystores.md)**  
Solr core has two keystores that it uses for SSL.
-   **[Connecting to the SSL-protected Solr web application](../tasks/ssl-protect-solrwebapp.md)**  
The Solr Admin Web interface allows you to view Solr configuration details, run queries, and analyze document fields.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

