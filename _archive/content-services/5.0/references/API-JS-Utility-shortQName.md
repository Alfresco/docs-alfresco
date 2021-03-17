---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: createSubCategory
---

# `shortQName`

`shortQName(string)` returns the short, or prefix, version of a long QName.

## Parameters

-   **string**

## Returns

Returns a string of the prefix version of a QName.

## Example

```

    var shortQName = utils.shortQName("{http://www.alfresco.org/model/content/1.0}content");
  
```

The preceding code snippet would return `shortQName` as `cm:content`.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

