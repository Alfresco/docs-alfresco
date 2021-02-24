---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: hasAspect
---

# `hasAspect`

`hasAspect(node, aspect)` returns whether a `TemplateNode` has a particular aspect applied to it. The aspect name can be either the fully qualified QName or the short prefixed name string.

## Parameters

-   **node**

    The `TemplateNode` to test for the presence of the specified aspect.

-   **aspect**

    A string representing the aspect to check for. The aspect name can be either the fully qualified QName or the short prefixed name string


## Returns

Returns 1 on true, 0 on false.

## Example

```

        
<#assign result = companyhome.hasAspect("cm:taggable")>
        
<p>result: <#if result>TRUE<#else>FALSE</#if></p>

<#-- test node passed from JS is taggable -->
                            
<#assign result = node.hasAspect("cm:taggable")>
                                   
<p>result: <#if result>TRUE<#else>FALSE</#if></p>


```

The preceding code snippet would produce output similar to the following:

```

result: FALSE

result: TRUE        
      
```

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

