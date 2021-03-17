---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Setting up Share cluster

This section provides information about cluster configuration for Share.

-   **[Configuring Hazelcast between Share instances using multicast](../concepts/hazelcast-cluster-share.md)**  
This section describes the configuration of Hazelcast clustering between instances of Share using multicast.
-   **[Configuring Hazelcast between Share instances using TCP Direct](../tasks/hazelcast-cluster-tcp.md)**  
Although by default Hazelcast uses multicast for discovery, it can also be configured to only use TCP/IP for environments where multicast is not available or preferred. This topic describes how to configure Hazelcast between Share instances using TCP Direct.
-   **[Configuring Share clustering](../tasks/cluster-share-config.md)**  
These steps are required for cluster configuration for Share. If you are using an HTTP load-balancing mechanism in front of a clustered installation, ‘sticky’ routing must be enabled for the HTTP requests made by the Share tier to the repository tier \(the /alfresco application\).
-   **[Recommended split\(s\)/ architecture](../concepts/recommend-split.md)**  
This topic describes the recommendations made for splitting the Alfresco architecture in a distributed or clustered environment.

**Parent topic:**[Setting up clustering](../concepts/ha-intro.md)

