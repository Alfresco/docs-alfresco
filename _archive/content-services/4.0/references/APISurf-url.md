---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# url

The `url` object provides the following properties.

|`context`|The page root context path \(for example, /share\).|
|`servletContext`|The page root context path and servlet path \(for example, /share/page\).|
|`uri`|The page URI \(no URL arguments\) \(for example, /share/page/mylogin\).|
|`url`|The complete page URL \(for example, /share/page/mylogin?user=test\).|
|`queryString`|The query string from the URL \(for example, user=test&a=1\).|
|`args`|A map of URL argument name/value pairs.|
|`templateArgs`|A map of URL templated arguments name/value pairs.Defining the `templateArgs` object is an optional feature of some custom Page Mapper implementations. The Page Mapper may dissect the URL and extract additional arguments from its structure as based on a preconfigured template. For example, in the Alfresco Share application, a templated current “site” argument is extracted from the URL.

|

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

