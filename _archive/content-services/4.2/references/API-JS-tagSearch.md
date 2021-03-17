---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: tagSearch
---

# `tagSearch`

`tagSearch(store, tag)` performs a search on a given tag in a given store.

The default store \(SpacesStore\) is used if null value is supplied.

## Parameters

-   **store**

    The store in which to search. The default is `workspace://SpacesStore` if null is provided for this parameter.

-   **tag**

    The tag to search for. Any node with this tag will be returned as part of an array of nodes.


## Returns

Returns an array of `ScriptNode` objects that represent the nodes within the store that have the given tag applied.

## Examples

```

var store = "workspace://SpacesStore";
var tag = "mining";
var nodes = search.tagSearch(store, tag);
      
```

Returns nodes that have the tag “mining” applied to them.

**Parent topic:**[Search API](../references/API-JS-Search.md)

