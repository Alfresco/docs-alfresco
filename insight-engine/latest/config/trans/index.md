---
title: Transactional metadata query
---
Alfresco Content Services supports the execution of a subset of the CMIS Query Language (CMIS QL) and Alfresco Full Text Search (AFTS) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query (TMDQ).

TMDQ supports use cases where eventual consistency is not the preferred option.

The Solr subsystem is eventually consistent. A change can take any length of time to be reflected in the index, ranging from a few seconds to several minutes. Solr indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The rate at which the nodes are indexed is mainly determined by the time it takes to transform the content and the rate at which the nodes are being changed.

Some queries can be executed both transactionally against the database or with eventual consistency against the Solr index. Only queries using the AFTS or CMIS query languages can be executed against the database. The Lucene query language cannot be used against the database whereas, `selectNodes` (XPATH) on the Java API always goes against the database, walking and fetching nodes as required.

Improvements to tracking in the Alfresco Solr 6 integration results in less lag to metadata indexing. Metadata updates are impacted less by content indexing or the bulk updates to PATH for `move`, `rename`, `link` and, `unlink` operations.

The database can only be used for a subset of all the queries. These queries can be in the CMIS QL or AFTS QL. CMIS QL expressions are more likely to use TMDQ because of the default behaviour to do exact matches. AFTS QL defaults to full text search and uses constructs not supported by the database engine. For example, PATH queries.

In general, TMDQ does not support:

* Structural queries, full text search, and special fields: This includes SITE that are derived from structure and long strings (> 1024 characters). Text fields support exact and pattern-based matching subject to the database collation. Filter queries are rewritten along with the main query to create one large query. Ordering is fine, but again subject to database collation for text.
* Faceting.
* Any aggregation: This includes counting the total number of matches for the query.

AFTS and CMIS queries are parsed to an abstract form. This is then sent to an execution engine. There are two execution engines: the database and the Solr index. The default is to try the database first and fall back to the Solr index, if the query is not supported against the database. This is configurable for a search subsystem and per query using the Java API.

To support TMDQ:

* Alfresco Content Services supports TMDQ by default.

## Features

The following are the available feature of the transactional metadata query.

* Transactional metadata query is supported for both Solr 6 and noindex search subsystems.
* Transactional metadata query does not support facets.
* When you enable transactional metadata queries, a query is parsed to check if all of its parts are supported by the database-based query engine. If yes, the database is used automatically.
* Using the database gives transactional consistency as opposed to the eventual consistency provided by Solr 6.
* If you use the transactional metadata query with the noindex subsystem, the search functionality in Alfresco Share won't work as it relies on full text search.
* Normally, a query will be executed against the database, if possible. Database execution of a query depends on the query itself. It also depends on the application of an optional patch to the database, which creates the required supporting database indexes. If the supporting indexes have been created, each index subsystem can be configured to:
* perform transactional execution of queries;
* execute queries transactionally, when possible, and fall back to eventual consistency; or
* always execute eventual consistency.
* When queries are executed against the database:
* Hidden nodes will be returned by the database, as they are in Alfresco Content Services 5.0.
* Large result sets are not supported because Alfresco Content Services does not evaluate permissions in query but as a post filter.
* Counts will not reflect the number of nodes that match the query.
* The `SearchParameters` and `QueryOptions` objects can be used to override this behaviour per query.
Alfresco Content Services supports the execution of a subset of the CMIS Query Language (CMIS QL) and Alfresco Full Text Search (AFTS) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query (TMDQ).
