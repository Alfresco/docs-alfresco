---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# `getRenditions`

`getRenditions`

These methods retrieve existing renditions for a node.

**Parent topic:**[Rendition services](../references/API-JS-RenditionService.md)

## `getRenditions`

`getRenditions(node)`

This method gets renditions for the specified node.

### Parameters

-   **node**

    The node whose renditions are requested


### Returns

Returns a ScriptNode array of all existing rendition objects for the specified node.

## `getRenditions`

`getRenditions(node, mimeTypePrefix)`

This method gets renditions for the specified node.

### Parameters

-   **node**

    The node whose renditions are requested

-   **mimeTypePrefix**

    A filter to restrict the renditions returned to those whose MIME-type starts with the prefix


### Returns

Returns a ScriptNode array of all existing rendition objects for the specified node whose MIME-type starts with the given filter string.

