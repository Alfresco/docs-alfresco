---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# **Configuring the repository cache**

The Alfresco repository provides in-memory caches. These caches are transaction safe and can be clustered. Caches greatly improve repository performance but they use Java heap memory.

Tuning the caches in a wrong way may lead to out of memory issues. The optimal settings to use on the caches depend on your usage and the amount of memory available to your Alfresco server.

An important indicator that you need to tune or increase your caches is when you see a warning message in your alfresco.log file indicating that some specific caches are full, for example:

```
2016-04-26 17:51:37,127 WARN [org.alfresco.repo.cache.TransactionalCache.org.alfresco.cache.node.nodesTransactionalCache] 
[http-apr-22211-exec-42] Transactional update cache 'org.alfresco.cache.node.nodesTransactionalCache' is full (125000).
```

From Alfresco One version 5.0 and later, the caches can be configured by setting the cache properties in the alfresco-global.properties file. In both clustered and non-clustered cases, caching is configured and used in the same unified way.

**Note:** It is advisable not to change the cache values unless you have performance issues.

1.  Download the [tx-cache-context.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/tx-cache-context.xml) file and [caches.properties](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/caches.properties) file.

    The caches.properties file lists a series of properties for configuring a cache. The cache properties are used for both clustered and non-clustered configurations.

2.  Check your alfresco.log file to locate the caches shown in the warning message.

    For example, if you see the following warning message in alfresco.log:

    ```
    2016-04-26 17:51:37,127 WARN [**org.alfresco.repo.cache.TransactionalCache**.org.alfresco.cache.node.nodesTransactionalCache] 
    [http-apr-22211-exec-42] Transactional update cache 'org.alfresco.cache.node.nodesTransactionalCache' is full (125000).
    ```

    search for the bean that matches the class `org.alfresco.repo.cache.TransactionalCache` in the tx-cache-context.xml file.

    Here's an example of the cache:

    ```
    <!-- The transactional cache for Nodes -->
       
       <bean name="node.nodesCache" class="**org.alfresco.repo.cache.TransactionalCache**">
          <property name="sharedCache">
             <ref bean="node.nodesSharedCache" />
          </property>
          <property name="name">
             <value>org.alfresco.cache.node.nodesTransactionalCache</value>
          </property>
          <property name="maxCacheSize" value="${**cache.node.nodesSharedCache**.tx.maxItems}" />
          <property name="mutable" value="true" />
          <property name="allowEqualsChecks" value="true" />
          <property name="disableSharedCache" value="${system.cache.disableMutableSharedCaches}" />
          <property name="cacheStats" ref="cacheStatistics"/>
          <property name="cacheStatsEnabled" value="${**cache.node.nodesSharedCache**.tx.statsEnabled}"/>
       </bean>
    ```

    **Note:** As shown above, the `nodesCache` cache uses variables with the `cache.node.nodesSharedCache.*` syntax, for example, `cache.node.nodesSharedCache.tx.maxItems`.

    The caches.properties file uses properties that align with the `cache.node.nodesSharedCache` syntax.

    ```
    cache.node.nodesSharedCache.tx.maxItems=125000
    cache.node.nodesSharedCache.tx.statsEnabled=${caches.tx.statsEnabled}
    cache.node.nodesSharedCache.maxItems=250000
    cache.node.nodesSharedCache.timeToLiveSeconds=300
    cache.node.nodesSharedCache.maxIdleSeconds=0
    cache.node.nodesSharedCache.cluster.type=invalidating
    cache.node.nodesSharedCache.backup-count=1
    cache.node.nodesSharedCache.eviction-policy=LRU
    cache.node.nodesSharedCache.eviction-percentage=25
    cache.node.nodesSharedCache.merge-policy=hz.ADD_NEW_ENTRY
    cache.node.nodesSharedCache.readBackupData=false
    ```

3.  Add the `*.tx.maxItems` and `*.maxItems` properties to the alfresco-global.properties file.

4.  Increase the value of the `*.tx.maxItems` and `*.maxItems` properties for the cache you want to tune.

    For example, in the alfresco-global.properties file change the default setting from:

    ```
    #cache.node.nodesSharedCache.tx.maxItems=125000
    #cache.node.nodesSharedCache.maxItems=250000
    ```

    to

    ```
    cache.node.nodesSharedCache.tx.maxItems=250000
    cache.node.nodesSharedCache.maxItems=2500000
    ```

    **Note:** Make sure that:

    -   `cache.node.nodesSharedCache.tx.maxItems` is not be greater than `cache.node.nodesSharedCache.maxItems`, and
    -   `cache.node.nodesSharedCache.maxItems` is greater than or equal to `cache.node.nodesSharedCache.tx.maxItems`.
5.  Restart Alfresco to apply the configuration changes.


-   **[Individual cache settings](../concepts/cache-indsettings.md)**  
Alfresco uses cache properties for both clustered and non-clustered configurations.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

