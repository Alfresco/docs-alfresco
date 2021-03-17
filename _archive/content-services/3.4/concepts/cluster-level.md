---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
keyword: [High Availability, L2 cache, replication]
---

# Level 2 cache replication

The Level 2 \(L2\) cache provides out-of-transaction caching of Java objects inside the Alfresco system. Alfresco provides support for EHCache. Using EHCache does not restrict the Alfresco system to any particular application server, so it is completely portable.

The L2 cache objects are stored in memory attached to the application scope of the server. Sticky sessions must be used to keep a user that has already established a session on one server for the entire session. By default, the cache replication makes use of RMI to replicate changes to all nodes in the cluster using the Peer Cache Replicator. Each replicated cache member notifies all other cache instances when its content has changed.

Level 2 cache is a technology to speed up database access. When the application makes a database query, it does not have to do a \(costly\) SQL request if the object is already present in the Level 2 cache. For debugging purposes, you can disable the L2 cache. The database will keep working, but at a slower rate.

If you have issues with the replication of information in clustered systems, that is, the cache cluster test fails, you may want to confirm this by setting the following properties to true in the alfresco-global.properties file:

```
system.cache.disableMutableSharedCaches= 
system.cache.disableImmutableSharedCaches=
```

**Parent topic:**[High availability components](../concepts/ha-components.md)

