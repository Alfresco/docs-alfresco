---
title: Customizing certificate generation
---
Here is a full list of parameters that allow you to customize your certificates. These parameters will override the default values listed in the `run.sh` and `run.cmd` scripts.

|Parameter|Value|Description|
|---------|-----|-----------|
|`-alfrescoversion`|enterprise \| community

|Sets the type of Alfresco environment. The default value is enterprise.

|
|`-keysize`|1024 \| 2048 \| 4096

|Specifies the RSA key length. The default value is 1024.

|
|`-keystoretype`|PKCS12 \| JKS \| JCEKS

|Sets the type of the keystores (containing private keys). The default value is JCEKS.

|
|`-keystorepass`|Any string

|Specifies the password for the keystores

|
|`-truststoretype`|JKS \| JCEKS

|Sets the type of the truststores (containing public keys). The default value is JCEKS.

|
|`-truststorepass`|Any string

|Specifies the password for the truststores

|
|`-encstorepass`|Any string

|Specifies the password for the encryption keystore

|
|`-encmetadatapass`

|Any string

|Specifies the password for the encryption metadata

|
|`-cacertdname`

| |Sets the Distinguished Name of the CA certificate, starting with a forward-slash.

 Example:

 "/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco CA"

|
|`-repocertdname`

| |Sets the Distinguished Name of the repository certificate, starting with a forward-slash.

 Example:

 "/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco Repository"

|
|`-solrcertdname`

| |Sets the Distinguished Name of the Solr certificate, starting with a forward-slash.

 Example:

 "/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco Repository Client"

|
|`-browsercertdname`| |Sets the Distinguished Name of the browser certificate, starting with a forward-slash.

Example:

"/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Browser Client"|
|`-caservername`|Any string, localhost by default.

|DNS Name of CA Server.

|
|`-alfrescoservername`|Any string, localhost by default.|DNS Name for Alfresco Server.

|
|`-solrservername`|Any string, localhost by default.|DNS Name For Solr Server.

|
|`-alfrescoformat`

|classic \| current

|Default format for certificates: current for IE \| SS 2.0.0+ and classic for previous versions.

|

> **Note:** If you plan to use custom DNames in your certificates, you must use double quotes around the values. For example:

```bash
$ ./run.sh -cacertdname \ 
"/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Windows Alfresco CA" \
-repocertdname "/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Repo" \
-solrcertdname "/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Solr"
```

It is recommended that you set your own passwords when generating certificates. For example:

(For Linux)

```bash
$ ./run.sh -keystorepass “password" -truststorepass “password"
```

(For Windows)

```bash
run.cmd -keystorepass “password" -truststorepass “password"
```
