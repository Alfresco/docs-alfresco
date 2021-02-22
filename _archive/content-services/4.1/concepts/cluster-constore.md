---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: high availability content store replication
---

# Content store replication

The underlying content binaries are distributed by either sharing a common content store between all machines in a cluster or by replicating content between the clustered machines and a shared store\(s\). The common store is simpler and more prevalent.

When using multiple content stores, each cluster stores content and retrieves content from its primary content store. Both content stores share a replicated content store. Content placed in a primary content store is copied to the replicated content store in a process known as outbound replication. The effect is that two copies of the content exist, one in the primary content store and another in the replicated content store.

If a request for that content occurs on another node, the application first looks for the content item in the primary content store of that node. If it is not there, the application looks to the replicated content store.

**Note:** If inbound replication is configured, the replicated content store copy is then copied to the requesting node’s primary content store.

**Parent topic:**[High availability components](../concepts/ha-components.md)

