---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, directory, configuration files]
---

# Solr directory structure

After you have installed Alfresco Content Services, several directories and configuration files related to Solr will be available in the Alfresco Content Services home directory.

-   **alfresco\\solr4**

    This is the Solr home directory. It contains the Solr cores: archive-SpacesStore\(for deleted content\) and workspace-SpacesStore\(for live content\). It also contains two configurations files: context.xml and solr.xml.


-   ****

    The Solr directory contains the following sub-folders and files:

    -   alfrescoModels: This directory contains all the content models that come out of the box. Any new custom content model added are synced to this directory so that Solr knows about it.
    -   archive-SpacesStore: This is the configuration directory for the archive core.
    -   workspace-SpacesStore: This is the configuration directory for the workspace core.
    -   templates: This directory contains the core templates that define the base configuration for a new Solr core with some configuration properties. This directory also contains the /rerank/conf/solrcore.properties file.
    -   context.xml: This configuration file specifies the Solr web application context template to use when installing Solr in separate tomcat server.
    -   log4j-solr.properties: This is the configuration file for Solr-specific logging.
    -   solr.xml: This configuration file specifies the cores to be used by Solr.
-   **alfresco\\alf\_data\\solr4\\**

    The Solr directory contains the following sub-folders:

    -   content: This directory contains a compressed copy of all the Solr documents added to the index. Typically, the content directory is 20%-30% of the repository content store size, but this varies considerably depending on how the transformation to text reduces the size of the original files. If the original files are all text documents, the two content stores may be of comparable size. As Solr content store also includes metadata information, for a repository that contains only text documents, it is possible that the Solr content store could be slightly larger than the repository content store.

        The content directory:

        -   Does not need to be backed up.
        -   Works more efficiently on fast and local drives.
        -   Besides being used for reindexing and future intended use for highlighting, the content directory saves transformations. If only the metadata is updated on a node, the cached content can be used to get the previous transformation results. If the content is updated on a node, it can be indexed with the new metadata and the old transformed content, until the new transformed content is available.
    -   index: This directory contains all the indexes of the archive and workspace cores.
    -   model: This directory contains all the models.
-   **alfresco\\alf\_data\\solr4Backup\\**

    This directory stores the Solr backup. It contains the alfresco and archive sub-directories.


**Parent topic:**[Configure Solr search service](../concepts/configure-solr4.md)

