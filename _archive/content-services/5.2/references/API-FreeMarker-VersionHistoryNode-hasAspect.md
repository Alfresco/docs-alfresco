---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `hasAspect`

`hasAspect(aspect)` returns a boolean corresponding to whether or not the node has the specified aspect.

## Parameters

-   **aspect**

    A string representing the aspect to check for.


## Returns

Returns true if the specified aspect is present, false otherwise.

## Example

```


...
<p>auditable: <#if vhn.hasAspect("cm:auditable")>TRUE<#else>FALSE</#if></p>
<p>author: <#if vhn.hasAspect("cm:author")>TRUE<#else>FALSE</#if></p>
<p>title: <#if vhn.hasAspect("cm:titled")>TRUE<#else>FALSE</#if></p>
<p>taggable: <#if vhn.hasAspect("cm:taggable")>TRUE<#else>FALSE</#if></p>
...
        
      
```

**Parent topic:**[VersionHistoryNode API](../references/API-FreeMarker-VersionHistoryNode.md)

