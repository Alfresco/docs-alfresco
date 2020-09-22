---
author: Alfresco Documentation
---

# Search for spans and positions

Spans and positions are not implemented. Positions will depend on tokenization.

Anything more detailed than one \*(2) two are arbitrarily dependent on the tokenization. An identifier and pattern matching, or dual FTS and ID tokenization, might be the answer in these cases.

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

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/searchsyntax-intro.md)

