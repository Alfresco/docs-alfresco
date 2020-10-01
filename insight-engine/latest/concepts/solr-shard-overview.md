---
title: Alfresco Documentation 
---

# Solr sharding

Solr sharding involves splitting a single Solr index into multiple parts, which may be on different machines. When the data is too large for one node, you can break it up and store it in sections by creating one or more shards, each containing a unique slice of the index.

Sharding is important for two primary reasons:

-   It allows you to horizontally split or scale your content volume.
-   It allows you to distribute operations, for example, index tracking, across shards (potentially on multiple nodes) therefore increasing performance/throughput.

Documents in the repository are distributed evenly across shards. You may have more than one shard, but a document will only be located in one shard and its instances. A conceptual shard can have any number of real instances. A shard tracks the appropriate subset of information from the repository.

> **Note:** Alfresco Content Services does not support slave shards or slave replicas.

A shard can have zero or more shard instances. Multiple shard instances have the following advantages:

-   It provides high availability in case a shard/node fails.
-   It allows you to scale out your search throughput because searches can be executed on all the instances in parallel.
-   It increases performance: search requests are handled by the multiple shard instances.

Note that if your Solr indexes are sharded, then index backup will be disabled.
