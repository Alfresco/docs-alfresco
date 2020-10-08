---
title: Migrating Search Services and Search and Insight Engine 
---
Use the following to either:

* Migrate from Alfresco Content Services 6.2 with Search Services to Alfresco Content Services 6.2 with  Search and Insight Engine.
* Upgrade and migrate from Alfresco Content Services 5.x with Search Services to Alfresco Content Services 6.2 with Search and Insight Engine.
* Migrate to Search Services from Insight Engine.

> **Note:** Most migrations can be completed using either Docker Compose or the distribution zip. You can't upgrade Alfresco Content Services 5.x using Docker Compose.

## Migrating with zip

You can migrate from Alfresco Content Services 6.2 or above with Search Services 1.3 or above to Alfresco Content Services with Search and Insight Engine 2.0. You can also migrate from Alfresco Content Services 5.x with Search Services 1.3 or below to Alfresco Content Services 6.2 or above with Search and Insight Engine 2.0.

* [Migrating from Search Services to Search and Insight Engine](../tasks/upgrade-ss1.1-IE1.0.md)
* [Upgrading Content Services 5.x to Content Services with Search and Insight Engine](../tasks/search-insight-upgrade2.md)  

## Migrating Content Services 6.2 with Search Services 1.3 or above

Use this information to migrate from Alfresco Search Services 1.3 or above to Alfresco Search and Insight Engine 2.0 using a distribution zip.

> **Note:** A reindex is required when you migrate from Search Services to Search and Insight Engine. `solr.content.dir` is no longer used from Search and Insight Engine 2.0 and above. Solr itself provides that storage facility which means it can be safely removed, which we recommend, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md). If it is necessary for you to have a backup of the old index and content store then it must be copied elsewhere before you reindex.

1. Stop Search Services.

    ```bash
    ./solr/bin/solr stop
    ```

2. Backup or move the existing alfresco-search-services folder to a preferred location. For example, alfresco-search-services-1.x.

3. Browse to the [Support Portal](http://support.alfresco.com/).

4. Download and unzip the Search and Insight Engine distribution zip file to a preferred location:

    ```bash
    alfresco-insight-engine-distribution-2.0.x.zip
    ```

    By default, the contents are decompressed in a folder at ./alfresco-insight-engine. The folder extracts into the same location as the zip file.

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
    -Dsolr.model.dir="your-preferred-location\solrhome\alfrescoModels"
    -Ddata.dir.root="your-preferred-location\solrhome\"
    ```

6. (Optional) If you have changed the alfresco-search-services/solr.in.sh or alfresco-search-services/solr.in.cmd file, you must restore it from your backup.

7. Start Search and Insight Engine.

    > **Note:** To check what version of Search Services or Search and Insight Engine you have installed go to http://localhost:8983/solr/.

## Migrating Content Services 5.x with Search Services 1.3 or below

There are two steps to migrating your installation from Alfresco Content Services 5.x with Alfresco Search Services to Alfresco Content Services 6.2 with  Search and Insight Engine. First you need to upgrade to Alfresco Content Services 6.2 with Search Services, and then migrate Search Services to Search and Insight Engine.

1. Upgrade from Alfresco Content Services 5.x to Alfresco Content Services 6.2, for more see [Upgrading from Solr 4 to Solr 6 search](https://docs.alfresco.com/search-enterprise/tasks/solr4-solr6-migration.html).

    > **Note:** You can't do this using Docker Compose.

2. Migrate from Search Services to Search and Insight Engine see [Migrating from Search Services to Search and Insight Engine LINK TO ABOVE TODO](upgrade-ss1.1-IE1.0.md).

## Migrating using Docker Compose

If you already have Alfresco Content Services 6.2 with Alfresco Search Services 1.3, 1.4, or 2.0 installed, you can migrate to Alfresco Search and Insight Engine 2.0. Due to the limited capabilities of Docker Compose, this migration method is recommended for development and test environments only.

Use this information to migrate from Search Services to Search and Insight Engine using Docker Compose.

> **Note:** A reindex is required when you migrate from Search Services to Search and Insight Engine. `solr.content.dir` is no longer used from Search and Insight Engine 2.0 and above. Solr itself provides that storage facility which means it can be safely removed, which we recommend, for more see [Search and Insight Engine externalized configuration](../concepts/external-properties-solr.md). If it is necessary for you to have a backup of the old index and content store then it must be copied elsewhere before you reindex.

1. Insert the following container information into your `docker-compose.yml` file and save it.

    ```yaml
        solr6:
            #image: alfresco/alfresco-search-services:2.0.x (or 1.4, and 1.3)
            image: quay.io/alfresco/insight-engine:2.0.x
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

2. Use the following command to run the file and upgrade your Alfresco Content Services 6.2 installation:

    ```dockerfile
    docker-compose up

## Migrating to Search Services

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