---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: xmldate
---

# `xmldate`

`xmldate` these methods return a converted date. The date can be specified either as a Date object or an ISO6801 string.

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

## `xmldate(Date date)`

`xmldate(Date date)` returns an ISO8601 string converted from the specified Date object.

### Parameters

-   **date**

    A Date object to convert to an ISO6801 string.


### Returns

Returns an ISO6801 string.

### Example

## `xmldate(String date)`

`xmldate(String date)` returns a Date object converted from the specified ISO6801 string.

### Parameters

-   **date**

    An ISO6801 format string.


### Returns

Returns a date object converted from the specified ISO6801 format string.

### Example

```


<p>Date:${date?date}</p>

<#assign isoDate = xmldate(date)>

<p>isoDate: ${isoDate}</p>

<#assign dateObject = xmldate(isoDate)>

<p>dateObject: ${dateObject?date}</p>


        
```

The preceding code snippet would produce output similar to the following:

```

Date:Jan 5, 2012

isoDate: 2012-01-05T16:52:43.319Z

dateObject: Jan 5, 2012          
        
```

