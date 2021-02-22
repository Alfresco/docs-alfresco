---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `getRootCategories`

`getRootCategories(aspect)` returns the root categories in a classification.

## Parameters

-   **aspect**

    A string that represents the aspect whose root categories are to be returned.


## Returns

Returns a list of `CategoryTemplateNodes` that represent the root category nodes for the specified aspect.

## Example

```

      
<#list classification.getRootCategories("cm:generalclassifiable") as n>
  ${n.name}<br>
</#list>     
      
    
```

The preceding code snippet would return output similar to the following:

```

Software Document Classification
Languages
Regions
Tags        

```

**Parent topic:**[Classification API](../references/API-FreeMarker-Classification.md)

