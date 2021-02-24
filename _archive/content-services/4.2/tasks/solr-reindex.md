---
author: [Alfresco Documentation, Alfresco]
---

# Performing a full reindex with Solr

This task describes how to force a full reindex when using Solr.

This task assumes you are using only one Solr instance for all nodes in the Alfresco cluster. If not, then you need to repeat this process on each Solr instance used in the cluster.

1.  Confirm the location of the Solr core directories for archive-SpacesStore and workspace-SpacesStore cores. This can be determined from the solrcore.properties file for both the cores.

    By default, the solrcore.properties file can be found at C:\\alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf and C:\\alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf.

    The Solr core location is defined in the solrcore.properties file as:

    ```
    # data is in ${data.dir.root}/${data.dir.store} 
    
    data.dir.root=C:/alfresco/alf_data/solr
    data.dir.store=workspace/SpacesStore
    ```

2.  Shut down Solr. If Solr is running on the same server as an Alfresco instance, the Alfresco instance will also be shut down.

3.  Delete the contents of the index data directories for each Solr core at $\{data.dir.root\}.

    -   C:\\alfresco\\alf\_data\\solr\\workspace\\SpacesStore
    -   C:\\alfresco\\alf\_data\\solr\\archive\\SpacesStore
4.  Delete all the Alfresco models for each Solr core at $\{data.dir.root\}.

    -   C:\\alfresco\\alf\_data\\solr\\workspace-SpacesStore\\alfrescoModels
    -   C:\\alfresco\\alf\_data\\solr\\archive-SpacesStore\\alfrescoModels
5.  Start up the application server that runs Solr.

6.  Monitor the application server logs for Solr. You will get the following warning messages on bootstrap:

    ```
    WARNING: [alfresco] Solr index directory 'c:/alfresco/alf_data/solr/workspace/SpacesStore/index' doesn't exist. Creating new index...
    09-May-2012 09:23:42 org.apache.solr.handler.component.SpellCheckComponent inform
    WARNING: No queryConverter defined, using default converter
    09-May-2012 09:23:42 org.apache.solr.core.SolrCore initIndex
    WARNING: [archive] Solr index directory 'c:/alfresco/alf_data/solr/archive/SpacesStore/index' doesn't exist. Creating new index... 
    ```

7.  Use the Solr administration console to check the health of the Solr index.

    **Note:** The process of building the Solr indexes may take some time depending on the size of the repository. To monitor the reindexing progress, use the Solr administration console and check the logs for any issues during this activity. Whilst the index is rebuilding, searches from Alfresco may return incomplete or inaccurate results.


**Parent topic:**[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)

