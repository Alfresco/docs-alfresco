---
title: Troubleshooting
---

Use this information to troubleshoot any technical issues you may be experiencing.

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