---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: getAllClassificationAspects
---

# `getAllClassificationAspects`

`getAllClassificationAspects()` gets all the aspects that define a classification. An array of aspect QNames in `prefix:localName` form is returned.

## Returns

Returns an array of strings representing aspects as QNames.

## Example

```

    model.aspects = classification.getAllClassificationAspects();    
      
```

The previous code would return aspects such as `cm:taggable`, `cm:generalclassifiable`, `cm:classifiable`.

**Parent topic:**[Classification API](../references/API-JS-Classification.md)

