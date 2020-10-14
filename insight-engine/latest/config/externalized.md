---
title: Engine externalized configuration
---

As a best practice, use the alfresco-insight-engine/solr.in.sh file (Linux-based platform) or alfresco-insight-engine/solr.in.cmd file (Windows-based platform) to set the external configuration that applies to all the Alfresco Search and Insight Engine cores.

> **Note:** For any property, only the environment variables should be specified in the solr.in.sh/ solr.in.cmd file. For example, `SOLR_SOLR_HOST`, `SOLR_SOLR_PORT`, or `SOLR_ALFRESCO_PORT`.

The following configuration properties are used by an external client, such as Alfresco to talk to Solr. Besides the solr.in.sh/ solr.in.cmd file, you can also set these properties in the alfresco-insight-engine/solrhome/conf/shared.properties file.

> **Important:** From Search and Insight Engine 2.0 the `solr.content.dir` property has been removed. The `solr.content.dir` was a filesystem-based extension of the Solr index. It was used for maintaining a copy of the original data indexed in Solr. The storage the `solr.content.dir` provided is available in Solr itself which means that it can be safely removed from Search and Insight Engine 2.0 onwards. The removal of `solr.content.dir` does not mean a loss of functionality because the Solr storage capabilities still retain a copy of the data originally sent for indexing.

* **`solr.host`**

        |**Description**|Specifies the host name that Alfresco uses to talk to Solr.|
    |**JNDI Property**|java:comp/env/solr/host|
    |**Java System Property**|solr.host or solr.solr.host|
    |**Environment Variable**|SOLR_SOLR_HOST|
    |**Default Value**|`localhost`|

* **`solr.port`**

        |**Description**|Specifies the port Solr will listen to.|
    |**JNDI Property**|java:comp/env/solr/port|
    |**Java System Property**|solr.port or solr.solr.port|
    |**Environment Variable**|SOLR_SOLR_PORT|
    |**Default Value**|`8983`|

* **`solr.baseUrl`**

        |**Description**|Specifies the base URL of the Solr server.|
    |**JNDI Property**|java:comp/env/solr/baseurl|
    |**Java System Property**|solr.baseurl or solr.solr.baseurl|
    |**Environment Variable**|SOLR_SOLR_BASEURL|
    |**Default Value**|`/solr`|

* **`solr.content.dir` (Removed from Alfresco Search and Insight Engine 2.0)**

        |**Description**|Specifies the location of the Solr content directory.|
    |**JNDI Property**|java:comp/env/solr/content/dir|
    |**Java System Property**|solr.content.dir or solr.solr.content.dir|
    |**Environment Variable**|SOLR_SOLR_CONTENT_DIR|
    |**Default Value**|<SOLR6_INSTALL_LOCATION>/contentstore|

* **`solr.model.dir`**

        |**Description**|Specifies the location of the Solr model directory.|
    |**JNDI Property**|java:comp/env/solr/model/dir|
    |**Java System Property**|solr.model.dir or solr.solr.model.dir|
    |**Environment Variable**|SOLR_SOLR_MODEL_DIR|
    |**Default Value**|<SOLR6_INSTALL_LOCATION>/solrhome/alfrescoModel|

### Configurable per core values

These properties can also be set in the alfresco-insight-engine/solrhome/templates/rerank/conf/solrcore.properties file.

* **`alfresco.host`**

        |**Description**|Specifies the externally resolvable host name of the Alfresco web application.|
    |**JNDI Property**|java:comp/env/alfresco/host|
    |**Java System Property**|alfresco.host or solr.alfresco.host|
    |**Environment Variable**|SOLR_ALFRESCO_HOST|
    |**Default Value**|`localhost`|

* **`alfresco.port`**

        |**Description**|Specifies the externally resolvable port number of the Alfresco web application.|
    |**JNDI Property**|java:comp/env/alfresco/port|
    |**Java System Property**|alfresco.port or solr.alfresco.port|
    |**Environment Variable**|SOLR_ALFRESCO_PORT|
    |**Default Value**|`8080`|

* **`alfresco.baseUrl`**

        |**Description**|Configures the base URL to Alfresco web project.|
    |**JNDI Property**|java:comp/env/alfresco/baseurl|
    |**Java System Property**|alfresco.baseurl or solr.alfresco.baseurl|
    |**Environment Variable**|SOLR_ALFRESCO_BASEURL|
    |**Default Value**|`/alfresco`|

* **`alfresco.port.ssl`**

        |**Description**|Specifies the HTTPS port for the Alfresco instance that Solr should track and index.|
    |**JNDI Property**|java:comp/env/alfresco/port/ssl|
    |**Java System Property**|alfresco.port.ssl or solr.alfresco.port.ssl|
    |**Environment Variable**|SOLR_ALFRESCO_PORT_SSL|
    |**Default Value**|`8443`|

* **`data.dir.root`**

        |**Description**|Specifies the top level directory path for the indexes managed by Solr.|
    |**JNDI Property**|java:comp/env/data/dir/root|
    |**Java System Property**|data.dir.root or solr.data.dir.root|
    |**Environment Variable**|SOLR_DATA_DIR_ROOT|
    |**Default Value**|`[solr_home]`|

These external values can be overridden by the JNDI attributes from `java:comp/env`, Java System properties, or OS environment variables.

Note that:

* JNDI properties are always lowercase
* Java System properties are always lowercase
* Environment variables are always uppercase
* Property names in the property files are case sensitive

### Additional external configuration when using SSL

You need to set these properties only if you are configuring Search and Insight Engine with SSL. These properties can also be set in the solrcore.properties file.

* **`alfresco.secureComms`**

        |**Description**|Instructs Solr if it should talk to Alfresco over HTTP or HTTPS. Set to none if a plain HTTP connection should be used.|
    |**JNDI Property**|java:comp/env/alfresco/securecomms|
    |**Java System Property**|alfresco.securecommssolr.securecomms
|
    |**Environment Variable**|`SOLR_ALFRESCO_SECURECOMMS`|
    |**Default Value**|`none / https`|

* **`alfresco.encryption.ssl.keystore.passwordFileLocation`**

        |**Description**|Specifies the location of the file containing the password that is used to access the CLIENT keystore.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/passwordfilelocation|
    |**Java System Property**|alfresco.encryption.ssl.keystore.passwordfilelocationsolr.encryption.ssl.keystore.passwordfilelocation
|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PASSWORDFILELOCATION`|

* **`alfresco.encryption.ssl.truststore.passwordFileLocation`**

        |**Description**|Specifies the location of the file containing the password that is used to access the CLIENT truststore.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/passwordfilelocation|
    |**Java System Property**|alfresco.encryption.ssl.truststore.passwordfilelocation|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PASSWORDFILELOCATION`|

* **`alfresco.encryption.ssl.keystore.location`**

        |**Description**|Specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/location|
    |**Java System Property**|alfresco.encryption.ssl.keystore.location|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_LOCATION`|

* **`alfresco.encryption.ssl.truststore.location`**

        |**Description**|Specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/location|
    |**Java System Property**|alfresco.encryption.ssl.truststore.location|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_LOCATION`|

* **`alfresco.encryption.ssl.truststore.provider`**

        |**Description**|Specifies the Java provider that implements the type attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the truststore type specified is used.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/provider|
    |**Java System Property**|alfresco.encryption.ssl.truststore.provider|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PROVIDER`|

* **`alfresco.encryption.ssl.keystore.type`**

        |**Description**|Specifies the CLIENT keystore type.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/type|
    |**Java System Property**|alfresco.encryption.ssl.keystore.type|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_TYPE`|
    |**Default Value**|`JCEKS`|

* **`alfresco.encryption.ssl.keystore.provider`**

        |**Description**|Specifies the Java provider that implements the type attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the keystore type specified is used.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/keystore/provider|
    |**Java System Property**|alfresco.encryption.ssl.keystore.provider|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PROVIDER`|

* **`alfresco.encryption.ssl.truststore.type`**

        |**Description**|Specifies the CLIENT truststore type.|
    |**JNDI Property**|java:comp/env/alfresco/encryption/ssl/truststore/type|
    |**Java System Property**|alfresco.encryption.ssl.truststore.type|
    |**Environment Variable**|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_TYPE`|
    |**Default Value**|`JCEKS`|
