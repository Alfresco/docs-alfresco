---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: longQName
---

# `longQName`

`longQName(string)` returns the long version of a short prefixed QName.

## Parameters

-   **string**

## Returns

Returns a string of the long version of a QName.

## Example

```

        var longQName = utils.longQName("cm:content");
      
```

The preceding code snippet would return `longQName` as `{http://www.alfresco.org/model/content/1.0}content`.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

