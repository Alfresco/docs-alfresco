---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Encrypting properties

The alfresco-global.properties file \(and other subsystem properties file\) holds configuration properties that contain sensitive information or passwords, such as `db.password`. All the properties that can be specified in the alfresco-global.properties file can be encrypted.

Use this information to encrypt any property using the Alfresco Encrypted Properties Management Tool. This tool uses the RSA/ECB/PKCS1PADDING encryption algorithm.

**Note:** This functionality is not related to [Encrypted node properties](encrypted-node-properties.md) \(Encrypted node properties will be deprecated and no longer available from Alfresco Content Services 6.0 and above\) or [cryptographic password hashing](bcrypt-overview.md).

**Important:** Boolean properties, number properties, and properties that contain expressions cannot be encrypted.

The values for some of the properties that may contain sensitive data \(see the list below\) is hidden from JMX whereas other values, including non-sensitive values are shown in JMX. The administrator can set new values for the security-sensitive properties in JMX but they can't see the old value.

Here is the list of protected attributes \(the value for these will be masked in the JMX console and Admin Console UI\):

-   `alfresco.hazelcast.password`
-   `db.password`
-   `mail.password`
-   `solr.solrPassword`
-   `cryptodoc.jce.key.passwords`
-   `cryptodoc.jce.keystore.password`
-   `ldap.synchronization.java.naming.security.credentials`

-   **[Encrypting configuration properties](../tasks/encryption-process-flow.md)**  
You can encrypt sensitive properties in the alfresco-global.properties configuration file.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

