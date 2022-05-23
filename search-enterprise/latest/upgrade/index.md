---
title: Upgrade to Search Enterprise
---

Use this information to upgrade from Search Services 2.x to Search Enterprise 3.1.

> **Note:** A full re-index is required when you upgrade from Search Services 2.x to Search Enterprise 3.1 because the search engine is switching from Solr to Elasticsearch. If it is necessary for you to have a backup of the old SOLR index, then it must be copied elsewhere before you re-index.

Search Enterprise 3.1 is compatible with Alfresco Content Services 7.1 and above, which means you need to upgrade to this version before applying the following steps.

## Configure Subsystem in Repository

Before upgrading you must activate and configure the Search Services subsystem in Content Services, for more see [Subsystem]({% link search-enterprise/latest/install/index.md %}#configure-subsystem-in-repository).

## Install Elasticsearch connector

The Elasticsearch connector can be installed using JAR files, Docker compose, or Helm, for more see [Install]({% link search-enterprise/latest/install/index.md %}).

Once everything is up and running, use the Elasticsearch connector Re-indexing application to populate the Elasticsearch index. This operation may take a while, depending on the number of documents in your repository and on the indexing options selected (metadata, content and path). While the re-indexing process is progressing, the documents will gradually be available for searching.

When the Re-indexing application has finished, the new and updated documents will be uploaded to the Elasticsearch index by the Elasticsearch connector service using ActiveMQ messages.

## Replicate an existing Content Services 7.1 deployment

Your current Content Services stack can continue to run while you are indexing the repository to Elasticsearch. This means you can continue to use the 'old' service until the process completes. It's recommended you create a read replica of the database so the indexing process won't affect service performance.

![replicated-environment]({% link search-enterprise/images/elasticsearch-upgrading-1.png %})

1. Create a read-only Replica for your database.

2. Configure Alfresco Repository Search Subsystem to use `elasticsearch` and switch database configuration to the read-only replica database.

3. Install the Elasticsearch server.

4. Install Elasticsearch connector.

5. Once everything is up and running, use the Elasticsearch connector Re-indexing application to populate the Elasticsearch index. This operation may take a while, depending on the number of documents in your Repository and on the indexing options selected (metadata, content and path).

6. Test the replicated environment is working as expected in terms of searching and indexing operations.

7. Switch the existing production environment to the replicated environment by using the original database and removing the previous Search Services components based on SOLR.

![upgraded-environment]({% link search-enterprise/images/elasticsearch-upgrading-2.png %})

> **Note:** You may need to use the Elasticsearch Re-indexing application to update to the latest changes. After that, new and updated documents will be uploaded to the Elasticsearch index by the Elasticsearch connector service using ActiveMQ messages.
