---
title: Using Search Enterprise
---

## Supported Features

**Applications & Frameworks**
* ADF
* ADW
* Share (TBC)

**Search Features**
* ACL Permission checks
* Sorting by relevancy - https://docs.alfresco.com/6.2/concepts/search-api-sort.html
* Paging - https://docs.alfresco.com/6.2/concepts/search-api-paging.html
* Faceting - https://docs.alfresco.com/content-services/latest/develop/rest-api-guide/searching/#faceted-search

**AFTS Search Syntax**
* Search for a single term - https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-single.html
* Search for a phrase - https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-phrase.html
* Search using wildcards - https://docs.alfresco.com/search-services/latest/using/#search-for-wildcards
* Search for conjunctions - https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-conjunct.html
* Search for disjunctions - https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-disjunct.html
* Search using escape characters - https://docs.alfresco.com/search-services/latest/using/#escaping-characters

**Administration Features**
* Administration console to manage the key interactions between Alfresco and Elasticsearch from Alfresco Repository
* Ability to determine the high-level health of the Elastic Search index via the administration console

**Deployment Options**
* Ability to deploy Alfresco Search Enterprise v3.0 as JAR standalone application
* Ability to deploy Alfresco Search Enterprise v3.0 via Docker Compose
* Ability to run Elasticsearch for ACS as a managed service, using either AWS or Elastic co.
* Ability to use a pre-existing Elasticsearch cluster rather than a pre-packaged deployment

## Unsupported features

The following features, which were supported with Search 2.x (Solr) are not supported in the latest release for Search 3.x (Elasticsearch). These features are under consideration for inclusion in a future release.

Note: the list below is subject to change, and requires review before publishing

**Index and re-index**
* Re-index of existing data in content repository
* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

**Search Features**
* Site queries
* Path queries
* Tag queries
* Highlighting
* Fingerprinting
* Multi-lingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Inclusion of additional properties in search results
* Resource limiting
* Scoped search
* Statistics

**AFTS Search Syntax**
* Search for optional, mandatory, and excluded elements of a query
* Search for an exact term 
* Fuzzy matching
* Grouped search queries
* Proximity search
* Search for spans and positions
* Search using date math
* Search for boosts
* Wildcards in phrase queries
* Exact Match Queries
* Field Facets Pagination
* Field Facets Tags Exclusion

**Alternative Query Languages**
* CMIS query language
* Lucene query language
* SQL query language using JDBC Driver

**Tools & Components**
* Alfresco Search and Insight Engine
* Alfresco Governance Services
* Alfresco Desktop Sync	 
* Alfresco Federation Services	 
* Alfresco Intelligence Services	 	 	 
* Alfresco Content Connector for AWS Glacier	
* Alfresco Content Connector for Salesforce
* Alfresco Content Connector for SAP applications	 	 
* Alfresco Collaboration Connector for Microsoft 365 
* Alfresco Outlook Integration 	 
* Alfresco Office Services 
* Alfresco Google Docs Integration
* Alfresco Enterprise Viewer	 
* Alfresco Content Accelerator	

**Deployment Methods**
* Kubernetes & Helm

## Types of nodes in the Alfresco repository supported for Search 2.0 that are not currently supported for Search 3.0.

* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}category
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}noderef
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname