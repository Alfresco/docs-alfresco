---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, caching]
---

# Runtime cache controls

Some cache controls can be set only during the execution of a web script, such as setting when the content of the response was last modified. To support this, the Web Script Framework provides a special root object named `cache` to all controller scripts for allowing cache controls to be set at runtime.

The `cache` root object provides the following API:

-   **`neverCache` \(read/write Boolean\)**

    Controls whether web script response should be cached at all; true means never cache. If not set, the default value is specified by the cache control section of the web script descriptor.


-   **`isPublic` \(read/write Boolean\)**

    Controls whether web script response should be cached by public caches. If not set, the default value is specified by the cache control section of the web script descriptor.


-   **`mustRevalidate` \(read/write Boolean\)**

    Controls whether cache must revalidate its version of the web script response to ensure freshness. If not set, the default value is specified by the cache control section of the web script descriptor.


-   **`maxAge` \(read/write long\)**

    Specifies the maximum amount of time \(in seconds, relative to the time of request\) that the response will be considered fresh. If not set, the default value is null.


-   **`lastModified` \(read/write date\)**

    Specifies the time that the content of the response last changed. If not set, the default value is null.


-   **`ETag` \(read/write string\)**

    Specifies a unique identifier that changes each time the content of the response changes. If not set, the default value is null.


**Parent topic:**[Caching](../concepts/ws-caching-about.md)

