---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, render]
---

# `render`

`render(...)` these methods generate a rendition from a specified node.

**Parent topic:**[Rendition service](../references/API-JS-RenditionService.md)

## `render(sourceNode, scriptRenditionDef)`

`render(sourceNode, renditionDefQName)` this method uses a rendition definition to produce a rendition from a specified node.

### Parameters

-   **sourceNode**

    The node for which a rendition should be created

-   **scriptRenditionDef**

    The ScriptRenditionDefinition object to use to render the rendition.


### Returns

Returns the new rendition object \(a ScriptNode\) object.

## `render`

`render(sourceNode, renditionDefQName)` this method uses a saved rendition definition to produce a rendition from a specified node.

### Parameters

-   **sourceNode**

    The node for which a rendition should be created

-   **renditionDefQName**

    The qname of the rendition definition to use for example `cm:doclib` or `{http://www.alfresco.org/model/content/1.0}imgpreview`.


### Returns

Returns the new rendition object \(a ScriptNode\) object.

