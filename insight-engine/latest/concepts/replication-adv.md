---
title: Solr replication: advantages and disadvantages
---
There are advantages and disadvantages of using a master-slave and master-master replication.

## Advantages and disadvantages of a master-slave index replication

### Advantages

* Splits read and write load and operations
*  Load distribution for search queries
* High availability for searching
* Any number of slave instances can be created to scale query performance
* Usually less frequent index updates on the slaves and better use of the cache

### Disadvantages

* Increased latency (sum of tracking and Solr replication latency)
* Occasional large IO load to replicate large merges
* Complicated load balance and management
* Reconfiguration if the master is lost

### Difference between the master-master and master-slave replication

|Master-master replication|Master-slave replication|
|-------------------------|------------------------|
|Requires all Solr nodes to do the leg-work of indexing.|Only the master server indexes or re-indexes. The slave servers only pull the completed indexes.|
|It is simple to set up. Each Solr node may have the same setup if the queries from Solr to the repository go through a load balancer instead of to a specific repository node.|It is not as simple as the master-master replication.|
|Achieves eventual consistency much more quickly than the master-slave replication.|Solr indexing is eventually consistent irrespective of the method used. It takes slightly longer in a master-slave replication because first the master index is updated and then that index change is replicated to the slave.|
|In a master-master replication, the master nodes can't be configured to perform differently in different situations.|In the master-slave replication, the master and slave nodes can be configured to perform better under different situations. For example, the master node can be configured for optimal indexing performance, while the slave node can be configured for optimal search performance.|
|Neither the master-master replication nor the master-slave replication includes any inbuilt functionality to switch Solr targets, in case one node fails.|Neither the master-master replication nor the master-slave replication includes any inbuilt functionality to switch Solr targets, in case one node fails.|
|If a master node went down, the load balancer will direct all the query requests to a Solr node that was still running.|If a slave node went down, the same load-balancer behaviour would be relied on. But if the master node went down, then intervention would be required to:-   Designate a new master
-   Point the slaves to that new master
-   Point the new master to the repository

|
| |Requires an additional master node, so has slightly higher pre-requisites.|
