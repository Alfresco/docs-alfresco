---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Overview of transactional metadata query

Alfresco Content Services supports the execution of a subset of the CMIS Query Language \(CMIS QL\) and Alfresco Full Text Search \(AFTS\) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This feature is called transactional metadata query \(TMDQ\).

TMDQ supports use cases where eventual consistency is not the preferred option.

Prior to Alfresco Content Services 4.2, the Solr search subsystem did not support transactional indexing. The Solr subsystem is eventually consistent. A change can take anytime to be reflected in the index, ranging from a few seconds to several minutes. Solr indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The rate at which the nodes are indexed is mainly determined by the time it takes to transform the content and the rate at which the nodes are being changed.

Some queries can be executed both transactionally against the database or with eventual consistency against the Index Engine. Only queries using the AFTS or CMIS query languages can be executed against the database. The Lucene query language cannot be used against the database whereas, `selectNodes` \(XPATH\) on the Java API always goes against the database, walking and fetching nodes as required.

Improvements to tracking in the Alfresco Solr 4/ Solr 6 integration results in less lag to metadata indexing. Metadata updates are impacted less by content indexing or the bulk updates to PATH for `move`, `rename`, `link` and, `unlink` operations.

The database can only be used for a subset of all the queries. These queries can be in the CMIS QL or AFTS QL. CMIS QL expressions are more likely to use TMDQ because of the default behaviour to do exact matches. AFTS QL defaults to full text search and uses constructs not supported by the database engine. For example, PATH queries.

In general, TMDQ does not support:

-   Structural queries, full text search, and special fields: This includes SITE that are derived from structure and long strings \(\> 1024 characters\). Text fields support exact and pattern-based matching subject to the database collation. Filter queries are rewritten along with the main query to create one large query. Ordering is fine, but again subject to database collation for text.
-   Faceting
-   Any aggregation: This includes counting the total number of matches for the query.

Fingerprint support is only on the Index Server.

AFTS and CMIS queries are parsed to an abstract form. This is then sent to an execution engine. There are two execution engines: the database and the Index Engine. The default is to try the database first and fall back to the Index Engine, if the query is not supported against the database. This is configurable for a search subsystem and per query using the Java API.

To support TMQD:

-   Migrations from any version of Alfresco prior to Alfresco One 5.0 requires two optional patches to be applied.
-   Migrations to Alfresco One 5.0 require one patch to be applied.
-   Migration from Alfresco One 5.0 to Alfresco One 5.1 requires one patch to be applied.
-   Alfresco Content Services supports TMDQ by default. The patches add supporting indexes that make the database approximately 25% larger.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

