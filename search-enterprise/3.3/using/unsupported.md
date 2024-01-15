---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the latest release for Search Enterprise 3.x.

## Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

* Aspect queries (it works only using exact aspect name)
* Highlighting
* Fingerprinting
* Resource limiting
* Scoped search
* Statistics

### Search Syntax

* Fuzzy matching
* Search for spans and positions
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

* Secondary paths (paths including secondary parents)
* The "member" keyword for category paths

## Behavior of unsupported fields

Supplying an unsupported or non-existent field will cause a query to fail. This is a change in behavior from Search and Insight Engine and Search Services, which silently ignore these issues.

Search Enterprise focuses on the most commonly used features, and in some cases allows you to work around unsupported features.
The following are examples of how to use different fields for queries:

| Old Query | Replacement Query |
| -------- | ----------------- |
| QNAME:'comment' | TYPE:'fm:post' |
| PNAME:'0/wiki' | PATH:'//cm:wiki/*' |
| NPATH:'2/Company Home/Sites/swsdp' | PATH: '/app:company_home/st:sites/cm:swsdp//*' |
| PATH:'//cm:CategoryA/member' | PATH: '//cm:CategoryA/*' AND !TYPE:'cm:category' |

> **Note:** Secondary paths and secondary parents are not supported at this time, so there may still be some differences if these are in use.

## Query languages

* SQL query language using JDBC Driver

## Unsupported data types and properties

Data types and properties supported in Search and Insight Engine 2.x and Search Services 2.x that are not currently supported for Search Enterprise 3.x.

* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname