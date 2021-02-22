---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Scenario: Clustering for high throughput

This is a scenario-based topic describing the clustering architecture for maximizing throughput of Alfresco Content Services services.

This setup shows a single repository database and content store. There are four nodes with Alfresco Content Services/Alfresco Share and two nodes with Solr, all accessing the content simultaneously. This set up provides a higher level of availability, reliability, and scalability, thereby maximizing the throughput of various services. Nodes in a cluster are positioned behind a load balancer that delegates requests to cluster members based on any one member’s ability/availability to handle the load.

Each Share instance is deployed into its own Tomcat servlet container. Alfresco Content Services services and CPU runtime footprint are optimized for high throughput under heavy concurrency with such a deployment. The load balancer fronts the cluster, and directs traffic to the member of the cluster most able to handle the current request.

**Note:** All the servers in a cluster should have static IP addresses assigned to them.

![](../images/cluster-throughput.png)

In this deployment scenario the following flows are present:

-   Client flow:
    -   Client sends the request to the main load balancer to reach Share application.
    -   Main load balancer analyses the load and redirects the client to one of Share hosts.
    -   Main load balancer uses the JSESSIONID cookie to stick the client to one of Share nodes.
    -   Share sends the web scripts requests to the local repository instance, renders the page, and returns it to the user via the main load balancer.

-   Alfresco Content Services internal flow:
    -   Repositories intercommunication is done via Hazelcast to replicate caches.
    -   Repositories share the same contentstore available via NFS/SAMBA share.
    -   Repositories share the same database schema.

-   Solr flow:
    -   Tracking tier: Two Solr instances periodically query repositories to detect new transactions, fetch new content, and build local indexes. Tracking is done through Solr load balancer, which analyses the load and distributes it across the repositories.
    -   Search tier: Four repository instances query two Solr instances on demand through the Solr load balancer.

-   **[Installing and configuring Alfresco Content Services Nodes](../tasks/install-config-alf.md)**  
Use this information to install and configure nodes in a cluster based on the scenario described in Scenario: Clustering for high throughput.
-   **[Installing and configuring Solr nodes](../tasks/install-config-solr.md)**  
This topic describes the instructions for installing and configuring Solr nodes in a cluster.

**Parent topic:**[Recommendations for split architecture](../concepts/recommend-split.md)

