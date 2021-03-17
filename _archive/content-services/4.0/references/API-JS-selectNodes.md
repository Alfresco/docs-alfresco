---
author: Alfresco Documentation
---

# `selectNodes`

`selectNodes` these methods perform an XPath search and return a list of found nodes.

**Parent topic:**[Search API](../references/API-JS-Search.md)

## `selectNodes(search)`

`selectNodes(search)`

This method performs an XPath search on the default store, `workspace://SpacesStore`.

### Parameters

-   **search**

    The search string.


### Returns

Returns an array of `ScriptNode` objects representing the search results.

## `selectNodes(store, search)`

`selectNodes(store, search)`

This method performs an XPath search on the specified store.

### Parameters

-   **store**

    The store to search.

-   **search**

    The search string.


### Returns

Returns an array of `ScriptNode` objects representing the search results.

### Example

```

var searchString = "//*"; // XPath search string
var store = "workspace://SpacesStore";

var nodes = search.selectNodes(store, searchString);
        
```

