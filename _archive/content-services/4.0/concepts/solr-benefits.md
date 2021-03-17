---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Advantages of Solr search over Lucene search

Solr provides improvements on the search capabilities within Alfresco over the embedded Lucene index that improved the performance, scalability, and general support and configuration.

In particular, the Solr search server offers the following advantages over an embedded Lucene search engine:

-   Fixed tokenization, in addition to local specific tokenization, to support better cross-language support
-   Uses the date time analyzer for `d:datetime` properties variable resolution search, for example, `cm:created:2010`
-   Improved performance on the PATH implementation
-   Evaluates READ access at query time
-   No in-transaction indexing
-   Cross-locale ordering for `d:text` and `d:mltext` properties
-   Full integration with the Alfresco data model, including tracking model changes
-   Support using the Search Service for simple field-based faceting - faceting is after read access enforcement
-   Alfresco nodes in a cluster can search against one or more Solr servers. This avoids each Alfresco node from running their separate Lucene indexing subsystems with independent local index files.
-   Search support can be scaled separately from the Alfresco repository \(for example, two Solr instances for a four cluster node\)
-   Solr built-in administration [http://localhost:8080/solr/alfresco/admin/](http://localhost:8080/solr/alfresco/admin/) for checking tokenization behavior, terms in the index, and so on

**Parent topic:**[Solr overview](../concepts/solr-overview.md)

