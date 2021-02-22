---
author: Alfresco Documentation
---

# ``xpathSearch``

`xpathSearch(xpath)` performs an XPath search.

This method executes a search using a Lucene-based indexed query. The support for XPath is restricted but optimized. Being index-based, this method can offer better performance than Node Service based methods such as `selectNodes()`, for searches such as unconstrained full-text searches across large numbers of nodes.

Comparison between searching with the Node Service and using index-based searching, plus further information on supported syntax can be found in the [developer Wiki](http://wiki.alfresco.com/wiki/Search_Documentation).

## Parameters

-   **xpath**

    The XPath search string


## Returns

Returns an array of `ScriptNode` objects that were found by the repository XPath search.

## Example

```

var query = "//";
var nodes = search.xpathSearch(query);
```

**Parent topic:**[Search API](../references/API-JS-Search.md)

## `xpathSearch(store, xpath)`

`xpathSearch(store, xpath)`

This method performs an XPath search in a given store.

### Parameters

-   **store**

    The given store

-   **xpath**

    The XPath string


### Returns

Returns an array of `ScriptNode` objects that were found by the repository XPath search in the given store.

### Example

```

var query = "//";
var store = "archive://SpacesStore"; 
var nodes = search.xpathSearch(store, query);

```

