---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Keystore configuration

This topic describes how to configure the main and backup keystores using the alfresco-global.properties file.

To configure the main keystore, set the following properties in the alfresco-global.properties file:

|Property|Description with example|
|--------|------------------------|
|`encryption.keystore.location`|Specifies the location of the main keystore.`encryption.keystore.location=${dir.keystore}/keystore`

|
|`encryption.keystore.keyMetaData.location`|Specifies the location of the main keystore's metadata file.`encryption.keystore.keyMetaData.location=${dir.keystore}`

|
|`encryption.keystore.provider`|Specifies the main keystore provider.|
|`encryption.keystore.type`|Specifies the main keystore type.`encryption.keystore.type=JCEKS`

|
|`encryption.keystore.backup.location`|Specifies the location of the backup keystore.`encryption.keystore.backup.location=${dir.keystore}/backup-keystore`

|
|`encryption.keystore.backup.keyMetaData.location`|Specifies the location of the backup keystore's metadata file.`encryption.keystore.backup.keyMetaData.location=${dir.keystore}`

|
|`encryption.keystore.backup.provider`|Specifies the backup keystore provider.|
|`encryption.keystore.backup.type`|Specifies the backup keystore type. `encryption.keystore.backup.type=JCEKS`

|

Some other general encryption properties are:

```
encryption.keySpec.class=org.alfresco.encryption.DESEDEKeyGenerator
encryption.keyAlgorithm=DESede
encryption.cipherAlgorithm=DESede/CBC/PKCS5Padding
```

Because of these encryption properties, the keystores and metadata files can be easily located. Also, the metadata file uses a clear text password to access the keystore. For this reason, appropriate operating system permissions should be applied so that the files cannot be accidentally changed nor read by anyone other than an administrator and the username running the repository.

Each keystore must have a corresponding keystore metadata file. This file contains the passwords, its keys, and other metadata relevant to the keystore. The metadata file must contain three entries:

-   `aliases`=<active key aliases in the key store\>
-   `keystore.password`=<key store password\>
-   `metadata.password`=<metadata key password\>

At bootstrap, the repository checks if the metadata key in the main keystore has been changed \(unless running in the fallback mode, in which case the backup keystore is checked instead\). This prevents accidental changes to the keystore. If it detects that the metadata key has been changed, an exception will occur and the bootstrap will stop.

**Parent topic:**[Managing Alfresco keystores](../concepts/alf-keystores.md)

