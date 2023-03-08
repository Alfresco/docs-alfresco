---
title: Migrate Search Services 
---

Use this information to migrate from Search Services to Search and Insight Engine using the distribution zip or docker compose, including how to migrate Search and Insight Engine to Search Services.

> **Note:** You can only migrate to Search Services using the distribution zip.

## Migrate with zip

You can migrate from Alfresco Content Services 6.0 with Search Services 1.2 to Alfresco Content Services with Search and Insight Engine 1.0. You can also migrate from Alfresco Content Services 5.x with Search Services to Alfresco Content Services 6.0 with Search and Insight Engine 1.0.

* [Migrate Content Services 6.0 with Search Services 1.2](#migrate-content-services-60-with-search-services-12)
* [Migrate Content Services 5.x with Search Services 1.2 or below](#migrate-content-services-5x-with-search-services-12-or-below)  

### Migrate Content Services 6.0 with Search Services 1.2

Use this information to migrate from Search Services 1.2 to Search and Insight Engine 1.0 using a distribution zip.

> **Note:** A reindex is not required when you migrate from Search Services 1.2 to Search and Insight Engine 1.0.

1. Stop Search Services.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing `alfresco-search-services` folder to a preferred location. For example, `alfresco-search-services-1.2`.

3. Browse to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

4. Download and unzip the Search and Insight Engine distribution zip file to a preferred location:

    ```bash
    alfresco-insight-engine-distribution-1.0.x.zip
    ```

    By default, the contents are decompressed in a folder at `./alfresco-insight-engine`. The folder extracts into the same location as the zip file.

5. Your indexes for Solr are in another location, use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="/alfresco-search-services-1.2/contentstore"
    -Dsolr.model.dir="/alfresco-search-services-1.2/solrhome/alfrescoModels"
    -Ddata.dir.root="/alfresco-search-services-1.2/solrhome/"
    ```

    Microsoft Windows

    ```bash
    solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="alfresco-search-services-1.2\contentstore"
    -Dsolr.model.dir="alfresco-search-services-1.2\solrhome\alfrescoModels"
    -Ddata.dir.root="alfresco-search-services-1.2\solrhome\"
    ```

    > **Note:** At this stage you have migrated. If you want to migrate using an external location, continue with the following steps.

6. Copy the `contentstore` from the backup `alfresco-search-services-1.2` to a preferred location, for example `alf_data`.

7. Copy the cores: `alfresco`, `archive` and the models `alfrescoModels` from `alfresco-search-services-1.2/solrhome`.

8. Your directory structure will look like the following:

    ```bash
    alf_data/contentstore
    alf_data/solrhome
    alf_data/solrhome/alfresco
    alf_data/solrhome/archive
    alf_data/solrhome/alfrescoModels
    ```

9. (Optional) If you have changed the `alfresco-search-services/solr.in.sh` or `alfresco-search-services/solr.in.cmd` file, you must restore it from your backup.

10. Start Search and Insight Engine.

    If the content store and indexes for Solr are in another location, use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="/your-preferred-location/contentstore"
    -Dsolr.model.dir="/your-preferred-location/solrhome/alfrescoModels"
    -Ddata.dir.root="/your-preferred-location/solrhome/"

    Microsoft Windows

    solr start -a -p <port> "-Dcreate.alfresco.defaults=alfresco,archive"
    -Dsolr.content.dir="your-preferred-location\contentstore"
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"

    > **Note:** To check what version of Search Services or Search and Insight Engine you have installed go to `http://localhost:8983/solr/`.

### Migrate Content Services 5.x with Search Services 1.2

There are two steps to migrating your installation from Alfresco Content Services 5.x with Search Services to Alfresco Content Services 6.0 with Search and Insight Engine. First you need to upgrade to Alfresco Content Services 6.0 with Search Services, and then migrate Search Services to Search and Insight Engine.

> **Note:** You can't upgrade Alfresco Content Services 5.x using Docker Compose.

1. Upgrade from Alfresco Content Services 5.x to Alfresco Content Services 6.0, for more see [Migrate Solr 4 to Solr 6]{% link search-services/latest/upgrade/migrate.md %}).

    > **Note:** You can't do this using Docker Compose.

2. Migrate from Search Services to Search and Insight Engine see [Migrating Content Services 6.0 with Search Services 1.2](#migrating-content-services-60-with-search-services-12).

## Migrate using Docker Compose

If you already have Alfresco Content Services 6.0 with Search Services 1.2 installed, you can migrate to Search and Insight Engine 1.0. Due to the limited capabilities of Docker Compose, this migration method is recommended for development and test environments only.

> **Note:** A reindex is not required when you migrate from Search Services to Search and Insight Engine 1.0.

Use this information to migrate from Search Services to Search and Insight Engine using Docker Compose.

1. Insert the following container information into your `docker-compose.yml` file and save it.

    ```yaml
        solr6:
            #image: alfresco/alfresco-search-services:1.2.x
            image: quay.io/alfresco/insight-engine:1.0.x
            mem_limit: 2500m
            environment:
                #Solr needs to know how to register itself with Alfresco
                    - SOLR_ALFRESCO_HOST=alfresco
                    - SOLR_ALFRESCO_PORT=8080
                #Alfresco needs to know how to call solr
                    - SOLR_SOLR_HOST=solr6
                    - SOLR_SOLR_PORT=8983
                #Create the default alfresco and archive cores
                    - SOLR_CREATE_ALFRESCO_DEFAULTS=alfresco,archive
                    - "SOLR_JAVA_MEM=-Xms2g -Xmx2g"
            ports:
                - 8083:8983 #Browser port
    ```

2. Use the following command to run the file and upgrade your Alfresco Content Services 6.0 installation:

    ```dockerfile
    docker-compose up
    ```
