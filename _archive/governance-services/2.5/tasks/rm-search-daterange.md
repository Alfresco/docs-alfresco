---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Searching for date ranges

To search for date values, you can match date fields in a range.

To return date ranges, the syntax requires the From and To dates to be surrounded by square brackets. For example, to return records that were filed on or before the 10th January 2010:

1.  In the **Search by** menu, select **Records** and then **Date Filed**.

2.  Add the following search query:

    `[MIN TO "2010-01-10"]`


You must surround the query with square brackets. Use the `TO` token between dates to represent the range.

Use the `MIN` special token to denote the minimum possible date that can be represented by the system.

Use the `MAX` and `NOW` special tokens to indicate the maximum possible date and the current date, respectively.

For example, to find all records that were filed today, use the following query text:

```
dateFiled:NOW
```

**Parent topic:**[Advanced search options](../concepts/rm-search-syntax.md)

