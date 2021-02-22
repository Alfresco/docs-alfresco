---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, getRenditionByName]
---

# `getRenditionByName`

`getRenditionByName(node, renditionName)` retrieves existing renditions for a node by rendition name.

## Parameters

-   **node**

    The source nodes for the renditions.

-   **renditionName**

    The name used to identify a rendition. For example `cm:doclib` or `{http://www.alfresco.org/model/content/1.0}imgpreview`.


## Returns

Returns a ScriptNode which represents the parent association for the rendition or null if there is no such rendition.

**Parent topic:**[Rendition service](../references/API-JS-RenditionService.md)

