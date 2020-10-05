---
title: Search and Insight Engine sharding methods
---
When an index grows too large to be stored on a single search server, it can be distributed across multiple search servers. This is known as sharding. The distributed/sharded index can then be searched using Alfresco/Solr's distributed search capabilities.

A specific configuration attribute, called `shard.method` defines the logic/strategy which controls how documents and ACLs are distributed across shards. Note this setting is configured in each Solr instance (i.e in each shard). So a shard will use that strategy for determining if the given incoming data belongs to it or not.

To use a specific sharding method, when creating a Solr node you must add the required configuration properties in `solrcore.properties`. The sharding method is set with the required property, `shard_method`. Additional properties may then be needed, depending on your chosen method. If an invalid `shard_method` is provided, then the system will fallback to DBID routing.

Alfresco Search and Insight Engine can use any of the following methods for routing documents and ACLs to shards.

### ACL (MOD\_ACL\_ID) v1

This sharding method is available in all versions of Search and Insight Engine.

    Nodes and access control lists are grouped by their ACL ID. This places the nodes together with all the access control information required to determine the access to a node in the same shard. Both the nodes and access control information are sharded. The overall index size will be smaller than other methods. Also, the ACL count is usually much smaller than the node count.

    This method is beneficial if you have lots of ACLs and the documents are evenly distributed over those ACLs. For example, if you have many Share sites, nodes and ACLs are assigned to shards randomly based on the ACL and the documents to which it applies.

    The node distribution may be uneven as it depends how many nodes share ACLs.

    To use this method when creating a shard, set the following configuration:

    ```bash
    shard.method=MOD_ACL_ID
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

### ACL (ACL\_ID) v2

This method is available in all versions of Search and Insight Engine.

    This sharding method is the same as `ACL ID` v1 except that the murmur hash of the ACL ID is used in preference to its modulus. This gives better distribution of ACLs over shards. The distribution of documents over ACLs is not affected and so the shard sizes can still be skewed.

    ```bash
    shard.method=ACL_ID
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

### DBID (DB\_ID)

This method is available in all versions of Search and Insight Engine and is the default sharding option in Solr 6. Nodes are evenly distributed over the shards at random based on the murmur hash of the DBID. The access control information is duplicated in each shard. The distribution of nodes over each shard is very even and shards grow at the same rate. Also, this is the fall back method if any other sharding information is unavailable.

    To use this method when creating a shard, set the following configuration:

    ```bash
    shard.method=DB_ID
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

### DBID range (DB\_ID\_RANGE)

This method is available in Search and Insight Engine 1.1 and later versions. This routes documents within specific DBID ranges to specific shards. It adds new shards to the cluster without requiring a reindex.

    DBID range sharding is the only option to offer auto-scaling as opposed to defining your exact shard count at the start. All the other sharding methods require repartitioning in some way.

    For each shard, you specify the range of DBIDs to be included. As your repository grows you can add shards. Note that when using `shard.range`, the range will be inclusive of the bottom value and exclusive of the top value.

    **Example 1:** You may aim for shards of 20M nodes in size and expect it to get to 100M over five years. You could create the first shard for nodes 0-20M. As you approach node 20M, you can create the next shard for nodes 20M-40M, and so on.

    To use this method when creating a shard, set the following configuration:

    ```bash
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

    If the property is not present on a node, sharding falls back to the DBID methodto randomly distribute these nodes.

    To use this method when creating a shard, set the following configuration:

    ```bash
    shard.key=exif:dateTimeOriginal
    shard.method=DATE
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

    Months can be grouped together, for example, by quarter. Each quarter of data would be assigned sequentially through the available shards.

    ```bash
    shard.date.grouping=3
    ```

### Metadata (PROPERTY)

This method is available in all versions of Search and Insight Engine. In this method, the value of some property is hashed and this hash is used to assign the node to a random shard. All nodes with the same property value will be assigned to the same shard

    Only properties of type `d:text`, `d:date` and `d:datetime` can be used. For example, the recipient of an email, the creator of a node, some custom field set by a rule, or by the domain of an email recipient. The keys are randomly distributed over the shards using murmur hash.

    If the property is not present on a node, sharding falls back to the DBID method to randomly distribute these nodes.

    To use this method when creating a shard, set the following configuration:

    ```bash
    shard.key=cm:creator
    shard.method=PROPERTY
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

    It is possible to extract a part of the property value to use for sharding using a regular expression, for example, a year at the start of a string:

    ```bash
    shard.regex=^\d{4}
    ```

    If the regular expression doesn't match the property (e.g. the string doesn't start with a four-digit year) then this causes a fallback to DBID sharding.

### Explicit Sharding (EXPLICIT\_ID)

This method is available in all versions of Search and Insight Engine. The node is assigned to a shard based on the value of a property (e.g. `cm:type`), which should contain the "explicit" numeric shard ID

    This method is similar to sharding by metadata. Rather than hashing the property value, it explicitly defines the shard where the node should go. If the property is absent or an invalid number, sharding will fall back to using the `DBID` sharding method. Only text fields are supported. Nodes are allowed to move shards. You can add, remove or change the property that defines the shard.

    To use this method when creating a shard, set the following configuration:

    ```bash
    shard.method=EXPLICIT_ID
    shard.key=cm:targetShardInstance
    shard.instance=<shard.instance>
    shard.count=<shard.count>
    ```

> **Note:** The **ACL v1 (MOD\_ACL\_ID)** sharding method was the only method available in Solr4.

### Availability matrix

|Index Engine|ACL v1|DB ID|Date/time|Metadata|ACL v2|DBID range|Explicit|
|------------|------|-----|---------|--------|------|----------|--------|
|Content Services 5.2.0+ Solr 4|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|
|Content Services 5.2.0+ Content Services 1.0|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|
|Content Services 6.1+ Search Services or Search and Insight Engine 1.1 + 1.0|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|
|Content Services 6.1+ Search Services or Search and Insight Engine 1.2+|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|

### Comparison Overview

|Index Engine|ACL v1|DB ID|Date/time|Metadata|ACL v2|DBID range|Explicit|
|------------|------|-----|---------|--------|------|----------|--------|
|All shards required|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|
|ACLs replicated on all shards|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|
|Can add shards as the index grows|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|
|Distribution of content over shards|Uneven|Very even|Quite even|Quite even|Quite even|Quite even|Quite even|
|Falls back to DBID sharding|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|
|One shard gets new content|![](../images/red-cross.png)

|![](../images/red-cross.png)

|Possible|Possible|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|
|Nodes can move shard|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/green-tick.png)

|![](../images/red-cross.png)

|![](../images/green-tick.png)

|
