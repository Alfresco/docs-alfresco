---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr 6 directory structure

After you have installed Solr 6, several directories and configuration files related to Solr will be available in the Solr 6 home directory.

The Solr 6 distribution \(alfresco-search-services-1.2.x.zip\) contains the following artifacts:

-   solrhome directory: This is the Solr configuration directory that is specific to Alfresco. It contains the following sub-folders are files:

    |Folder/File|Description|
    |-----------|-----------|
    |alfrescoModels|When you install Solr 6, it creates an empty alfrescoModels directory. When Solr first talks to Alfresco, it pulls the model definitions into this directory.|
    |conf|This directory contains the shared.properties file. See [Solr 6 externalized configuration](external-properties-solr6.md).|
    |templates|This directory contains the core templates that define the base configuration for a new Solr core with some configuration properties. This directory also contains the /rerank/conf/solrcore.properties file.|
    |solr.xml|This file defines the Solr web application context.|

-   logs directory: This directory contains the Solr 6-specific logging configuration file.

    |Folder/File|Description|
    |-----------|-----------|
    |log4j.properties|This is the configuration file for Solr-specific logging. The Solr 6 log file can be found at <TOMCAT\_HOME\>/logs/solr.log.|

-   solr directory: This directory contains the Solr 6 binaries and runtime Java library files.
-   contentstore directory: This directory does not appear in the alfresco-search-services-1.2.x.zip file. It is automatically created after your Solr 6 cores are created and they start indexing. It stores the cache of all the content.
-   solr.in.cmd: Use this file to specify additional Solr 6 configuration options for Windows.
-   solr.in.sh: Use this file to specify additional Solr 6 configuration options for non-Windows platform, such a Linux and Mac OS X.
-   README.MD: This file provides version information for the Alfresco Content Services, Alfresco Search Services, and Solr 6.

**Parent topic:**[Installing and configuring Solr 6](../concepts/solr6-install-config.md)

