---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem FTP
---

# `CachingContentStore` properties

This topic describes the properties that you can configure for the `CachingContentStore` class.

The following properties are used in the sample context file, caching-content-store-context.xml.sample and can be set in the alfresco-global.properties file. Their default values are provided in the repository.properties file.

-   **system.content.caching.cacheOnInbound=true**

    Enables write-through caching. If true, an attempt to write the content to the backing store results in the item being cached. Therefore, the first time an item is read \(provided the item has not been removed from the cache in the mean time\), the file is already cached locally for faster access times. It is recommended that this property is set to `true` for most usage scenarios.

-   **system.content.caching.maxDeleteWatchCount=1**

    Defines the number of times the file must have been observed as being available for deletion by previous cleanup runs before it is actually deleted. The default value is always set to 1, but can be increased if readers obtained from the cache could not be used due to the underlying file being deleted.

-   **system.content.caching.contentCleanup.cronExpression=0 0 3 \* \* ?**

    Specifies how often the cached content cleanup job will run. The supplied value is a quartz expression and is similar to a Unix cron expression. In this case, the cleaner will run at 3 am every morning.

-   **system.content.caching.timeToLiveSeconds=0**

    Specifies the maximum time in seconds that an item can exist in the cache. After this time elapses, the item will no longer be cached and a request for the content URL will result in the item being fetched from the backing store and cached afresh. A value of 0 means that items will not have a TTL parameter applied to them.

-   **system.content.caching.timeToIdleSeconds=60**

    Specifies the maximum time an item in the cache can exist without being requested. Each time the item is accessed, the Time To Idle parameter is refreshed and the item will remain in the cache.

-   **system.content.caching.maxElementsInMemory=5000**

    Applies to the lookup table in the ContentCache. Each content URL requires two entries in the lookup table, so a value of 5000 can allow 2500 content items to be held in memory for the lookup table.

-   **system.content.caching.maxElementsOnDisk=10000**

    Applies to the lookup table in the ContentCache. Each content URL requires two entries in the lookup table, so a value of 10000 can allow 5000 items to be held on disk.

-   **system.content.caching.minFileAgeInMillis=2000**

    Specifies that files must be at least this age before they are marked for deletion. This also stops unnecessary checks, such as loading and examining the associated properties file.

-   **system.content.caching.maxUsageMB=4096**

    Specifies the maximum disk usage in MB that cached content should consume. In other words, this property defines the disk space quota allocated to the $\{dir.cachedcontent\} directory. It is used by the `StandardQuotaStrategy` class as configured in the caching-content-store-context.xml.sample file.

-   **system.content.caching.maxFileSizeMB=0**

    Specifies the maximum size in MB of any individual file of cached content. Content larger than this size can still be retrieved using the `CachingContentStore` class but the content will not be cached. If this property is set to zero, then no size limit will apply to the individual files. This property is used by the `StandardQuotaStrategy` class as configured in the caching-content-store-context.xml.sample file.


**Parent topic:**[Caching content store \(CCS\)](../concepts/ccs-home.md)

