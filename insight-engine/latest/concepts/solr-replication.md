---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr replication

Solr replication uses the master-slave model to distribute complete copies of a master index to one or more slave servers.

The master server receives all updates and all changes are made against a single master server. Changes made on the master are distributed to all the slave servers which service all query requests from the clients. This enables Solr to remain responsive even with high query traffic.

All trackers must be enabled on master nodes, while only model tracker and metadata tracker should be enabled on slaves.

The figure below shows a Solr configuration using index replication. The master server's index is replicated on the slaves.

![](../images/solr-replication.png)

The master-slave replication requires non-SSL communication between the master server and the slave server.

-   **[Solr replication: advantages and disadvantages](../concepts/solr-replication-adv.md)**  
There are advantages and disadvantages of using a master-slave and master-master replication.
-   **[Solr replication configuration](../concepts/solr-replication-conf.md)**  
The Solr replication feature is implemented as a `RequestHandler`. The simplest configuration involves one Alfresco Content Services node, one Solr master, and one Solr slave.
-   **[Solr master-slave reconfiguration](../concepts/master-slave-reconf.md)**  
There are additional master-slave configuration requirements for Solr, such as adding a slave server and promoting a slave server.
-   **[Solr master-master reconfiguration](../tasks/master-master-reconf.md)**  
Use this information for setting up a master-master replication.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

