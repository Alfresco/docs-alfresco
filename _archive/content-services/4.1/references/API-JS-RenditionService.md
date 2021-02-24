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

-   **[createRenditionDefinition](../references/API-JS-createRenditionDefinition.md)**  
 `createRenditionDefinition(renditionName, renderingEngineName)` this method creates a new rendition definition with the specified rendition name which uses the specified rendering engine.
-   **[render](../references/API-JS-render.md)**  
 `render(sourceNode, renditionDefQName)` this method uses a rendition definition to produce a rendition from a specified node.
-   **[getRenditions](../references/API-JS-getRenditions.md)**  
 `getRenditions` these methods retrieve existing renditions for a node.
-   **[getRenditionByName](../references/API-JS-getRenditionByName.md)**  
 `getRenditionByName(node, renditionName)` this method retrieves existing renditions for a node by rendition name.
-   **[Rendition Definition](../references/API-JS-RenditionDefinition.md)**  
Fully specifies a type of rendition. The ScriptRenditionDefinition extends from ScriptAction. The following API are extensions to the existing JavaScript API for Script Actions.

**Parent topic:**[Services API](../references/API-JS-Services.md)

