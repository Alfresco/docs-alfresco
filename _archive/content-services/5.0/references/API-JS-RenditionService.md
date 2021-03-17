---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: [JavaScript API, Rendition Service]
---

# Rendition service

A rendition is an alternative representation of a content node. Renditions are derived from their source nodes and are usually updated automatically when their source node is updated.

Thumbnails are a special case of renditions which are still available through the Thumbnail Service. Other examples include content that has been transformed into other formats \(MIME types\), images that have been processed in some way or content which incorporates property values from the source node. Rendition Services are grouped into the following object types:

-   Rendition Service
-   Rendition Definition

-   **[createRenditionDefinition](../references/API-JS-RenditionService-createRenditionDefinition.md)**  
`createRenditionDefinition(renditionName, renderingEngineName)` creates a new rendition definition with the specified rendition name which uses the specified rendering engine.
-   **[getRenditionByName](../references/API-JS-RenditionService-getRenditionByName.md)**  
 `getRenditionByName(node, renditionName)` retrieves existing renditions for a node by rendition name.
-   **[getRenditions](../references/API-JS-RenditionService-getRenditions.md)**  
The `getRenditions` methods retrieve existing renditions for a node.
-   **[render](../references/API-JS-RenditionService-render.md)**  
The `render(...)` methods generate a rendition from a specified node.
-   **[Rendition definition](../references/API-JS-RenditionDefinition.md)**  
The ScriptRenditionDefinition extends from ScriptAction and fully specifies a type of rendition. `getrenderingEngineName` and `getRenditionName` are extensions to the existing JavaScript API for script actions.

**Parent topic:**[Services API](../references/API-JS-Services.md)

