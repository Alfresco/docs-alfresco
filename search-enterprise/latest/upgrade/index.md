---
title: Upgrade Search Services
---

Use this information to upgrade from Search Services 2.x to Alfresco Search Enterprise 3.0

> **Note:** A full reindex is required when you upgrade from Search Services 2.x to Search Enterprise 3.0 since search engine is switching from Solr to Elasticsearch. If it is necessary for you to have a backup of the old SOLR index, then it must be copied elsewhere before you reindex.

Alfresco Search Enterprise 3.0 is compatible from Alfresco Repository 7.1, so you need to upgrade to this version before applying the following steps.

Below common strategies to upgrade Alfresco Search Services are described:

* Configure an existing ACS 7.1 Stack deployment to use Elasticsearch Connector
* Replicate an existing ACS 7.1 Stack deployment using Elasticsearch Connector

## Configure an existing ACS 7.1 Stack deployment

1. Configure Alfresco Repository Search Subsystem to use `elasticsearch` by modifying `alfresco-global.properties` file or by adding Java environment variables

```
index.subsystem.name=elasticsearch
elasticsearch.host=localhost
elasticsearch.port=9200
```

2. Install Elasticsearch server

3. Install Elasticsearch Connector according to any of the methods available in documentation (ZIP distribution file, Docker or Helm)

Once everything is up & running, use Elasticsearch Reindexing application for the initial population of Elasticsearch index. Note that this operation may take a while, depending on the number of documents in your Repository and on the indexing options selected (metadata, content and path). While this reindexing process is progressing, documents will be available for searching gradually.

When Reindexing application has finished, new and updated documents will be uploaded to Elasticsearch index by Elasticsearch Connector service using ActiveMQ messages.


## Replicate an existing ACS 7.1 Stack deployment

You may keep your current ACS Stack running while indexing the repository to Elasticsearch, so you can be using the service till the process ends. It's also recommended to create a read replica of the DB, so the indexing process won't affect service performance.

![replicated-environment]({% link search-enterprise/images/elasticsearch-upgrading-1.png %})

1. Create a Read Only Replica for your database

2. Configure Alfresco Repository Search Subsystem to use `elasticsearch` and switch DB configuration to the Read Only Replica database.

3. Install Elasticsearch server

4. Install Elasticsearch Connector according to any of the methods available in documentation (ZIP distribution file, Docker or Helm)

5. Once everything is up & running, use Elasticsearch Reindexing application for the initial population of Elasticsearch index by using the Read Only Replica database. Note that this operation may take a while, depending on the number of documents in your Repository and on the indexing options selected (metadata, content and path).

6. Test that replicated environment is working as expected in terms of searching and indexing operations

7. Switch the existing production environment to the replicated environment using the original database and removing previous Search Services components based in SOLR

![upgraded-environment]({% link search-enterprise/images/elasticsearch-upgrading-2.png %})

>> You may need to use again Elasticsearch Reindexing application in order to update latest changes. After that, new and updated documents will be uploaded to Elasticsearch index by Elasticsearch Connector service using ActiveMQ messages.
