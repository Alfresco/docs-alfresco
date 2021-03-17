---
author: [Alfresco Documentation, Alfresco]
---

# Performing a full reindex with Solr 4

This task describes how to perform a full Solr 4 reindex.

This task assumes you are using only one Solr 4 instance for all nodes in the Alfresco cluster. If not, then you need to repeat process on each Solr 4 instance used in the cluster.

1.  Confirm the location of the Solr 4 core directories for archive-SpacesStore and workspace-SpacesStore cores. This can be determined from the solrcore.properties file for both the cores. By default, the solrcore.propertiesfile can be found at <ALFRESCO\_HOME\>/solr4/workspace-SpacesStore/conf or <ALFRESCO\_HOME\>/solr4/archive-SpacesStore/conf. The Solr 4 core location is defined in the solrcore.properties file as:

    For Solr 4, the default data.dir.root path is:

    ```
    data.dir.root=<ALFRESCO_HOME>/alf_data/solr4/index/
    ```

2.  Shut down Solr 4 \(if running on a separate application server\).

3.  Delete the contents of the index data directories for each Solr core at $\{data.dir.root\}/$\{data.dir.store\}.

    -   <ALFRESCO\_HOME\>/alf\_data/solr4/index/workspace/SpacesStore
    -   <ALFRESCO\_HOME\>/alf\_data/solr4/index/archive/SpacesStore
4.  Delete all the Alfresco models for each Solr 4 core at $\{data.dir.root\}.

    <ALFRESCO\_HOME\>/alf\_data/solr4/model

5.  Delete the contents of the <ALFRESCO\_HOME\>/alf\_data/solr4/content directory.

6.  Start up the application server that runs Solr 4.

7.  Monitor the application server logs for Solr at <TOMCAT\_HOME\>/logs/solr.log. You will get the following warning messages on bootstrap:

    ```
    WARNING: [alfresco] Solr index directory '<ALFRESCO_HOME>/alf_data/solr/workspace/SpacesStore/index' doesn't exist. Creating new index...
    09-May-2012 09:23:42 org.apache.solr.handler.component.SpellCheckComponent inform
    WARNING: No queryConverter defined, using default converter
    09-May-2012 09:23:42 org.apache.solr.core.SolrCore initIndex
    WARNING: [archive] Solr index directory '<ALFRESCO_HOME>/alf_data/solr/archive/SpacesStore/index' doesn't exist. Creating new index... 
    ```

8.  Use the Solr 4 administration console to check the health of the Solr 4 index.

    **Note:** The process of building the Solr 4 indexes can take some time depending on the size of the repository. To monitor reindexing progress, use the Solr 4 administration console and check the logs for any issues during this activity.

    While the reindex is taking place, some searches may not return the full set of results.


To copy the indexes from a recently re-indexed Solr node to another Solr node, follow these steps:

1.  Make sure both the Solr nodes have the same version of the index server.
2.  Stop node1 and copy the content store, index configuration, and index data to the new machine/node.
3.  \(Optional\) Copy the models from node1 to node2 and validate that they are compatible.
4.  Fix any configuration issues, for example, renaming the core, updating the configuration to point to the correct data, indexes, and Alfresco.
5.  Disable index tracking on node2 by setting the `enable.alfresco.tracking` property to `false` in solrcore.properties.
6.  Go to the Solr Admin Web interface to monitor information about each core.
7.  Stop node 2 and enable tracking by setting the `enable.alfresco.tracking` property to `true` in solrcore.properties.
8.  Restart the Solr server on node2.

The new index on node2 should start tracking and come up-to-date.

**Parent topic:**[Solr 4 monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)

