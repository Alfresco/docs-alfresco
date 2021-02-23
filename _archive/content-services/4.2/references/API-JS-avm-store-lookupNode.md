---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: lookupNode
---

# ``lookupNode``

`lookupNode(path)` returns a single AVM node for the given relative path.

Lookup a node in the store, the path is assumed to be relative to the webapps folder root. Therefore a valid path would be /ROOT/WEB-INF/lib/web.xml.

## Parameters

-   **path**

    The store relative path \(relative to the AVM webapp folder root\).


## Returns

Returns an AVMNode if found, null otherwise.

**Parent topic:**[AVM Store API](../references/API-JS-AVM-store.md)

