---
title: Alfresco Documentation
---

## Dynamic shard registration

In dynamic shard registration, shards register as a part of the tracking process to form indexes, thereby eliminating the need to follow the manual shard distribution pattern over Solr nodes.

Unlike manual sharding, dynamic sharding does not require shards and instances to be distributed correctly over a known set of hosts. Query is resilient, with a configurable delay to instances coming and going. For manual sharding, all instances must be available on the expected host at the expected URL. While dynamic shard registration allows different numbers of instances for any shard, manual sharding does not.

To enable dynamic sharding, set the following property in the alfresco-global.properties file:

```bash
solr.useDynamicShardRegistration=true
```

The following properties govern which instances are chosen for a query:

```bash
search.solrShardRegistry.purgeOnInit=true
search.solrShardRegistry.shardInstanceTimeoutInSeconds=300
search.solrShardRegistry.maxAllowedReplicaTxCountDifference=1000
```

|Property|Description|Example|
|--------|-----------|-------|
|search.solrShardRegistry.purgeOnInit|If true, this property removes persisted shard state from the database when the subsystem starts.|true|
|search.solrShardRegistry.shardInstanceTimeoutInSeconds|Specifies that if a shard has not made a tracking request within this time, it will not be used for query. > **Note:** When tracking large change sets or rebuilding your indexes, increase the shard timeout. For example, change the value of this property to 3200 or 7200 seconds.

|300 seconds|
|search.solrShardRegistry.maxAllowedReplicaTxCountDifference|Specifies that if any shard is more than this number of transactions behind the leading instance, it will not be used.|1000 transactions|

If there is more than one index for a store, the most up to date index (the one that has indexed most transactions) will be used. For each shard, an instance is chosen at random from all the shards that are actively tracking and within 1000 transactions of the lead instance.

Shards are considered to be part of the same index if they:

 * track the same store
 * use the same template (and therefore, Solr schema)
 * have the same number of shards
 * use the same partitioning method with the same configuration, if any is required
 * have the same setting to transform or ignore content

In dynamic sharding, shards can be created using the same API as manual sharding or you can list the required shards as a comma-separated list of `shardIds`.

```
http://localhost:8080/solr/admin/cores?action=newCore&storeRef=workspace://SpacesStore&numShards=10&
numNodes=1&nodeInstance=1&property.data.dir.root=<SOLR_HOME>/solrhome/workspace-SpacesStore&shardIds=0,1,2,3,4
```

The status of all the available indexes, shards, and instances can be found using a JMX client. For more information, see [Indexing information available in a JMX client](../tasks/index-info-jmx.md).

Dynamic sharding will currently use partial indexes to answer queries. For example, there are two shards: Shard1 and Shard2. If there are no instances for Shard2, queries will only use Shard1.
