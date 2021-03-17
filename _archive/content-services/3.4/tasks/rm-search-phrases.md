---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Searching for phrases

To search for phrases, wrap the value string in " double quotes". An example of phrase matching is to match the field `originator` with the phrase “John Smith”.

1.  In the Query Text box, enter:

    `originator:"John Smith"`

2.  In the **Results options** area, select the checkbox for **Records**.


Wildcards are supported within phrase matching. For example, to match records that contain the text "John Smith" or "John Smithe" in the Originator metadata field, use the following query text:

```
originator:"John Smith*" 
```

You can also escape embedded quotes in a phrase using back slash `\`.

**Parent topic:**[Creating advanced searches](../concepts/rm-gs-search-adv.md)

**Parent topic:**[Search query syntax](../concepts/rm-search-syntax.md)

