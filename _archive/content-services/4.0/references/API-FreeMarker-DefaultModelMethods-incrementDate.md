---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: incrementDate
---

# `incrementDate`

`incrementDate(date, increment)` returns a date incremented by the specified amount.

## Parameters

-   **date**

    The date to increment

-   **increment**

    The number to increment the date by.


## Returns

Returns the incremented date.

## Example

```


<#assign incDate = incrementDate(date, 100000000000)>
<p>date: ${date?date}</p>
<p>incDate: ${incDate?date}</p>

    
```

The preceding code snippet would produce output similar to the following:

```

date: Jan 6, 2012

incDate: Mar 9, 2015        
      
```

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

