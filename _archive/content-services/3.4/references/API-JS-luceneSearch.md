---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API luceneSearch
---

# `luceneSearch`

The Search API provides direct access to repository level Lucene search results and Saved Search results through `luceneSearch` methods.

**Parent topic:**[Search API](../references/API-JS-Search.md)

## `luceneSearch(query)`

`luceneSearch(query)`

This method performs a full-text search.

### Parameters

-   **query**

### Returns

Returns an array of `ScriptNode` objects that were found by the Alfresco repository full-text search.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco");`

## `luceneSearch(store, query)`

`luceneSearch(store, query)`

This method performs a full-text search in a given store.

### Parameters

-   **store**

    The given store


-   **query**

    The query string


### Returns

Returns an array of `ScriptNode` objects that were found by the Alfresco repository full-text search in the given store.

### Example

`var nodes = search.luceneSearch("workspace://sitestore", "TEXT:site");`

## `luceneSearch(query, sortColumn, asc)`

`luceneSearch(query, sortColumn, asc)`

This method performs a full-text search by property and a specified sort order.

### Parameters

-   **query**

    The query string


-   **sortColumn**

    The property name to sort on


-   **asc**

    The sort order \(true =\> ascending order, false =\> descending order\)


### Returns

Returns an array of `ScriptNode` satisfying the search criteria sorted by the specified `sortColumn` and `asc`.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco", "@cm:modified", false);`

## `luceneSearch(store, query, sortColumn, asc)`

`luceneSearch(store, query, sortColumn, asc)`

This method performs a full-text search by property and a specified sort order in the give store.

### Parameters

-   **store**

    The given store


-   **query**

    The query string


-   **sortColumn**

    The property name to sort on


-   **asc**

    The sort order \(true =\> ascending order, false =\> descending order\)


### Returns

Returns an array of `ScriptNode` satisfying the search criteria and sorted by the specified `sortColumn` and `asc` in the given store.

### Example

`var nodes = search.luceneSearch("TEXT:alfresco");`

