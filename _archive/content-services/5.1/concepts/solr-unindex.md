---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, transaction, report, index]
---

# Unindexed Solr Transactions

You can check the status of the Solr index to identify the nodes to a transaction that failed to index.

To generate a general report for Solr, including the last transaction indexed and the time, use:

```
[https://localhost:8443/solr4/admin/cores?action=REPORT&wt=xml](https://localhost:8443/solr4/admin/cores?action=REPORT&wt=xml) 
```

The `REPORT` parameter compares the database with the index and generates an overall status report with the following details:

-   `DB transaction count`: indicates the transaction count on the database
-   `DB acl transaction count`: indicates the ACL transaction count on the database
-   `Count of duplicated transactions in the index`: indicates the number of transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.
-   `Count of duplicated acl transactions in the index`: indicates the number of ACL transactions that appear more than once in the index. The value of this parameter should be zero. If not, there is an issue with the index.
-   `Count of transactions in the index but not the database`: indicates the number of transactions in the index but not in the database. This count includes empty transactions that have been purged from the database. The value of this parameter should be zero. If not, there might be an issue with the index.
-   `Count of acl transactions in the index but not the DB`: indicates the number of ACL transactions in the index but not in the database. The value of this parameter should be zero. If not, there is an issue with the index. Note that empty ACL transactions are not purged from the database.
-   `Count of missing transactions from the Index`: indicates the number of transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.
-   `Count of missing acl transactions from the Index`: indicates the number of ACL transactions in the database but not in the index. The value of this index should be zero when the index is up-to-date.
-   `Index transaction count`: indicates the number of transactions in the index.
-   `Index acl transaction count`: indicates the number of ACL transactions in the index.
-   `Index unique transaction count`: indicates the number of unique transactions in the index.
-   `Index unique acl transaction count`: indicates the number of unique ACL transactions in the index.
-   `Index leaf count`: indicates the number of docs and folders in the index.
-   `Count of duplicate leaves in the index`: indicates the number of duplicate docs or folders in the index. The value of this parameter should be zero. If not, there is an issue with the index.
-   `Last index commit time`: indicates the time stamp for the last transaction added to the index. It also indicates that transactions after this time stamp have not yet been indexed.
-   `Last Index commit date`: indicates the time stamp as date for the last transaction added to the index. It also indicates that transactions after this date have not yet been indexed.
-   `Last TX id before holes`: indicates that transactions after this ID will be checked again to make sure they have not been missed. This is computed from the index at start up time. By default, it is set an hour after the last commit time found in the index. Solr tracking, by default, goes back an hour from the current time to check that no transactions have been missed .
-   `First duplicate`: indicates if there are duplicate transactions in the index. It returns the ID of the first duplicate transaction.
-   `First duplicate acl tx`: indicates if there are duplicate ACL transactions in the index. It returns the ID of the first duplicate ACL transaction.
-   `First transaction in the index but not the DB`: if the related count is \> 0, it returns the ID of the first offender.
-   `First acl transaction in the index but not the DB`: if the related count is \> 0, it retuns the ID of the first offender.
-   `First transaction missing from the Index`: if the related count is \> 0, it returns the ID of the first offender.
-   `First acl transaction missing from the Index`: if the related count is \> 0, it returns the ID of the first offender.
-   `First duplicate leaf in the index`: if the related count is \> 0, it returns the ID of the first offender.

To generate a summary report for Solr, use:

```
[https://localhost:8443/solr4/admin/cores?action=SUMMARY&wt=xml](https://localhost:8443/solr4/admin/cores?action=SUMMARY&wt=xml) 
```

With multi-threaded tracking, you can specify additional tracking details and tracking statistics:

-   `detail=true`: provide statistics per tracking thread
-   `hist=true`: provides a histogram of the times taken for tracking operations for each tracking thread
-   `reset=true`: resests all tracking statistics
-   `values=true`: reports \(by default\) the last 50 values recorded for each tracking operation for each thread

The `SUMMARY` parameter provides the status of the tracking index and reports the progress of each tracking thread. It generates a report with the following details:

-   `Active`: indicates the tracker for the core active.
-   `Last Index Commit Time`: indicates the time stamp for the last transaction that was indexed.
-   `Last Index Commit Date`: indicates the time stamp as a date for the last transaction that was indexed. Changes made after this time are not yet in the index.
-   `Lag`: indicates the difference in seconds between the last transaction time stamp on the server and the time stamp for the last transaction that was indexed.
-   `Duration`: indicates the time lag as an XML duration.
-   `Approx transactions remaining`: indicates the approximate number of transactions to index in order to bring the index up-to-date. It is calculated as the last transaction ID on the server minus the last transaction ID indexed. It includes all the missing and empty transactions.
-   `Approx transaction indexing time remaining`: it is based on Approx transactions remaining, the average number of nodes per transaction and the average time to index a node \(how long the index will take to be up-to-date\). The estimate is in the most appropriate scale, for example, seconds, minutes, hours and days.
-   `Model sync times (ms)`: indicates summary statistics for model sync time. It supports additional information with &detail=true, &hist=true and &value=true.
-   `Acl index time (ms)`: indicates summary statistics for ACL index time. It supports additional information with &detail=true, &hist=true and &value=true.
-   `Node index time (ms)`: indicates summary statistics for node index time. It supports additional information with &detail=true, &hist=true and &value=true.
-   `Acl tx index time (ms)`: indicates the summary statistics for ACL transaction index time. It supports additional information with &detail=true, &hist=true and &value=true.
-   `Tx index time (ms)`: indicates summary statistics for transaction index time. It specifies the estimated time required to bring the index up-to-date.
-   `Docs/Tx`: indicates summary statistics for the number of documents per transaction. It supports additional information with &detail=true, &hist=true and &value=true.
-   `Doc Transformation time (ms)`: indicates summary statistics for document transformation time. It supports additional information with &detail=true, &hist=true and &value=true.

**Parent topic:**[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)

