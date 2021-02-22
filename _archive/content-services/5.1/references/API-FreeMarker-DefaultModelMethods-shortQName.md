---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: shortQName
---

# `shortQName`

`shortQName(longQName)` returns the shortQName equivalent of the specified longQName.

## Parameters

-   **longQName**

    A string representing the longQName to convert to a shortQName.


## Returns

Returns a string representing the shortQName equivalent of the specified longQName.

## Example

```


<#assign result = shortQName("{http://www.alfresco.org/model/content/1.0}person")>      
<p>shortQName: ${result}</p>

      
```

The preceding code snippet would produce output similar to the following:

```

shortQName: cm:person        
      
```

**Parent topic:**[Default model methods](../references/API-FreeMarker-defaultmodelmethods.md)

