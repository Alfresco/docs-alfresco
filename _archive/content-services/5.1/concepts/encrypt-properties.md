---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Encrypting properties

The alfresco-global.properties file holds configuration properties that contain sensitive information or passwords, such as `db.password`. This section provides information on the properties that are encryptable and the process to encrypt them using the Alfresco Encrypted Properties Management Tool.

**Important:** Boolean properties, number properties, and properties that contain expressions cannot be encrypted. Alfresco One 5.1.5 provides support for encrypting the following configuration properties:

-   `dir.root`
-   `db.driver`
-   `db.username`
-   `db.password`
-   `db.name`
-   `db.pool.validate.query`
-   `ooo.exe`
-   `jodconverter.officeHome`
-   `alfresco_user_store.adminpassword`
-   `dir.license.external`
-   `index.subsystem.name`
-   `cryptodoc.jce.keystore.path`
-   `cryptodoc.jce.keystore.password`
-   `cryptodoc.jce.key.aliases`
-   `cryptodoc.jce.key.passwords`

-   **[Encrypting configuration properties](../tasks/encryption-process-flow.md)**  
You can encrypt sensitive properties in the alfresco-global.properties configuration file.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

