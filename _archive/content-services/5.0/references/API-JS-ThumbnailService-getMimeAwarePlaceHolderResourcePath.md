---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: getMimeAwarePlaceHolderResourcePath
---

# `getMimeAwarePlaceHolderResourcePath`

`getMimeAwarePlaceHolderResourcePath(thumbnailName, mimetype)` gets the resource path for the place holder thumbnail for the given named thumbnail and the given mime type.

If there is no icon available for the specified MIME type, a generic icon will be used instead. The generic icon is that returned by getPlaceHolderResourcePath\(String\). If neither a MIME-specific icon nor a generic icon is available, `null` is returned.

## Parameters

-   **thumbnailName**

    A string representing the thumbnail name.

-   **mimetype**

    A string representing the mimetype of the piece of content.


## Returns

Returns a string of placeholder thumbnail resource path \(null if it is not set\).

**Parent topic:**[Thumbnail service](../references/API-JS-ThumbnailService.md)

