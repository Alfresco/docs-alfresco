---
author: Alfresco Documentation
---

# Solr configuration files

When you install Alfresco Search and Insight Engine, several Solr configuration files are made available to you. The section lists the Solr configuration files, their location in the directory structure, and their description.

> **Note:** Some of these files are only available once Alfresco Search and Insight Engine has been started for the first time.

|Configuration File|Location|Description|
|------------------|--------|-----------|
|schema.xml|<SOLR\_HOME\>/solrhome/<core\>/confFor example <SOLR\_HOME\>/solrhome/alfresco/conf or <SOLR\_HOME\>/solrhome/archive/conf

|This file defines the schema for the index including field type definitions with associated analyzers. It contains details about the fields that you can include in your document and also describes how those fields can be used when adding documents to the index or when querying those fields. The properties of this file are managed by an expert user.|
|core.properties|<SOLR\_HOME\>/solrhome/alfresco/core.properties or <SOLR\_HOME\>/solrhome/archive/core.properties|This file specifies the cores to be used by Solr.|
|solrconfig.xml|<SOLR\_HOME\>/solrhome/alfresco/conf or <SOLR\_HOME\>/solrhome/archive/conf|This file specifies the parameters for configuring Solr. Also, the Solr search components are added to this file. The properties of this file are managed by an expert Administrator user.|
|solrcore.properties|<SOLR\_HOME\>/solrhome/alfresco/conf or <SOLR\_HOME\>/solrhome/archive/conf|This is the property configuration file for a core. Solr supports system property substitution, so properties that need substitution can be put in to this file. There is one solrcore.properties file in each core's configuration directory. For details, see the [Solr core configuration properties](solrcore-properties-file.md) topic. The properties of this file are managed by an Administrator user.|
|context.xml|<SOLR\_HOME\>|This file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
|ssl.repo.client.keystore|<SOLR\_HOME\>/solrhome/alfresco/conf or <SOLR\_HOME\>/solrhome/archive/conf|This keystore contains the Solr public/private RSA key pair.|
|ssl.repo.client.truststore|<SOLR\_HOME\>/solrhome/alfresco/conf or <SOLR\_HOME\>/solrhome/archive/conf|This keystore contains the trusted Alfresco Certificate Authority certificate (which has been used to sign both the repository and Solr certificates)|

> **Note:** The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory, for more see [Solr core configuration properties](solrcore-properties-file.md).

-   **[Solr core configuration properties](../concepts/solrcore-properties-file.md)**  
The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory. Use this information to understand the properties of this file, their description, and the default value.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

