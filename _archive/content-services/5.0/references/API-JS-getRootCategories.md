---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getRootCategories
---

# `getRootCategories`

`getRootCategories(aspect)` returns an array of root category nodes for a given classification.

## Parameters

-   **aspect**

    The classification aspect.


## Returns

Array of root category nodes.

## Example

```

    model.catnodes = classification.getRootCategories("cm:generalclassifiable");    
  
```

The previous code snippet would return category node names such as:

```

Software Document Classification

Languages

Regions

Tags    
  
```

**Parent topic:**[Classification API](../references/API-JS-Classification.md)

