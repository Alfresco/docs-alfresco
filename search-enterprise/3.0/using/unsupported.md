---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the 3.1 version of Search Enterprise (Elasticsearch).

## Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

* Site queries
* Path queries (partially)
* Aspect queries (it works only using exact aspect name)
* Tag queries
* Highlighting
* Fingerprinting
* Multi-lingual support (documents will be accepted and searchable with multiple languages, but only English grammar rules will be applied)
* Template search
* Resource limiting
* Scoped search
* Statistics

### Search Syntax

* Fuzzy matching
* Proximity search
* Search for spans and positions
* Search using date math
* Search for boosts
* Wildcards in phrase queries
* Field Facets Pagination
* Field Facets Tags Exclusion

### Field Queries

* PATH
* PATHWITHREPEATS
* PNAME
* ANAME
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

## Behavior of unsupported fields

Supplying an unsupported or non-existent field will cause a query to fail. This is a change in behavior from Search and Insight Engine and Search Services, which silently ignore these issues.

Search Enterprise focuses on the most commonly used features, and in some cases allows you to work around unsupported features.
The following are examples of how to use different fields for queries:

| Old Query | Replacement Query |
| --------- | --------------- |
| QNAME:'comment' | TYPE:'fm:post' |
| PNAME:'0/wiki' | PATH:'//cm:wiki/*' |
| NPATH:'2/Company Home/Sites/swsdp' | PATH: '/app:company_home/st:sites/cm:swsdp//*' |

> **Note:** Secondary paths and secondary parents are not supported at this time, so there may still be some differences if these are in use.

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

Data types and properties supported in Search and Insight Engine 2.x and Search Services 2.x that are not currently supported for Search Enterprise 3.0.

* http&#65279;://www.alfresco.org/model/cmis/1.0/cs01}id
* http&#65279;://www.alfresco.org/model/dictionary/1.0}any
* http&#65279;://www.alfresco.org/model/dictionary/1.0}assocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}category
* http&#65279;://www.alfresco.org/model/dictionary/1.0}childassocref
* http&#65279;://www.alfresco.org/model/dictionary/1.0}locale
* http&#65279;://www.alfresco.org/model/dictionary/1.0}noderef
* http&#65279;://www.alfresco.org/model/dictionary/1.0}qname

## Troubleshooting

## Search for failed Transformations

It is possible to search for all documents that have failed to transform by running a simple query using Kibana or the Elasticsearch REST API:

```json
{
  "query": {
      "term": {
        "cm%3Acontent%2Etr_status": {
          "value": "TRANSFORM_FAILED"
        }
      }
  }
}
```

### Debug queries generated for Elasticsearch

Enabling queries slowly in Elasticsearch with a threshold of `0` seconds, will dump every query received by Elasticsearch in the logs.

```bash
$ curl -XPUT "http://elasticsearch:9200/alfresco/_settings" -H 'Content-Type: application/json' -d'{  
 "index.search.slowlog.threshold.query.warn": "0s",  
 "index.search.slowlog.threshold.query.info": "0s",
 "index.search.slowlog.threshold.query.debug": "0s",  
 "index.search.slowlog.threshold.query.trace": "0s",  
 "index.search.slowlog.threshold.fetch.warn": "0s",  
 "index.search.slowlog.threshold.fetch.info": "0s",  
 "index.search.slowlog.threshold.fetch.debug": "0s",  
 "index.search.slowlog.threshold.fetch.trace": "0s",  
 "index.indexing.slowlog.threshold.index.warn": "0s",  
 "index.indexing.slowlog.threshold.index.info": "0s",  
 "index.indexing.slowlog.threshold.index.debug": "0s",  
 "index.indexing.slowlog.threshold.index.trace": "0s", 
 "index.indexing.slowlog.threshold.index.trace": "0s",
 "index.indexing.slowlog.level": "trace",  
 "index.indexing.slowlog.source": "1000"}'
```