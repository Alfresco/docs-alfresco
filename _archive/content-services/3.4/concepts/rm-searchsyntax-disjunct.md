---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for disjunctions

Single terms, phrases, and so on can be combined using "OR" in upper, lower, or mixed case.

If not otherwise specified, by default search fragments will be ORed together.

```
big yellow banana
big OR yellow OR banana
TEXT:big TEXT:yellow TEXT:banana
TEXT:big OR TEXT:yellow OR TEXT:banana
```

These queries search for nodes that contain the terms "big", "yellow", or "banana" in any content.

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

