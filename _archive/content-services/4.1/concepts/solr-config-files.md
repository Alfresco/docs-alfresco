---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [configuration files, solr]
---

# Solr Configuration Files

When you install Alfresco 4.0, several Solr-related configuration files are made available to you. The section lists the Solr configuration files, their location in the Alfresco directory structure and description.

|Configuration File|Location|Description|
|------------------|--------|-----------|
|repository.properties|alfresco\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\|This file specifies the Solr-related properties for configuring how Alfresco connects to the Solr server. As the Solr server runs in the same Tomcat instance as Alfresco, the connection properties are setup to connect to a locally running Solr server.|
|schema.xml|alfresco\\alf\_data\\solr\\<core\>, where <core\> is the location of core's configuration directory, for example alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This file defines the schema for the index including field type definitions with associated analyzers. It contains details about the fields that you can include in your document and also describes how those fields can be used when adding documents to the index or when querying those fields.|
|solr.xml|alfresco\\tomcat\\conf\\catalina\\localhost\\|This file defines the Solr web application context. It specifies the location of the Solr war file and sets up the Solr home directory.|
|solr.xml|alfresco\\alf\_data\\solr|This file specifies the cores to be used by Solr.|
|solrconfig.xml|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This file specifies the parameters for configuring Solr. Also, the Solr search components are added to this file.|
|solrcore.properties|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This is the property configuration file for a core. Solr supports system property substitution, so properties that need substitution can be put in to this file. There is one solrcore.properties file in each core's configuration directory. For details, see the [Solr core configuration properties](solrcore-properties-file.md) section.|
|context.xml|alfresco\\alf\_data\\solr|This file specifies the Solr web application context template to use when installing Solr in separate tomcat server.|
|ssl.repo.client.keystore|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This keystore contains the Solr public/private RSA key pair.|
|ssl-keystore-passwords.properties|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This file contains the password information for ssl.repo.client.keystore.|
|ssl.repo.client.truststore|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This keystore contains the trusted Alfresco Certificate Authority certificate \(which has been used to sign both the repository and Solr certificates\)|
|ssl-truststore-passwords.properties|alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf or alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf|This file contains the password information for ssl.repo.client.truststore.|

-   **[Solr core configuration properties](../concepts/solrcore-properties-file.md)**  
The solrcore.properties configuration file is the property configuration file for a Solr core. There is one solrcore.properties file in each core's configuration directory. This section lists the properties of this file, their description, and the default value.

**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

