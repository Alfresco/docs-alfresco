---
title: Solr master-master reconfiguration
---
Use this information for setting up a master-master replication.

1. Set up two separate Solr instances where neither of them know about each other.

    See [Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md).

2. If you have a clustered environment, both the Solr installations can be done on their own Alfresco nodes in the cluster. If you don't have a clustered environment, both the Solr nodes can talk to their respective Alfresco node directly.

3. The Alfresco node can send queries to the load balancer and the load balancer can point them to either Solr node 1 (if it is up) or Solr node 2 (if Solr node 1 is down).

4. The load balancer will distribute the queries between the two Solr nodes, but then both the Solr nodes will be eventually consistent at different times.
