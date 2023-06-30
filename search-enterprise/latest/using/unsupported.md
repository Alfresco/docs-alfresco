---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the latest release for Search Enterprise 3.x (Elasticsearch).

## Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

* Aspect queries (it works only using exact aspect name)
* Highlighting
* Fingerprinting
* Template search
* Resource limiting
* Scoped search
* Statistics

### Search Syntax

* Fuzzy matching
* Search for spans and positions
* Search for boosts
* Field Facets Pagination
* Field Facets Tags Exclusion

### Field Queries

* PATHWITHREPEATS
* PNAME
* ANAME
* NPATH
* QNAME
* PRIMARYASSOCQNAME
* PRIMARYASSOCTYPEQNAME
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

### Path Indexing

* Secondary parents
* Secondary paths (paths including secondary parents)

## Behaviour of Unsupported fields

Supplying an unsupported or non-existent field will cause the query to fail. This is a change in behaviour compared with the Search and Insight Engine and Search Services, which silently ignore these issues.

Alfresco Search Enterprise has a focus on the most commonly used features and often it is possible to work around unsupported features. Here are a few examples of how to use a different field for queries:

| Old Query                                      | Replacement Query                             |
| ---------------------------------------------- | --------------------------------------------- |
| QNAME:'comment'                                | TYPE:'fm:post'                                |
| PNAME:'0/wiki'                                 | PATH:'//cm:wiki/*'                            |
| NPATH:'2/Company Home/Sites/swsdp'             | PATH: '/app:company_home/st:sites/cm:swsdp/*' |
| ANAME:'0/cdefb3a9-8f55-4771-a9e3-06fa370250f6' | PARENT:'cdefb3a9-8f55-4771-a9e3-06fa370250f6' |

However secondary paths and secondary parents are not yet supported, so there may still be some differences if these are in use.

## Query languages

* SQL query language using JDBC Driver

## Tools & Components

* Alfresco Search and Insight Engine
* Alfresco Enterprise Viewer
* Alfresco Content Accelerator

## Unsupported data types and properties

Data types and properties supported in Search and Insight Engine 2.x and Search Services 2.x that are not currently supported for Search Enterprise 3.x.

* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname