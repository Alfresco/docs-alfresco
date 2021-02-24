---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [User Help, Getting Started]
option: Records Management
---

# Searching for multiple fields

Multiple fields can be combined to match additional results. Each field, by default, will be OR combined with the previous.

1.  In the **Query Text** box, enter:

    `keywords:warship keywords:navy`

    To return results that only contain both terms, use the AND operator between the terms:

    `keywords:warship AND keywords:navy`

2.  In the **Results options** section, select the check box for **Records**.


The NOT operator and grouping of terms with brackets "\(" and "\)" are supported. For example:

```
(KEYWORDS:warship AND KEYWORDS:navy) AND NOT KEYWORDS:aircraft
```

**Parent topic:**[Records Management search query syntax](../concepts/rm-search-syntax.md)

