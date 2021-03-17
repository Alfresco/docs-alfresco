---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [configuration files, solr]
---

# Solr configuration files

When you install Alfresco Content Services 5.2.7, several Solr configuration files are made available to you. The section lists the Solr configuration files, their location in the directory structure, and their description.

|Configuration File|Location|Description|
|------------------|--------|-----------|
|schema.xml|alfresco\\solr4\\<core\>\\conf\\, where <core\> is the location of core's configuration directory. For example alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf

|This file defines the schema for the index including field type definitions with associated analyzers. It contains details about the fields that you can include in your document and also describes how those fields can be used when adding documents to the index or when querying those fields. The properties of this file are managed by an expert user.|
|solr4.xml|alfresco\\tomcat\\conf\\catalina\\localhost\\|This file defines the Solr web application context. It specifies the location of the Solr war file and sets up the Solr home directory.|
|solr.xml|alfresco\\alf\_data\\solr4|This file specifies the cores to be used by Solr.|
|core.properties|<ALFRESCO\_HOME\>/solr4/archive-SpacesStore/core.properties or <ALFRESCO\_HOME\>/solr4/workspace-SpacesStore/core.properties|This file specifies the cores to be used by Solr.|
|solrconfig.xml|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This file specifies the parameters for configuring Solr. Also, the Solr search components are added to this file. The properties of this file are managed by an expert Administrator user.|
|solrcore.properties|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This is the property configuration file for a core. Solr supports system property substitution, so properties that need substitution can be put in to this file. There is one solrcore.properties file in each core's configuration directory. For details, see the [Solr core configuration properties](solrcore4-properties-file.md) topic. The properties of this file are managed by an Administrator user.|
|context.xml|alfresco\\solr4|This file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
|ssl.repo.client.keystore|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This keystore contains the Solr public/private RSA key pair.|
|ssl-keystore-passwords.properties|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This file contains the password information for ssl.repo.client.keystore.|
|ssl.repo.client.truststore|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This keystore contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr certificates\)|
|ssl-truststore-passwords.properties|alfresco\\solr4\\workspace-SpacesStore\\conf or alfresco\\solr4\\archive-SpacesStore\\conf|This file contains the password information for ssl.repo.client.truststore.|

-   **[Solr core configuration properties](../concepts/solrcore4-properties-file.md)**  
The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory. Use this information to understand the properties of this file, their description, and the default value.

**Parent topic:**[Configure Solr search service](../concepts/configure-solr4.md)

