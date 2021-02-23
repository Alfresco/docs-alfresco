---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Tracking clustering issues

This section describes how to track clustering issues in Alfresco 4.2.

-   The main clustering debug information can be customised using the following log4j setting \(default value is `INFO`\):  

```
log4j.logger.org.alfresco.enterprise.repo.cluster=info
```

-   For a better control and more detailed clustering debug information, the following category may be configured:  

```
org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap
```

This controls clustering initialisation and shutdown. It provides `INFO` level startup and shutdown messages. It also provides `WARN` level messages, if clustering is disabled or an invalid 4.2 license is installed.

Here is an example output:

```
12:38:38,769 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Cluster started, name:
      MainRepository-35ee3b27-0276-4224-9613-3fd8089c6e11
12:38:38,776 INFO [org.alfresco.enterprise.repo.cluster.core.ClusteringBootstrap] Current cluster
      members: 
    10.248.10.205:5701 (hostname: node1.alf.example.com)
    10.208.63.40:5701 (hostname: node2.alf.example.com)    
```

-   When a cluster member leaves or joins, the following class generates an informative `INFO` level message:

```
org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger  
```

Here is an example output:

```
12:38:47,560 INFO [org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger] Member joined:
      10.65.41.64:5701 (hostname: node1.alf.example.com)
12:38:47,569 INFO [org.alfresco.enterprise.repo.cluster.core.MembershipChangeLogger] Current cluster
      members:
    10.208.63.40:5701 (hostname: solr.alf.example.com)
    10.248.10.205:5701 (hostname: node2.alf.example.com)
    10.65.41.64:5701 (hostname: node1.alf.example.com)
```

-   An important aspect of clustering is caching. To log cache creation \(for example, increase the cache related logging to DEBUG level\), enable the following log categories:

    ```
    log4j.logger.org.alfresco.enterprise.repo.cluster.cache=DEBUG
    log4j.logger.org.alfresco.repo.cache=DEBUG
    ```


-   The underlying clustering technology, Hazelcast, is configured in Alfresco to use `log4j` for logging. Therefore, you can configure logging for the whole Hazelcast top-level package, as shown below:

```
log4j.logger.com.hazelcast=info
```

To increase logging from Hazelcast’s member joining mechanism, enable the following log category:

```
log4j.logger.com.hazelcast.impl.TcpIpJoiner=debug
```

**Parent topic:**[Setting up clustering](../concepts/ha-intro.md)

