---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Troubleshooting Solr Index

This section describes how to repair a transaction that failed to index.

To repair an unindexed or failed transaction \(as identified by the REPORT option in the [Unindexed Solr Transactions](solr-unindex.md) section\), run the following report:

```
[http://localhost:8080/solr/admin/cores?action=FIX](http://localhost:8080/solr/admin/cores?action=FIX) 
```

The `FIX` parameter compares the database with the index and identifies any missing or duplicate transactions. It then updates the index by either adding or removing transactions.

Use the PURGE parameter to remove transactions, acl transactions, nodes and acls from the index. It can also be used for testing wrong transactions and then to fix them.

```
[http://localhost:8080/solr/admin/cores?action=PURGE&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr/admin/cores?action=PURGE&txid=1&acltxid=2&nodeid=3&aclid=4) 
```

Use the REINDEX parameter to reindex a transaction, acl transactions, nodes and acls.

```
[http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr/admin/cores?action=REINDEX&txid=1&acltxid=2&nodeid=3&aclid=4) 
```

Use the INDEX parameter to create entries in the index. It can also be used to create duplicate index entries for testing.

```
[http://localhost:8080/solr/admin/cores?action=INDEX&txid=1&acltxid=2&nodeid=3&aclid=4](http://localhost:8080/solr/admin/cores?action=INDEX&txid=1&acltxid=2&nodeid=3&aclid=4) 
```

Use the RETRY parameter to retry indexing any node that failed to index and was skipped. In other words, it enables the users to attempt to fix documents that failed to index in the past and appear in the solr report \(http://localhost:8080/solr/admin/cores?action=REPORT&wt=xml\) with the field **Index error count**.

```
[http://localhost:8080/solr/admin/cores?action=RETRY](http://localhost:8080/solr/admin/cores?action=RETRY)
```

Use the following setting to specify an option core for the report. If it is absent, a report is produced for each core. For example:

```
&core=alfresco
&core=archive
```

You can also fix index issues, check the index cache and backup individual indexes via JMX. The status of the index can be checked using the JMX client on the **JMX MBeans \> Alfresco \> solrIndexes \> <store\>** tabs. The default view is the Solr core summary. The operations run the same consistency checks that are available by URL.

**Parent topic:**[Solr monitoring and troubleshooting](../concepts/solr-monitor-troubleshoot.md)

