---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API luceneSearch
---

# `luceneSearch`

`luceneSearch` methods provide search operations using the Lucene search syntax.

**Parent topic:**[Search API](../references/API-JS-Search.md)

## `luceneSearch(search)`

`luceneSearch(search)` this method performs a full-text search.

### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.


### Returns

Returns an array of `ScriptNode` objects that were found by the Alfresco repository Lucene search.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco");`

## `luceneSearch(store, search)`

`luceneSearch(store, search)` this method performs a Lucene search in a given store.

### Parameters

-   **store**

    The given store, for example `workspace://SpacesStore`.

-   **search**

    The search terms and operators that represent the Lucene search phrase.


### Returns

Returns an array of `ScriptNode` objects that were found by the Alfresco repository Lucene search in the given store.

### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:foo");`

## `luceneSearch(search, sortColumn, asc)`

`luceneSearch(search, sortColumn, asc)` this method performs a Lucene search by property and a specified sort order.

### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on.

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.


### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria sorted by the specified `sortColumn` and `asc`.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco", "@cm:modified", false);`

## `luceneSearch(store, search, sortColumn, asc)`

`luceneSearch(store, search, sortColumn, asc)`

This method performs a Lucene search by property and a specified sort order in the given store.

### Parameters

-   **store**

    The given store

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.


### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc` in the given store.

### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:alfresco", "@cm:modified", true);`

## `luceneSearch(search, sortColumn, asc, max)`

`luceneSearch(search, sortColumn, asc, max)` this method performs a Lucene search by property and a specified sort order in the specified store. The number of results returned can be limited.

### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.

-   **max**

    The maximun number of items to return in the search results.


### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc`. The results are limited to the number specified by the `max` parameter.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco", "@cm:modified", true, 50);`

## `luceneSearch(store, search, sortColumn, asc, max)`

`luceneSearch(store, search, sortColumn, asc, max)` this method performs a Lucene search by property and a specified sort order in the give store.

### Parameters

-   **store**

    The given store

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.

-   **max**

    The maximun number of items to return in the search results.


### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc` in the given store. Results are limited to the number specified by the parameter `max`.

### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:alfresco", "@cm:modified", true, 50);`

