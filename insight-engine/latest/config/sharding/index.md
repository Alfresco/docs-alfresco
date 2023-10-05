---
title: Solr sharding 
---

Solr sharding involves splitting a single Solr index into multiple parts, which may be on different machines. When the data is too large for one node, you can break it up and store it in sections by creating one or more shards, each containing a unique slice of the index.

Sharding is important for two primary reasons:

* It allows you to horizontally split or scale your content volume.
* It allows you to distribute operations, for example, index tracking, across shards (potentially on multiple nodes) therefore increasing performance/throughput.

Documents in the repository are distributed evenly across shards. You may have more than one shard, but a document will only be located in one shard and its instances. A conceptual shard can have any number of real instances. A shard tracks the appropriate subset of information from the repository.

> **Note:** Alfresco Content Services does not support slave shards or slave replicas.

A shard can have zero or more shard instances. Multiple shard instances have the following advantages:

* It provides high availability in case a shard/node fails.
* It allows you to scale out your search throughput because searches can be executed on all the instances in parallel.
* It increases performance: search requests are handled by the multiple shard instances.

Note that if your Solr indexes are sharded, then index backup will be disabled.

## Basic Solr sharding concepts

There are a few basic concepts that are core to understanding Solr sharding. Understanding these concepts from the outset will help in learning more about sharding.

### Useful terminology

|Term|Description|
|----|-----------|
|Node|A node represents an Alfresco Content Services instance.|
|Cluster|A cluster is composed of one or more Alfresco Content Services nodes.|
|Shard group|A shard group is a collection of documents. It is composed of one or more shards.|
|Shard|An index is split into chunks called shards.|

### Basic concepts

A cluster is a collection of one or more nodes (servers) that provide indexing and search capabilities across all nodes. A node is a single server that is part of your cluster, stores your data, and participates in the cluster's indexing and search capabilities.

An index is a collection of documents from the same store. An index can potentially store a large amount of data that can exceed the hardware limits of a single node. To solve this problem, Content Services provides the ability to subdivide your index into multiple pieces called shards.

When you create an index, you define the number of shards that you want. Each shard is in itself a fully-functional and independent Solr index that can be hosted on any index server. Index server includes a node which must be in the cluster. It is recommended to have a fail over mechanism in case a shard/node fails or goes offline. As a solution, you can make one or more copies of your index's shards into shard instances.

![]({% link insight-engine/images/solr_terms.png %})

To summarize, each index can be split into multiple shards. An index can also be replicated zero (meaning no instance) or more times. A shard tracks the appropriate subset of information from the repository. The number of copies of the total index depends on the minimum number of instances for each shard.

## Search and Insight Engine sharding methods

When an index grows too large to be stored on a single search server, it can be distributed across multiple search servers. This is known as sharding. The distributed/sharded index can then be searched using Alfresco/Solr's distributed search capabilities.

A specific configuration attribute, called `shard.method` defines the logic/strategy which controls how documents and ACLs are distributed across shards. Note this setting is configured in each Solr instance (i.e in each shard). So a shard will use that strategy for determining if the given incoming data belongs to it or not.

To use a specific sharding method, when creating a Solr node you must add the required configuration properties in `solrcore.properties`. The sharding method is set with the required property, `shard_method`. Additional properties may then be needed, depending on your chosen method. If an invalid `shard_method` is provided, then the system will fallback to DBID routing.

Search and Insight Engine can use any of the following methods for routing documents and ACLs to shards.

### ACL (MOD_ACL_ID) v1

This sharding method is available in all versions of Search and Insight Engine.

Nodes and access control lists are grouped by their ACL ID. This places the nodes together with all the access control information required to determine the access to a node in the same shard. Both the nodes and access control information are sharded. The overall index size will be smaller than other methods. Also, the ACL count is usually much smaller than the node count.

This method is beneficial if you have lots of ACLs and the documents are evenly distributed over those ACLs. For example, if you have many Share sites, nodes and ACLs are assigned to shards randomly based on the ACL and the documents to which it applies.

The node distribution may be uneven as it depends how many nodes share ACLs.
To use this method when creating a shard, set the following configuration:

```text
shard.method=MOD_ACL_ID
shard.instance=<shard.instance>
shard.count=<shard.count>
```

### ACL (ACL_ID) v2

This method is available in all versions of Search and Insight Engine.

This sharding method is the same as `ACL ID` v1 except that the murmur hash of the ACL ID is used in preference to its modulus. This gives better distribution of ACLs over shards. The distribution of documents over ACLs is not affected and so the shard sizes can still be skewed.

```text
shard.method=ACL_ID
shard.instance=<shard.instance>
shard.count=<shard.count>
```

### DBID (DB_ID)

This method is available in all versions of Search and Insight Engine and is the default sharding option in Solr 6. Nodes are evenly distributed over the shards at random based on the murmur hash of the DBID. The access control information is duplicated in each shard. The distribution of nodes over each shard is very even and shards grow at the same rate. Also, this is the fall back method if any other sharding information is unavailable.

To use this method when creating a shard, set the following configuration:

```text
shard.method=DB_ID
shard.instance=<shard.instance>
shard.count=<shard.count>
```

### DBID range (DB_ID_RANGE) {#sharding-methods-db-id-range}

This method is available in Search and Insight Engine 1.1 and later versions. This routes documents within specific DBID ranges to specific shards. It adds new shards to the cluster without requiring a reindex.

DBID range sharding is the only option to offer auto-scaling as opposed to defining your exact shard count at the start. All the other sharding methods require repartitioning in some way.

For each shard, you specify the range of DBIDs to be included. As your repository grows you can add shards. Note that when using `shard.range`, the range will be inclusive of the bottom value and exclusive of the top value.

**Example 1:** You may aim for shards of 20M nodes in size and expect it to get to 100M over five years. You could create the first shard for nodes 0-20M. As you approach node 20M, you can create the next shard for nodes 20M-40M, and so on.

To use this method when creating a shard, set the following configuration:

```text
shard.method=DB_ID_RANGE
shard.range=0-20000000
shard.instance=<shard.instance>
```

**Example 2:** If there are 100M (million) nodes and you want to split them into 10 shards with 10M nodes each. So, at the start you can specify:

* 10 shards
* a shard to include 0-10M
* the second shard will have 10M - 20M nodes, third shard will have 20M - 30M nodes, and so on.
    Date-based queries may produce results from only a subset of shards as DBID increases monotonically over time.

### Date/Datetime (DATE)

This method is available in all versions of Search and Insight Engine. The date-based sharding assigns dates sequentially through shards based on the month.

**Example:** If there are 12 shards, each month would be assigned sequentially to each shard, wrapping round and starting again for each year. The non-random assignment facilitates easier shard management - dropping shards or scaling out replication for some date range. Typical aging strategies could be based on the created date or destruction date.

If the property is not present on a node, sharding falls back to the DBID method to randomly distribute these nodes.

To use this method when creating a shard, set the following configuration:

```text
shard.key=exif:dateTimeOriginal
shard.method=DATE
shard.instance=<shard.instance>
shard.count=<shard.count>
```

Months can be grouped together, for example, by quarter. Each quarter of data would be assigned sequentially through the available shards.

```text
shard.date.grouping=3
```

### Metadata (PROPERTY)

This method is available in all versions of Search and Insight Engine. In this method, the value of some property is hashed and this hash is used to assign the node to a random shard. All nodes with the same property value will be assigned to the same shard

Only properties of type `d:text`, `d:date` and `d:datetime` can be used. For example, the recipient of an email, the creator of a node, some custom field set by a rule, or by the domain of an email recipient. The keys are randomly distributed over the shards using murmur hash.

If the property is not present on a node, sharding falls back to the DBID method to randomly distribute these nodes.

To use this method when creating a shard, set the following configuration:

```text
shard.key=cm:creator
shard.method=PROPERTY
shard.instance=<shard.instance>
shard.count=<shard.count>
```

It is possible to extract a part of the property value to use for sharding using a regular expression, for example, a year at the start of a string:

```text
shard.regex=^d{4}
```

If the regular expression doesn't match the property (e.g. the string doesn't start with a four-digit year) then this causes a fallback to DBID sharding.

### Explicit Sharding (EXPLICIT_ID)

This method is available in all versions of Search and Insight Engine. The node is assigned to a shard based on the value of a property (e.g. `cm:type`), which should contain the "explicit" numeric shard ID

This method is similar to sharding by metadata. Rather than hashing the property value, it explicitly defines the shard where the node should go. If the property is absent or an invalid number, sharding will fall back to using the `DBID` sharding method. Only text fields are supported. Nodes are allowed to move shards. You can add, remove or change the property that defines the shard.

To use this method when creating a shard, set the following configuration:

```text
shard.method=EXPLICIT_ID
shard.key=cm:targetShardInstance
shard.instance=<shard.instance>
shard.count=<shard.count>
```

> **Note:** The **ACL v1 (MOD_ACL_ID)** sharding method was the only method available in Solr4.

### Availability matrix

|Index Engine|ACL v1|DB ID|Date/time|Metadata|ACL v2|DBID range|Explicit|
|------------|------|-----|---------|--------|------|----------|--------|
|Content Services 5.2.0+ Solr 4| Y | N | N | N | N | N | N |
|Content Services 5.2.0+ Content Services 1.0| Y | Y | Y | Y | Y | N | N |
|Content Services 6.1+ Search Services or Search and Insight Engine 1.1 + 1.0| Y | Y | Y | Y | Y | Y | N |
|Content Services 6.1+ Search Services or Search and Insight Engine 1.2+| Y | Y | Y | Y | Y | Y | Y |

### Comparison Overview

|Index Engine|ACL v1|DB ID|Date/time|Metadata|ACL v2|DBID range|Explicit|
|------------|------|-----|---------|--------|------|----------|--------|
|All shards required| Y | Y | Y | Y | Y | N | Y |
|ACLs replicated on all shards| N | Y | Y | Y | N | Y | Y |
|Can add shards as the index grows| N | N | N | N | N | Y | N |
|Distribution of content over shards|Uneven|Very even|Quite even|Quite even|Quite even|Quite even|Quite even|
|Falls back to DBID sharding| N | N | Y | Y | N | N | Y |
|One shard gets new content| N | N |Possible|Possible| N | Y | N |
|Nodes can move shard| Y | N | Y | Y | Y | N | Y |

## Backing up Solr shards

To avoid any data loss, you can make backups of one or all the sharded Solr indexes.

Trigger a backup with an `HTTP` command which instructs the `/replication` handler to backup the Solr shards, for example:

```http
curl http://solrshard20xbm.alfresco.com:9000/solr/<CORE_NAME>/replication?command=backup&numberToKeep=1
```

where:

`<CORE_NAME>` specifies the name of the core you are working with.

`numberToKeep` specifies the number of backups to keep.

> **Note:** The `location` parameter used for previous versions is no longer accepted. To specify a backup folder, use the `solr.backup.dir` parameter in the `solrcore.properties` file.

### Backup status

The backup operation can be monitored to see if it has completed by sending the `details` command to the `/replication` handler, for example:

```http
http://solrshard20xbm.alfresco.com:9000/alfresco-search-backups/<CORE_NAME>/replication?command=details
```

## Best practices for setting up sharded Solr indexes

Use these best practices for setting up and using a sharded installation.

### Do I need sharding?

If you plan to store 50 million + documents in your repository, you should consider sharding to maximize indexing performance and to enable horizontal scaling to massive content repositories.

### Do I need dynamic shard registration?

You can set up sharding using either manual or dynamic shard registration. We recommend that you use dynamic shard registration because it is easier to implement than manual sharding.

### How many shards should I have?

A general rule of thumb is to divide the total number of documents by 50M (million). If you want to increase the query load or support more than 100 concurrent users, then check the memory specifications or the I/O specifications of the installation machine.

### What are the reindexing recommendations for a sharded installation

We recommend that existing customers should reindex using the `rerank` core. This has the following benefits:

* Smaller index
* Better query performance particularly for phrases and stop words
* Improved cross-language search

This should allow the user to store anywhere between 50 million - 80 million documents in a single shard. For more information, see the [AHow Alfresco powered a 1.2 Billion document deployment on Amazon Web Services](https://www.alfresco.com/blogs/power-platform/how-alfresco-powered-12-billion-document-deployment-amazon-web-services){:target="_blank"} and [Alfresco 1 billion documents press release with Amazon Aurora](https://www.alfresco.com/news/press-releases/alfresco-achieves-benchmarking-milestone-processing-1-billion-documents-amazon){:target="_blank"}.

> **Note:** Note that changing the number of shards requires a reindex.

### Does sharding work with SSL enabled?

Alfresco Content Services 6.x uses Search and Insight Engine (Solr 6), so sharding is supported with full SSL and non-SSL. Make sure you configure the Solr and SSL settings properly.

For more information, see [Installation options]({% link insight-engine/latest/install/options.md %}).

### Are there any considerations for query load and number of documents?

Before sharding your Solr index, it is important to consider your query load and the size of your repository. You need to create machines to host Solr. For more information, see [Configuring Search and Insight Engine]({% link insight-engine/latest/config/index.md %}). For example, if you need 5 shards, you need to setup those 5 machines, and have Solr instances running on all the 5 machines. Once your machines are ready, you are ready to set up or register shards.

For more information, see [Setting up Solr sharding]({% link insight-engine/latest/config/sharding/create.md %}#do-i-need-dynamic-shard-registration).

### After upgrading, can I use my current index while building a new sharded index?

Yes. After upgrading to Alfresco Content Services 6.2, continue to use the old search index server as before, setup a new sharded Solr server with the `rerank` template to reindex the data, and finally, switch over to the new sharded index once the indexing is done and the sharded Solr server is up-to-date.

#### Upgrading from 5.0 with Solr 4 to 6.2 (with zero downtime)

1. Upgrade to 6.2 and continue to use the Solr 4 search service as before.
2. Configure a separate sharded Solr 4 index to track the repository. For details, see [Solr Sharding](#solr-sharding). 
3. While the new sharded Solr 4 builds its indexes, you can monitor the progress using the Solr Admin Web interface. For details, see [Solr security]({% link insight-engine/latest/config/security.md %}.
4. When the sharded Solr 4 index is updated, enable the sharded Solr 4 index by setting the `solr.host` property.

### How do I know the new sharded index is up-to-date?

Go to the Solr Admin Web interface at `https://localhost:8443/solr/#/alfresco` and monitor the value of `Approx transactions remaining`. If the value is `0`, it indicates that the index up-to-date.

### Can different shards be inconsistent?

Yes. In a sharded setup, eventual consistency can introduce additional query inconsistencies.

A node can move between shards either by:

* Moving the node, or
* Adding a new access control list to a node that did not previously have any ACLs defined.

When this happens, the shards may index at different rates. It is possible to see:

* Two copies of the node if it is added to a new shard before it is deleted from the original shard.
* No node if it is deleted from the original shard before being added to a new shard.

Indexing is eventually consistent. When updates happen at the same time, no inconsistency is seen.
