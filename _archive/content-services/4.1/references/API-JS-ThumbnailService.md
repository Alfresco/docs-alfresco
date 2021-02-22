---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: Thumbnail Service
---

# Thumbnail service

A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The Thumbnail service transforms and maintains this thumbnail.

-   **[isThumbnailNameRegistered](../references/API-JS-isThumbnailNameRegistered.md)**  
`isThumbnailNameRegistered(thumbnailName)` this method determines whether a given thumbnail name has been registered.
-   **[getPlaceHolderResourcePath](../references/API-JS-getPlaceHolderResourcePath.md)**  
`getPlaceHolderResourcePath(thumbnailName)` this method gets the resource path for the place holder thumbnail for the given named thumbnail.
-   **[getMimeAwarePlaceHolderResourcePath](../references/API-JS-getMimeAwarePlaceHolderResourcePath.md)**  
`getMimeAwarePlaceHolderResourcePath(thumbnailName, mimetype)` this method gets the resource path for the place holder thumbnail for the given named thumbnail and the given mime type.

**Parent topic:**[Services API](../references/API-JS-Services.md)

