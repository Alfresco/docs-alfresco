---
title: Monitor and troubleshoot
---

This page helps you monitor and resolve any Solr index issues that might arise as a result of a transaction.

## Perform a full reindex with Solr

This task describes how to perform a full Solr reindex.

The task assumes you are using only one Solr instance for all nodes in the Alfresco Content Services cluster. If not, then you need to repeat the process on each Solr instance used in the cluster.

1. Confirm the location of the Solr core directories for archive and alfresco cores. This can be determined from the `solrcore.properties` file for both the cores. By default, the `solrcore.properties file` can be found at `<SOLR_HOME>/solrhome/alfresco/conf` or `<SOLR_HOME>/solrhome/archive/conf`. The Solr core location is defined in the `solrcore.properties` file as:

    For Solr, the default data.dir.root path is:

    ```bash
    data.dir.root=<SOLR_HOME>/solrhome/
    ```

2. Shut down Solr (if running on a separate application server).

3. Delete the contents of the index data directories for each Solr core at `${data.dir.root}/${data.dir.store}`.

    ```bash
    <SOLR_HOME>/solrhome/alfresco/index/
    <SOLR_HOME>/solrhome/archive/index/
    ```

4. Delete all the Alfresco Content Services models for each Solr core at `${data.dir.root}`.

   ```bash
   <SOLR_HOME>/solrhome/alfrescoModels
   ```

5. Start up the application server that runs Solr.

6. Monitor the application server logs for Solr at `<SOLR_HOME>/logs/solr.log`. You will get the following warning messages on bootstrap:

    ```bash
    WARNING: [alfresco] Solr index directory '<SOLR_HOME>/solrhome/alfresco/index' doesn't exist. Creating new index...
    09-May-2018 09:23:42 org.apache.solr.handler.component.SpellCheckComponent inform
    WARNING: No queryConverter defined, using default converter
    09-May-2018 09:23:42 org.apache.solr.core.SolrCore initIndex
    WARNING: [archive] Solr index directory '<SOLR_HOME>/solrhome/archive/index' doesn't exist. Creating new index...
    ```

7. Use the Solr administration console to check the health of the Solr index.

    > **Note:** The process of building the Solr indexes can take some time depending on the size of the repository. To monitor reindexing progress, use the Solr administration console and check the logs for any issues during this activity.

    While the reindex is taking place, some searches may not return the full set of results.

To copy the indexes from a recently re-indexed Solr node to another Solr node, follow these steps:

1. Make sure both the Solr nodes have the same version of the index server.
2. (Optional) Copy the models from node1 to node2 and validate that they are compatible.
3. Fix any configuration issues, for example, renaming the core, updating the configuration to point to the correct data, indexes, and Alfresco Content Services.
4. Disable index tracking on node2 by setting the `enable.alfresco.tracking` property to `false` in `solrcore.properties`.
5. Go to the Solr Admin Web interface to monitor information about each core.
6. Stop node2 and enable tracking by setting the `enable.alfresco.tracking` property to `true` in `solrcore.properties`.
7. Restart the Solr server on node2.

The new index on node2 should start tracking and come up-to-date.

## Unindexed transactions

You can check the status of the Solr index to identify the nodes to a transaction that failed to index.

To generate a report for Solr 6, including the last transaction indexed and the time, use:

```http
http://localhost:8443/solr/admin/cores?action=REPORT&wt=xml
```

The `REPORT` parameter compares the database with the index and generates an overall status report with the following details:

* `DB transaction count`: indicates the transaction count on the database.
* `DB acl transaction count`: indicates the ACL transaction count on the database.
* `Count of duplicated transactions in the index`: indicates the number of transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.
* `Count of duplicated acl transactions in the index`: indicates the number of ACL transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.
* `Count of transactions in the index but not the database`: indicates the number of transactions in the index but not in the database. This count includes empty transactions that have been purged from the database. The value of this parameter should be zero. If not, there might be an issue with the index.
* `Count of acl transactions in the index but not the DB`: indicates the number of ACL transactions in the index but not in the database. The value of this parameter should be zero. If not, there is an issue with the index. Note that empty ACL transactions are not purged from the database.
* `Count of missing transactions from the Index`: indicates the number of transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.
* `Count of missing acl transactions from the Index`: indicates the number of ACL transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.
* `Index transaction count`: indicates the number of transactions in the index.
* `Index acl transaction count`: indicates the number of ACL transactions in the index.
* `Index unique transaction count`: indicates the number of unique transactions in the index.
* `Index unique acl transaction count`: indicates the number of unique ACL transactions in the index.
* `Index leaf count`: indicates the number of docs and folders in the index.
* `Count of duplicate leaves in the index`: indicates the number of duplicate docs or folders in the index. The value of this parameter should be zero. If not, there is an issue with the index.
* `Last index commit time`: indicates the time stamp for the last transaction added to the index. It also indicates that transactions after this time stamp have not yet been indexed.
* `Last Index commit date`: indicates the time stamp as date for the last transaction added to the index. It also indicates that transactions after this date have not yet been indexed.
* `Last TX id before holes`: indicates that transactions after this ID will be checked again to make sure they have not been missed. This is computed from the index at start up time. By default, it is set an hour after the last commit time found in the index. Solr tracking, by default, goes back an hour from the current time to check that no transactions have been missed .
* `First duplicate`: indicates if there are duplicate transactions in the index. It returns the ID of the first duplicate transaction.
* `First duplicate acl tx`: indicates if there are duplicate ACL transactions in the index. It returns the ID of the first duplicate ACL transaction.
* `First transaction in the index but not the DB`: if the related count is > 0, it returns the ID of the first offender.
* `First acl transaction in the index but not the DB`: if the related count is > 0, it returns the ID of the first offender.
* `First transaction missing from the Index`: if the related count is > 0, it returns the ID of the first offender.
* `First acl transaction missing from the Index`: if the related count is > 0, it returns the ID of the first offender.
* `First duplicate leaf in the index`: if the related count is > 0, it returns the ID of the first offender.

To generate a summary report for Solr 6, use:

```http
http://localhost:8443/solr/admin/cores?action=SUMMARY&wt=xml
```

With multi-threaded tracking, you can specify additional tracking details and tracking statistics:

* `detail=true`: provide statistics per tracking thread.
* `hist=true`: provides a histogram of the times taken for tracking operations for each tracking thread.
* `reset=true`: resets all tracking statistics.
* `values=true`: reports (by default) the last 50 values recorded for each tracking operation for each thread

The `SUMMARY` parameter provides the status of the tracking index and reports the progress of each tracking thread. It generates a report with the following details:

* `Active`: indicates the tracker for the core active.
* `Last Index Commit Time`: indicates the time stamp for the last transaction that was indexed.
* `Last Index Commit Date`: indicates the time stamp as a date for the last transaction that was indexed. Changes made after this time are not yet in the index.
* `Lag`: indicates the difference in seconds between the last transaction time stamp on the server and the time stamp for the last transaction that was indexed.
* `Duration`: indicates the time lag as an XML duration.
* `Approx transactions remaining`: indicates the approximate number of transactions to index in order to bring the index up-to-date. It is calculated as the last transaction ID on the server minus the last transaction ID indexed. It includes all the missing and empty transactions.
* `Approx transaction indexing time remaining`: it is based on Approx transactions remaining, the average number of nodes per transaction and the average time to index a node (how long the index will take to be up-to-date). The estimate is in the most appropriate scale, for example, seconds, minutes, hours and days.
* `Model sync times (ms)`: indicates summary statistics for model sync time. It supports additional information with &detail=true, &hist=true and &value=true.
* `Acl index time (ms)`: indicates summary statistics for ACL index time. It supports additional information with &detail=true, &hist=true and &value=true.
* `Node index time (ms)`: indicates summary statistics for node index time. It supports additional information with &detail=true, &hist=true and &value=true.
* `Acl tx index time (ms)`: indicates the summary statistics for ACL transaction index time. It supports additional information with &detail=true, &hist=true and &value=true.
* `Tx index time (ms)`: indicates summary statistics for transaction index time. It specifies the estimated time required to bring the index up-to-date.
* `Docs/Tx`: indicates summary statistics for the number of documents per transaction. It supports additional information with &detail=true, &hist=true and &value=true.
* `Doc Transformation time (ms)`: indicates summary statistics for document transformation time. It supports additional information with &detail=true, &hist=true and &value=true.

## Troubleshooting - transaction index failure

Use this information to repair a transaction that failed to index.

> **Note:** The default URL for the Solr index is `http://localhost:8080/solr/`

To repair an unindexed or failed transaction (as identified by the REPORT option in the [Unindexed Solr Transactions](#unindexed-transactions) section), run the following report:

```http
http://localhost:8080/solr/admin/cores?action=FIX
```

The `FIX` parameter compares the database with the index and identifies any missing or duplicate transactions. It then updates the index by either adding or removing transactions.

Use the PURGE parameter to remove transactions, acl transactions, nodes and acls from the index. It can also be used for testing wrong transactions and then to fix them.

```http
http://localhost:8080/solr/admin/cores?action=PURGE&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the `REINDEX` parameter to reindex a transaction, acl transactions, nodes and acls.

```http
http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the `INDEX` parameter to create entries in the index. It can also be used to create duplicate index entries for testing.

```http
http://localhost:8080/solr/admin/cores?action=INDEX&txid=1&acltxid=2&nodeid=3&aclid=4
```

Use the `RETRY` parameter to retry indexing any node that failed to index and was skipped. In other words, it enables the users to attempt to fix documents that failed to index in the past and appear in the solr report (`http://localhost:8080/solr/admin/cores?action=REPORT&wt=xml`) with the field **Index error count**.

```http
http://localhost:8080/solr/admin/cores?action=RETRY
```

Use the following setting to specify an option core for the report. If it is absent, a report is produced for each core. For example:

```bash
&core=alfresco
&core=archive
```

You can also fix index issues, check the index cache and backup individual indexes by using JMX. The status of the index can be checked using the JMX client on the **JMX MBeans > Alfresco > solrIndexes > `<store>`** tabs. The default view is the Solr core summary. The operations run the same consistency checks that are available by URL.

## Troubleshooting - unsearchable content

If content becomes unsearchable for some documents, it is possible that the necessary transformations failed and the documents are currently indexed with a `transform_failed` status.

> **Note:** For Enterprise installations (assuming the reason for these failed transformations is the temporary unavailability of the Transform Engines (T-Engines)), it is recommended to verify that the T-Engines start running again, and to check that ActiveMQ is still available. In that case, the documents indexed with a `transform_failed` status should be automatically reindexed once the T-Engines start running again and the earlier ActiveMQ messages are consumed, without any further steps being required.

These documents can be identified via the following query:

```http
http://localhost:8080/solr/alfresco/select?indent=on&q=cm:content.transformationStatus:transform_failed&wt=xml
```

You can extract the DB IDs of the nodes for which the content transformation failed from the response:

```xml
    <result name="response" numFound="1" start="0">
        <doc>
            <long name="DBID">877</long>
            <str name="id">_DEFAULT_!800000000000036d</str>
        </doc>
    </result>
```

Once the IDs have been identified, you can perform the following request once for each node, using the `REINDEX` parameter to trigger a reindexing attempt:

```http
http://localhost:8080/solr/admin/cores?action=REINDEX&nodeid=877
```

Alternatively, you can perform a full reindex following the instructions in [Perform a full reindex with Solr](#perform-a-full-reindex-with-solr).

## Solr troubleshooting for SSL configurations

When you have an Alfresco Content Services installation that requires an SSL configuration, you might encounter connection issues.

If Solr search and/or the Solr tracking is not working properly, you might see this message on the Tomcat console:

```text
Aug 22, 2011 8:19:21 PM org.apache.tomcat.util.net.jsse.JSSESupport handShake
WARNING: SSL server initiated renegotiation is disabled, closing connection
```

This message indicates that one side of the SSL connections is trying to renegotiate the SSL connection. This form of negotiation was found to be susceptible to man-in-the-middle attacks and it was disabled in the Java JSEE stack until a fix could be applied.

Refer to the following link for more information: [Transport Layer Security (TLS) Renegotiation Issue Readme](https://www.oracle.com/java/technologies/javase/tlsreadme2.html){:target="_blank"}.

Refer also to the following links:

* [https://www.gremwell.com/enabling\_ssl\_tls\_renegotiation\_in\_java](https://www.gremwell.com/enabling_ssl_tls_renegotiation_in_java){:target="_blank"}
* [https://tomcat.apache.org/tomcat-6.0-doc/config/http.html](https://tomcat.apache.org/tomcat-6.0-doc/config/http.html){:target="_blank"}

If your version of Java does not have the fix, you need to re-enable renegotiation by performing the following steps:

1. Add the `-Dsun.security.ssl.allowUnsafeRenegotiation=true` option to `JAVA_OPTS`.
2. Add the `allowUnsafeLegacyRenegotiation="true"` option to the Tomcat SSL connector.
