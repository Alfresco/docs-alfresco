---
author: Alfresco Documentation
audience: 
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

-   **[Basic Solr sharding concepts](../concepts/solr-shard-terms.md)**  
There are a few basic concepts that are core to understanding Solr sharding. Understanding these concepts from the outset will help in learning more about sharding.
-   **[Search and Insight Engine sharding methods](../concepts/solr-shard-approaches.md)**  
When an index grows too large to be stored on a single search server, it can be distributed across multiple search servers. This is known as sharding. The distributed/sharded index can then be searched using Alfresco/Solr's distributed search capabilities.
-   **[Setting up Solr sharding](../concepts/solr-shard-config.md)**  
After creating the shards manually, an Alfresco Content Services administrator has to instruct Alfresco Content Services how to find the indexes. This can either be done manually by configuring the indexes, or by allowing Alfresco Content Services to discover shards dynamically. This section describes how to create and configure Solr sharding.
-   **[Backing up Solr shards](../concepts/shard-backup.md)**  
To avoid any data loss, you can make backups of one or all the sharded Solr indexes.
-   **[Best practices for setting up sharded Solr indexes](../references/sharding-best-practices.md)**  
 Use these best practices for setting up and using a sharded installation.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

