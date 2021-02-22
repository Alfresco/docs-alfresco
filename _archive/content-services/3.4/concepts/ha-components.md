---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: Administration
option: High availability
---

# High availability components

To ensure redundancy during runtime, the following components of the Alfresco system must be replicated and/or synchronized across each cluster:

-   Content store
-   Indexes
-   Database
-   Level 2 cache

-   **[Content store replication](../concepts/cluster-constore.md)**  
The underlying content binaries are distributed by either sharing a common content store between all machines in a cluster or by replicating content between the clustered machines and a shared store\(s\). The common store is simpler and more prevalent.
-   **[Index synchronization](../concepts/cluster-indexsync.md)**  
Indexes provide searchable references to all nodes in Alfresco. The index store cannot be shared between servers. To keep the indexes up to date, a timed thread updates each index directly from the database when running in a cluster.
-   **[Database synchronization](../concepts/cluster-database.md)**  
It is possible to have co-located databases which synchronize with each other. To use co-located databases, refer to your database vendor documentation.
-   **[Level 2 cache replication](../concepts/cluster-level.md)**  
The Level 2 \(L2\) cache provides out-of-transaction caching of Java objects inside the Alfresco system. Alfresco provides support for EHCache. Using EHCache does not restrict the Alfresco system to any particular application server, so it is completely portable.

**Parent topic:**[Setting up high availability systems](../concepts/ha-intro.md)

