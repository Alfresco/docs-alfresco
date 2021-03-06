---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for wildcards

Wildcards are supported in terms, phrases, and exact phrases using "\*" to match zero, one, or more characters and "?" to match a single character. The "\*" wildcard character may appear on its own and implies Google-style. The "anywhere after" wildcard pattern can be combined with the "=" prefix for identifier based pattern matching.

The following will all find the term apple.

```
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

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

