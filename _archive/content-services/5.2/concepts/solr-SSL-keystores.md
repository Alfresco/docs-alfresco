---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Solr SSL keystores

Solr core has two keystores that it uses for SSL.

These are:

-   `ssl.repo.client.keystore` contains a Solr public/private RSA key pair
-   `ssl.repo.client.truststore` contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr certificates\)

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

