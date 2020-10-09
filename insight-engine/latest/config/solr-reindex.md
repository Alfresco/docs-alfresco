---
title: Performing a full reindex with Solr
---
This task describes how to perform a full Solr reindex.

The task assumes you are using only one Solr instance for all nodes in the Alfresco Content Services cluster. If not, then you need to repeat the process on each Solr instance used in the cluster.

1. Confirm the location of the Solr core directories for archive and alfresco cores. This can be determined from the solrcore.properties file for both the cores. By default, the solrcore.properties file can be found at <SOLR_HOME>/solrhome/alfresco/conf or <SOLR_HOME>/solrhome/archive/conf. The Solr core location is defined in the solrcore.properties file as:

    For Solr, the default data.dir.root path is:

    ```bash
    data.dir.root=<SOLR_HOME>/solrhome/
    ```

2. Shut down Solr (if running on a separate application server).

3. Delete the contents of the index data directories for each Solr core at ${data.dir.root}/${data.dir.store}.

    <SOLR_HOME>/solrhome/alfresco/index/
    <SOLR_HOME>/solrhome/archive/index/

4. Delete all the Alfresco Content Services models for each Solr core at ${data.dir.root}.

    <SOLR_HOME>/solrhome/alfrescoModels

5. Start up the application server that runs Solr.

6. Monitor the application server logs for Solr at <SOLR_HOME>/logs/solr.log. You will get the following warning messages on bootstrap:

    ```bash
    WARNING: [alfresco] Solr index directory '<SOLR_HOME>/solrhome/alfresco/index' doesn't exist. Creating new index...
    09-May-2018 09:23:42 org.apache.solr.handler.component.SpellCheckComponent inform
    WARNING: No queryConverter defined, using default converter
    09-May-2018 09:23:42 org.apache.solr.core.SolrCore initIndex
    WARNING: [archive] Solr index directory '<SOLR_HOME>/solrhome/archive/index' doesn't exist. Creating new index... 
    ```

7. Use the Solr administration console to check the health of the Solr index.

    > **Note:** The process of building the Solr indexes can take some time depending on the size of the repository. To monitor reindexing progress, use the Solr administration console and check the logs for any issues during this activity.

    While the reindex is taking place, some searches may not return the full set of results.

To copy the indexes from a recently re-indexed Solr node to another Solr node, follow these steps:

1. Make sure both the Solr nodes have the same version of the index server.
2. (Optional) Copy the models from node1 to node2 and validate that they are compatible.
3. Fix any configuration issues, for example, renaming the core, updating the configuration to point to the correct data, indexes, and Alfresco Content Services.
4. Disable index tracking on node2 by setting the `enable.alfresco.tracking` property to `false` in solrcore.properties.
5. Go to the Solr Admin Web interface to monitor information about each core.
6. Stop node2 and enable tracking by setting the `enable.alfresco.tracking` property to `true` in solrcore.properties.
7. Restart the Solr server on node2.

The new index on node2 should start tracking and come up-to-date.
