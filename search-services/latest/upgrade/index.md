---
title: Upgrade Search Services
---

Use this information to upgrade from Search Services 1.x to Search Services 2.0.

> **Note:** A reindex is required when you upgrade from Search Services 1.x to Search Services 2.0. `solr.content.dir` is no longer used from Search Services 2.0 and above. Solr itself provides that storage facility which means it can be safely removed, which we recommend, for more see [Search Services externalized configuration]({% link search-services/latest/config/index.md %}#search-services-externalized-configuration). If it is necessary for you to have a backup of the old index and content store then it must be copied elsewhere before you reindex.

1. Stop Search Services.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing alfresco-search-services folder to a preferred location. For example, `alfresco-search-services-1.x`.

3. Browse to the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}.

4. Download and unzip the Search Services distribution zip file to a preferred location:

    `alfresco-search-services-2.0.x.zip`

    By default, the contents are decompressed in a folder at `./alfresco-search-services`. The folder extracts into the same location as the zip file.

5. Start Search Services 2.0.

    If the indexes for Solr are in another location (where you saved them in step 2), use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir=/your-preferred-location/solrhome/alfrescoModels
    -Ddata.dir.root=/your-preferred-location/solrhome/
    ```

    Microsoft Windows

    ```bash
    solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.model.dir="your-preferred-locationsolrhomealfrescoModels"
    -Ddata.dir.root="your-preferred-locationsolrhome"
    ```

    > **Note:** To check what version of Search Services or Search Services you have installed go to `http://localhost:8983/solr/`.
