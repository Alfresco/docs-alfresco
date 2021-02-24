---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Encrypted content store properties

There are a number of properties that need to be set for the Encrypted content store.

Set these properties in the alfresco-global.properties file.

-   **filecontentstore.subsystem.name**

    Enables the Encrypted Content Store subsystem, for example, `encryptedContentStore`.

-   **cryptodoc.jce.providerName**

    Specifies the Java security provider name. If left blank, it indicates using the default provider. You can also select your own provider by setting this property to the provider class name. If a specific provider name is not set, the system selects the most preferred provider.

-   **cryptodoc.jce.keystore.type**

    Specifies the keystore type, for example, `jceks`.

-   **cryptodoc.jce.keystore.path**

    Specifies the path to the keystore containing the master keys, for example, `/opt/alfresco/my_key.jks`.

-   **cryptodoc.jce.keystore.password**

    Specifies the keystore password, for example, `password`.

-   **cryptodoc.jce.key.aliases**

    Specifies a comma-separated list of the aliases/names of the master keys in the master keystore, for example, `mkey1,mkey2`. These are the aliases used with the keygen tool, for example, encstore.

-   **cryptodoc.jce.key.passwords**

    Specifies a comma-separated list of passwords that Alfresco will use to load the keys from the master key store. The position of the password matches the position of the corresponding key alias in the `cryptodoc.jce.key.aliases` property. This password is used with the keytool command and can be different from the master password. For example, `password,password`.

-   **cryptodoc.jce.keygen.defaultSymmetricKeySize**

    Specifies the key size to use for the symmetric keys that are used to encrypt/decrypt document content.

    **Note:** The default symmetric key size is 128 bits. Users who want better key strength should download and install the [Java Cryptography Extension \(JCE\) Unlimited Strength Jurisdiction Policy Files](http://www.oracle.com/technetwork/java/javase/downloads/jce-7-download-432124.html) for the JRE. 

-   **cryptodoc.jce.keygen.defaultSymmetricAlgorithm**

    Specifies the symmetric key algorithm.


The following properties are used to re-encrypt symmetric keys \(for master key revocation\).

-   **cryptodoc.symmetricKey.reencryption.batch.size**

    Specifies the number of symmetric keys re-encrypted in each batch, for example, `200`.

-   **cryptodoc.symmetricKey.reencryption.numThreads**

    Specifies the number of threads to use to perform re-encryption, for example, `4`.


The keystore path, password, aliases and their password are the common properties you can overwrite to configure Encrypted Content Store using the alfresco-global.properties file.

The JMX interface exposes these properties and allows the user to change them for a running system. For more information, see [Encryption-related JMX operations](../tasks/encrypted-jmx.md)

.

**Parent topic:**[Configuring the Encrypted content store](../concepts/encrypted-config.md)

