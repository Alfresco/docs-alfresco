---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Searching for date ranges

To search for date values, you can match date fields in a range. Dates must be encoded in the FTS Alfresco query syntax.

To return date ranges, the syntax requires the From and To date to be surrounded by square brackets. For example, to return records that were filed on or before the 10th January 2010:

1.  Select **Date Filed** from the **Insert Field** control.

2.  Add the following search query:

    `dateFiled:[MIN TO "2010-01-10"]`


You must surround the query with square brackets. Use the `TO` token between dates to represent the range.

Use the `MIN` special token to denote the minimum possible date that can be represented by the system.

Use the `MAX` and `NOW` special tokens to indicate the maximum possible date and the current date, respectively.

For example, to find all records that were filed today, use the following query text:

```
dateFiled:NOW
```

**Parent topic:**[Creating advanced searches](../concepts/rm-gs-search-adv.md)

**Parent topic:**[Search query syntax](../concepts/rm-search-syntax.md)

