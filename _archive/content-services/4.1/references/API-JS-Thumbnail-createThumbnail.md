---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
keyword: createThumbnail
---

# `createThumbnail`

`createThumbnail` these methods create a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

**Parent topic:**[Thumbnail API](../references/API-JS-Thumbnail.md)

## `createThumbnail(thumbnailName)`

`createThumbnail(thumbnailName,async)` this method creates a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

### Parameters

-   **thumbnailName**

    The thumbnail name. The thumbnail name corresponds to preset thumbnail details stored in the repository.


### Returns

Returns the `ScriptThumbnail` object representing the newly created thumbnail.

## `createThumbnail(thumbnailName,async)`

`createThumbnail(thumbnailName,async)` this method creates a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

### Parameters

-   **thumbnailName**

    The thumbnail name. The thumbnail name corresponds to preset thumbnail details stored in the repository.

-   **async**

    Optional parameter

    False by default, true if the thumbnail is to be created asynchronously. When set to false, the method blocks until the thumbnail is created and the newly created thumbnail is returned. If set to true, the method queues the creation of the thumbnail asynchronously and immediately returns to the calling client with null.


### Returns

Returns the `ScriptThumbnail` object representing the newly created thumbnail.

