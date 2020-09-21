---
author: Alfresco Documentation
---

# Keystore directory structure

The `keystores` directory contains the following structure and files.

```
keystores
├── alfresco
│   ├── keystore
│   ├── ssl.keystore
│   ├── ssl.truststore
├── client
│   └── browser.p12
└── solr
│   ├── ssl-repo-client.keystore
│   └── ssl-repo-client.truststore
└── zeppelin
    ├── ssl-repo-client.keystore
    └── ssl-repo-client.truststore
```

**Note:** The `zeppelin` folder is only required if you're an Enterprise customer using Alfresco Search and Insight Engine.

|File name|Description|
|---------|-----------|
|`browser.p12`|The PKCS12 keystore generated from `ssl.keystore` that contains the repository private key and certificate for use in browsers, such as Firefox.

|
|`keystore`|Secret key keystore containing the secret key used to encrypt and decrypt node properties.

|
|`ssl.keystore`|Repository keystore containing the repository private/public key pair and certificate.

|
|`ssl.truststore`|Repository truststore containing certificates that the repository trusts.

|
|`ssl-repo-client.keystore`|Solr SSL keystore containing the Solr private/public key pair and certificate.

|
|`ssl-repo-client.truststore`|Solr truststore containing certificates that the repository trusts.

|

**Parent topic:**[Generating secure keys overview](../concepts/generate-keys-overview.md)

