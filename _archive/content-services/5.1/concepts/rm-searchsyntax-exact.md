---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for an exact term

To search for an exact term, prefix the term with "=". This ensures that the term will not be tokenized, therefore you can search for stop words.

If both FTS and ID base search are supported for a specified or implied property, then exact matching will be used where possible.

For example, the following query will match `running` but will not be tokenized. If you are using stemming it might not match anything.

```
=running
```

For the `cm:name` field, which is in the index as both tokenized and untokized, it will use the untokenized field. For example, `=part` will only match the exact term "part". If you use `=part*` it will match additional terms, like "partners". If there is no untokenized field in the index, it will fall back to use the tokenized field, and then, with stemming/plurals, it would match.

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/rm-searchsyntax-intro.md)

