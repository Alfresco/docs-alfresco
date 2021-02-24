---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for optional, mandatory, and excluded elements of a query

Sometimes AND and OR are not enough. If you want to find documents that must contain the term "car", score those with the term "red" higher, but do not match those just containing "red".

|Operator|Description|
|--------|-----------|
|"\|"|The field, phrase, group is optional; a match increases the score.|
|"+"|The field, phrase, group is mandatory \(Note: this differs from Google - see "="\)|
|"-", "!"|The field, phrase, group must not match.|

The following example finds documents that contain the term "car", score those with the term "red" higher, but does not match those just containing "red":

```
+car |red
```

**Note:** At least one element of a query must match \(or not match\) for there to be any results.

All AND and OR constructs can be expressed with these operators.

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

