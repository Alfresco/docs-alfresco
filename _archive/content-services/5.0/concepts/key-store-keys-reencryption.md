---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Changing encrypted properties keystore keys and re-encryption

During bootstrap, the repository checks whether the keys in the main encrypted properties keystore have been changed in order to detect any accidental keystore changes.

However if you purposely want to change your keys, you can do so and the repository will re-encrypt any existing encrypted node properties for you. The newly encrypted node properties will be encrypted using the new keys.

Changing your keys involves backing up your keystore to a specific location and creating a new keystore in its place. This can be done in two ways:

-   During bootstrap
-   During runtime \(Enterprise-only\)

**Bootstrap Re-encryption**

Re-encryption occurs during the repository bootstrap. For bootstrap re-encryption, follow the steps below:

1.  Stop the Alfresco server.
2.  Set the following property in the alfresco-global.properties file.

    ```
    encryption.bootstrap.reencrypt=true 
    ```

3.  Backup the current keystore to backup-keystore as shown below:

    ```
    mv keystore backup-keystore
    mv keystore-passwords.properties backup-keystore-passwords.properties
    ```

4.  Copy your new keystore over the old keystore.
5.  Update keystore-passwords.properties with the passwords you used to create the keystore. In other words, update the `keystore.password` property with the keystore password and the `metadata.password` property with the metadata key password.
6.  Restart the Alfresco server.

**Runtime Re-encryption**

Re-encryption occurs while the repository is running. For runtime re-encryption, follow the steps below:

1.  Backup the current keystore to backup-keystore.

    ```
    mv keystore backup-keystore
    mv keystore-passwords.properties backup-keystore-passwords.properties
    ```

2.  Copy your new keystore over the old keystore.
3.  In your JMX console, execute the operation **Encryption** \> **Operations** \> **Encrypt**.

    This will re-read the main and backup keystores and re-encrypt the encrypted properties. The repository can continue to run during this operation; any newly-created encrypted properties will be encrypted with the new key.

    **Note:** Only a single re-encryption can be done at a particular time. If a re-encrypt is already running then subsequent requests have no effect.


**Parent topic:**[Encrypted Node Properties](../concepts/encrypted-node-properties.md)

