---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, security]
---

# Solr security

Communications between Alfresco repository and Solr are protected by SSL with mutual authentication.

Both the repository and Solr have their own public/private key pair, signed by an Alfresco Certificate Authority, which are stored in their own respective keystores. These keystores are bundled with Alfresco. You can also create your own keystores. For an overview on how to create an SSL public/private key and certificate for the repository, see [Generating Repository SSL Keystores](../tasks/generate-repo-ssl-keystore.md).

Keystores are used also to protect repository and Solr communications using encryption and mutual authentication. To do this, keystores store RSA keys and certificates.

It is assumed that the keystore files are stored in alf\_data. Place the keystore files from the directory repository/config/alfresco/keystore in the $ALF\_DATA/keystore directory.

-   **[Repository SSL key stores](../concepts/solr-repo-SSL-keystores.md)**  
This section describes the key stores used by the repository for SSL.
-   **[Solr SSL key stores](../concepts/solr-SSL-keystores.md)**  
This section describes the key stores used by Solr for SSL.
-   **[Connecting to the SSL-protected Solr web application](../tasks/ssl-protect-solrwebapp.md)**  
All Solr URLs, which are bundled within Alfresco, are protected by SSL.
-   **[Generating Repository SSL Keystores](../tasks/generate-repo-ssl-keystore.md)**  
This task describes how to create an SSL public/private keystore and a certificate for the repository.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

