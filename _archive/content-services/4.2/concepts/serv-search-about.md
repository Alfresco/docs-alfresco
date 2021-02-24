---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Document Management, Services, Search]
keyword: Search service
---

# Search service

The Search service provides methods for querying the repository and returning a filtered collection of nodes based on a user’s permission.

The Search service supports a number of search languages, including:

-   **Lucene**: Based on Apache Lucene, provides any combination of metadata, path, and full text search using the Lucene query syntax. This includes the ability to search for terms and/or phrases in properties and content, paths, types, aspects, and ranges.
-   **XPath**: Supports simple path-based contextual navigation against the node service based on version 1 of the XPath specification.
-   **Alfresco Full Text**: Provides a comprehensive, language independent full text search capability.
-   **CMIS QL**: Supports all CMIS QL \(except Join between Types\) standard. You can embed the Alfresco Full Text Search language in the CMIS QL `contains()` predicate.

Currently Alfresco exposes the default Lucene query parser syntax for full text search support. This excludes the availability of some advanced Lucene features, such as Span queries, which we would like to expose. It also ties us to the Lucene query syntax. This may not embed well if we were to expose a SQL query language. It is also additional work to upgrade as we have out own customizations to the query parser.

For queries, Alfresco recommends that you use Alfresco-FTS and CMIS-QL. These languages are independent of query engine technology.

**Parent topic:**[Content repository services](../concepts/serv-repo-about.md)

