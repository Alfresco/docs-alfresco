---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: High Availability
---

# Setting up high availability systems

This section describes how to implement multiple Alfresco instances in a high availability configuration.

**Attention:** In a clustered installation, concurrent writes to the same documents using file server protocols \(CIFS, FTP, or NFS\) are not currently recommended.

High Availability \(HA\) clusters are implemented in Alfresco to improve the availability of services and to improve performance of these services. Availability is enhanced through redundant nodes that provide services when other nodes fail. When integrated with a load balancer, performance is enhanced by distributing, or balancing, server workload across a collection of nodes.

A cluster represents a collection of nodes. For example, a set up of two tomcat nodes on two separate machines, talking to shared content store, shared database, but each with their own indexes. This is the simplest cluster to set up, gives redundancy due to the two machines, and can load-balance for performance or use the second node as a "hot spare" for fail over.

-   **[High availability components](../concepts/ha-components.md)**  
To ensure redundancy during runtime, the following components of the Alfresco system must be replicated and/or synchronized across each cluster:
-   **[High availability scenario](../concepts/ha-scenarios.md)**  
This scenario shows a single repository database and file system \(for the content store\) and multiple web application servers accessing the content simultaneously. The configuration does not guard against repository file system or database failure, but allows multiple web servers to share the web load, and provides redundancy in case of a web server failure. Each web server has local indexes \(on the local file system\).
-   **[Initiating clustering](../tasks/jgroups-repo.md)**  
This topic describes the process of initiating clustering and the options available for configuring Alfresco clustering.
-   **[Using EHCache multicast discovery](../tasks/ehcache-setup.md)**  
This section describes how to configure cluster discovery to use the EHCache multicast. Use this if you do not wish to use JGroups.
-   **[Configuring Hazelcast between Share instances](../concepts/hazelcast-cluster-share.md)**  
This section describes the configuration of Hazelcast clustering between instances of Share.
-   **[Verifying the cluster](../concepts/cluster-test-intro.md)**  
This section describes how to verify that clustering is working for the various components involved. You will need direct Explorer access to each of the machines in the cluster. The operation is done on machine one \(M1\) and verified on the other machines \(Mx\). The process can be switched around with any machine being chosen as M1.
-   **[Configuring Share clustering](../tasks/cluster-share-config.md)**  
These steps are required for cluster configuration for Share. If you are using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier \(the /alfresco application\).
-   **[Configuring the cache peer URLs](../tasks/cache-peerURLs-config.md)**  
This section describes how to control the cache peer URLs.
-   **[Tracking clustering issues](../tasks/cluster-track-issue.md)**  
This section describes how to track issues with clustering in a high availability environment.

**Parent topic:**[Administering](../concepts/ch-administering.md)

