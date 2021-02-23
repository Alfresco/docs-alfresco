---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: fromISO8601
---

# `fromISO8601`

`fromISO8601(string)` parses a Date from an ISO8601 formatted string.

## Parameters

-   **isoDateString**

    An ISO8601 formatted string to convert to a datetime object.


## Returns

A date object.

## Example

```

    var date = new Date();
    var timeInMillisecs = date.getTime(); 
    var ISODate = utils.toISO8601(timeInMillisecs);
    var origDate = utils.fromISO8601(ISODate); 
   
```

The preceding code snippet would result in the ISO8601 formatted string `2011-11-28T17:06:51.477Z` being converted to the datetime object `Nov 28, 2011 5:06:51 PM`.

**Parent topic:**[Utility methods](../references/API-JS-Utility.md)

