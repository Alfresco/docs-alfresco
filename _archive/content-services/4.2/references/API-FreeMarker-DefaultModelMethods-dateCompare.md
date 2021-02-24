---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: dateCompare
---

# `dateCompare`

`dateCompare` methods that return a value based on how two dates compare, with an optional milliseconds offset.

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

## `dateCompare`

`dateCompare(dateA, dateB)` returns a value based on how two dates compare, with an optional milliseconds offset.

### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.


### Returns

Returns 1 if dateA is greater than dateB, else returns 0.

### Example

```


<#assign isoDateA = "2012-01-05T16:52:43.319Z">
<#assign isoDateB = "2011-12-05T16:52:43.319Z">
<#assign dateA = xmldate(isoDateA)> 
<#assign dateB = xmldate(isoDateB)> 
<p>result: ${dateCompare(dateA, dateB)}</p>         

      
```

The preceding code snippet would produce output as follows:

```

          result: 1
          
```

This signifies that dateA is greater \(newer\) than dateB.

## `dateCompare`

`dateCompare` returns a value based on how two dates compare, with an optional milliseconds offset.

### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.

-   **millis**

    An offset in milliseconds.


### Returns

Returns 1 if dateA is greater than dateB by at least `millis`, else returns 0.

### Example

## `dateCompare`

`dateCompare` returns a value based on how two dates compare, with an optional milliseconds offset.

### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.

-   **millis**

    An offset in milliseconds.

-   **test**

    The test variable is one of the following strings: "\>", "<", "==".


### Returns

Returns 1 if the test result is positive, else returns 0.

### Example

