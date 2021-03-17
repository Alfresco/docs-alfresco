---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: core services repository cache
---

# Configuring the repository cache

The Alfresco repository provides in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.

Clustering is enabled and initialized by installing a valid clustering license. In this case, the caches are provided and managed by Hazelcast. On the other hand, when clustering is not enabled, caching is provided by Google’s ConcurrentLinkedHashMap library, which is a high performance version of `java.util.LinkedHashMap` for use as a software cache. For details see, [https://code.google.com/p/concurrentlinkedhashmap/](https://code.google.com/p/concurrentlinkedhashmap/).

In both clustered and non-clustered cases, caching is configured and used in the same unified way.

-   **[Individual cache settings](../concepts/cache-indsettings.md)**  
Alfresco uses cache properties for both clustered and non-clustered configurations. The properties for configuring the cache settings are listed in the caches.properties file, which is found in the <installLocation\>/tomcat/webapps/alfresco/WEB-INF/classes/alfresco directory.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

