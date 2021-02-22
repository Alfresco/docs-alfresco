---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [JavaScript API, API/Script]
keyword: [JavaScript API, hasAspect]
---

# `hasAspect`

`hasAspect(type)`

This method returns true if an aspect was applied to the node.

## Parameters

-   **type**

    The type of aspect whose presence will be checked for. Examples include `cm:versionable` and `cm:templatable`.


## Returns

Boolean

## Example

`var isTemplatable = document.hasAspect("cm:templatable");`

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
model.result = node.hasAspect("cm:versionable");

```

**Parent topic:**[ScriptNode Object API](../references/API-JS-ScriptNode.md)

