---
author: Alfresco Documentation
---

# `selectNodes`

`selectNodes` these methods perform an XPath search and return a list of found nodes.

This method uses the underlying Node Service to perform a search. While this method provides full support for XPath syntax via Jaxen, use of the Node Service means that searches may be less performant, especially for queries such as unconstrained full-text searches. For searches of such a nature it may be better to use xpathSearch\(\), which provides index-based searching at the cost of a more limited XPath syntax.

Comparison between searching with the Node Service and using index-based searching, plus further information on supported syntax can be found in the [developer Wiki](http://wiki.alfresco.com/wiki/Search_Documentation).

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

The following JavaScript snippet shows a typical search query:

```


// call in JS
model.nodes = search.selectNodes("/app:company_home/app:dictionary/*[like(@cm:name,'*templates')]")


```

Given the following FTL template:

```

          
<#list nodes as node>
  <p>${node.name}</p>
</#list>

        
```

The result would be:

```

Email Templates

Presentation Templates

Space Templates

RSS Templates

Node Templates
        
```

