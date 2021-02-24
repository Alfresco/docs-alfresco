---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Starting the repository server cluster

Use this information to start the repository server cluster.

In most cases, it is not necessary to apply any clustering-specific configuration - just starting the servers will result in a cluster.

Let's suppose you have two cluster members on IP addresses, 10.244.50.101 and 10.244.50.102. Upon starting the first member, you should see the log message similar to the one shown:

```
2013-08-05 17:06:31,794  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:31,797  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.101:5701 (hostname: repo1.local)
```

This shows that a cluster name has been automatically generated, based on the repository name \(`MainRepository`\) and a UUID \(a random/ unique identifier\). Finally, the cluster has been started and the cluster members are listed. As shown in the log message, only one cluster member is present currently.

Upon starting the second member, you should see the log message similar to the one shown:

```
2013-08-05 17:06:58,350  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Cluster started,
      name: MainRepository-2c0aa5c6-e38a-4f64-bd29-1a7cf9894350
2013-08-05 17:06:58,353  INFO  [cluster.core.ClusteringBootstrap] [Thread-3] Current cluster members:
  10.244.50.102:5701 (hostname: repo2.local)
  10.244.50.101:5701 (hostname: repo1.local)
```

This log message shows that both the servers are now members of the same cluster.

**Note:** When starting up a clustered environment, the nodes in the cluster should be started in a rolling start, such that each node is fully started before the next is started in the cluster. This prevents any resource/load concurrency conflicts.

**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

