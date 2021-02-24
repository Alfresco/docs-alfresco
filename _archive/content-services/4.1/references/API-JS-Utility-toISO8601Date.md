---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: toISO8601\(date\)
---

# `toISO8601(Date)`

`toISO8601(Date)` formats a date to an ISO8601 formatted string.

## Parameters

-   **Date**

    Date object to convert.


## Returns

The date converted to an ISO8601 formatted string.

## Example

```

 var date = new Date();
 var ISODate = utils.toISO8601(date);
    
```

The preceding code snippet would result in the datetime `Nov 28, 2011 4:50:16 PM` being converted to `2011-11-28T16:43:57.039Z`.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

