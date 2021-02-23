---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, security]
---

# Solr security

By default, communication between Alfresco repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.

**Note:** Every Alfresco installation is supplied with a generic certificate and SSL keys. For security reasons, it is advised that you generate a new set of keys to secure you Solr communication and access to the Solr Admin Console. For more information, see [Configuring Solr](solr-webapp-config.md) and [Generating secure keys for Solr communication](../tasks/generate-keys-solr.md).

-   **[Repository SSL key stores](../concepts/solr-repo-SSL-keystores.md)**  
This section describes the key stores used by the repository for SSL.
-   **[Solr SSL key stores](../concepts/solr-SSL-keystores.md)**  
This section describes the key stores used by Solr for SSL.
-   **[Connecting to the SSL-protected Solr web application](../tasks/ssl-protect-solrwebapp.md)**  
All Solr URLs, which are bundled within Alfresco, are protected by SSL.
-   **[Running Without SSL](../tasks/running-without-ssl.md)**  
Alfresco uses SSL to secure communication between the repository server and the Solr server. In this communication, SSL not only provides encryption, it is also used for authentication. This topic describes how to turn-off SSL and deactivate authentication between Alfresco repository and the Solr server.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

