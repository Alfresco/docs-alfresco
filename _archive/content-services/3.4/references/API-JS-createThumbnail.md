---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# `createThumbnail`

`createThumbnail(thumbnailName,async)`

This method creates a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.



## Parameters

-   **thumbnailName**

    The thumbnail name

-   **async**

    Optional parameter

    False by default, true if the thumbnail was created asynchronously. When set to false, the method blocks until the thumbnail is created and the newly created thumbnail is returned. If set to true, the method queues the creation of the thumbnail asynchronously and immediately returns to the calling client with null.


## Returns

Returns a string of placeholder thumbnail resource path \(null if it is not set\).

**Parent topic:**[Thumbnail services](../references/API-JS-ThumbnailService.md)

