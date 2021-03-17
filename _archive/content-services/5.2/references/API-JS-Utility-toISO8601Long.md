---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: toISO8601\(Long\)
---

# `toISO8601(long)`

`toISO8601(long)` formats a time in milliseconds to an ISO8601 formatted string.

## Parameters

-   **timeInMillis**

    A Long representing the time in milliseconds to convert.


## Returns

The time as an ISO8601 formatted string.

## Example

```

    var date = new Date();
    var timeInMillisecs = date.getTime(); 
    var ISODate = utils.toISO8601(timeInMillisecs);
   
```

The preceding code snippet would convert the time in milliseconds `1,322,499,360,718` to the ISO8601 date time string `2011-11-28T16:56:00.718Z`.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

