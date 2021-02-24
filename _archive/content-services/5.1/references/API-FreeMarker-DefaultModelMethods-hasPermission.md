---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: hasPermission
---

# `hasPermission`

`hasPermission(node, permission)` returns whether a `TemplateNode` has the specified permission applied to it.

## Parameters

-   **node**

    The `TemplateNode` to test for the presence of the specified permission.

-   **permission**

    A string representing the permission to check for. Permissions include Read, Write, Delete, AddChildren and Execute.


## Returns

Returns 1 on true, 0 on false.

## Example

```

      
<#assign result = node.hasPermission("Delete")>                                  
<p>hasPermission: <#if result>TRUE<#else>FALSE</#if></p>


```

**Parent topic:**[Default model methods](../references/API-FreeMarker-defaultmodelmethods.md)

