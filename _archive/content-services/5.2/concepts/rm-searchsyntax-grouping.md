---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for grouping

Use parentheses to encapsulate `OR` statements for the search engine to execute them properly.

The `OR` operator is executed as "I would like at least one of these terms".

Groupings of terms are made using `( and )`. Groupings of all query elements are supported in general. Groupings are also supported after a field - field group.

The query elements in field groups all apply to the same field and cannot include a field.

```
(big OR large) AND banana  
title:((big OR large) AND banana)
```

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/rm-searchsyntax-intro.md)

