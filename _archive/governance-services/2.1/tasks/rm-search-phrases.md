---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Searching for phrases

To search for phrases, wrap the value string in "double quotes". An example of phrase matching is to match the field `originator` with the phrase “John Smith”.

1.  In the **Query Text** box, enter:

    `originator:"John Smith"`

2.  In the **Results options** section, select the components you want to search.


Wildcards are supported within phrase matching. For example, to match records that contain the text "John Smith" or "John Smithe" in the **Originator** metadata field, use the following query text:

```
originator:"John Smith*" 
```

You can also escape embedded quotes in a phrase using back slash `\`.

**Parent topic:**[Advanced search options](../concepts/rm-search-syntax.md)

