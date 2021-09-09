---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the latest release for Search Enterprise 3.x (Elasticsearch).

## Index and re-index

* Indexing of nodes created during content repository bootstrap. For example, the sample site data. @Engineering what is this example?

## Search features

* Site queries
* Path queries
* Tag queries
* Highlighting
* Fingerprinting
* Multilingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Resource limiting
* Scoped search
* Statistics
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

## Alfresco Digital Workspace

To ensure ADW basic functionality the part of a query that contains an unsupported field will be ignored and the REST API will return a 200 HTTP code. A warning message will be produced in the Alfresco Repository log.

All unsupported fields will be ignored in queries and filters following the schema below:

* The query contains only an unsupported field, for example `QNAME:hello` returns an empty result.
* The query contains a supported field, for example `hello AND QNAME:goodbye` returns only documents containing “hello”.
* A filter contains only an unsupported field, for example `query=banana`, `filter=QNAME:hello` returns only documents containing “banana”.
* A filter contains two filters or a filter with a supported field and an unsupported field. For example, `query=banana filter=[QNAME:hello, cm:name:test]`, returns all documents containing test and banana. Another example, `query=banana filter=QNAME:hello OR cm:name:test`, returns all documents containing test and banana.

In the examples above, filter queries must be executed using the REST API and not using Alfresco Digital Workspace or Alfresco Share.

## Query languages

* CMIS query language
* SQL query language using JDBC Driver
