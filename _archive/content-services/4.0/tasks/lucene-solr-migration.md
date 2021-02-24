---
author: [Alfresco Documentation, Alfresco]
---

# Migrating from Lucene to Solr search

This section describes how to migrate from Alfresco Enterprise 3.x with Lucene search server to Alfresco Enterprise 4.x with Solr search server.

With Alfresco Enterprise 3.x, the default search engine was Lucene. When you upgrade to Alfresco Enterprise 4.x using the setup wizard, the default search engine is Solr. However, if you upgrade using the WAR file, the default search engine is Lucene.

To determine the current search server, navigate to the Search Manager page at **Alfresco Share Admin Console \> Tools \> Search \> Search Manager**. Click the **Edit** button to change between the Solr and Lucene search subsystem.

Use the steps below to migrate from Alfresco Enterprise 3.x with Lucene search server to Alfresco Enterprise 4.x with Solr search server.

1.  Upgrade to Alfresco Enterprise 4.x and continue to use Lucene search server as before.

2.  Install and configure Solr to track the repository. For details, see the [Installing and Configuring Solr](solr-install-config.md) topic.

3.  Monitor progress using the `SUMMARY` report.

    ```
    [http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml](http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml) 
    ```

    For details, see the [Unindexed Solr Transactions](../concepts/solr-unindex.md) topic.

4.  When the index is updated as reported by the `SUMMARY` report, you can use the `REPORT` option and check the following:

    -   In the `REPORT` option, leaf count should match the number of live nodes in the repository \(assuming nothing is changing and the index is updated\). The index contains a leaf for failed nodes, so failures need to be considered separately.
    -   Any missing transactions; if there are issues, use the `FIX` option.

        ```
        [http://localhost:8080/solr/admin/cores?action=FIX](http://localhost:8080/solr/admin/cores?action=FIX)
        ```

        For more information, see the [Troubleshooting Solr Index](../concepts/solr-index-fix.md) topic.

    -   Find errors with specific nodes using `EXCEPTIONMESSAGE:*` option.

        ```
        [
        https://localhost:8443/solr/alfresco/afts?q=EXCEPTIONMESSAGE:\*&wt=xml](https://localhost:8443/solr/alfresco/afts?q=EXCEPTIONMESSAGE:*&wt=xml) 
        ```

    -   If there are any issues, use the `REINDEX` option with the relevant node id.

        ```
        [
        http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4) 
        ```

        For more information, see the [Troubleshooting Solr Index](../concepts/solr-index-fix.md) topic.

5.  When the Solr index is updated, enable the Solr subsystem and disable the Lucene subsystem.

6.  Validate the query results.

    You can switch back to the Lucene search server at any time but there may be a pause while the index is being updated. Also, note that Lucene should be set to **auto**.


**Parent topic:**[Configuring Search](../concepts/solr-home.md)

