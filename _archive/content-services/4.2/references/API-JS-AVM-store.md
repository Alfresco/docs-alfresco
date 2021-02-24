---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# AVM Store API

Store objects returned by the AVM API have this additional API.

-   **[lookupNode](../references/API-JS-avm-store-lookupNode.md)**  
`lookupNode(path)` returns a single AVM node for the given relative path.
-   **[luceneSearch](../references/API-JS-avm-store-luceneSearch.md)**  
`luceneSearch(query)` - executes a Lucene search against the store and returns an array of AVM nodes.

**Parent topic:**[AVM API](../references/API-JS-AVM.md)

## Properties

The API provides the following properties:

-   **`id`**

    Returns the internal ID of the store

-   **`name`**

    Returns the name of the store

-   **`creator`**

    Returns the user who created the store

-   **`createdDate`**

    Returns the creation date of the store

-   **`lookupRoot`**

    Returns the store root node


