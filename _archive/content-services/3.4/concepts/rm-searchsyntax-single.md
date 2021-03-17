---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for a single term

Single terms are tokenized before the search according to the appropriate data dictionary definition\(s\).

If you do not specify a field, it will search in the content and properties. This is a shortcut for searching all properties of type content.

```
banana
TEXT:banana
```

Both of these queries will find any nodes with the word "banana" in any property of type `d:content`.

If the appropriate data dictionary definition\(s\) for the field supports both FTS and untokenized search, then FTS search will be used. FTS will include synonyms if the analyzer generates them. Terms cannot contain whitespace.

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

