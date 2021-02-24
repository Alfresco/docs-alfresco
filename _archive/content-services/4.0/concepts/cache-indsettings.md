---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: core services cache settings
---

# Individual cache settings

All cache settings are in the <configRoot\>\\alfresco\\ehcache-default.xml file.

CAUTION:

Do not directly modify this file.

Some comments may show the approximate amount of Java heap memory required by the cache. Some object references are shared by the caches, so the amount of memory used is not as high as the approximate value may suggest. Cache tracing can show which caches fill quickly for your specific server usage pattern.

Each cache is configured in an XML block with the following parameters:

-   **`name`**

    The `name` attribute is the name of the cache and generally indicates the type of objects being cached.


-   **`maxElementsInMemory`**

    The `maxElementsInMemory` controls the maximum size of the cache. This value can be changed to tune the size of the cache for your system. Ehcache caches are implemented using a linked-map system, which means that memory is only required for objects that are actually in memory. If you set the `maxElementsInMemory` to a high value, it will not automatically allocate that number of slots. Instead, they are added to the linked list as required. When `maxElementsInMemory` is reached, the cache discards the oldest objects before adding new objects.


-   **`timeToIdleSeconds` - `timeToLiveSeconds`**

    `timeToIdleSeconds` and `timeToLiveSeconds` control the automatic timeout of cached objects.


-   **`overflowToDisk`**

    `overflowToDisk` controls whether the cache should overflow to disk rather than discarding old objects.


A typical trace is as follows:

The criteria are:

-   \(`MissCount - CurrentCount`\) must be as low as possible.

-   \(`HitCount/MissCount`\) must be as high as possible.


`Estimated maximum size` affects the permanent memory taken up by the cache. If the caches grow too large, they may crowd out transient session memory and slow down the system. It is useful to have this running, on occasion, to identify the caches with a low `HitCount/MissCount` ratio.

**Parent topic:**[Configuring the repository cache](../concepts/cache-memorysettings.md)

