---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Searching using special operators

Additional special operators can form rich search queries. The following special operations are available:

-   ISNULL:"field" matches a field that has not been set to any value
-   ISNOTNULL:"field" matches a field that contains any value

For example:

1.  To return all records where the Description metadata field has not been set to any value, type:

    `ISNULL:"cm:description"`

2.  To return all records where the Subject metadata field has been set to any value:

    `ISNOTNULL:"cm:title"`


**Parent topic:**[Search query syntax](../concepts/rm-search-syntax.md)

