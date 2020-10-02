---
title: Migrating to Search Services
---
Use this information to migrate from Alfresco Search and Insight Engine 2.0 to Alfresco Search Services 2.0 using a distribution zip.

> **Note:** A reindex is required when you migrate from Search and Insight Engine to Search Services. `solr.content.dir` is no longer used from Search and Insight Engine 2.0 and above. Solr itself provides that storage facility which means it can be safely removed, which we recommend, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md). If it is necessary for you to have a backup of the old index and content store then it must be copied elsewhere before you reindex.

1. Stop Search and Insight Engine.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing ./alfresco-insight-engine folder to a preferred location. For example, alfresco-insight-engine-2.0.

3. Browse to the [Support Portal](http://support.alfresco.com/).

4. Download and unzip the Search Services distribution zip file to a preferred location:

    ```bash
    alfresco-search-services-distribution-2.0.x.zip
    ```

    By default, the contents are decompressed in a folder at ./alfresco-search-services. The folder extracts into the same location as the zip file.

5. (Optional) If you have changed the alfresco-search-services/solr.in.sh or alfresco-search-services/solr.in.cmd file, you must restore it from your backup.

6. Your indexes for Solr are in another location (where you saved them in step 2), use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir=/your-preferred-location/solrhome/alfrescoModels
    -Ddata.dir.root=/your-preferred-location/solrhome/
    ```

    Microsoft Windows

    ```bash
    solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"
    ```

7. Start Search Services.

    > **Note:** To check what version of Search Services or Search and Insight Engine you have installed go to http://localhost:8983/solr/.
