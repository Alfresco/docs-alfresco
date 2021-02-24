---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Solr 4 SSL key stores

This section describes the key stores used by Solr 4 for SSL.

Solr 4 core has two key stores it uses for SSL:

-   `ssl.repo.client.keystore` contains a Solr 4 public/private RSA key pair
-   `ssl.repo.client.truststore` contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr 4 certificates\)

**Parent topic:**[Solr 4 security](../concepts/solrsecurity-intro.md)

