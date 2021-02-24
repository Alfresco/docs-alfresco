---
author: Alfresco Documentation
---

# Search service

The Search service provides methods for querying the repository and returning a filtered collection of nodes based on a user's permission.

The Search service supports a number of search languages, including:

-   **XPath**: Supports simple path-based contextual navigation against the node service based on version 1 of the XPath specification.
-   **Alfresco Full Text**: Provides a comprehensive, language independent full text search capability.
-   **CMIS QL**: Supports all CMIS QL \(except Join between Types\) standard. You can embed the Alfresco Full Text Search language in the CMIS QL `contains()` predicate.

For queries, Alfresco recommends that you use Alfresco-FTS and CMIS-QL. These languages are independent of query engine technology.

**Parent topic:**[Content repository services](../concepts/serv-repo-about.md)

