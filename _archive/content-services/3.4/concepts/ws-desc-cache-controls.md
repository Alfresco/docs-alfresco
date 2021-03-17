---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, caching]
---

# Descriptor cache controls

When developing a web script, you can specify whether its response is to be cached and, if so, how it is to be cached through the web script descriptor document.

The optional `<cache>` element of the web script descriptor provides the following cache flags:

-   **`never`**

    \(Optional\) Specifies whether caching should be applied at all. If true, the web script response should never be cached; otherwise, the web script response may be cached.


-   **`public`**

    \(Optional\) Specifies whether authenticated responses should be cached in a public cache. If true, the web script response should never be cached; otherwise, the web script response may be cached.


-   **`mustrevalidate`**

    \(Optional\) Specifies whether a cache must revalidate its version of the web script response in order to ensure freshness. If true, the cache must revalidate; otherwise, the cache may revalidate.


For example, the following web script descriptor specifies that responses may be cached, but never in a public cache as the response requires authentication, and that the cache must revalidate to ensure freshness of the content.

```
<webscript>
  <shortname>Design time cache sample</shortname>
  <url>/cache</url>
  <authentication>user</authentication>
  <cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
</cache>
</webscript>
```

**Parent topic:**[Caching](../concepts/ws-caching-about.md)

