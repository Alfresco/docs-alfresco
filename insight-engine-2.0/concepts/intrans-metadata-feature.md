---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Features of transactional metadata query

Use this information to understand the features of the transactional metadata query.

-   Transactional metadata query is supported for both Solr 6 and noindex search subsystems.
-   Transactional metadata query does not support facets.
-   When you enable transactional metadata queries, a query is parsed to check if all of its parts are supported by the database-based query engine. If yes, the database is used automatically.
-   Using the database gives transactional consistency as opposed to the eventual consistency provided by Solr 6.
-   If you use the transactional metadata query with the noindex subsystem, the search functionality in Alfresco Share won't work as it relies on full text search.
-   Normally, a query will be executed against the database, if possible. Database execution of a query depends on the query itself. It also depends on the application of an optional patch to the database, which creates the required supporting database indexes. If the supporting indexes have been created, each index subsystem can be configured to:
    -   perform transactional execution of queries;
    -   execute queries transactionally, when possible, and fall back to eventual consistency; or
    -   always execute eventual consistency.
-   When queries are executed against the database:
    -   Hidden nodes will be returned by the database, as they are in Alfresco Content Services 5.0.
    -   Large result sets are not supported because Alfresco Content Services does not evaluate permissions in query but as a post filter.
    -   Counts will not reflect the number of nodes that match the query.
-   The `SearchParameters` and `QueryOptions` objects can be used to override this behaviour per query.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

