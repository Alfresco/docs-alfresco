# Search and Insight Engine directory structure

After you've installed Alfresco Search and Insight Engine, several directories and configuration files related to Solr will be available in the Search and Insight Engine home directory.

The Search and Insight Engine distribution (alfresco-insight-engine-distribution-2.0.x.zip) contains the following artifacts:

-   solrhome directory: This is the Solr configuration directory that is specific to Alfresco. It contains the following sub-folders and files:

    |Folder/File|Description|
    |-----------|-----------|
    |alfrescoModels|When you install Search and Insight Engine, it creates an empty alfrescoModels directory. When Solr first talks to Alfresco, it pulls the model definitions into this directory.|
    |conf|This directory contains the shared.properties file. See [Search and Insight Engine externalized configuration](external-properties-solr.md).|
    |templates|This directory contains the core templates that define the base configuration for a new Solr core with some configuration properties. This directory also contains the /rerank/conf/solrcore.properties file which you can use to customize the Solr cores.|
    |solr.xml|This file defines the Solr web application context. For more information see [Format of solr.xml](https://lucene.apache.org/solr/guide/6_6/format-of-solr-xml.html)|
    |data|This folder is generated when a Solr core is created and is where Solr indexes are stored. The default location of the folder is /opt/alfresco-search-services/data.|

-   logs directory: This directory contains the Solr-specific logging configuration file.

    |Folder/File|Description|
    |-----------|-----------|
    |log4j.properties|This is the configuration file for Solr-specific logging. The Solr log file can be found at <SOLR\_HOME\>/logs/solr.log.|

-   solr directory: This directory contains the Solr binaries and runtime Java library files.
-   solr.in.cmd: Use this file to specify additional Solr configuration options for Windows.
-   solr.in.sh: Use this file to specify additional Solr configuration options for non-Windows platforms, such as Linux and Mac OS X.
-   README.MD: This file provides version information for Alfresco Content Services, Search and Insight Engine, and Solr.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

