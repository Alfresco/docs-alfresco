---
title: Core templates
---
Core templates are used to define the base configuration for a new Solr core with some configuration properties.

Alfresco Search and Insight Engine provides two Solr core templates out of the box. These templates live in the following folders:

```bash
<SOLR_HOME>/templates/rerank
<SOLR_HOME>/templates/noRerank
```

* The `rerank` template includes tuning on rating scores in order to obtain finer relevance and precision.
* The `noRerank` template provides the same configuration but without tuning.

If you don't specify additional options when creating the cores, the `rerank` template is taken as the base configuration for both the `alfresco` and `archive` cores. For example, this is what happens when you use the "`-Dcreate.alfresco.defaults=alfresco,archive`" option. In this example, the `rerank` folder is copied to your deployment directories (as shown below), and `noRerank` is never used:

```bash
<SOLR_HOME>/templates/rerank >> <SOLR_HOME>/alfresco
<SOLR_HOME>/templates/rerank >> <SOLR_HOME>/archive
```

So, if you're creating your Solr cores from scratch, you only need to modify the following file:

```bash
<SOLR_HOME>/templates/rerank/conf/solrcore.properties
```

If you're using a persistent storage configuration, with both `alfresco` and `archive` cores, having indexes, you need to change the configuration for the properties file for each core:

```bash
<SOLR_HOME>/archive/conf/solrcore.properties
<SOLR_HOME>/alfresco/conf/solrcore.properties
```

The core templates are specified in the URL used for creating shards, as shown below:

```http
http://<hostN>:<portN>/solr/admin/cores?action=newCore&storeRef=workspace://SpacesStore&numShards=8&nodeInstance=N&replicationFactor=3&numNodes=6&**template=<template>**
```

The <SOLR\_HOME>/templates directory contains the following structure:

|Templates|Description|
|---------|-----------|
|rerank|This template is an enhanced core configuration for Alfresco Content Services. To use rerank, you need to reindex using this template when creating a new core. It has more appropriate settings for sharding and supports indexes containing approximately 50-80M documents per shard.|
|noRerank|This template matches how the alfresco and archive cores were defined in Alfresco One 5.0. In addition, it supports auto-phrasing and query re-ranking.|

The core templates include schema.xml and solrconfig.xml. The main purpose is to create multiple cores on multiple machines with the same configuration.

> **Note:** The `aps` and `rerankWithQueryLog` templates have been removed from the default distribution of Alfresco Search and Insight Engine from version 1.4 onwards.

### Comparison between the rerank and noRerank templates

|No.|Rerank template|noRerank template|
|---|---------------|-----------------|
|1|The rerank template causes less duplication of the index, and therefore the index is more compact.|The noRerank template causes more duplication of the index, and therefore the index is large.|
|2|In the rerank template, stop words are included and indexed as common grams. By default, majority of the 100 most frequently used words in English language text are now treated as stop words. For more information, see <SOLR\_HOME>/templates/rerank/conf/lang/stopwords\_en.txt.

|In the noRerank template, stop words are removed from the words that are tokenised in the English language.For more information, see <SOLR\_HOME>/templates/norerank/conf/lang/stopwords\_en.txt.

|
|3|The rerank template supports real rerank with automatic phrasing\* (or auto-phrasing). Queries are run in two stages:1.  Stage one treats phrases as conjunctions and ignores expensive positional information.
2.  Stage two reranks the top queries using a more expensive phrase.

\* *When a user provides individual search terms in a query, the automatic phrasing feature groups those individual terms into a search phrase and returns the query results for the phrase.*

|The noRerank core performs auto-phrasing without re-ranking but the auto-phrase is added to the query.|
