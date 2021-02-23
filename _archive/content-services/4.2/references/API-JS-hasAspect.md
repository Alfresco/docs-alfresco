---
author: Alfresco Documentation
---

# `hasAspect`

`hasAspect(type)` - returns true if an aspect was applied to the node.

## Parameters

-   **type**

    The type of aspect whose presence will be checked for. Examples include `cm:versionable` and `cm:templatable`.


## Returns

Boolean

## Example

```

var isTemplatable = document.hasAspect("cm:templatable");
...
var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
model.result = node.hasAspect("cm:versionable");

```

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

