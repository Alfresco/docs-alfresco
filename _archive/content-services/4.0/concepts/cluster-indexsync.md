---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: High Availability index synchronization
---

# Index synchronization

Indexes provide searchable references to all nodes in Alfresco. The index store cannot be shared between servers. To keep the indexes up to date, a timed thread updates each index directly from the database when running in a cluster.

When a node is created \(this may be a user node, content node, or space node\), metadata is indexed and the transaction information is persisted in the database. When the synchronization thread runs on the other nodes in the cluster, the indexes on those nodes are updated using the transaction information stored in the database.

The tables that contain the index tracking information are:

|Table|Description|
|-----|-----------|
|`alf_server`|Each committing server has an entry in this table.|
|`alf_transaction`|Each write operation to nodes in Alfresco generates a unique transaction ID. The transaction is attached to the entry in the server table. The column `commit_time_ms` ensures that the transactions can be ordered by commit time. A unique GUID \(due to historical reasons\) is also attached here.|
|`alf_node`|An entry is created here for each node, including nodes that have been deleted. With each modification, the status is updated to refer to the transaction entry for the committing transaction.|

When indexes are updated on a machine \(for rebuilding or tracking\) the transactions are time-ordered. The server can then determine which nodes have been modified or deleted in a particular transaction.

**Parent topic:**[High availability components](../concepts/ha-components.md)

