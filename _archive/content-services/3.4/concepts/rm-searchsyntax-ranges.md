---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for ranges

Inclusive ranges can be specified in Google-style. There is an extended syntax for more complex ranges. Unbounded ranges can be defined using MIN and MAX for numeric and date types and "\\u0000" and "\\FFFF" for text \(anything that is invalid\).

|Lucene|Google|Description|Example|
|------|------|-----------|-------|
|`[#1 TO #2]`|`#1..#2`|The range \#1 to \#2 inclusive ``#1 <= x <= #2``

|`0..5``[0 TO 5]`

|
|`<#1 TO #2]`| |The range \#1 to \#2 including \#2 but not \#1.`#1 < x <= #2`

|`<0 TO 5]`|
|`[#1 TO #2>`| |The range \#1 to \#2 including \#1 but not \#2.`#1 <= x < #2`

|`[0 TO 5>`|
|`<#1 TO #2>`| |The range \#1 to \#2 exclusive.`#1 < x < #2`

|`<0 TO 5>`|

```
TEXT:apple..banana
my:int:[0 TO 10]
my:float:2.5..3.5
my:float:0..MAX
mt:text:[l TO "\uFFFF"]
```

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

