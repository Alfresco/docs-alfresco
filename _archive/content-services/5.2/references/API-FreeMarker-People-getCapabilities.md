---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `getCapabilities`

`getCapabilities(person)` returns a map of capabilities for a given person.

## Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


## Returns

Returns a map of capabilities as boolean assertions for the specified person.

## Example

```


...
<#assign caps = people.getCapabilities(myPerson)>
<#assign keys = caps?keys>
<#list keys as k>
  <p>${k}: <#if caps[k]>TRUE<#else>FALSE</#if></p>
</#list>

```

The preceding code snippet would result in output such as the following:

```

isGuest: FALSE

isMutable: TRUE

isAdmin: TRUE        
      
```

**Parent topic:**[People API](../references/API-FreeMarker-People.md)

