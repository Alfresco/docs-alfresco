---
title: Migrating using Docker Compose
---
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
    ```
