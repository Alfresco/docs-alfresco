---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# Rendition services

A rendition is an alternative representation of a content node. Renditions are derived from their source nodes and are usually updated automatically when their source node is updated.

Thumbnails are a special case of renditions which are still available through the Thumbnail Service. Other examples include content that has been transformed into other formats \(MIME types\), images that have been processed in some way or content which incorporates property values from the source node. Rendition Service are grouped into the following object types:

-   Rendition Service
-   Rendition Definition

-   **[createRenditionDefinition](../references/API-JS-createRenditionDefinition.md)**  
 `createRenditionDefinition(renditionName, renderingEngineName)`
-   **[render](../references/API-JS-render.md)**  
 `render(sourceNode, renditionDefQName)`
-   **[getRenditions](../references/API-JS-getRenditions.md)**  
 `getRenditions`
-   **[getRenditionsByName](../references/API-JS-getRenditionsByName.md)**  
 `getRenditionsByName(node, renditionName)`
-   **[Rendition Definition](../references/API-JS-RenditionDefinition.md)**  
Fully specifies a type of rendition. The ScriptRenditionDefinition extends from ScriptAction. The following API are extensions to the existing JavaScript API for Script Actions.

**Parent topic:**[Services API](../references/API-JS-Services.md)

