---
author: Alfresco Documentation
---

# Search for wildcards

Wildcards are supported in terms, phrases, and exact phrases using `*` to match zero, one, or more characters and `?` to match a single character.

The `*` wildcard character can appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the `=` prefix for identifier based pattern matching. Search will return and highlight any word that begins with the root of the word truncated by the `*` wildcard character.

The following will all find the term apple.

```Plain text
TEXT:app?e
TEXT:app*
TEXT:*pple
appl?
*ple
=*ple
"ap*le"
"***le"
"?????"
```

When performing a search that includes a wildcard character, it is best to wrap your search term in double quotation marks. This ensures all metadata and content are searched.



