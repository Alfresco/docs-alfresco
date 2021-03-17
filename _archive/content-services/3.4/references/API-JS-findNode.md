---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API luceneSearch
---

# `findNode`

There are various `findNode` methods of the Search API.

**Parent topic:**[Search API](../references/API-JS-Search.md)

## ``findNode(NodeRef noderef)``

`findNode(NodeRef noderef)`

This method returns a single `ScriptNode` as specified by the `NodeRef` object for that node.

### Parameters

-   **noderef**

### Returns

Returns a single `ScriptNode`, or null if the search failed.

## ``findNode(string noderef)``

`findNode(string noderef)`

This method returns a single `ScriptNode` as specified by the string form of the `NodeRef` for that node, null is returned if the search failed.

### Parameters

-   **noderef**

### Returns

Returns a single `ScriptNode`, or null if the search failed.

## `findNode(referenceType, reference)`

`findNode(referenceType, reference)`

Helper to convert a Web Script Request URL to a `NodeRef`.

The reference elements supplied depend on the reference type:

-   `node` - \{store\_type\}/\{store\_id\}/\{node\_id\} — resolve to node through its node reference
-   `path` - \{store\_type\}/\{store\_id\}/\{path\} — resolve to node through its display path
-   `avmpath` - \{store\_id\}/\{path\} — resolve to AVM node through its display path
-   `qname` - \{store\_type\}/\{store\_id\}/\{child\_qname\_path\} — resolve to node through its child qname path

### Parameters

-   **referenceType**

    The reference type


-   **reference**

### Returns

