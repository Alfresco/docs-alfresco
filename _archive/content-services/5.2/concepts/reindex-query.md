---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Reindex documents by query

You can selectively reindex a small subset of the index based on a query. This enables a limited rebuild of the index.

Example 1: To reindex people after changing the first name and last name tokenisation, use the following single-threaded query:

```
http://localhost:8080/solr4/admin/cores?action=reindex&query=TYPE:person
```

Example 2: To reindex jobs that failed or threw an exception when indexing, use the following query:

```
http://localhost:8080/solr4/admin/cores?action=reindex&query=EXCEPTIONMESSAGE:*
```

You must first run the query to see how many nodes are affected. If the result is large, you can add paging as part of the query in order to reindex in smaller batches.

```
<query> AND created:"2015-08"
```

Query based reindexing is also useful when changing the property type, changing tokenisation, adding new properties to be treated as identifiers, or when reindexing synonyms.

In a sharded setup, the reindex query will have to be run on all the nodes. The query will run for all shards on any node.

**Parent topic:**[Setting up Solr sharding](../concepts/solr-shard-config.md)

