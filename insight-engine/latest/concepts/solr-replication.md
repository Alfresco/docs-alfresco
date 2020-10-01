---
title: Solr replication
---
Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.

The master server receives all updates and all changes are made against a single master server. Changes made on the master are distributed to all the slave servers which service all query requests from the clients. This enables Solr to remain responsive even with high query traffic.

All trackers must be enabled on master nodes, while only model tracker and metadata tracker should be enabled on slaves.

The figure below shows a Solr configuration using index replication. The master server's index is replicated on the slaves.

![](../images/solr-replication.png)

The master-slave replication requires non-SSL communication between the master server and the slave server.
