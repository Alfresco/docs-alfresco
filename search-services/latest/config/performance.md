---
title: Performance Recommendations
---

From version 2.0.2, the custom `<SOLR6_INSTALL_LOCATION>/contentstore` folder has been removed. Metadata, Permissions, and Content for the Alfresco Repository nodes are fully stored in the SOLR Core standard indexes.

Since the total amount of storage could be equivalent between previous versions, the SOLR Core Index storage has been increased. In order to control the size and the performance of the SOLR index, the following actions may be performed:

* [Disable FINGERPRINT](#disable-fingerprint) reduces storage requirements
* [Disable SOLR Document Cache](#disable-solr-document-cache) reduces RAM requirements
* [Optimize SOLR Index](#optimize-solr-index) improves search performance

Additionally, from Search Services 2.0.2, SOLR Merging parameters have been exposed to be used from `solrcore.properties` file. Since default values would work fine for many use cases, some recommendations are given to increase performance in large deployments.

## Disable FINGERPRINT

[Document Fingerprint](https://docs.alfresco.com/search-services/latest/admin/#document-fingerprints) feature can be used to get similar documents from SOLR using the reserved word `FINGERPRINT` in `FTS` search syntax. In order to provide these results, each document in SOLR Index includes a list of `MINHASH` fields that is creating larger Lucene Indexes.

From version 2.0.2, Document Fingerprint feature is disabled by default, including the following property in default `solrcore.properties` file.

```bash
alfresco.fingerprint=false
```

> ***Note:** This configuration will generate smaller Lucene indexes when indexing, that may help to reduce storage and to increase performance.

When applying this flag to an existing SOLR Core, full re-indexing operation is recommended. Since no more `MINHASH` properties will be calculated from the moment the property is set to `false`, existing Solr Documents won't be re-calculated in order to remove this additional information until a re-indexing process is executed on the Solr Core.

## Disable SOLR Document Cache

SOLR uses several [Caches](https://solr.apache.org/guide/6_6/query-settings-in-solrconfig.html#QuerySettingsinSolrConfig-Caches) in order to retain some results information in memory. Since Search Services 2.0 is not using the features of the cache associated to Document Results, the feature can be disabled in order to decrease the use of RAM memory.

From version 2.0.2, SOLR Document Caches feature is disabled by default, including the following properties in default `solrcore.properties` file.

```bash
solr.documentCache.size=0
solr.documentCache.initialSize=0
solr.documentCache.autowarmCount=0
```

> **Note:** This configuration will require smaller amount of RAM memory when searching, that may help to reduce requirements and to increase performance.

When applying these flags to an existing SOLR Core, **no** re-indexing operation is recommended. Once the properties have been set in `solrcore.properties` file, all the benefits will be available immediately.

## Optimize SOLR Index

During indexing, whenever a document is deleted or updated, the document is *marked as deleted* in its original segment. This generates some percentage of *waste* storage, as the index will contain around 15% to 20% deleted documents. Merging Lucene Segment process will control this ratio with the time, in order to maintain it as lower as posible.

However, in some situations, specially after a bulk ingestion, the percentage of deleted documents can be up to 50%. This percentage is determined by the ratio of `numDocs` to `maxDocs` in Solr Admin UI.

> **Note:** The greater the ratio of deleted documents Solr Index contains, the worse will be searching and indexing performance in Search Services.
> **Note:** that *optimizing action* has been available by default since Search Services 1.0.

Since optimizing the index is not a recommended operation in many use cases, this option will remove the deleted documents from your index. However, it will create segments much larger than the maximum considered for future merges. If you are optimizing your index periodically (say once a day) and can afford the time to optimize every time you rebuild your index, then optimizing is perfectly reasonable and it will increase searching performance.

Remember that, after the initial optimization, a periodic execution of the optimization process is *required* to preserve the benefits with the time.

This operation can be performed using the SOLR REST API (by default available in http://127.0.0.1:8983/solr/alfresco/update?optimize=true) or hitting the `Optimize now` button in the section `Core >> Overview` of the Solr Admin UI.

It is possible to optimize the index reducing it to N segments at most, with N >= 1.
```text
http://127.0.0.1:8983/solr/alfresco/update?optimize=true&maxSegments=N
```

This can be useful for reducing the impact of the force merge operation. The advantages of using N > 1 are:

* The force merge execution take less resources.
* Avoid to produce a single huge segment.

The value of N must be chosen carefully. N should be smaller than the current number of segments. Moreover, it is possible that some segments are not selected for merging. Consequentially, not all the deleted documents might be removed from the index.

## Merging parameters

From version 2.0.2 following parameters has been exposed to be used from `solrcore.properties` file.

| Property | Description |
| ------------- |----------- |
| merge.policy.maxMergedSegmentMB | This number shoud be increased for large deployments. For instance, when using a 40+ million indexed nodes with content on a SOLR Shard. You may use `10240` instead of `5120`. The default is `5120`. |
| merge.policy.maxMergeAtOnce | The numbers should be decreased in order to reduce the number of segments. This also improves searching performance when using 40+ million indexed nodes with content on a SOLR Shard. You may use `5` instead of `10`. The default value is `10`, **Note:** The value used must be the same as for `merge.policy.segmentsPerTier`. |
| merge.policy.segmentsPerTier | The numbers should be decreased in order to reduce the number of segments. This also improves searching performance when using 40+ million indexed nodes with content on a SOLR Shard. You may use `5` instead of `10`. The default value is `10`, **Note:** The value used must be the same as for `merge.policy.maxMergeAtOnce`. |
| merger.maxMergeCount | Increment this number for large deployments, so more merge operations can be executed simultaneously. The default value is `6`. |
| merger.maxThreadCount | This number should always be lower than the amount of dedicated CPUs and also lower than `mergermaxMergeCount`. Increment this number for large deployments in order to use all your available CPU threads. The default value is `3`. |

> ***Note:** Changing any of these values requires a full re-indexation of your SOLR Core in order to get the performance benefits.
