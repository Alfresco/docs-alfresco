---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the 3.1 release for Search Enterprise 3.x (Elasticsearch).

## Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

* Aspect queries (it works only using exact aspect name)
* Highlighting
* Fingerprinting
* Multi-lingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Resource limiting
* Scoped search
* Statistics

### Search Syntax

* Fuzzy matching
* Search for spans and positions
* Search for boosts
* Wildcards in phrase queries
* Field Facets Pagination
* Field Facets Tags Exclusion

### Field Queries

* PATHWITHREPEATS
* PNAME
* ANAME
* NPATH
* PARENT
* PRIMARYPARENT
* QNAME
* ANCESTOR
* PRIMARYASSOCQNAME
* PRIMARYASSOCTYPEQNAME
* ISNULL
* ISNOTNULL
* ISUNSET
* FINGERPRINT
* ISROOT
* ISCONTAINER
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

## Alfresco Digital Workspace

To ensure ADW basic functionality the part of a query that contains an unsupported field will be ignored and the REST API will return a 200 HTTP code. A warning message will be produced in the Alfresco Repository log.

All unsupported fields will be ignored in queries and filters following the schema below:

* The query contains only an unsupported field, for example `QNAME:hello` returns an empty result.
* The query contains a supported field, for example `hello AND QNAME:goodbye` returns only documents containing “hello”.
* A filter contains only an unsupported field, for example `query=banana`, `filter=QNAME:hello` returns only documents containing “banana”.
* A filter contains two filters or a filter with a supported field and an unsupported field. For example, `query=banana filter=[QNAME:hello, cm:name:test]`, returns all documents containing “test” and “banana”. Another example, `query=banana filter=QNAME:hello OR cm:name:test`, returns all documents containing “test” and “banana”.

In the examples above, filter queries must be executed using the REST API and not using Alfresco Digital Workspace or Alfresco Share.

## Query languages

* CMIS query language
* SQL query language using JDBC Driver

## Tools & Components

* Alfresco Search and Insight Engine
* Alfresco Governance Services
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

## Unsupported data types and properties

Data types and properties supported in Search and Insight Engine 2.x and Search Services 2.x that are not currently supported for Search Enterprise 3.1.

* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}category
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}noderef
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname