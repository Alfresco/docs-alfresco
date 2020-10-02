---
author: Alfresco Documentation
---

# Search for disjunctions

Single terms, phrases, and so on can be combined using `OR` in upper, lower, or mixed case.

The `OR` operator is interpreted as "at least one is required, more than one or all can be returned".

If not otherwise specified, by default search fragments will be `ORed` together.

```
big yellow banana
big OR yellow OR banana
TEXT:big TEXT:yellow TEXT:banana
TEXT:big OR TEXT:yellow OR TEXT:banana
```

These queries search for nodes that contain at least one of the terms `big`, `yellow`, or `banana` in any content.


