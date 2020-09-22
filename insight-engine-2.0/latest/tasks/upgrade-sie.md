# Upgrading to Search and Insight Engine 2.0

Use this information to upgrade from Alfresco Search and Insight Engine 1.x to Search and Insight Engine 2.0.

**Note:** A reindex is required when you upgrade from Search and Insight Engine 1.x to Search and Insight Engine 2.0. `solr.content.dir` is no longer used from Search and Insight Engine 2.0 and above. Solr itself provides that storage facility which means it can be safely removed, which we recommend, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md). If it is necessary for you to have a backup of the old index and content store then it must be copied elsewhere before you reindex.

1.  Stop Search and Insight Engine.

    ```
    ./solr/bin/solr stop
    ```

2.  Backup or move the existing alfresco-insight-engine folder to a preferred location. For example, alfresco-insight-engine-1.x.

3.  Browse to the Support Portal: [http://support.alfresco.com](http://support.alfresco.com/).

4.  Download and unzip the Search and Insight Engine distribution zip file to a preferred location:

    alfresco-insight-engine-distribution-2.0.x.zip

    By default, the contents are decompressed in a folder at ./alfresco-insight-engine. The folder extracts into the same location as the zip file.

5.  Start Search and Insight Engine 2.0.

    If the indexes for Solr are in another location \(where you saved them in step 2\), use the following commands to point Solr to the right location:

    Unix like systems

    ```
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir=/your-preferred-location/solrhome/alfrescoModels
    -Ddata.dir.root=/your-preferred-location/solrhome/
    ```

    Microsoft Windows

    ```
    solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"
    ```

    **Note:** To check what version of Search Services or Search and Insight Engine you have installed go to http://localhost:8983/solr/.


**Parent topic:**[Alfresco Search and Insight Engine](../concepts/search-insight-engine-overview.md)

