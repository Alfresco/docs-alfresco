---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Setting up clustering

This section describes how to implement multiple Alfresco instances in a clustered environment.

A cluster represents a collection of nodes. For example, a set up of two tomcat nodes on two separate machines, talking to shared content store, shared database, but each with their own indexes. This is the simplest cluster to set up, gives redundancy due to the two machines, and can load-balance for performance or use the second node as a "hot spare" for fail over.

Clustering is implemented in Alfresco to provide high scalability and resilience. Improved performance is enhanced through redundant nodes that provide services when other nodes fail. When integrated with a load balancer, performance is enhanced by distributing, or balancing, server workload across a collection of nodes.

-   **[Clustering prerequisites when upgrading to Alfresco 4.2](../tasks/clustering-upgrade.md)**  
Consider these prerequisites when upgrading to Alfresco 4.2 in a clustered environment.
-   **[Setting up Share cluster](../concepts/cluster-share.md)**  
This section provides information about cluster configuration for Share.
-   **[Setting up repository server cluster](../concepts/cluster-overview.md)**  
This section describes how to implement an Alfresco version 4.2 repository server cluster.
-   **[CIFS clustering through load balancer](../tasks/cifs-clustering.md)**  
This topic describes the steps to configure CIFS clustering through the load balancer.
-   **[Tracking clustering issues](../concepts/cluster-track-issue-42.md)**  
This section describes how to track clustering issues in Alfresco 4.2.

**Parent topic:**[Administering](../concepts/ch-administering.md)

