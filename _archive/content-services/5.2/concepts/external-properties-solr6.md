---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr 6 externalized configuration

As a best practice, use the alfresco-search-services/solr.in.sh file \(Linux-based platform\) or alfresco-search-services/solr.in.cmd file \(Windows-based platform\) to set the external configuration that applies to all the Solr 6 cores.

**Note:** For any property, only the environment variables should be specified in the solr.in.sh/ solr.in.cmd file. For example, `SOLR_SOLR_HOST`, `SOLR_SOLR_PORT`, or `SOLR_ALFRESCO_PORT`.

The following configuration properties are used by an external client, such as Alfresco to talk to Solr. Besides the solr.in.sh/ solr.in.cmd file, you can also set these properties in the shared.properties file.

-   **`solr.host`**

        |**Description**|Specifies the host name that Alfresco uses to talk to Solr.|
    |**JNDI Property**|java:comp/env/solr/host|
    |**Java System Property**|solr.host or solr.solr.host|
    |**Environment Variable**|SOLR\_SOLR\_HOST|
    |**Default Value**|`localhost`|


-   **`solr.port`**

        |**Description**|Specifies the port Solr will listen to.|
    |**JNDI Property**|java:comp/env/solr/port|
    |**Java System Property**|solr.port or solr.solr.port|
    |**Environment Variable**|SOLR\_SOLR\_PORT|
    |**Default Value**|`8983`|


-   **`solr.baseUrl`**

        |**Description**|Specifies the base URL of the Solr server.|
    |**JNDI Property**|java:comp/env/solr/baseurl|
    |**Java System Property**|solr.baseurl or solr.solr.baseurl|
    |**Environment Variable**|SOLR\_SOLR\_BASEURL|
    |**Default Value**|`/solr`|


-   **`solr.content.dir`**

        |**Description**|Specifies the location of the Solr content directory.|
    |**JNDI Property**|java:comp/env/solr/content/dir|
    |**Java System Property**|solr.content.dir or solr.solr.content.dir|
    |**Environment Variable**|SOLR\_SOLR\_CONTENT\_DIR|
    |**Default Value**|<SOLR6\_INSTALL\_LOCATION\>/contentstore|


-   **`solr.model.dir`**

        |**Description**|Specifies the location of the Solr model directory.|
    |**JNDI Property**|java:comp/env/solr/model/dir|
    |**Java System Property**|solr.model.dir or solr.solr.model.dir|
    |**Environment Variable**|SOLR\_SOLR\_MODEL\_DIR|
    |**Default Value**|<SOLR6\_INSTALL\_LOCATION\>/solrhome/alfrescoModel|


**Configurable per core values**

These properties can also be set in the solrcore.properties file.

-   **`alfresco.host`**

        |**Description**|Specifies the externally resolvable host name of the Alfresco web application.|
    |**JNDI Property**|java:comp/env/alfresco/host|
    |**Java System Property**|alfresco.host or solr.alfresco.host|
    |**Environment Variable**|SOLR\_ALFRESCO\_HOST|
    |**Default Value**|`localhost`|


-   **`alfresco.port`**

        |**Description**|Specifies the externally resolvable port number of the Alfresco web application.|
    |**JNDI Property**|java:comp/env/alfresco/port|
    |**Java System Property**|alfresco.port or solr.alfresco.port|
    |**Environment Variable**|SOLR\_ALFRESCO\_PORT|
    |**Default Value**|`8080`|


-   **`alfresco.baseUrl`**

        |**Description**|Configures the base URL to Alfresco web project.|
    |**JNDI Property**|java:comp/env/alfresco/baseurl|
    |**Java System Property**|alfresco.baseurl or solr.alfresco.baseurl|
    |**Environment Variable**|SOLR\_ALFRESCO\_BASEURL|
    |**Default Value**|`/alfresco`|


-   **`alfresco.port.ssl`**

        |**Description**|Specifies the HTTPS port for the Alfresco instance that Solr should track and index.|
    |**JNDI Property**|java:comp/env/alfresco/port/ssl|
    |**Java System Property**|alfresco.port.ssl or solr.alfresco.port.ssl|
    |**Environment Variable**|SOLR\_ALFRESCO\_PORT\_SSL|
    |**Default Value**|`8443`|


-   **`data.dir.root`**

        |**Description**|Specifies the top level directory path for the indexes managed by Solr.|
    |**JNDI Property**|java:comp/env/data/dir/root|
    |**Java System Property**|data.dir.root or solr.data.dir.root|
    |**Environment Variable**|SOLR\_DATA\_DIR\_ROOT|
    |**Default Value**|`[solr_home]`|


These external values can be overridden by the JNDI attributes from `java:comp/env`, Java System properties, or OS environment variables.

Note that:

-   JNDI properties are always lowercase
-   Java System properties are always lowercase
-   Environment variables are always uppercase
-   Property names in the property files are case sensitive

**Additional external configuration when using SSL**

You need to set these properties only if you are configuring Solr 6 with SSL enabled. These properties can also be set in the solrcore.properties file.

-   **`alfresco.secureComms`**

        |**Description**|Instructs Solr if it should talk to Alfresco over HTTP or HTTPS. Set to none if a plain HTTP connection should be used.|
    |**JNDI Property**|java:comp/env/alfresco/securecomms|
    |**Java System Property**|alfresco.securecommssolr.securecomms

|
    |**Environment Variable**|`SOLR_ALFRESCO_SECURECOMMS`|
    |**Default Value**|`none / https`|


-   **`alfresco.encryption.ssl.keystore.passwordFileLocation`**

        |**Description**|Specifies the location of the file containing the password that is used to access the CLIENT keystore.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/passwordfilelocation|
    |**Java System Property**|alfresco.encryption.ssl.keystore.passwordfilelocationsolr.encryption.ssl.keystore.passwordfilelocation

|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PASSWORDFILELOCATION`|


-   **`alfresco.encryption.ssl.truststore.passwordFileLocation`**

        |**Description**|Specifies the location of the file containing the password that is used to access the CLIENT truststore.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/passwordfilelocation|
    |**Java System Property**|alfresco.encryption.ssl.truststore.passwordfilelocation|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PASSWORDFILELOCATION`|


-   **`alfresco.encryption.ssl.keystore.location`**

        |**Description**|Specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/location|
    |**Java System Property**|alfresco.encryption.ssl.keystore.location|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_LOCATION`|


-   **`alfresco.encryption.ssl.truststore.location`**

        |**Description**|Specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/location|
    |**Java System Property**|alfresco.encryption.ssl.truststore.location|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_LOCATION`|


-   **`alfresco.encryption.ssl.truststore.provider`**

        |**Description**|Specifies the Java provider that implements the type attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the truststore type specified is used.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/provider|
    |**Java System Property**|alfresco.encryption.ssl.truststore.provider|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PROVIDER`|

-   **`alfresco.encryption.ssl.keystore.type`**

        |**Description**|Specifies the CLIENT keystore type.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/type|
    |**Java System Property**|alfresco.encryption.ssl.keystore.type|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_TYPE`|
    |**Default Value**|`JCEKS`|


-   **`alfresco.encryption.ssl.keystore.provider`**

        |**Description**|Specifies the Java provider that implements the type attribute \(for example, JCEKS type\). The provider can be left unspecified and the first provider that implements the keystore type specified is used.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/provider|
    |**Java System Property**|alfresco.encryption.ssl.keystore.provider|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PROVIDER`|

-   **`alfresco.encryption.ssl.truststore.type`**

        |**Description**|Specifies the CLIENT truststore type.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/type|
    |**Java System Property**|alfresco.encryption.ssl.truststore.type|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_TYPE`|
    |**Default Value**|`JCEKS`|


**Parent topic:**[Installing and configuring Solr 6](../concepts/solr6-install-config.md)

