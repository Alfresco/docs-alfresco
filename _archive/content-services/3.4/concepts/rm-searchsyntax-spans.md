---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for spans and positions

Spans and positions are not currently implemented. Positions will depend on tokenization.

Anything more detailed than one \*\(2\) two are arbitrarily dependent on the tokenization. An identifier and pattern matching, or dual FTS and ID tokenization, may well be the answer in these cases.

```
term[^] - start 
term[$] - end 
term[position]
```

These are of possible use but excluded for now. Lucene surround extensions:

```
and(terms etc) 
99w(terms etc) 
97n(terms etc)
```

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

