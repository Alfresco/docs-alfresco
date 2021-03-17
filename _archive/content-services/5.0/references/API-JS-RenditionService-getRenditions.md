---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, getRenditions]
---

# `getRenditions`

The `getRenditions` methods retrieve existing renditions for a node.

**Parent topic:**[Rendition service](../references/API-JS-RenditionService.md)

## `getRenditions(node)`

`getRenditions(node)` this method gets renditions for the specified node.

### Parameters

-   **node**

    The node whose renditions are requested


### Returns

Returns a `ScriptNode` array of all existing rendition objects for the specified node.

## `getRenditions(node, mimeTypePrefix)`

`getRenditions(node, mimeTypePrefix)` this method gets renditions for the specified node.

### Parameters

-   **node**

    The node whose renditions are requested

-   **mimeTypePrefix**

    A filter to restrict the renditions returned to those whose MIME-type starts with the prefix. This must not be null or an empty string.


### Returns

Returns an array of ScriptNode objects representing all existing rendition objects for the specified node whose MIME-type starts with the given filter string.

