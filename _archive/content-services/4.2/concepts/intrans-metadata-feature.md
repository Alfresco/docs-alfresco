---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Features of transactional metadata query

This topic describes the features of the transactional metadata query.

-   Transactional metadata query is supported for all search subsystems, such as Solr, Lucene and noindex.
-   When you enable transactional metadata queries, a query is parsed to check if all of its parts are supported by the database-based query engine. If yes, the database is used automatically.
-   Using the database gives transactional consistency as opposed to the eventual consistency provided by Solr.
-   If you use the transactional metadata query with the noindex subsystem, the search functionality in Alfresco Share won't work as it relies on full text search.
-   Normally, a query will be executed against the database, if possible. Database execution of a query depends on the query itself. It also depends on the application of an optional patch to the database, which creates the required supporting database indexes. If the supporting indexes have been created, each index subsystem can be configured to:
    -   perform transactional execution of queries;
    -   execute queries transactionally, when possible, and fall back to eventual consistency; or
    -   always execute eventual consistency.
-   The `SearchParameters` and `QueryOptions` objects can be used to override this behaviour per query.
-   Transactional metadata query enforces permissions in post-filtering. Permission evaluation is truncated by time or by number of evaluations. This is typically slower than folder listing as search results have more varied ACLs than the sub-folders in a folder. As a result, large result sets are not well supported. This can also affect paging behaviour.
-   The database has specific fixed collation behaviour affecting all string comparisons, for example, case sensitivity in equality and ordering. On the other hand, Solr uses Java localised collation and supports more advanced ordering and multi-lingual fields.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

