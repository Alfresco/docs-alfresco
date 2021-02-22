---
author: Alfresco Documentation
---

# `findNode`

`findNode` methods allow you to search for a single node by node reference object, or node reference string. By default the method assumes you are searching for a node that is a descendent of `CompanyHome`.

**Parent topic:**[Search API](../references/API-JS-Search.md)

## `findNode(noderef)`

`findNode(noderef)`

This method returns a single `ScriptNode` as specified by the `NodeRef` object for that node.

### Parameters

-   **noderef**

    Node reference of the node to find.


### Returns

Returns a single `ScriptNode` object, or null if the search failed.

### Example

```
var foundNode = search.findNode(nodeRef);
```

## `findNode(noderef)`

`findNode(noderef)`

This method returns a single `ScriptNode` as specified by the string form of the `NodeRef` for that node, null is returned if the search failed.

### Parameters

-   **noderef**

    A node reference as a string.


### Returns

Returns a single `ScriptNode`, or null if the search failed.

### Example

```
       
var foundNode = null;    
if (nodeRef.isNodeRef(nodeRefString)){

    foundNode = search.findNode(nodeRefString);
    ...
}
```

## `findNode(referenceType, reference)`

`findNode(referenceType, reference)`

Helper to convert a Web Script Request URL to a `NodeRef`.

### Parameters

-   **referenceType**

    The reference type. The reference type can be one of:

    -   `node`
    -   `path`
-   **reference**

    The reference elements supplied depend on the reference type:

    -   `node` - \{store\_type\}/\{store\_id\}/\{node\_id\} — resolve to node through its node reference
    -   `path` - \{store\_type\}/\{store\_id\}/\{path\} — resolve to node through its display path

### Returns

Returns a single `ScriptNode`, or null if the search failed.

### Example

```

var referenceType = "node"; 
// Store type, store id, node id
var reference = ["workspace", "SpacesStore", "78eb920f-fd46-41ee-9fdb-099e96da8349"];
var foundNode = search.findNode(referenceType, reference);


```

```

var referenceType = "path";
// store type, store id, display path 
var reference = ["workspace", "SpacesStore", "Company Home/dir1/dir2","TEST_FILE_1.TXT"];
var foundNode = search.findNode(referenceType, reference);

```

