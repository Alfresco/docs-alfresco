---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Individual cache settings

Alfresco uses cache properties for both clustered and non-clustered configurations.

To configure a cache, specify a series of properties where the property names begin with the cache name as specified in the Spring cache definition. For example, if the cache name is `cache.myCache`, then the properties should all start with `cache.myCache`.

For example:

```
cache.myCache.maxItems=20000
cache.myCache.timeToLiveSeconds=0 
```

The following properties are supported by both clustered and non-clustered \(for example, `cluster.type=local`\) caches:

-   **`maxItems`**

    The `maxItems` attribute is the maximum size a cache can reach. Use zero to set to `Integer.MAX_VALUE`.


-   **`eviction-policy`**

    When the `eviction-policy` attribute is set to `NONE`, the cache will not have a bounded capacity and the `maxItems` attribute will not apply. Any other value will cause the `maxItems` attribute to be enabled.

    Also, use `LRU` \(Least Recently Used\) or `LFU` \( Least Frequently Used\) algorithm with clustered caches so that the value is compatible in both modes \(required during startup\). Note that the actual value \(for example, `LRU`\) is of no consequence for the non-clustered caches and eviction is performed as for any Google Guava `CacheBuilder` created cache.


-   **`timeToLiveSeconds`**

    The `timeToLiveSeconds` attribute specifies that the cache items will expire once this time has passed after creation.


-   **`maxIdleSeconds`**

    The `maxIdleSeconds` attribute specifies that the cache items will expire when not accessed for this period.


-   **`tx.maxItems`**

    The `overflowToDisk` attribute is not a fully supported property as `TransactionalCache` is a separate entity but where a `TransactionalCache` bean has been defined, use `{cacheName}.tx.maxItems` to specify its capacity.


The following properties are available for fully-distributed caches and are not supported by the other cache types:

-   **`cluster.type`**

    The `cluster.type` attribute determines what type of cache is created when clustering is available. The acceptable values are:

    -   `fully-distributed`: Uses a Hazelcast IMap backed distributed cache. The cache values can be stored on any member of the cluster, hence the term fully-distributed.
    -   `local`: Always use a non-clustered cache. The cache values will not reflect updates made to the equivalent cache on another cluster member.
    -   `invalidating`: Uses a local cache, but when an update or a removal is issued to the cache, an invalidation message is broadcast to all members of the cluster and those members will remove the value from their cache. This value is useful where frequent reads are causing performance problems \(due to remote reads\) or where values are non-serializable.

-   **`backup-count`:**

    The `backup-count` attribute controls how many cluster members should hold a backup of the key/value pair.


-   **`eviction-percentage`**

    The `eviction-percentage` attribute controls what percentage of cache entries are shed when the capacity is reached.


-   **`merge-policy`**

    The `merge-policy` attribute determines how Hazelcast recovers from split brain syndrome, for example, `hz.ADD_NEW_ENTRY`. See [Network Partitioning \(Split-Brain Syndrome\)](http://hazelcast.org/docs/2.4/manual/html-single/#NetworkPartitioning) for more information.


**Parent topic:**[Configuring the repository cache](../tasks/cache-config.md)

