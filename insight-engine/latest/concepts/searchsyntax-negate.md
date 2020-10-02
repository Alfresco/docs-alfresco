---
author: Alfresco Documentation
---

# Search for negation

You can narrow your search results by excluding words with the `NOT` syntax.

Single terms, phrases, and so on can be combined using "`NOT`" in upper, lower, or mixed case, or prefixed with "`!`" or "`-`".

These queries search for nodes that contain the terms `yellow` in any content.

```
yellow NOT banana
yellow !banana
yellow -banana
NOT yellow banana
-yellow banana
!yellow banana
```

The `NOT` operator can only be used for string keywords; it doesn't work for numerals or dates.

Prefixing any search qualifier with a `-` excludes all results that are matched by that qualifier.


