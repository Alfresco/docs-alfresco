---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, cache]
---

# cache

Some cache controls can be set only during the execution of a web script, such as setting when the content of the response was last modified. To support this, the Web Script Framework provides a special root object named `cache` to all controller scripts for allowing cache controls to be set at runtime.

The `cache` object allows control over how the web script response is cached.

Caching is controlled through the following properties.

|`neverCache`|\(Read/write Boolean\) Controls whether web script response should be cached at all; true means never cache. If not set, the default value is specified by the cache control section of the web script definition.|
|`isPublic`|\(Read-only Boolean\) Controls whether web script response should be cached by public caches. If not set, the default value is specified by the cache control section of the web script definition.|
|`mustRevalidate`|\(Read-only Boolean\) Controls whether cache must revalidate its version of the web script response to ensure freshness. If not set, the default value is specified by the cache control section of the web script definition.|
|`maxAge`|\(Read/write long\) Specifies the maximum amount of time \(in seconds, relative to the time of request\) that the response will be considered fresh. If not set, the default value is null.|
|`lastModified`|\(Read/write date\) Specifies the time that the content of the response last changed. If not set, the default value is null.|
|`ETag`|\(Read/write string\) Specifies a unique identifier that changes each time the content of the response changes. If not set, the default value is null. This is useful for indicating to a client cache when content has changed.|

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

