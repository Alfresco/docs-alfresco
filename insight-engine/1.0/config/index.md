---
title: Overview
---

Use the following information to configure Search and Insight Engine.

## Search and Insight Engine subsystem

There is a search subsystem and it can be used to connect to Search and Insight Engine (which is based on Solr 6).

Just like all previous versions of Solr, the activation and configuration of the Search and Insight Engine subsystem can be done by using either the `alfresco-global.properties` file or the Admin Console (see [Configuring using the Admin Console](#configure-using-the-admin-console)).

If you haven't set the following Solr-related properties in the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file, add these:

```bash
### Solr indexing ###
index.subsystem.name=solr6
solr.secureComms=https
solr.port=8983
solr.host=<hostname> [The host name where the Solr instance is located]
solr.baseUrl=/solr
```

These configuration properties are used by Alfresco Content Services to talk to Search and Insight Engine.

## Configure using the Admin Console

The topic describes the properties for configuring the Solr 6 search service.

1. Open the Admin Console. For more information, see [Launching the Admin Console LINK LINK](https://docs.alfresco.com/6.0/tasks/adminconsole-open.html).

2. In the Repository Services section, click **Search Service** to see the Search Service page.

3. In the **Search Service** section, select **Solr 6** from the **Search Service In Use** list.

4. Set the Search and Insight Engine properties:

    |Solr search property|Description|
    |--------------------|-----------|
    |Content Tracking Enabled|This setting can be used to disable Solr 6 tracking by separate Solr instance(s) configured to track this server, for example `Yes`|
    |Solr Port (Non-SSL)|This specifies the application server's http port (non-secure) on which Solr 6 is running. This is only used if Solr 6 is configured to run without secure communications, for example `8080`|
    |Solr base URL|This specifies the base URL for the Solr 6 web application. Adjusting the URL does not change where Solr is hosted, it changes where Alfresco Content Services looks for Solr, for example `/solr6`.|
    |Solr Hostname|his specifies the hostname on which the Solr 6 server is running. Use localhost if running on the same machine, for example `localhost`.|
    |Solr SSL Port|his specifies the application server's https port on which Solr 6 is running, for example `8443`.|
    |Auto Suggest Enabled|This specifies that the Solr 6 auto-suggest feature is enabled. This feature presents suggestions of popular queries as a user types their query into the search box or text box, for example `0` .|
    |Last Indexed Transaction|This specifies the transaction ID most recently indexed by Solr 6, for example `17`.|
    |Approx Index Time Remaining|This specifies the estimated time that Solr 6 will take to complete indexing the current outstanding transactions, for example 0 seconds.|
    |Disk Usage (GB)|This specifies the disk space used by the latest version of the Solr 6 index. Allow at least double this value for background indexing management, for example `0.001748`.|
    |Index Lag|This specifies the time that indexing is currently behind the repository updates, for example `0 seconds`.|
    |Approx Transactions to Index|This specifies the estimated number of outstanding transactions that require indexing, for example 0.|
    |Indexing in Progress|This specifies if Solr 6 is currently indexing outstanding transactions, for example  .|
    |Memory Usage (GB)|This specifies the current memory usage. The value may vary due to transient memory used by background processing. The value does not include Lucene related caches, for example `No`.|
    |Backup Location (Main Store)|This specifies the location where the index backup for the main WorkspaceStore is stored on the Solr 6 server, for example `${dir.root}/solr6Backup/alfresco`.|
    |Backup Cron Expression (Main Store)|This specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 2 \* * ? meaning the backup is performed daily at 02.00.|
    |Backups To Keep (Main Store)|This specifies the number of backups to keep (including the latest backup), for example `3`.|
    |Backup Location (Archive Store properties)|This specifies the location where the index backup for ArchiveStore is stored on the Solr 6 server, for example `${dir.root}/solr6Backup/archive`.|
    |Backup Cron Expression (Archive Store properties)|This specifies a unix-like expression, using the same syntax as the cron command, that defines when backups occur. The default value is 0 0 4 \* * ? meaning the backup is performed daily at 04.00.|
    |Backups To Keep (Archive Store properties)|This specifies the number of backups to keep, for example `3`.|
    |CMIS Query|This specifies the default mode which defines if and when the database should be used to support a subset of the CMIS Query Language, for example `Use database if possible`.|
    |Alfresco Full Text Search|This specifies the default mode which defines if and when the database should be used to support a subset of the Alfresco Full Text Search, for example Use database if possible.|

5. Click **Save** to apply the changes you have made to the properties.

If you do not want to save the changes, click **Cancel**.

## Search and Insight Engine directory structure

After you've installed Search and Insight Engine, several directories and configuration files related to Solr will be available in the Search and Insight Engine home directory.

The Search and Insight Engine distribution (`alfresco-insight-engine-distribution-1.0.x.zip`) contains the following artifacts:

### solrhome directory

This is the Solr configuration directory that is specific to Alfresco. It contains the following sub-folders and files:

|Folder/File|Description|
|-----------|-----------|
|alfrescoModels|When you install Search and Insight Engine, it creates an empty `alfrescoModels` directory. When Solr first talks to Alfresco, it pulls the model definitions into this directory.|
|conf|This directory contains the `shared.properties` file. See [Search and Insight Engine externalized configuration](#search-and-insight-engine-externalized-configuration).|
|templates|This directory contains the core templates that define the base configuration for a new Solr core with some configuration properties. This directory also contains the `/rerank/conf/solrcore.properties` file which you can use to customize the Solr cores.|
|solr.xml|This file defines the Solr web application context. For more information see [Format of solr.xml](https://lucene.apache.org/solr/guide/6_6/format-of-solr-xml.html){:target="_blank"}|
|data|This folder is generated when a Solr core is created and is where Solr indexes are stored. The default location of the folder is `/opt/alfresco-search-services/data`.|

### logs directory

This directory contains the Solr-specific logging configuration file.

|Folder/File|Description|
|-----------|-----------|
|log4j.properties|This is the configuration file for Solr-specific logging. The Solr log file can be found at `<SOLR_HOME>/logs/solr.log`.|

* `solr directory`: This directory contains the Solr binaries and runtime Java library files.
* `contentstore` directory: This directory does not appear in the `alfresco-insight-engine-distribution-1.0.x.zip` file. It is automatically created after your Solr cores are created and they start indexing. It stores the cache of all the content.
* `solr.in.cmd`: Use this file to specify additional Solr configuration options for Windows.
* `solr.in.sh`: Use this file to specify additional Solr configuration options for non-Windows platforms, such as Linux and Mac OS X.
* `README.MD`: This file provides version information for Alfresco Content Services, Search and Insight Engine, and Solr.

### Search and Insight Engine externalized configuration

As a best practice, use the `alfresco-insight-engine/solr.in.sh` file (Linux-based platform) or `alfresco-insight-engine/solr.in.cmd` file (Windows-based platform) to set the external configuration that applies to all the Search and Insight Engine cores.

> **Note:** For any property, only the environment variables should be specified in the solr.in.sh/ solr.in.cmd file. For example, `SOLR_SOLR_HOST`, `SOLR_SOLR_PORT`, or `SOLR_ALFRESCO_PORT`.

The following configuration properties are used by an external client, such as Alfresco to talk to Solr. Besides the solr.in.sh/ solr.in.cmd file, you can also set these properties in the `alfresco-insight-engine/solrhome/conf/shared.properties` file.

#### `solr.host`

|Description|Specifies the host name that Alfresco uses to talk to Solr.|
|JNDI Property|`java:comp/env/solr/host`|
|Java System Property|`solr.host or solr.solr.host`|
|Environment Variable|`SOLR_SOLR_HOST`|
|Default Value|`localhost`|

#### `solr.port`

|Description|Specifies the port Solr will listen to.|
|JNDI Property|`java:comp/env/solr/port`|
|Java System Property|`solr.port or solr.solr.port`|
|Environment Variable|`SOLR_SOLR_PORT`|
|Default Value|`8983`|

#### `solr.baseUrl`

|Description|Specifies the base URL of the Solr server.|
|JNDI Property|`java:comp/env/solr/baseurl`|
|Java System Property|`solr.baseurl or solr.solr.baseurl`|
|Environment Variable|`SOLR_SOLR_BASEURL`|
|Default Value|`/solr`|

#### `solr.content.dir`

|Description|Specifies the location of the Solr content directory.|
|JNDI Property|`java:comp/env/solr/content/dir`|
|Java System Property|`solr.content.dir or solr.solr.content.dir`|
|Environment Variable|`SOLR_SOLR_CONTENT_DIR`|
|Default Value|`<SOLR6_INSTALL_LOCATION>/contentstore`|

#### `solr.model.dir`

|Description|Specifies the location of the Solr model directory.|
|JNDI Property|`java:comp/env/solr/model/dir`|
|Java System Property|`solr.model.dir or solr.solr.model.dir`|
|Environment Variable|`SOLR_SOLR_MODEL_DIR`|
|Default Value|`<SOLR6_INSTALL_LOCATION>/solrhome/alfrescoModel`|

### Configurable per core values

These properties can also be set in the `alfresco-insight-engine/solrhome/templates/rerank/conf/solrcore.properties` file.

#### `alfresco.host`

|Description|Specifies the externally resolvable host name of the Alfresco web application.|
|JNDI Property|`java:comp/env/alfresco/host`|
|Java System Property|`alfresco.host or solr.alfresco.host`|
|Environment Variable|`SOLR_ALFRESCO_HOST`|
|Default Value|`localhost`|

#### `alfresco.port`

|Description|Specifies the externally resolvable port number of the Alfresco web application.|
|JNDI Property|`java:comp/env/alfresco/port`|
|Java System Property|`alfresco.port or solr.alfresco.port`|
|Environment Variable|`SOLR_ALFRESCO_PORT`|
|Default Value|`8080`|

#### `alfresco.baseUrl`

|Description|Configures the base URL to Alfresco web project.|
|JNDI Property|`java:comp/env/alfresco/baseurl`|
|Java System Property|`alfresco.baseurl or solr.alfresco.baseurl`|
|Environment Variable|`SOLR_ALFRESCO_BASEURL`|
|Default Value|`/alfresco`|

#### `alfresco.port.ssl`

|Description|Specifies the HTTPS port for the Alfresco instance that Solr should track and index.|
|JNDI Property|`java:comp/env/alfresco/port/ssl`|
|Java System Property|`alfresco.port.ssl or solr.alfresco.port.ssl`|
|Environment Variable|`SOLR_ALFRESCO_PORT_SSL`|
|Default Value|`8443`|

#### `data.dir.root`

|Description|Specifies the top level directory path for the indexes managed by Solr.|
|JNDI Property|`java:comp/env/data/dir/root`|
|Java System Property|`data.dir.root or solr.data.dir.root`|
|Environment Variable|`SOLR_DATA_DIR_ROOT`|
|Default Value|`[solr_home]`|

These external values can be overridden by the JNDI attributes from `java:comp/env`, Java System properties, or OS environment variables.

Note that:

* JNDI properties are always lowercase
* Java System properties are always lowercase
* Environment variables are always uppercase
* Property names in the property files are case sensitive

### Additional external configuration when using SSL

You need to set these properties only if you are configuring Search and Insight Engine with SSL. These properties can also be set in the `solrcore.properties` file.

#### `alfresco.secureComms`

|Description|Instructs Solr if it should talk to Alfresco over HTTP or HTTPS. Set to none if a plain HTTP connection should be used.|
|JNDI Property|`java:comp/env/alfresco/securecomms`|
|Java System Property|`alfresco.securecommssolr.securecomms`|
|Environment Variable|`SOLR_ALFRESCO_SECURECOMMS`|
|Default Value|`none / https`|

#### `alfresco.encryption.ssl.keystore.passwordFileLocation`

|Description|Specifies the location of the file containing the password that is used to access the CLIENT keystore.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/keystore/passwordfilelocation`|
|Java System Property|`alfresco.encryption.ssl.keystore.passwordfilelocationsolr.encryption.ssl.keystore.passwordfilelocation`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PASSWORDFILELOCATION`|

#### `alfresco.encryption.ssl.truststore.passwordFileLocation`

|Description|Specifies the location of the file containing the password that is used to access the CLIENT truststore.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/truststore/passwordfilelocation`|
|Java System Property|`alfresco.encryption.ssl.truststore.passwordfilelocation`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PASSWORDFILELOCATION`|

#### `alfresco.encryption.ssl.keystore.location`

|Description|Specifies the CLIENT keystore location reference. If the keystore is file-based, the location can reference any path in the file system of the node where the keystore is located.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/keystore/location`|
|Java System Property|`alfresco.encryption.ssl.keystore.location`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_LOCATION`|

#### `alfresco.encryption.ssl.truststore.location`

|Description|Specifies the CLIENT truststore location reference. If the truststore is file-based, the location can reference any path in the file system of the node where the truststore is located.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/truststore/location`|
|Java System Property|`alfresco.encryption.ssl.truststore.location`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_LOCATION`|

#### `alfresco.encryption.ssl.truststore.provider`

|Description|Specifies the Java provider that implements the type attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the truststore type specified is used.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/truststore/provider`|
|Java System Property|`alfresco.encryption.ssl.truststore.provider`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_PROVIDER`|

#### `alfresco.encryption.ssl.keystore.type`

|Description|Specifies the CLIENT keystore type.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/keystore/type`|
|Java System Property|`alfresco.encryption.ssl.keystore.type`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_TYPE`|
|Default Value|`JCEKS`|

#### `alfresco.encryption.ssl.keystore.provider`

|Description|Specifies the Java provider that implements the type attribute (for example, JCEKS type). The provider can be left unspecified and the first provider that implements the keystore type specified is used.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/keystore/provider`|
|Java System Property|`alfresco.encryption.ssl.keystore.provider`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_KEYSTORE_PROVIDER`|

#### `alfresco.encryption.ssl.truststore.type`

|Description|Specifies the CLIENT truststore type.|
|JNDI Property|`java:comp/env/alfresco/encryption/ssl/truststore/type`|
|Java System Property|`alfresco.encryption.ssl.truststore.type`|
|Environment Variable|`SOLR_ALFRESCO_ENCRYPTION_SSL_TRUSTSTORE_TYPE`|
|Default Value|`JCEKS`|

## Solr configuration files

When you install Search and Insight Engine, several Solr configuration files are made available to you. This section lists the Solr configuration files, their location in the directory structure, and their description.

> **Note:** Some of these files are only available once Search and Insight Engine has been started for the first time.

|Configuration File|Location|Description|
|------------------|--------|-----------|
|schema.xml|`<SOLR_HOME>/solrhome/<core>/conf`. For example `<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This file defines the schema for the index including field type definitions with associated analyzers. It contains details about the fields that you can include in your document and also describes how those fields can be used when adding documents to the index or when querying those fields. The properties of this file are managed by an expert user.|
|core.properties|`<SOLR_HOME>/solrhome/alfresco/core.properties` or `<SOLR_HOME>/solrhome/archive/core.properties`|This file specifies the cores to be used by Solr.|
|solrconfig.xml|`<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This file specifies the parameters for configuring Solr. Also, the Solr search components are added to this file. The properties of this file are managed by an expert Administrator user.|
|solrcore.properties| `<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This is the property configuration file for a core. Solr supports system property substitution, so properties that need substitution can be put in to this file. There is one `solrcore.properties` file in each core's configuration directory. For details, see [Solr core configuration properties]({% link insight-engine/1.0/config/properties.md %}). The properties of this file are managed by an Administrator user.|
|context.xml|`<SOLR_HOME>`|This file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
|ssl.repo.client.keystore|`<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This keystore contains the Solr public/private RSA key pair.|
|ssl-keystore-passwords.properties|`<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This file contains the password information for `ssl.repo.client.keystore`.|
|ssl.repo.client.truststore|`<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This keystore contains the trusted Alfresco Certificate Authority certificate (which has been used to sign both the repository and Solr certificates)|
|ssl-truststore-passwords.properties|`<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`|This file contains the password information for `ssl.repo.client.truststore`.|

> **Note:** The `solrcore.properties` configuration file is the property configuration file for a Solr core. There is one `solrcore.properties` file in each core's configuration directory. See [Solr core configuration properties]({% link insight-engine/1.0/config/properties.md %}) for more.

## Alfresco Index Engine

You can host a separate instance of Alfresco Content Services 6.0 or above with Solr 6 for high scalability and for maximizing the throughput of your Alfresco services. This setup is termed Alfresco Index Engine.

This setup shows a single repository database and content store. There are four nodes with Alfresco/Share and two nodes with Solr, all accessing the content simultaneously. This set up provides a higher level of availability, reliability, and scalability, thereby maximizing the throughput of various Alfresco services. Nodes in a cluster are positioned behind a load balancer that delegates requests to cluster members based on any one member’s ability/availability to handle the load.

Each Alfresco/Share instance is deployed into its own Tomcat servlet container. Alfresco services and CPU runtime footprint are optimized for high throughput under heavy concurrency with such a deployment. The load balancer fronts the cluster, and directs traffic to the member of the cluster most able to handle the current request.

> **Note:** All the servers in a cluster should have static IP addresses assigned to them.

![]({% link insight-engine/images/cluster-throughput.png %})

In this deployment scenario the following flows are present:

* Client flow:
  * Client sends the request to the main load balancer to reach Share application.
  * Main load balancer analyses the load and redirects the client to one of Share hosts.
  * Main load balancer uses the JSESSIONID cookie to stick the client to one of Share nodes.
  * Share sends the web scripts requests to the local repository instance, renders the page, and returns it to the user via the main load balancer.

* Alfresco internal flow:
  * Repositories intercommunication is done via Hazelcast to replicate caches.
  * Repositories share the same contentstore available via NFS/SAMBA share.
  * Repositories share the same database schema.

* Alfresco Solr flow:
  * Tracking tier: Two Solr instances periodically query repositories to detect new transactions, fetch new content, and build local indexes. Tracking is done through the Solr load balancer, which analyses the load and distributes it across the repositories.
  * Search tier: Four repository instances query two Solr instances on demand through the Solr load balancer.

To implement this setup, see [Clustering for high throughput LINK LINK](https://docs.alfresco.com/6.0/tasks/install-config-alf.html).
