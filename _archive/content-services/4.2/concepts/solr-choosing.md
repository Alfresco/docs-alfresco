---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# When not to use Solr

Solr can be used for search in Alfresco but it is not appropriate to use it for some functionality.

If you require the following functionality, you will not be able to use Solr for search:

-   When you do not have a Tomcat application server in which to run the Solr server
-   Multi-tenancy - as only a limited number of stores are initially available
-   In-transaction indexing when you are dissatisfied with the eventually consistent results, or you cannot resolve this requirement in another way - for example, when taking advantage of changes to the Node Service or writing canned data base queries

**Parent topic:**[Solr overview](../concepts/solr-overview.md)

