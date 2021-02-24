---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Solr SSL key stores

This section describes the key stores used by Solr for SSL.

Solr core has two key stores it uses for SSL:

-   `ssl.repo.client.keystore` contains a Solr public/private RSA key pair
-   `ssl.repo.client.truststore` contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr certificates\)

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

