---
author: Alfresco Documentation
---

# Search API

The Search API provides direct access to repository level search results and Saved Search results through the `search` root scope object.

Local searches can be performed using the ScriptNode APIs `childByNamePath` and `childByXPath`. Like the various node objects, the `search` object is part of the root scope.

-   **[findNode](../references/API-JS-findNode.md)**  
`findNode` methods allow you to search for a single node by node reference object, or node reference string. By default the method assumes you are searching for a node that is a descendent of `CompanyHome`.
-   **[ISO9075Decode](../references/API-JS-iso9075Decode.md)**  
`ISO9075Decode(string value)` is a helper to decode a ISO9075-encoded string for Lucene PATH statements.
-   **[ISO9075Encode](../references/API-JS-iso9075Encode.md)**  
`ISO9075Encode(string value)` is a helper to encode a value into ISO9075-encoded format for Lucene PATH statements.
-   **[isValidXpathQuery](../references/API-JS-isValidXpathQuery.md)**  
`isValidXpathQuery(query)` checks the validity of an XPath query string.
-   **[luceneSearch](../references/API-JS-luceneSearch.md)**  
The `luceneSearch` methods provide search operations using the Lucene search syntax.
-   **[query](../references/API-JS-query.md)**  
`query(search)` performs a search on `ScriptNode` objects.
-   **[savedSearch](../references/API-JS-savedSearch.md)**  
`savedSearch(node)` returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `node` object. The node object contains the XML that represents the saved search.
-   **[selectNodes](../references/API-JS-selectNodes.md)**  
The `selectNodes` methods perform an XPath search and return a list of found nodes.
-   **[tagSearch](../references/API-JS-tagSearch.md)**  
`tagSearch(store, tag)` performs a search on a given tag in a given store.
-   **[xpathSearch](../references/API-JS-xpathSearch.md)**  
 `xpathSearch(xpath)` performs an XPath search.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

