---
title: Upgrade Search and Insight Engine
---

Use this information to upgrade from Search and Insight Engine 1.0 to Search and Insight Engine 1.0.

> **Note:** A reindex is not required when you upgrade from Search and Insight Engine 1.0 to Search and Insight Engine 1.0.

1. Stop Search and Insight Engine.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing `alfresco-insight-engine folder` to a preferred location. For example, `alfresco-insight-engine-1.0`.

3. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

4. Download and unzip the Search and Insight Engine distribution zip file to a preferred location:

    `alfresco-insight-engine-distribution-1.0.x.zip`

    By default, the contents are decompressed in a folder at `./alfresco-insight-engine`. The folder extracts into the same location as the zip file.

5. You can now start Search and Insight Engine by pointing to the content store and indexes from Search and Insight Engine 1.0 using the following commands.

    If the content store and indexes for Solr are in another location, change the directory location to point to the correct one.

    Unix like systems

    ```bash
    ./solr/bin/solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir=/alfresco-insight-engine-1.0/contentstore
    -Dsolr.model.dir=/alfresco-insight-engine-1.0/solrhome/alfrescoModels
    -Ddata.dir.root=/alfresco-insight-engine-1.0/solrhome/
    ```

    Microsoft Windows

    ```bash
    solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="alfresco-insight-engine-1.0\contentstore"
    -Dsolr.model.dir="alfresco-insight-engine-1.0\solrhome\alfrescoModels"
    -Ddata.dir.root="alfresco-insight-engine-1.0\solrhome\" 
    ```

    > **Note:** At this stage you have upgraded. If you want to upgrade using an external location, continue with the following steps.

6. Copy the `contentstore` from the backup `alfresco-insight-engine-1.0` to a preferred location, for example `alf_data`.

7. Copy the cores: alfresco, archive and the models: alfrescoModels from `alfresco-insight-engine-1.0/solrhome`.

8. Your directory structure will look like the following:

    ```bash
    alf_data/contentstore
    alf_data/solrhome
    alf_data/solrhome/alfresco
    alf_data/solrhome/archive
    alf_data/solrhome/alfrescoModels
    ```

9. (Optional) If you have changed the alfresco-insight-engine/solr.in.sh or alfresco-insight-engine/solr.in.cmd file, you must restore it from your backup.

10. Start Search and Insight Engine 1.0.

    If the content store and indexes for Solr are in another location, use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="/your-preferred-location/contentstore"
    -Dsolr.model.dir="/your-preferred-location/solrhome/alfrescoModels"
    -Ddata.dir.root="/your-preferred-location/solrhome/"
    ```

    Microsoft Windows

    ```bash
    solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="your-preferred-location\contentstore"
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"
    ```
