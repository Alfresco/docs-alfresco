---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Search for fuzzy matching

Alfresco supports fuzzy searches based on the Lucene default Levenshtein Distance.

To do a fuzzy search use the tilde \(`~`\) symbol at the end of a single word term with a parameter between 0 and 1 to specify the required similarity. Use a value closer to 1 for higher similarity.

For example, to search for a term similar in spelling to *roam* use the fuzzy search:

```
roam~0.9
```

This search will find terms like *foam*, *roaming*, and *roams*.

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/rm-searchsyntax-intro.md)

