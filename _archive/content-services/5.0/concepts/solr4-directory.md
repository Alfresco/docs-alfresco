---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, directory, configuration files]
---

# Solr 4 directory structure

After you have installed Alfresco, several directories and configuration files related to Solr 4 will be available in the Alfresco home directory. This section explains the Solr 4 directory structure.

-   **alfresco\\solr4**

    This is the Solr 4 home directory. It contains the Solr cores: archive-SpacesStore\(for deleted content\) and workspace-SpacesStore\(for live content\). It also contains two configurations files: context.xml and solr.xml.


-   ****

    The Solr 4 directory contains the following sub-folders and files:

    -   alfrescoModels: This directory contains all the content models that come out of the box with Alfresco. Any new custom content model added to Alfresco are synced to this directory so that Solr 4 knows about it.
    -   archive-SpacesStore: This is the configuration directory for the archive core.
    -   workspace-SpacesStore: This is the configuration directory for the workspace core.
    -   context.xml: This configuration file specifies the Solr 4 web application context template to use when installing Solr 4 in separate tomcat server.
    -   log4j-solr.properties: This is the configuration file for Solr 4-specific logging. The Solr 4 log file can be found at <TOMCAT\_HOME\>/logs/solr.log.
    -   solr.xml: This configuration file specifies the cores to be used by Solr 4.
-   **alfresco\\alf\_data\\solr4\\**

    The Solr 4 directory contains the following sub-folders:

    -   content: This directory contains a compressed copy of all the Solr documents added to the index. Typically, the content directory is 20%-30% of the repository content store size, but this varies considerably depending on how the transformation to text reduces the size of the original files. If the original files are all text documents, the two content stores may be of comparable size. As Solr content store also includes metadata information, for a repository that contains only text documents, it is possible that the Solr content store could be slightly larger than the repository content store.

        The content directory:

        -   Does not need to be backed up.
        -   Works more efficiently on fast and local drives.
        -   Besides being used for reindexing and future intended use for highlighting, the content directory saves transformations. If only the metadata is updated on a node, the cached content can be used to get the previous transformation results. If the content is updated on a node, it can be indexed with the new metadata and the old transformed content, until the new transformed content is available.
    -   index: This directory contains all the indexes of the archive and workspace cores.
    -   model: This directory contains all the models.
-   **alfresco\\alf\_data\\solr4Backup\\**

    This directory stores the Solr 4 backup. It contains the alfresco and archive sub-directories.


**Parent topic:**[Configure Solr 4 search service](../concepts/configure-solr4.md)

