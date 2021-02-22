---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring `CachingContentStore`

To demonstrate step-by-step configuration of the `CachingContentStore` class, the spring context file, caching-content-store-context.xml.sample is the starting point for adding caching to a content store. Once configured, you can activate the sample file by removing the .sample file extension and placing it in your Alfresco installation extension directory at <ALFRESCO\_HOME\>/tomcat/shared/classes/alfresco/extension.

1.  Define an instance of the `CachingContentStore` class. This is the top level bean that ties together the CCS as a whole.

    ```
    <bean id="fileContentStore" class="org.alfresco.repo.content.caching.CachingContentStore" init-method="init">
      <property name="backingStore" ref="backingStore"/>
      <property name="cache" ref="contentCache"/>
      <property name="cacheOnInbound" value="${system.content.caching.cacheOnInbound}"/>
      <property name="quota" ref="standardQuotaManager"/>
    </bean> 
    ```

    In this case, the `fileContentStore` bean is overridden. The `ContentService` bean uses `fileContentStore` bean, so CCS is used automatically. You can also specify a different name and an overridden `contentService` bean. The main collaborators of `backingStore`, `cache` and `quota` refer to the beans for Backing Store, Content Cache and Quota Manager as shown in the diagram in the [CachingContentStore overview](../concepts/ccs-overview.md) topic. Each `CachingContentStore` class should have its own dedicated instances of these collaborators and they should not be shared across other `CachingContentStore` beans, should you have any defined.

2.  Define a backing store. This CCS uses this ContentStore to provide caching for `TenantRoutingS3ContentStore`.

    ```
    <bean id="tenantRoutingContentStore" 
             class="org.alfresco.module.org_alfresco_module_cloud.repo.content.s3store.TenantRoutingS3ContentStore" 
             parent="baseTenantRoutingContentStore">
           
      <property name="defaultRootDir" value="${dir.contentstore}" />
      <property name="s3AccessKey" value="${s3.accessKey}" />
      <property name="s3SecretKey" value="${s3.secretKey}" />
      <property name="s3BucketName" value="${s3.bucketName}" />
      <property name="s3BucketLocation" value="${s3.bucketLocation}" />
      <property name="s3FlatRoot" value="${s3.flatRoot}" />
      <property name="globalProperties">
        <ref bean="global-properties" />
      </property>
       
    </bean>
    ```

    **Note:** Remember to change this bean's ID to `backingStore` for use with the preceding XML snippet, or change the `ref` attribute in the `fileContentStore` bean definition to refer to the correct ID \(`tenantRoutingContentStore`\).

3.  Define a ContentCache. This object is responsible for placing content into \(and retrieving content from\) the cache.

    ```
    <bean id="contentCache" class="org.alfresco.repo.content.caching.ContentCacheImpl">
      <property name="memoryStore" ref="cachingContentStoreCache"/>
      <property name="cacheRoot" value="${dir.cachedcontent}"/>
    </bean>
    ```

    The `ContentCacheImpl` uses a fast lookup table provided by Ehcache for determining whether an item is currently cached by the CCS, for controlling the maximum number of items in the cache and their Time To Live \(TTL\). The lookup table is specified here by the `memoryStore` property. The `ContentCacheImpl` also uses a directory on the local filesystem for storing binary content data \(the actual content being cached\). This directory is specified by the `cacheRoot` property. The following code illustrates the bean referencing the `memoryStore` reference above:

    ```
    <bean id="cachingContentStoreCache" class="org.alfresco.repo.cache.EhCacheAdapter">
           <property name="cache">
               <bean class="org.springframework.cache.ehcache.EhCacheFactoryBean">
                   <property name="cacheManager">
                       <ref bean="internalEHCacheManager" />
                   </property>
                   <property name="cacheName">
                       <value>org.alfresco.cache.cachingContentStoreCache</value>
                   </property>
                   <property name="eternal" value="false"/>
                   <property name="timeToLive" value="${system.content.caching.timeToLiveSeconds}"/>
                   <property name="timeToIdle" value="${system.content.caching.timeToIdleSeconds}"/>
                   <property name="maxElementsInMemory" value="${system.content.caching.maxElementsInMemory}"/>
                   <property name="maxElementsOnDisk" value="${system.content.caching.maxElementsOnDisk}"/>
                   <property name="overflowToDisk" value="true"/>
                   <property name="diskPersistent" value="true"/>
               </bean>
           </property>
       </bean>
    ```

4.  Now that you have configured the key components of the `CachingContentStore` class, backing store \(ContentStore\) and ContentCache, you can optionally specify a quota manager. If you do not wish to specify the quota manager, then the `UnlimitedQuotaStrategy` will be used. The example CCS bean above expects this bean to be defined:

    ```
    <bean id="standardQuotaManager"
           class="org.alfresco.repo.content.caching.quota.StandardQuotaStrategy"
           init-method="init"
           destroy-method="shutdown">
         <property name="maxUsageMB" value="4096"/>
         <property name="maxFileSizeMB" value="0"/>
         <property name="cache" ref="contentCache"/>
         <property name="cleaner" ref="cachedContentCleaner"/>
    </bean>
    ```

5.  Finally, to ensure that the disk space is used in a controlled manner, a `CachedContentCleaner` should be configured to clean up cached content files that are no longer being used by the cache.

    ```
    bean id="cachingContentStoreCleanerJobDetail" class="org.springframework.scheduling.quartz.JobDetailBean">
           <property name="jobClass">
               <value>org.alfresco.repo.content.caching.cleanup.CachedContentCleanupJob</value>
           </property>
           <property name="jobDataAsMap">
               <map>
                   <entry key="cachedContentCleaner">
                       <ref bean="cachedContentCleaner" />
                   </entry>
               </map>
           </property>
       </bean>
       
       <bean id="cachedContentCleaner"
           class="org.alfresco.repo.content.caching.cleanup.CachedContentCleaner"
           init-method="init">
           <property name="minFileAgeMillis" value="${system.content.caching.minFileAgeMillis}"/>
           <property name="maxDeleteWatchCount" value="${system.content.caching.maxDeleteWatchCount}"/>
           <property name="cache" ref="contentCache"/>
           <property name="usageTracker" ref="standardQuotaManager"/>
       </bean>
       
       <bean id="cachingContentStoreCleanerTrigger" class="org.alfresco.util.CronTriggerBean">
           <property name="jobDetail">
               <ref bean="cachingContentStoreCleanerJobDetail" />
           </property>
           <property name="scheduler">
               <ref bean="schedulerFactory" />
           </property>
           <property name="cronExpression">
               <value>${system.content.caching.contentCleanup.cronExpression}</value>
           </property>
       </bean>
    ```

    Note that both the cleaner and the quota manager limit the usage of disk space but hey do not perform the same function. In addition to removing the orphaned content, the cleaner's job is to remove files that are out of use from the cache due to parameters, such as TTL, which sets the maximum time an item should be used by the CCS. The quota manager exists to set specific requirements in terms of allowed disk space.

    A number of property placeholders are used in the above definitions. You can replace them directly in your configuration with the required values, or you can use the placeholders as they are and set the values in the repository.properties file. An advantage of using the property placeholders is that the sample file can be used with very few changes and the appropriate properties can be modified to get the CCS running with little effort.


**Parent topic:**[Caching Content Store \(CCS\)](../concepts/ccs-home.md)

