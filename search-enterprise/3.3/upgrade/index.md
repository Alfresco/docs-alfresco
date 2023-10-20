---
title: Upgrade to Search Enterprise
---

Use this information to upgrade from Search Services 2.x to Search Enterprise 3.x.

> **Note:** A full re-index is required when you upgrade from Search Services 2.x to Search Enterprise 3.x because the search engine is switching from Solr to Elasticsearch. If it is necessary for you to have a backup of the old SOLR index, then it must be copied elsewhere before you re-index.

Search Enterprise 3.x is compatible with Alfresco Content Services 7.1 and above, which means you need to upgrade to this version before applying the following steps.

## Configure Subsystem in Repository

Before upgrading you must activate and configure the Search Services subsystem in Content Services, for more see [Subsystem]({% link search-enterprise/3.3/install/index.md %}#configure-subsystem-in-repository).

## Install Elasticsearch connector

The Elasticsearch connector can be installed using JAR files, Docker compose, or Helm, for more see [Install]({% link search-enterprise/3.3/install/index.md %}).

Once everything is up and running, use the Elasticsearch connector Re-indexing application to populate the Elasticsearch index. This operation may take a while, depending on the number of documents in your repository and on the indexing options selected (metadata, content and path). While the re-indexing process is progressing, the documents will gradually be available for searching.

When the Re-indexing application has finished, the new and updated documents will be uploaded to the Elasticsearch index by the Elasticsearch connector service using ActiveMQ messages.

## Replicate an existing Content Services 7.1 (and above) deployment

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

You can upgrade from Search Services 2.x without experiencing any downtime, to Search Enterprise 3.x when you are using Content Services 7.2 and above.

1. Start an Elasticsearch 3.x instance, for more see [Overview]({% link search-enterprise/3.3/install/index.md %}).

    Currently your installation is using Solr.

    ![add-empty]({% link search-enterprise/images/add-empty-elasticsearch.png %})

2. Start a mirrored environment by replicating the content repository and Content Services.

    You create a mirrored environment because the upgrade will not impact the primary environment. Use the Elasticsearch instance you created as the content repository for the mirrored environment. Once you have mirrored the environment do not change the content repository and only use it in read-only mode. If you do not need to preserve the content repository then you only need to mirror Content Services.

    ![mirror-acs]({% link search-enterprise/images/mirror-acs-environment.png %})

3. Create an Elasticsearch index by executing a search query on the mirrored environment.

    Verify the index is created and its metadata correctly reflects your data model.

    > **Note:** The index is not created when you mirrored the content repository and Content Services.

4. Populate the index with existing data.

    The index is populated and is based on the replicated database and is achieved by starting re-indexing on the mirrored environment. For more see [re-indexing]({% link search-enterprise/3.3/config/index.md %}#alfresco-re-indexing-app).

    > **Note:** A window displays that states the primary database does not reflect the up to date index.

    ![initial-reindexing]({% link search-enterprise/images/initial-re-indexing.png %})

5. Shutdown the original environment.

    You are left with an Elasticsearch server with a populated index.

    > **Note:** The index is not yet in sync with the primary environment.

    ![shutdown-mirrored]({% link search-enterprise/images/shutdown-mirrored.png %})

6. Keep your index up to date with changes made through Content Services.

    To do this start live indexing on the primary environment. For more see [live-indexing]({% link search-enterprise/3.3/config/index.md %}#alfresco-live-indexing-app).

    > **Note:** Even after starting live indexing there is still a gap from when you took a snapshot to when you started live indexing.

    ![start-live-indexing]({% link search-enterprise/images/start-live-indexing.png %})

7. Start re-indexing on the Solr environment.

    To close the gap in the Elasticsearch index start re-indexing on the Solr environment.

    > **Note:** Live indexing keeps the Elasticsearch environment index up to date.

    ![final-reindexing]({% link search-enterprise/images/final-re-Indexing.png %})

8. Switch to Elasticsearch.

    To switch to Elasticsearch access the Admin Console at runtime. Once you have done this you still have both Search Services and Search Enterprise running but Content Services is using Elasticsearch.

   > **Note:** If you experience any issues you can still revert back to using Solr.

    ![switch-elasticsearch]({% link search-enterprise/images/switch-elasticsearch.png %})

9. Shutdown Search Services.

    Confirm your new environment is working as expected and remove all the Solr based search services.

    ![shutdown-solr]({% link search-enterprise/images/shutdown-solr.png %})

## Upgrade from legacy Content Services

You can upgrade from the legacy versions of Content Services 5.2.x and 6.2.x with Search Services (Solr) to Content Services 7.x with Search Enterprise. You can do this with minimal performance impact on your production environment, and you do not need to reindex Solr. 

1. Start an Elasticsearch 3.x instance, for more see [Overview]({% link search-enterprise/3.3/install/index.md %}).

    Currently your installation is using Solr.

    ![start-elasticsearch]({% link search-enterprise/images/start-elasticsearch.png %})

2. Start a mirrored environment by replicating the content repository and Content Services.

    You create a mirrored environment because the upgrade will not impact the primary environment. Use the Elasticsearch instance you created as the content repository for the mirrored environment. Once you have mirrored the environment do not change the content repository and only use it in read-only mode. If you do not need to preserve the content repository then you only need to mirror Content Services.

    ![start-mirrored]({% link search-enterprise/images/start-mirrored.png %})

    The goal of this step is to have a similar environment as you would have after doing a regular upgrade. If any custom upgrade procedure is required you can also apply it to the mirrored environment.The mirrored environment uses the same content store as the production one. During the metadata upgrade on the mirrored environment some content could be created. This should not affect the live environment because it won’t be referenced by the live metadata Store. This is a compromise between replicating the whole content store which can be time consuming and expensive, and having a small amount of unreferenced data. If it’s not possible to share the content store then a replicated content store can be used.

    > **Important:** The mirrored environment is used just to populate the Elasticsearch index. It’s important that this environment is isolated from the live environment i.e. do not join it to the production cluster or access the live metadata store.
3. Create an Elasticsearch index by executing a search query on the mirrored environment.

    Verify the index is created and its metadata correctly reflects your data model.

    > **Note:** The index is not created when you mirrored the content repository and Content Services.
    ![elastic-index]({% link search-enterprise/images/elastic-index.png %})

4. Populate the index with existing data.

    The index is populated and is based on the replicated database and is achieved by starting re-indexing on the mirrored environment. For more see [re-indexing]({% link search-enterprise/3.3/config/index.md %}#alfresco-re-indexing-app).

    > **Note:** A window displays that states the primary database does not reflect the up to date index.
    ![populate-index]({% link search-enterprise/images/populate-index.png %})

5. Shutdown the mirrored environment.

    You are left with an Elasticsearch server with a populated index.

    > **Note:** The index is not yet in sync with the primary environment.
    ![shutdown-mirrored-two]({% link search-enterprise/images/shutdown-mirrored-two.png %})

6. Upgrade the initial environment.

    You now have a legacy version of Content Services using Solr and an Elasticsearch server that has an almost complete version of the index. Upgrade the legacy environment and then switch the search engine from Solr to Elasticsearch.

    ![upgrading-initial-enviro]({% link search-enterprise/images/upgrading-initial-enviro.png %})

7. Close the gap in the Elasticsearch index.

    You do this by starting the Elasticsearch re-indexing component, and only for the data modified after taking the snapshot you created for the mirrored environment.

    ![close-elasticsearch-gap]({% link search-enterprise/images/close-elasticsearch-gap.png %})

8. Wait for re-indexing to complete.

    Once re-indexing is complete you have upgraded Content Services to have an up to date Elasticsearch index.

    ![final-state]({% link search-enterprise/images/final-state.png %})

Once this has completed the work can be summarized with the diagram below.

![end-user-perspective]({% link search-enterprise/images/end-user-perspective.png %})