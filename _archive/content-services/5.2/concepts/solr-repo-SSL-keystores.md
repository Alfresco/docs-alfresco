---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Repository SSL keystores

Use this information to understand the keystores used by the repository for SSL.

The repository has two keystores it uses for SSL:

-   `ssl keystore` contains a public/private RSA key pair for the repository
-   `ssl truststore` contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr certificates\)

These keystores can be stored in any location.

Update the following keystore properties in the alfresco-global.properties file to specify the location of the key stores:

`ssl keystore`

|Property|Description|
|--------|-----------|
|`encryption.ssl.keystore.location`|Specifies the keystore location.|
|`encryption.ssl.keystore.provider`|Specifies the keystore provider.|
|`encryption.ssl.keystore.type`|Specifies the keystore type.|
|`encryption.ssl.keystore.keyMetaData.location`|Specifies the keystore metadata file location.|

`ssl truststore`

|Property|Description|
|--------|-----------|
|`encryption.ssl.truststore.location`|Specifies the trust store location.|
|`encryption.ssl.truststore.provider`|Specifies the trust store provider.|
|`encryption.ssl.truststore.type`|Specifies the trust store type.|
|`encryption.ssl.truststore.keyMetaData.location`|Specifies the trust store metadata file location.|

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

