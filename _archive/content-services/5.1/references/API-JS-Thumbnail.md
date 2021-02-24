---
author: Alfresco Documentation
---

# Thumbnail API

A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The `ScriptNode` class provides several methods for generating and handling thumbnails.

-   **[createThumbnail](../references/API-JS-ScriptNode-Thumbnail-createThumbnail.md)**  
The `createThumbnail` methods create a thumbnail based on the definition registered for the thumbnail name provided.
-   **[getThumbnail](../references/API-JS-ScriptNode-Thumbnail-getThumbnail.md)**  
`getThumbnail(thumbnailName)` gets the given thumbnail for the content property.
-   **[getThumbnails](../references/API-JS-ScriptNode-Thumbnail-getThumbnails.md)**  
`getThumbnails()` gets all the thumbnails for a given node's content property.
-   **[getThumbnailDefinitions](../references/API-JS-ScriptNode-Thumbnail-getThumbnailDefinitions.md)**  
`getThumbnailDefinitions()` returns the names of the thumbnail definitions that can be applied to the content property of this node.
-   **[ScriptThumbnail Object](../references/API-JS-ScriptThumbnail.md)**  
Certain thumbnail methods return `ScriptThumbnail` objects. These objects are an extension of the ScriptNode object. ScriptThumbnail objects have a single method, `update`.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

