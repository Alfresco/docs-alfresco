---
title: Performance Recommendations
---

From version 2.0.2, the custom `<SOLR6_INSTALL_LOCATION>/contentstore` folder has been removed. Metadata, Permissions, and Content for the Alfresco Repository nodes are fully stored in the SOLR Core standard indexes.

Since the total amount of storage could be equivalent between previous versions, the SOLR Core Index storage has been increased. In order to control the size and the performance of the SOLR index, the following actions may be performed:

* [Disable document FINGERPRINT](#disable-document-fingerprint) reduces storage requirements
* [Disable SOLR Document Cache](#disable-solr-document-cache) reduces RAM requirements
* [Optimize SOLR Index](#optimize-solr-index) improves search performance

Additionally, from version 2.0.2, SOLR Merging parameters have been exposed that can be configured within the `solrcore.properties` file. The default values function adequately for many use cases, however some recommendations are given to increase performance in large deployments.

## Disable document FINGERPRINT

From version 2.0.2 the document Fingerprint feature is disabled by default and appears in the `solrcore.properties` file as `alfresco.fingerprint=false`.

> **Note:** This configuration will generate smaller Lucene indexes when indexing and may help to reduce storage and to increase performance.

When applying this flag to an existing SOLR Core a full reindex is recommended. Since no more `MINHASH` properties will be calculated from the moment the property is set to `false`, existing Solr Documents won't be re-calculated in order to remove this additional information until a reindex is executed on the Solr Core.

The [Document Fingerprints]({% link search-services/latest/admin/index.md %}#document-fingerprints) feature can be used to get similar documents from SOLR using the reserved word `FINGERPRINT` in `FTS` search syntax. In order to provide these results, each document in the SOLR Index includes a list of `MINHASH` fields that create larger Lucene Indexes.

## Disable SOLR Document Cache

SOLR uses several [Caches](https://solr.apache.org/guide/6_6/query-settings-in-solrconfig.html#QuerySettingsinSolrConfig-Caches) in order to retain some result information in memory. Since version 2.0 this this feature can be disabled in order to decrease the use of RAM memory.

From version 2.0.2, the SOLR Document Caches feature is disabled by default, including the following properties in the `solrcore.properties` file.

```bash
solr.documentCache.size=0
solr.documentCache.initialSize=0
solr.documentCache.autowarmCount=0
```

> **Note:** This configuration will require a smaller amount of RAM memory when searching which may help to reduce requirements and to increase performance.

When applying these flags to an existing SOLR Core, **no** re-indexing operation is recommended. Once the properties have been set in the `solrcore.properties` file, all the performance benefits will be available immediately.

## Optimize SOLR Index

During indexing, whenever a document is deleted or updated, the document is *marked as deleted* in its original segment. This generates some percentage of *waste* storage because the index will contain around 15% to 20% of deleted documents. Merging the Lucene Segment process will control this ratio with time, in order to maintain it as low as possible.
However, in some situations, especially after a bulk ingestion, the percentage of deleted documents can be up to 50%. This percentage is determined by the ratio of `numDocs` to `maxDocs` which can be set in the Solr Admin interface.

> **Note:** The greater the ratio of deleted documents the Solr Index contains, the slower Search Services will be at searching and indexing.
> **Note:** The *optimizing action* has been available by default since Search Services 1.0.

Since optimizing the index is not a recommended operation in many use cases, this option will remove the deleted documents from your index. However, it will create segments which are much larger than the maximum considered for future merges. If you are optimizing your index periodically and can afford the time to optimize every time you rebuild your index, then optimizing is reasonable and it will increase the searching performance.

> **Note:** Ensure after the initial optimization, that a periodic execution of the optimization process is carried out in order to preserve the performance benefits.

This operation can be performed using the SOLR REST API by default available it is available at `http://127.0.0.1:8983/solr/alfresco/update?optimize=true` or by clicking the `Optimize now` button in the **Core > Overview** section of the Solr Admin interface.

You can optimize the index by reducing it to `N` segments with `N` >= 1.

```text
http://127.0.0.1:8983/solr/alfresco/update?optimize=true&maxSegments=N
```

This can be useful for reducing the impact of the force merge operation. The advantages of using `N` >= 1 are:

* The force merge execution takes less resources.
* Avoids the production of a single large segment.

The value of `N` must be chosen carefully. `N` should be smaller than the current number of segments. Moreover, it is possible that some segments are not selected for merging. Consequentially, not all the deleted documents maybe removed from the index.

## Merging parameters

From version 2.0.2 following parameters has been exposed to be used from `solrcore.properties` file.

| Property | Description |
| ------------- |----------- |
| merge.policy.maxMergedSegmentMB | This number shoud be increased for large deployments. For instance, when using a 40+ million indexed nodes with content on a SOLR Shard. You may use `10240` instead of `5120`. The default is `5120`. |
| merge.policy.maxMergeAtOnce | The numbers should be decreased in order to reduce the number of segments. This also improves searching performance when using 40+ million indexed nodes with content on a SOLR Shard. You may use `5` instead of `10`. The default value is `10`, **Note:** The value used must be the same as for `merge.policy.segmentsPerTier`. |
| merge.policy.segmentsPerTier | The numbers should be decreased in order to reduce the number of segments. This also improves searching performance when using 40+ million indexed nodes with content on a SOLR Shard. You may use `5` instead of `10`. The default value is `10`, **Note:** The value used must be the same as for `merge.policy.maxMergeAtOnce`. |
| merger.maxMergeCount | Increment this number for large deployments, so more merge operations can be executed simultaneously. The default value is `6`. |
| merger.maxThreadCount | This number should always be lower than the amount of dedicated CPUs and also lower than `mergermaxMergeCount`. Increment this number for large deployments in order to use all your available CPU threads. The default value is `3`. |

> **Note:** Changing any of these values requires a full re-index of your SOLR Core in order to get the performance benefits.
