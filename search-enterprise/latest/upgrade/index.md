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

## Zero downtime upgrade

You can upgrade from Search Services 2.x without experiencing any downtime, to Search Enterprise 3.1.1 when you are using Content Services 7.2 and above.

1. Start an Elasticsearch 3.1.1 instance, for more see [Overview]({% link search-enterprise/latest/install/index.md %}).

    Your installation is currently only using Solr6.

    ![add-empty]({% link search-enterprise/images/add-empty-elasticsearch.png %})

2. Start a mirrored environment by replciating the content respository and Content Services.

    You start a mirrored environment because the upgrade will not impact the primary environment. Once mirrored do not change the content repository and only use it in a read-only mode. Use the Elasticsearch instance you created as the content repository for the mirrored environment. If you do not need to preserve the content repository then you only need to mirror Content Services.

    ![mirror-acs]({% link search-enterprise/images/mirror-acs-environment.png %})

3. Create an Elasticsearch index by executing a search query on the mirrored environment.

    Verify the index is created and its metadata correctly reflects your data model. The index is not created when you mirrored the content repository and Content Services.

4. Populate index with existing data.

    The index is populated based on the replicated database and is done by starting the ES Re-Indexing component on the mirrored environment.

    **Note:** A window displays that states the primary database does not reflect the up to date index. starting from taking a primary database snapshot in which changes are not reflected in the index. We will tackle it in a next steps.

    ![intial-reindexing]({% link search-enterprise/images/initial-re-indexing.png %})

5. Shutdown the mirrored environment.

    You are left with an Elasticsearch server with a populated index.

    **Note:** The index is not yet in sync with the primary environment.

    ![shutdown-mirrored]({% link search-enterprise/images/shutdown-mirrored.png %})

6. Start ES Live Indexing on the primary environment.

    ES Live Indexing keeps your Index up to date with changes made through Content Services.

    There is still a gap between taking a snapshot and starting Live Indexing.

    ![start-live-indexing]({% link search-enterprise/images/start-live-indexing.png %})

7. Closing the gap

    Now it’s time to close the gap in the Elasticsearch index. It can be done by starting the ES Re-Indexing component but only for the data modified after taking a snapshot for creating a mirrored environment. Notice that in this step we still use the solr based search service but ES Live Indexing keeps the Elasticsearch index up to date.

    ![final-reindexing]({% link search-enterprise/images/final-re-Indexing.png %})

8. Switching to the Elasticsearch

    Now we are ready to switch to the Elasticsearch. It can be done through the Admin Console at runtime. At this point we still have both Search Service and Enterprise Search running but the Content Services is using Elasticsearch. If there are some problems we can still switch back to the Search service.

![switch-elasticsearch]({% link search-enterprise/images/switch-elasticsearch.png %})

9. Shutdown Search Service

    Confirm your new environment is working as expected and remove all the Solr based search services.

![shutdown-solr]({% link search-enterprise/images/shutdown-solr.png %})
