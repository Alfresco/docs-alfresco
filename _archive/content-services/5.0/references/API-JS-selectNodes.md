---
author: Alfresco Documentation
---

# `selectNodes`

The `selectNodes` methods perform an XPath search and return a list of found nodes.

This method uses the underlying Node Service to perform a search. While this method provides full support for XPath syntax by using Jaxen, use of the Node Service means that searches might be less performant, especially for queries such as unconstrained full-text searches. For searches of such a nature it might be better to use xpathSearch\(\), which provides index-based searching at the cost of a more limited XPath syntax.

CAUTION:

The following operators should be avoided or used with caution as they can potentially consume considerable resources:

-   selectNodes with //
-   selectNodes with /\*
-   selectNodes with like

In general, avoid using `selectNodes()` unless you are looking for a specific path.

It is generally preferable to use a query language that searches against an index. This avoids potential excessive consumption of resources.

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

