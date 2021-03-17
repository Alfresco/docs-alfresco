---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr replication: advantages and disadvantages

There are advantages and disadvantages of using a master-slave replication.

A system with master-slave index replication offers the following advantages and disadvantages:

**Advantages**

-   Splits read and write load and operations
-   Load distribution for search queries
-   High availability for searching
-   Any number of slave instances can be created to scale query performance
-   Usually less frequent index updates on the slaves and better use of the cache

**Disadvantages**

-   Increased latency \(sum of tracking and Solr replication latency\)
-   Occasional large IO load to replicate large merges
-   Complicated load balance and management
-   Reconfiguration if the master is lost

**Parent topic:**[Solr replication](../concepts/solr-replication.md)

