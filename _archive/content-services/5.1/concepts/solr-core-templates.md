---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Core templates

Core templates are used to define the base configuration for a new Solr core with some configuration properties.

The core templates are specified in the URL used for creating shards, as shown below:

```
http://<host1>:<port1>/<base1>/admin/cores?action=newCore&storeRef=workspace://SpacesStore&numShards=12
&nodeInstance=1&replicationFactor=2&numNodes=6&**template=<template\>**
```

The <ALFRESCO\_HOME\>/solr4/templates directory contains the following structure:

|Templates|Description|
|---------|-----------|
|rerank|This template is an enhanced core configuration for Alfresco One 5.1. To use rerank, you need to reindex using this template, when creating a new core. It has more appropriate settings for sharding and supports indexes containing approximately 50-80M documents per shard.|
|test| |
|vanilla|This template matches how the alfresco and archive cores were defined in Alfresco One 5.0. In addition, it supports auto-phrasing and query re-ranking.|
|without\_suggest|This template is based on the vanilla template but it does not support suggestion.|

The core templates include schema.xml and solrconfig.xml. The main purpose is to create multiple cores on multiple machines with the same configuration.

**Comparison between the rerank and vanilla templates**

|No.|Rerank template|Vanilla template|
|---|---------------|----------------|
|1|The rerank template causes less duplication of the index, and therefore the index is more compact.|The vanilla template causes more duplication of the index, and therefore the index is large.|
|2|In the rerank template, stop words are included and indexed as common grams. By default, majority of the 100 most frequently used words in English language text are now treated as stop words. For more information, see <ALFRESCO\_HOME\>/solr4/templates/rerank/conf/lang/stopwords\_en.txt.

|In the vanilla template, stop words are removed from the words that are tokenised in English language.For more information, see <ALFRESCO\_HOME\>/solr4/templates/vanilla/conf/lang/stopwords\_en.txt.

|
|3|The rerank template supports real rerank with automatic phrasing\* \(or auto-phrasing\). Queries are run in two stages:1.  Stage one treats phrases as conjunctions and ignores expensive positional information.
2.  Stage two reranks the top queries using a more expensive phrase.

\* *When a user provides individual search terms in a query, the automatic phrasing feature groups those individual terms into a search phrase and returns the query results for the phrase.*

|The vanilla core performs auto-phrasing without re-ranking by The auto-phrase is added to the query.|

**Parent topic:**[Creating Solr shards manually](../tasks/solr-hash-shard.md)

