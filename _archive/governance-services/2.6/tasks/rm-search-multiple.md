---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Searching for multiple fields

Multiple fields can be combined to match additional results. Each field, by default, will be OR combined with the previous.

1.  In the **Search Text** box, enter:

    `keywords:healthcare keywords:hospital`

2.  To return results that only contain both terms, use AND between the terms:

    `keywords:healthcare AND keywords:hospital`

3.  In the **Results options** section, select the components you want to search.


The NOT operator and grouping of terms with brackets "\(" and "\)" are supported. For example:

```
(KEYWORDS:healthcare AND KEYWORDS:hospital) AND NOT KEYWORDS:clinic
```

**Parent topic:**[Advanced search options](../concepts/rm-search-syntax.md)

