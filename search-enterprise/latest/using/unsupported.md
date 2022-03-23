---
title: Unsupported features
---

The following features, which were supported with Search and Insight Engine 2.x and Search Services 2.x (Solr) are not supported in the latest release for Search Enterprise 3.x (Elasticsearch).

## Indexing

* Indexing of nodes created during content repository bootstrap. For example, the sample site data.

## Search features

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
* Search for spans and positions
* Search for boosts
* Wildcards in phrase queries
* Field Facets Pagination
* Field Facets Tags Exclusion

### Field Queries

* PATH
* PATHWITHREPEATS
* PNAME
* NPATH
* PARENT
* PRIMARYPARENT
* QNAME
* TAG
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