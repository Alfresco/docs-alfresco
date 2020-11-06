---
title: Migrate Search Services 
---

Use this information to migrate from Search Services to Search and Insight Engine using the distribution zip or docker compose, including how to migrate Search and Insight Engine to Search Services.

> **Note:** You can only migrate to Search Services using the distribution zip.

## Migrate with zip

You can migrate from Alfresco Content Services 6.0 or above with Search Services 1.3 or above to Alfresco Content Services with Search and Insight Engine 1.4. You can also migrate from Alfresco Content Services 5.x with Search Services 1.3 or below to Alfresco Content Services 6.0 or above with Search and Insight Engine 1.4.

* [Migrating Content Services 6.0 with Search Services 1.3 or above](#migrating-content-services-60-with-search-services-13-or-above)
* [Migrating Content Services 5.x with Search Services 1.3 or below](#migrating-content-services-5x-with-search-services-13-or-below)  

### Migrate Content Services 6.0 with Search Services 1.3 or above

Use this information to migrate from Alfresco Search Services 1.3 or above to Search and Insight Engine 1.4 using a distribution zip.

1. Stop Search Services.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing `alfresco-search-services` folder to a preferred location. For example, `alfresco-search-services-1.x`.

3. Browse to the [Support Portal](https://support.alfresco.com/){:target="_blank"}.

4. Download and unzip the Search and Insight Engine distribution zip file to a preferred location:

    ```bash
    alfresco-insight-engine-1.4.x.zip
    ```

    By default, the contents are decompressed in a folder at `./alfresco-insight-engine`. The folder extracts into the same location as the zip file.

5. Your indexes for Solr are in another location, use the following commands to point Solr to the right location:

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

6. (Optional) If you have changed the `alfresco-search-services/solr.in.sh` or `alfresco-search-services/solr.in.cmd` file, you must restore it from your backup.

7. Start Search and Insight Engine.

    > **Note:** To check what version of Search Services or Search and Insight Engine you have installed go to `http://localhost:8983/solr/`.

### Migrate Content Services 5.x with Search Services 1.3 or below

There are two steps to migrating your installation from Alfresco Content Services 5.x with Alfresco Search Services to Alfresco Content Services 6.0 with Search and Insight Engine. First you need to upgrade to Alfresco Content Services 6.0 with Search Services, and then migrate Search Services to Search and Insight Engine.

> **Note:** You can't upgrade Alfresco Content Services 5.x using Docker Compose.

1. Upgrade from Alfresco Content Services 5.x to Alfresco Content Services 6.0, for more see [Upgrading from Solr 4 to Solr 6 search LINK](https://docs.alfresco.com/search-enterprise/tasks/solr4-solr6-migration.html).

    > **Note:** You can't do this using Docker Compose.

2. Migrate from Search Services to Search and Insight Engine see [Migrating Content Services 6.0 with Search Services 1.3 or above](#migrating-content-services-60-with-search-services-13-or-above).

## Migrate using Docker Compose

If you already have Alfresco Content Services 6.0 or above with Search Services 1.3 or 1.4 installed, you can migrate to Search and Insight Engine 1.4. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

> **Note:** A reindex is not required when you migrate from Search Services to Search and Insight Engine 1.4.

Use this information to migrate from Search Services to Search and Insight Engine using Docker Compose.

1. Insert the following container information into your `docker-compose.yml` file and save it.

    ```yaml
        solr6:
            #image: alfresco/alfresco-search-services:1.4.x (or 1.3)
            image: quay.io/alfresco/insight-engine:1.4.x
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

## Migrate to Search Services

Use this information to migrate from Search and Insight Engine 1.4 To Search Services 1.4 using a distribution zip.

> **Note:** A reindex is not required when you migrate from Search and Insight Engine to Search Services.

1. Stop Alfresco Search and Insight Engine.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing alfresco-insight-engine folder to a preferred location. For example, alfresco-insight-engine-1.4.

3. Browse to the Support Portal:  [Support Portal](https://support.alfresco.com/){:target="_blank"}.

4. Download and unzip the Alfresco Search Services zip file to a preferred location:

    ```bash
    alfresco-search-services-distribution-1.4.x.zip
    ```

    By default, the Alfresco Search Services contents are decompressed in a folder at ./alfresco-search-services. The folder extracts into the same location as the zip file.

5. You can now start Alfresco Search Services by pointing to the content store and indexes from Alfresco Search and Insight Engine using the following commands.

    > **Note:** If the content store and indexes for Solr are in another location, change the directory location to point to the correct one.

    Unix like systems

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port> 
    -Dsolr.content.dir=/alfresco-insight-engine-1.4/contentstore
    -Dsolr.model.dir=/alfresco-insight-engine-1.4/solrhome/alfrescoModels
    -Ddata.dir.root=/alfresco-insight-engine-1.4/solrhome/
    ```

    Microsoft Windows

    ```bash
    solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.content.dir="alfresco-insight-engine-1.4\contentstore"
    -Dsolr.model.dir="alfresco-insight-engine-1.4\solrhome\alfrescoModels"
    -Ddata.dir.root="alfresco-insight-engine-1.4\solrhome\"
    ```

    > **Note:** At this stage you have migrated. If you want to migrate using an external location, continue with the following steps.

6. Copy the contentstore from the backup alfresco-insight-engine-1.4 to a preferred location, for example alf\_data.

7. Copy the cores: alfresco, archive and the models: alfrescoModels from alfresco-insight-engine-1.4/solrhome

8. Your directory structure will look like the following:

    ```bash
    alf_data/contentstore
    alf_data/solrhome
    alf_data/solrhome/alfresco
    alf_data/solrhome/archive 
    alf_data/solrhome/alfrescoModels
    ```

9. (Optional) If you have changed the `alfresco-search-services/solr.in.sh` or `alfresco-search-services/solr.in.cmd` file, you must restore it from your backup.

10. Start Search Services.

    If the content store and indexes for Solr are in another location, use the following commands to point Solr to the right location:

    Unix like systems

    ```bash
    ./solr/bin/solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.content.dir=/your-preferred-location/contentstore
    -Dsolr.model.dir=/your-preferred-location/solrhome/alfrescoModels
    -Ddata.dir.root=/your-preferred-location/solrhome/
    ```

    Microsoft Windows

    ```bash
    solr start -a "-Dcreate.alfresco.defaults=alfresco,archive" -p <port>
    -Dsolr.content.dir="your-preferred-location\contentstore"
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"
    ```
