---
title: Unsupported features
---

The following features, which were supported with Search 2.x (Solr) are not supported in the latest release for Search 3.x (Elasticsearch).

## Index and re-index

Re-index of permissions and content associated with indexed nodes
Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

* Site queries
* Path queries
* Aspect queries (works using only the exact aspect name)
* Tag queries
* Highlighting
* Fingerprinting
* Multi-lingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Resource limiting
* Scoped search
* Statistics
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

## Field queries

* PATH
* PATHWITHREPEATS
* PNAME
* NPATH
* PARENT
* PRIMARYPARENT
* QNAME
* TAG
* SITE
* ANCESTOR
* PRIMARYASSOCQNAME
* PRIMARYASSOCTYPEQNAME
* ISNULL
* ISNOTNULL
* ISUNSET
* FINGERPRINT
* ISROOT
* ISCONTAINER
* ASPECT
* EXACTASPECT
* CASCADETX
* DBID
* TX
* TXID
* INTXID
* TXCOMMITTIME
* ACLID
* INACLTXID
* ACLTXID
* ACLTXCOMMITTIME
* TENANT
* OWNERSET
* READERSET
* AUTHSET
* DENYSET
* FTSSTATUS

To guarantee ADW basic functionalities when a query contains an unsupported field the query part will be ignored and the REST API will return a 200 HTTP code. A warning message will be produced in the Alfresco Repository log.

All unsupported fields will be ignored in queries and filters following the schema below:

* The query contains only an unsupported field, e.g. `QNAME:hello` returns an empty result.
* The query contains a supported field, e.g. `hello AND QNAME:goodbye` returns only documents containing “hello”.
* A filter contains only an unsupported field, e.g. `query=banana`, `filter=QNAME:hello` returns only documents containing “banana”.
* A filter contains two filters or a filter with a supported field and an unsupported field. For example, query=banana filter=[QNAME:hello, cm:name:test], returns all documents containing test and banana. For example, query=banana filter=QNAME:hello OR cm:name:test, returns all documents containing test and banana.

In the examples above, filter queries must be executed using the REST API and not using Alfresco Digital Workspace or Alfresco Share.

## Query languages

* CMIS query language
* SQL query language using JDBC Driver
