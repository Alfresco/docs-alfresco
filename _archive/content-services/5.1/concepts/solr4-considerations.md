---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Issues to consider before upgrading search

Before beginning an upgrade of the search subsystems, there are some important issues you should consider.

**Setup wizard installation**

Alfresco 5.1 uses the Solr 1 search subsystem only during the upgrade process. When upgrading to Alfresco One using the setup wizards, you should install both the Solr 1 and Solr 4 search subsystems. If you wish to minimize the necessary downtime of the search subsystem while the Solr 4 indexes are being build, you must run Solr 1. Once the Solr 4 indexes are up to date, you must enable the Solr 4 subsystem and disable the Solr 1 subsystem.

**Note:** Note that when you have both the subsystems, you will need more memory. So, you might consider installing them as separate web applications on separate Tomcat instances.

**Note:** You do not have to use the Solr 1 search service during the upgrade process. Instead, you can let Solr 4 build its indexes, but during this time, any search carried out might return incomplete results. This is because only those documents that have been indexed are available for searching. Set the `NoIndex` option to avoid incomplete and/or misleading results. For more information, see [transactional metadata query](intrans-metadata.md).

**Solr 4 suggester configuration**

Alfresco uses the suggester component in Solr to provide users with automatic suggestions for query terms.

-   With new Alfresco One 5.1.5 installations, the suggester is enabled for the workspace store, by default.
-   If you are upgrading to Alfresco One 5.1.5 with Solr 4, before building the new index, Alfresco recommends that you disable the suggester property in the <solrRootDir\>/workspace-SpacesStore/conf/solrcore.properties file:

    ```
    solr.suggester.enabled=false
    ```

    This is because on a low specification system, building the suggester can cause CPU and IO load issues, which can affect other operations. When the Solr 4 index is up to date, the `solr.suggester.enabled` property can be reset to `true`.

    The Solr 4 suggester holds a view of the index. Normally, there is only one live view of the index. An old view can exist for a few seconds or minutes until all the running queries are complete. If there are two or more live views of the index, index tracking will not run. This only happens while the suggester is being build and if the process of building the suggester is slow. To solve this issue, you can configure how often the suggester will run, if it is enabled.


An out-of-the-box Alfresco application allows you to use three word phrase suggestions across the repository. Suggestions are not limited by permissions. To limit the scope, you can configure the suggester to use single words or two word phrases by changing schema.xml before you rebuild the index.

**Parent topic:**[Upgrading search](../concepts/search-migration.md)

