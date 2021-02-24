---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for order precedence

Operator precedence is SQL-like \(not Java-like\). When there is more than one logical operator in a statement, and they are not explicitly grouped using parentheses, `NOT` is evaluated first, then `AND`, and finally `OR`.

The following shows the operator precedence from highest to lowest:

```
" 
[, ], <, > 
() 
~ (prefix and postfix), = 
^ 
+, |, - 
NOT, 
AND 
OR
```

`AND` and `OR` can be combined with `+`, `|`, `-` with the following meanings:

|AND \(no prefix is the same as +\)|Explanation|
|----------------------------------|-----------|
|`big AND dog`|big and dog must occur|
|`+big AND +dog`|big and dog must occur|
|`big AND +dog`|big and dog must occur|
|`+big AND dog`|big and dog must occur|
|`big AND |dog`|big must occur and dog should occur|
|`|big AND dog`|big should occur and dog must occur|
|`|big AND |dog`|both big and dog should occur, and at least one must match|
|`big AND -dog`|big must occur and dog must not occur|
|`-big AND dog`|big must not occur and dog must occur|
|`-big AND -dog`|both big and dog must not occur|
|`|big AND -dog`|big should occur and dog must not occur|

|OR \(no prefix is the same as +\)|Explanation|
|---------------------------------|-----------|
|`dog OR wolf`|dog and wolf should occur, and at least one must match|
|`+dog OR +wolf`|dog and wolf should occur, and at least one must match|
|`dog OR +wolf`|dog and wolf should occur, and at least one must match|
|`+dog OR wolf`|dog and wolf should occur, and at least one must match|
|`dog OR |wolf`|dog and wolf should occur, and at least one must match|
|`|dog OR wolf`|dog and wolf should occur, and at least one must match|
|`|dog OR |wolf`|dog and wolf should occur, and at least one must match|
|`dog OR -wolf`|dog should occur and wolf should not occur, one of the clauses must be valid for any result|
|`-dog OR wolf`|dog should not occur and wolf should occur, one of the clauses must be valid for any result|
|`-dog OR -wolf`|dog and wolf should not occur, one of the clauses must be valid for any result|

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

